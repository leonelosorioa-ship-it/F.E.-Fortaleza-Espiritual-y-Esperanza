import React from 'react';
import { ShieldCheck, Heart, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

interface GraceStreakTrackerProps {
  currentDay: number;
  completedDays: number[];
  onSelectDay?: (day: number) => void;
}

export const GraceStreakTracker: React.FC<GraceStreakTrackerProps> = ({
  currentDay,
  completedDays,
  onSelectDay,
}) => {
  const totalCompleted = completedDays.length;
  const isGraceShieldActive = true; // Grace is always active

  return (
    <div className="w-full bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-5 sm:p-6 space-y-4">
      {/* Header with Grace Message */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-[#10B981]/15 border border-[#10B981]/30 flex items-center justify-center text-[#10B981]">
            <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-[#F1F5F9]">
                Racha en la Gracia (Sin culpa)
              </span>
              <span className="text-[10.5px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/30">
                Gracia Activa
              </span>
            </div>
            <span className="text-[12px] text-[#94A3B8]">
              {totalCompleted} de 30 días recorridos en la Palabra
            </span>
          </div>
        </div>

        {/* Milestone Indicator */}
        <div className="flex items-center gap-2 text-[12px] text-[#CBD5E1]">
          <Calendar className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span className="tabular-nums font-semibold text-[#F59E0B]">
            Día {currentDay} activo
          </span>
        </div>
      </div>

      {/* Grace Shield Notice: No penalty for missed days */}
      <div className="p-3.5 rounded-[12px] bg-[#0E223D]/70 border border-[#F59E0B]/20 flex items-start gap-2.5">
        <Heart className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20 shrink-0 mt-0.5" strokeWidth={1.75} />
        <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed">
          <strong className="text-[#F1F5F9]">Principio de constancia:</strong> Si un día no pudiste orar o meditar, tu contador no vuelve a cero. Retomas con paz exactamente donde quedaste; no hay condenación en este camino.
        </p>
      </div>

      {/* 30 Day Micro Dots Grid */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
          <span>Progreso semanal</span>
          <span className="tabular-nums">{Math.round((totalCompleted / 30) * 100)}% completado</span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5 sm:gap-2">
          {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
            const isDone = completedDays.includes(dayNum);
            const isCurrent = currentDay === dayNum;
            const isMilestone = dayNum === 7 || dayNum === 14 || dayNum === 21 || dayNum === 30;

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => onSelectDay && onSelectDay(dayNum)}
                className={`h-8 sm:h-8 rounded-[8px] text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer border ${
                  isDone
                    ? 'bg-[#10B981]/25 border-[#10B981] text-[#A7F3D0]'
                    : isCurrent
                    ? 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#FBBF24] ring-1 ring-[#F59E0B]/40'
                    : isMilestone
                    ? 'bg-white/[0.04] border-[#F59E0B]/30 text-[#CBD5E1]'
                    : 'bg-white/[0.02] border-white/[0.06] text-[#64748B] hover:bg-white/[0.06]'
                }`}
                title={`Día ${dayNum}${isDone ? ' (Completado)' : ''}`}
                aria-label={`Día ${dayNum}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2} />
                ) : (
                  <span className="tabular-nums">{dayNum}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
