'use client'

import { useState } from 'react'
import Link from 'next/link'

const DOCTOR_NAME = 'Dr. João Magalhães'
const DOCTOR_INITIALS = 'JM'
const DOCTOR_SPECIALTY = process.env.NEXT_PUBLIC_EPECIALIZATION
const DOCTOR_CRM = process.env.NEXT_PUBLIC_DOCTOR_CRM

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center border-r border-navy/20 pr-2.5 sm:pr-3">
            <span className="font-serif text-xl sm:text-2xl text-navy">{DOCTOR_INITIALS}</span>
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold tracking-[0.08em] text-navy leading-tight">
              {DOCTOR_NAME.toUpperCase()}
            </p>
            <p className="text-[10px] tracking-[0.16em] text-teal uppercase">
              {DOCTOR_SPECIALTY} | {DOCTOR_CRM}
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/blog" className="text-sm text-slate hover:text-navy transition-colors">
            Artigos
          </Link>
          <Link href="/videos" className="text-sm text-slate hover:text-navy transition-colors">
            Vídeos
          </Link>
          <a
            href="/#pre-consulta"
            className="bg-teal text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-tealDark transition-colors"
          >
            Agendar pré-consulta
          </a>
        </div>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          className="md:hidden flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span className={`block h-0.5 w-5 origin-center bg-navy transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-navy transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 origin-center bg-navy transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-white px-5 py-5 flex flex-col gap-1 text-sm">
          <Link href="/blog" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-slate hover:text-navy">
            Artigos
          </Link>
          <Link href="/videos" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-slate hover:text-navy">
            Vídeos
          </Link>
          <a
            href="/#pre-consulta"
            onClick={() => setMenuOpen(false)}
            className="mt-2 bg-teal text-white px-4 py-3 rounded-lg text-center font-semibold"
          >
            Agendar pré-consulta
          </a>
        </div>
      )}
    </nav>
  )
}
