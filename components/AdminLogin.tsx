"use client";

import { useState } from "react";

/** Tela de entrada do painel. */
export default function AdminLogin({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Não foi possível entrar.");
      }
      onSignedIn();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Não foi possível entrar.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-[#E4E4E7] bg-white p-6 shadow-sm sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#BB0A24]">Painel do GAS</p>
        <h1 className="mt-2 text-xl font-black text-[#18181B]">Entrar</h1>

        <label className="mt-6 block text-xs font-semibold uppercase tracking-wider text-[#71717A]">
          E-mail
        </label>
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] px-3 py-2 text-sm outline-none transition focus:border-[#BB0A24] focus:ring-2 focus:ring-[#BB0A24]/10"
        />

        <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-[#71717A]">
          Senha
        </label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-[#E4E4E7] px-3 py-2 text-sm outline-none transition focus:border-[#BB0A24] focus:ring-2 focus:ring-[#BB0A24]/10"
        />

        {error && <p className="mt-4 text-xs text-[#BB0A24]">{error}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-6 w-full rounded-lg bg-[#BB0A24] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#8F071B] disabled:opacity-40"
        >
          {busy ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
