import { notFound } from 'next/navigation'

import { prisma } from '@/lib/prisma'
import VideoForm from '@/components/admin/VideoForm'

type Props = {
  params: {
    id: string
  }
}

export default async function EditVideoPage({
  params,
}: Props) {
  const video = await prisma.video.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!video) {
    notFound()
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-teal mb-3">
          CMS · Vídeos
        </p>

        <h1 className="font-serif text-4xl text-navy">
          Editar vídeo
        </h1>
      </div>

      <VideoForm video={video} />
    </main>
  )
}