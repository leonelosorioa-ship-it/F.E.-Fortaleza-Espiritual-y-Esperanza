import React, { useState } from 'react';
import { ArrowRight, Play, Sparkles, ShieldCheck, Heart, Moon } from 'lucide-react';
import { JesusEnTiConfioScene, JesusSceneKey } from './JesusEnTiConfioScene';
import { JesusVideoModal } from './JesusVideoModal';

interface FlexiHeroAnimationProps {
  onStartFlow: () => void;
  onOpenMotherSanctuary?: () => void;
  onOpenAuth?: () => void;
  onOpenSpiritualQuiz?: () => void;
}

export const FlexiHeroAnimation: React.FC<FlexiHeroAnimationProps> = ({
  onStartFlow,
  onOpenMotherSanctuary,
  onOpenAuth,
  onOpenSpiritualQuiz,
}) => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Column 1 Scenes (Scrolls upwards for dynamic infinite loop)
  const col1Scenes: JesusSceneKey[] = [
    'campo_lavanda_juntos',
    'clara_intimidad_paz',
    'adoracion_altar_misericordia',
    'custodia_santisimo_radiante',
    'campo_lavanda_juntos',
    'clara_intimidad_paz',
    'adoracion_altar_misericordia',
    'custodia_santisimo_radiante',
  ];

  // Column 2 Scenes (Scrolls downwards for counter-motion)
  const col2Scenes: JesusSceneKey[] = [
    'fortaleza_espiritual_final',
    'leo_fortaleza_oracion',
    'mirada_amor_rayos',
    'adoracion_altar_misericordia',
    'fortaleza_espiritual_final',
    'leo_fortaleza_oracion',
    'mirada_amor_rayos',
    'adoracion_altar_misericordia',
  ];

  return (
    <>
      <section
        className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#060F17] border border-[#22C55E]/30 shadow-2xl min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex flex-col justify-end p-5 sm:p-8 lg:p-12 select-none"
        aria-label="Animación principal de bienvenida con dos filas dinámicas"
      >
        {/* ====================================================================
            1. BACKGROUND: EXACTLY TWO DYNAMIC COLUMNS (ONE UP, ONE DOWN)
            Optimized for Mobile, Tablet, Laptop and PC for maximum visual clarity.
           ==================================================================== */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden opacity-95"
          style={{
            transform: 'rotate(-3.5deg) scale(1.08)',
            transformOrigin: 'center center',
          }}
        >
          <div className="w-full h-[220%] -top-[60%] relative flex justify-center gap-3.5 sm:gap-6 md:gap-8">
            {/* COLUMN 1: Scrolls Upwards */}
            <div className="w-[165px] xs:w-[195px] sm:w-[250px] md:w-[290px] lg:w-[330px] flex flex-col gap-3.5 sm:gap-5 md:gap-6 animate-flexi-up">
              {col1Scenes.map((key, i) => (
                <div
                  key={`col1-${i}`}
                  className="w-full aspect-[9/13] rounded-[20px] sm:rounded-[26px] border border-white/20 bg-[#0A1624] overflow-hidden shadow-2xl shrink-0 transition-transform"
                >
                  <JesusEnTiConfioScene sceneKey={key} />
                </div>
              ))}
            </div>

            {/* COLUMN 2: Scrolls Downwards */}
            <div className="w-[165px] xs:w-[195px] sm:w-[250px] md:w-[290px] lg:w-[330px] flex flex-col gap-3.5 sm:gap-5 md:gap-6 animate-flexi-down">
              {col2Scenes.map((key, i) => (
                <div
                  key={`col2-${i}`}
                  className="w-full aspect-[9/13] rounded-[20px] sm:rounded-[26px] border border-white/20 bg-[#0A1624] overflow-hidden shadow-2xl shrink-0 transition-transform"
                >
                  <JesusEnTiConfioScene sceneKey={key} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ====================================================================
            2. ATMOSPHERIC OVERLAY GRADIENT
            Ensures crystal clear text contrast, dark at the bottom like Flexi
           ==================================================================== */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060F17] via-[#060F17]/85 to-[#060F17]/25 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#060F17]/50 to-[#060F17]/90 pointer-events-none" />

        {/* Ambient Lime & Gold Backlight Glow */}
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-[#C6F432]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

        {/* ====================================================================
            3. FOREGROUND HERO CONTENT (TYPOGRAPHY, BADGE & CTAS FROM FLEXI)
           ==================================================================== */}
        <div className="relative z-10 w-full max-w-[760px] space-y-4 sm:space-y-5">
          {/* Flexi-style Pill Badge with Pulsing Green Dot */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F281E]/95 border border-[#22C55E]/40 text-[#A3E635] text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6F432] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6F432]" />
              </span>
              <span>Santuario Litúrgico & Fisiológico</span>
            </div>

            {/* Video Trigger Pill */}
            <button
              type="button"
              onClick={() => setIsVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#061A0E]/90 hover:bg-[#0E2F1A] border border-[#22C55E]/50 text-[#C6F432] text-[11px] sm:text-[11.5px] font-semibold backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(198,244,50,0.2)] hover:scale-[1.02]"
            >
              <span className="w-5 h-5 rounded-full bg-[#C6F432] text-[#061A0E] flex items-center justify-center shrink-0">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span>Ver animación «Jesús en Ti Confío»</span>
            </button>

            {/* Test Espiritual de 7 Preguntas Pill */}
            {onOpenSpiritualQuiz && (
              <button
                type="button"
                onClick={onOpenSpiritualQuiz}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 border border-[#F59E0B]/50 text-[#F59E0B] text-[11px] sm:text-[11.5px] font-bold backdrop-blur-md transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-[1.02]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Test Espiritual de 7 Preguntas</span>
              </button>
            )}
          </div>

          {/* Big Bold Headline with the vibrant Flexi Lime Accent */}
          <h1 className="font-editorial text-[26px] xs:text-[32px] sm:text-[40px] lg:text-[46px] text-[#F1F5F9] font-normal leading-[1.14] tracking-tight">
            Empieza una vida con{' '}
            <span className="text-[#C6F432] font-semibold drop-shadow-[0_0_20px_rgba(198,244,50,0.35)]">
              más paz en Dios
            </span>
          </h1>

          {/* Punchy 3-beat Subtitle inspired by "Entrenas. Estiras. Te recuperas." + Pastoral Assurance */}
          <div className="space-y-1.5">
            <p className="text-[14.5px] sm:text-[16.5px] text-[#F1F5F9] font-medium leading-snug">
              Entrenas tu espíritu. Aquietas tu mente. Descansas en su presencia.
            </p>
            <p className="text-[13px] sm:text-[14px] text-[#CBD5E1] leading-relaxed max-w-[65ch]">
              Para el creyente abrumado: obtén un ancla de paz y descanso del sistema nervioso sin sentir culpa religiosa. Si el insomnio o la ansiedad te visitan hoy, tu cuerpo no está fallando. Respira y entrega el control.
            </p>
          </div>

          {/* Action Row matching Flexi style */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3">
            {/* Primary Lime CTA Button */}
            <button
              type="button"
              onClick={onStartFlow}
              className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-full bg-[#C6F432] hover:bg-[#D9F95C] active:scale-[0.98] text-[#061A0E] font-bold text-[15px] sm:text-[16px] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(198,244,50,0.35)] focus-visible:ring-2 focus-visible:ring-[#C6F432] focus-visible:outline-none"
            >
              <span>Empieza hoy</span>
              <ArrowRight className="w-4 h-4 text-[#061A0E]" strokeWidth={2.5} />
            </button>

            {onOpenMotherSanctuary && (
              <button
                type="button"
                onClick={onOpenMotherSanctuary}
                className="w-full sm:w-auto min-h-[48px] px-5 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] active:bg-white/[0.18] text-[#F1F5F9] border border-white/[0.15] text-[13.5px] font-medium transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm"
              >
                <Moon className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
                <span>Calma Nocturna (Madres y Profesionales)</span>
              </button>
            )}
          </div>

          {/* Secondary Link: "Ya tengo cuenta • Entrar" & Trust Subtext */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-[12px] sm:text-[12.5px] text-[#94A3B8]">
            {onOpenAuth && (
              <button
                type="button"
                onClick={onOpenAuth}
                className="text-[#CBD5E1] hover:text-[#C6F432] font-semibold transition-colors cursor-pointer underline underline-offset-4"
              >
                Ya tengo cuenta • Entrar
              </button>
            )}

            <span className="hidden xs:inline">•</span>

            <span className="flex items-center gap-1.5 text-[#A3E635] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Refugio de paz espiritual • 100% Gratuito y confidencial
            </span>
          </div>
        </div>
      </section>

      {/* Full-screen Contemplative Video Player Modal */}
      <JesusVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onStartFlow={onStartFlow}
      />
    </>
  );
};
