import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, FileDown } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Proposal {
  id: number;
  name: string;
  service: string;
  value: number;
  status: 'enviada' | 'pendente' | 'aprovada';
}

const Proposals = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([
    { id: 1, name: 'João da Silva', service: 'Piso 45m²', value: 4500, status: 'enviada' },
    { id: 2, name: 'Maria Souza', service: 'Reboco 80m²', value: 3200, status: 'pendente' },
    { id: 3, name: 'Carlos Lima', service: 'Elétrica completa', value: 5000, status: 'aprovada' },
  ]);

  const [newName, setNewName] = useState('');
  const [newService, setNewService] = useState('Piso / Porcelanato');
  const [newValue, setNewValue] = useState('');
  const [newStatus, setNewStatus] = useState<'enviada' | 'pendente' | 'aprovada'>('pendente');

  const addProposal = () => {
    if (!newName || !newValue) return;
    const newProp: Proposal = {
      id: Date.now(),
      name: newName,
      service: newService,
      value: +newValue,
      status: newStatus,
    };
    setProposals([newProp, ...proposals]);
    setIsModalOpen(false);
    setNewName('');
    setNewValue('');
  };

  const statusStyles = {
    enviada: "bg-electric/10 text-electric border-electric/20",
    pendente: "bg-amber/10 text-amber border-amber/20",
    aprovada: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20",
  };

  const avatarStyles = {
    enviada: "bg-electric/10 text-electric",
    pendente: "bg-rim-secondary text-[#94A3B8]",
    aprovada: "bg-[#10B981]/10 text-[#10B981]",
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10 md:py-12">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-ink-tertiary border border-rim text-[#94A3B8] text-[13px] font-medium px-4 py-2 rounded-r-sm transition-all hover:text-[#F1F5F9] hover:border-rim-secondary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight flex-1">
          Minhas <em className="text-amber not-italic">Propostas</em>
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber text-black font-montserrat font-bold text-[13px] uppercase px-5 py-2.5 rounded-r-md transition-all hover:bg-amber-hover hover:-translate-y-0.5"
        >
          <Plus className="w-3.5 h-3.5" /> Nova Proposta
        </button>
      </div>

      <div className="space-y-3">
        {proposals.map((prop) => (
          <div key={prop.id} className="bg-surface border border-rim rounded-r-lg p-4.5 flex items-center gap-4 cursor-pointer transition-all hover:border-amber hover:translate-x-1">
            <div className={cn("w-11 h-11 rounded-full flex items-center justify-center font-montserrat font-extrabold text-lg flex-shrink-0", avatarStyles[prop.status])}>
              {prop.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[15px] truncate">{prop.name}</div>
              <div className="text-[12.5px] text-[#94A3B8]">{prop.service} &mdash; R$ {prop.value.toLocaleString('pt-BR')}</div>
            </div>
            <span className={cn("px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border", statusStyles[prop.status])}>
              {prop.status}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-surface border border-rim-secondary rounded-r-xl p-8 w-full max-w-[460px] shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-6.5">
              <h3 className="font-montserrat font-extrabold text-xl tracking-tight">Nova Proposta</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 bg-ink-tertiary border border-rim rounded-r-sm text-[#94A3B8] flex items-center justify-center transition-all hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/30">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4.5">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Nome do cliente</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: Pedro Alves" className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Tipo de serviço</label>
                <select value={newService} onChange={(e) => setNewService(e.target.value)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
                  <option>Piso / Porcelanato</option>
                  <option>Reboco</option>
                  <option>Elétrica Residencial</option>
                  <option>Encanamento</option>
                  <option>Alvenaria</option>
                </select>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Valor total (R$)</label>
                <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Ex: 3500" className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-[#94A3B8] mb-2">Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as any)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_14px_center]">
                  <option value="pendente">Pendente</option>
                  <option value="enviada">Enviada</option>
                  <option value="aprovada">Aprovada</option>
                </select>
              </div>
              <button onClick={addProposal} className="btn-amber mt-2">
                <Plus className="w-4 h-4" /> Adicionar Proposta
              </button>
              <button className="flex items-center justify-center gap-2 w-full bg-ink-tertiary border border-rim text-[#94A3B8] font-montserrat font-bold text-sm uppercase py-3.5 rounded-r-md transition-all hover:text-[#F1F5F9] hover:border-rim-secondary hover:-translate-y-0.5">
                <FileDown className="w-4 h-4" /> Gerar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Proposals;