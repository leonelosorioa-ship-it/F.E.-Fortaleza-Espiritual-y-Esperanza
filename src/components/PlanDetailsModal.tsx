import React from 'react';
import { X, Check, ShieldCheck, Heart, Sparkles, Compass } from 'lucide-react';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F1E]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-plan-title"
    >
      <div className="relative w-full max-w-[580px] bg-[#0B1728] border border-white/[0.1] rounded-[20px] p-6 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between pb-3.5 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-1.5 text-[#F59E0B] mb-1">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span className="text-[10.5px] font-semibold tracking-wider uppercase">
                Transparencia y Sostenimiento de la Plataforma
              </span>
            </div>
            <h2 id="modal-plan-title" className="font-editorial text-[22px] sm:text-[24px] text-[#F1F5F9] font-normal">
              El Mapa de tu Vida en Dios • Rescate y Rehabilitación
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] text-[#94A3B8] hover:text-[#F1F5F9] rounded-[10px] hover:bg-white/[0.05] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar detalles del plan"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Principio de Gracia */}
        <div className="bg-[#0E223D]/70 border border-[#F59E0B]/30 rounded-[14px] p-4 flex items-start gap-3">
          <Heart className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]/20 shrink-0 mt-0.5" strokeWidth={1.75} />
          <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed">
            <strong className="text-[#F1F5F9]">Principio de Gracia:</strong> El Botiquín de Encuentro con Dios y los primeros auxilios para momentos de crisis nocturna o taquicardia son y serán siempre de <strong>acceso libre y gratuito</strong>. Nadie debe pagar por ser consolado o recibir la Palabra en su momento de mayor aflicción.
          </p>
        </div>

        {/* Pricing comparison */}
        <div className="space-y-3.5">
          {/* Plan Gratuito Perpetuo */}
          <div className="p-5 rounded-[14px] border border-white/[0.08] bg-[#060F1E]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[14.5px] font-semibold text-[#F1F5F9]">
                Botiquín de Rescate y Oración
              </span>
              <span className="text-[11px] text-[#34D399] font-semibold uppercase tracking-wider bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                Acceso libre perpetuo
              </span>
            </div>
            <ul className="space-y-1.5 text-[12.5px] text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Protocolo de entrega para madres, padres y profesionales</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Pausa diafragmática 4×4 y enraizamiento sensorial 5-4-3-2-1</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Diario de gratitud con jardín botánico y Semana 1 libre</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Almacenamiento confidencial y seguro en tu propio dispositivo</span>
              </li>
            </ul>
          </div>

          {/* Proceso Completo de 30 Días con Clara Luz y Leo (12.99 USD Pago Único) */}
          <div className="p-5 rounded-[14px] border-2 border-[#F59E0B] bg-gradient-to-b from-[#0E223D] to-[#0A1A2F] shadow-lg space-y-2.5">
            <div className="flex justify-between items-baseline">
              <div>
                <span className="text-[15px] font-semibold text-[#F1F5F9] block">
                  Proceso de 30 Días con Clara Luz y Leo
                </span>
                <span className="text-[11px] font-medium text-[#34D399]">
                  Construye un refugio a prueba de tormentas
                </span>
              </div>
              <span className="text-[17px] tabular-nums font-bold text-[#F59E0B]">
                12.99 USD <span className="text-[11px] text-[#FBBF24] font-medium">(Pago Único)</span>
              </span>
            </div>

            <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed">
              Durante los 30 días por un único valor de 12.99 Dólares. Clara Luz y Leo te guían a edificar cuerpo, mente, alma y propósito. <em>Por el momento no existirá membresía ni pagos mensuales recurrentes.</em>
            </p>

            <ul className="space-y-1.5 text-[12.5px] text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>El Mapa de 30 Días:</strong> semanas 2 a 5 con reflexiones y anclajes diarios</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>Catálogo completo de audios de fe:</strong> vigilias nocturnas extendidas</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>Cero mensualidades ocultas:</strong> un solo pago con acceso ilimitado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] text-[13px] font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Entendido, continuar al botiquín
          </button>
        </div>
      </div>
    </div>
  );
};
