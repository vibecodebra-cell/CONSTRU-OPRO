import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Plus, FileDown, Share2, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Profession, Service, Material } from '../types';
import Toast from '../components/Toast';

const NewService = () => {
  const navigate = useNavigate();
  const { clients, addService } = useApp();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Form State
  const [formData, setFormData] = useState<Partial<Service>>({
    numero: Math.floor(Math.random() * 1000),
    profissao: 'pedreiro',
    tipoServico: 'Piso / Porcelanato',
    dataInicio: new Date().toISOString().split('T')[0],
    status: 'rascunho',
    totalMaterial: 4226,
    maoDeObra: 1800,
    custosExtras: 200,
    margem: 25,
    lucro: 800,
    totalFinal: 4000,
    diasExecucao: 4,
    prazoCliente: 5,
    validade: 15,
    garantia: '90 dias',
    formaPagamento: '50% entrada',
  });

  const handleSave = async () => {
    try {
      await addService(formData);
      setToast({ show: true, message: 'Serviço salvo com sucesso!' });
      setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 5));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const steps = [
    { id: 1, label: 'Info' },
    { id: 2, label: 'Materiais' },
    { id: 3, label: 'Tempo' },
    { id: 4, label: 'Lucro' },
    { id: 5, label: 'Proposta' },
  ];

  return (
    <div className="max-w-[1024px] mx-auto px-6 py-10 animate-fade-up">
      {/* Stepper Header */}
      <div className="flex items-center justify-between mb-12 relative px-4">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-rim -translate-y-1/2 z-0" />
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-amber -translate-y-1/2 z-0 transition-all duration-500" 
          style={{ width: `${((step - 1) / 4) * 100}%` }}
        />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
              step === s.id ? 'bg-amber text-black shadow-amber-glow' : 
              step > s.id ? 'bg-success text-white' : 'bg-ink-tertiary border border-rim text-t-2'
            }`}>
              {step > s.id ? <Check className="w-5 h-5" /> : s.id}
            </div>
            <span className={`text-[11px] font-bold uppercase tracking-widest ${step === s.id ? 'text-amber' : 'text-t-2'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-surface border border-rim rounded-r-xl p-8 mb-8 min-h-[480px]">
        {step === 1 && (
          <div className="space-y-6 max-w-[640px] mx-auto">
            <h3 className="font-montserrat font-bold text-xl mb-8">Informações do Serviço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Cliente</label>
                <select 
                  className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]"
                  onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                  value={formData.clienteId || ''}
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Profissão</label>
                <div className="flex bg-ink-tertiary border border-rim rounded-r-md p-1 gap-1">
                  {['pedreiro', 'eletricista', 'encanador'].map(p => (
                    <button 
                      key={p}
                      onClick={() => setFormData({ ...formData, profissao: p as Profession })}
                      className={`flex-1 py-2 rounded-r-sm text-[11px] font-bold uppercase tracking-wider transition-all ${formData.profissao === p ? 'bg-amber text-black' : 'text-t-2 hover:text-t-1'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Endereço da Obra</label>
                <input 
                  type="text" 
                  placeholder="Rua, número, bairro..." 
                  className="finput"
                  value={formData.endereco || ''}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="font-montserrat font-bold text-xl mb-8">Cálculo de Materiais</h3>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Área Total (m²)</label>
                <input type="number" defaultValue={45} className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Margem de Perda (%)</label>
                <input type="number" defaultValue={10} className="finput" />
              </div>
            </div>
            <div className="bg-ink-tertiary border border-rim rounded-r-xl p-6">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-t-2 mb-6">Materiais Calculados</h4>
              <div className="space-y-3">
                {[
                  { icon: '🔲', nome: 'Porcelanato 60x60', qty: 90, unit: 'peças', total: 4050 },
                  { icon: '🪨', nome: 'Argamassa AC-III', qty: 5, unit: 'sacos', total: 140 },
                  { icon: '🟫', nome: 'Rejunte', qty: 3, unit: 'kg', total: 36 },
                ].map((m, i) => (
                  <div key={i} className="flex items-center gap-3 bg-surface border border-rim rounded-r-md p-3">
                    <span className="text-lg">{m.icon}</span>
                    <div className="flex-1">
                      <div className="text-[13px] font-semibold">{m.nome}</div>
                      <div className="text-[11px] text-t-2">{m.qty} {m.unit}</div>
                    </div>
                    <div className="text-[14px] font-bold text-amber">R$ {m.total}</div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-rim flex justify-between items-center">
                <span className="text-[11px] font-bold uppercase tracking-widest text-t-2">Total Material</span>
                <span className="font-montserrat font-extrabold text-2xl text-amber tracking-tight">R$ 4.226</span>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="max-w-[640px] mx-auto">
            <div className="bg-white text-black p-10 rounded-r-sm shadow-pop mb-8 font-dmsans">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <div className="font-montserrat font-extrabold text-xl tracking-tight text-amber">CONSTRUTOR PRO</div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Proposta de Serviço #{formData.numero}</div>
                </div>
                <div className="text-right text-[11px] font-bold uppercase tracking-widest text-gray-400">Data: {new Date().toLocaleDateString('pt-BR')}</div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Cliente</div>
                  <div className="font-bold">{clients.find(c => c.id === formData.clienteId)?.nome || 'Não selecionado'}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Serviço</div>
                  <div className="font-bold">{formData.tipoServico}</div>
                </div>
              </div>
              <div className="space-y-3 mb-10">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Materiais</span>
                  <span className="font-semibold">R$ {formData.totalMaterial}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Mão de Obra</span>
                  <span className="font-semibold">R$ {formData.maoDeObra}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Custos Extras</span>
                  <span className="font-semibold">R$ {formData.custosExtras}</span>
                </div>
                <div className="flex justify-between pt-4">
                  <span className="font-montserrat font-bold uppercase tracking-wider">Total Geral</span>
                  <span className="font-montserrat font-extrabold text-2xl text-amber">R$ {formData.totalFinal}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 text-[12px]">
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-widest mr-2">Prazo:</span>
                  <span className="font-bold">{formData.diasExecucao} dias úteis</span>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase tracking-widest mr-2">Garantia:</span>
                  <span className="font-bold">{formData.garantia}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn-blue">
                <FileDown className="w-4 h-4" /> Gerar PDF
              </button>
              <button className="btn-ghost">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button 
          onClick={prevStep}
          disabled={step === 1}
          className="flex items-center gap-2 px-6 py-3 rounded-r-md text-t-2 font-bold uppercase tracking-widest text-[11px] transition-all hover:text-t-1 disabled:opacity-30"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
        {step < 5 ? (
          <button 
            onClick={nextStep}
            className="btn-amber !w-auto px-10"
          >
            Próximo Passo <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            onClick={handleSave}
            className="btn-amber !w-auto px-10"
          >
            <Save className="w-4 h-4" /> Salvar Proposta
          </button>
        )}
      </div>

      <Toast 
        isVisible={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
};

export default NewService;