import React from 'react';
import { Bookmark, Compass, HeartHandshake, Volume2, Wifi, WifiOff } from 'lucide-react';
import { TuPoderMentalLogo } from './TuPoderMentalLogo';

interface HeaderProps {
  onGoHome: () => void;
  onOpenHistory: () => void;
  onOpenPlan: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
  savedCount: number;
  isOfflineMode: boolean;
  onToggleOffline: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenHistory,
  onOpenPlan,
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
  savedCount,
  isOfflineMode,
  onToggleOffline,
}) => {
  return (
    <header className="w-full border-b border-white/[0.08] bg-[#060F1E]/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none flex items-center gap-2 rounded-[10px]"
          aria-label="Ir al inicio de Tu Poder Mental F.E."
        >
          <TuPoderMentalLogo size={44} showText={true} />
        </button>

        {/* Top actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Navegación rápida entre módulos clave */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Ruta 30 Días con Dios"
          >
            <Compass className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
            <span>Ruta 30D</span>
          </button>

          <button
            type="button"
            onClick={onOpenGratitude}
            className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Diario de Gratitud"
          >
            <HeartHandshake className="w-4 h-4 text-[#10B981]" strokeWidth={1.75} />
            <span>Gratitud</span>
          </button>

          <button
            type="button"
            onClick={onOpenAudios}
            className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[13px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Audios de Fe"
          >
            <Volume2 className="w-4 h-4 text-[#0EA5E9]" strokeWidth={1.75} />
            <span>Audios</span>
          </button>

          {/* Offline trigger */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`min-h-[44px] px-2.5 py-1.5 rounded-[10px] text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer border ${
              isOfflineMode
                ? 'border-[#10B981]/50 text-[#34D399] bg-[#10B981]/15'
                : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04]'
            }`}
            title={isOfflineMode ? 'Modo sin conexión activo' : 'Modo sin conexión'}
            aria-label="Alternar modo sin conexión"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span className="hidden sm:inline font-semibold">Offline</span>
              </>
            ) : (
              <Wifi className="w-3.5 h-3.5" strokeWidth={1.75} />
            )}
          </button>

          {/* Plan link */}
          <button
            type="button"
            onClick={onOpenPlan}
            className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] bg-[#F59E0B]/15 hover:bg-[#F59E0B]/25 text-[12.5px] font-semibold text-[#FBBF24] transition-colors border border-[#F59E0B]/40 cursor-pointer"
          >
            Plan 30D (12.99)
          </button>

          {/* History */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[12.5px] font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label={`Ver oraciones guardadas (${savedCount})`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={1.75} />
            <span className="hidden xs:inline">Mis oraciones</span>
            {savedCount > 0 && (
              <span className="ml-1 text-[11px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
