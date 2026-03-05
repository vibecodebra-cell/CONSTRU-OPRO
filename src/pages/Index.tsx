import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Droplets, Hammer, BarChart3, DollarSign, TrendingUp } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-12 md:py-16">
      <p className="text-amber text-[11px] font-semibold tracking-[2px] uppercase mb-3.5">
        Plataforma profissional
      </p>
      <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter mb-3">
        Calcule, orce<br />e lucre <em className="text-amber not-italic">mais.</em>
      </h1>
      <p className="text-[#94A3B8] text-base font-light leading-relaxed max-w-[440px] mb-12">
        Ferramentas precisas para pedreiros, eletricistas e encanadores. Gere propostas profissionais em segundos.
      </p>

      <div className="grid grid-cols-12 gap-4">
        {/* Profession Cards */}
        <div 
          onClick={() => navigate('/tools?tab=materiais')}
          className="bento-card col-span-12 md:col-span-4 group border-amber/20 hover:border-amber"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-amber bg-amber/10 border border-amber/20 rounded-full px-3 py-1 mb-5">
            <Hammer className="w-3 h-3" /> Pedreiro
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-2">Alvenaria & Piso</h3>
          <p className="text-[#94A3B8] text-[13.5px] leading-relaxed">Calcule tijolos, argamassa, porcelanato e estime prazos de obra com precisão.</p>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-amber group-hover:text-black group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/tools?tab=orcamento')}
          className="bento-card col-span-12 md:col-span-4 group border-electric/20 hover:border-electric"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-electric bg-electric/10 border border-electric/20 rounded-full px-3 py-1 mb-5">
            <Zap className="w-3 h-3" /> Eletricista
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-2">Elétrica & Quadros</h3>
          <p className="text-[#94A3B8] text-[13.5px] leading-relaxed">Dimensione fios, disjuntores e gere orçamentos elétricos residenciais e comerciais.</p>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-electric group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div 
          onClick={() => navigate('/tools?tab=tempo')}
          className="bento-card col-span-12 md:col-span-4 group border-[#10B981]/20 hover:border-[#10B981]"
        >
          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1 mb-5">
            <Droplets className="w-3 h-3" /> Encanador
          </div>
          <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-2">Hidráulica & Tubos</h3>
          <p className="text-[#94A3B8] text-[13.5px] leading-relaxed">Calcule tubulações, conexões e estime materiais para instalações hidráulicas completas.</p>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 w-9 h-9 bg-ink-tertiary rounded-full flex items-center justify-center transition-all group-hover:bg-[#10B981] group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Stats Row */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-r-sm bg-amber/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-amber leading-none">48</div>
              <div className="text-[#94A3B8] text-xs mt-0.5">Orçamentos</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-r-sm bg-[#10B981]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#10B981]" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-[#10B981] leading-none">R$12k</div>
              <div className="text-[#94A3B8] text-xs mt-0.5">Faturamento</div>
            </div>
          </div>
          <div className="bg-ink-tertiary border border-rim rounded-r-lg p-6 flex items-center gap-4">
            <div className="w-11 h-11 rounded-r-sm bg-electric/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-electric" />
            </div>
            <div>
              <div className="font-montserrat font-extrabold text-3xl text-electric leading-none">31%</div>
              <div className="text-[#94A3B8] text-xs mt-0.5">Margem média</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;