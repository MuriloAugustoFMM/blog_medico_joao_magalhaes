import { prisma } from '@/lib/prisma'
import { toWhatsAppLink } from '@/lib/phone'

export const dynamic = 'force-dynamic'

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <main className="max-w-5xl mx-auto px-5 py-8 sm:px-6 sm:py-10">
      <header className="mb-8 sm:mb-10">
        <p className="text-xs uppercase tracking-[0.2em] text-teal mb-3">CMS</p>
        <h1 className="font-serif text-3xl text-navy sm:text-4xl">Leads</h1>
        <p className="mt-2 text-slate-500">
          {leads.length} contato{leads.length !== 1 ? 's' : ''} recebido{leads.length !== 1 ? 's' : ''} pelo formulário de pré-consulta.
        </p>
      </header>

      {leads.length === 0 ? (
        <div className="bg-white border border-slate-200 p-10 text-center">
          <p className="text-sm text-slate-500">Nenhum lead recebido ainda.</p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 divide-y divide-slate-100">
          {leads.map((lead) => (
            <div
              key={lead.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >
              <div className="min-w-0">
                <p className="font-medium text-navy">{lead.name}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  <span>{lead.whatsapp}</span>
                  {lead.email && <span>{lead.email}</span>}
                  <span>{formatDate(lead.createdAt)}</span>
                </div>
              </div>

              <a
                href={toWhatsAppLink(lead.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 self-start rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 sm:self-auto"
              >
                <IconWhatsApp />
                Chamar no WhatsApp
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}

function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.2L2 22l4.9-1.3C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3C4.2 15.1 3.8 13.6 3.8 12c0-4.5 3.7-8.2 8.2-8.2s8.2 3.7 8.2 8.2-3.7 8.2-8.2 8.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.2-.3.2-.5.1-.2-.1-1-.4-2-1.2-.7-.6-1.2-1.4-1.4-1.6-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.2.2-.4.1-.1 0-.3 0-.4 0-.1-.6-1.4-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2 1 2.4c.1.1 1.6 2.5 3.9 3.5.5.2 1 .4 1.3.5.5.2 1 .1 1.4-.1.4-.2 1.5-.6 1.6-1.2.1-.5.1-1-.1-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  )
}
