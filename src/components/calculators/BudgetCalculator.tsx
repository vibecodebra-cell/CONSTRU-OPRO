import React, { useState } from 'react';
import { DollarSign, FileDown, User, AlertCircle, TrendingUp, Package } from 'lucide-react';

const BudgetCalculator = () => {
  const [mat, setMat] = useState(1200);
  const [mdo, setMdo] = useState(1800);
  const [ext, setExt] = useState(200);
  const [luc, setLuc] = useState(25);
  const [calculated, setCalculated] = useState(false);

  const sub = mat + mdo + ext;
  const lv = sub * luc / 100;
  const tot = sub + lv;
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 0 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up">
      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Composição de Custos
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Material (R$)</label>
            <input type="number" value={mat} onChange={(e) => setMat(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Mão de obra (R$)</label>
            <input type="number" value={mdo} onChange={(e) => setMdo(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Custos extras (R$)</label>
            <input type="number" value={ext} onChange={(e) => setExt(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Margem de lucro (%)</label>
            <input type="number" value={luc} onChange={(e) => setLuc(+e.target.value)} className="finput" />
          </div>
          <button onClick={() => setCalculated(true)} className="btn-amber mt-2">
            <DollarSign className="w-4 h-4" /> Calcular
          </button>
        </div>
      </div>

      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Orçamento Final
        </div>
        {calculated ? (
          <div className="space-y-0">
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2 flex items-center gap-2"><Package className="w-3.5 h-3.5" /> Material</span>
              <span className="text-[15px] font-semibold">R$ {fmt(mat)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2 flex items-center gap-2"><User className="w-3.5 h-3.5" /> Mão de obra</span>
              <span className="text-[15px] font-semibold">R$ {fmt(mdo)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2 flex items-center gap-2"><AlertCircle className="w-3.5 h-3.5" /> Extras</span>
              <span className="text-[15px] font-semibold">R$ {fmt(ext)}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2 flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Lucro ({luc}%)</span>
              <span className="text-[15px] font-semibold text-success">R$ {fmt(lv)}</span>
            </div>
            <div className="mt-4.5 bg-ink-tertiary border border-amber rounded-r-lg p-4.5 flex justify-between items-center shadow-[0_0_24px_rgba(245,158,11,0.08)]">
              <span className="font-montserrat font-bold text-sm uppercase tracking-wider text-t-2">Total</span>
              <span className="font-montserrat font-extrabold text-3xl text-amber tracking-tighter">R$ {fmt(tot)}</span>
            </div>
            <button className="btn-blue mt-4">
              <FileDown className="w-4 h-4" /> Gerar PDF
            </button>
          </div>
        ) : (
          <p className="text-t-3 text-sm leading-relaxed py-3">Preencha os custos e clique em <strong>Calcular</strong>.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetCalculator;