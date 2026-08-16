'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import {slugify} from '@/lib/slugify'

export async function saveArticle(data: {
  id?: string
  title: string
  slug: string
  description: string
  imageUrl: string
  category: string
  readTime: number
  content: unknown
  status: 'DRAFT' | 'PUBLISHED'
}) {
  const publishedAt =
    data.status === 'PUBLISHED'
      ? new Date()
      : null

  if (data.id) {
    await prisma.article.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: slugify(data.title),
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        readTime: data.readTime,
        content: data.content as any,
        status: data.status,
        publishedAt,
      },
    })
  } else {
    await prisma.article.create({
      data: {
        title: data.title,
        slug: slugify(data.title),
        description: data.description,
        imageUrl: data.imageUrl,
        category: data.category,
        readTime: data.readTime,
        content: data.content as any,
        status: data.status,
        publishedAt,
      },
    })
  }

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath('/admin/artigos')
}

export async function deleteArticle(id: string) {
  await prisma.article.delete({
    where: { id },
  })

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/admin')
  revalidatePath('/admin/artigos')
}