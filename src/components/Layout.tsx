import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Wrench, FileText, Plus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Início', icon: Home },
    { path: '/tools', label: 'Ferramentas', icon: Wrench },
    { path: '/proposals', label: 'Propostas', icon: FileText },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="glass-topbar h-18 px-6 flex items-center gap-4">
        <div className="bg-amber p-2 rounded-lg shadow-amber-glow">
          <Plus className="w-5 h-5 text-black" strokeWidth={3} />
        </div>
        <span className="font-montserrat font-extrabold text-xl tracking-tight">
          CONSTRUTOR <em className="text-amber not-italic">PRO</em>
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase text-amber bg-amber/10 border border-amber/25 rounded-full px-2.5 py-1">
          Beta
        </span>
        
        <nav className="ml-auto flex gap-1" role="navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-r-md text-[13.5px] font-semibold transition-all",
                  isActive 
                    ? "text-black bg-amber shadow-amber-glow" 
                    : "text-t-2 hover:text-t-1 hover:bg-ink-tertiary"
                )}
              >
                <item.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;