import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Hammer, PlusCircle, LayoutDashboard, Users, History, Settings } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { path: string; label: string; icon: any }[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] sm:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-ink border-r border-rim p-6 shadow-pop animate-in slide-in-from-left duration-300 flex flex-col">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-amber p-2 rounded-lg">
              <Hammer className="w-5 h-5 text-black" strokeWidth={3} />
            </div>
            <span className="font-montserrat font-extrabold text-lg tracking-tighter">
              CONSTRUTOR <em className="text-amber not-italic">PRO</em>
            </span>
          </div>
          <button onClick={onClose} className="p-2 text-t-2 hover:text-t-1">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-4 px-4 py-4 rounded-r-md text-[14px] font-bold uppercase tracking-wider transition-all",
                  isActive 
                    ? "text-black bg-amber shadow-amber-glow" 
                    : "text-t-2 hover:text-t-1 hover:bg-ink-tertiary"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-6 border-t border-rim">
          <Link 
            to="/new" 
            onClick={onClose}
            className="flex items-center justify-center gap-3 bg-amber text-black font-montserrat font-extrabold text-[12px] uppercase tracking-widest py-4 rounded-r-md shadow-amber-glow"
          >
            <PlusCircle className="w-5 h-5" /> Novo Serviço
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;