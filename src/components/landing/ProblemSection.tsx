import React from 'react';
import { AlertCircle, Clock, TrendingDown, FileX } from 'lucide-react';

const ProblemSection = () => {
  const pains = [
    { icon: TrendingDown, text: "Orçamento no 'olhômetro' que sempre acaba dando prejuízo no final da obra." },
    { icon: AlertCircle, text: "Esquecer de cobrar aquele material 'pequeno' que, no fim, come todo o seu lucro." },
    { icon: FileX, text: "Perder serviço para a concorrência porque sua proposta parece amadora e sem confiança." },
    { icon: Clock, text: "Passar a noite em claro fazendo conta no papel em vez de descansar com a família." },
  ];

  return (
    <section className="py-20 bg-ink-secondary border-y border-rim">
      <div className="max-w-[1180px] mx-auto px-6">
        <div className="max-w-[700px] mb-12">
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl tracking-tight mb-6">
            Cansado de trabalhar o mês todo e <em className="text-danger not-italic">não ver a cor do dinheiro?</em>
          </h2>
          <p className="text-t-2 text-lg leading-relaxed">
            Você trabalha duro, debaixo de sol e poeira, mas na hora de fechar a conta parece que o lucro sumiu. 
            Fazer orçamento de cabeça ou no papel de pão é o caminho mais rápido para o prejuízo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pains.map((pain, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-ink-tertiary border border-rim rounded-r-lg">
              <div className="p-2 bg-danger/10 rounded-lg">
                <pain.icon className="w-6 h-6 text-danger" />
              </div>
              <p className="text-t-1 font-medium leading-relaxed">{pain.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-amber font-montserrat font-bold text-xl">
            Chega de chutar valores. É hora de profissionalizar seu serviço.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;