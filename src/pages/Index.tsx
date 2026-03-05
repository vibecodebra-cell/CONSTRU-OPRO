import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Droplets, Hammer, BarChart3, DollarSign, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-12 md:py-20 animate-fade-up">
      <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-4">
        Plataforma profissional
      </p>
      <h1 className="font-montserrat font-extrabold text-[clamp(38px,5.5vw,72px)] leading-[0.95] tracking-tighter mb-6">
        Calcule, orce<br />e lucre <em className="text-amber not-italic">mais.</em>
      </h1>
      <p className="text-t-2 text-lg font-light leading-relaxed max-w-[480px] mb-16">
        Ferramentas precisas para pedreiros, eletricistas e encanadores. Gere propostas profissionais em segundos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Profession Cards */}
        <div 
          onClick={() => navigate('/login')}
          className="bento-card group border-amber/20 hover:border-amber"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber bg-amber/10 border border-amber/20 rounded-full px-3.5 py-1.5 mb-6">
            <Hammer className="w-3.5 h-3.5" /> Pedreiro
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Alvenaria & Piso</h3>
          <p className="text-t-2 text-[14px] leading-relaxed">Calcule tijolos, argamassa, porcelanato e estime prazos de obra com precisão.</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-amber group-hover:text-black group-hover:translate-x-1.5">
            <ArrowRight className="w-4.5 h-4.5" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/login')}
          className="bento-card group border-electric/20 hover:border-electric"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-electric bg-electric/10 border border-electric/20 rounded-full px-3.5 py-1.5 mb-6">
            <Zap className="w-3.5 h-3.5" /> Eletricista
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Elétrica & Quadros</h3>
          <p className="text-t-2 text-[14px] leading-relaxed">Dimensione fios, disjuntores e gere orçamentos elétricos residenciais e comerciais.</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-electric group-hover:translate-x-1.5">
            <ArrowRight className="w-4.5 h-4.5" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/login')}
          className="bento-card group border-success/20 hover:border-success"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-success bg-success/10 border border-success/20 rounded-full px-3.5 py-1.5 mb-6">
            <Droplets className="w-3.5 h-3.5" /> Encanador
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-3">Hidráulica & Tubos</h3>
          <p className="text-t-2 text-[14px] leading-relaxed">Calcule tubulações, conexões e estime materiais para instalações hidráulicas completas.</p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-success group-hover:translate-x-1.5">
            <ArrowRight className="w-4.5 h-4.5" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4">
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-7 flex items-center gap-5 transition-colors hover:border-rim-secondary">
            <div className="w-12 h-12 rounded-r-sm bg-amber/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-amber" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-amber leading-none">48</div>
              <div className="text-t-2 text-xs font-medium uppercase tracking-wider mt-1.5">Orçamentos</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-7 flex items-center gap-5 transition-colors hover:border-rim-secondary">
            <div className="w-12 h-12 rounded-r-sm bg-success/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-success leading-none">R$12k</div>
              <div className="text-t-2 text-xs font-medium uppercase tracking-wider mt-1.5">Faturamento</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-7 flex items-center gap-5 transition-colors hover:border-rim-secondary">
            <div className="w-12 h-12 rounded-r-sm bg-electric/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-electric" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-electric leading-none">31%</div>
              <div className="text-t-2 text-xs font-medium uppercase tracking-wider mt-1.5">Margem média</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;