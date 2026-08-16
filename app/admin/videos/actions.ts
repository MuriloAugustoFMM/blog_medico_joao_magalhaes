'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/slugify'

export async function saveVideo(data: {
  id?: string
  title: string
  slug: string
  description: string
  videoUrl: string
  provider: 'YOUTUBE' | 'VIMEO' | 'OTHER'
  thumbnailUrl: string
  duration: string
  status: 'DRAFT' | 'PUBLISHED'
}) {
  const publishedAt =
    data.status === 'PUBLISHED'
      ? new Date()
      : null

  const values = {
    title: data.title,
    slug: slugify(data.title),
    description: data.description,
    videoUrl: data.videoUrl,
    provider: data.provider,
    thumbnailUrl: data.thumbnailUrl,
    duration: data.duration,
    status: data.status,
    publishedAt,
  }

  if (data.id) {
    await prisma.video.update({
      where: { id: data.id },
      data: values,
    })
  } else {
    await prisma.video.create({
      data: values,
    })
  }

  revalidatePath('/')
  revalidatePath('/videos')
  revalidatePath(`/videos/${data.slug}`)
  revalidatePath('/admin/videos')
}

export async function deleteVideo(id: string) {
  await prisma.video.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/videos')
  revalidatePath('/admin')
  revalidatePath('/admin/videos')
}