import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "Não entendo nada de tecnologia, vou conseguir usar?",
      a: "Se você sabe mandar mensagem no WhatsApp, você sabe usar o Construtor Pro. Criamos tudo para ser simples, direto e sem frescura."
    },
    {
      q: "Será que funciona para o meu tipo de serviço?",
      a: "Sim! Temos módulos específicos para pedreiros (alvenaria/piso), eletricistas e encanadores, com cálculos baseados na realidade da obra."
    },
    {
      q: "É caro demais?",
      a: "Custa menos que um café por dia. Um único erro de cálculo que você evita ou um novo cliente que você fecha já paga o ano inteiro do app."
    },
    {
      q: "Já faço orçamento no papel e funciona, por que mudar?",
      a: "O papel não calcula sua margem de lucro real nem gera um PDF profissional que passa confiança. Quem se profissionaliza, cobra mais caro e o cliente paga rindo."
    },
    {
      q: "Tenho medo de errar os cálculos mesmo com o app.",
      a: "Nossos cálculos seguem as normas técnicas. Você só coloca a área ou a quantidade e o app faz a parte difícil por você."
    }
  ];

  return (
    <section className="py-20 bg-ink-secondary">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="font-montserrat font-extrabold text-3xl tracking-tight mb-12 text-center">
          Dúvidas <em className="text-amber not-italic">Frequentes</em>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-rim rounded-r-lg overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left bg-surface hover:bg-rim/20 transition-colors"
              >
                <span className="font-bold text-t-1">{faq.q}</span>
                {openIndex === i ? <ChevronUp className="w-5 h-5 text-amber" /> : <ChevronDown className="w-5 h-5 text-t-3" />}
              </button>
              {openIndex === i && (
                <div className="p-5 bg-ink-tertiary text-t-2 leading-relaxed border-t border-rim">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;