import React from 'react';
import { Bookmark, Compass, HeartHandshake, Volume2, Wifi, WifiOff, MapPin, Sparkles } from 'lucide-react';
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
    <header className="w-full border-b border-[#CBD5E1] bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-[840px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus:outline-none flex items-center gap-2"
          aria-label="Ir al inicio de Tu Poder Mental F.E."
        >
          <TuPoderMentalLogo size={46} showText={true} textColor="text-[#0B1E36]" />
        </button>

        {/* Top actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Navegación rápida entre módulos clave */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="min-h-[40px] px-3 py-1.5 rounded-[10px] text-[13px] font-semibold text-[#334155] hover:text-[#0B1E36] hover:bg-[#F1F5F9] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Ruta 30 Días con Dios"
          >
            <Compass className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
            <span>Ruta 30D</span>
          </button>

          <button
            type="button"
            onClick={onOpenGratitude}
            className="min-h-[40px] px-3 py-1.5 rounded-[10px] text-[13px] font-semibold text-[#334155] hover:text-[#0B1E36] hover:bg-[#F1F5F9] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Diario de Gratitud"
          >
            <HeartHandshake className="w-4 h-4 text-[#0D9488]" strokeWidth={2} />
            <span>Gratitud</span>
          </button>

          <button
            type="button"
            onClick={onOpenAudios}
            className="min-h-[40px] px-3 py-1.5 rounded-[10px] text-[13px] font-semibold text-[#334155] hover:text-[#0B1E36] hover:bg-[#F1F5F9] hidden md:flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Audios de Fe"
          >
            <Volume2 className="w-4 h-4 text-[#6366F1]" strokeWidth={2} />
            <span>Audios</span>
          </button>

          {/* Offline trigger */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`min-h-[38px] px-2.5 py-1.5 rounded-[10px] border text-[12px] flex items-center gap-1.5 transition-colors cursor-pointer ${
              isOfflineMode
                ? 'border-[#10B981] text-[#10B981] bg-[#ECFDF5]'
                : 'border-transparent text-[#64748B] hover:text-[#0B1E36]'
            }`}
            title={isOfflineMode ? 'Modo sin conexión activo' : 'Modo sin conexión'}
            aria-label="Alternar modo sin conexión"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" strokeWidth={2} />
                <span className="hidden sm:inline font-bold">Offline</span>
              </>
            ) : (
              <Wifi className="w-3.5 h-3.5" strokeWidth={2} />
            )}
          </button>

          {/* Plan link */}
          <button
            type="button"
            onClick={onOpenPlan}
            className="min-h-[38px] px-3 py-1.5 rounded-[10px] bg-[#FEF3C7] hover:bg-[#FDE68A] text-[12px] sm:text-[13px] font-bold text-[#92400E] transition-colors border border-[#F59E0B]/30 cursor-pointer"
          >
            Plan 30D
          </button>

          {/* History */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[38px] px-3.5 py-1.5 rounded-[10px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[12px] sm:text-[13px] font-bold text-[#0B1E36] flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
            aria-label={`Ver oraciones guardadas (${savedCount})`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2} />
            <span className="hidden xs:inline">Mis oraciones</span>
            {savedCount > 0 && (
              <span className="ml-1 text-[11px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#060F1E] text-[#FBBF24] font-bold border border-[#F59E0B]/40">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
