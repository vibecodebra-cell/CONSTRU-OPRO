import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

const UrgencyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 animate-pulse">
        <Flame className="w-4 h-4 shrink-0 text-black" />
        <span className="text-[13px] font-black tracking-tight text-black">
          PLANO ANUAL R$250 — OFERTA TERMINA EM:
        </span>
      </div>
      <span className="bg-black text-amber px-2 py-0.5 rounded font-mono text-sm shadow-lg border border-black/20 animate-[pulse_1s_infinite]">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default UrgencyTimer;
