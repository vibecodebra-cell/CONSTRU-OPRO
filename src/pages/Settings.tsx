import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, User, Hammer, Phone, Mail, MapPin, CreditCard, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../integrations/supabase/client';
import Toast from '../components/Toast';

const Settings = () => {
  const navigate = useNavigate();
  const { profile, setProfile } = useApp();
  const [toast, setToast] = useState({ show: false, message: '' });
  const [formData, setFormData] = useState(profile);

  const handleSave = async () => {
    const { error } = await supabase
      .from('profiles')
      .update(formData)
      .eq('id', (await supabase.auth.getUser()).data.user?.id);
    
    if (!error) {
      setProfile(formData);
      setToast({ show: true, message: 'Perfil atualizado com sucesso!' });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="max-w-[800px] mx-auto px-6 py-10 animate-fade-up">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 bg-ink-tertiary border border-rim text-t-2 text-[13px] font-medium px-4 py-2.5 rounded-r-sm transition-all hover:text-t-1 hover:border-rim-secondary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight">Configurações</h2>
      </div>

      <div className="space-y-8">
        <section className="bg-surface border border-rim rounded-r-xl p-8">
          <h3 className="font-montserrat font-bold text-lg mb-8 flex items-center gap-3">
            <User className="text-amber w-5 h-5" /> Perfil Profissional
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Nome Completo</label>
              <input type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="finput" />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Profissão Principal</label>
              <select value={formData.profissao} onChange={e => setFormData({...formData, profissao: e.target.value as any})} className="finput appearance-none bg-[url('data:image/svg+xml,%3Csvg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2212%22_height=%228%22_viewBox=%220_0_12_8%22%3E%3Cpath_d=%22M1_1l5_5_5-5%22_stroke=%22%2394A3B8%22_stroke-width=%221.5%22_fill=%22none%22_stroke-linecap=%22round%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_16px_center]">
                <option value="pedreiro">Pedreiro</option>
                <option value="eletricista">Eletricista</option>
                <option value="encanador">Encanador</option>
                <option value="multiplas">Múltiplas Funções</option>
              </select>
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Telefone / WhatsApp</label>
              <input type="text" value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} className="finput" />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Cidade</label>
              <input type="text" value={formData.cidade} onChange={e => setFormData({...formData, cidade: e.target.value})} className="finput" />
            </div>
            <div>
              <label className="block text-[11.5px] font-semibold tracking-wider uppercase text-t-2 mb-2">Estado</label>
              <input type="text" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})} className="finput" />
            </div>
          </div>
          <button onClick={handleSave} className="btn-amber mt-10 w-full md:w-auto px-10">
            <Save className="w-4 h-4" /> Salvar Alterações
          </button>
        </section>

        <section className="bg-surface border border-rim rounded-r-xl p-8">
          <h3 className="font-montserrat font-bold text-lg mb-6 flex items-center gap-3">
            <CreditCard className="text-amber w-5 h-5" /> Conta e Segurança
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-ink-tertiary border border-rim rounded-r-md">
              <div>
                <div className="text-sm font-bold">E-mail da Conta</div>
                <div className="text-xs text-t-2 mt-1">{formData.email}</div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-success bg-success/10 px-2 py-1 rounded">Verificado</span>
            </div>
            <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full py-4 rounded-r-md border border-danger/30 text-danger font-montserrat font-bold text-xs uppercase tracking-widest hover:bg-danger/10 transition-all">
              <LogOut className="w-4 h-4" /> Sair da Conta
            </button>
          </div>
        </section>
      </div>

      <Toast isVisible={toast.show} message={toast.message} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  );
};

export default Settings;