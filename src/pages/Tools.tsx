import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Calculator, Clock, TrendingUp } from 'lucide-react';
import MaterialCalculator from '../components/calculators/MaterialCalculator';
import BudgetCalculator from '../components/calculators/BudgetCalculator';
import TimeCalculator from '../components/calculators/TimeCalculator';
import ProfitSimulator from '../components/calculators/ProfitSimulator';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Tools = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'materiais');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) setActiveTab(tab);
  }, [searchParams]);

  const tabs = [
    { id: 'materiais', label: 'Materiais', icon: Package },
    { id: 'orcamento', label: 'Orçamento', icon: Calculator },
    { id: 'tempo', label: 'Tempo', icon: Clock },
    { id: 'lucro', label: 'Lucro', icon: TrendingUp },
  ];

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-10 md:py-12">
      <div className="flex items-center gap-4 mb-8 flex-wrap">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-ink-tertiary border border-rim text-[#94A3B8] text-[13px] font-medium px-4 py-2 rounded-r-sm transition-all hover:text-[#F1F5F9] hover:border-rim-secondary"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar
        </button>
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight">
          Ferramentas <em className="text-amber not-italic">PRO</em>
        </h2>
      </div>

      <div className="flex bg-ink-tertiary border border-rim rounded-r-lg p-1.5 gap-1 mb-8 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 px-4.5 py-2.5 rounded-r-sm text-[13.5px] font-medium transition-all",
                isActive 
                  ? "bg-amber text-black font-semibold shadow-lg shadow-amber/25" 
                  : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-surface"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'materiais' && <MaterialCalculator />}
        {activeTab === 'orcamento' && <BudgetCalculator />}
        {activeTab === 'tempo' && <TimeCalculator />}
        {activeTab === 'lucro' && <ProfitSimulator />}
      </div>
    </div>
  );
};

export default Tools;