/**
 * Acesso ao painel.
 *
 * Senha guardada como hash scrypt com sal aleatorio, sessao em cookie assinado
 * com HMAC. Nenhum servico externo envolvido.
 *
 * O primeiro acesso vem das variaveis ADMIN_EMAIL e ADMIN_PASSWORD: se ainda
 * nao existe nenhum usuario gravado, esse par e aceito e passa a valer como o
 * primeiro administrador. Dentro do painel da para cadastrar os demais.
 */
import { createHmac, randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

import { readUsers, writeUsers } from './contentStore'
import type { AdminUser } from '@/types/content'

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>

export const SESSION_COOKIE = 'gas_admin'
const SESSION_DAYS = 7

/* ── senhas ──────────────────────────────────────────── */

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString('hex')
  const derived = await scryptAsync(password, salt, 64)
  return `${salt}:${derived.toString('hex')}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(':')
  if (!salt || !hash) return false
  const derived = await scryptAsync(password, salt, 64)
  const expected = Buffer.from(hash, 'hex')
  if (expected.length !== derived.length) return false
  return timingSafeEqual(derived, expected)
}

/* ── sessao ──────────────────────────────────────────── */

function secret(): string {
  // Sem AUTH_SECRET as sessoes nao podem ser assinadas com seguranca.
  return process.env.AUTH_SECRET ?? ''
}

export function isAuthConfigured(): boolean {
  return Boolean(secret())
}

function sign(payload: string): string {
  return createHmac('sha256', secret()).update(payload).digest('base64url')
}

export function createSession(email: string): string {
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000
  const payload = Buffer.from(JSON.stringify({ email, expiresAt })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function readSession(token: string | undefined): { email: string } | null {
  if (!token || !secret()) return null

  const [payload, signature] = token.split('.')
  if (!payload || !signature) return null

  const expected = sign(payload)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null

  try {
    const { email, expiresAt } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as {
      email: string
      expiresAt: number
    }
    if (!email || Date.now() > expiresAt) return null
    return { email }
  } catch {
    return null
  }
}

export const SESSION_MAX_AGE = SESSION_DAYS * 24 * 60 * 60

/* ── usuarios ────────────────────────────────────────── */

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Confere e-mail e senha. Enquanto nao houver nenhum usuario gravado, aceita o
 * par de ADMIN_EMAIL/ADMIN_PASSWORD e grava esse primeiro administrador.
 */
export async function authenticate(email: string, password: string): Promise<AdminUser | null> {
  const normalized = normalizeEmail(email)
  const users = await readUsers()

  if (users.length === 0) {
    const bootstrapEmail = normalizeEmail(process.env.ADMIN_EMAIL ?? '')
    const bootstrapPassword = process.env.ADMIN_PASSWORD ?? ''
    if (!bootstrapEmail || !bootstrapPassword) return null
    if (normalized !== bootstrapEmail || password !== bootstrapPassword) return null

    const first: AdminUser = {
      email: bootstrapEmail,
      name: 'Primeiro acesso',
      passwordHash: await hashPassword(bootstrapPassword),
      createdAt: new Date().toISOString(),
    }
    await writeUsers([first])
    return first
  }

  const user = users.find((candidate) => candidate.email === normalized)
  if (!user) return null
  return (await verifyPassword(password, user.passwordHash)) ? user : null
}

export async function findUser(email: string): Promise<AdminUser | null> {
  const normalized = normalizeEmail(email)
  return (await readUsers()).find((user) => user.email === normalized) ?? null
}
