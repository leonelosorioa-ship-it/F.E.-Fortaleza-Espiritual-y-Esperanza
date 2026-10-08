import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface EmergencyBypassButtonProps {
  onClick: () => void;
  visible: boolean;
}

export const EmergencyBypassButton: React.FC<EmergencyBypassButtonProps> = ({ onClick, visible }) => {
  if (!visible) return null;

  return (
    <aside aria-label="Acceso rápido de rescate" className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-30 animate-fade-in max-w-[calc(100vw-24px)] pointer-events-auto">
      <button
        type="button"
        onClick={onClick}
        className="group min-h-[46px] sm:min-h-[48px] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#0D223B]/95 hover:bg-[#0B1E36] active:bg-[#060F1E] border border-[#F59E0B]/60 text-[#F1F5F9] font-medium text-[12px] sm:text-[13px] shadow-[0_8px_24px_rgba(6,15,30,0.65)] backdrop-blur-md transition-all duration-200 flex items-center gap-2 sm:gap-2.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F59E0B] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F59E0B]" />
        </span>
        <Heart className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20 shrink-0" strokeWidth={1.75} />
        <span className="font-semibold tracking-wide">Necesito paz ahora (Botiquín)</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
      </button>
    </aside>
  );
};
