import Link from 'next/link'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getPublishedArticles } from '@/lib/articles'

export const revalidate = 60

function formatDate(date: Date | null) {
  if (!date) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default async function BlogPage() {
  const articles = await getPublishedArticles()

  return (
    <>
      <Nav />

      <main>
        <section className="bg-navy py-16 sm:py-24 md:py-32">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-teal mb-5">
              Conteúdo
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-light text-white leading-tight">
              Artigos
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slateLight leading-relaxed">
              Informação sobre saúde baseada em evidências
              científicas, escrita para você.
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            {articles.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500">
                  Nenhum artigo publicado ainda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group block"
                  >
                    <article>
                      <div className="aspect-[3/2] overflow-hidden bg-slate-100 mb-6">
                        {article.imageUrl ? (
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <span className="text-xs uppercase tracking-widest text-slate-400">
                              Artigo
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        {article.category && (
                          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-teal">
                            {article.category}
                          </span>
                        )}

                        {article.readTime && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-xs text-slate-500">
                              {article.readTime} min
                            </span>
                          </>
                        )}
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-medium text-navy leading-tight group-hover:text-teal transition-colors">
                        {article.title}
                      </h2>

                      {article.description && (
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {article.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {formatDate(article.publishedAt)}
                        </span>

                        <span className="text-xs font-medium text-navy group-hover:text-teal transition-colors">
                          Ler artigo →
                        </span>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
