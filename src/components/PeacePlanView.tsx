import React, { useState } from 'react';
import { PEACE_ANCHOR_PLAN } from '../data/anchors';
import { Compass, Lock, Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { GraceStreakTracker } from './GraceStreakTracker';

interface PeacePlanViewProps {
  onOpenPlanDetails?: () => void;
  onOpenDay7Paywall?: () => void;
}

export const PeacePlanView: React.FC<PeacePlanViewProps> = ({
  onOpenPlanDetails,
  onOpenDay7Paywall,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2]);

  const currentPlan = PEACE_ANCHOR_PLAN.find((p) => p.dayNumber === selectedDay) || PEACE_ANCHOR_PLAN[0];

  const weeks = [
    { number: 1, label: 'Semana 1', range: 'Días 1 - 7', desc: 'Soberanía y Desarme del Miedo', isFree: true, quadrant: 'Cuerpo & Mente' },
    { number: 2, label: 'Semana 2', range: 'Días 8 - 14', desc: 'Gracia Radical contra la Culpa', isFree: false, quadrant: 'Alma' },
    { number: 3, label: 'Semana 3', range: 'Días 15 - 21', desc: 'Renovación de la Mente y Biología', isFree: false, quadrant: 'Mente & Fisiología' },
    { number: 4, label: 'Semana 4', range: 'Días 22 - 28', desc: 'Resiliencia y Sanidad Interior', isFree: false, quadrant: 'Alma & Sanidad' },
    { number: 5, label: 'Cierre', range: 'Días 29 - 30', desc: 'Consolidación de Hábito Perpetuo', isFree: false, quadrant: 'Propósito en Dios' },
  ];

  const filteredDays = PEACE_ANCHOR_PLAN.filter((d) => d.weekNumber === activeWeekTab);

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  return (
    <div className="w-full max-w-[720px] mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
            <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Ruta 30 Días: El Mapa de Transformación en Dios
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
              Días 1 a 7 Libres
            </span>
            <span className="text-[12px] text-[#94A3B8] tabular-nums font-semibold">
              Día {selectedDay} de 30
            </span>
          </div>
        </div>

        <h1 className="font-editorial text-[24px] sm:text-[28px] text-[#F1F5F9] font-normal leading-snug">
          El itinerario de 30 días para ordenar tu vida con Dios
        </h1>
        <p className="text-[14px] text-[#94A3B8] leading-relaxed">
          Diseñado para madres, padres y profesionales que buscan transformar la sobrecarga en un hábito sólido de paz. Comienza con la primera semana libre y desbloquea el programa completo con Clara Luz y Leo por un <strong>único valor de 12.99 Dólares</strong> (sin membresía, es un único pago).
        </p>
      </div>

      {/* Grace-Based Streak Component */}
      <GraceStreakTracker
        currentDay={selectedDay}
        completedDays={completedDays}
        onSelectDay={(dayNum) => {
          setSelectedDay(dayNum);
          const found = PEACE_ANCHOR_PLAN.find((d) => d.dayNumber === dayNum);
          if (found) setActiveWeekTab(found.weekNumber);
        }}
      />

      {/* Week Tabs */}
      <div className="flex flex-wrap gap-2">
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
                  ? 'bg-[#0E223D] text-[#F1F5F9] border-[#F59E0B] shadow-sm'
                  : 'bg-[#0B1728] text-[#94A3B8] border-white/[0.08] hover:bg-[#0B1728]/80'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold">{w.label}</span>
                {!w.isFree && <Lock className="w-3 h-3 text-[#F59E0B]" strokeWidth={2} />}
              </div>
              <span className={`text-[10px] block ${isActive ? 'text-[#F59E0B]' : 'text-[#64748B]'}`}>
                {w.range} • {w.quadrant}
              </span>
            </button>
          );
        })}
      </div>

      {/* Days Grid in Active Week */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {filteredDays.map((day) => {
          const isSelected = selectedDay === day.dayNumber;
          const isFree = day.isFreePreview !== false;
          const isDone = completedDays.includes(day.dayNumber);

          return (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => setSelectedDay(day.dayNumber)}
              className={`p-3 rounded-[12px] text-center transition-all border flex flex-col items-center justify-between min-h-[80px] cursor-pointer ${
                isSelected
                  ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/40'
                  : 'bg-[#0B1728] border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[11.5px] font-semibold text-[#F1F5F9]">
                  Día {day.dayNumber}
                </span>
                {!isFree ? (
                  <Lock className="w-3 h-3 text-[#F59E0B]" strokeWidth={2} />
                ) : isDone ? (
                  <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                ) : null}
              </div>

              <span className="text-[10px] text-[#94A3B8] line-clamp-2 text-left w-full mt-1 leading-snug">
                {day.theme}
              </span>

              {isSelected && <div className="w-2 h-1.5 rounded-full bg-[#F59E0B] mt-1" />}
            </button>
          );
        })}
      </div>

      {/* Selected Day Card */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.08]">
          <div>
            <span className="text-[10.5px] font-semibold uppercase tracking-wider text-[#F59E0B]">
              {currentPlan.theme} • Día {currentPlan.dayNumber} de 30
            </span>
            <h2 className="font-editorial text-[20px] text-[#F1F5F9] font-normal mt-0.5">
              {currentPlan.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleDayCompletion(currentPlan.dayNumber)}
              className={`px-3 py-1.5 rounded-[10px] text-[12px] font-medium border cursor-pointer transition-colors ${
                completedDays.includes(currentPlan.dayNumber)
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#A7F3D0]'
                  : 'bg-white/[0.04] border-white/[0.1] text-[#CBD5E1] hover:bg-white/[0.08]'
              }`}
            >
              {completedDays.includes(currentPlan.dayNumber) ? 'Completado' : 'Marcar completado'}
            </button>
          </div>
        </div>

        {/* Day 7 Callout to emotional paywall */}
        {currentPlan.dayNumber === 7 && onOpenDay7Paywall && (
          <div className="p-4 rounded-[14px] bg-[#0E223D] border border-[#10B981]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34D399] block">
                Cierre de la Primera Semana
              </span>
              <p className="text-[13px] text-[#F1F5F9]">
                Construye un refugio a prueba de tormentas con Clara Luz y Leo durante los 30 días.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenDay7Paywall}
              className="min-h-[44px] px-4 py-2 rounded-[10px] bg-[#F59E0B] text-[#060F1E] font-semibold text-[13px] shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span>Ver detalles de la ruta</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Locked day banner */}
        {!currentPlan.isFreePreview && (
          <div className="p-4 rounded-[14px] bg-[#0E223D] border border-[#F59E0B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="text-[13px] text-[#CBD5E1]">
                <strong>Proceso de 30 Días con Clara Luz y Leo:</strong> Este día forma parte del itinerario guiado por nuestros dos mentores de Fe y Esperanza. Accede por un <strong>único valor de 12.99 Dólares</strong> (sin membresía ni pagos recurrentes).
              </div>
            </div>
            {onOpenPlanDetails && (
              <button
                type="button"
                onClick={onOpenPlanDetails}
                className="min-h-[44px] px-4 py-2 rounded-[10px] bg-[#F59E0B] text-[#060F1E] text-[12.5px] font-semibold shrink-0 transition-colors cursor-pointer"
              >
                Desbloquear 30 Días (12.99 USD)
              </button>
            )}
          </div>
        )}

        {/* Plan Content Details */}
        <div className="space-y-3 pt-2">
          <div className="p-4 rounded-[12px] bg-[#060F1E] border border-white/[0.08]">
            <span className="text-[10.5px] font-semibold text-[#F59E0B] uppercase tracking-wider block mb-1">
              Principio de Verdad
            </span>
            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              {currentPlan.principle}
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#060F1E] border border-white/[0.08]">
            <span className="text-[10.5px] font-semibold text-[#CBD5E1] uppercase tracking-wider block mb-1">
              Renovación de la Mente ({currentPlan.scriptureRef})
            </span>
            <p className="font-editorial text-[14.5px] italic text-[#F1F5F9] leading-relaxed">
              «{currentPlan.verse}»
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="text-[10.5px] font-semibold text-[#34D399] uppercase tracking-wider block mb-1">
              Acción Práctica de Anclaje
            </span>
            <p className="text-[13px] text-[#A7F3D0] leading-relaxed">
              {currentPlan.anchorAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
