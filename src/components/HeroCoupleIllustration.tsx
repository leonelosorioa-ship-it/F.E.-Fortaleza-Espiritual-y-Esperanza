import React from 'react';
import { Heart, Sparkles, Compass, ShieldCheck, ArrowRight, Brain, Activity } from 'lucide-react';

interface HeroProps {
  onStart: () => void;
  onOpenMotherSanctuary?: () => void;
}

export const HeroCoupleIllustration: React.FC<HeroProps> = ({ onStart, onOpenMotherSanctuary }) => {
  return (
    <div className="relative w-full rounded-[22px] overflow-hidden bg-gradient-to-b from-[#060F1E] via-[#0A192F] to-[#0E223D] border-2 border-[#F59E0B]/40 p-6 sm:p-9 shadow-2xl text-white">
      {/* Soft atmospheric backlight glows */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-80 h-80 bg-[#10B981]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10">
        {/* Left: Inspiring Headline and Value for Men and Women Needing God */}
        <div className="space-y-4 max-w-[500px] text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#FBBF24] text-[11px] font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2.5} />
            <span>El Mapa de tu Vida en Dios • F.E.™</span>
          </div>

          <h1 className="font-serif text-[28px] sm:text-[36px] text-white font-normal leading-[1.18] tracking-tight">
            Para hombres y mujeres que necesitan de Dios para ordenar su vida y su mente.
          </h1>

          <p className="text-[14.5px] sm:text-[15.5px] text-[#CBD5E1] leading-relaxed">
            Más que luchar contra la ansiedad en solitario, te conectamos con el <strong>diseño divino de tu vida</strong>. Un método práctico y espiritual para ordenar tus 4 cuadrantes: <strong>Cuerpo, Mente, Alma y Propósito</strong>, sin juicios religiosos ni la culpa de sentir que te falta fe.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onStart}
              className="min-h-[48px] px-6 py-3 rounded-[12px] bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] hover:brightness-110 text-[#060F1E] text-[14.5px] font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Buscar a Dios y trazar mi mapa</span>
              <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
            </button>

            {onOpenMotherSanctuary && (
              <button
                type="button"
                onClick={onOpenMotherSanctuary}
                className="min-h-[48px] px-4 py-2.5 rounded-[12px] bg-[#11243E] hover:bg-[#183154] text-[#FBBF24] border border-[#F59E0B]/30 text-[13px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Santuario Calma Nocturna</span>
              </button>
            )}
          </div>

          {/* Quick trust metrics */}
          <div className="pt-2 flex items-center gap-4 text-[12px] text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Acceso libre perpetuo
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#F59E0B]" />
              4 Cuadrantes en Dios
            </span>
            <span>•</span>
            <span>100% Confidencial</span>
          </div>
        </div>

        {/* Right: Harmonious Dignified Graphic of Man & Woman Aligning Body, Mind, Soul */}
        <div className="relative w-full lg:w-auto flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-[#112540] via-[#09172B] to-[#1E3A5F] p-4 shadow-2xl flex items-center justify-center border-2 border-[#F59E0B]/40">
            {/* Inner radiant halo */}
            <div className="w-full h-full rounded-full border border-white/20 flex flex-col items-center justify-center text-center p-4 bg-[#061120]/80 backdrop-blur-md shadow-inner">
              {/* Couple vector emblems */}
              <div className="relative flex items-center justify-center gap-4 mb-3">
                {/* Man avatar card */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#0A1C33] flex items-center justify-center shadow-lg border-2 border-[#F59E0B]/50 text-white">
                    <svg className="w-8 h-8 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-[#FBBF24] mt-1.5 tracking-wide">Hombre</span>
                </div>

                {/* Central divine heart of grace & light */}
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-[#F59E0B] via-[#EAB308] to-[#D97706] flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse">
                  <Heart className="w-7 h-7 text-[#060F1E] fill-[#060F1E]" />
                </div>

                {/* Woman avatar card */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0F3733] to-[#0D9488] flex items-center justify-center shadow-lg border-2 border-[#10B981]/50 text-white">
                    <svg className="w-8 h-8 text-[#A7F3D0]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                      <path d="M12 14c2.5 0 4.5 1.5 4.5 3.5" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-[#10B981] mt-1.5 tracking-wide">Mujer</span>
                </div>
              </div>

              <span className="text-[13px] font-serif italic text-white font-normal leading-snug px-3">
                «Cuerpo relajado, Mente clara, Alma en paz y Propósito en Dios.»
              </span>

              <div className="flex items-center gap-1.5 text-[10px] text-[#FBBF24] font-bold uppercase tracking-wider mt-2.5">
                <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                <span>El Mapa de Vida de Tu Poder Mental</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
