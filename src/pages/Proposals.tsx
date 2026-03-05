import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, X, FileDown, Search } from 'lucide-react';
import Toast from '../components/Toast';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });
  
  const [proposals, setProposals] = useState<Proposal[]>(() => {
    const saved = localStorage.getItem('proposals');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'João da Silva', service: 'Piso 45m²', value: 4500, status: 'enviada' },
      { id: 2, name: 'Maria Souza', service: 'Reboco 80m²', value: 3200, status: 'pendente' },
      { id: 3, name: 'Carlos Lima', service: 'Elétrica completa', value: 5000, status: 'aprovada' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('proposals', JSON.stringify(proposals));
  }, [proposals]);

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
    setToast({ show: true, message: 'Proposta adicionada com sucesso!' });
  };

  const filteredProposals = proposals.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusStyles = {
    enviada: "bg-electric/10 text-electric border-electric/20",
    pendente: "bg-amber/10 text-amber border-amber/20",
    aprovada: "bg-success/10 text-success border-success/20",
  };

  const avatarStyles = {
    enviada: "bg-electric/10 text-electric",
    pendente: "bg-rim-secondary text-t-2",
    aprovada: "bg-success/10 text-success",
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10 md:py-12 animate-fade-up">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => navigate('/')}
          aria-label="Voltar para o início"
          className="flex items-center gap-2 bg-ink-tertiary border border-rim text-t-2 text-[13px] font-medium px-4 py-2.5 rounded-r-sm transition-all hover:text-t-1 hover:border-rim-secondary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight flex-1">
          Minhas <em className="text-amber not-italic">Propostas</em>
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-amber text-black font-montserrat font-bold text-[13px] uppercase px-5 py-3 rounded-r-md transition-all hover:bg-amber-hover hover:-translate-y-0.5 shadow-amber-glow"
        >
          <Plus className="w-3.5 h-3.5" /> Nova Proposta
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t-3" />
        <input 
          type="text" 
          placeholder="Buscar propostas..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="finput pl-11"
        />
      </div>

      <div className="space-y-3" role="list">
        {filteredProposals.map((prop) => (
          <div 
            key={prop.id} 
            role="listitem"
            tabIndex={0}
            className="bg-surface border border-rim rounded-r-lg p-5 flex items-center gap-4 cursor-pointer transition-all hover:border-amber hover:translate-x-1 group"
          >
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center font-montserrat font-extrabold text-lg flex-shrink-0", avatarStyles[prop.status])}>
              {prop.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[16px] truncate group-hover:text-amber transition-colors">{prop.name}</div>
              <div className="text-[13px] text-t-2">{prop.service} &mdash; R$ {prop.value.toLocaleString('pt-BR')}</div>
            </div>
            <span className={cn("px-3.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase border", statusStyles[prop.status])}>
              {prop.status}
            </span>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="bg-surface border border-rim-secondary rounded-r-xl p-8 w-full max-w-[480px] shadow-pop animate-in zoom-in-95 slide-in-from-bottom-4 duration-250"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-7">
              <h3 id="modal-title" className="font-montserrat font-extrabold text-2xl tracking-tight">Nova Proposta</h3>
              <button 
                onClick={() => setIsModalOpen(false)} 
                aria-label="Fechar modal"
                className="w-9 h-9 bg-ink-tertiary border border-rim rounded-r-sm text-t-2 flex items-center justify-center transition-all hover:bg-danger/10 hover:text-danger hover:border-danger/30"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Nome do cliente</label>
                <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Ex: Pedro Alves" className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Tipo de serviço</label>
                <select value={newService} onChange={(e) => setNewService(e.target.value)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]">
                  <option>Piso / Porcelanato</option>
                  <option>Reboco</option>
                  <option>Elétrica Residencial</option>
                  <option>Encanamento</option>
                  <option>Alvenaria</option>
                </select>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Valor total (R$)</label>
                <input type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="Ex: 3500" className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Status</label>
                <select value={newStatus} onChange={(e) => setNewStatus(e.target.value as any)} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]">
                  <option value="pendente">Pendente</option>
                  <option value="enviada">Enviada</option>
                  <option value="aprovada">Aprovada</option>
                </select>
              </div>
              <button onClick={addProposal} className="btn-amber mt-2">
                <Plus className="w-4 h-4" /> Adicionar Proposta
              </button>
              <button className="btn-ghost">
                <FileDown className="w-4 h-4" /> Gerar PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast 
        isVisible={toast.show} 
        message={toast.message} 
        onClose={() => setToast({ ...toast, show: false })} 
      />
    </div>
  );
};

export default Proposals;