export default function About() {
  return (
    <section id="sobre" className="bg-bg py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-teal mb-4">Sobre o médico</p>
            <h2 className="font-serif text-4xl font-semibold text-navy leading-tight mb-8">
              Formação e experiência a serviço da sua saúde
            </h2>
            <div className="aspect-[4/5] bg-blue overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=500&h=620&fit=crop&auto=format"
                alt="Médico em consultório"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="pt-0 lg:pt-14">
            <p className="text-[#4A5568] leading-relaxed text-lg mb-6">
              Médico formado pela Faculdade de Medicina da USP, com residência em
              Cardiologia no Instituto do Coração (InCor) e fellowship em Medicina Preventiva nos Estados
              Unidos. Atua há mais de 15 anos no diagnóstico e tratamento de doenças cardiovasculares.
            </p>
            <p className="text-[#4A5568] leading-relaxed mb-10">
              Acredita que a educação em saúde é a melhor ferramenta de prevenção. Por isso, produz
              conteúdo científico acessível para que cada paciente entenda seu próprio corpo e tome
              decisões mais conscientes — dentro e fora do consultório.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
              {[
                ['Formação', 'Medicina — FMUSP · 2006'],
                ['Residência', 'Cardiologia — InCor · 2009'],
                ['Fellowship', 'Preventive Cardiology — Mayo Clinic · 2011'],
                ['Registro', process.env.NEXT_PUBLIC_DOCTOR_CRM],
              ].map(([label, value]) => (
                <div key={label} className="border-l-2 border-teal pl-4 py-1">
                  <p className="text-[10px] uppercase tracking-widest text-slate mb-1">{label}</p>
                  <p className="text-sm font-medium text-navy">{value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white border border-border p-7">
              <p className="text-[10px] uppercase tracking-widest text-slate mb-4">Áreas de atuação</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Cardiologia Clínica',
                  'Medicina Preventiva',
                  'Hipertensão Arterial',
                  'Insuficiência Cardíaca',
                  'Arritmias',
                  'Prevenção Cardiovascular',
                  'Ecocardiografia',
                  'Eletrocardiografia',
                ].map((area) => (
                  <span key={area} className="text-xs text-navy border border-blue px-3 py-1.5 bg-bg">
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
