/** Login e logout do painel. */
import { SESSION_COOKIE, SESSION_MAX_AGE, authenticate, createSession, isAuthConfigured } from '@/lib/auth'
import { storageDiagnostics } from '@/lib/contentStore'
import { getAccess } from '@/lib/session'

export async function GET() {
  return Response.json({ ...(await getAccess()), storage: storageDiagnostics() })
}

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return Response.json(
      { error: 'O acesso ao painel ainda não foi configurado (falta AUTH_SECRET).' },
      { status: 503 }
    )
  }

  let body: { email?: string; password?: string }
  try {
    body = (await request.json()) as { email?: string; password?: string }
  } catch {
    return Response.json({ error: 'Requisição inválida.' }, { status: 400 })
  }

  const email = body.email ?? ''
  const password = body.password ?? ''
  if (!email || !password) {
    return Response.json({ error: 'Informe e-mail e senha.' }, { status: 400 })
  }

  let user
  try {
    user = await authenticate(email, password)
  } catch (error) {
    // Erro de configuracao (ex: armazenamento ausente) precisa chegar legivel
    // ao painel, senao o navegador recebe uma pagina de erro em HTML.
    console.error('[auth] falha ao autenticar:', error)
    return Response.json(
      { error: error instanceof Error ? error.message : 'Falha ao entrar.' },
      { status: 500 }
    )
  }

  if (!user) {
    // Mesma mensagem para e-mail inexistente e senha errada.
    return Response.json({ error: 'E-mail ou senha incorretos.' }, { status: 401 })
  }

  const response = Response.json({ email: user.email, name: user.name ?? null })
  response.headers.append(
    'Set-Cookie',
    cookie(SESSION_COOKIE, createSession(user.email), SESSION_MAX_AGE)
  )
  return response
}

export async function DELETE() {
  const response = Response.json({ ok: true })
  response.headers.append('Set-Cookie', cookie(SESSION_COOKIE, '', 0))
  return response
}

function cookie(name: string, value: string, maxAge: number): string {
  const parts = [
    `${name}=${value}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${maxAge}`,
  ]
  if (process.env.NODE_ENV === 'production') parts.push('Secure')
  return parts.join('; ')
}
