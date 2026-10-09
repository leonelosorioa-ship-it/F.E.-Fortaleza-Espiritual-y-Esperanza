import React, { useState } from 'react';
import { X, Check, Lock, Compass, ExternalLink, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { PROGRAM_30_DAYS } from '../data/faithTechData';

interface FaithPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMentor: 'clara_luz' | 'leo';
  onSelectMentor: (mentor: 'clara_luz' | 'leo') => void;
}

export const FaithPlanModal: React.FC<FaithPlanModalProps> = ({
  isOpen,
  onClose,
  selectedMentor,
  onSelectMentor,
}) => {
  const [filter, setFilter] = useState<'todos' | 'libres' | 'premium'>('todos');

  if (!isOpen) return null;

  const filteredDays = PROGRAM_30_DAYS.filter((d) => {
    if (filter === 'libres') return d.isUnlocked;
    if (filter === 'premium') return !d.isUnlocked;
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-modal-title"
    >
      <div className="relative w-full max-w-[680px] bg-[#1E293B] border border-[#334155] rounded-[16px] p-5 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto text-[#F8FAFC]">
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-[#334155]">
          <div>
            <div className="flex items-center gap-1.5 text-[#0D9488] mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-[10.5px] font-bold tracking-wider uppercase">
                Programa Guiado • 30 Días
              </span>
            </div>
            <h2 id="plan-modal-title" className="font-editorial text-[20px] sm:text-[23px] text-[#F8FAFC] font-normal leading-snug">
              Fortaleza Espiritual y Renovación Mental
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] text-[#94A3B8] hover:text-[#F8FAFC] rounded-[8px] hover:bg-[#334155] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar detalles del plan"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Modelo Freemium transparente */}
        <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] flex items-start gap-3">
          <Heart className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
          <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">
            <strong className="text-[#F8FAFC]">Principio de Gracia:</strong> Los primeros 7 días del programa son 100% gratuitos y accesibles localmente para que experimentes alivio inmediato en tu sistema nervioso. Los días 8 al 30 se desbloquean con un pago único y honesto de USD 7.99 o $29.900 COL para el sostenimiento del ecosistema.
          </p>
        </div>

        {/* Selector de Mentores */}
        <div className="space-y-2">
          <span className="text-[11.5px] font-bold uppercase tracking-wider text-[#94A3B8] block">
            Selecciona tu guía para el itinerario:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onSelectMentor('clara_luz')}
              className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer ${
                selectedMentor === 'clara_luz'
                  ? 'bg-[#0F172A] border-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'bg-[#0F172A]/60 border-[#334155] hover:border-[#94A3B8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-[#F8FAFC]">Clara Luz</span>
                <span className="text-[10.5px] text-[#0D9488] font-medium bg-[#0D9488]/15 px-2 py-0.5 rounded-[4px]">Sosiego</span>
              </div>
              <p className="text-[11.5px] text-[#94A3B8] mt-1">
                Ternura pastoral, alivio de la culpa religiosa y calma nocturna.
              </p>
            </button>

            <button
              type="button"
              onClick={() => onSelectMentor('leo')}
              className={`p-3 rounded-[8px] border text-left transition-all cursor-pointer ${
                selectedMentor === 'leo'
                  ? 'bg-[#0F172A] border-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'bg-[#0F172A]/60 border-[#334155] hover:border-[#94A3B8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[13.5px] font-semibold text-[#F8FAFC]">Leo</span>
                <span className="text-[10.5px] text-[#0D9488] font-medium bg-[#0D9488]/15 px-2 py-0.5 rounded-[4px]">Fortaleza</span>
              </div>
              <p className="text-[11.5px] text-[#94A3B8] mt-1">
                Firmeza interior, resiliencia y superación del desánimo.
              </p>
            </button>
          </div>
        </div>

        {/* Filtro de días */}
        <div className="flex items-center gap-2 pt-1 border-t border-[#334155]">
          <span className="text-[11px] text-[#94A3B8] uppercase tracking-wider font-semibold">Mostrar:</span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setFilter('todos')}
              className={`px-2.5 py-1 rounded-[6px] text-[11.5px] font-medium transition-colors ${
                filter === 'todos' ? 'bg-[#0D9488] text-[#F8FAFC]' : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Todos (30)
            </button>
            <button
              type="button"
              onClick={() => setFilter('libres')}
              className={`px-2.5 py-1 rounded-[6px] text-[11.5px] font-medium transition-colors ${
                filter === 'libres' ? 'bg-[#10B981] text-[#0F172A]' : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Gratis (Días 1-7)
            </button>
            <button
              type="button"
              onClick={() => setFilter('premium')}
              className={`px-2.5 py-1 rounded-[6px] text-[11.5px] font-medium transition-colors ${
                filter === 'premium' ? 'bg-[#F59E0B] text-[#0F172A]' : 'bg-[#0F172A] text-[#94A3B8] hover:text-[#F8FAFC]'
              }`}
            >
              Premium (Días 8-30)
            </button>
          </div>
        </div>

        {/* Lista completa de los 30 Días */}
        <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
          {filteredDays.map((day) => (
            <div
              key={day.dayNumber}
              className="p-3 rounded-[8px] bg-[#0F172A] border border-[#334155] flex items-center justify-between gap-3 text-[12.5px]"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold ${day.isUnlocked ? 'text-[#10B981]' : 'text-[#F59E0B]'}`}>
                    Día {day.dayNumber}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">
                    • Guía: {day.mentor === 'clara_luz' ? 'Clara Luz' : 'Leo'}
                  </span>
                </div>
                <span className="text-[#F8FAFC] font-medium block">{day.title}</span>
                <span className="text-[11px] text-[#94A3B8] block">{day.subtitle}</span>
              </div>

              <div className="shrink-0">
                {day.isUnlocked ? (
                  <span className="text-[10.5px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-[4px] border border-[#10B981]/30">
                    Gratis
                  </span>
                ) : (
                  <span className="text-[10.5px] font-semibold text-[#F59E0B] bg-[#F59E0B]/15 px-2 py-0.5 rounded-[4px] border border-[#F59E0B]/30 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    <span>Bloqueado</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Componente seguro de pago único (USD 7.99 o $29.900 COL) */}
        <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#0D9488]/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                Pase Completo Guiado
              </span>
              <h3 className="text-[15px] font-semibold text-[#F8FAFC]">
                Acceso Vitalicio Días 8 al 30 (USD 7.99 • $29.900 COL)
              </h3>
            </div>
            <a
              href="https://buy.stripe.com/test_fe_esperanza_30dias"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-[#F8FAFC] text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Desbloquear en Stripe</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-[#94A3B8]">
            <span className="flex items-center gap-1 text-[#10B981]">
              <ShieldCheck className="w-3.5 h-3.5" />
              Checkout cifrado SSL
            </span>
            <span>•</span>
            <span>Pago único sin renovación automática</span>
          </div>
        </div>
      </div>
    </div>
  );
};
