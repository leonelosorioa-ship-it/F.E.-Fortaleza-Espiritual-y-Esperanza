import React from 'react';
import { ShieldAlert, Sparkles, Compass, HeartHandshake } from 'lucide-react';

interface FaithTechHeaderProps {
  onGoHome: () => void;
  onOpenRescue: () => void;
  onOpenPlan: () => void;
  onStartDiagnostic: () => void;
  currentScreen: 'landing' | 'form' | 'result';
}

export const FaithTechHeader: React.FC<FaithTechHeaderProps> = ({
  onGoHome,
  onOpenRescue,
  onOpenPlan,
  onStartDiagnostic,
  currentScreen,
}) => {
  return (
    <header className="w-full border-b border-[#334155] bg-[#0F172A]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-[720px] mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none rounded-[8px] p-1 flex items-center gap-2.5 transition-colors"
          aria-label="Ir a la portada de F.E. Esperanza en Dios"
        >
          <div className="w-8 h-8 rounded-[8px] bg-[#1E293B] border border-[#334155] flex items-center justify-center text-[#0D9488] group-hover:border-[#0D9488] transition-colors">
            <Sparkles className="w-4 h-4" strokeWidth={1.75} />
          </div>
          <div>
            <span className="font-editorial text-[16px] sm:text-[17px] text-[#F8FAFC] tracking-tight block leading-none font-semibold">
              F.E.™ <span className="font-sans text-[12px] text-[#0D9488] font-normal">• Esperanza en Dios</span>
            </span>
            <span className="text-[10px] text-[#94A3B8] tracking-wider uppercase block mt-0.5">
              Tu Poder Mental™
            </span>
          </div>
        </button>

        {/* Action controls */}
        <div className="flex items-center gap-2">
          {/* Plan de 30 Días */}
          <button
            type="button"
            onClick={onOpenPlan}
            className="min-h-[44px] px-3 py-1.5 rounded-[8px] text-[12.5px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-transparent hover:border-[#334155] transition-all flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none"
            title="Ver Programa Guiado de 30 Días"
          >
            <Compass className="w-4 h-4 text-[#0D9488]" strokeWidth={1.75} />
            <span className="hidden sm:inline">Plan 30 Días</span>
          </button>

          {/* Botiquín de Rescate (Bypass Inmediato de Crisis) */}
          <button
            type="button"
            onClick={onOpenRescue}
            className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] active:bg-[#0F766E] border border-[#F59E0B]/40 hover:border-[#F59E0B] text-[#F59E0B] text-[12.5px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            title="Bypass inmediato para pánico agudo, taquicardia o crisis nocturna"
          >
            <ShieldAlert className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
            <span>Botiquín de Rescate</span>
          </button>
        </div>
      </div>
    </header>
  );
};
