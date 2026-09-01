"use client";

import { useCallback, useEffect, useState } from "react";

interface PublicUser {
  email: string;
  name: string | null;
  createdAt: string;
}

const inputClass =
  "w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-[#18181B] outline-none transition focus:border-[#BB0A24] focus:ring-2 focus:ring-[#BB0A24]/10";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#71717A]";

const ghostButton =
  "rounded-md border border-[#E4E4E7] bg-white px-2.5 py-1 text-xs font-medium text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30";

/** Quem pode entrar no painel. */
export default function AdminUsers() {
  const [users, setUsers] = useState<PublicUser[] | null>(null);
  const [currentEmail, setCurrentEmail] = useState<string | null>(null);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [resetting, setResetting] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      setStatus({ kind: "error", text: "Não foi possível carregar os acessos." });
      setUsers([]);
      return;
    }
    const json = (await res.json()) as { users: PublicUser[]; currentEmail: string | null };
    setUsers(json.users);
    setCurrentEmail(json.currentEmail);
  }, []);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error())))
      .then((json: { users: PublicUser[]; currentEmail: string | null }) => {
        setUsers(json.users);
        setCurrentEmail(json.currentEmail);
      })
      .catch(() => {
        setUsers([]);
        setStatus({ kind: "error", text: "Não foi possível carregar os acessos." });
      });
  }, []);

  async function send(input: RequestInfo, init: RequestInit, okText: string) {
    setBusy(true);
    setStatus(null);
    try {
      const res = await fetch(input, init);
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Não foi possível concluir.");
      }
      await load();
      setStatus({ kind: "ok", text: okText });
      return true;
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Não foi possível concluir." });
      return false;
    } finally {
      setBusy(false);
    }
  }

  async function addUser(event: React.FormEvent) {
    event.preventDefault();
    const ok = await send(
      "/api/admin/users",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password }),
      },
      "Acesso criado. Passe a senha inicial para a pessoa."
    );
    if (ok) {
      setEmail("");
      setName("");
      setPassword("");
    }
  }

  async function resetPassword(target: string) {
    const ok = await send(
      "/api/admin/users",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target, password: newPassword }),
      },
      "Senha trocada."
    );
    if (ok) {
      setResetting(null);
      setNewPassword("");
    }
  }

  async function removeUser(target: string) {
    if (!window.confirm(`Remover o acesso de ${target}?`)) return;
    await send(`/api/admin/users?email=${encodeURIComponent(target)}`, { method: "DELETE" }, "Acesso removido.");
  }

  if (!users) {
    return <p className="text-sm text-[#71717A]">Carregando acessos...</p>;
  }

  return (
    <div className="space-y-6">
      {status && (
        <p
          className={`rounded-lg border px-3 py-2 text-xs ${
            status.kind === "ok"
              ? "border-[#E4E4E7] bg-[#F8F8F8] text-[#52525B]"
              : "border-[#BB0A24]/20 bg-[#BB0A24]/5 text-[#BB0A24]"
          }`}
        >
          {status.text}
        </p>
      )}

      {/* Lista */}
      <div className="space-y-3">
        {users.length === 0 && (
          <p className="rounded-xl border border-dashed border-[#E4E4E7] bg-white px-4 py-8 text-center text-sm text-[#A1A1AA]">
            Nenhum acesso cadastrado ainda. O primeiro entra pelas variáveis ADMIN_EMAIL e
            ADMIN_PASSWORD.
          </p>
        )}

        {users.map((user) => (
          <div key={user.email} className="rounded-xl border border-[#E4E4E7] bg-white">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user.name || user.email}
                  {user.email === currentEmail && (
                    <span className="ml-2 rounded-full bg-[#F4F4F5] px-2 py-0.5 text-[10px] font-medium text-[#71717A]">
                      você
                    </span>
                  )}
                </p>
                {user.name && <p className="truncate text-xs text-[#A1A1AA]">{user.email}</p>}
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setResetting(resetting === user.email ? null : user.email);
                    setNewPassword("");
                  }}
                  className={ghostButton}
                >
                  Trocar senha
                </button>
                <button
                  type="button"
                  onClick={() => removeUser(user.email)}
                  disabled={busy}
                  className={`${ghostButton} text-[#BB0A24]`}
                >
                  Remover
                </button>
              </div>
            </div>

            {resetting === user.email && (
              <div className="flex flex-wrap items-end gap-2 border-t border-[#F4F4F5] bg-[#FCFCFC] p-4">
                <div className="min-w-[200px] flex-1">
                  <label className={labelClass}>Nova senha</label>
                  <input
                    type="text"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={inputClass}
                    placeholder="mínimo 8 caracteres"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => resetPassword(user.email)}
                  disabled={busy || newPassword.length < 8}
                  className="rounded-lg bg-[#BB0A24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8F071B] disabled:opacity-40"
                >
                  Salvar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Novo acesso */}
      <form onSubmit={addUser} className="rounded-xl border border-[#E4E4E7] bg-white p-4 sm:p-6">
        <p className="mb-4 border-b border-[#F4F4F5] pb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#BB0A24]">
          Novo acesso
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Nome (opcional)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Senha inicial</label>
            <input
              type="text"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="mínimo 8 caracteres"
            />
            <p className="mt-1 text-xs text-[#A1A1AA]">
              A senha aparece em texto aqui para você conseguir passar para a pessoa. Peça que ela
              troque no primeiro acesso.
            </p>
          </div>
        </div>
        <button
          type="submit"
          disabled={busy}
          className="mt-4 rounded-lg bg-[#BB0A24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8F071B] disabled:opacity-40"
        >
          Adicionar acesso
        </button>
      </form>
    </div>
  );
}
