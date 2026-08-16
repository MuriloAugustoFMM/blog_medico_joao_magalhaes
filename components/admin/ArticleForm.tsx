'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import ArticleEditor from './ArticleEditor'
import { saveArticle } from '@/app/admin/artigos/actions'

type Props = {
  article?: any
}

export default function ArticleForm({ article }: Props) {
  const router = useRouter()

  const [content, setContent] = useState(
    article?.content ?? null
  )

  const [loading, setLoading] = useState(false)

  async function submit(formData: FormData) {
    setLoading(true)

    await saveArticle({
      id: article?.id,
      title: String(formData.get('title')),
      slug: String(formData.get('title')),
      description: String(formData.get('description')),
      imageUrl: String(formData.get('imageUrl')),
      category: String(formData.get('category')),
      readTime: Number(formData.get('readTime')),
      content,
      status: formData.get('status') as
        | 'DRAFT'
        | 'PUBLISHED',
    })

    router.push('/admin/artigos')
    router.refresh()
  }

  return (
    <form
      action={submit}
      className="max-w-4xl space-y-6"
    >
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-navy mb-2"
        >
          Título
        </label>

        <input
          id="title"
          name="title"
          placeholder="Digite o título do artigo"
          defaultValue={article?.title}
          required
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-navy mb-2"
        >
          Descrição
        </label>

        <textarea
          id="description"
          name="description"
          placeholder="Digite uma breve descrição do artigo"
          defaultValue={article?.description}
          rows={4}
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-navy mb-2"
        >
          URL da imagem
        </label>

        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          placeholder="https://exemplo.com/imagem.jpg"
          defaultValue={article?.imageUrl}
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-navy mb-2"
          >
            Categoria
          </label>

          <input
            id="category"
            name="category"
            placeholder="Ex.: Cardiologia"
            defaultValue={article?.category}
            className="w-full border border-slate-200 p-4"
          />
        </div>

        <div>
          <label
            htmlFor="readTime"
            className="block text-sm font-medium text-navy mb-2"
          >
            Tempo de leitura
          </label>

          <input
            id="readTime"
            name="readTime"
            type="number"
            min="1"
            placeholder="Ex.: 8"
            defaultValue={article?.readTime}
            className="w-full border border-slate-200 p-4"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy mb-2">
          Conteúdo
        </label>

        <ArticleEditor
          initialContent={article?.content}
          onChange={setContent}
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="block text-sm font-medium text-navy mb-2"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          defaultValue={article?.status ?? 'DRAFT'}
          className="border border-slate-200 p-4"
        >
          <option value="DRAFT">
            Rascunho
          </option>

          <option value="PUBLISHED">
            Publicado
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-navy text-white px-6 py-3 disabled:opacity-50"
      >
        {loading ? 'Salvando...' : 'Salvar artigo'}
      </button>
    </form>
  )
}