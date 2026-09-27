import React from 'react';
import { X, Check } from 'lucide-react';

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PlanDetailsModal: React.FC<PlanDetailsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060A09]/80 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-plan-title"
    >
      <div className="relative w-full max-w-[540px] bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 shadow-[0_12px_32px_-4px_rgba(6,10,9,0.65)] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#263330]">
          <div>
            <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-1">
              Transparencia y sostenimiento
            </span>
            <h2 id="modal-plan-title" className="font-editorial text-[24px] text-[#E8EBE9]">
              Detalles del plan F.E.™
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 text-[#A6B0AC] hover:text-[#E8EBE9] rounded-[6px] hover:bg-[#1D2826] flex items-center justify-center transition-colors duration-150"
            aria-label="Cerrar detalles del plan"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Core Guarantee */}
        <div className="bg-[#121A18] border border-[#263330] rounded-[6px] p-4 mb-6">
          <p className="text-[13px] text-[#A6B0AC] leading-relaxed">
            <span className="text-[#E8EBE9] font-medium">Principio de gracia:</span> El Botiquín de Emergencia nocturno para calmar la taquicardia y la rumiación es y será siempre de acceso libre y gratuito. Nadie debe pagar por ser consolado en la madrugada.
          </p>
        </div>

        {/* Pricing comparison */}
        <div className="space-y-4 mb-8">
          {/* Plan Gratuito Perpetuo */}
          <div className="p-4 rounded-[6px] border border-[#263330] bg-[#161F1E]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[14px] font-medium text-[#E8EBE9]">Botiquín de Emergencia</span>
              <span className="text-[14px] text-[#3D7D68] font-medium">Acceso libre perpetuo</span>
            </div>
            <ul className="space-y-2 text-[13px] text-[#A6B0AC]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#3D7D68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Protocolo de entrega para crisis nocturnas en 7 dimensiones</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#3D7D68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Pausa diafragmática 4×4 y anclaje sensorial 5-4-3-2-1</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#3D7D68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Diario de gratitud y primeros 7 días del plan de paz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#3D7D68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Historial confidencial en la memoria de tu dispositivo</span>
              </li>
            </ul>
          </div>

          {/* Suscripción Mensual 30 Días */}
          <div className="p-4 rounded-[6px] border border-[#2A6F68] bg-[#1B322F]/30">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[14px] font-medium text-[#E8EBE9]">Programa Completo 30 Días</span>
              <span className="text-[15px] tabular-nums font-medium text-[#E8EBE9]">
                4.99 USD <span className="text-[12px] text-[#A6B0AC] font-normal">/ mes (30 días)</span>
              </span>
            </div>
            <p className="text-[12px] text-[#A6B0AC] mb-3">
              Acompañamiento integral mes a mes para edificar un hábito duradero de reposo y sobriedad espiritual.
            </p>
            <ul className="space-y-2 text-[13px] text-[#A6B0AC]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#2A6F68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span><strong>Ruta completa de 30 Días:</strong> 4 semanas estructuradas de reestructuración cognitiva y anclas de paz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#2A6F68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span><strong>Catálogo completo de audios de fe:</strong> vigilias de insomnio prolongado y paisajes sonoros en 432 Hz</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#2A6F68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span><strong>Consolidación mensual:</strong> acompañamiento continuado para romper el ciclo de rumiación</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#2A6F68] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>Acceso sin conexión permanente garantizado</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 rounded-[6px] border border-[#263330] hover:bg-[#1D2826] text-[#A6B0AC] hover:text-[#E8EBE9] text-[14px] font-medium transition-colors duration-150 text-center"
          >
            Entendido, volver al botiquín
          </button>
        </div>
      </div>
    </div>
  );
};
