import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Users, History, Settings, Hammer } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clients', label: 'Clientes', icon: Users },
    { path: '/proposals', label: 'Histórico', icon: History },
    { path: '/settings', label: 'Config', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-topbar h-18 px-6 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3 mr-8 hover:opacity-80 transition-opacity">
          <div className="bg-amber p-2 rounded-lg shadow-amber-glow">
            <Hammer className="w-5 h-5 text-black" strokeWidth={3} />
          </div>
          <span className="font-montserrat font-extrabold text-xl tracking-tighter hidden sm:inline">
            CONSTRUTOR <em className="text-amber not-italic">PRO</em>
          </span>
        </Link>

        <nav className="flex gap-1" role="navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-r-md text-[13px] font-bold uppercase tracking-wider transition-all",
                  isActive 
                    ? "text-black bg-amber shadow-amber-glow" 
                    : "text-t-2 hover:text-t-1 hover:bg-ink-tertiary"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <button 
            onClick={() => navigate('/new')}
            className="hidden sm:flex items-center gap-2 bg-amber text-black font-montserrat font-extrabold text-[11px] uppercase tracking-widest px-5 py-2.5 rounded-r-md transition-all hover:bg-amber-hover hover:-translate-y-0.5 shadow-amber-glow"
          >
            <PlusCircle className="w-4 h-4" /> Novo Serviço
          </button>
          <div className="w-9 h-9 rounded-full bg-rim-secondary flex items-center justify-center font-bold text-t-1 border border-rim">
            P
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 w-full bg-ink-secondary border-t border-rim px-6 py-3 flex justify-between items-center z-[300]">
        {navItems.map((item) => (
          <Link key={item.path} to={item.path} className={cn("p-2", location.pathname === item.path ? "text-amber" : "text-t-2")}>
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
        <Link to="/new" className="bg-amber p-3 rounded-full -mt-12 shadow-amber-glow text-black">
          <PlusCircle className="w-7 h-7" />
        </Link>
      </nav>
    </div>
  );
};

export default Layout;