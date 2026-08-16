import Link from 'next/link'

const DOCTOR_NAME = 'Dr. João Magalhães'
const DOCTOR_SPECIALTY = 'Endocrinologista'
const DOCTOR_CRM = 'CRM 103983-MG'
const CONTACT_EMAIL = 'contato@drjoaomagalhaes.med.br'

export default function Footer() {
  return (
    <footer className="bg-navy py-12 sm:py-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 pb-10 border-b border-white/10">
          <div>
            <p className="font-serif text-lg font-semibold text-white mb-1.5">{DOCTOR_NAME}</p>
            <p className="text-xs text-slateLight/70 mb-1">{DOCTOR_SPECIALTY} · {DOCTOR_CRM}</p>
            <p className="text-xs text-slateLight/70">{CONTACT_EMAIL}</p>
          </div>

          <div className="flex gap-12 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slateLight/50 mb-4">Conteúdo</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/" className="text-slateLight hover:text-white transition-colors">Início</Link>
                <Link href="/blog" className="text-slateLight hover:text-white transition-colors">Artigos</Link>
                <Link href="/videos" className="text-slateLight hover:text-white transition-colors">Vídeos</Link>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slateLight/50 mb-4">Atendimento</p>
              <div className="flex flex-col gap-2.5">
                <a href="/#pre-consulta" className="text-slateLight hover:text-white transition-colors">
                  Pré-consulta
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-7 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-slateLight/40 text-center sm:text-left">
            © {new Date().getFullYear()} {DOCTOR_NAME}. Todos os direitos reservados.
          </p>
          <p className="text-[11px] text-slateLight/40 text-center sm:text-right">
            As informações deste site não substituem a consulta médica presencial.
          </p>
        </div>
      </div>
    </footer>
  )
}
