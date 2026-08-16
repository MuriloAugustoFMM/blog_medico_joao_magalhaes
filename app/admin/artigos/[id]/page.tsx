import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import ArticleForm from '@/components/admin/ArticleForm'

type Props = {
  params: {
    id: string
  }
}

export default async function EditArticlePage({
  params,
}: Props) {
  const article = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!article) {
    notFound()
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-teal mb-3">
          CMS · Artigos
        </p>

        <h1 className="font-serif text-4xl text-navy">
          Editar artigo
        </h1>
      </div>

      <ArticleForm article={article} />
    </main>
  )
}