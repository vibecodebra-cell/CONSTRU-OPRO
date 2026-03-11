import React from 'react';
import { UserPlus, Users, Calculator, FileText, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserPlus,
    title: 'Crie sua conta',
    desc: 'Cadastro rápido em menos de 1 minuto. Sem burocracia, sem cartão de crédito para começar.',
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
  },
  {
    number: '02',
    icon: Users,
    title: 'Cadastre seus clientes',
    desc: 'Salve nome, telefone e endereço. Na próxima obra, é só selecionar e o orçamento já vem com os dados.',
    color: 'text-electric',
    bg: 'bg-electric/10',
    border: 'border-electric/20',
  },
  {
    number: '03',
    icon: Calculator,
    title: 'Calcule materiais e custos',
    desc: 'Informe a área da obra e o app calcula automaticamente tijolos, argamassa, fios ou tubos — sem erro.',
    color: 'text-success',
    bg: 'bg-success/10',
    border: 'border-success/20',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Defina sua margem de lucro',
    desc: 'Coloque o percentual que quer ganhar e o app mostra o preço final justo. Chega de trabalhar no prejuízo.',
    color: 'text-amber',
    bg: 'bg-amber/10',
    border: 'border-amber/20',
  },
  {
    number: '05',
    icon: FileText,
    title: 'Gere a proposta em PDF',
    desc: 'Com um clique, sua proposta fica pronta para enviar pelo WhatsApp. Profissional, detalhada e que passa confiança.',
    color: 'text-electric',
    bg: 'bg-electric/10',
    border: 'border-electric/20',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-ink-secondary border-y border-rim">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-3">
            Simples do início ao fim
          </p>
          <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Como o <em className="text-amber not-italic">Construtor Pro</em> funciona
          </h2>
          <p className="text-t-2 text-lg max-w-[560px] mx-auto">
            Do cadastro à proposta enviada, tudo em menos de 5 minutos. Veja como é fácil.
          </p>
        </div>

        {/* Desktop: linha horizontal com conectores */}
        <div className="hidden md:flex items-start gap-0 mb-16 relative">
          {/* Linha conectora */}
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber/20 via-electric/40 to-amber/20 z-0" />

          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center px-4 relative z-10">
              {/* Ícone */}
              <div className={`w-20 h-20 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center mb-5 bg-ink shadow-pop`}>
                <step.icon className={`w-8 h-8 ${step.color}`} />
              </div>
              {/* Número */}
              <span className={`font-montserrat font-extrabold text-[11px] tracking-[3px] uppercase ${step.color} mb-2`}>
                {step.number}
              </span>
              <h3 className="font-montserrat font-bold text-[15px] mb-2 leading-tight">{step.title}</h3>
              <p className="text-t-2 text-[13px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: lista vertical */}
        <div className="flex md:hidden flex-col gap-0">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-5 relative">
              {/* Linha vertical conectora */}
              {i < steps.length - 1 && (
                <div className="absolute left-[27px] top-[56px] w-0.5 h-[calc(100%-16px)] bg-gradient-to-b from-rim to-transparent z-0" />
              )}
              {/* Ícone */}
              <div className={`relative z-10 w-14 h-14 shrink-0 rounded-full ${step.bg} border-2 ${step.border} flex items-center justify-center bg-ink`}>
                <step.icon className={`w-6 h-6 ${step.color}`} />
              </div>
              {/* Conteúdo */}
              <div className="pb-10">
                <span className={`font-montserrat font-extrabold text-[10px] tracking-[3px] uppercase ${step.color}`}>
                  {step.number}
                </span>
                <h3 className="font-montserrat font-bold text-[15px] mt-0.5 mb-1">{step.title}</h3>
                <p className="text-t-2 text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-4">
          <div className="inline-flex items-center gap-3 bg-amber/10 border border-amber/20 rounded-r-xl px-8 py-5">
            <span className="text-2xl">⚡</span>
            <p className="text-t-1 font-semibold text-[15px]">
              Tudo isso em <span className="text-amber font-extrabold">menos de 5 minutos.</span> Sem complicação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;