import Link from 'next/link'

import { prisma } from '@/lib/prisma'
import { deleteArticle } from './actions'

export default async function AdminArticles() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-xs uppercase tracking-widest text-teal">
            CMS
          </p>

          <h1 className="font-serif text-4xl text-navy">
            Artigos
          </h1>
        </div>

        <Link
          href="/admin/artigos/novo"
          className="bg-navy text-white px-5 py-3 text-sm"
        >
          Novo artigo
        </Link>
      </div>

      <div className="bg-white border border-slate-200">
        {articles.map((article) => (
          <div
            key={article.id}
            className="flex items-center justify-between p-5 border-b last:border-0"
          >
            <div>
              <h2 className="font-medium text-navy">
                {article.title}
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {article.status === 'PUBLISHED'
                  ? 'Publicado'
                  : 'Rascunho'}
              </p>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/admin/artigos/${article.id}`}
                className="text-sm text-teal"
              >
                Editar
              </Link>

              <form
                action={deleteArticle.bind(
                  null,
                  article.id
                )}
              >
                <button className="text-sm text-red-500">
                  Excluir
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}