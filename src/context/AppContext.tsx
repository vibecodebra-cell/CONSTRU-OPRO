import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Service, PriceItem, UserProfile } from '../types';
import { supabase } from '../integrations/supabase/client';
import { useAuth } from '../components/AuthProvider';

interface AppContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  clients: Client[];
  addClient: (c: Client) => Promise<void>;
  services: Service[];
  addService: (s: Partial<Service>) => Promise<void>;
  updateService: (id: string, s: Partial<Service>) => Promise<void>;
  prices: PriceItem[];
  updatePrice: (id: string, price: number) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>({ 
    nome: 'Profissional', 
    profissao: 'pedreiro', 
    telefone: '', 
    email: '', 
    cidade: '', 
    estado: 'SP' 
  });

  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [prices, setPrices] = useState<PriceItem[]>([
    { id: '1', nome: 'Porcelanato 60x60', unidade: 'peça', preco: 45, categoria: 'Acabamento' },
    { id: '2', nome: 'Argamassa AC-III', unidade: 'saco', preco: 28, categoria: 'Alvenaria' },
    { id: '3', nome: 'Rejunte', unidade: 'kg', preco: 12, categoria: 'Acabamento' },
    { id: '4', nome: 'Tijolo baiano', unidade: 'unid.', preco: 0.8, categoria: 'Alvenaria' },
  ]);

  useEffect(() => {
    if (!session?.user) return;

    const fetchData = async () => {
      setLoading(true);
      
      // Buscar Perfil
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      if (profileData) setProfile(profileData as any);

      // Buscar Clientes
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (clientsData) setClients(clientsData as any);

      // Buscar Serviços (usando a coluna criadoEm que definimos no SQL)
      const { data: servicesData } = await supabase
        .from('services')
        .select('*')
        .order('criadoEm', { ascending: false });
      
      if (servicesData) setServices(servicesData as any);

      setLoading(false);
    };

    fetchData();
  }, [session]);

  const addClient = async (c: Client) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from('clients')
      .insert([{ ...c, user_id: session.user.id }])
      .select()
      .single();
    
    if (!error && data) setClients([data as any, ...clients]);
  };

  const addService = async (s: Partial<Service>) => {
    if (!session?.user) return;
    const { data, error } = await supabase
      .from('services')
      .insert([{ ...s, user_id: session.user.id }])
      .select()
      .single();
    
    if (!error && data) setServices([data as any, ...services]);
  };

  const updateService = async (id: string, updates: Partial<Service>) => {
    const { error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id);
    
    if (!error) {
      setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
    }
  };

  const updatePrice = (id: string, price: number) => {
    setPrices(prices.map(p => p.id === id ? { ...p, preco: price } : p));
  };

  return (
    <AppContext.Provider value={{ 
      profile, setProfile, clients, addClient, services, addService, 
      updateService, prices, updatePrice, loading 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};