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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060F1E]/80 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-plan-title"
    >
      <div className="relative w-full max-w-[580px] bg-white border border-[#CBD5E1] rounded-[20px] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-1.5 text-[#D97706] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="text-[11px] font-bold tracking-[0.08em] uppercase">
                Transparencia y Sostenimiento de la Plataforma
              </span>
            </div>
            <h2 id="modal-plan-title" className="font-serif text-[24px] text-[#0B1E36]">
              El Mapa de tu Vida en Dios • Planes
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] p-2 text-[#64748B] hover:text-[#0B1E36] rounded-[10px] hover:bg-[#F1F5F9] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar detalles del plan"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Principio de Gracia */}
        <div className="bg-[#FEF3C7]/40 border border-[#FDE68A] rounded-[14px] p-4 mb-6 flex items-start gap-3">
          <Heart className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#334155] leading-relaxed">
            <strong className="text-[#0B1E36]">Principio de Gracia:</strong> El Botiquín de Encuentro con Dios y los primeros auxilios para crisis nocturnas son y serán siempre de <strong>acceso libre y gratuito</strong>. Ningún hombre ni mujer debe pagar por ser consolado o recibir la Palabra en su momento de aflicción.
          </p>
        </div>

        {/* Pricing comparison */}
        <div className="space-y-4 mb-6">
          {/* Plan Gratuito Perpetuo */}
          <div className="p-5 rounded-[14px] border border-[#CBD5E1] bg-[#F8FAFC]">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[15px] font-bold text-[#0B1E36]">Botiquín de Encuentro y Oración</span>
              <span className="text-[12px] text-[#059669] font-bold uppercase tracking-wider bg-[#ECFDF5] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]">
                Acceso libre perpetuo
              </span>
            </div>
            <ul className="space-y-2 text-[13px] text-[#334155]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Protocolo de entrega para hombres y mujeres ante cualquier necesidad</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Santuario para hombres y mujeres: calma fisiológica y libertad de culpa</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Pausa diafragmática 4×4 y anclaje sensorial 5-4-3-2-1</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Diario de gratitud y primeros 7 días libres del Mapa de Vida</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Almacenamiento confidencial y seguro en tu propio dispositivo</span>
              </li>
            </ul>
          </div>

          {/* Suscripción Mensual 30 Días */}
          <div className="p-5 rounded-[14px] border-2 border-[#F59E0B] bg-gradient-to-b from-[#FFFBEB] to-[#FFFFFF] shadow-sm">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[15px] font-bold text-[#0B1E36]">Programa Mensual Completo (30 Días)</span>
              <span className="text-[16px] tabular-nums font-bold text-[#0B1E36]">
                4.99 USD <span className="text-[12px] text-[#64748B] font-normal">/ mes</span>
              </span>
            </div>
            <p className="text-[12.5px] text-[#64748B] mb-3">
              Sostiene este ministerio y proporciona el mapa completo de 30 días para edificar un hábito duradero en tus 4 cuadrantes.
            </p>
            <ul className="space-y-2 text-[13px] text-[#334155]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span><strong>El Mapa de 30 Días:</strong> 5 semanas estructuradas con principios diarios, versículos y acciones prácticas</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span><strong>Catálogo completo de audios de fe:</strong> vigilias de insomnio prolongado y paisajes sonoros devocionales</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span><strong>Consolidación mensual:</strong> acompañamiento continuado para romper el ciclo de rumiación y desánimo</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>Acceso sin conexión permanente y soporte de actualizaciones</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2 border-t border-[#E2E8F0]">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[13.5px] font-bold transition-all shadow-sm cursor-pointer border border-[#F59E0B]/30"
          >
            Entendido, continuar al botiquín
          </button>
        </div>
      </div>
    </div>
  );
};
