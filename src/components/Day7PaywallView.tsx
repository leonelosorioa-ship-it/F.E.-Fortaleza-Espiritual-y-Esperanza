import React from 'react';
import { ShieldCheck, Heart, Sparkles, Check, ArrowRight, ArrowLeft, Lock, Compass, Anchor } from 'lucide-react';

interface Day7PaywallProps {
  onBackToFreeBotiquin: () => void;
  onProceedPurchase?: () => void;
}

export const Day7PaywallView: React.FC<Day7PaywallProps> = ({
  onBackToFreeBotiquin,
  onProceedPurchase,
}) => {
  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-8 sm:py-10 space-y-7 animate-fade-in">
      {/* Return link */}
      <button
        type="button"
        onClick={onBackToFreeBotiquin}
        className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
        <span>Volver al botiquín gratuito</span>
      </button>

      {/* Completion Badge */}
      <div className="text-center space-y-2 max-w-[580px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#34D399] text-[11px] font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
          <span>Semana 1 Completada con Éxito</span>
        </div>

        <h1 className="font-editorial text-[26px] sm:text-[32px] text-[#F1F5F9] font-normal leading-tight">
          Construye un refugio a prueba de tormentas
        </h1>

        <p className="text-[14.5px] text-[#CBD5E1] leading-relaxed mx-auto">
          Has recorrido los primeros 7 días libres de la ruta. Experimentaste que calmar el cuerpo y la mente con la Palabra de Dios no es una utopía, sino un hábito fisiológico y espiritual.
        </p>
      </div>

      {/* Rescate vs Rehabilitación Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Rescate (Botiquín Gratuito Permanente) */}
        <div className="p-6 rounded-[18px] bg-[#0B1728] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34D399] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                Rescate • Gratuito
              </span>
              <span className="text-[12px] text-[#94A3B8]">Para siempre</span>
            </div>

            <h2 className="font-editorial text-[19px] text-[#F1F5F9] font-normal">
              Botiquín de Primeros Auxilios
            </h2>

            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              El puerto seguro al que siempre puedes volver ante un ataque de pánico o una noche de insomnio. Jamás cobraremos por consolar tu aflicción.
            </p>

            <ul className="space-y-2 text-[12.5px] text-[#CBD5E1] pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Pausa diafragmática 4×4 y enraizamiento 5-4-3-2-1</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Oraciones de entrega para momentos agudos</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" strokeWidth={2} />
                <span>Diario de gratitud y acceso confidencial offline</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={onBackToFreeBotiquin}
            className="w-full min-h-[46px] px-4 py-2 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.08] text-[#F1F5F9] border border-white/[0.12] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Continuar en el botiquín gratuito
          </button>
        </div>

        {/* Card 2: Rehabilitación (Proceso 30 Días con Clara Luz y Leo) */}
        <div className="p-6 rounded-[18px] bg-gradient-to-b from-[#0E223D] to-[#0A1A2F] border-2 border-[#F59E0B] flex flex-col justify-between space-y-4 shadow-xl relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#FBBF24] bg-[#F59E0B]/20 px-2.5 py-0.5 rounded-full border border-[#F59E0B]/40">
                Rehabilitación • 30 Días
              </span>
              <span className="text-[16px] font-bold text-[#F59E0B] tabular-nums">
                12.99 USD
              </span>
            </div>

            <h2 className="font-editorial text-[19px] text-[#F1F5F9] font-normal">
              El Mapa Completo con Clara Luz y Leo
            </h2>

            <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
              Consolida la paz duradera. Desbloquea las semanas 2 a 5 para edificar tus 4 cuadrantes (Cuerpo, Mente, Alma y Propósito) con tus dos mentores de fe.
            </p>

            <ul className="space-y-2 text-[12.5px] text-[#F1F5F9] pt-1">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>Días 8 a 30:</strong> itinerario diario de renovación y neuroplasticidad</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>Vigilias sonoras de insomnio:</strong> narraciones de Clara Luz y Leo</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={2} />
                <span><strong>Pago único:</strong> sin membresías ni cobros sorpresa recurrentes</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <button
              type="button"
              onClick={onProceedPurchase || onBackToFreeBotiquin}
              className="w-full min-h-[48px] px-5 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[13.5px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Desbloquear 30 días (12.99 USD)</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
            <span className="text-[11px] text-[#94A3B8] text-center block">
              Garantía de gracia • Acceso vitalicio en tu dispositivo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
