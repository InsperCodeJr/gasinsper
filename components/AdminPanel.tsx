"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import AdminLogin from "./AdminLogin";
import AdminUsers from "./AdminUsers";
import { isVideoUrl } from "./HeroBackground";
import { SECTIONS, type Field, type Panel, type Row } from "./adminSchema";

/* ─────────────────────────────────────────────────────────
   Painel de administração do site. Lê e grava o conteúdo
   pela API /api/admin/*, que decide entre Vercel Blob
   (produção) e arquivos locais (desenvolvimento).
   ───────────────────────────────────────────────────────── */

/* ── acesso por caminho ("pages.home", "slug.current") ─ */

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Row)[key];
    return undefined;
  }, obj);
}

function setPath(obj: Row, path: string, value: unknown): Row {
  const [head, ...rest] = path.split(".");
  if (rest.length === 0) return { ...obj, [head]: value };
  const child = obj[head];
  const base = child && typeof child === "object" && !Array.isArray(child) ? (child as Row) : {};
  return { ...obj, [head]: setPath(base, rest.join("."), value) };
}

function move<T>(list: T[], from: number, to: number): T[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/media", { method: "POST", body });
  const json = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !json.url) throw new Error(json.error ?? "Falha no envio.");
  return json.url;
}

/* ── estilos compartilhados ──────────────────────────── */

const inputClass =
  "w-full rounded-lg border border-[#E4E4E7] bg-white px-3 py-2 text-sm text-[#18181B] outline-none transition placeholder:text-[#A1A1AA] focus:border-[#BB0A24] focus:ring-2 focus:ring-[#BB0A24]/10";

const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#71717A]";

const ghostButton =
  "rounded-md border border-[#E4E4E7] bg-white px-2.5 py-1 text-xs font-medium text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24] disabled:opacity-30";

/* ── campos de arquivo ───────────────────────────────── */

function FilePicker({
  accept,
  label,
  onUploaded,
  multiple = false,
}: {
  accept: string;
  label: string;
  onUploaded: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-1">
      <label
        className={`inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[#D4D4D8] px-3 py-2 text-xs font-medium text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24] ${
          busy ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {busy ? "Enviando..." : label}
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={async (e) => {
            const files = Array.from(e.target.files ?? []);
            e.target.value = "";
            if (files.length === 0) return;
            setBusy(true);
            setError(null);
            try {
              onUploaded(await Promise.all(files.map(uploadFile)));
            } catch (err) {
              setError(err instanceof Error ? err.message : "Falha no envio.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {error && <span className="text-xs text-[#BB0A24]">{error}</span>}
    </div>
  );
}

function ImageField({ value, onChange }: { value: unknown; onChange: (value: unknown) => void }) {
  const url = typeof value === "string" && value ? value : null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-16 w-16 rounded-lg border border-[#E4E4E7] object-cover" />
      ) : (
        <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-dashed border-[#E4E4E7] text-[10px] text-[#A1A1AA]">
          vazio
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <FilePicker
          accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
          label={url ? "Trocar imagem" : "Enviar imagem"}
          onUploaded={([u]) => onChange(u)}
        />
        {url && (
          <button type="button" onClick={() => onChange(undefined)} className="w-fit text-xs text-[#BB0A24] hover:underline">
            Remover
          </button>
        )}
      </div>
    </div>
  );
}

function ImageListField({ value, onChange }: { value: unknown; onChange: (value: unknown) => void }) {
  const items = Array.isArray(value) ? (value as string[]) : [];

  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={typeof item === "string" ? item : ""}
                alt=""
                className="h-20 w-20 rounded-lg border border-[#E4E4E7] object-cover"
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, j) => j !== i))}
                className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#BB0A24] text-xs font-bold text-white"
                aria-label="Remover imagem"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
      <FilePicker
        accept="image/png,image/jpeg,image/webp,image/gif"
        label="Adicionar imagens"
        multiple
        onUploaded={(urls) => onChange([...items, ...urls])}
      />
    </div>
  );
}

/** Campo de mídia de fundo: aceita vídeo, imagem ou GIF. */
function MediaField({ value, onChange }: { value: unknown; onChange: (value: unknown) => void }) {
  const url = typeof value === "string" && value ? value : null;
  // Mesma regra usada pelo site para escolher entre <video> e <img>.
  const isVideo = url ? isVideoUrl(url) : false;

  return (
    <div className="space-y-2">
      {url &&
        (isVideo ? (
          <video src={url} muted controls className="h-40 w-full max-w-md rounded-lg border border-[#E4E4E7]" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="h-40 w-full max-w-md rounded-lg border border-[#E4E4E7] object-cover" />
        ))}
      <div className="flex flex-wrap items-center gap-3">
        <FilePicker
          accept="video/mp4,video/webm,image/png,image/jpeg,image/webp,image/gif"
          label={url ? "Trocar mídia" : "Enviar vídeo, imagem ou GIF"}
          onUploaded={([u]) => onChange(u)}
        />
        {url && (
          <button type="button" onClick={() => onChange(null)} className="text-xs text-[#BB0A24] hover:underline">
            Remover
          </button>
        )}
      </div>
    </div>
  );
}

function TextListField({ value, onChange }: { value: unknown; onChange: (value: unknown) => void }) {
  const items = Array.isArray(value) ? (value as string[]) : [];

  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea
            rows={3}
            className={inputClass}
            value={item}
            onChange={(e) => onChange(items.map((it, j) => (j === i ? e.target.value : it)))}
          />
          <div className="flex shrink-0 flex-col gap-1">
            <button type="button" onClick={() => onChange(move(items, i, i - 1))} disabled={i === 0} className={ghostButton}>
              Subir
            </button>
            <button
              type="button"
              onClick={() => onChange(move(items, i, i + 1))}
              disabled={i === items.length - 1}
              className={ghostButton}
            >
              Descer
            </button>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className={`${ghostButton} text-[#BB0A24]`}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ""])} className={ghostButton}>
        Adicionar parágrafo
      </button>
    </div>
  );
}

function PartnersField({
  value,
  partners,
  onChange,
}: {
  value: unknown;
  partners: Row[];
  onChange: (value: unknown) => void;
}) {
  const selected = Array.isArray(value) ? (value as Row[]) : [];
  const selectedIds = new Set(selected.map((e) => String(e?._ref ?? e?._id ?? "")).filter(Boolean));

  if (partners.length === 0) {
    return <p className="text-xs text-[#A1A1AA]">Cadastre parceiros na seção Parceiros para vinculá-los aqui.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {partners.map((partner) => {
        const id = String(partner._id);
        const isOn = selectedIds.has(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() =>
              onChange(
                isOn ? selected.filter((e) => String(e?._ref ?? e?._id) !== id) : [...selected, { _ref: id }]
              )
            }
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              isOn
                ? "border-[#BB0A24] bg-[#BB0A24] text-white"
                : "border-[#E4E4E7] bg-white text-[#52525B] hover:border-[#BB0A24] hover:text-[#BB0A24]"
            }`}
          >
            {String(partner.name)}
          </button>
        );
      })}
    </div>
  );
}

/* ── editor de campo ─────────────────────────────────── */

function FieldEditor({
  field,
  row,
  areas,
  partners,
  onChange,
}: {
  field: Field;
  row: Row;
  areas: Row[];
  partners: Row[];
  onChange: (path: string, value: unknown) => void;
}) {
  const value = getPath(row, field.path);
  const help = field.help ? <p className="mt-1 text-xs text-[#A1A1AA]">{field.help}</p> : null;

  if (field.type === "objectList") {
    const items = Array.isArray(value) ? (value as Row[]) : [];
    const update = (next: Row[]) => onChange(field.path, next);

    return (
      <div className="sm:col-span-2">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <label className={`${labelClass} mb-0`}>{field.label}</label>
          <button type="button" onClick={() => update([...items, field.newItem()])} className={ghostButton}>
            Adicionar
          </button>
        </div>
        {help}
        <div className="mt-2 space-y-3">
          {items.length === 0 && (
            <p className="rounded-lg border border-dashed border-[#E4E4E7] px-3 py-4 text-center text-xs text-[#A1A1AA]">
              Nenhum item ainda.
            </p>
          )}
          {items.map((item, i) => (
            <div key={i} className="rounded-lg border border-[#E4E4E7] bg-[#FAFAFA] p-3">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-semibold text-[#52525B]">
                  {String(getPath(item, field.itemLabel ?? "title") || `Item ${i + 1}`)}
                </span>
                <span className="flex shrink-0 gap-1">
                  <button type="button" onClick={() => update(move(items, i, i - 1))} disabled={i === 0} className={ghostButton}>
                    Subir
                  </button>
                  <button
                    type="button"
                    onClick={() => update(move(items, i, i + 1))}
                    disabled={i === items.length - 1}
                    className={ghostButton}
                  >
                    Descer
                  </button>
                  <button
                    type="button"
                    onClick={() => update(items.filter((_, j) => j !== i))}
                    className={`${ghostButton} text-[#BB0A24]`}
                  >
                    Excluir
                  </button>
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {field.fields.map((sub) => (
                  <FieldEditor
                    key={sub.path}
                    field={sub}
                    row={item}
                    areas={areas}
                    partners={partners}
                    onChange={(subPath, subValue) =>
                      update(items.map((it, j) => (j === i ? setPath(it, subPath, subValue) : it)))
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const label = <label className={labelClass}>{field.label}</label>;

  if (field.type === "boolean") {
    return (
      <div className="flex items-center">
        <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-[#E4E4E7] bg-white px-3 py-2.5">
          <input
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange(field.path, e.target.checked)}
            className="h-4 w-4 accent-[#BB0A24]"
          />
          <span className="text-sm text-[#18181B]">{field.label}</span>
        </label>
      </div>
    );
  }

  if (
    field.type === "image" ||
    field.type === "imageList" ||
    field.type === "media" ||
    field.type === "partners" ||
    field.type === "textList"
  ) {
    return (
      <div className="sm:col-span-2">
        {label}
        {field.type === "image" && <ImageField value={value} onChange={(v) => onChange(field.path, v)} />}
        {field.type === "imageList" && <ImageListField value={value} onChange={(v) => onChange(field.path, v)} />}
        {field.type === "media" && <MediaField value={value} onChange={(v) => onChange(field.path, v)} />}
        {field.type === "textList" && <TextListField value={value} onChange={(v) => onChange(field.path, v)} />}
        {field.type === "partners" && (
          <PartnersField value={value} partners={partners} onChange={(v) => onChange(field.path, v)} />
        )}
        {help}
      </div>
    );
  }

  if (field.type === "area") {
    const current = (getPath(value, "_id") as string | undefined) ?? "";
    return (
      <div>
        {label}
        <select
          className={inputClass}
          value={current}
          onChange={(e) => {
            const area = areas.find((a) => a._id === e.target.value);
            onChange(field.path, area ? { ...area } : undefined);
          }}
        >
          <option value="">Sem área</option>
          {areas.map((a) => (
            <option key={String(a._id)} value={String(a._id)}>
              {String(a.name)}
            </option>
          ))}
        </select>
        {help}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div className="sm:col-span-2">
        {label}
        <textarea
          rows={3}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(field.path, e.target.value)}
        />
        {help}
      </div>
    );
  }

  if (field.type === "color") {
    const color = typeof value === "string" && value ? value : "#BB0A24";
    return (
      <div>
        {label}
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={color}
            onChange={(e) => onChange(field.path, e.target.value)}
            className="h-9 w-12 shrink-0 cursor-pointer rounded border border-[#E4E4E7]"
          />
          <input className={inputClass} value={color} onChange={(e) => onChange(field.path, e.target.value)} />
        </div>
        {help}
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        type={field.type === "number" ? "number" : field.type === "date" ? "date" : "text"}
        className={inputClass}
        value={
          field.type === "date"
            ? String(value ?? "").slice(0, 10)
            : value === undefined || value === null
              ? ""
              : String(value)
        }
        onChange={(e) => {
          const raw = e.target.value;
          onChange(field.path, field.type === "number" ? (raw === "" ? undefined : Number(raw)) : raw);
        }}
      />
      {help}
    </div>
  );
}

/** Agrupa os campos em blocos, na ordem em que os grupos aparecem. */
function groupFields(fields: Field[]): Array<{ group: string | null; fields: Field[] }> {
  const groups: Array<{ group: string | null; fields: Field[] }> = [];
  for (const field of fields) {
    const key = field.group ?? null;
    const last = groups[groups.length - 1];
    if (last && last.group === key) last.fields.push(field);
    else groups.push({ group: key, fields: [field] });
  }
  return groups;
}

function FieldGroups({
  fields,
  row,
  areas,
  partners,
  onChange,
}: {
  fields: Field[];
  row: Row;
  areas: Row[];
  partners: Row[];
  onChange: (path: string, value: unknown) => void;
}) {
  return (
    <div className="space-y-7">
      {groupFields(fields).map((group, i) => (
        <div key={group.group ?? i}>
          {group.group && (
            <p className="mb-3 border-b border-[#F4F4F5] pb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#BB0A24]">
              {group.group}
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => (
              <FieldEditor
                key={field.path}
                field={field}
                row={row}
                areas={areas}
                partners={partners}
                onChange={onChange}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── painel (lista ou formulário único) ──────────────── */

function PanelEditor({
  panel,
  content,
  areas,
  partners,
  onChange,
}: {
  panel: Panel;
  content: Row;
  areas: Row[];
  partners: Row[];
  onChange: (path: string, value: unknown) => void;
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const value = getPath(content, panel.path);

  if (panel.kind === "single") {
    const row = (value ?? {}) as Row;
    return (
      <div className="rounded-xl border border-[#E4E4E7] bg-white p-4 sm:p-6">
        <FieldGroups
          fields={panel.fields}
          row={row}
          areas={areas}
          partners={partners}
          onChange={(path, v) => onChange(panel.path, setPath(row, path, v))}
        />
      </div>
    );
  }

  const rows = Array.isArray(value) ? (value as Row[]) : [];

  return (
    <div className="space-y-3">
      {rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-[#E4E4E7] bg-white px-4 py-10 text-center text-sm text-[#A1A1AA]">
          Nenhum item cadastrado.
        </p>
      )}

      {rows.map((row, i) => {
        const key = String(row._id ?? row._key ?? i);
        const isOpen = openItem === key;
        const subtitle = panel.subtitlePath ? String(getPath(row, panel.subtitlePath) ?? "") : "";

        return (
          <div key={key} className="overflow-hidden rounded-xl border border-[#E4E4E7] bg-white">
            <div className="flex flex-wrap items-center gap-3 px-4 py-3">
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : key)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#F4F4F5] text-[10px] font-bold text-[#71717A]">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold">
                    {String(getPath(row, panel.titlePath ?? "name") || "Sem título")}
                  </span>
                  {subtitle && <span className="block truncate text-xs text-[#A1A1AA]">{subtitle}</span>}
                </span>
              </button>
              <div className="flex shrink-0 gap-1">
                <button
                  type="button"
                  onClick={() => onChange(panel.path, move(rows, i, i - 1))}
                  disabled={i === 0}
                  className={ghostButton}
                >
                  Subir
                </button>
                <button
                  type="button"
                  onClick={() => onChange(panel.path, move(rows, i, i + 1))}
                  disabled={i === rows.length - 1}
                  className={ghostButton}
                >
                  Descer
                </button>
                <button
                  type="button"
                  onClick={() => onChange(panel.path, rows.filter((_, j) => j !== i))}
                  className={`${ghostButton} text-[#BB0A24]`}
                >
                  Excluir
                </button>
                <button type="button" onClick={() => setOpenItem(isOpen ? null : key)} className={ghostButton}>
                  {isOpen ? "Fechar" : "Editar"}
                </button>
              </div>
            </div>

            {isOpen && (
              <div className="border-t border-[#F4F4F5] bg-[#FCFCFC] p-4 sm:p-5">
                <FieldGroups
                  fields={panel.fields}
                  row={row}
                  areas={areas}
                  partners={partners}
                  onChange={(path, v) =>
                    onChange(panel.path, rows.map((r, j) => (j === i ? setPath(r, path, v) : r)))
                  }
                />
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => {
          if (!panel.newItem) return;
          const item = panel.newItem();
          onChange(panel.path, [...rows, item]);
          setOpenItem(String(item._id ?? item._key ?? rows.length));
        }}
        className="w-full rounded-xl border border-dashed border-[#D4D4D8] bg-white py-3 text-sm font-semibold text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24]"
      >
        Adicionar item
      </button>
    </div>
  );
}

/* ── componente principal ────────────────────────────── */

type Access =
  | { status: "open" | "anonymous" | "unconfigured"; email: null }
  | { status: "authenticated"; email: string };

const ACCESS_SECTION = "__access";

export default function AdminPanel() {
  const [access, setAccess] = useState<Access | null>(null);
  const [content, setContent] = useState<Row | null>(null);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [activePanel, setActivePanel] = useState(SECTIONS[0].panels[0].id);
  const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const loadAccess = useCallback(async () => {
    const res = await fetch("/api/admin/session");
    setAccess((await res.json()) as Access);
  }, []);

  useEffect(() => {
    fetch("/api/admin/session")
      .then((r) => r.json())
      .then((data) => setAccess(data as Access))
      .catch(() => setAccess({ status: "anonymous", email: null }));
  }, []);

  const signedIn = access?.status === "open" || access?.status === "authenticated";

  useEffect(() => {
    if (!signedIn) return;
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => setContent(data as Row))
      .catch(() => setStatus({ kind: "error", text: "Não foi possível carregar o conteúdo." }));
  }, [signedIn]);

  const section = useMemo(
    () => SECTIONS.find((s) => s.id === activeSection) ?? SECTIONS[0],
    [activeSection]
  );
  const panel = useMemo(
    () => section.panels.find((p) => p.id === activePanel) ?? section.panels[0],
    [section, activePanel]
  );

  const areas = useMemo(() => (Array.isArray(content?.areas) ? (content?.areas as Row[]) : []), [content]);
  const partners = useMemo(
    () => (Array.isArray(content?.partners) ? (content?.partners as Row[]) : []),
    [content]
  );

  const updatePath = useCallback((path: string, value: unknown) => {
    setContent((prev) => (prev ? setPath(prev, path, value) : prev));
    setDirty(true);
    setStatus(null);
  }, []);

  function selectSection(id: string) {
    const next = SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];
    setActiveSection(next.id);
    setActivePanel(next.panels[0].id);
    setMenuOpen(false);
  }

  async function save() {
    if (!content) return;
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const json = (await res.json()) as { error?: string };
        throw new Error(json.error ?? "Falha ao salvar.");
      }
      setContent((await res.json()) as Row);
      setDirty(false);
      setStatus({ kind: "ok", text: "Salvo. Recarregue a página do site para ver o resultado." });
    } catch (e) {
      setStatus({ kind: "error", text: e instanceof Error ? e.message : "Falha ao salvar." });
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/session", { method: "DELETE" });
    setContent(null);
    await loadAccess();
  }

  async function reset() {
    if (!window.confirm("Restaurar o conteúdo inicial? As edições locais serão perdidas.")) return;
    const res = await fetch("/api/admin/content", { method: "DELETE" });
    setContent((await res.json()) as Row);
    setDirty(false);
    setStatus({ kind: "ok", text: "Conteúdo inicial restaurado." });
  }

  if (!access) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 text-center text-sm text-[#71717A]">
        Carregando...
      </div>
    );
  }

  if (access.status === "unconfigured") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6">
        <div className="max-w-md text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#BB0A24]">Painel do GAS</p>
          <h1 className="mt-2 text-xl font-black text-[#18181B]">Acesso não configurado</h1>
          <p className="mt-3 text-sm leading-6 text-[#71717A]">
            Falta a variável de ambiente <code>AUTH_SECRET</code> neste ambiente. Sem ela o painel
            não abre, porque não há como assinar a sessão com segurança.
          </p>
        </div>
      </div>
    );
  }

  if (access.status === "anonymous") {
    return <AdminLogin onSignedIn={loadAccess} />;
  }

  if (!content) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] px-6 text-center text-sm text-[#71717A]">
        {status?.text ?? "Carregando conteúdo..."}
      </div>
    );
  }

  const showAccess = activeSection === ACCESS_SECTION;

  const nav = (
    <nav className="flex flex-col gap-0.5">
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          type="button"
          onClick={() => selectSection(s.id)}
          className={`rounded-lg px-3 py-2 text-left text-sm transition ${
            s.id === activeSection
              ? "bg-[#BB0A24] font-semibold text-white"
              : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]"
          }`}
        >
          {s.label}
        </button>
      ))}

      <div className="my-2 border-t border-[#F4F4F5]" />

      <button
        type="button"
        onClick={() => {
          setActiveSection(ACCESS_SECTION);
          setMenuOpen(false);
        }}
        className={`rounded-lg px-3 py-2 text-left text-sm transition ${
          activeSection === ACCESS_SECTION
            ? "bg-[#BB0A24] font-semibold text-white"
            : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]"
        }`}
      >
        Acessos
      </button>

      <div className="my-2 border-t border-[#F4F4F5]" />

      <button
        type="button"
        onClick={() => {
          setActiveSection(ACCESS_SECTION);
          setMenuOpen(false);
        }}
        className={`rounded-lg px-3 py-2 text-left text-sm transition ${
          activeSection === ACCESS_SECTION
            ? "bg-[#BB0A24] font-semibold text-white"
            : "text-[#52525B] hover:bg-[#F4F4F5] hover:text-[#18181B]"
        }`}
      >
        Acessos
      </button>
    </nav>
  );

  const footer = (
    <div className="space-y-2 border-t border-[#E4E4E7] p-3">
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="block rounded-lg border border-[#E4E4E7] px-3 py-2 text-center text-sm font-medium text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24]"
      >
        Abrir o site
      </a>
      <button
        type="button"
        onClick={reset}
        className="w-full rounded-lg px-3 py-2 text-center text-xs text-[#A1A1AA] transition hover:text-[#BB0A24]"
      >
        Restaurar conteúdo inicial
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#18181B]">
      <div className="lg:grid lg:grid-cols-[260px_1fr]">
        {/* ── Sidebar (desktop) ───────────────────────── */}
        <aside className="hidden border-r border-[#E4E4E7] bg-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
          <div className="border-b border-[#E4E4E7] px-5 py-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#BB0A24]">Admin local</p>
            <p className="mt-1.5 text-xs leading-5 text-[#71717A]">
              Uma seção por página do site. Edita <code className="text-[#52525B]">local-content/content.json</code>.
            </p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">{nav}</div>
          {footer}
        </aside>

        {/* ── Conteúdo ────────────────────────────────── */}
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 border-b border-[#E4E4E7] bg-white/95 backdrop-blur">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E4E4E7] lg:hidden"
                  aria-label="Abrir menu"
                >
                  <span className="flex h-4 w-4 flex-col justify-between">
                    <span className="block h-0.5 w-4 bg-[#52525B]" />
                    <span className="block h-0.5 w-4 bg-[#52525B]" />
                    <span className="block h-0.5 w-4 bg-[#52525B]" />
                  </span>
                </button>
                <div className="min-w-0">
                  <h1 className="truncate text-base font-bold sm:text-lg">
                    {showAccess ? "Acessos" : section.label}
                  </h1>
                  <p className="truncate text-xs text-[#71717A]">
                    {showAccess ? "Quem pode entrar no painel." : panel.hint ?? section.hint}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {access.status === "authenticated" && (
                  <button
                    type="button"
                    onClick={signOut}
                    className="hidden rounded-lg border border-[#E4E4E7] px-3 py-2 text-xs font-medium text-[#52525B] transition hover:border-[#BB0A24] hover:text-[#BB0A24] sm:inline-block"
                  >
                    Sair
                  </button>
                )}
                {dirty && !showAccess && (
                  <span className="hidden text-xs text-[#A1A1AA] sm:inline">Alterações não salvas</span>
                )}
                <button
                  type="button"
                  onClick={save}
                  hidden={showAccess}
                  disabled={saving || !dirty}
                  className="rounded-lg bg-[#BB0A24] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#8F071B] disabled:opacity-40"
                >
                  {saving ? "Salvando..." : dirty ? "Salvar" : "Salvo"}
                </button>
              </div>
            </div>

            {/* Abas da página */}
            {!showAccess && section.panels.length > 1 && (
              <div className="flex gap-1 overflow-x-auto border-t border-[#F4F4F5] px-4 py-2 sm:px-6 lg:px-8">
                {section.panels.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setActivePanel(p.id)}
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      p.id === panel.id
                        ? "bg-[#F4F4F5] text-[#18181B]"
                        : "text-[#A1A1AA] hover:text-[#52525B]"
                    }`}
                  >
                    {p.label}
                    {p.kind === "list" && (
                      <span className="ml-1.5 text-[10px] text-[#A1A1AA]">
                        {(getPath(content, p.path) as unknown[] | undefined)?.length ?? 0}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {status && (
              <div
                className={`border-t px-4 py-2 text-xs sm:px-6 lg:px-8 ${
                  status.kind === "ok"
                    ? "border-[#E4E4E7] bg-[#F8F8F8] text-[#52525B]"
                    : "border-[#BB0A24]/20 bg-[#BB0A24]/5 text-[#BB0A24]"
                }`}
              >
                {status.text}
              </div>
            )}
          </header>

          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {showAccess ? (
              <AdminUsers />
            ) : (
            <PanelEditor
              key={panel.id}
              panel={panel}
              content={content}
              areas={areas}
              partners={partners}
              onChange={updatePath}
            />
            )}
          </main>
        </div>
      </div>

      {/* ── Menu lateral (mobile) ─────────────────────── */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E4E4E7] px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#BB0A24]">Admin local</p>
              <button type="button" onClick={() => setMenuOpen(false)} className="text-sm text-[#71717A]">
                Fechar
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">{nav}</div>
            {footer}
          </div>
        </div>
      )}
    </div>
  );
}
