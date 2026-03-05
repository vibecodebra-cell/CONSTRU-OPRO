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
      <header className="glass-topbar h-16 px-6 flex items-center gap-3">
        <div className="bg-amber p-1.5 rounded-lg">
          <Plus className="w-5 h-5 text-black" strokeWidth={3} />
        </div>
        <span className="font-montserrat font-extrabold text-xl tracking-tight">
          CONSTRUTOR <em className="text-amber not-italic">PRO</em>
        </span>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-amber bg-amber/10 border border-amber/25 rounded-full px-2 py-0.5">
          Beta
        </span>
        
        <nav className="ml-auto flex gap-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-1.5 rounded-r-md text-[13.5px] font-medium transition-colors",
                  isActive 
                    ? "text-amber bg-amber/10" 
                    : "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-ink-tertiary"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
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