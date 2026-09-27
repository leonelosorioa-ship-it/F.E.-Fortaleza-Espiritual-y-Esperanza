import React, { useEffect, useState } from 'react';
import { Wind, Heart } from 'lucide-react';

interface HapticTransitionProps {
  onComplete: () => void;
  targetRoleLabel?: string;
  targetMoodLabel?: string;
}

export const HapticTransitionScreen: React.FC<HapticTransitionProps> = ({
  onComplete,
  targetMoodLabel = 'sosiego',
}) => {
  const [seconds, setSeconds] = useState<number>(3);
  const [breathText, setBreathText] = useState<'Inhala paz' | 'Sostén la promesa' | 'Suelta la carga'>('Inhala paz');

  useEffect(() => {
    // Phase 1: Inhale
    const t1 = setTimeout(() => {
      setBreathText('Sostén la promesa');
    }, 1200);

    // Phase 2: Exhale
    const t2 = setTimeout(() => {
      setBreathText('Suelta la carga');
    }, 2200);

    // Countdown timer
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Complete transition after 3.2 seconds
    const finishTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearInterval(interval);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="region"
      aria-label="Pausa de respiración y preparación"
      className="w-full max-w-[620px] mx-auto min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-12 animate-fade-in"
    >
      {/* Expanding Soft Breathing Halo (No bounce) */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
        {/* Outer ambient wave */}
        <div className="absolute inset-0 rounded-full border border-[#F59E0B]/25 animate-breathing-gentle" />

        {/* Middle soothing glow ring */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-[#0E223D]/60 via-[#0B1E36]/80 to-[#10B981]/15 border border-[#10B981]/30 backdrop-blur-md transition-all duration-[4000ms] ease-in-out" />

        {/* Central emblem */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <Heart className="w-8 h-8 text-[#F59E0B] fill-[#F59E0B]/20 mb-2 transition-opacity duration-1000" strokeWidth={1.75} />
          <span className="font-editorial text-[17px] text-[#F1F5F9] italic tracking-wide">
            {breathText}
          </span>
          <span className="text-[11px] text-[#94A3B8] tracking-widest uppercase font-semibold mt-1">
            {seconds}s
          </span>
        </div>
      </div>

      {/* Copywriting exacto requerido */}
      <div className="space-y-2.5 max-w-[48ch]">
        <h2 className="font-editorial text-[22px] sm:text-[25px] text-[#F1F5F9] font-normal leading-snug">
          Preparando tu ancla de paz... Respira profundo, no estás solo.
        </h2>
        <p className="text-[14px] text-[#CBD5E1] leading-relaxed mx-auto">
          Alineando la Palabra de Dios y el sosiego para tu momento de {targetMoodLabel}.
        </p>
      </div>

      {/* Subtle indicator bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-8">
        <div className="h-full bg-gradient-to-r from-[#F59E0B] to-[#10B981] transition-all duration-[3000ms] ease-out w-full" />
      </div>
    </div>
  );
};
