const doctorName = process.env.NEXT_PUBLIC_DOCTOR_NAME || 'Dr. Rafael Mendes'

export default function Hero() {
  return (
    <section className="pt-16 min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 py-24 lg:py-0 bg-white order-2 lg:order-1">
        <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-teal mb-7">
          Cardiologia · Medicina Preventiva
        </p>
        <h1 className="font-serif text-5xl md:text-[3.6rem] font-light leading-[1.07] text-navy mb-7">
          Cuidando do
          <br />
          <span className="font-semibold">seu coração</span>
          <br />
          com ciência.
        </h1>
        <p className="text-slate text-lg leading-relaxed mb-10 max-w-[420px]">
          Médico cardiologista com 15 anos de experiência, compartilhando conhecimento
          para que você tome decisões mais conscientes sobre a sua saúde.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href="/blog"
            className="bg-navy text-white px-7 py-4 text-sm font-medium hover:bg-navyLight transition-colors text-center"
          >
            Ver Conteúdos Gratuitos
          </a>
          <a
            href="#contato"
            className="border border-navy text-navy px-7 py-4 text-sm font-medium hover:bg-bg transition-colors text-center"
          >
            Agendar Consulta
          </a>
        </div>
        <div className="mt-16 flex gap-10 border-t border-border pt-8">
          {[
            ['15+', 'Anos de experiência'],
            ['4.200+', 'Pacientes atendidos'],
            ['380+', 'Conteúdos publicados'],
          ].map(([num, label]) => (
            <div key={label}>
              <p className="font-serif text-2xl font-semibold text-navy">{num}</p>
              <p className="text-xs text-slate mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative order-1 lg:order-2 h-72 lg:h-auto bg-blue">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&h=1100&fit=crop&auto=format"
          alt={doctorName + ', cardiologista'}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/25 to-transparent" />
      </div>
    </section>
  )
}
