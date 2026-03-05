import React, { createContext, useContext, useState, useEffect } from 'react';
import { Client, Service, PriceItem, UserProfile } from '../types';

interface AppContextType {
  profile: UserProfile;
  setProfile: (p: UserProfile) => void;
  clients: Client[];
  addClient: (c: Client) => void;
  services: Service[];
  addService: (s: Service) => void;
  updateService: (id: string, s: Partial<Service>) => void;
  prices: PriceItem[];
  updatePrice: (id: string, price: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('cpro_profile');
    return saved ? JSON.parse(saved) : { nome: 'Profissional', profissao: 'pedreiro', telefone: '', email: '', cidade: '', estado: 'SP' };
  });

  const [clients, setClients] = useState<Client[]>(() => {
    const saved = localStorage.getItem('cpro_clients');
    return saved ? JSON.parse(saved) : [];
  });

  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('cpro_servicos');
    return saved ? JSON.parse(saved) : [];
  });

  const [prices, setPrices] = useState<PriceItem[]>(() => {
    const saved = localStorage.getItem('cpro_precos');
    return saved ? JSON.parse(saved) : [
      { id: '1', nome: 'Porcelanato 60x60', unidade: 'peça', preco: 45, categoria: 'Acabamento' },
      { id: '2', nome: 'Argamassa AC-III', unidade: 'saco', preco: 28, categoria: 'Alvenaria' },
      { id: '3', nome: 'Rejunte', unidade: 'kg', preco: 12, categoria: 'Acabamento' },
      { id: '4', nome: 'Tijolo baiano', unidade: 'unid.', preco: 0.8, categoria: 'Alvenaria' },
    ];
  });

  useEffect(() => localStorage.setItem('cpro_profile', JSON.stringify(profile)), [profile]);
  useEffect(() => localStorage.setItem('cpro_clients', JSON.stringify(clients)), [clients]);
  useEffect(() => localStorage.setItem('cpro_servicos', JSON.stringify(services)), [services]);
  useEffect(() => localStorage.setItem('cpro_precos', JSON.stringify(prices)), [prices]);

  const addClient = (c: Client) => setClients([c, ...clients]);
  const addService = (s: Service) => setServices([s, ...services]);
  const updateService = (id: string, updates: Partial<Service>) => {
    setServices(services.map(s => s.id === id ? { ...s, ...updates, atualizadoEm: new Date().toISOString() } : s));
  };
  const updatePrice = (id: string, price: number) => {
    setPrices(prices.map(p => p.id === id ? { ...p, preco: price } : p));
  };

  return (
    <AppContext.Provider value={{ profile, setProfile, clients, addClient, services, addService, updateService, prices, updatePrice }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};