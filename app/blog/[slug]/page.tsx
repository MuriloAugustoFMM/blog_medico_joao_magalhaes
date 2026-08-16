import { notFound } from 'next/navigation'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getArticleBySlug } from '@/lib/articles'

type Props = {
  params: {
    slug: string
  }
}

function formatDate(date: Date | null) {
  if (!date) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export default async function ArticlePage({
  params,
}: Props) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <>
      <Nav />

      <main className="bg-white">
        <header className="bg-navy py-14 sm:py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-5 sm:px-6">
            {article.category && (
              <p className="text-xs uppercase tracking-[0.2em] text-teal mb-5">
                {article.category}
              </p>
            )}

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-tight">
              {article.title}
            </h1>

            {article.description && (
              <p className="mt-6 text-base sm:text-lg md:text-xl text-slateLight leading-relaxed">
                {article.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slateLight">
              {article.publishedAt && (
                <span>
                  {formatDate(article.publishedAt)}
                </span>
              )}

              {article.readTime && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {article.readTime} min de leitura
                  </span>
                </>
              )}
            </div>
          </div>
        </header>

        {article.imageUrl && (
          <div className="max-w-5xl mx-auto px-5 -mt-4 sm:px-6 sm:-mt-8">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}

        <article className="max-w-3xl mx-auto px-5 py-12 sm:px-6 sm:py-16 md:py-24">
          <ArticleContent content={article.content} />
        </article>
      </main>

      <Footer />
    </>
  )
}

function ArticleContent({
  content,
}: {
  content: unknown
}) {
  if (!content || typeof content !== 'object') {
    return null
  }

  const data = content as {
    type?: string
    content?: any[]
  }

  if (!Array.isArray(data.content)) {
    return null
  }

  return (
    <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-navy prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-teal">
      {data.content.map((node, index) => (
        <TiptapNode key={index} node={node} />
      ))}
    </div>
  )
}

function TiptapNode({ node }: { node: any }) {
  switch (node.type) {
    case 'paragraph':
      return (
        <p>
          {renderInlineContent(node.content)}
        </p>
      )

    case 'heading': {
      const level = node.attrs?.level ?? 2
      const text = renderInlineContent(node.content)

      if (level === 1) return <h1>{text}</h1>
      if (level === 3) return <h3>{text}</h3>

      return <h2>{text}</h2>
    }

    case 'bulletList':
      return (
        <ul>
          {node.content?.map(
            (item: any, index: number) => (
              <li key={index}>
                {item.content?.map(
                  (child: any, childIndex: number) => (
                    <TiptapNode
                      key={childIndex}
                      node={child}
                    />
                  )
                )}
              </li>
            )
          )}
        </ul>
      )

    case 'orderedList':
      return (
        <ol>
          {node.content?.map(
            (item: any, index: number) => (
              <li key={index}>
                {item.content?.map(
                  (child: any, childIndex: number) => (
                    <TiptapNode
                      key={childIndex}
                      node={child}
                    />
                  )
                )}
              </li>
            )
          )}
        </ol>
      )

    case 'blockquote':
      return (
        <blockquote>
          {node.content?.map(
            (child: any, index: number) => (
              <TiptapNode
                key={index}
                node={child}
              />
            )
          )}
        </blockquote>
      )

    case 'horizontalRule':
      return <hr />

    default:
      return null
  }
}

function renderInlineContent(content: any[]) {
  if (!Array.isArray(content)) {
    return null
  }

  return content.map((item, index) => {
    if (item.type === 'hardBreak') {
      return <br key={index} />
    }

    let element: React.ReactNode = item.text ?? ''

    if (item.marks?.some((mark: any) => mark.type === 'bold')) {
      element = <strong>{element}</strong>
    }

    if (item.marks?.some((mark: any) => mark.type === 'italic')) {
      element = <em>{element}</em>
    }

    if (
      item.marks?.some(
        (mark: any) => mark.type === 'strike'
      )
    ) {
      element = <s>{element}</s>
    }

    return <span key={index}>{element}</span>
  })
}
