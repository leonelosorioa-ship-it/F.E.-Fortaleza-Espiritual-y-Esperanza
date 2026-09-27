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
    inhalar: 'Toma aire despacio por la nariz sintiendo la gracia de Dios',
    sostener: 'Retén el aire con el pecho sereno, confiando en su cuidado',
    exhalar: 'Suelta el aire como un suspiro, entregando toda tensión',
  }[phase];

  const phaseLabel = {
    inhalar: 'INHALAR',
    sostener: 'SOSTENER',
    exhalar: 'EXHALAR',
  }[phase];

  // Visual size ratio for the breathing indicator
  const circleScale = phase === 'inhalar' ? 'scale-110' : phase === 'sostener' ? 'scale-110' : 'scale-95';

  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[18px] p-6 sm:p-8 flex flex-col items-center text-center shadow-xs">
      <div className="flex items-center justify-between w-full pb-4 border-b border-[#E2E8F0] mb-6">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <Wind className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0B1E36]">
            Respiración Guiada 4×4 en la Presencia de Dios (Cuadrante Cuerpo)
          </span>
        </div>
        <span className="text-[12px] text-[#64748B] tabular-nums font-semibold">
          Ciclos: {cyclesCompleted}
        </span>
      </div>

      {/* Visual Breathing Ring */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-4">
        {/* Outer ambient pulse ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 border-[#F59E0B]/30 transition-transform duration-1000 ease-out ${
            isActive ? circleScale : 'scale-100'
          }`}
        />

        {/* Dynamic expanding center */}
        <div
          className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#FFFBEB] via-[#FEF3C7] to-[#ECFDF5] border-2 border-[#F59E0B] flex flex-col items-center justify-center transition-transform duration-1000 ease-out shadow-md ${
            isActive ? circleScale : 'scale-100'
          }`}
        >
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#B45309] mb-1">
            {phaseLabel}
          </span>
          <span className="font-serif text-[36px] sm:text-[40px] text-[#0B1E36] font-normal tabular-nums leading-none">
            {secondsLeft}
          </span>
          <span className="text-[10px] text-[#64748B] uppercase font-semibold mt-1">segundos</span>
        </div>
      </div>

      {/* Instructional copy */}
      <p className="font-serif text-[16px] sm:text-[17px] text-[#0B1E36] max-w-[380px] my-3 leading-snug">
        {phaseInstruction}
      </p>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-4">
        <button
          type="button"
          onClick={handleToggle}
          className="min-h-[46px] px-5 py-2.5 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[13px] font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm border border-[#F59E0B]/30"
        >
          {isActive ? (
            <>
              <Pause className="w-4 h-4 fill-white" />
              <span>Pausar ritmo</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              <span>Reanudar</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="min-h-[46px] px-4 py-2.5 rounded-[12px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[#64748B] hover:text-[#0B1E36] text-[13px] font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Reiniciar respiración"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reiniciar</span>
        </button>
      </div>
    </div>
  );
};
