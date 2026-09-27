import React, { useState, useEffect } from 'react';
import { Wind, Play, Pause, RotateCcw } from 'lucide-react';

interface BreathingGuideProps {
  onCompleteCycle?: () => void;
}

type BreathPhase = 'inhalar' | 'sostener' | 'exhalar';

export const BreathingGuide: React.FC<BreathingGuideProps> = ({ onCompleteCycle }) => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [phase, setPhase] = useState<BreathPhase>('inhalar');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [cyclesCompleted, setCyclesCompleted] = useState<number>(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Phase transition (4s each, total 12s per full cycle)
        if (phase === 'inhalar') {
          setPhase('sostener');
          return 4;
        } else if (phase === 'sostener') {
          setPhase('exhalar');
          return 4;
        } else {
          setPhase('inhalar');
          setCyclesCompleted((c) => c + 1);
          if (onCompleteCycle) onCompleteCycle();
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase, onCompleteCycle]);

  const handleToggle = () => {
    setIsActive((prev) => !prev);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhalar');
    setSecondsLeft(4);
  };

  const phaseInstruction = {
    inhalar: 'Toma aire despacio por la nariz sintiendo la gracia de Dios',
    sostener: 'Retén el aire con el pecho sereno, confiando en su cuidado',
    exhalar: 'Suelta el aire como un suspiro, entregando toda tensión',
  }[phase];

  const phaseLabel = {
    inhalar: 'INHALAR',
    sostener: 'SOSTENER',
    exhalar: 'EXHALAR',
  }[phase];

  // Visual size ratio for the breathing indicator (Smooth scale without bounce)
  const circleScale =
    phase === 'inhalar'
      ? 'scale-105 opacity-100'
      : phase === 'sostener'
      ? 'scale-105 opacity-90'
      : 'scale-95 opacity-75';

  return (
    <div className="w-full bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 flex flex-col items-center text-center shadow-sm">
      <div className="flex items-center justify-between w-full pb-3 border-b border-white/[0.08] mb-5">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
            Respiración Diafragmática 4×4 • Calma Biológica
          </span>
        </div>
        <span className="text-[11.5px] text-[#94A3B8] tabular-nums font-medium">
          Ciclos: {cyclesCompleted}
        </span>
      </div>

      {/* Visual Breathing Ring with 4000ms duration, NO bounce */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-3">
        {/* Outer ambient wave */}
        <div
          className={`absolute inset-0 rounded-full border border-[#F59E0B]/30 transition-all duration-[4000ms] ease-in-out ${
            isActive ? circleScale : 'scale-100 opacity-60'
          }`}
        />

        {/* Dynamic expanding center */}
        <div
          className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#060F1E] via-[#0E223D] to-[#0A1A2F] border-2 border-[#F59E0B] flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out shadow-lg ${
            isActive ? circleScale : 'scale-100'
          }`}
        >
          <span className="text-[10px] font-semibold tracking-widest uppercase text-[#F59E0B] mb-1">
            {phaseLabel}
          </span>
          <span className="font-editorial text-[36px] sm:text-[40px] text-[#F1F5F9] font-normal tabular-nums leading-none">
            {secondsLeft}
          </span>
          <span className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-medium mt-1">segundos</span>
        </div>
      </div>

      {/* Instructional copy */}
      <p className="font-editorial text-[15px] sm:text-[16px] text-[#F1F5F9] max-w-[40ch] my-2 leading-snug">
        {phaseInstruction}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-2.5 mt-3">
        <button
          type="button"
          onClick={handleToggle}
          className="min-h-[44px] px-5 py-2 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] text-[13px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          {isActive ? (
            <>
              <Pause className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Continuar</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-[12px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] text-[13px] transition-colors flex items-center justify-center cursor-pointer"
          title="Reiniciar respiración"
          aria-label="Reiniciar respiración"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
};
