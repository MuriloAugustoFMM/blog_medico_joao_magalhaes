import Link from 'next/link'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getPublishedVideos } from '@/lib/videos'

export const revalidate = 60

function formatDate(date: Date | null) {
  if (!date) return ''

  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export default async function VideosPage() {
  const videos = await getPublishedVideos()

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
              Vídeos
            </h1>

            <p className="mt-6 max-w-2xl text-base sm:text-lg text-slateLight leading-relaxed">
              Informação e educação em saúde através de
              vídeos.
            </p>
          </div>
        </section>

        <section className="bg-white py-14 sm:py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-5 sm:px-6">
            {videos.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-slate-500">
                  Nenhum vídeo publicado ainda.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                  <Link
                    key={video.id}
                    href={`/videos/${video.slug}`}
                    className="group block"
                  >
                    <article>
                      <div className="relative aspect-video overflow-hidden bg-slate-100 mb-6">
                        {video.thumbnailUrl ? (
                          <img
                            src={video.thumbnailUrl}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100">
                            <span className="text-xs uppercase tracking-widest text-slate-400">
                              Vídeo
                            </span>
                          </div>
                        )}

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-white/95 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 text-navy">
                            <IconPlay />
                          </div>
                        </div>

                        {video.duration && (
                          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs">
                            {video.duration}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-teal">
                          Vídeo
                        </span>

                        <span className="w-1 h-1 rounded-full bg-slate-300" />

                        <span className="text-xs text-slate-500">
                          {video.views} visualizações
                        </span>
                      </div>

                      <h2 className="font-serif text-xl sm:text-2xl font-medium text-navy leading-tight group-hover:text-teal transition-colors">
                        {video.title}
                      </h2>

                      {video.description && (
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                      )}

                      <div className="mt-5 flex items-center justify-between">
                        <span className="text-xs text-slate-500">
                          {formatDate(video.publishedAt)}
                        </span>

                        <span className="text-xs font-medium text-navy group-hover:text-teal transition-colors">
                          Assistir →
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

function IconPlay() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-0.5">
      <path d="M4.5 2.9v12.2c0 .8.9 1.3 1.6.9l10-6.1c.6-.4.6-1.3 0-1.7l-10-6.1c-.7-.4-1.6.1-1.6.9Z" fill="currentColor" />
    </svg>
  )
}
