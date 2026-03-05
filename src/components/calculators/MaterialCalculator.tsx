import React, { useState } from 'react';
import { Calculator, Package } from 'lucide-react';

const MaterialCalculator = () => {
  const [type, setType] = useState('piso');
  const [area, setArea] = useState(45);
  const [perda, setPerda] = useState(10);
  const [results, setResults] = useState<any[] | null>(null);

  const calculate = () => {
    const f = 1 + perda / 100;
    const maps: any = {
      piso: [['🔲','Porcelanato',Math.ceil(area*f*2),'peças'],['🪨','Argamassa',Math.ceil(area/10),'sacos'],['🟫','Rejunte',Math.ceil(area*0.05),'kg'],['📦','Base Niveladora',Math.ceil(area/30),'sacos']],
      reboco: [['🪨','Argamassa',Math.ceil(area*1.5*f/20),'sacos'],['⬜','Cal',Math.ceil(area*0.5*f),'kg']],
      alvenaria: [['🧱','Tijolos',Math.ceil(area*25*f),'unid.'],['🪨','Argamassa',Math.ceil(area*0.5*f),'sacos']],
      telhado: [['🏠','Telhas',Math.ceil(area*16*f),'unid.'],['🪵','Caibros 6m',Math.ceil(area*0.5),'peças']],
    };
    setResults(maps[type]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-up">
      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Calcular Material
        </div>
        <div className="space-y-4.5">
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Tipo de serviço</label>
            <select 
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]"
            >
              <option value="piso">Piso / Porcelanato</option>
              <option value="reboco">Reboco / Massa</option>
              <option value="alvenaria">Alvenaria (Tijolos)</option>
              <option value="telhado">Telhado</option>
            </select>
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Área (m²)</label>
            <input type="number" value={area} onChange={(e) => setArea(+e.target.value)} className="finput" />
          </div>
          <div>
            <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Margem de perda (%)</label>
            <input type="number" value={perda} onChange={(e) => setPerda(+e.target.value)} className="finput" />
          </div>
          <button onClick={calculate} className="btn-amber mt-2">
            <Calculator className="w-4 h-4" /> Calcular
          </button>
        </div>
      </div>

      <div className="bg-surface border border-rim rounded-r-xl p-7">
        <div className="flex items-center gap-2.5 font-montserrat font-bold text-base mb-6">
          <div className="w-2 h-2 bg-amber rounded-full shadow-[0_0_8px_#F59E0B]" />
          Resultado
        </div>
        {results ? (
          <div className="space-y-2.5">
            {results.map(([icon, name, qty, unit], i) => (
              <div key={i} className="flex items-center gap-3 bg-ink-tertiary border border-rim rounded-r-sm p-3 transition-colors hover:border-rim-secondary">
                <span className="text-lg w-7 text-center">{icon}</span>
                <span className="flex-1 text-sm text-t-2">{name}</span>
                <span className="font-semibold text-base text-amber">{qty}</span>
                <span className="text-xs text-t-3">{unit}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-t-3 text-sm leading-relaxed py-3">Preencha os campos ao lado e clique em <strong>Calcular</strong>.</p>
        )}
      </div>
    </div>
  );
};

export default MaterialCalculator;