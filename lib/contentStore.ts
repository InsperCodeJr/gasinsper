/**
 * Armazenamento do conteudo do site.
 *
 * Dois modos, escolhidos pelas variaveis de ambiente:
 *
 * - Vercel Blob (producao): o JSON do conteudo e a lista de acessos ficam em
 *   uma store PRIVADA, e as imagens e videos em uma store PUBLICA. A store
 *   privada e lida com useCache: false, senao uma edicao levaria ate um minuto
 *   para aparecer no site por causa do cache.
 * - Sistema de arquivos (desenvolvimento): local-content/*.json e
 *   public/uploads, sem precisar de nenhuma conta.
 *
 * Este modulo usa fs e o SDK do Blob: so pode ser importado no servidor.
 */
import fs from 'node:fs/promises'
import path from 'node:path'

import { del, get, list, put } from '@vercel/blob'

import { DEFAULT_CONTENT } from '@/content/defaults'
import { migrateContent } from './migrateContent'
import type { AdminUser, SiteContent } from '@/types/content'

const CONTENT_KEY = 'content.json'
const USERS_KEY = 'users.json'

export const LOCAL_CONTENT_DIR = path.join(process.cwd(), 'local-content')
export const LOCAL_CONTENT_FILE = path.join(LOCAL_CONTENT_DIR, CONTENT_KEY)
export const LOCAL_USERS_FILE = path.join(LOCAL_CONTENT_DIR, USERS_KEY)
export const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')

/**
 * Ao conectar uma store, a Vercel cria sozinha a variavel
 * <PREFIXO>_READ_WRITE_TOKEN. Como o prefixo escolhido no painel varia, todas
 * as grafias abaixo sao aceitas.
 *
 * A leitura acontece dentro da funcao, a cada chamada: lida no topo do modulo,
 * a variavel pode ser capturada no build, antes de existir no ambiente.
 */
function tokenFor(prefix: 'BLOB_CONTENT' | 'BLOB_MEDIA'): string | undefined {
  return (
    process.env[`${prefix}_READ_WRITE_TOKEN`] ??
    process.env[`${prefix}_TOKEN_READ_WRITE_TOKEN`] ??
    process.env[`${prefix}_TOKEN`]
  )
}

const contentToken = () => tokenFor('BLOB_CONTENT')
const mediaToken = () => tokenFor('BLOB_MEDIA')

/** Em Blob quando as duas stores estao configuradas; senao, disco local. */
export function usesBlob(): boolean {
  return Boolean(contentToken() && mediaToken())
}

export function storageMode(): 'blob' | 'local' {
  return usesBlob() ? 'blob' : 'local'
}

/**
 * Fora de desenvolvimento o disco e somente leitura, entao cair no modo local
 * significa configuracao faltando. Melhor dizer isso do que estourar um ENOENT.
 */
function assertWritable(): void {
  if (usesBlob() || process.env.NODE_ENV !== 'production') return

  const faltando = [
    contentToken() ? null : 'BLOB_CONTENT_READ_WRITE_TOKEN (store privada)',
    mediaToken() ? null : 'BLOB_MEDIA_READ_WRITE_TOKEN (store pública)',
  ].filter(Boolean)

  throw new Error(
    `Armazenamento não configurado neste ambiente. Falta: ${faltando.join(' e ')}. ` +
      'Conecte as stores do Vercel Blob ao projeto e faça um novo deploy.'
  )
}

/** Diagnostico do painel: quais variaveis o servidor esta enxergando. */
export function storageDiagnostics() {
  return {
    mode: storageMode(),
    contentToken: Boolean(contentToken()),
    mediaToken: Boolean(mediaToken()),
    blobVars: Object.keys(process.env)
      .filter((name) => name.startsWith('BLOB_'))
      .sort(),
  }
}

/* ── JSON na store privada ───────────────────────────── */

async function readJson<T>(key: string, fallback: T): Promise<T> {
  if (usesBlob()) {
    try {
      // useCache: false garante que o painel leia o que acabou de gravar.
      const blob = await get(key, { access: 'private', token: contentToken(), useCache: false })
      if (!blob?.stream) return fallback
      return JSON.parse(await new Response(blob.stream).text()) as T
    } catch (error) {
      if (isNotFound(error)) return fallback
      console.error(`[storage] falha ao ler ${key} do Blob:`, error)
      return fallback
    }
  }

  try {
    return JSON.parse(await fs.readFile(path.join(LOCAL_CONTENT_DIR, key), 'utf8')) as T
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code !== 'ENOENT') {
      console.error(`[storage] falha ao ler ${key} do disco:`, error)
    }
    return fallback
  }
}

async function writeJson(key: string, value: unknown): Promise<void> {
  assertWritable()

  const body = `${JSON.stringify(value, null, 2)}\n`

  if (usesBlob()) {
    await put(key, body, {
      access: 'private',
      token: contentToken(),
      contentType: 'application/json',
      allowOverwrite: true,
      // Sem cache: o conteudo muda a cada gravacao e e lido pelo servidor.
      cacheControlMaxAge: 0,
    })
    return
  }

  await fs.mkdir(LOCAL_CONTENT_DIR, { recursive: true })
  await fs.writeFile(path.join(LOCAL_CONTENT_DIR, key), body, 'utf8')
}

function isNotFound(error: unknown): boolean {
  const name = (error as { name?: string })?.name ?? ''
  return name.includes('BlobNotFound') || name.includes('NotFound')
}

/* ── Conteudo ────────────────────────────────────────── */

export async function readContent(): Promise<SiteContent> {
  const raw = await readJson<unknown>(CONTENT_KEY, null)
  return migrateContent(raw)
}

export async function writeContent(content: unknown): Promise<SiteContent> {
  const normalized = migrateContent(content)
  await writeJson(CONTENT_KEY, normalized)
  return normalized
}

export async function resetContent(): Promise<SiteContent> {
  return writeContent(DEFAULT_CONTENT)
}

/* ── Acessos ao painel ───────────────────────────────── */

export async function readUsers(): Promise<AdminUser[]> {
  const data = await readJson<{ users?: AdminUser[] } | null>(USERS_KEY, null)
  return data?.users ?? []
}

export async function writeUsers(users: AdminUser[]): Promise<AdminUser[]> {
  await writeJson(USERS_KEY, { users })
  return users
}

/* ── Midia ───────────────────────────────────────────── */

export interface UploadedMedia {
  url: string
  pathname: string
}

export async function uploadMedia(
  fileName: string,
  body: Buffer,
  contentType: string
): Promise<UploadedMedia> {
  assertWritable()

  if (usesBlob()) {
    const blob = await put(`uploads/${fileName}`, body, {
      access: 'public',
      token: mediaToken(),
      contentType,
      addRandomSuffix: false,
      allowOverwrite: true,
    })
    return { url: blob.url, pathname: blob.pathname }
  }

  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true })
  await fs.writeFile(path.join(LOCAL_UPLOAD_DIR, fileName), body)
  return { url: `/uploads/${fileName}`, pathname: `uploads/${fileName}` }
}

export async function listMedia(): Promise<UploadedMedia[]> {
  if (usesBlob()) {
    const { blobs } = await list({ prefix: 'uploads/', token: mediaToken() })
    return blobs.map((blob) => ({ url: blob.url, pathname: blob.pathname }))
  }

  try {
    const names = await fs.readdir(LOCAL_UPLOAD_DIR)
    return names.map((name) => ({ url: `/uploads/${name}`, pathname: `uploads/${name}` }))
  } catch {
    return []
  }
}

export async function deleteMedia(url: string): Promise<void> {
  if (usesBlob()) {
    await del(url, { token: mediaToken() })
    return
  }

  const name = path.basename(url)
  await fs.rm(path.join(LOCAL_UPLOAD_DIR, name), { force: true })
}
