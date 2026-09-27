import React, { useState } from 'react';
import { PEACE_ANCHOR_PLAN } from '../data/anchors';
import { Compass, CheckCircle2, Lock, Sparkles, ChevronRight, ShieldCheck } from 'lucide-react';

interface PeacePlanViewProps {
  onOpenPlanDetails?: () => void;
}

export const PeacePlanView: React.FC<PeacePlanViewProps> = ({ onOpenPlanDetails }) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const currentPlan = PEACE_ANCHOR_PLAN.find((p) => p.dayNumber === selectedDay) || PEACE_ANCHOR_PLAN[0];

  const weeks = [
    { number: 1, label: 'Semana 1', range: 'Días 1 - 7', desc: 'Soberanía y Desarme del Miedo', isFree: true },
    { number: 2, label: 'Semana 2', range: 'Días 8 - 14', desc: 'Gracia Radical contra la Culpa', isFree: false },
    { number: 3, label: 'Semana 3', range: 'Días 15 - 21', desc: 'Renovación de la Mente y Biología', isFree: false },
    { number: 4, label: 'Semana 4', range: 'Días 22 - 28', desc: 'Resiliencia y Sanidad Interior', isFree: false },
    { number: 5, label: 'Cierre', range: 'Días 29 - 30', desc: 'Consolidación de Hábito Perpetuo', isFree: false },
  ];

  const filteredDays = PEACE_ANCHOR_PLAN.filter((d) => d.weekNumber === activeWeekTab);

  return (
    <div className="w-full bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 space-y-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#263330] gap-2">
        <div className="flex items-center gap-2 text-[#A6B0AC]">
          <Compass className="w-4 h-4 text-[#2A6F68]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase">
            Ruta Mensual: Ancla de Paz en 30 Días
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded-[4px] bg-[#1B322F] text-[#3D7D68] border border-[#2A6F68]/30">
            Días 1 a 7 Gratis
          </span>
          <span className="text-[12px] text-[#A6B0AC] tabular-nums">
            Día {selectedDay} de 30
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-editorial text-[22px] sm:text-[24px] text-[#E8EBE9] mb-1">
          Programa completo de 30 días para estabilizar el alma
        </h3>
        <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
          Un itinerario mes a mes para transformar la rumiación nocturna en un ancla de descanso inquebrantable. Comienza hoy con la primera semana libre y accede al programa mensual completo con el plan de apoyo.
        </p>
      </div>

      {/* Tabs por Semana (1 a 5) */}
      <div className="space-y-3">
        <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6E7A75] block">
          Estructura del mes (30 Días):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {weeks.map((w) => {
            const isSelected = activeWeekTab === w.number;
            return (
              <button
                key={w.number}
                type="button"
                onClick={() => {
                  setActiveWeekTab(w.number);
                  const firstDayOfWeek = PEACE_ANCHOR_PLAN.find((d) => d.weekNumber === w.number);
                  if (firstDayOfWeek) setSelectedDay(firstDayOfWeek.dayNumber);
                }}
                className={`min-h-[58px] p-2.5 rounded-[6px] text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1B322F] border-[#2A6F68] text-[#E8EBE9]'
                    : 'bg-[#121A18] border-[#263330] text-[#A6B0AC] hover:text-[#E8EBE9]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium tracking-wider uppercase text-[#E8EBE9]">
                    {w.label}
                  </span>
                  {w.isFree ? (
                    <span className="text-[9px] uppercase px-1 rounded bg-[#3D7D68]/20 text-[#3D7D68]">
                      Gratis
                    </span>
                  ) : (
                    <Lock className="w-3 h-3 text-[#A6B0AC]" strokeWidth={1.5} />
                  )}
                </div>
                <span className="text-[11px] text-[#6E7A75] tabular-nums truncate">
                  {w.range}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selector de días de la semana activa */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] text-[#A6B0AC]">
            Selecciona el día a meditar:
          </span>
          <span className="text-[11px] text-[#6E7A75] italic">
            {weeks.find((w) => w.number === activeWeekTab)?.desc}
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {filteredDays.map((day) => {
            const isSelected = day.dayNumber === selectedDay;
            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`min-h-[44px] min-w-[80px] px-3 py-2 rounded-[6px] text-center border transition-all shrink-0 ${
                  isSelected
                    ? 'bg-[#1B322F] border-[#2A6F68] text-[#E8EBE9]'
                    : 'bg-[#121A18] border-[#263330] text-[#A6B0AC] hover:text-[#E8EBE9]'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#6E7A75]">
                    Día {day.dayNumber}
                  </span>
                  {!day.isFreePreview && (
                    <Lock className="w-2.5 h-2.5 text-[#C99757]" strokeWidth={1.5} />
                  )}
                </div>
                <span className="block text-[12px] font-medium truncate max-w-[84px]">
                  {day.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido del día seleccionado con Metodología de 3 Pasos */}
      <div className="bg-[#121A18] border border-[#263330] rounded-[8px] p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#263330]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#3D7D68]">
                Día {currentPlan.dayNumber} de 30 — {currentPlan.theme}
              </span>
              {currentPlan.isFreePreview ? (
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#3D7D68]/20 text-[#3D7D68] font-medium">
                  Acceso Gratuito
                </span>
              ) : (
                <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-[#C99757]/20 text-[#C99757] font-medium flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Plan Mensual
                </span>
              )}
            </div>
            <h4 className="font-editorial text-[20px] text-[#E8EBE9]">
              {currentPlan.title}
            </h4>
          </div>
          <span className="text-[12px] font-medium text-[#2A6F68] bg-[#161F1E] px-2.5 py-1 rounded-[4px] border border-[#263330]">
            {currentPlan.scriptureRef}
          </span>
        </div>

        {/* Versículo */}
        <blockquote className="font-editorial text-[17px] text-[#E8EBE9] italic border-l-2 border-[#2A6F68] pl-3 py-1">
          «{currentPlan.verse}»
        </blockquote>

        {/* Metodología de 3 Pasos */}
        <div className="space-y-3 pt-2">
          {/* Paso 1: El Principio Bíblico */}
          <div className="p-3.5 rounded-[6px] bg-[#161F1E] border border-[#263330]">
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-1">
              1. El Principio Bíblico (Verdad inmutable)
            </span>
            <p className="font-editorial text-[14px] text-[#E8EBE9] leading-relaxed">
              {currentPlan.principle}
            </p>
          </div>

          {/* Paso 2: Renovando la Mente */}
          <div className="p-3.5 rounded-[6px] bg-[#161F1E] border border-[#263330]">
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#C99757] block mb-1">
              2. Renovando la Mente (Desarmar distorsión cognitiva)
            </span>
            <p className="font-editorial text-[14px] text-[#A6B0AC] leading-relaxed">
              {currentPlan.renewal}
            </p>
          </div>

          {/* Paso 3: Echando Anclas */}
          <div className="p-3.5 rounded-[6px] bg-[#161F1E] border border-[#263330]">
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#3D7D68] block mb-1">
              3. Echando Anclas (Ejercicio de la jornada)
            </span>
            <p className="font-editorial text-[14px] text-[#E8EBE9] leading-relaxed">
              {currentPlan.anchorAction}
            </p>
          </div>
        </div>

        {/* Banner si el día corresponde a la suscripción mensual */}
        {!currentPlan.isFreePreview && (
          <div className="p-4 rounded-[6px] bg-[#1B322F]/40 border border-[#2A6F68] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
            <div className="space-y-1">
              <span className="text-[12px] font-medium text-[#E8EBE9] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#3D7D68]" strokeWidth={1.5} />
                <span>Sesión incluida en el plan mensual (30 días de acompañamiento)</span>
              </span>
              <p className="text-[12px] text-[#A6B0AC]">
                Suscripción voluntaria de 4.99 USD/mes para habilitar las 4 semanas completas del programa y todas las vigilias.
              </p>
            </div>
            {onOpenPlanDetails && (
              <button
                type="button"
                onClick={onOpenPlanDetails}
                className="min-h-[40px] px-3.5 py-1.5 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] text-white text-[12px] font-medium shrink-0 transition-colors"
              >
                Ver suscripción 4.99 USD
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
