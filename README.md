# Dr. João Magalhães — Site + Blog + Admin

Site institucional do Dr. João Magalhães (Endocrinologista), com blog de artigos e vídeos,
captura de leads (formulário de pré-consulta) e um painel administrativo para gerenciar o conteúdo.

## Stack

| Tecnologia | Função |
|---|---|
| **Next.js** | Framework do site (frontend + backend em um só projeto) |
| **Prisma** | ORM — a camada que lê/escreve no banco de dados usando código TypeScript |
| **Neon** | Banco de dados Postgres, hospedado na nuvem |
| **NextAuth (Auth.js)** | Autenticação do painel administrativo (`/login`, `/admin`) |
| **Resend** | Envio de e-mail (notificação quando um lead novo chega) |
| **Vercel Blob** | Armazenamento de imagens enviadas pelo painel admin |
| **Tailwind CSS** | Estilização |
| **Vercel** | Hospedagem/deploy |

## Estrutura do projeto

```
app/
  page.tsx                    → Página inicial (hero, formulário de pré-consulta)
  login/page.tsx              → Login do painel administrativo
  blog/                       → Listagem e detalhe de artigos
  videos/                     → Listagem e detalhe de vídeos
  admin/                      → Painel administrativo (protegido por login)
    artigos/                  → CRUD de artigos
    videos/                   → CRUD de vídeos
    leads/                    → Lista de leads capturados, com link direto pro WhatsApp
  api/
    leads/route.ts            → Recebe o formulário de pré-consulta e salva no banco
    auth/[...nextauth]/       → Rota de autenticação do NextAuth
components/                    → Nav, Footer, Hero, formulários, editor de artigos
lib/
  prisma.ts                    → Cliente do Prisma (conexão com o banco)
  phone.ts                     → Validação/formatação de telefone brasileiro
  articles.ts, videos.ts       → Funções de busca de conteúdo
prisma/
  schema.prisma                → Modelos do banco (Article, Video, Lead, AdminUser)
  migrations/                  → Histórico de alterações no banco
scripts/
  create-admin.ts              → Script pra criar o primeiro usuário administrador
```

## Rodando localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo de exemplo e preencha:

```bash
cp .env.example .env
```

| Variável | O que é | Onde conseguir |
|---|---|---|
| `DATABASE_URL` | Connection string do banco Postgres | Painel do [Neon](https://neon.tech) |
| `AUTH_SECRET` | Chave usada pelo NextAuth pra assinar as sessões de login | Gerada por você — veja abaixo |
| `ADMIN_EMAIL` | E-mail do primeiro usuário admin (usado só no script de criação) | Você escolhe |
| `ADMIN_PASSWORD` | Senha do primeiro usuário admin (usado só no script de criação) | Você escolhe |
| `RESEND_API_KEY` | Chave da API do Resend, pra enviar e-mails | Painel do [Resend](https://resend.com) |
| `NOTIFICATION_EMAIL` | Pra qual e-mail avisar quando chega um lead novo | O e-mail do médico/secretária |
| `NOTIFICATION_FROM_EMAIL` | De qual e-mail o aviso é enviado | `onboarding@resend.dev` (teste) ou um e-mail do seu domínio verificado |
| `BLOB_READ_WRITE_TOKEN` | Token pra fazer upload de imagens no painel admin | Painel da Vercel → Storage → Blob |

> **Nunca** commite o arquivo `.env` — ele já está no `.gitignore`. Essas chaves são
> a "senha" de acesso a cada serviço (banco, e-mail, etc); se vazarem, qualquer
> pessoa pode acessar esses serviços como se fosse você.

### 3. Criar as tabelas no banco

```bash
npx prisma migrate dev
```

### 4. Criar o primeiro usuário admin

```bash
npx tsx scripts/create-admin.ts
```

(usa as variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` do seu `.env`)

### 5. Rodar o projeto

```bash
npm run dev
```

Acesse `http://localhost:3000`. O painel administrativo fica em `http://localhost:3000/admin`
(faça login em `/login` primeiro).

## Comandos úteis

| Comando | O que faz |
|---|---|
| `npm run dev` | Roda o site localmente |
| `npm run build` | Gera a versão de produção (usado pela Vercel no deploy) |
| `npx prisma studio` | Abre uma interface visual pra ver/editar os dados do banco |
| `npx prisma migrate dev --name nome-da-mudanca` | Cria uma nova migration após alterar o `schema.prisma` |
| `npx prisma migrate deploy` | Aplica as migrations pendentes no banco de **produção** (não usar `migrate dev` em produção) |

## Deploy

Guia completo de deploy (GitHub → Vercel → domínio) disponível no histórico do projeto.
Resumo rápido:

1. Suba o código pro GitHub (sem o `.env`)
2. Importe o repositório na [Vercel](https://vercel.com)
3. Configure as mesmas variáveis de ambiente do `.env` nas configurações do projeto na Vercel
   — use a connection string **pooled** do Neon para `DATABASE_URL`
4. Rode `npx prisma migrate deploy` apontando pro banco de produção
5. Teste tudo na URL gerada antes de conectar um domínio próprio

## Segurança — checklist rápido

- [ ] `.env` está no `.gitignore` e nunca foi commitado
- [ ] `AUTH_SECRET` é diferente entre ambiente local e produção (recomendado, não obrigatório)
- [ ] Senha do admin é forte (não é a mesma usada em outros lugares)
- [ ] CRM do médico no site é o número real (obrigatório por lei)
