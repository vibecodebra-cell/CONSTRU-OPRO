import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, FileText, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Proposals = () => {
  const navigate = useNavigate();
  const { services, clients } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProposals = services.filter(s => {
    const client = clients.find(c => c.id === s.clienteId);
    const search = searchTerm.toLowerCase();
    return (
      client?.nome.toLowerCase().includes(search) ||
      s.tipoServico.toLowerCase().includes(search) ||
      s.numero.toString().includes(search)
    );
  });

  const statusStyles = {
    rascunho: "bg-rim text-t-2 border-rim",
    enviado: "bg-electric/10 text-electric border-electric/20",
    aprovado: "bg-success/10 text-success border-success/20",
    andamento: "bg-amber/10 text-amber border-amber/20",
    concluido: "bg-success text-black border-success",
    cancelado: "bg-danger/10 text-danger border-danger/20",
  };

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10 animate-fade-up">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-ink-tertiary border border-rim text-t-2 text-[13px] font-medium px-4 py-2.5 rounded-r-sm transition-all hover:text-t-1 hover:border-rim-secondary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight flex-1">
          Histórico de <em className="text-amber not-italic">Propostas</em>
        </h2>
        <button 
          onClick={() => navigate('/new')}
          className="flex items-center gap-2 bg-amber text-black font-montserrat font-bold text-[13px] uppercase px-5 py-3 rounded-r-md transition-all hover:bg-amber-hover hover:-translate-y-0.5 shadow-amber-glow"
        >
          <Plus className="w-3.5 h-3.5" /> Nova Proposta
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t-3" />
        <input 
          type="text" 
          placeholder="Buscar por cliente, serviço ou número..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="finput pl-11"
        />
      </div>

      <div className="space-y-3">
        {filteredProposals.length > 0 ? filteredProposals.map((prop) => {
          const client = clients.find(c => c.id === prop.clienteId);
          return (
            <div 
              key={prop.id} 
              className="bg-surface border border-rim rounded-r-lg p-5 flex items-center gap-4 cursor-pointer transition-all hover:border-amber hover:translate-x-1 group"
            >
              <div className="w-12 h-12 rounded-full bg-ink-tertiary flex items-center justify-center text-t-2 border border-rim group-hover:text-amber transition-all">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-amber uppercase tracking-widest">#{prop.numero}</span>
                  <div className="font-semibold text-[16px] truncate group-hover:text-amber transition-colors">
                    {client?.nome || 'Cliente não identificado'}
                  </div>
                </div>
                <div className="text-[13px] text-t-2">{prop.tipoServico} &mdash; R$ {prop.totalFinal?.toLocaleString('pt-BR')}</div>
              </div>
              <span className={cn("px-3.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border", statusStyles[prop.status as keyof typeof statusStyles])}>
                {prop.status}
              </span>
            </div>
          );
        }) : (
          <div className="text-center py-20 bg-surface/50 border border-dashed border-rim rounded-r-xl">
            <FileText className="w-12 h-12 text-t-3 mx-auto mb-4 opacity-20" />
            <p className="text-t-2">Nenhuma proposta encontrada.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proposals;