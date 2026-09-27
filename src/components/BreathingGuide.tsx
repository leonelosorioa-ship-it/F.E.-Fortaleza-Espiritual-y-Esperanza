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

        // Phase transition
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
    inhalar: 'Toma aire despacio por la nariz',
    sostener: 'Retén el aire con el pecho suave',
    exhalar: 'Suelta el aire como un suspiro silencioso',
  }[phase];

  const phaseLabel = {
    inhalar: 'INHALAR',
    sostener: 'SOSTENER',
    exhalar: 'EXHALAR',
  }[phase];

  // Visual size ratio for the breathing indicator
  const circleScale = phase === 'inhalar' ? 'scale-110' : phase === 'sostener' ? 'scale-110' : 'scale-90';

  return (
    <div className="w-full bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 flex flex-col items-center text-center">
      <div className="flex items-center justify-between w-full mb-6">
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#A6B0AC]" strokeWidth={1.5} />
          <span className="text-[12px] uppercase tracking-[0.08em] font-medium text-[#A6B0AC]">
            Pausa Fisiológica (4×4)
          </span>
        </div>
        <span className="text-[12px] tabular-nums text-[#6E7A75]">
          Ciclos: {cyclesCompleted}
        </span>
      </div>

      {/* Breathing Ring */}
      <div className="relative w-44 h-44 my-4 flex items-center justify-center">
        {/* Subtle background track */}
        <div className="absolute inset-0 rounded-full border border-[#2D3936]" />
        
        {/* Animated breathing core */}
        <div
          className={`w-32 h-32 rounded-full border border-[#2A6F68] bg-[#1B322F]/40 flex flex-col items-center justify-center transition-transform duration-[4000ms] ease-out ${circleScale}`}
        >
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] mb-1">
            {phaseLabel}
          </span>
          <span className="text-[32px] font-editorial tabular-nums text-[#E8EBE9] leading-none">
            {secondsLeft}s
          </span>
        </div>
      </div>

      <p className="font-editorial text-[16px] text-[#A6B0AC] max-w-[340px] mt-2 mb-6">
        {phaseInstruction}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleToggle}
          className="min-h-[44px] px-4 py-2 rounded-[6px] border border-[#263330] hover:bg-[#1D2826] active:bg-[#1A2422] text-[#E8EBE9] text-[13px] font-medium flex items-center gap-2 transition-colors duration-150"
          aria-label={isActive ? 'Pausar compás de respiración' : 'Reanudar compás de respiración'}
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 text-[#A6B0AC]" strokeWidth={1.5} />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-[#2A6F68]" strokeWidth={1.5} />
              <span>Continuar respiración</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="min-h-[44px] min-w-[44px] p-2 rounded-[6px] border border-[#263330] hover:bg-[#1D2826] active:bg-[#1A2422] text-[#A6B0AC] hover:text-[#E8EBE9] flex items-center justify-center transition-colors duration-150"
          aria-label="Reiniciar ciclo de respiración"
          title="Reiniciar"
        >
          <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};
