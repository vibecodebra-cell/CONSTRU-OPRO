import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      name: "Seu Jorge",
      role: "Pedreiro - São Paulo/SP",
      text: "Antes eu perdia dinheiro esquecendo material. Agora o cliente paga o preço justo e ainda me elogia pela proposta bonita em PDF. Mudou meu jogo.",
    },
    {
      name: "Ricardo",
      role: "Eletricista - Rio de Janeiro/RJ",
      text: "O app faz o cálculo de disjuntor e fios sozinho. Ganhei tempo e parei de levar calote por orçamento mal feito. Recomendo demais!",
    },
    {
      name: "Marcelo",
      role: "Encanador - Belo Horizonte/MG",
      text: "Fechei 3 obras seguidas só porque a proposta foi profissional. O cliente sente confiança quando vê tudo detalhado. Vale cada centavo.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[1180px] mx-auto px-6">
        <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl tracking-tight mb-12 text-center">
          Quem usa, <em className="text-amber not-italic">não volta pro papel</em>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-surface border border-rim rounded-r-xl p-8 relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-rim opacity-50" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber text-amber" />)}
              </div>
              <p className="text-t-1 italic mb-6 leading-relaxed">"{review.text}"</p>
              <div>
                <div className="font-bold text-t-1">{review.name}</div>
                <div className="text-xs text-t-2 uppercase tracking-widest font-semibold">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;