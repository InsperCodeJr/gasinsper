/**
 * Conteudo do site: leitura e gravacao pelo painel.
 *
 * GET    devolve o conteudo (textos das paginas ja com os padroes aplicados)
 * PUT    grava o conteudo enviado
 * DELETE restaura o conteudo inicial
 */
import { PAGE_DEFAULTS, type PageContent } from '@/content/pages'
import { mergeWithDefaults } from '@/lib/content'
import { readContent, resetContent, storageMode, writeContent } from '@/lib/contentStore'
import { hasAdminAccess } from '@/lib/session'
import type { SiteContent } from '@/types/content'

function forbidden() {
  return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })
}

/**
 * O painel abre sempre com o texto que o site esta mostrando, mesmo quando o
 * campo nunca foi preenchido.
 */
function withPageDefaults(content: SiteContent) {
  const keys = Object.keys(PAGE_DEFAULTS) as Array<keyof PageContent>
  const pages = {} as PageContent
  for (const key of keys) {
    Object.assign(pages, { [key]: mergeWithDefaults(PAGE_DEFAULTS[key], content.pages?.[key]) })
  }
  return { ...content, pages, storage: storageMode() }
}

export async function GET() {
  if (!(await hasAdminAccess())) return forbidden()
  return Response.json(withPageDefaults(await readContent()))
}

export async function PUT(request: Request) {
  if (!(await hasAdminAccess())) return forbidden()

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'JSON inválido.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return Response.json({ error: 'O conteúdo enviado precisa ser um objeto.' }, { status: 400 })
  }

  return Response.json(withPageDefaults(await writeContent(body)))
}

export async function DELETE() {
  if (!(await hasAdminAccess())) return forbidden()
  return Response.json(withPageDefaults(await resetContent()))
}
