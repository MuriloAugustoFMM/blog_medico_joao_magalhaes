'use client'

import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-5 py-10 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 sm:p-8 md:p-10 shadow-xl rounded-sm">
          
          {/* Cabeçalho alinhado com o padrão do Login */}
          <div className="mb-8 border-b border-slate-100 pb-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-teal mb-4">
              Transparência e Segurança
            </p>

            <h1 className="font-serif text-3xl text-navy sm:text-4xl">
              Política de Privacidade
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Termos de uso e conformidade com a LGPD.
            </p>
          </div>

          {/* Conteúdo Jurídico com a tipografia do painel */}
          <div className="space-y-6 text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            
            <section>
              <h2 className="text-base font-semibold text-navy mb-2">1. Objetivo do Tratamento</h2>
              <p>
                Este documento esclarece como os dados coletados no formulário de contato do site do Dr. João Magalhães são tratados, em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">2. Coleta de Dados e Finalidade</h2>
              <p>
                Coletamos apenas as informações fornecidas voluntariamente por você em nosso formulário de triagem (como Nome, E-mail, Telefone e observações clínicas iniciais). A finalidade exclusiva é realizar o primeiro contato, entender seu contexto de saúde e viabilizar o agendamento de sua pré-consulta.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">3. Segurança e Sigilo</h2>
              <p>
                Seus dados são armazenados de forma estritamente digital e protegidos contra acessos não autorizados. Não realizamos o envio de mensagens em massa (spam) e nenhum dado é compartilhado com terceiros para fins comerciais.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">4. Seus Direitos</h2>
              <p>
                Como titular dos dados, você pode solicitar a qualquer momento a confirmação da existência do tratamento, o acesso completo aos seus dados, correções ou a exclusão definitiva deles de nossos sistemas de atendimento.
              </p>
            </section>

            <p className="text-[11px] text-slate-400 pt-4 border-t border-slate-100">
              Atualizado em Agosto de 2026.
            </p>
          </div>

          {/* Ação de retorno estilizada como o botão do formulário */}
          <div className="mt-8">
            <Link
              href="/"
              className="block w-full bg-navy text-white py-3 px-5 text-sm font-medium text-center hover:bg-teal transition-colors"
            >
              Voltar para o site
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
