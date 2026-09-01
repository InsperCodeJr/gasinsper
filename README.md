# Site institucional GAS

Site institucional do GAS (Grupo de Ação Social) em Next.js 16, com painel de
administração próprio em `/admin`.

## Rodando localmente

```bash
npm install
npm run dev
```

O site sobe em http://localhost:3000 e o painel em http://localhost:3000/admin.

Sem nenhuma variável de ambiente o projeto funciona por completo: o conteúdo fica
em `local-content/content.json`, os arquivos enviados em `public/uploads`, e o
painel abre direto, sem login. Os dois diretórios ficam fora do Git.

## Onde o conteúdo mora

| | Desenvolvimento | Produção |
|---|---|---|
| Conteúdo e acessos | `local-content/*.json` | Vercel Blob, store **privada** |
| Imagens, GIFs e vídeos | `public/uploads` | Vercel Blob, store **pública** |
| Login no painel | dispensado | obrigatório |

A escolha é automática: com `BLOB_CONTENT_TOKEN` e `BLOB_MEDIA_TOKEN` definidos,
o projeto usa o Blob; sem eles, usa o disco.

O conteúdo é lido da store privada com `useCache: false`. Sem isso, uma edição
levaria até um minuto para aparecer no site por causa do cache do Blob.

## Configurando produção

1. Crie duas stores no painel da Vercel: uma **privada** (conteúdo) e uma
   **pública** (mídia). O modo de acesso não pode ser alterado depois.
2. Copie os tokens de leitura e escrita de cada uma para `BLOB_CONTENT_TOKEN` e
   `BLOB_MEDIA_TOKEN`.
3. Gere um `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` com o primeiro acesso.

Veja `.env.local.example` para a lista completa.

## Acesso ao painel

`ADMIN_EMAIL` e `ADMIN_PASSWORD` valem apenas enquanto nenhum acesso tiver sido
cadastrado: no primeiro login, esse par vira o primeiro administrador e as
variáveis deixam de ter efeito. Dali em diante, os acessos são gerenciados na
seção **Acessos** do painel, que permite cadastrar, trocar senha e remover.

Detalhes de segurança: a senha é guardada como hash scrypt com sal aleatório, a
sessão é um cookie `HttpOnly` assinado com HMAC e vale 7 dias, e ninguém pode
remover o próprio acesso nem o último acesso existente.

Sem `AUTH_SECRET`, o painel não abre em produção, porque não haveria como
assinar a sessão com segurança.

## Estrutura

- `app/(site)/` páginas públicas
- `app/admin/` painel de administração
- `app/api/admin/` conteúdo, mídia, sessão e acessos
- `components/` interface do site e do painel
- `content/pages.ts` textos padrão de cada página
- `content/defaults.ts` conteúdo inicial (projetos, áreas, eventos, ONGs, parceiros, equipe)
- `lib/content.ts` leitura usada pelas páginas
- `lib/contentStore.ts` armazenamento (Blob ou disco)
- `lib/migrateContent.ts` normalização e compatibilidade com formatos antigos
- `lib/auth.ts` senhas e sessão

## Scripts

```bash
npm run dev     # ambiente de desenvolvimento
npm run build   # build de produção (roda checagem de tipos)
npm run start   # sobe o build de produção
npm run lint    # eslint
```
