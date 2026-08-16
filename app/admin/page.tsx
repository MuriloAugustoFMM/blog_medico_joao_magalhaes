import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [articles, videos, drafts, leadsCount, recentArticles, recentVideos] =
    await Promise.all([
      prisma.article.count(),
      prisma.video.count(),
      prisma.article.count({
        where: { status: 'DRAFT' },
      }),
      prisma.lead.count(),
      prisma.article.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      }),
      prisma.video.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 5,
        select: {
          id: true,
          title: true,
          status: true,
          updatedAt: true,
        },
      }),
    ])

  const recent = [
    ...recentArticles.map((item) => ({
      ...item,
      type: 'Artigo',
      href: `/admin/artigos/${item.id}`,
    })),
    ...recentVideos.map((item) => ({
      ...item,
      type: 'Vídeo',
      href: `/admin/videos/${item.id}`,
    })),
  ]
    .sort(
      (a, b) =>
        b.updatedAt.getTime() -
        a.updatedAt.getTime()
    )
    .slice(0, 8)

  return (
    <main className="max-w-7xl mx-auto px-5 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-teal mb-3">
          CMS
        </p>

        <h1 className="font-serif text-3xl text-navy sm:text-4xl">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Gerencie o conteúdo do site.
        </p>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        <StatCard
          label="Artigos"
          value={articles}
          href="/admin/artigos"
        />

        <StatCard
          label="Vídeos"
          value={videos}
          href="/admin/videos"
        />

        <StatCard
          label="Leads"
          value={leadsCount}
          href="/admin/leads"
        />

        <StatCard
          label="Rascunhos"
          value={drafts}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 mt-6 sm:gap-5 sm:mt-8 md:grid-cols-2">
        <Link
          href="/admin/artigos/novo"
          className="bg-navy text-white p-6 hover:bg-teal transition-colors sm:p-7"
        >
          <IconPlus className="text-white" />

          <h2 className="font-serif text-xl mt-4 sm:text-2xl">
            Novo artigo
          </h2>

          <p className="text-sm text-slateLight mt-2">
            Criar um novo conteúdo.
          </p>
        </Link>

        <Link
          href="/admin/videos/novo"
          className="bg-white border border-slate-200 p-6 hover:border-teal transition-colors sm:p-7"
        >
          <IconPlus className="text-navy" />

          <h2 className="font-serif text-xl text-navy mt-4 sm:text-2xl">
            Novo vídeo
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Adicionar um vídeo externo.
          </p>
        </Link>
      </section>

      <section className="mt-8 bg-white border border-slate-200 sm:mt-10">
        <div className="p-5 border-b sm:p-6">
          <h2 className="font-serif text-xl text-navy sm:text-2xl">
            Conteúdo recente
          </h2>
        </div>

        {recent.length === 0 ? (
          <p className="p-5 text-sm text-slate-500 sm:p-6">
            Nenhum conteúdo criado ainda.
          </p>
        ) : (
          <div>
            {recent.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.href}
                className="flex flex-col gap-2 p-4 border-b last:border-0 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between sm:p-5"
              >
                <div>
                  <p className="text-xs text-teal uppercase tracking-wider">
                    {item.type}
                  </p>

                  <p className="font-medium text-navy mt-1">
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:flex-col sm:items-end sm:text-right">
                  <Status status={item.status} />

                  <p className="text-xs text-slate-400 sm:mt-1">
                    {item.updatedAt.toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function StatCard({
  label,
  value,
  href,
}: {
  label: string
  value: number
  href?: string
}) {
  const content = (
    <>
      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="text-3xl font-serif text-navy mt-3 sm:text-4xl">
        {value}
      </p>
    </>
  )

  if (!href) {
    return (
      <div className="bg-white border border-slate-200 p-5 sm:p-6">
        {content}
      </div>
    )
  }

  return (
    <Link
      href={href}
      className="bg-white border border-slate-200 p-5 hover:border-teal transition-colors sm:p-6"
    >
      {content}
    </Link>
  )
}

function Status({
  status,
}: {
  status: string
}) {
  return (
    <span className="text-xs uppercase tracking-wider text-slate-500">
      {status === 'PUBLISHED'
        ? 'Publicado'
        : 'Rascunho'}
    </span>
  )
}

function IconPlus({ className = '' }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 5v16M5 13h16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}
