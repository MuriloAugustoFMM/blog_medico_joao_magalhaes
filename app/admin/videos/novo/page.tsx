import VideoForm from '@/components/admin/VideoForm'

export default function NewVideoPage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-serif text-4xl text-navy mb-8">
        Novo vídeo
      </h1>

      <VideoForm />
    </main>
  )
}