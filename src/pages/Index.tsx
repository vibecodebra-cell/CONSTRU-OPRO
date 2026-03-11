import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ShieldCheck, Check, Star, ChevronDown, ChevronUp,
  Hammer, Zap, Droplets, BarChart3, FileText, Users, TrendingUp,
  AlertTriangle, Clock, ThumbsDown, Moon, Tag, BarChart2,
  Calculator, DollarSign, Package, Flame, Lock, BadgeCheck,
  CircleDollarSign, Wrench, Layers
} from 'lucide-react';
import ProblemSection from '../components/landing/ProblemSection';
import HowItWorks from '../components/landing/HowItWorks';
import UrgencyTimer from '../components/landing/UrgencyTimer';

const Index = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const precosRef = useRef<HTMLElement>(null);

  const scrollToPrecos = () => {
    precosRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const pains = [
    {
      icon: CircleDollarSign,
      title: 'Fechou a obra e quase não sobrou nada',
      desc: 'Você trabalhou 20 dias, comprou material, pagou ajudante — e no final o lucro mal pagou a semana. Onde foi parar o dinheiro?',
    },
    {
      icon: Package,
      title: 'Esqueceu de cobrar material "pequeno"',
      desc: 'Bucha de parede, cola, fita isolante, abraçadeira… individualmente parece pouco. No fim do mês somam R$300, R$500, R$800 que você bancou do próprio bolso.',
    },
    {
      icon: FileText,
      title: 'Perdeu serviço porque sua proposta parecia amadora',
      desc: 'O cliente olhou para o papel rabiscado que você entregou e preferiu o concorrente que trouxe uma proposta bonita em PDF. Não era habilidade — era apresentação.',
    },
    {
      icon: Moon,
      title: 'Passou a madrugada fazendo conta',
      desc: 'Calculadora, papel, régua, borracha. Uma hora da manhã você ainda tentando ver se o orçamento fecha. Enquanto isso a família dorme e você está com a cabeça cheia.',
    },
    {
      icon: Tag,
      title: 'Deu desconto e ainda assim perdeu o cliente',
      desc: 'Abaixou o preço, ficou sem margem, o cliente sumiu mesmo assim. Você não precisa cobrar menos — você precisa mostrar por que vale mais.',
    },
    {
      icon: BarChart2,
      title: 'Não sabe quanto lucrou no mês',
      desc: 'Entrou dinheiro, saiu dinheiro, e você não tem ideia se foi um mês bom ou ruim. Sem número, você toma decisão no escuro — e o prejuízo vai crescendo sem que você perceba.',
    },
  ];

  const solutions = [
    {
      icon: Calculator,
      color: 'text-amber',
      bg: 'bg-amber/10',
      border: 'border-amber/20',
      title: 'Cálculo Automático de Materiais',
      desc: 'Informe a área e o tipo de serviço. O app calcula tijolos, argamassa, porcelanato, fios, disjuntores, tubos — tudo sem erro e sem esquecimento.',
      cta: 'Chega de prejuízo',
    },
    {
      icon: TrendingUp,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      title: 'Margem de Lucro Garantida',
      desc: 'Coloque quanto quer ganhar em porcentagem. O app mostra o preço final justo. Você nunca mais vai trabalhar por menos do que merece.',
      cta: 'Lucro real',
    },
    {
      icon: FileText,
      color: 'text-electric',
      bg: 'bg-electric/10',
      border: 'border-electric/20',
      title: 'Proposta em PDF Profissional',
      desc: 'Com um clique, gera uma proposta detalhada e elegante. Envie pelo WhatsApp e surpreenda o cliente. Parece trabalho de engenheiro.',
      cta: 'Fecha mais serviços',
    },
    {
      icon: Users,
      color: 'text-amber',
      bg: 'bg-amber/10',
      border: 'border-amber/20',
      title: 'Gestão de Clientes',
      desc: 'Salve nome, endereço e histórico. Na próxima obra é só selecionar e o orçamento já vem completo. Rápido, organizado, profissional.',
      cta: 'Organização',
    },
    {
      icon: Zap,
      color: 'text-electric',
      bg: 'bg-electric/10',
      border: 'border-electric/20',
      title: 'Para Eletricistas',
      desc: 'Dimensionamento de fios e disjuntores automático. Orçamentos elétricos que passam total segurança e confiança para o cliente.',
      cta: 'Precisão técnica',
    },
    {
      icon: Droplets,
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/20',
      title: 'Para Encanadores',
      desc: 'Lista completa de conexões e tubulações. Nunca mais esqueça uma peça ou subestime o material de uma instalação hidráulica.',
      cta: 'Zero esquecimento',
    },
  ];

  const howItWorks = [
    { num: '01', icon: BadgeCheck, title: 'Crie sua conta grátis', time: '1 minuto', desc: 'Menos de 1 minuto, sem cartão de crédito. Cadastro direto, sem burocracia.' },
    { num: '02', icon: Users, title: 'Selecione ou cadastre o cliente', time: '30 segundos', desc: 'Nome, telefone, endereço. Da próxima vez, é só buscar pelo nome e tá pronto.' },
    { num: '03', icon: Calculator, title: 'Informe a área e o serviço', time: '1–2 minutos', desc: 'O app calcula automaticamente todos os materiais necessários, sem erro e sem esquecimento.' },
    { num: '04', icon: TrendingUp, title: 'Defina sua margem de lucro', time: '30 segundos', desc: 'Coloque o percentual que quer ganhar. O app mostra o preço final justo. Sem achismo, sem chutar.' },
    { num: '05', icon: FileText, title: 'Gere o PDF e envie pelo WhatsApp', time: '10 segundos', desc: 'Proposta profissional e detalhada no celular do cliente em segundos. Ele vê e já confia.' },
  ];

  const testimonials = [
    {
      name: 'Seu Jorge',
      role: 'Pedreiro · São Paulo, SP',
      text: 'Antes eu perdia dinheiro toda obra. Esquecia material, cobrava menos do que devia. Hoje mando a proposta em PDF pelo WhatsApp e o cliente já fecha na hora. Minha renda aumentou e eu trabalho o mesmo tanto.',
      badge: '+28% de faturamento no 1º mês',
      badgeIcon: TrendingUp,
      badgeColor: 'text-success',
      badgeBg: 'bg-success/10',
    },
    {
      name: 'Ricardo',
      role: 'Eletricista · Rio de Janeiro, RJ',
      text: 'O dimensionamento de fios e disjuntor o app faz sozinho. Eu só coloco o projeto. Parei de levar calote por orçamento mal feito e meus clientes falam que nunca viram eletricista tão organizado.',
      badge: 'Zero prejuízo nos últimos 4 meses',
      badgeIcon: ShieldCheck,
      badgeColor: 'text-electric',
      badgeBg: 'bg-electric/10',
    },
    {
      name: 'Marcelo',
      role: 'Encanador · Belo Horizonte, MG',
      text: 'Fechei 3 obras seguidas logo depois de começar a usar. O cliente me disse: "você é o único encanador que me deu proposta no papel, os outros falaram de boca." Isso vale muito mais do que o custo do plano.',
      badge: '3 obras fechadas em 2 semanas',
      badgeIcon: BadgeCheck,
      badgeColor: 'text-amber',
      badgeBg: 'bg-amber/10',
    },
  ];

  const faqs = [
    {
      q: 'Não entendo nada de tecnologia, vou conseguir usar?',
      a: 'Se você sabe usar o WhatsApp, você usa o Construtor Pro. A interface foi feita para quem está no canteiro de obras, não para quem fica no escritório. Tudo é visual, direto e sem linguagem técnica. Nossos usuários mais velhos aprenderam em menos de 10 minutos.',
    },
    {
      q: 'Funciona para o meu tipo de serviço?',
      a: 'Sim. O app foi criado especificamente para pedreiros (alvenaria, piso, revestimento), eletricistas (instalações residenciais e comerciais, quadros elétricos) e encanadores (hidráulica, esgoto, instalações). Cada área tem seus próprios cálculos e listas de material.',
    },
    {
      q: 'R$ 29,90 é caro. Vale a pena mesmo?',
      a: 'Vamos fazer as contas: se você perde apenas R$ 200 por mês em material esquecido ou margem errada — e a maioria perde muito mais — o app já se paga 6 vezes. Além disso, fechar uma obra a mais por causa de uma proposta profissional pode valer R$ 500, R$ 1.000 ou mais. O risco real é não usar.',
    },
    {
      q: 'Já faço no papel e funciona, por que mudar?',
      a: '"Funciona" e "lucro máximo" são coisas diferentes. Com o papel você não sabe exatamente o que esqueceu de cobrar, não consegue mostrar uma proposta bonita pro cliente e gasta tempo que poderia estar descansando ou fechando mais serviços. A pergunta não é "por que mudar?" — é "quanto você já perdeu sem perceber?"',
    },
    {
      q: 'E se o app errar os cálculos?',
      a: 'Os cálculos foram desenvolvidos com base em normas técnicas e validados por profissionais da área. O app mostra cada item do cálculo, então você pode revisar antes de enviar. É transparente, não uma caixa preta. E ao contrário do papel, ele nunca vai esquecer um item.',
    },
    {
      q: 'Posso cancelar quando quiser?',
      a: 'Sim, sem fidelidade e sem multa. Mas depois que você ver quanto está ganhando a mais com a ferramenta, duvidamos que você vai querer cancelar.',
    },
  ];

  const planMonthly = [
    'Orçamentos ilimitados',
    'Cálculo automático de materiais',
    'Propostas em PDF profissional',
    'Gestão de clientes',
    'Pedreiro, eletricista e encanador',
  ];

  const planAnnual = [
    'Tudo do plano mensal',
    'Suporte prioritário',
    'Acesso antecipado a novas funções',
    'Histórico completo de obras',
    'Relatório mensal de lucro',
  ];

  return (
    <div className="animate-fade-up">

      {/* ── TOPBAR PROMOCIONAL ── */}
      <div className="bg-amber text-black py-2.5 px-4 flex items-center justify-center gap-3 text-center">
        <UrgencyTimer />
        <button
          onClick={scrollToPrecos}
          className="shrink-0 bg-black text-amber text-[11px] font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full hover:bg-black/80 transition-all"
        >
          Garantir agora
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="max-w-[1180px] mx-auto px-6 py-14 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <img
              src="https://i.imgur.com/O7bwKFE.png"
              alt="Construtor Pro App"
              className="w-full max-w-[540px] rounded-r-xl shadow-pop animate-in fade-in slide-in-from-right-10 duration-700"
            />
          </div>
          <div className="order-2 lg:order-1">
            <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-4">
              Para pedreiros, eletricistas e encanadores que querem parar de perder dinheiro
            </p>
            <h1 className="font-montserrat font-extrabold text-[clamp(36px,5.5vw,68px)] leading-[0.95] tracking-tighter mb-6">
              Você Trabalha Duro.<br />
              <em className="text-amber not-italic">Mas Quanto Fica No Seu Bolso?</em>
            </h1>
            <p className="text-t-2 text-lg md:text-xl font-light leading-relaxed max-w-[560px] mb-10">
              A maioria dos autônomos da construção perde até <strong className="text-t-1">30% do lucro</strong> por causa de orçamento feito no olho ou no papel. O Construtor Pro elimina esse prejuízo em 5 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToPrecos}
                className="btn-amber !w-auto px-10 h-16 text-base"
              >
                Quero Parar de Perder Dinheiro <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-t-3 text-sm font-medium">
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Acesso imediato</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Sem cartão para começar</span>
              <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Cancele quando quiser</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEÇÃO DE DOR ── */}
      <section className="py-20 bg-ink-secondary border-y border-rim">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="max-w-[700px] mb-4">
            <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
              Reconhece alguma dessas situações?
            </h2>
            <p className="text-t-2 text-lg leading-relaxed">
              Se você respondeu sim para pelo menos uma, o Construtor Pro foi feito exatamente para você.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {pains.map((pain, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-ink-tertiary border border-rim rounded-r-lg hover:border-danger/30 transition-all">
                <div className="p-2.5 bg-danger/10 rounded-lg shrink-0">
                  <pain.icon className="w-5 h-5 text-danger" />
                </div>
                <div>
                  <h3 className="font-bold text-t-1 mb-1.5">{pain.title}</h3>
                  <p className="text-t-2 text-[13.5px] leading-relaxed">{pain.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber/5 border border-amber/20 rounded-r-xl text-center">
            <p className="text-t-1 font-semibold text-lg">
              Isso não é falta de capacidade técnica.
            </p>
            <p className="text-t-2 mt-1">
              É falta de ferramenta. Todo profissional de qualidade merece uma ferramenta à altura do seu trabalho.
            </p>
          </div>
        </div>
      </section>

      {/* ── AGITAÇÃO ── */}
      <section className="py-20 max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
            O Custo Real de <em className="text-danger not-italic">Continuar Igual</em>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: CircleDollarSign,
              num: '1',
              title: 'Você continua perdendo R$400–R$800 por obra sem perceber',
              desc: 'Material esquecido, margem mal calculada, desconto desnecessário. Multiplica por 10 obras no ano: são até R$8.000 que somem do seu bolso.',
            },
            {
              icon: Users,
              num: '2',
              title: 'Seus concorrentes estão fechando os melhores clientes',
              desc: 'Enquanto você entrega orçamento rabiscado, outro profissional manda PDF profissional pelo WhatsApp. O cliente percebe a diferença e escolhe quem parece mais confiável.',
            },
            {
              icon: Clock,
              num: '3',
              title: 'Trabalho dobrado, resultado pela metade',
              desc: 'Cada orçamento na mão leva 30, 40 minutos ou mais. Tempo que você poderia estar dormindo, com a família, ou fechando mais serviços. O papel não escala. Você precisa de um sistema.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-surface border border-rim rounded-r-xl p-7 relative overflow-hidden">
              <div className="absolute top-4 right-5 font-montserrat font-extrabold text-6xl text-rim opacity-40">{item.num}</div>
              <div className="p-2.5 bg-danger/10 rounded-lg w-fit mb-4">
                <item.icon className="w-5 h-5 text-danger" />
              </div>
              <h3 className="font-montserrat font-bold text-[15px] mb-3 leading-snug">{item.title}</h3>
              <p className="text-t-2 text-[13.5px] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SOLUÇÃO ── */}
      <section className="py-20 bg-ink-secondary border-y border-rim">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-3">A solução</p>
            <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
              Construtor Pro — Orçamento Profissional <em className="text-amber not-italic">Em 5 Minutos</em>
            </h2>
            <p className="text-t-2 text-lg max-w-[600px] mx-auto">
              Uma plataforma criada especificamente para o autônomo da construção civil. Sem complicação, sem contador, sem engenheiro. Só você, o app e o lucro que você merece.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((s, i) => (
              <div key={i} className={`bg-surface border ${s.border} rounded-r-xl p-7 hover:shadow-pop transition-all`}>
                <div className={`w-12 h-12 ${s.bg} border ${s.border} rounded-r-md flex items-center justify-center mb-5`}>
                  <s.icon className={`w-6 h-6 ${s.color}`} />
                </div>
                <h3 className="font-montserrat font-bold text-[16px] mb-2">{s.title}</h3>
                <p className="text-t-2 text-[13.5px] leading-relaxed mb-4">{s.desc}</p>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${s.color} flex items-center gap-1.5`}>
                  <ArrowRight className="w-3.5 h-3.5" /> {s.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="py-24 max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-3">Do zero à proposta</p>
          <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Em 5 minutos. <em className="text-amber not-italic">Simples assim.</em>
          </h2>
          <p className="text-t-2 text-lg">Não precisa entender de tecnologia.</p>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-start gap-0 mb-16 relative">
          <div className="absolute top-10 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-amber/20 via-electric/40 to-amber/20 z-0" />
          {howItWorks.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center px-4 relative z-10">
              <div className="w-20 h-20 rounded-full bg-ink border-2 border-amber/30 flex items-center justify-center mb-5 shadow-pop">
                <step.icon className="w-8 h-8 text-amber" />
              </div>
              <span className="font-montserrat font-extrabold text-[11px] tracking-[3px] uppercase text-amber mb-1">{step.num}</span>
              <div className="flex items-center gap-1 text-[10px] text-t-3 font-bold uppercase tracking-wider mb-2">
                <Clock className="w-3 h-3" /> {step.time}
              </div>
              <h3 className="font-montserrat font-bold text-[14px] mb-2 leading-tight">{step.title}</h3>
              <p className="text-t-2 text-[12.5px] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden flex-col gap-0 mb-12">
          {howItWorks.map((step, i) => (
            <div key={i} className="flex gap-5 relative">
              {i < howItWorks.length - 1 && (
                <div className="absolute left-[27px] top-[56px] w-0.5 h-[calc(100%-16px)] bg-gradient-to-b from-rim to-transparent z-0" />
              )}
              <div className="relative z-10 w-14 h-14 shrink-0 rounded-full bg-ink border-2 border-amber/30 flex items-center justify-center">
                <step.icon className="w-6 h-6 text-amber" />
              </div>
              <div className="pb-10">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-montserrat font-extrabold text-[10px] tracking-[3px] uppercase text-amber">{step.num}</span>
                  <span className="flex items-center gap-1 text-[10px] text-t-3 font-bold"><Clock className="w-3 h-3" /> {step.time}</span>
                </div>
                <h3 className="font-montserrat font-bold text-[15px] mt-0.5 mb-1">{step.title}</h3>
                <p className="text-t-2 text-[13px] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-amber/10 border border-amber/20 rounded-r-xl px-8 py-5">
            <Zap className="w-6 h-6 text-amber shrink-0" />
            <p className="text-t-1 font-semibold text-[15px]">
              Tudo isso em <span className="text-amber font-extrabold">menos de 5 minutos.</span> Sem complicação.
            </p>
          </div>
        </div>
      </section>

      {/* ── IMAGEM BANNER ── */}
      <section className="w-full">
        <img
          src="https://i.imgur.com/Bu6F5yD.png"
          alt="Banner Construtor Pro"
          className="w-full h-auto block"
        />
      </section>

      {/* ── DEPOIMENTOS ── */}
      <section className="py-20 bg-ink-secondary border-y border-rim">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl tracking-tight mb-3">
              Eles mudaram. <em className="text-amber not-italic">Você também pode.</em>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-surface border border-rim rounded-r-xl p-8 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-amber text-amber" />)}
                </div>
                <p className="text-t-1 italic mb-6 leading-relaxed flex-1">"{t.text}"</p>
                <div className={`flex items-center gap-2 ${t.badgeBg} border border-rim rounded-r-md px-3 py-2 mb-4 w-fit`}>
                  <t.badgeIcon className={`w-4 h-4 ${t.badgeColor} shrink-0`} />
                  <span className={`text-[11px] font-bold ${t.badgeColor}`}>{t.badge}</span>
                </div>
                <div>
                  <div className="font-bold text-t-1">{t.name}</div>
                  <div className="text-xs text-t-2 uppercase tracking-widest font-semibold mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREÇOS ── */}
      <section ref={precosRef} className="py-24 bg-amber">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-black tracking-tighter mb-4">
              Escolha seu plano. <em className="italic">Comece a lucrar hoje.</em>
            </h2>
            <p className="text-black/70 text-lg font-medium">
              Menos do que uma refeição por dia. Mais do que você perde por obra.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* Mensal */}
            <div className="bg-black/5 border border-black/10 rounded-r-xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-black font-montserrat font-extrabold text-xl uppercase tracking-wider mb-2">Plano Mensal</h3>
                <div className="text-black font-montserrat font-extrabold text-5xl">R$ 29<span className="text-xl">,90</span></div>
                <p className="text-black/60 text-sm font-bold mt-1">cobrado mensalmente</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {planMonthly.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-black/80 font-medium text-sm">
                    <Check className="w-4 h-4 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a
                href="https://ggcheckout.com.br/checkout/v5/TMYX2GFnsMgjnH8xxDwe"
                className="w-full py-4 bg-black/10 border border-black/20 text-black font-montserrat font-extrabold text-sm uppercase tracking-widest rounded-r-md hover:bg-black/20 transition-all text-center block"
              >
                Assinar Mensal
              </a>
            </div>

            {/* Anual */}
            <div className="bg-black border border-black rounded-r-xl p-8 flex flex-col relative shadow-2xl transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-extrabold uppercase tracking-[2px] px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber" /> Melhor Custo-Benefício
              </div>
              <div className="mb-6">
                <h3 className="text-amber font-montserrat font-extrabold text-xl uppercase tracking-wider mb-2">Plano Anual</h3>
                <div className="text-white font-montserrat font-extrabold text-5xl">R$ 250<span className="text-xl">,00</span></div>
                <p className="text-amber font-bold text-sm uppercase tracking-wider mt-1">Economize R$ 108,80</p>
                <p className="text-t-2 text-xs font-medium">equivalente a R$ 20,83/mês</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {planAnnual.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-t-1 font-medium text-sm">
                    <Check className="w-4 h-4 text-amber shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/login')}
                className="w-full py-5 bg-amber text-black font-montserrat font-extrabold text-sm uppercase tracking-widest rounded-r-md shadow-amber-glow hover:bg-amber-hover transition-all flex items-center justify-center gap-2"
              >
                Economizar R$108 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6 flex-wrap">
            <span className="flex items-center gap-2 text-black/60 text-sm font-bold"><Lock className="w-4 h-4" /> Pagamento 100% seguro</span>
            <span className="flex items-center gap-2 text-black/60 text-sm font-bold"><ShieldCheck className="w-4 h-4" /> Cancele quando quiser</span>
            <span className="flex items-center gap-2 text-black/60 text-sm font-bold"><BadgeCheck className="w-4 h-4" /> Sem fidelidade</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-ink-secondary border-y border-rim">
        <div className="max-w-[800px] mx-auto px-6">
          <h2 className="font-montserrat font-extrabold text-3xl tracking-tight mb-12 text-center">
            Perguntas <em className="text-amber not-italic">Frequentes</em>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-rim rounded-r-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left bg-surface hover:bg-rim/20 transition-colors"
                >
                  <span className="font-bold text-t-1 pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-amber shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-t-3 shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="p-5 bg-ink-tertiary text-t-2 leading-relaxed border-t border-rim">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-24 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="font-montserrat font-extrabold text-4xl tracking-tight mb-6">
            Basta de Trabalhar Duro Para <em className="text-amber not-italic">Ganhar Pouco.</em>
          </h2>
          <p className="text-t-2 text-lg mb-4 leading-relaxed">
            Centenas de profissionais já pararam de perder dinheiro com orçamento no olhômetro. A diferença entre eles e você é só um clique.
          </p>
          <button
            onClick={scrollToPrecos}
            className="btn-amber !w-auto px-12 h-16 text-lg mb-6"
          >
            Criar Minha Conta Agora <ArrowRight className="w-5 h-5" />
          </button>
          <div className="flex items-center justify-center gap-6 flex-wrap text-t-3 text-sm font-medium">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Acesso imediato</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Sem cartão para começar</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-success" /> Cancele quando quiser</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-rim text-center text-t-3 text-xs font-bold uppercase tracking-[2px]">
        © {new Date().getFullYear()} Construtor Pro · Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Index;