import React, { useState } from 'react';
import { PEACE_ANCHOR_PLAN } from '../data/anchors';
import { Compass, CheckCircle2, Lock, Sparkles, ChevronRight, ShieldCheck, Heart, Activity, Brain } from 'lucide-react';

interface PeacePlanViewProps {
  onOpenPlanDetails?: () => void;
}

export const PeacePlanView: React.FC<PeacePlanViewProps> = ({ onOpenPlanDetails }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const currentPlan = PEACE_ANCHOR_PLAN.find((p) => p.dayNumber === selectedDay) || PEACE_ANCHOR_PLAN[0];

  const weeks = [
    { number: 1, label: 'Semana 1', range: 'Días 1 - 7', desc: 'Soberanía y Desarme del Miedo', isFree: true, quadrant: 'Cuerpo & Mente' },
    { number: 2, label: 'Semana 2', range: 'Días 8 - 14', desc: 'Gracia Radical contra la Culpa', isFree: false, quadrant: 'Alma' },
    { number: 3, label: 'Semana 3', range: 'Días 15 - 21', desc: 'Renovación de la Mente y Biología', isFree: false, quadrant: 'Mente & Fisiología' },
    { number: 4, label: 'Semana 4', range: 'Días 22 - 28', desc: 'Resiliencia y Sanidad Interior', isFree: false, quadrant: 'Alma & Sanidad' },
    { number: 5, label: 'Cierre', range: 'Días 29 - 30', desc: 'Consolidación de Hábito Perpetuo', isFree: false, quadrant: 'Propósito en Dios' },
  ];

  const filteredDays = PEACE_ANCHOR_PLAN.filter((d) => d.weekNumber === activeWeekTab);

  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[20px] p-6 sm:p-9 space-y-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-2">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <Compass className="w-5 h-5 text-[#F59E0B]" strokeWidth={2.5} />
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase">
            Ruta de 30 Días: El Mapa de Transformación en Dios
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
            Días 1 a 7 Gratis
          </span>
          <span className="text-[12px] text-[#64748B] tabular-nums font-semibold">
            Día {selectedDay} de 30
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-[24px] sm:text-[27px] text-[#0B1E36] font-normal mb-1">
          El itinerario de 30 días para ordenar tu vida con Dios
        </h3>
        <p className="text-[14px] text-[#475569] leading-relaxed">
          Diseñado para hombres y mujeres que buscan transformar la sobrecarga mental en un hábito sólido de paz, salud y alineación espiritual. Comienza hoy con la primera semana libre y desbloquea el proceso completo de 30 días con nuestros mentores <strong>Clara Luz y Leo por un único valor de 12.99 Dólares</strong>. <em>Por el momento no existirá una membresía, es un único pago.</em>
        </p>
      </div>

      {/* Selector de Semanas (Tabs de 30 Días) */}
      <div className="flex flex-wrap gap-2 pb-2">
        {weeks.map((w) => {
          const isActive = activeWeekTab === w.number;
          return (
            <button
              key={w.number}
              type="button"
              onClick={() => {
                setActiveWeekTab(w.number);
                const firstDayOfWeek = PEACE_ANCHOR_PLAN.find((d) => d.weekNumber === w.number);
                if (firstDayOfWeek) setSelectedDay(firstDayOfWeek.dayNumber);
              }}
              className={`px-3.5 py-2.5 rounded-[12px] text-left transition-all border cursor-pointer ${
                isActive
                  ? 'bg-[#060F1E] text-white border-[#060F1E] shadow-sm'
                  : 'bg-[#F8FAFC] text-[#334155] border-[#CBD5E1] hover:bg-[#FEF3C7]/40'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[12.5px] font-bold">{w.label}</span>
                {!w.isFree && <Lock className="w-3 h-3 text-[#F59E0B]" />}
              </div>
              <span className={`text-[10px] font-medium block ${isActive ? 'text-[#FBBF24]' : 'text-[#64748B]'}`}>
                {w.range} • {w.quadrant}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de días de la semana activa */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {filteredDays.map((day) => {
          const isSelected = selectedDay === day.dayNumber;
          const isFree = day.isFreePreview !== false;

          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`p-3 rounded-[12px] text-center transition-all border flex flex-col items-center justify-between min-h-[82px] cursor-pointer ${
                isSelected
                  ? 'bg-[#FEF3C7]/60 border-[#F59E0B] ring-2 ring-[#F59E0B]/30 shadow-xs'
                  : 'bg-white border-[#CBD5E1] hover:bg-[#F8FAFC]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11.5px] font-bold text-[#0B1E36]">Día {day.dayNumber}</span>
                {!isFree && <Lock className="w-3 h-3 text-[#D97706]" />}
              </div>
              <span className="text-[10.5px] text-[#475569] line-clamp-2 text-left w-full mt-1 leading-snug">
                {day.theme}
              </span>
              {isSelected && <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Card del Día Seleccionado */}
      <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-[16px] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
              {currentPlan.theme} • Día {currentPlan.dayNumber} de 30
            </span>
            <h4 className="font-serif text-[20px] sm:text-[22px] text-[#0B1E36] font-normal mt-0.5">
              {currentPlan.title}
            </h4>
          </div>
          {currentPlan.isFreePreview ? (
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#ECFDF5] text-[#059669] font-bold border border-[#A7F3D0] self-start sm:self-center">
              Acceso Gratuito
            </span>
          ) : (
            <span className="text-[11px] px-3 py-1 rounded-full bg-[#FEF3C7] text-[#92400E] font-bold border border-[#FDE68A] self-start sm:self-center flex items-center gap-1">
              <Lock className="w-3 h-3" /> Proceso 30 Días (12.99 USD)
            </span>
          )}
        </div>

        {/* Si el día es de pago y el usuario no está suscrito, se muestra preview enriquecido */}
        {!currentPlan.isFreePreview && (
          <div className="p-4 rounded-[14px] bg-[#FFFBEB] border border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
              <div className="text-[13px] text-[#78350F]">
                <strong>Proceso de 30 Días con Clara Luz y Leo:</strong> Este día forma parte del itinerario guiado por nuestros mentores de Fe y Esperanza. Accede a los 30 días por un <strong>único valor de 12.99 Dólares</strong> (sin membresía ni pagos recurrentes).
              </div>
            </div>
            {onOpenPlanDetails && (
              <button
                type="button"
                onClick={onOpenPlanDetails}
                className="px-4 py-2 rounded-[10px] bg-[#060F1E] text-white text-[12.5px] font-bold shrink-0 hover:bg-[#0B1E36] transition-colors cursor-pointer border border-[#F59E0B]/30"
              >
                Desbloquear 30 Días (12.99 USD)
              </button>
            )}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-[12px] bg-white border border-[#E2E8F0]">
            <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block mb-1">
              Principio de Verdad
            </span>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {currentPlan.principle}
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-white border border-[#E2E8F0]">
            <span className="text-[11px] font-bold text-[#0B1E36] uppercase tracking-wider block mb-1">
              Renovación de la Mente ({currentPlan.scriptureRef})
            </span>
            <p className="font-serif text-[15px] italic text-[#0B1E36] leading-relaxed">
              «{currentPlan.verse}»
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#ECFDF5] border border-[#A7F3D0]">
            <span className="text-[11px] font-bold text-[#059669] uppercase tracking-wider block mb-1">
              Acción Práctica de Anclaje
            </span>
            <p className="text-[13.5px] text-[#065F46] leading-relaxed">
              {currentPlan.anchorAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
