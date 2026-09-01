/**
 * Sessao do painel do lado do servidor.
 *
 * Em desenvolvimento, sem AUTH_SECRET, o painel abre direto: e a maquina do
 * desenvolvedor, sem conteudo de producao. Em producao o login e obrigatorio,
 * e sem AUTH_SECRET o painel simplesmente nao abre.
 */
import { cookies } from 'next/headers'

import { SESSION_COOKIE, isAuthConfigured, readSession } from './auth'

export type AccessState =
  | { status: 'open'; email: null }
  | { status: 'authenticated'; email: string }
  | { status: 'anonymous'; email: null }
  | { status: 'unconfigured'; email: null }

export async function getAccess(): Promise<AccessState> {
  if (!isAuthConfigured()) {
    return process.env.NODE_ENV === 'production'
      ? { status: 'unconfigured', email: null }
      : { status: 'open', email: null }
  }

  const token = (await cookies()).get(SESSION_COOKIE)?.value
  const session = readSession(token)
  return session ? { status: 'authenticated', email: session.email } : { status: 'anonymous', email: null }
}

/** true quando quem chamou pode ler e gravar conteudo. */
export async function hasAdminAccess(): Promise<boolean> {
  const access = await getAccess()
  return access.status === 'open' || access.status === 'authenticated'
}
