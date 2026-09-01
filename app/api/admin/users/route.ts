/**
 * Quem pode acessar o painel.
 *
 * GET    lista os acessos (sem devolver hash de senha)
 * POST   cadastra um acesso com senha inicial
 * PATCH  troca a senha de um acesso
 * DELETE remove um acesso
 */
import { hashPassword, normalizeEmail } from '@/lib/auth'
import { readUsers, writeUsers } from '@/lib/contentStore'
import { getAccess } from '@/lib/session'
import type { AdminUser } from '@/types/content'

const MIN_PASSWORD = 8
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function publicUser(user: AdminUser) {
  return { email: user.email, name: user.name ?? null, createdAt: user.createdAt }
}

async function guard() {
  const access = await getAccess()
  if (access.status === 'open' || access.status === 'authenticated') return access
  return null
}

export async function GET() {
  const access = await guard()
  if (!access) return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })

  return Response.json({
    users: (await readUsers()).map(publicUser),
    currentEmail: access.email,
  })
}

export async function POST(request: Request) {
  const access = await guard()
  if (!access) return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as {
    email?: string
    name?: string
    password?: string
  } | null
  if (!body) return Response.json({ error: 'Requisição inválida.' }, { status: 400 })

  const email = normalizeEmail(body.email ?? '')
  const password = body.password ?? ''

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json({ error: 'Informe um e-mail válido.' }, { status: 400 })
  }
  if (password.length < MIN_PASSWORD) {
    return Response.json(
      { error: `A senha inicial precisa ter pelo menos ${MIN_PASSWORD} caracteres.` },
      { status: 400 }
    )
  }

  const users = await readUsers()
  if (users.some((user) => user.email === email)) {
    return Response.json({ error: 'Esse e-mail já tem acesso.' }, { status: 409 })
  }

  const created: AdminUser = {
    email,
    name: (body.name ?? '').trim() || undefined,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  }

  await writeUsers([...users, created])
  return Response.json({ user: publicUser(created) })
}

export async function PATCH(request: Request) {
  const access = await guard()
  if (!access) return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })

  const body = (await request.json().catch(() => null)) as {
    email?: string
    password?: string
  } | null
  if (!body) return Response.json({ error: 'Requisição inválida.' }, { status: 400 })

  const email = normalizeEmail(body.email ?? '')
  const password = body.password ?? ''
  if (password.length < MIN_PASSWORD) {
    return Response.json(
      { error: `A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.` },
      { status: 400 }
    )
  }

  const users = await readUsers()
  const target = users.find((user) => user.email === email)
  if (!target) return Response.json({ error: 'Acesso não encontrado.' }, { status: 404 })

  const passwordHash = await hashPassword(password)
  await writeUsers(users.map((user) => (user.email === email ? { ...user, passwordHash } : user)))
  return Response.json({ ok: true })
}

export async function DELETE(request: Request) {
  const access = await guard()
  if (!access) return Response.json({ error: 'Acesso não autorizado.' }, { status: 401 })

  const email = normalizeEmail(new URL(request.url).searchParams.get('email') ?? '')
  const users = await readUsers()

  if (!users.some((user) => user.email === email)) {
    return Response.json({ error: 'Acesso não encontrado.' }, { status: 404 })
  }
  // Sem essa trava daria para remover o ultimo acesso e ficar de fora do painel.
  if (users.length === 1) {
    return Response.json(
      { error: 'Este é o último acesso: cadastre outro antes de removê-lo.' },
      { status: 409 }
    )
  }
  if (access.email && access.email === email) {
    return Response.json({ error: 'Você não pode remover o próprio acesso.' }, { status: 409 })
  }

  await writeUsers(users.filter((user) => user.email !== email))
  return Response.json({ ok: true })
}
