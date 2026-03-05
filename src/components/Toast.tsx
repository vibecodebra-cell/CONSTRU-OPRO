import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3200);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      role="status" 
      aria-live="polite"
      className="fixed bottom-8 right-8 z-[1000] bg-surface-secondary border border-success rounded-r-md px-5 py-4 flex items-center gap-3 shadow-pop animate-in slide-in-from-bottom-10 fade-in duration-350"
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-3 h-3 bg-success rounded-full animate-ping opacity-75" />
        <CheckCircle2 className="w-5 h-5 text-success relative z-10" />
      </div>
      <span className="text-t-1 font-medium text-sm">{message}</span>
    </div>
  );
};

export default Toast;