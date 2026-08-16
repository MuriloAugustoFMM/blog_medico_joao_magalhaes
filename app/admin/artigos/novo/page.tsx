import ArticleForm from '@/components/admin/ArticleForm'

export default function NewArticlePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="font-serif text-4xl text-navy mb-8">
        Novo artigo
      </h1>

      <ArticleForm />
    </main>
  )
}