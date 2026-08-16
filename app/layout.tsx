import type { Metadata } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

const doctorName = process.env.NEXT_PUBLIC_DOCTOR_NAME || 'Dr. Joao Magalhães'

export const metadata: Metadata = {
  title: `${doctorName} | Endocrinologista`,
  description:
    'Conteúdo médico baseado em evidências científicas sobre endocrinologia e saúde preventiva. Artigos, vídeos e agendamento de consultas.',
  openGraph: {
    title: `${doctorName} | Endocrinologista`,
    description:
      'Conteúdo médico baseado em evidências científicas sobre endocrinologia e saúde preventiva.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${outfit.variable}`}>
      <body className="font-sans bg-white text-ink min-h-screen">{children}</body>
    </html>
  )
}
