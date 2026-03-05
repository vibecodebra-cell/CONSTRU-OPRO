import React from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, FileText, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Dashboard = () => {
  const { profile, services } = useApp();
  
  const stats = [
    { label: 'Faturamento do mês', value: 'R$ 12.400', change: '+18%', up: true, icon: DollarSign, color: 'text-amber' },
    { label: 'Propostas abertas', value: '7', change: '+2', up: true, icon: FileText, color: 'text-electric' },
    { label: 'Taxa de aprovação', value: '68%', change: '+5%', up: true, icon: CheckCircle, color: 'text-success' },
    { label: 'Lucro médio', value: '29%', change: '-2%', up: false, icon: TrendingUp, color: 'text-electric' },
  ];

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-10 animate-fade-up">
      <div className="mb-10">
        <h1 className="font-montserrat font-extrabold text-3xl tracking-tight mb-1">
          Olá, {profile.nome}! 👋
        </h1>
        <p className="text-t-2 text-sm">Bom dia. Quinta-feira, 5 de março de 2026</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-surface border border-rim rounded-r-xl p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-r-md bg-ink-tertiary ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[11px] font-bold ${stat.up ? 'text-success' : 'text-danger'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div className="text-t-2 text-[11px] font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="font-montserrat font-extrabold text-2xl tracking-tight">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-surface border border-rim rounded-r-xl p-8">
          <h3 className="font-montserrat font-bold text-lg mb-8">Faturamento (Últimos 6 meses)</h3>
          <div className="h-[240px] flex items-end justify-between gap-4 px-2">
            {[45, 65, 35, 85, 55, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-hover to-amber rounded-t-md transition-all duration-700 group-hover:shadow-amber-glow"
                    style={{ height: `${h}%` }}
                  />
                </div>
                <span className="text-[11px] font-bold text-t-2 uppercase tracking-widest">Out</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-rim rounded-r-xl p-8">
          <h3 className="font-montserrat font-bold text-lg mb-8">Atividade Recente</h3>
          <div className="space-y-6">
            {[
              { label: 'Proposta aprovada — Carlos Lima', time: 'há 2 horas', status: 'success' },
              { label: 'Orçamento enviado — João da Silva', time: 'há 1 dia', status: 'info' },
              { label: 'Novo serviço criado — Maria Souza', time: 'há 2 dias', status: 'warn' },
              { label: 'Pagamento recebido — Pedro Alves', time: 'há 3 dias', status: 'success' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className={`w-2 h-2 rounded-full mt-1.5 ${act.status === 'success' ? 'bg-success' : act.status === 'info' ? 'bg-electric' : 'bg-amber'}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-medium text-t-1 truncate group-hover:text-amber transition-colors">{act.label}</div>
                  <div className="text-[11px] text-t-2 font-semibold uppercase tracking-wider mt-1">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;