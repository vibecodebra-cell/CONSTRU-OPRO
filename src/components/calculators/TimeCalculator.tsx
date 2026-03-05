import React, { useState } from 'react';
import { Clock } from 'lucide-react';

const TimeCalculator = () => {
  const [svc, setSvc] = useState('reboco');
  const [area, setArea] = useState(100);
  const [eq, setEq] = useState(2);
  const [calculated, setCalculated] = useState(false);

  const svcMap: any = { reboco: 20, piso: 15, alvenaria: 10, pintura: 30 };
  const dias = Math.ceil(area / (svcMap[svc] * eq));
  const prazo = dias + 1;
  const pct = Math.min(100, (dias / (dias + 4)) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up">
      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Estimativa de Prazo
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Tipo de serviço</label>
            <select value={svc} onChange={(e) => setSvc(e.target.value)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
              <option value="reboco">Reboco</option>
              <option value="piso">Assentamento de Piso</option>
              <option value="alvenaria">Alvenaria</option>
              <option value="pintura">Pintura</option>
            </select>
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Área (m²)</label>
            <input type="number" value={area} onChange={(e) => setArea(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Tamanho da equipe</label>
            <select value={eq} onChange={(e) => setEq(+e.target.value)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
              <option value="1">1 Pessoa</option>
              <option value="2">2 Pessoas</option>
              <option value="3">3 Pessoas</option>
              <option value="4">4 Pessoas</option>
            </select>
          </div>
          <button onClick={() => setCalculated(true)} className="btn-amber mt-2">
            <Clock className="w-4 h-4" /> Calcular
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
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2">Área</span>
              <span className="text-[15px] font-semibold">{area} m²</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2">Equipe</span>
              <span className="text-[15px] font-semibold">{eq} {eq === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-rim">
              <span className="text-[13.5px] text-t-2">Execução</span>
              <span className="text-[15px] font-semibold text-electric">{dias} {dias === 1 ? 'dia' : 'dias'}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-[13.5px] text-t-2">Prazo ao cliente</span>
              <span className="text-[15px] font-semibold text-amber">{prazo} {prazo === 1 ? 'dia' : 'dias'}</span>
            </div>
            <div className="h-1.5 bg-rim rounded-full mt-5 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
              <div className="h-full bg-gradient-to-r from-amber-hover to-amber transition-all duration-700" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ) : (
          <p className="text-t-3 text-sm leading-relaxed py-3">Preencha os dados e clique em <strong>Calcular</strong>.</p>
        )}
      </div>
    </div>
  );
};

export default TimeCalculator;