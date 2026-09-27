import React from 'react';
import { Bookmark, Compass, HeartHandshake, Volume2 } from 'lucide-react';
import { TuPoderMentalLogo } from './TuPoderMentalLogo';

interface HeaderProps {
  onGoHome: () => void;
  onOpenHistory: () => void;
  onOpenPlan?: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenHistory,
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
  savedCount,
}) => {
  return (
    <header className="w-full border-b border-white/[0.08] bg-[#060F1E]/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-3">
        {/* Brand Logo & Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none flex items-center gap-2 rounded-[10px] min-h-[44px] shrink-0"
          aria-label="Ir al inicio de Tu Poder Mental F.E."
        >
          <TuPoderMentalLogo size={44} showText={true} />
        </button>

        {/* Top actions & navigation */}
        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          {/* Ruta 30 Días */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            title="Ruta 30 Días con Dios"
          >
            <Compass className="w-4 h-4 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Ruta 30D</span>
          </button>

          {/* Gratitud */}
          <button
            type="button"
            onClick={onOpenGratitude}
            className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:outline-none"
            title="Diario de Gratitud"
          >
            <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Gratitud</span>
          </button>

          {/* Audios */}
          <button
            type="button"
            onClick={onOpenAudios}
            className="min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:outline-none"
            title="Audios de Fe"
          >
            <Volume2 className="w-4 h-4 text-[#0EA5E9] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Audios</span>
          </button>

          {/* Mis Oraciones (History) */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[44px] px-3 sm:px-3.5 py-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-[12.5px] font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none shrink-0"
            aria-label={`Ver oraciones guardadas (${savedCount})`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="hidden xs:inline">Mis oraciones</span>
            {savedCount > 0 && (
              <span className="text-[11px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
