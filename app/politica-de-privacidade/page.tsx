'use client'

import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-5 py-10 sm:px-6">
      <div className="w-full max-w-2xl">
        <div className="bg-white p-6 sm:p-8 md:p-10 shadow-xl rounded-sm">

          {/* Cabeçalho */}
          <div className="mb-8 border-b border-slate-100 pb-6">
            <p className="text-[10px] uppercase tracking-[0.22em] text-teal mb-4">
              Transparência e Segurança
            </p>

            <h1 className="font-serif text-3xl text-navy sm:text-4xl">
              Política de Privacidade
            </h1>

            <p className="mt-3 text-sm text-slate-500">
              Tratamento de dados pessoais e conformidade com a LGPD.
            </p>
          </div>

          {/* Conteúdo */}
          <div className="space-y-7 text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                1. Quem é o responsável pelo tratamento dos seus dados?
              </h2>

              <p>
                O responsável pelo tratamento dos dados pessoais coletados por
                este site é o Dr. João Magalhães.
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <p>
                  <span className="font-medium text-navy">CPF/CNPJ:</span>{' '}
                  [inserir CPF ou CNPJ]
                </p>

                <p>
                  <span className="font-medium text-navy">CRM:</span>{' '}
                  [inserir CRM]
                </p>

                <p>
                  <span className="font-medium text-navy">
                    Endereço profissional:
                  </span>{' '}
                  [inserir endereço, se aplicável]
                </p>

                <p>
                  <span className="font-medium text-navy">
                    E-mail de privacidade:
                  </span>{' '}
                  [inserir e-mail]
                </p>
              </div>

              <p className="mt-3">
                Para dúvidas, solicitações ou informações relacionadas ao
                tratamento de seus dados pessoais, entre em contato pelo
                e-mail informado acima.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                2. Quais dados pessoais coletamos?
              </h2>

              <p>
                Dependendo da forma como você utiliza o site, podemos coletar
                dados fornecidos voluntariamente por você, como:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>nome;</li>
                <li>número de WhatsApp ou telefone;</li>
                <li>endereço de e-mail.</li>
              </ul>

              <p className="mt-3">
                O fornecimento dessas informações é voluntário. Entretanto,
                alguns dados são necessários para que nossa equipe possa
                entrar em contato com você em relação à solicitação realizada.
              </p>

              <div className="mt-4 border-l-2 border-teal bg-slate-50 px-4 py-3">
                <p>
                  <strong className="text-navy">Importante:</strong> o
                  formulário de pré-consulta não solicita informações sobre
                  diagnóstico, doenças, exames, medicamentos ou outros dados
                  clínicos. Recomendamos que você não inclua informações
                  médicas ou outras informações sensíveis no campo destinado
                  aos dados de contato.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                3. Dados coletados automaticamente
              </h2>

              <p>
                Durante a utilização do site, determinados dados técnicos
                poderão ser coletados automaticamente, dependendo da
                configuração da infraestrutura utilizada, tais como:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>endereço IP;</li>
                <li>tipo e versão do navegador;</li>
                <li>sistema operacional;</li>
                <li>dispositivo utilizado;</li>
                <li>data e horário de acesso;</li>
                <li>páginas acessadas;</li>
                <li>informações técnicas relacionadas à navegação.</li>
              </ul>

              <p className="mt-3">
                Essas informações podem ser utilizadas para segurança,
                funcionamento, manutenção e melhoria do site.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                4. Para quais finalidades utilizamos seus dados?
              </h2>

              <p>
                Os dados fornecidos por você poderão ser utilizados para:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>responder ao seu contato;</li>
                <li>
                  entrar em contato pelo WhatsApp ou telefone informado;
                </li>
                <li>entrar em contato por e-mail;</li>
                <li>
                  fornecer informações sobre a pré-consulta solicitada;
                </li>
                <li>realizar o atendimento inicial pela equipe;</li>
                <li>organizar e administrar solicitações recebidas;</li>
                <li>melhorar a experiência de utilização do site;</li>
                <li>
                  prevenir fraudes, abusos e incidentes de segurança;
                </li>
                <li>
                  cumprir obrigações legais ou regulatórias, quando aplicável.
                </li>
              </ul>

              <p className="mt-3">
                Não utilizamos os dados fornecidos por meio deste site para
                realizar diagnósticos ou substituir uma consulta médica.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                5. Base legal para o tratamento
              </h2>

              <p>
                O tratamento dos dados pessoais será realizado de acordo com
                as hipóteses previstas na Lei Geral de Proteção de Dados
                Pessoais (LGPD — Lei nº 13.709/2018), incluindo, conforme o
                caso:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  execução de procedimentos preliminares relacionados à
                  contratação ou atendimento solicitado pelo titular;
                </li>
                <li>cumprimento de obrigações legais ou regulatórias;</li>
                <li>exercício regular de direitos;</li>
                <li>
                  legítimo interesse, quando aplicável e respeitados os
                  direitos e liberdades do titular;
                </li>
                <li>
                  consentimento, quando esta for a base legal adequada.
                </li>
              </ul>

              <p className="mt-3">
                A base legal utilizada poderá variar de acordo com a finalidade
                específica do tratamento.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                6. Compartilhamento de dados
              </h2>

              <p>
                Seus dados pessoais não são comercializados.
              </p>

              <p className="mt-3">
                Poderemos compartilhar dados pessoais com prestadores de
                serviços e parceiros necessários para a operação do site e do
                atendimento, como:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>serviços de hospedagem e infraestrutura;</li>
                <li>serviços de armazenamento de dados;</li>
                <li>
                  plataformas utilizadas para gerenciamento de contatos;
                </li>
                <li>ferramentas de comunicação;</li>
                <li>serviços de tecnologia e segurança.</li>
              </ul>

              <p className="mt-3">
                Quando houver compartilhamento, buscamos limitar o acesso aos
                dados ao necessário para a execução da respectiva finalidade.
              </p>

              <p className="mt-3">
                Também poderemos compartilhar dados quando isso for necessário
                para cumprir obrigação legal, determinação de autoridade
                competente ou para o exercício regular de direitos.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                7. WhatsApp e outros canais de contato
              </h2>

              <p>
                Caso você forneça seu número de WhatsApp ou telefone, nossa
                equipe poderá utilizá-lo para entrar em contato em razão da
                solicitação realizada pelo site.
              </p>

              <p className="mt-3">
                A utilização do WhatsApp também está sujeita às políticas e
                aos termos da própria plataforma.
              </p>

              <p className="mt-3">
                Não recomendamos o envio de informações médicas, exames,
                diagnósticos, documentos ou outros dados sensíveis por meio do
                formulário ou de canais de comunicação sem que isso tenha sido
                previamente orientado pela equipe responsável.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                8. Cookies e tecnologias semelhantes
              </h2>

              <p>
                O site poderá utilizar cookies e tecnologias semelhantes para
                permitir seu funcionamento adequado, melhorar a experiência
                de navegação, analisar a utilização do site e, quando aplicável,
                realizar atividades de segurança ou medição.
              </p>

              <p className="mt-3">
                Cookies são pequenos arquivos armazenados no dispositivo do
                usuário durante a navegação.
              </p>

              <p className="mt-3">
                Você pode configurar seu navegador para bloquear ou excluir
                cookies. Entretanto, determinadas funcionalidades do site
                poderão deixar de funcionar corretamente.
              </p>

              <p className="mt-3">
                Caso sejam utilizados cookies não essenciais, especialmente
                aqueles destinados a publicidade ou rastreamento, sua
                utilização será realizada de acordo com a legislação aplicável
                e com as configurações de consentimento disponibilizadas no
                site, quando aplicável.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                9. Armazenamento e segurança
              </h2>

              <p>
                Adotamos medidas técnicas e administrativas razoáveis para
                proteger os dados pessoais contra acessos não autorizados,
                perda, alteração, divulgação ou destruição indevida.
              </p>

              <p className="mt-3">
                Entre as medidas de segurança podem estar controles de acesso,
                proteção da infraestrutura, utilização de conexões seguras e
                limitação do acesso aos dados às pessoas que efetivamente
                necessitem dessas informações.
              </p>

              <p className="mt-3">
                Apesar dos esforços empregados, nenhum sistema eletrônico é
                completamente seguro. Por isso, não é possível garantir
                segurança absoluta dos dados.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                10. Por quanto tempo os dados são armazenados?
              </h2>

              <p>
                Os dados pessoais serão armazenados pelo período necessário
                para cumprir as finalidades para as quais foram coletados.
              </p>

              <p className="mt-3">
                Após o término da finalidade, os dados poderão ser eliminados
                ou anonimizados, salvo quando sua conservação for necessária
                para:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>cumprimento de obrigação legal ou regulatória;</li>
                <li>exercício regular de direitos;</li>
                <li>prevenção de fraudes;</li>
                <li>
                  atendimento de outras hipóteses previstas na legislação.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                11. Seus direitos
              </h2>

              <p>
                Nos termos da LGPD, você poderá, quando aplicável e observados
                os requisitos legais, solicitar:
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>
                  confirmação da existência de tratamento de seus dados;
                </li>
                <li>acesso aos dados pessoais tratados;</li>
                <li>
                  correção de dados incompletos, inexatos ou desatualizados;
                </li>
                <li>
                  anonimização, bloqueio ou eliminação de dados desnecessários
                  ou tratados em desconformidade com a legislação;
                </li>
                <li>
                  portabilidade dos dados, observadas as regulamentações
                  aplicáveis;
                </li>
                <li>
                  eliminação dos dados tratados com base no consentimento,
                  quando aplicável;
                </li>
                <li>
                  informações sobre as entidades públicas e privadas com as
                  quais seus dados foram compartilhados;
                </li>
                <li>
                  informações sobre a possibilidade de não fornecer
                  consentimento e sobre as consequências dessa decisão;
                </li>
                <li>
                  revogação do consentimento, quando o tratamento estiver
                  baseado nessa hipótese.
                </li>
              </ul>

              <p className="mt-3">
                Para exercer seus direitos, entre em contato pelo e-mail:
              </p>

              <p className="mt-2 font-medium text-navy">
                [inserir e-mail de privacidade]
              </p>

              <p className="mt-3">
                Poderemos solicitar informações adicionais para confirmar a
                identidade do solicitante e proteger os dados contra
                solicitações fraudulentas.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                12. Dados de crianças e adolescentes
              </h2>

              <p>
                Este site não é direcionado especificamente a crianças.
              </p>

              <p className="mt-3">
                Caso sejam fornecidos dados pessoais de crianças ou
                adolescentes, o tratamento será realizado de acordo com as
                disposições da legislação aplicável e, quando necessário,
                mediante as autorizações legalmente exigidas.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                13. Links para outros sites
              </h2>

              <p>
                Este site poderá conter links para sites ou serviços de
                terceiros.
              </p>

              <p className="mt-3">
                Não somos responsáveis pelas práticas de privacidade,
                segurança, conteúdo ou tratamento de dados realizado por esses
                terceiros. Recomendamos que você consulte as respectivas
                políticas de privacidade antes de fornecer informações
                pessoais.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                14. Alterações nesta Política de Privacidade
              </h2>

              <p>
                Esta Política de Privacidade poderá ser atualizada
                periodicamente para refletir alterações nas práticas do site,
                nos serviços utilizados ou na legislação aplicável.
              </p>

              <p className="mt-3">
                A versão mais recente estará sempre disponível nesta página,
                acompanhada da respectiva data de atualização.
              </p>

              <p className="mt-3">
                Recomendamos que você consulte esta página periodicamente.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-navy mb-2">
                15. Contato
              </h2>

              <p>
                Se você tiver dúvidas sobre esta Política de Privacidade,
                sobre o tratamento de seus dados ou quiser exercer seus
                direitos previstos na LGPD, entre em contato:
              </p>

              <div className="mt-3 space-y-1">
                <p>
                  <span className="font-medium text-navy">Responsável:</span>{' '}
                  Dr. João Magalhães
                </p>

                <p>
                  <span className="font-medium text-navy">E-mail:</span>{' '}
                  [inserir e-mail]
                </p>

                <p>
                  <span className="font-medium text-navy">
                    Telefone/WhatsApp:
                  </span>{' '}
                  [inserir, se desejado]
                </p>
              </div>
            </section>

            <div className="pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-400">
                Atualizado em agosto de 2026.
              </p>
            </div>
          </div>

          {/* Botão de retorno */}
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