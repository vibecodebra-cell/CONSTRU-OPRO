import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, User, Phone, Mail, MapPin, X, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Client } from '../types';
import Toast from '../components/Toast';

const Clients = () => {
  const navigate = useNavigate();
  const { clients, addClient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const [newClient, setNewClient] = useState<Partial<Client>>({
    nome: '',
    telefone: '',
    email: '',
    cidade: '',
    tipo: 'residencial',
    obs: ''
  });

  const handleAddClient = async () => {
    if (!newClient.nome || !newClient.telefone) return;
    await addClient(newClient as Client);
    setIsModalOpen(false);
    setNewClient({ nome: '', telefone: '', email: '', cidade: '', tipo: 'residencial', obs: '' });
    setToast({ show: true, message: 'Cliente cadastrado com sucesso!' });
  };

  const filteredClients = clients.filter(c => 
    c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.telefone.includes(searchTerm)
  );

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
          Meus <em className="text-amber not-italic">Clientes</em>
        </h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-novo-cliente flex items-center gap-2 bg-amber text-black font-montserrat font-bold text-[13px] uppercase px-5 py-3 rounded-r-md transition-all hover:bg-amber-hover hover:-translate-y-0.5 shadow-amber-glow"
        >
          <Plus className="w-3.5 h-3.5" /> Novo Cliente
        </button>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-t-3" />
        <input 
          type="text" 
          placeholder="Buscar por nome ou telefone..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="finput pl-11"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredClients.length > 0 ? filteredClients.map((client) => (
          <div key={client.id} className="bg-surface border border-rim rounded-r-xl p-5 flex items-center gap-5 group hover:border-amber transition-all">
            <div className="w-12 h-12 rounded-full bg-ink-tertiary flex items-center justify-center text-amber border border-rim group-hover:bg-amber group-hover:text-black transition-all">
              <User className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg truncate">{client.nome}</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                <span className="flex items-center gap-1.5 text-[13px] text-t-2"><Phone className="w-3 h-3" /> {client.telefone}</span>
                {client.cidade && <span className="flex items-center gap-1.5 text-[13px] text-t-2"><MapPin className="w-3 h-3" /> {client.cidade}</span>}
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="px-3 py-1 rounded-full bg-ink-tertiary border border-rim text-[10px] font-bold uppercase tracking-widest text-t-2">
                {client.tipo}
              </span>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-surface/50 border border-dashed border-rim rounded-r-xl">
            <User className="w-12 h-12 text-t-3 mx-auto mb-4 opacity-20" />
            <p className="text-t-2">Nenhum cliente encontrado.</p>
          </div>
        )}
      </div>

      {/* Modal Novo Cliente */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setIsModalOpen(false)}>
          <div className="bg-surface border border-rim-secondary rounded-r-xl p-8 w-full max-w-[480px] shadow-pop animate-in zoom-in-95 duration-250" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-montserrat font-extrabold text-2xl tracking-tight">Novo Cliente</h3>
              <button onClick={() => setIsModalOpen(false)} className="w-9 h-9 bg-ink-tertiary border border-rim rounded-r-sm text-t-2 flex items-center justify-center hover:text-danger"><X className="w-4.5 h-4.5" /></button>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Nome Completo</label>
                <input type="text" value={newClient.nome} onChange={e => setNewClient({...newClient, nome: e.target.value})} placeholder="Ex: João da Silva" className="finput" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Telefone</label>
                  <input type="text" value={newClient.telefone} onChange={e => setNewClient({...newClient, telefone: e.target.value})} placeholder="(00) 00000-0000" className="finput" />
                </div>
                <div>
                  <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Cidade</label>
                  <input type="text" value={newClient.cidade} onChange={e => setNewClient({...newClient, cidade: e.target.value})} placeholder="Ex: São Paulo" className="finput" />
                </div>
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">E-mail (Opcional)</label>
                <input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} placeholder="cliente@email.com" className="finput" />
              </div>
              <div>
                <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Tipo de Obra</label>
                <select value={newClient.tipo} onChange={e => setNewClient({...newClient, tipo: e.target.value as any})} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]">
                  <option value="residencial">Residencial</option>
                  <option value="comercial">Comercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <button onClick={handleAddClient} className="btn-salvar-cliente btn-amber mt-4"><Save className="w-4 h-4" /> Salvar Cliente</button>
            </div>
          </div>
        </div>
      )}

      <Toast isVisible={toast.show} message={toast.message} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

export default Clients;