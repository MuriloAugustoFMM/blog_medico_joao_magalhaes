'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { saveVideo } from '@/app/admin/videos/actions'

type Props = {
  video?: any
}

export default function VideoForm({ video }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function submit(formData: FormData) {
    setLoading(true)

    await saveVideo({
      id: video?.id,
      title: String(formData.get('title')),
      slug: String(formData.get('title')),
      description: String(
        formData.get('description')
      ),
      videoUrl: String(formData.get('videoUrl')),
      provider: formData.get('provider') as
        | 'YOUTUBE'
        | 'VIMEO'
        | 'OTHER',
      thumbnailUrl: String(
        formData.get('thumbnailUrl')
      ),
      duration: String(formData.get('duration')),
      status: formData.get('status') as
        | 'DRAFT'
        | 'PUBLISHED',
    })

    router.push('/admin/videos')
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
          placeholder="Digite o título do vídeo"
          defaultValue={video?.title}
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
          placeholder="Digite uma descrição para o vídeo"
          defaultValue={video?.description}
          rows={4}
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div>
        <label
          htmlFor="videoUrl"
          className="block text-sm font-medium text-navy mb-2"
        >
          URL do vídeo
        </label>

        <input
          id="videoUrl"
          name="videoUrl"
          type="url"
          placeholder="https://www.youtube.com/watch?v=..."
          defaultValue={video?.videoUrl}
          required
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div>
        <label
          htmlFor="provider"
          className="block text-sm font-medium text-navy mb-2"
        >
          Plataforma
        </label>

        <select
          id="provider"
          name="provider"
          defaultValue={video?.provider ?? 'YOUTUBE'}
          className="w-full border border-slate-200 p-4"
        >
          <option value="YOUTUBE">
            YouTube
          </option>

          <option value="VIMEO">
            Vimeo
          </option>

          <option value="OTHER">
            Outra
          </option>
        </select>
      </div>

      <div>
        <label
          htmlFor="thumbnailUrl"
          className="block text-sm font-medium text-navy mb-2"
        >
          URL da thumbnail
        </label>

        <input
          id="thumbnailUrl"
          name="thumbnailUrl"
          type="url"
          placeholder="https://exemplo.com/thumbnail.jpg"
          defaultValue={video?.thumbnailUrl}
          className="w-full border border-slate-200 p-4"
        />
      </div>

      <div>
        <label
          htmlFor="duration"
          className="block text-sm font-medium text-navy mb-2"
        >
          Duração
        </label>

        <input
          id="duration"
          name="duration"
          placeholder="Ex.: 12:34"
          defaultValue={video?.duration}
          className="w-full border border-slate-200 p-4"
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
          defaultValue={video?.status ?? 'DRAFT'}
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
        {loading ? 'Salvando...' : 'Salvar vídeo'}
      </button>
    </form>
  )
}