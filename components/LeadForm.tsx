'use client'

import { useState } from 'react'

export default function LeadForm() {
  const [formData, setFormData] = useState({ name: '', email: '', interest: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'newsletter' }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Erro ao enviar. Tente novamente.')
      }
      setStatus('success')
    } catch (err: any) {
      setStatus('error')
      setErrorMsg(err.message || 'Erro ao enviar. Tente novamente.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: 'rgba(42,157,143,0.1)' }}
        >
          <svg className="w-7 h-7 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-semibold text-navy mb-3">Cadastro realizado!</h3>
        <p className="text-slate">
          Obrigado, {formData.name}.<br />Você receberá nossos conteúdos em breve.
        </p>
      </div>
    )
  }

  return (
    <>
      <h3 className="font-serif text-2xl font-semibold text-navy mb-7">Cadastre-se gratuitamente</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-slate block mb-2">Nome completo</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
            placeholder="Seu nome"
            className="w-full border border-border px-4 py-3.5 text-sm text-ink placeholder-[#C4CDD6] focus:outline-none focus:border-teal transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-slate block mb-2">E-mail</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
            placeholder="seu@email.com"
            className="w-full border border-border px-4 py-3.5 text-sm text-ink placeholder-[#C4CDD6] focus:outline-none focus:border-teal transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-slate block mb-2">Interesse principal</label>
          <select
            value={formData.interest}
            onChange={(e) => setFormData((f) => ({ ...f, interest: e.target.value }))}
            className="w-full border border-border px-4 py-3.5 text-sm text-ink focus:outline-none focus:border-teal transition-colors bg-white cursor-pointer"
          >
            <option value="">Selecione um tema</option>
            <option value="prevencao">Prevenção cardiovascular</option>
            <option value="hipertensao">Hipertensão arterial</option>
            <option value="colesterol">Colesterol e triglicerídeos</option>
            <option value="estilo-vida">Estilo de vida saudável</option>
            <option value="consulta">Agendar uma consulta</option>
          </select>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-600 -mt-1">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-teal text-white py-4 text-sm font-medium hover:bg-tealDark transition-colors mt-1 disabled:opacity-60"
        >
          {status === 'loading' ? 'Enviando...' : 'Quero receber conteúdo gratuito'}
        </button>
        <p className="text-[10px] text-[#9BA8B5] text-center">
          Seus dados são seguros. Cancelamento a qualquer momento.
        </p>
      </form>
    </>
  )
}
