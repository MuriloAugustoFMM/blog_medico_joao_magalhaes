'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPhoneBR, isValidPhoneBR } from '@/lib/phone'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', whatsapp: '', email: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidPhoneBR(formData.whatsapp)) {
      setStatus('error')
      setErrorMsg('Digite um WhatsApp válido, com DDD (ex: (11) 91234-5678).')
      return
    }

    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao enviar. Tente novamente.')
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Erro ao enviar. Tente novamente.')
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f9fd] text-[#09284a]">

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#062d63]">

        {/* elementos decorativos */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full border-[50px] border-[#1d79d8]/30 sm:-right-40 sm:-top-40 sm:h-[650px] sm:w-[650px] sm:border-[80px]" />
        <div className="pointer-events-none absolute right-[35%] top-0 hidden h-full w-px bg-white/5 lg:block" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[500px] rounded-full bg-[#087ff5]/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6">

          {/* NAV */}
          <header className="flex h-20 items-center justify-between sm:h-24">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <div className="flex h-11 w-11 items-center justify-center border-r border-white/40 pr-3 sm:h-14 sm:w-14 sm:pr-4">
                <span className="font-serif text-2xl text-white sm:text-4xl">JM</span>
              </div>
              <div>
                <p className="text-sm font-semibold tracking-[0.12em] text-white sm:text-lg sm:tracking-[0.15em]">
                  DR. JOÃO MAGALHÃES
                </p>
                <p className="text-[10px] tracking-[0.18em] text-[#55b8ff] sm:text-xs sm:tracking-[0.22em]">
                  ENDOCRINOLOGISTA · CRM 103983-MG
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
              <Link href="/blog" className="transition hover:text-white">Artigos</Link>
              <Link href="/videos" className="transition hover:text-white">Vídeos</Link>
              <a
                href="#pre-consulta"
                className="rounded-md bg-[#087ff5] px-5 py-3 font-semibold text-white transition hover:bg-[#1590ff]"
              >
                Agendar pré-consulta
              </a>
            </nav>

            {/* botão hambúrguer (mobile) */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className={`block h-0.5 w-6 origin-center bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-6 origin-center bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            </button>
          </header>

          {/* MENU MOBILE */}
          {menuOpen && (
            <div className="mb-4 flex flex-col gap-1 rounded-2xl bg-white/5 p-4 backdrop-blur-sm md:hidden">
              <Link href="/blog" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/5">
                Artigos
              </Link>
              <Link href="/videos" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm text-white/90 hover:bg-white/5">
                Vídeos
              </Link>
              <a
                href="#pre-consulta"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-[#087ff5] px-3 py-3 text-center text-sm font-semibold text-white"
              >
                Agendar pré-consulta
              </a>
            </div>
          )}

          {/* HERO CONTENT */}
          <div className="grid grid-cols-1 py-2 lg:min-h-[680px] lg:grid-cols-[0.9fr_1.1fr] lg:py-0">

            {/* TEXTO */}
            <div className="relative z-10 flex flex-col justify-center pb-10 pt-4 sm:pb-16 sm:pt-10 lg:pb-24">

              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#35b5ff] sm:mb-6 sm:text-sm sm:tracking-[0.25em]">
                Emagrecimento com acompanhamento médico
              </p>

              <h1 className="max-w-[700px] text-[2.5rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-7xl">
                Cuide do seu peso
                <span className="block text-[#25a9ff]">com quem cuida de você.</span>
              </h1>

              <p className="mt-5 max-w-[590px] text-base leading-relaxed text-white/80 sm:mt-7 sm:text-lg md:text-xl">
                Um acompanhamento médico contínuo e individualizado, para
                emagrecer com segurança e entender o porquê de cada etapa —
                não uma fórmula pronta, mas um cuidado pensado para você.
              </p>

              {/* prova social baseada em credencial, não em avaliação tipo produto */}
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 sm:mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-[#25a9ff]">◆</span>
                  <span className="text-sm text-white/80">
                    <strong className="text-white">12 anos</strong> de endocrinologia
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#25a9ff]">◆</span>
                  <span className="text-sm text-white/80">
                    <strong className="text-white">1.500+</strong> pacientes acompanhados
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#25a9ff]">◆</span>
                  <span className="text-sm text-white/80">CRM 103983-MG</span>
                </div>
              </div>

              {/* foto do médico — versão compacta, visível também no mobile */}
              <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:hidden">
                <Image
                  src="/images/Joao_Magalhaes.png"
                  alt="Dr. João Magalhães"
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#062d63]/70 via-transparent to-transparent" />
              </div>

              {/* FORM */}
              <div id="pre-consulta" className="mt-8 max-w-[610px] sm:mt-10">
                {status === 'success' ? (
                  <div className="rounded-2xl bg-white p-8 text-center shadow-2xl shadow-black/20">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e7f3ff]">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#087ff5" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#09284a] mb-2">Recebemos seu contato!</h3>
                    <p className="text-sm text-slate-600">
                      Obrigado, {formData.name}. Nossa equipe vai falar com você em breve pelo WhatsApp.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="mb-3 text-sm font-medium text-white/90">
                      Dê o primeiro passo: converse com a equipe antes da consulta.
                    </p>
                    <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-3 shadow-2xl shadow-black/20">
                      <div className="grid gap-3 md:grid-cols-2">
                        <input
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                          placeholder="Seu nome"
                          className="h-14 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#09284a] outline-none transition placeholder:text-slate-400 focus:border-[#087ff5] focus:bg-white"
                        />
                        <input
                          name="whatsapp"
                          type="tel"
                          required
                          inputMode="numeric"
                          maxLength={16}
                          value={formData.whatsapp}
                          onChange={(e) => setFormData((f) => ({ ...f, whatsapp: formatPhoneBR(e.target.value) }))}
                          placeholder="(11) 91234-5678"
                          className="h-14 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#09284a] outline-none transition placeholder:text-slate-400 focus:border-[#087ff5] focus:bg-white"
                        />
                      </div>
                      <div className="mt-3">
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                          placeholder="Seu melhor e-mail"
                          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[#09284a] outline-none transition placeholder:text-slate-400 focus:border-[#087ff5] focus:bg-white"
                        />
                      </div>

                      {status === 'error' && (
                        <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="mt-3 flex h-14 w-full items-center justify-center rounded-xl bg-[#087ff5] px-4 text-center font-semibold leading-snug text-white transition hover:bg-[#066fd7] disabled:opacity-60"
                      >
                        {status === 'loading' ? 'Enviando...' : 'Quero iniciar minha avaliação'}
                      </button>
                    </form>
                    <p className="mt-4 flex items-center gap-2 text-xs text-white/60">
                      <span className="text-[#25a9ff]">✓</span>
                      Seus dados estão protegidos e serão utilizados apenas para contato.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* FOTO — versão grande, só desktop */}
            <div className="relative hidden lg:block">
              <div className="absolute bottom-0 right-[-80px] h-[730px] w-[650px]">
                <Image
                  src="/images/Joao_Magalhaes.png"
                  alt="Dr. João Magalhães"
                  fill
                  priority
                  className="object-contain object-bottom"
                />
              </div>
              <div className="absolute bottom-28 left-0 z-20 rounded-xl bg-white px-6 py-4 shadow-xl">
                <p className="text-sm font-semibold text-[#09284a]">Dr. João Magalhães</p>
                <p className="mt-1 text-xs text-[#087ff5]">Especialista em Endocrinologia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="bg-white py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#087ff5] sm:text-sm sm:tracking-[0.2em]">
              Uma abordagem diferente
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#09284a] sm:text-4xl md:text-5xl">
              Emagrecimento não precisa ser uma guerra contra você.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 sm:text-base">
              O acompanhamento médico permite entender seu contexto e construir
              uma estratégia individualizada — sem promessas milagrosas, com ciência
              e presença em cada etapa.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon={<IconEvaluation />}
              number="01"
              title="Avaliação individual"
              description="Cada paciente possui necessidades, histórico e objetivos diferentes. Tudo começa por ouvir a sua história."
            />
            <Feature
              icon={<IconStrategy />}
              number="02"
              title="Estratégia personalizada"
              description="O tratamento é construído de acordo com seu momento, sua rotina e o que faz sentido para você — não um protocolo genérico."
            />
            <Feature
              icon={<IconCare />}
              number="03"
              title="Acompanhamento contínuo"
              description="Você não precisa fazer tudo sozinho. Existe presença médica ao longo de todo o processo, ajustando o que for preciso."
            />
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="bg-[#f5f9fd] py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-col justify-between gap-5 sm:gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#087ff5] sm:text-sm sm:tracking-[0.2em]">
                Conteúdo
              </p>
              <h2 className="mt-3 font-serif text-3xl text-[#09284a] sm:text-4xl">
                Informação para ajudar você a tomar melhores decisões.
              </h2>
            </div>
            <div className="flex gap-3">
              <Link
                href="/blog"
                className="rounded-lg border border-[#09284a]/20 px-5 py-3 text-center text-sm font-semibold text-[#09284a]"
              >
                Ver artigos
              </Link>
              <Link
                href="/videos"
                className="rounded-lg bg-[#09284a] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Ver vídeos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#062d63] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#35b5ff] sm:text-sm sm:tracking-[0.2em]">
            Próximo passo
          </p>
          <h2 className="mt-4 font-serif text-3xl text-white sm:text-4xl md:text-5xl">
            Pronto para começar sua mudança?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
            Conheça o trabalho do Dr. João Magalhães e descubra como funciona
            o acompanhamento, do primeiro contato ao longo prazo.
          </p>
          <a
            href="#pre-consulta"
            className="mt-8 inline-flex rounded-lg bg-[#087ff5] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#1590ff] sm:px-8 sm:text-base"
          >
            Agendar minha pré-consulta
          </a>
        </div>
      </section>

    </main>
  )
}

function Feature({
  icon,
  number,
  title,
  description,
}: {
  icon: React.ReactNode
  number: string
  title: string
  description: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fdf3e7]">
          {icon}
        </div>
        <span className="text-xs font-bold text-[#087ff5]/50">{number}</span>
      </div>
      <h3 className="mt-6 font-serif text-xl text-[#09284a] sm:mt-8 sm:text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4">{description}</p>
    </div>
  )
}

/* Ícones ilustrativos próprios (evitam clichê de banco de imagens) */

function IconEvaluation() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="6.5" stroke="#087ff5" strokeWidth="1.6" />
      <path d="M20 20L15.5 15.5" stroke="#087ff5" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8 11h6M11 8v6" stroke="#087ff5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function IconStrategy() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="13" cy="13" r="9.5" stroke="#087ff5" strokeWidth="1.6" />
      <path d="M16.5 9.5L14 14l-4.5 2.5L12 12l4.5-2.5Z" fill="#087ff5" opacity="0.15" stroke="#087ff5" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="13" cy="13" r="1.2" fill="#087ff5" />
    </svg>
  )
}

function IconCare() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 20.5s-7.5-4.4-7.5-9.9C5.5 7.6 7.9 5.5 10.5 5.5c1.4 0 2.7.7 3.5 1.8.8-1.1 2.1-1.8 3.5-1.8 2.6 0 4.5 2.1 4.5 5.1 0 5.5-7.5 9.9-7.5 9.9Z"
        stroke="#087ff5"
        strokeWidth="1.6"
        strokeLinejoin="round"
        fill="#087ff5"
        fillOpacity="0.08"
      />
      <path d="M8.5 12h2l1.3-2.4 1.6 4 1.1-1.6h2.5" stroke="#087ff5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
