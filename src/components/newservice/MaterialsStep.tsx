import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Package } from 'lucide-react';
import { materialsByProfession, MaterialPreset } from '../../constants/materialsByProfession';
import { Profession } from '../../types';

interface MaterialRow extends MaterialPreset {
  id: string;
}

interface MaterialsStepProps {
  profissao: Profession;
  onTotalChange: (total: number) => void;
}

const MaterialsStep: React.FC<MaterialsStepProps> = ({ profissao, onTotalChange }) => {
  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [newMat, setNewMat] = useState<Partial<MaterialPreset>>({
    icon: '📦', nome: '', qty: 1, unit: 'unid.', precoUnit: 0,
  });
  const [showForm, setShowForm] = useState(false);

  // Atualiza materiais quando a profissão muda
  useEffect(() => {
    const presets = materialsByProfession[profissao] ?? materialsByProfession['pedreiro'];
    setMaterials(presets.map((p, i) => ({ ...p, id: `preset-${i}` })));
  }, [profissao]);

  // Recalcula total sempre que materiais mudam
  useEffect(() => {
    const total = materials.reduce((acc, m) => acc + m.qty * m.precoUnit, 0);
    onTotalChange(Math.round(total));
  }, [materials, onTotalChange]);

  const updateQty = (id: string, qty: number) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, qty } : m));
  };

  const updatePreco = (id: string, precoUnit: number) => {
    setMaterials(prev => prev.map(m => m.id === id ? { ...m, precoUnit } : m));
  };

  const removeMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  const addMaterial = () => {
    if (!newMat.nome) return;
    const mat: MaterialRow = {
      id: `custom-${Date.now()}`,
      icon: newMat.icon || '📦',
      nome: newMat.nome || '',
      qty: newMat.qty || 1,
      unit: newMat.unit || 'unid.',
      precoUnit: newMat.precoUnit || 0,
    };
    setMaterials(prev => [...prev, mat]);
    setNewMat({ icon: '📦', nome: '', qty: 1, unit: 'unid.', precoUnit: 0 });
    setShowForm(false);
  };

  const total = materials.reduce((acc, m) => acc + m.qty * m.precoUnit, 0);
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

  const profLabels: Record<string, string> = {
    pedreiro: 'Alvenaria / Piso',
    eletricista: 'Elétrica',
    encanador: 'Hidráulica',
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-montserrat font-bold text-xl flex items-center gap-3">
          <Package className="text-amber" /> Materiais — {profLabels[profissao] ?? profissao}
        </h3>
        <span className="text-[11px] font-bold uppercase tracking-widest text-t-2 bg-ink-tertiary border border-rim px-3 py-1.5 rounded-full">
          {materials.length} itens
        </span>
      </div>

      {/* Lista de materiais */}
      <div className="space-y-2">
        {/* Header */}
        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 px-3 text-[10px] font-bold uppercase tracking-widest text-t-3">
          <span>Material</span>
          <span>Qtd.</span>
          <span>Unidade</span>
          <span>Preço Unit.</span>
          <span></span>
        </div>

        {materials.map((m) => (
          <div key={m.id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 items-center bg-ink-tertiary border border-rim rounded-r-md p-3 group hover:border-rim-secondary transition-all">
            {/* Nome */}
            <div className="flex items-center gap-2">
              <span className="text-lg w-7 text-center shrink-0">{m.icon}</span>
              <span className="text-[13px] font-semibold text-t-1">{m.nome}</span>
            </div>
            {/* Qtd */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-t-3 md:hidden font-bold uppercase tracking-wider">Qtd:</span>
              <input
                type="number"
                value={m.qty}
                min={0}
                onChange={(e) => updateQty(m.id, +e.target.value)}
                className="w-full bg-surface border border-rim rounded-r-sm px-2 py-1.5 text-[13px] text-t-1 outline-none focus:border-amber transition-colors"
              />
            </div>
            {/* Unidade */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-t-3 md:hidden font-bold uppercase tracking-wider">Un:</span>
              <span className="text-[12px] text-t-2">{m.unit}</span>
            </div>
            {/* Preço */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-t-3 md:hidden font-bold uppercase tracking-wider">R$ unit:</span>
              <input
                type="number"
                value={m.precoUnit}
                min={0}
                step={0.01}
                onChange={(e) => updatePreco(m.id, +e.target.value)}
                className="w-full bg-surface border border-rim rounded-r-sm px-2 py-1.5 text-[13px] text-amber outline-none focus:border-amber transition-colors"
              />
            </div>
            {/* Remover */}
            <button
              onClick={() => removeMaterial(m.id)}
              className="p-1.5 text-t-3 hover:text-danger transition-colors rounded"
              title="Remover material"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Formulário de novo material */}
      {showForm ? (
        <div className="bg-surface border border-amber/30 rounded-r-lg p-5 space-y-4 animate-fade-up">
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-amber">Novo Material</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-t-2 mb-1.5">Nome do Material</label>
              <input
                type="text"
                placeholder="Ex: Cimento CP-II"
                value={newMat.nome}
                onChange={(e) => setNewMat({ ...newMat, nome: e.target.value })}
                className="finput"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-t-2 mb-1.5">Quantidade</label>
              <input
                type="number"
                min={1}
                value={newMat.qty}
                onChange={(e) => setNewMat({ ...newMat, qty: +e.target.value })}
                className="finput"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-t-2 mb-1.5">Unidade</label>
              <select
                value={newMat.unit}
                onChange={(e) => setNewMat({ ...newMat, unit: e.target.value })}
                className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]"
              >
                <option value="unid.">Unidade</option>
                <option value="metros">Metros</option>
                <option value="sacos">Sacos</option>
                <option value="kg">Kg</option>
                <option value="peças">Peças</option>
                <option value="rolos">Rolos</option>
                <option value="litros">Litros</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-t-2 mb-1.5">Preço Unitário (R$)</label>
              <input
                type="number"
                min={0}
                step={0.01}
                value={newMat.precoUnit}
                onChange={(e) => setNewMat({ ...newMat, precoUnit: +e.target.value })}
                className="finput"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold tracking-wider uppercase text-t-2 mb-1.5">Emoji / Ícone</label>
              <input
                type="text"
                maxLength={2}
                value={newMat.icon}
                onChange={(e) => setNewMat({ ...newMat, icon: e.target.value })}
                className="finput"
              />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={addMaterial} className="btn-amber !w-auto px-8 py-3 h-auto text-sm">
              <Plus className="w-4 h-4" /> Adicionar
            </button>
            <button onClick={() => setShowForm(false)} className="btn-ghost !w-auto px-6 py-3 h-auto text-sm">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 border border-dashed border-rim hover:border-amber text-t-2 hover:text-amber font-bold text-[13px] uppercase tracking-wider py-4 rounded-r-lg transition-all"
        >
          <Plus className="w-4 h-4" /> Adicionar Material
        </button>
      )}

      {/* Total */}
      <div className="mt-2 bg-ink-tertiary border border-amber/30 rounded-r-lg p-5 flex justify-between items-center shadow-amber-glow">
        <span className="font-montserrat font-bold text-sm uppercase tracking-wider text-t-2">Total de Materiais</span>
        <span className="font-montserrat font-extrabold text-3xl text-amber tracking-tighter">
          R$ {fmt(total)}
        </span>
      </div>
    </div>
  );
};

export default MaterialsStep;