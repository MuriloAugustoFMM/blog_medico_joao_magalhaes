'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/admin',
    })

    if (!result || result.error) {
      setError('Não foi possível entrar.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-5 sm:px-6">
      <div className="w-full max-w-md">
        <div className="bg-white p-6 sm:p-8 md:p-10">
          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.22em] text-teal mb-4">
              Área administrativa
            </p>

            <h1 className="font-serif text-3xl text-navy sm:text-4xl">
              Entrar
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Acesse o painel de conteúdo.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-navy mb-2"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
                autoComplete="email"
                className="w-full border border-slate-200 px-4 py-3 outline-none focus:border-teal"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-navy mb-2"
              >
                Senha
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                required
                autoComplete="current-password"
                className="w-full border border-slate-200 px-4 py-3 outline-none focus:border-teal"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy text-white py-3 px-5 text-sm font-medium hover:bg-teal transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
