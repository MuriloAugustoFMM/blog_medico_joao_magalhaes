import { prisma } from '@/lib/prisma'

export async function getPublishedArticles(limit?: number) {
  return prisma.article.findMany({
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

export async function getArticleBySlug(slug: string) {
  return prisma.article.findFirst({
    where: {
      slug,
      status: 'PUBLISHED',
    },
  })
}

export async function getAllArticles() {
  return prisma.article.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
}