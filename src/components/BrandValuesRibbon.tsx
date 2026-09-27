import React from 'react';
import { Sparkles, Shield, Compass, Heart, Activity, Brain } from 'lucide-react';

export const BrandValuesRibbon: React.FC = () => {
  const pillars = [
    {
      icon: Activity,
      title: '1. Fisiología Sana',
      subtitle: 'Respiración & sueño',
      color: '#10B981',
    },
    {
      icon: Brain,
      title: '2. Mente Renovada',
      subtitle: 'Cero rumiación',
      color: '#F59E0B',
    },
    {
      icon: Heart,
      title: '3. Gracia sin Culpa',
      subtitle: 'Amor incondicional',
      color: '#0D9488',
    },
    {
      icon: Compass,
      title: '4. Propósito Claro',
      subtitle: 'Dirección de Dios',
      color: '#818CF8',
    },
    {
      icon: Shield,
      title: '5. Refugio Seguro',
      subtitle: '100% Confidencial',
      color: '#F59E0B',
    },
    {
      icon: Sparkles,
      title: '6. Método Práctico',
      subtitle: 'Fe y hábitos diarios',
      color: '#10B981',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#060F1E] via-[#0B1E36] to-[#060F1E] text-white rounded-[18px] p-4 sm:p-7 shadow-xl border border-[#F59E0B]/30 overflow-hidden">
      <div className="text-center mb-6">
        <span className="text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.16em] sm:tracking-[0.2em] text-[#FBBF24] block mb-1">
          Ecosistema Digital Tu Poder Mental™
        </span>
        <h3 className="font-editorial text-[18px] sm:text-[23px] text-white font-normal leading-snug">
          La Arquitectura de tu Bienestar: Cuerpo • Mente • Alma • Propósito
        </h3>
        <p className="text-[13px] text-[#CBD5E1] max-w-[540px] mx-auto mt-1">
          Un mapa estructurado para pasar de la saturación mental al orden pacífico que Dios diseñó para ti.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-[#081729] border border-[#1E3A5F] rounded-[12px] p-3 text-center flex flex-col items-center justify-center hover:border-[#F59E0B]/80 transition-all hover:scale-[1.02]"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-xs"
                style={{ backgroundColor: `${item.color}25`, color: item.color }}
              >
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>
              <span className="text-[12px] font-bold text-white leading-tight block">
                {item.title}
              </span>
              <span className="text-[10.5px] text-[#94A3B8] leading-tight block mt-0.5">
                {item.subtitle}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
