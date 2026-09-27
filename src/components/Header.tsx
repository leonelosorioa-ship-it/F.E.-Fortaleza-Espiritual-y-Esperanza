import React from 'react';
import { Bookmark, Compass, HeartHandshake, Volume2, Wifi, WifiOff } from 'lucide-react';

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
    <header className="w-full border-b border-[#263330] bg-[#0E1413]/90 backdrop-blur-xs sticky top-0 z-40">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex flex-col text-left group"
          aria-label="Ir a la portada de F.E. Botiquín"
        >
          <div className="flex items-baseline gap-1.5">
            <span className="font-editorial text-[22px] font-normal tracking-tight text-[#E8EBE9] group-hover:text-white transition-colors duration-150">
              F.E.
            </span>
            <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[#A6B0AC]">
              BOTIQUÍN™
            </span>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[#6E7A75] hidden sm:block">
            Tu Poder Mental™
          </span>
        </button>

        {/* Top actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Navegación rápida entre módulos clave */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="min-h-[44px] px-2.5 py-1.5 rounded-[6px] text-[12px] font-medium text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] hidden md:flex items-center gap-1 transition-colors duration-150"
            title="Ruta 30 Días Ancla de Paz"
          >
            <Compass className="w-3.5 h-3.5 text-[#2A6F68]" strokeWidth={1.5} />
            <span>Ruta 30D</span>
          </button>

          <button
            type="button"
            onClick={onOpenGratitude}
            className="min-h-[44px] px-2.5 py-1.5 rounded-[6px] text-[12px] font-medium text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] hidden md:flex items-center gap-1 transition-colors duration-150"
            title="Diario de Gratitud"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-[#C99757]" strokeWidth={1.5} />
            <span>Gratitud</span>
          </button>

          <button
            type="button"
            onClick={onOpenAudios}
            className="min-h-[44px] px-2.5 py-1.5 rounded-[6px] text-[12px] font-medium text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] hidden md:flex items-center gap-1 transition-colors duration-150"
            title="Audios de Fe"
          >
            <Volume2 className="w-3.5 h-3.5 text-[#3D7D68]" strokeWidth={1.5} />
            <span>Audios</span>
          </button>

          {/* Offline trigger */}
          <button
            type="button"
            onClick={onToggleOffline}
            className={`min-h-[44px] px-2.5 py-1.5 rounded-[6px] border text-[12px] flex items-center gap-1.5 transition-colors duration-150 ${
              isOfflineMode
                ? 'border-[#3D7D68] text-[#3D7D68] bg-[#161F1E]'
                : 'border-transparent text-[#6E7A75] hover:text-[#A6B0AC]'
            }`}
            title={isOfflineMode ? 'Modo sin conexión activo' : 'Simular modo sin conexión'}
            aria-label="Alternar modo sin conexión"
          >
            {isOfflineMode ? (
              <>
                <WifiOff className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span className="hidden sm:inline">Offline</span>
              </>
            ) : (
              <Wifi className="w-3.5 h-3.5" strokeWidth={1.5} />
            )}
          </button>

          {/* Plan link */}
          <button
            type="button"
            onClick={onOpenPlan}
            className="min-h-[44px] px-2.5 py-1.5 rounded-[6px] text-[13px] font-medium text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] transition-colors duration-150"
          >
            Plan 30D
          </button>

          {/* History */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[44px] px-3 py-1.5 rounded-[6px] border border-[#263330] hover:bg-[#161F1E] text-[13px] font-medium text-[#E8EBE9] flex items-center gap-1.5 transition-colors duration-150"
            aria-label={`Ver anclas guardadas (${savedCount})`}
          >
            <Bookmark className="w-3.5 h-3.5 text-[#A6B0AC]" strokeWidth={1.5} />
            <span className="hidden xs:inline">Mis anclas</span>
            {savedCount > 0 && (
              <span className="ml-1 text-[11px] tabular-nums px-1.5 py-0.5 rounded-[4px] bg-[#1D2826] text-[#A6B0AC]">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
