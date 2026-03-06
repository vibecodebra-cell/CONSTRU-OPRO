import React from 'react';
import { useApp } from '../context/AppContext';
import { DollarSign, FileText, CheckCircle, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const Dashboard = () => {
  const { profile, services, clients } = useApp();
  
  // Cálculos Reais
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const servicesThisMonth = services.filter(s => {
    const date = new Date(s.criadoEm);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const faturamentoMes = servicesThisMonth.reduce((acc, s) => acc + (s.totalFinal || 0), 0);
  const propostasAbertas = services.filter(s => s.status === 'enviado' || s.status === 'rascunho').length;
  
  const totalFinalizados = services.filter(s => s.status !== 'rascunho' && s.status !== 'cancelado').length;
  const aprovados = services.filter(s => ['aprovado', 'andamento', 'concluido'].includes(s.status)).length;
  const taxaAprovacao = totalFinalizados > 0 ? Math.round((aprovados / totalFinalizados) * 100) : 0;
  
  const lucroMedio = services.length > 0 
    ? Math.round(services.reduce((acc, s) => acc + (s.margem || 0), 0) / services.length) 
    : 0;

  const stats = [
    { label: 'Faturamento do mês', value: `R$ ${faturamentoMes.toLocaleString('pt-BR')}`, change: '+0%', up: true, icon: DollarSign, color: 'text-amber' },
    { label: 'Propostas abertas', value: propostasAbertas.toString(), change: '0', up: true, icon: FileText, color: 'text-electric' },
    { label: 'Taxa de aprovação', value: `${taxaAprovacao}%`, change: '0%', up: true, icon: CheckCircle, color: 'text-success' },
    { label: 'Lucro médio', value: `${lucroMedio}%`, change: '0%', up: true, icon: TrendingUp, color: 'text-electric' },
  ];

  // Dados do Gráfico (Simulados por mês baseado nos serviços reais)
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const last6Months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const m = d.getMonth();
    const total = services
      .filter(s => new Date(s.criadoEm).getMonth() === m)
      .reduce((acc, s) => acc + (s.totalFinal || 0), 0);
    last6Months.push({ label: months[m], value: total });
  }

  const maxVal = Math.max(...last6Months.map(m => m.value), 1000);

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-10 animate-fade-up">
      <div className="mb-10">
        <h1 className="font-montserrat font-extrabold text-3xl tracking-tight mb-1">
          Olá, {profile.nome}! 👋
        </h1>
        <p className="text-t-2 text-sm">
          {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())}
        </p>
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
            {last6Months.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full flex flex-col justify-end h-full">
                  <div 
                    className="w-full bg-gradient-to-t from-amber-hover to-amber rounded-t-md transition-all duration-700 group-hover:shadow-amber-glow"
                    style={{ height: `${(m.value / maxVal) * 100}%`, minHeight: m.value > 0 ? '4px' : '0px' }}
                  />
                </div>
                <span className="text-[11px] font-bold text-t-2 uppercase tracking-widest">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface border border-rim rounded-r-xl p-8">
          <h3 className="font-montserrat font-bold text-lg mb-8">Atividade Recente</h3>
          <div className="space-y-6">
            {services.slice(0, 4).length > 0 ? services.slice(0, 4).map((svc, i) => {
              const client = clients.find(c => c.id === svc.clienteId);
              return (
                <div key={i} className="flex items-start gap-4 group">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    svc.status === 'concluido' ? 'bg-success' : 
                    svc.status === 'aprovado' ? 'bg-electric' : 
                    'bg-amber'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium text-t-1 truncate group-hover:text-amber transition-colors">
                      {svc.tipoServico} — {client?.nome || 'Cliente'}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-t-2 font-semibold uppercase tracking-wider mt-1">
                      <Clock className="w-3 h-3" />
                      {new Date(svc.criadoEm).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              );
            }) : (
              <p className="text-t-3 text-sm italic">Nenhuma atividade recente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;