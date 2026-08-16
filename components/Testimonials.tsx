const testimonials = [
  {
    text: 'Foi o primeiro médico que realmente me explicou minha condição de forma clara e acessível. Me sinto confiante com o tratamento.',
    name: 'Ana Beatriz S.',
    detail: 'Paciente há 3 anos',
  },
  {
    text: 'Os vídeos e artigos dele mudaram minha visão sobre saúde preventiva. Consegui reduzir meu colesterol sem remédios seguindo as orientações.',
    name: 'Marcos Oliveira',
    detail: 'Seguidor da newsletter',
  },
  {
    text: 'Profissional excepcional. Dedicado, atualizado e com uma didática rara. Recomendo para todos que querem cuidar do coração de verdade.',
    name: 'Renata Fernandes',
    detail: 'Paciente há 7 anos',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-bg py-24">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-teal mb-3 text-center">Depoimentos</p>
        <h2 className="font-serif text-3xl font-semibold text-navy text-center mb-14">
          O que dizem os pacientes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white border border-border p-7">
              <p className="text-teal text-2xl mb-4 leading-none font-serif">&ldquo;</p>
              <p className="text-[#4A5568] text-sm leading-relaxed mb-6">{t.text}</p>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-medium text-navy">{t.name}</p>
                <p className="text-xs text-[#9BA8B5] mt-0.5">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
