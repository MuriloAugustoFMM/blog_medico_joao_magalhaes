# Blog Médico — Next.js + Sanity + Postgres

Site institucional/blog para médico, com:
- **Blog de artigos e vídeos**, editáveis por um painel visual (Sanity), sem precisar mexer em código
- **Captura de leads** (formulário de newsletter) salva em banco de dados Postgres
- Design responsivo baseado no protótipo Figma original

---

## 1. Rodando localmente

```bash
npm install
cp .env.example .env
```

Preencha o `.env` (veja os passos 2 e 3 abaixo para os valores) e depois:

```bash
npx prisma migrate dev --name init   # cria a tabela de leads no banco
npm run dev
```

Acesse `http://localhost:3000`. O painel de conteúdo fica em `http://localhost:3000/studio`.

> Enquanto o Sanity não tiver posts/vídeos cadastrados, o site mostra 3 artigos e 3 vídeos de exemplo automaticamente (dados fictícios), só para o layout não ficar vazio. Assim que você criar conteúdo real no `/studio`, eles substituem os exemplos sozinhos.

---

## 2. Configurando o Sanity (CMS visual)

1. Crie uma conta gratuita em **https://www.sanity.io**
2. Rode `npx sanity@latest init` dentro da pasta do projeto (ou crie o projeto pelo site) e escolha **"reuse existing configuration"** quando perguntado — o schema já está pronto em `sanity/schemaTypes`
3. Copie o **Project ID** gerado e cole em `NEXT_PUBLIC_SANITY_PROJECT_ID` no `.env`
4. Em sanity.io/manage → seu projeto → API → Tokens, crie um token com permissão de leitura (**Viewer**) e cole em `SANITY_API_READ_TOKEN`
5. Rode o projeto (`npm run dev`) e acesse `/studio` — é lá que o médico vai criar e editar os artigos e vídeos, com uma interface visual (sem código)

---

## 3. Configurando o banco de dados (leads)

Recomendo o **Neon** (Postgres gratuito, feito para funcionar bem com Vercel):

1. Crie uma conta em **https://neon.tech** (ou **https://supabase.com**, também funciona)
2. Crie um projeto/banco novo
3. Copie a "Connection String" e cole em `DATABASE_URL` no `.env`
4. Rode `npx prisma migrate dev --name init` para criar a tabela `Lead`

Os leads capturados no formulário do site ficam salvos nessa tabela. Para consultá-los rapidamente sem instalar nada, rode:

```bash
npx prisma studio
```

Isso abre uma interface visual (local) para ver/exportar os leads. Se quiser, no futuro dá pra conectar essa tabela num CRM ou disparar e-mails automáticos a partir dela — é só avisar.

---

## 4. Deploy (recomendado: Vercel)

1. Suba este projeto para um repositório no GitHub
2. Crie uma conta em **https://vercel.com** (gratuita) e importe o repositório
3. Em **Settings → Environment Variables**, adicione as mesmas variáveis do seu `.env`:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_READ_TOKEN`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_DOCTOR_NAME`, `NEXT_PUBLIC_DOCTOR_CRM`, `NEXT_PUBLIC_CONTACT_EMAIL`
4. Clique em **Deploy**

Depois disso, qualquer novo post criado no `/studio` aparece no site automaticamente em até 60 segundos (sem precisar de novo deploy).

Você pode conectar um domínio próprio (ex: `drrafaelmendes.med.br`) direto no painel da Vercel, em Settings → Domains.

---

## Estrutura do projeto

```
app/
  page.tsx              → Página inicial
  blog/                  → Listagem e detalhe de artigos
  videos/                → Listagem e detalhe de vídeos
  studio/                → Painel do Sanity (CMS), em /studio
  api/leads/route.ts     → Endpoint que salva o formulário no banco
components/               → Nav, Hero, About, ContentGrid, LeadForm, Footer
lib/
  sanity.ts               → Cliente e queries do Sanity
  prisma.ts               → Cliente do banco de dados
  placeholder-data.ts      → Conteúdo de exemplo (some quando houver posts reais)
sanity/schemaTypes/        → Definição dos campos de "Artigo" e "Vídeo" no CMS
prisma/schema.prisma       → Modelo da tabela de leads
```

## Próximos passos sugeridos
- Trocar as informações do médico (`NEXT_PUBLIC_DOCTOR_NAME`, CRM, endereço no `Footer.tsx`) pelas reais
- Cadastrar os primeiros artigos/vídeos reais no `/studio`
- Configurar um envio de e-mail automático (ex: Resend) para notificar o médico a cada novo lead — posso implementar isso quando quiser
- Adicionar Google Analytics / Meta Pixel para acompanhar conversão dos leads
