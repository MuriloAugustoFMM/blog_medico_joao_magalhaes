import { prisma } from '@/lib/prisma'

export async function getPublishedVideos(limit?: number) {
  return prisma.video.findMany({
    where: {
      status: 'PUBLISHED',
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      publishedAt: 'desc',
    },
    ...(limit !== undefined
      ? { take: limit }
      : {}),
  })
}

export async function getVideoBySlug(slug: string) {
  return prisma.video.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
    },
  })
}

export async function getAllVideos() {
  return prisma.video.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}