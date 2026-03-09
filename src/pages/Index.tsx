import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Droplets, Hammer, BarChart3, DollarSign, TrendingUp, ShieldCheck, Check } from 'lucide-react';
import ProblemSection from '../components/landing/ProblemSection';
import Testimonials from '../components/landing/Testimonials';
import FAQ from '../components/landing/FAQ';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-up">
      {/* HERO SECTION */}
      <section className="max-w-[1180px] mx-auto px-6 py-12 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          
          {/* Imagem - Aparece primeiro no mobile (acima do texto) e à direita no desktop */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <img 
              src="https://i.imgur.com/O7bwKFE.png" 
              alt="Construtor Pro App" 
              className="w-full max-w-[540px] rounded-r-xl shadow-pop animate-in fade-in slide-in-from-right-10 duration-700"
            />
          </div>

          {/* Conteúdo de Texto */}
          <div className="order-2 lg:order-1">
            <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-4">
              Plataforma Profissional para Autônomos
            </p>
            <h1 className="font-montserrat font-extrabold text-[clamp(36px,6vw,72px)] leading-[0.95] tracking-tighter mb-8">
              Pare de perder dinheiro com <em className="text-amber not-italic">orçamento no papel.</em>
            </h1>
            <p className="text-t-2 text-lg md:text-xl font-light leading-relaxed max-w-[580px] mb-12">
              Calcule materiais, gere propostas profissionais em PDF e aumente sua margem de lucro em segundos. Sem precisar de contador ou engenheiro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="btn-amber !w-auto px-10 h-16 text-base"
              >
                Começar Agora <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="btn-ghost !w-auto px-10 h-16 text-base"
              >
                Ver Planos e Preços
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-3 text-t-3 text-sm font-medium">
              <ShieldCheck className="w-5 h-5 text-success" />
              Acesso imediato • Pagamento seguro • Cancele quando quiser
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <ProblemSection />

      {/* SOLUTION SECTION */}
      <section className="py-24 max-w-[1180px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl tracking-tight mb-4">
            Finalmente uma ferramenta <em className="text-amber not-italic">feita pra você.</em>
          </h2>
          <p className="text-t-2 text-lg">Escolha sua área e veja como o Construtor Pro vai mudar sua rotina.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bento-card group border-amber/20 hover:border-amber">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber bg-amber/10 border border-amber/20 rounded-full px-3.5 py-1.5 mb-6">
              <Hammer className="w-3.5 h-3.5" /> Pedreiro
            </div>
            <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Alvenaria & Piso</h3>
            <p className="text-t-2 text-[14px] leading-relaxed">Calcule tijolos, argamassa e porcelanato sem erro. Estime prazos de obra com precisão real.</p>
          </div>

          <div className="bento-card group border-electric/20 hover:border-electric">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-electric bg-electric/10 border border-electric/20 rounded-full px-3.5 py-1.5 mb-6">
              <Zap className="w-3.5 h-3.5" /> Eletricista
            </div>
            <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Elétrica & Quadros</h3>
            <p className="text-t-2 text-[14px] leading-relaxed">Dimensione fios e disjuntores em segundos. Gere orçamentos elétricos que passam confiança.</p>
          </div>

          <div className="bento-card group border-success/20 hover:border-success">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-success bg-success/10 border border-success/20 rounded-full px-3.5 py-1.5 mb-6">
              <Droplets className="w-3.5 h-3.5" /> Encanador
            </div>
            <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Hidráulica & Tubos</h3>
            <p className="text-t-2 text-[14px] leading-relaxed">Liste conexões e tubulações sem esquecer nada. Estime materiais para instalações completas.</p>
          </div>
        </div>

        {/* STATS BLOCK */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-r-sm bg-amber/10 flex items-center justify-center">
              <BarChart3 className="w-7 h-7 text-amber" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-4xl text-amber leading-none">48</div>
              <div className="text-t-2 text-xs font-bold uppercase tracking-widest mt-2">Orçamentos Gerados</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-r-sm bg-success/10 flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-success" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-4xl text-success leading-none">R$12k</div>
              <div className="text-t-2 text-xs font-bold uppercase tracking-widest mt-2">Faturamento Rastreado</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-8 flex items-center gap-6">
            <div className="w-14 h-14 rounded-r-sm bg-electric/10 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-electric" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-4xl text-electric leading-none">31%</div>
              <div className="text-t-2 text-xs font-bold uppercase tracking-widest mt-2">Margem Média</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* IMAGE SECTION */}
      <section className="w-full">
        <img 
          src="https://i.imgur.com/Bu6F5yD.png" 
          alt="Banner Construtor Pro" 
          className="w-full h-auto block"
        />
      </section>

      {/* PRICING CTA */}
      <section className="py-24 bg-amber">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-black tracking-tighter mb-6">
              Sua obra merece um <em className="italic">lucro de verdade.</em>
            </h2>
            <p className="text-black/80 text-xl font-medium">
              Escolha o plano que melhor se adapta ao seu momento.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
            {/* Plano Mensal */}
            <div className="bg-black/5 border border-black/10 rounded-r-xl p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-black font-montserrat font-extrabold text-xl uppercase tracking-wider mb-2">Plano Mensal</h3>
                <div className="text-black font-montserrat font-extrabold text-5xl">R$ 29<span className="text-xl">,90</span></div>
                <p className="text-black/60 text-sm font-bold">cobrado mensalmente</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-black/80 font-medium text-sm"><Check className="w-4 h-4" /> Orçamentos ilimitados</li>
                <li className="flex items-center gap-2 text-black/80 font-medium text-sm"><Check className="w-4 h-4" /> Gestão de clientes</li>
                <li className="flex items-center gap-2 text-black/80 font-medium text-sm"><Check className="w-4 h-4" /> Propostas em PDF</li>
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-4 bg-black/10 border border-black/20 text-black font-montserrat font-extrabold text-sm uppercase tracking-widest rounded-r-md hover:bg-black/20 transition-all"
              >
                Assinar Mensal
              </button>
            </div>

            {/* Plano Anual */}
            <div className="bg-black border border-black rounded-r-xl p-8 flex flex-col relative shadow-2xl transform md:scale-105">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-extrabold uppercase tracking-[2px] px-4 py-1.5 rounded-full shadow-lg">
                Melhor Valor
              </div>
              <div className="mb-6">
                <h3 className="text-amber font-montserrat font-extrabold text-xl uppercase tracking-wider mb-2">Plano Anual</h3>
                <div className="text-white font-montserrat font-extrabold text-5xl">R$ 250<span className="text-xl">,00</span></div>
                <p className="text-amber font-bold text-sm uppercase tracking-wider mt-1">Economize R$ 108,80</p>
                <p className="text-t-2 text-xs font-medium">equivalente a R$ 20,83/mês</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center gap-2 text-t-1 font-medium text-sm"><Check className="w-4 h-4 text-amber" /> Tudo do plano mensal</li>
                <li className="flex items-center gap-2 text-t-1 font-medium text-sm"><Check className="w-4 h-4 text-amber" /> Suporte prioritário</li>
                <li className="flex items-center gap-2 text-t-1 font-medium text-sm"><Check className="w-4 h-4 text-amber" /> Acesso antecipado a funções</li>
              </ul>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-5 bg-amber text-black font-montserrat font-extrabold text-sm uppercase tracking-widest rounded-r-md shadow-amber-glow hover:bg-amber-hover transition-all"
              >
                Assinar Anual Agora
              </button>
            </div>
          </div>

          <p className="mt-12 text-center text-black/60 text-sm font-bold uppercase tracking-widest">
            Pagamento 100% seguro • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <div className="max-w-[700px] mx-auto px-6">
          <h2 className="font-montserrat font-extrabold text-4xl tracking-tight mb-6">
            Pare de chutar valores e comece a lucrar como um profissional.
          </h2>
          <p className="text-t-2 text-lg mb-10">
            Junte-se a centenas de profissionais que já abandonaram o papel e estão ganhando mais em cada obra.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-amber !w-auto px-12 h-16 text-lg"
          >
            Criar Minha Conta
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-rim text-center text-t-3 text-xs font-bold uppercase tracking-[2px]">
        © {new Date().getFullYear()} Construtor Pro • Todos os direitos reservados
      </footer>
    </div>
  );
};

export default Index;