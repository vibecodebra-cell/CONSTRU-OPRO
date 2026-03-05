import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

const ProfitSimulator = () => {
  const [custo, setCusto] = useState(3000);
  const [mg, setMg] = useState(30);
  const [calculated, setCalculated] = useState(false);

  const lv = custo * mg / 100;
  const final = custo + lv;
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 0 });
  const color = mg < 15 ? '#EF4444' : mg < 25 ? '#F59E0B' : '#10B981';
  const dashOffset = 239 - Math.min(mg / 60 * 239, 239);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Simulador de Lucro
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Custo total (R$)</label>
            <input type="number" value={custo} onChange={(e) => setCusto(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Margem desejada (%)</label>
            <input type="number" value={mg} onChange={(e) => setMg(+e.target.value)} className="finput" />
          </div>
          <button onClick={() => setCalculated(true)} className="btn-amber mt-2">
            <TrendingUp className="w-4 h-4" /> Simular
          </button>
        </div>
      </div>

      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Resultado
        </div>
        {calculated ? (
          <div className="space-y-0">
            <div className="text-center py-4">
              <div className="relative inline-block">
                <svg width="180" height="104" viewBox="0 0 180 104">
                  <path d="M14 96 A76 76 0 0 1 166 96" fill="none" stroke="#2E3547" strokeWidth="14" strokeLinecap="round"/>
                  <path 
                    d="M14 96 A76 76 0 0 1 166 96" 
                    fill="none" 
                    stroke={color} 
                    strokeWidth="14" 
                    strokeLinecap="round"
                    strokeDasharray="239" 
                    strokeDashoffset={dashOffset}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
                  <div className="font-montserrat font-extrabold text-5xl tracking-tighter" style={{ color }}>
                    {mg}<sup className="text-xl text-[#94A3B8] align-super">%</sup>
                  </div>
                  <div className="text-[11px] font-semibold tracking-widest uppercase text-[#4B5669] mt-1">Margem</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-[#94A3B8]">Custo total</span>
              <span className="text-[15px] font-semibold">R$ {fmt(custo)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-[#94A3B8]">Valor final</span>
              <span className="text-[15px] font-semibold text-amber">R$ {fmt(final)}</span>
            </div>
            <div className="mt-4.5 bg-ink-tertiary border rounded-r-lg p-4.5 flex justify-between items-center" style={{ borderColor: color }}>
              <span className="font-montserrat font-bold text-sm uppercase tracking-wider text-[#94A3B8]">Lucro</span>
              <span className="font-montserrat font-extrabold text-3xl tracking-tighter" style={{ color }}>R$ {fmt(lv)}</span>
            </div>
          </div>
        ) : (
          <p className="text-[#4B5669] text-sm leading-relaxed py-3">Informe o custo e a margem para simular.</p>
        )}
      </div>
    </div>
  );
};

export default ProfitSimulator;