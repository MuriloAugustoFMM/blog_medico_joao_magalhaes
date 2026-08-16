import { notFound } from 'next/navigation'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getVideoBySlug } from '@/lib/videos'
import { getVideoEmbedUrl } from '@/lib/video'

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

export default async function VideoPage({
  params,
}: Props) {
  const video = await getVideoBySlug(params.slug)

  if (!video) {
    notFound()
  }

  const embedUrl = getVideoEmbedUrl(
    video.videoUrl,
    video.provider
  )

  return (
    <>
      <Nav />

      <main className="bg-white">
        <header className="bg-navy py-14 sm:py-20 md:py-28">
          <div className="max-w-5xl mx-auto px-5 sm:px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-teal mb-5">
              Vídeo
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-tight">
              {video.title}
            </h1>

            {video.description && (
              <p className="mt-6 text-base sm:text-lg text-slateLight leading-relaxed max-w-3xl">
                {video.description}
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slateLight">
              {video.publishedAt && (
                <span>
                  {formatDate(video.publishedAt)}
                </span>
              )}

              {video.duration && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <span>{video.duration}</span>
                </>
              )}
            </div>
          </div>
        </header>

        <section className="max-w-5xl mx-auto px-5 py-10 sm:px-6 sm:py-12 md:py-20">
          {embedUrl ? (
            <div className="relative aspect-video bg-black overflow-hidden">
              <iframe
                src={embedUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative aspect-video overflow-hidden bg-slate-900">
              {video.thumbnailUrl && (
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <p className="text-white">
                  Não foi possível carregar o vídeo.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}
