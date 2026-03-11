import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Plus, FileDown, Share2, Save, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Profession, Service } from '../types';
import Toast from '../components/Toast';
import MaterialsStep from '../components/newservice/MaterialsStep';

const NewService = () => {
  const navigate = useNavigate();
  const { clients, addService, profile } = useApp();
  const [step, setStep] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const proposalRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    numero: Math.floor(Math.random() * 9000) + 1000,
    profissao: 'pedreiro',
    tipoServico: 'Piso / Porcelanato',
    dataInicio: new Date().toISOString().split('T')[0],
    status: 'rascunho',
    totalMaterial: 0,
    maoDeObra: 1800,
    custosExtras: 200,
    margem: 25,
    lucro: 0,
    totalFinal: 0,
    diasExecucao: 4,
    prazoCliente: 5,
    validade: 15,
    garantia: '90 dias',
    formaPagamento: '50% entrada',
  });

  const updateFormData = (updates: Partial<Service>) => {
    setFormData(prev => {
      const newData = { ...prev, ...updates };
      // Recalcula lucro e total sem alterar mão de obra
      const subtotal = (newData.totalMaterial || 0) + (newData.maoDeObra || 0) + (newData.custosExtras || 0);
      const lucroCalculado = subtotal * ((newData.margem || 0) / 100);
      newData.lucro = Math.round(lucroCalculado);
      newData.totalFinal = Math.round(subtotal + lucroCalculado);
      return newData;
    });
  };

  const handleMaterialTotalChange = (total: number) => {
    setFormData(prev => {
      const newData = { ...prev, totalMaterial: total };
      const subtotal = (newData.totalMaterial || 0) + (newData.maoDeObra || 0) + (newData.custosExtras || 0);
      const lucroCalculado = subtotal * ((newData.margem || 0) / 100);
      newData.lucro = Math.round(lucroCalculado);
      newData.totalFinal = Math.round(subtotal + lucroCalculado);
      return newData;
    });
  };

  const handleSave = async () => {
    await addService(formData);
    setToast({ show: true, message: 'Serviço salvo com sucesso!' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  const handleGeneratePdf = async () => {
    if (!proposalRef.current) return;
    setGeneratingPdf(true);
    try {
      const { default: jsPDF } = await import('jspdf');
      const { default: html2canvas } = await import('html2canvas');

      const canvas = await html2canvas(proposalRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      const pageWidth = 210;
      const pageHeight = 297;
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * pageWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`proposta-${formData.numero}-${selectedClient?.nome || 'cliente'}.pdf`);
      setToast({ show: true, message: 'PDF gerado com sucesso!' });
    } catch (err) {
      console.error(err);
      setToast({ show: true, message: 'Erro ao gerar PDF.' });
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleShare = () => {
    const client = selectedClient;
    const msg = [
      `*PROPOSTA DE SERVIÇO #${formData.numero}*`,
      ``,
      `👷 *Profissional:* ${profile.nome}`,
      `📋 *Serviço:* ${formData.tipoServico}`,
      `📍 *Endereço:* ${formData.endereco || 'A definir'}`,
      ``,
      `💰 *Composição de Valores:*`,
      `• Materiais: R$ ${(formData.totalMaterial || 0).toLocaleString('pt-BR')}`,
      `• Mão de obra: R$ ${(formData.maoDeObra || 0).toLocaleString('pt-BR')}`,
      `• Custos extras: R$ ${(formData.custosExtras || 0).toLocaleString('pt-BR')}`,
      ``,
      `✅ *TOTAL: R$ ${(formData.totalFinal || 0).toLocaleString('pt-BR')}*`,
      ``,
      `📅 *Prazo de entrega:* ${formData.prazoCliente} dias úteis`,
      `🛡️ *Garantia:* ${formData.garantia}`,
      ``,
      `_Proposta gerada pelo Construtor Pro_`,
    ].join('\n');

    const phone = client?.telefone?.replace(/\D/g, '') || '';
    const url = phone
      ? `https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    window.open(url, '_blank');
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

  const selectedClient = clients.find(c => c.id === formData.clienteId);
  const fmt = (v: number) => v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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

        {/* STEP 1 — Informações */}
        {step === 1 && (
          <div className="space-y-6 max-w-[640px] mx-auto">
            <h3 className="font-montserrat font-bold text-xl mb-8 flex items-center gap-3">
              <Plus className="text-amber" /> Informações do Serviço
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Cliente</label>
                <select
                  name="cliente"
                  className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]"
                  onChange={(e) => updateFormData({ clienteId: e.target.value })}
                  value={formData.clienteId || ''}
                >
                  <option value="">Selecione um cliente</option>
                  {clients.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Profissão</label>
                <div className="flex bg-ink-tertiary border border-rim rounded-r-md p-1 gap-1">
                  {(['pedreiro', 'eletricista', 'encanador'] as Profession[]).map(p => (
                    <button
                      key={p}
                      onClick={() => updateFormData({ profissao: p })}
                      className={`profissao-toggle-${p} flex-1 py-2 rounded-r-sm text-[11px] font-bold uppercase tracking-wider transition-all ${formData.profissao === p ? 'bg-amber text-black' : 'text-t-2 hover:text-t-1'}`}
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
                  onChange={(e) => updateFormData({ endereco: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 — Materiais */}
        {step === 2 && (
          <MaterialsStep
            profissao={formData.profissao as Profession}
            onTotalChange={handleMaterialTotalChange}
          />
        )}

        {/* STEP 3 — Tempo */}
        {step === 3 && (
          <div className="space-y-6 max-w-[640px] mx-auto">
            <h3 className="font-montserrat font-bold text-xl mb-8 flex items-center gap-3">
              <Clock className="text-amber" /> Cronograma de Execução
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Dias de Execução</label>
                <input
                  type="number"
                  value={formData.diasExecucao}
                  onChange={(e) => updateFormData({ diasExecucao: +e.target.value })}
                  className="finput"
                />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Prazo de Entrega (Cliente)</label>
                <input
                  type="number"
                  value={formData.prazoCliente}
                  onChange={(e) => updateFormData({ prazoCliente: +e.target.value })}
                  className="finput"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Garantia</label>
                <input
                  type="text"
                  value={formData.garantia}
                  onChange={(e) => updateFormData({ garantia: e.target.value })}
                  placeholder="Ex: 90 dias"
                  className="finput"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 — Lucro */}
        {step === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <h3 className="font-montserrat font-bold text-xl mb-4 flex items-center gap-3">
                <TrendingUp className="text-amber" /> Precificação e Lucro
              </h3>
              <p className="text-t-3 text-xs leading-relaxed -mt-2">
                A margem de lucro é aplicada sobre o subtotal (material + mão de obra + extras).
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Mão de Obra (R$)</label>
                  <input
                    type="number"
                    value={formData.maoDeObra}
                    onChange={(e) => updateFormData({ maoDeObra: +e.target.value })}
                    className="finput"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Custos Extras (R$)</label>
                  <input
                    type="number"
                    value={formData.custosExtras}
                    onChange={(e) => updateFormData({ custosExtras: +e.target.value })}
                    className="finput"
                  />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">
                    Margem Desejada (%) — Lucro sobre o subtotal
                  </label>
                  <input
                    type="number"
                    value={formData.margem}
                    onChange={(e) => updateFormData({ margem: +e.target.value })}
                    className="finput"
                  />
                  {/* Slider visual */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={formData.margem}
                    onChange={(e) => updateFormData({ margem: +e.target.value })}
                    className="w-full mt-3 accent-amber"
                  />
                  <div className="flex justify-between text-[10px] text-t-3 font-bold mt-1">
                    <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-ink-tertiary border border-rim rounded-r-xl p-8 flex flex-col justify-center">
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center text-t-2 py-2 border-b border-rim">
                  <span className="text-sm">Material</span>
                  <span className="font-semibold">R$ {fmt(formData.totalMaterial || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-t-2 py-2 border-b border-rim">
                  <span className="text-sm">Mão de Obra</span>
                  <span className="font-semibold">R$ {fmt(formData.maoDeObra || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-t-2 py-2 border-b border-rim">
                  <span className="text-sm">Custos Extras</span>
                  <span className="font-semibold">R$ {fmt(formData.custosExtras || 0)}</span>
                </div>
                <div className="flex justify-between items-center text-t-2 py-2 border-b border-rim">
                  <span className="text-sm font-bold">Subtotal</span>
                  <span className="font-bold">R$ {fmt((formData.totalMaterial || 0) + (formData.maoDeObra || 0) + (formData.custosExtras || 0))}</span>
                </div>
                <div className="flex justify-between items-center text-success py-2">
                  <span className="text-sm font-bold uppercase tracking-wider">Lucro ({formData.margem}%)</span>
                  <span className="font-bold text-success">+ R$ {fmt(formData.lucro || 0)}</span>
                </div>
              </div>
              <div className="p-6 bg-surface border border-amber/30 rounded-r-lg shadow-amber-glow">
                <div className="text-[11px] font-bold uppercase tracking-widest text-t-2 mb-1">Preço Final da Proposta</div>
                <div className="font-montserrat font-extrabold text-4xl text-amber tracking-tighter">
                  R$ {fmt(formData.totalFinal || 0)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5 — Proposta */}
        {step === 5 && (
          <div className="max-w-[640px] mx-auto">
            {/* Proposta A4 */}
            <div
              ref={proposalRef}
              style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#ffffff', color: '#111', width: '794px', minHeight: '1123px', padding: '60px 56px', boxSizing: 'border-box' }}
            >
              {/* Cabeçalho */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', borderBottom: '3px solid #F59E0B', paddingBottom: '24px' }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '22px', letterSpacing: '-0.5px', color: '#F59E0B' }}>CONSTRUTOR PRO</div>
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: '#888', marginTop: '4px' }}>Proposta de Serviço</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#333', marginTop: '8px' }}>{profile.nome}</div>
                  {profile.telefone && <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>📞 {profile.telefone}</div>}
                  {profile.cidade && <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>📍 {profile.cidade}{profile.estado ? `, ${profile.estado}` : ''}</div>}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '28px', fontWeight: 900, color: '#111' }}>#{formData.numero}</div>
                  <div style={{ fontSize: '11px', color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
                    {new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </div>
                  <div style={{ marginTop: '10px', display: 'inline-block', background: '#FEF3C7', color: '#92400E', fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', padding: '4px 10px', borderRadius: '99px' }}>
                    Válida por {formData.validade} dias
                  </div>
                </div>
              </div>

              {/* Cliente e Serviço */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '36px' }}>
                <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '10px' }}>Cliente</div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>{selectedClient?.nome || 'Não informado'}</div>
                  {selectedClient?.telefone && <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>📞 {selectedClient.telefone}</div>}
                  {selectedClient?.email && <div style={{ fontSize: '13px', color: '#555', marginTop: '2px' }}>✉️ {selectedClient.email}</div>}
                  {selectedClient?.cidade && <div style={{ fontSize: '13px', color: '#555', marginTop: '2px' }}>📍 {selectedClient.cidade}</div>}
                </div>
                <div style={{ background: '#F9FAFB', borderRadius: '10px', padding: '20px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '10px' }}>Serviço</div>
                  <div style={{ fontWeight: 700, fontSize: '16px', color: '#111' }}>{formData.tipoServico}</div>
                  <div style={{ fontSize: '13px', color: '#555', marginTop: '4px', textTransform: 'capitalize' }}>👷 {formData.profissao}</div>
                  {formData.endereco && <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>📍 {formData.endereco}</div>}
                  {formData.dataInicio && <div style={{ fontSize: '13px', color: '#555', marginTop: '4px' }}>📅 Início: {new Date(formData.dataInicio + 'T00:00:00').toLocaleDateString('pt-BR')}</div>}
                </div>
              </div>

              {/* Composição de Valores */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '14px' }}>Composição de Valores</div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      ['Materiais', formData.totalMaterial || 0],
                      ['Mão de Obra e Execução', formData.maoDeObra || 0],
                      ...(formData.custosExtras ? [['Custos Adicionais', formData.custosExtras]] : []),
                    ].map(([label, value], i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                        <td style={{ padding: '12px 0', fontSize: '14px', color: '#374151' }}>{label as string}</td>
                        <td style={{ padding: '12px 0', fontSize: '14px', fontWeight: 600, textAlign: 'right', color: '#111' }}>
                          R$ {(value as number).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td style={{ padding: '18px 0 8px', fontSize: '16px', fontWeight: 900, color: '#111' }}>VALOR TOTAL DA OBRA</td>
                      <td style={{ padding: '18px 0 8px', fontSize: '28px', fontWeight: 900, textAlign: 'right', color: '#F59E0B' }}>
                        R$ {(formData.totalFinal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Condições */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '36px' }}>
                {[
                  ['⏱️ Prazo de Entrega', `${formData.prazoCliente} dias úteis`],
                  ['🛡️ Garantia', formData.garantia || '—'],
                  ['💳 Pagamento', formData.formaPagamento || '—'],
                ].map(([label, value], i) => (
                  <div key={i} style={{ background: '#F9FAFB', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#9CA3AF', marginBottom: '6px' }}>{label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#111' }}>{value}</div>
                  </div>
                ))}
              </div>

              {/* Rodapé */}
              <div style={{ borderTop: '2px solid #F3F4F6', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600 }}>
                  Proposta gerada pelo <strong style={{ color: '#F59E0B' }}>Construtor Pro</strong>
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                  Esta proposta é válida por {formData.validade} dias a partir da data de emissão.
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleGeneratePdf}
                disabled={generatingPdf}
                className="btn-blue h-14 disabled:opacity-60"
              >
                {generatingPdf ? (
                  <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Gerando...</span>
                ) : (
                  <><FileDown className="w-4 h-4" /> Gerar PDF</>
                )}
              </button>
              <button onClick={handleShare} className="btn-ghost h-14">
                <Share2 className="w-4 h-4" /> WhatsApp
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
            className="btn-amber btn-proximo-passo !w-auto px-10 h-14"
          >
            Próximo Passo <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="btn-amber !w-auto px-10 h-14"
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