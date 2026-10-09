import React from 'react';
import {
  ShieldCheck,
  Heart,
  Sparkles,
  Check,
  X,
  Compass,
  Brain,
  Globe,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface FaithTechDifferentiationSectionProps {
  onOpenPlanDetails?: () => void;
  onStart30Days?: () => void;
  onExploreFreeBotiquin?: () => void;
}

export const FaithTechDifferentiationSection: React.FC<FaithTechDifferentiationSectionProps> = ({
  onOpenPlanDetails,
  onStart30Days,
  onExploreFreeBotiquin,
}) => {
  return (
    <section
      aria-label="Diferenciación y Enfoque FaithTech: Ciencia, Gracia y Salud Mental"
      className="w-full rounded-[24px] sm:rounded-[32px] bg-gradient-to-b from-[#0B1E36] via-[#09172A] to-[#060F1E] border border-[#F59E0B]/30 p-6 sm:p-10 shadow-2xl space-y-8 sm:space-y-10 relative overflow-hidden"
    >
      {/* Glow ambiental de fondo */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header con propuesta de valor insignia */}
      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-3.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#34D399] text-[11px] sm:text-[11.5px] font-bold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
          <span>La Nueva Era de la Espiritualidad • FaithTech</span>
        </div>

        <h2 className="font-editorial text-[26px] xs:text-[30px] sm:text-[36px] text-[#F1F5F9] font-normal leading-[1.2] tracking-tight">
          «Tu fe y tu salud mental no son enemigas;{' '}
          <span className="text-[#F59E0B] italic font-semibold">
            caminan juntas hacia la paz
          </span>»
        </h2>

        <p className="text-[14.5px] sm:text-[16px] text-[#CBD5E1] leading-relaxed max-w-[62ch] mx-auto font-medium">
          <strong className="text-[#38BDF8]">Sentir ansiedad no es falta de fe, te hace humano.</strong>{' '}
          Combinamos la neurociencia del sistema nervioso, la psicología práctica y las promesas vivas de la Palabra para 550 millones de hispanohablantes libres de culpa o estigma religioso.
        </p>

        {/* 3 Pilares Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
          <div className="p-3.5 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.08] flex items-start gap-2.5">
            <Brain className="w-5 h-5 text-[#38BDF8] shrink-0 mt-0.5" />
            <div className="text-[12px]">
              <strong className="text-[#F1F5F9] block">Fisiología & Neurociencia</strong>
              <span className="text-[#94A3B8]">Respiración 4×4 y enraizamiento 5-4-3-2-1 para frenar el pánico.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.08] flex items-start gap-2.5">
            <Heart className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="text-[12px]">
              <strong className="text-[#F1F5F9] block">Trascendencia en Dios</strong>
              <span className="text-[#94A3B8]">Oraciones de entrega real y promesas que desarman la rumiación.</span>
            </div>
          </div>
          <div className="p-3.5 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.08] flex items-start gap-2.5">
            <Globe className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
            <div className="text-[12px]">
              <strong className="text-[#F1F5F9] block">Acompañamiento Inmutable</strong>
              <span className="text-[#94A3B8]">Tu guía elegido (Clara Luz o Leo) te acompaña los 30 días sin cambios.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABLA COMPARATIVA DE MERCADO: Por qué Tu Poder Mental F.E.™ es diferente */}
      <div className="relative z-10 space-y-4">
        <div className="text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] block">
            Posicionamiento y Diferenciación Competitiva
          </span>
          <h3 className="text-[18px] sm:text-[21px] font-semibold text-[#F1F5F9]">
            ¿En qué se diferencia frente a otras opciones del mercado?
          </h3>
        </div>

        <div className="overflow-x-auto rounded-[18px] border border-white/[0.1] bg-[#071322]">
          <table className="w-full text-left border-collapse text-[12.5px] sm:text-[13px]">
            <thead>
              <tr className="border-b border-white/[0.1] bg-[#0B1E36]/80 text-[#94A3B8]">
                <th className="py-3 px-4 sm:px-5 font-semibold text-[#F1F5F9]">Plataforma / Enfoque</th>
                <th className="py-3 px-3 sm:px-4 font-semibold">Respaldo Emocional Agudo</th>
                <th className="py-3 px-3 sm:px-4 font-semibold">Espiritualidad Bíblica</th>
                <th className="py-3 px-3 sm:px-4 font-semibold">Modelo de Cobro</th>
                <th className="py-3 px-3 sm:px-4 font-semibold">Personalización</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-[#CBD5E1]">
              {/* Opción 1: YouVersion */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-5 font-medium text-[#F1F5F9]">
                  Apps Bíblicas Tradicionales <span className="text-[11px] text-[#94A3B8] block">(ej. YouVersion)</span>
                </td>
                <td className="py-3.5 px-3 sm:px-4">
                  <span className="inline-flex items-center gap-1.5 text-[#F87171]">
                    <X className="w-3.5 h-3.5" />
                    <span>Sin protocolos clínicos para pánico/insomnio</span>
                  </span>
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#34D399] font-medium">
                  Excelente catálogo bíblico
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#94A3B8]">
                  Gratuito pero genérico
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#94A3B8]">
                  Sin mentoría dedicada
                </td>
              </tr>

              {/* Opción 2: Hallow / Glorify */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-5 font-medium text-[#F1F5F9]">
                  Apps de Meditación Cristiana <span className="text-[11px] text-[#94A3B8] block">(ej. Hallow, Glorify)</span>
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#CBD5E1]">
                  Enfocadas en audios devocionales
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#34D399] font-medium">
                  Contenido cristiano
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#FBBF24]">
                  Suscripciones costosas en dólares ($60–$90 USD/año)
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#94A3B8]">
                  Contenido prediseñado masivo
                </td>
              </tr>

              {/* Opción 3: Calm / Headspace */}
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-5 font-medium text-[#F1F5F9]">
                  Mindfulness Secular <span className="text-[11px] text-[#94A3B8] block">(ej. Calm, Headspace)</span>
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#34D399]">
                  Técnicas científicas de respiración
                </td>
                <td className="py-3.5 px-3 sm:px-4">
                  <span className="inline-flex items-center gap-1.5 text-[#F87171]">
                    <X className="w-3.5 h-3.5" />
                    <span>Desconectado de la fe y la oración</span>
                  </span>
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#94A3B8]">
                  Suscripción mensual recurrente
                </td>
                <td className="py-3.5 px-3 sm:px-4 text-[#94A3B8]">
                  Voces neutras sin marco bíblico
                </td>
              </tr>

              {/* Opción Ganadora: Tu Poder Mental F.E. */}
              <tr className="bg-gradient-to-r from-[#0E2849]/80 via-[#0B233F]/90 to-[#0A1A2F]/80 border-t-2 border-[#F59E0B]">
                <td className="py-4 px-4 sm:px-5 font-bold text-[#FBBF24] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F59E0B]" />
                  <span>Tu Poder Mental F.E.™</span>
                </td>
                <td className="py-4 px-3 sm:px-4 text-[#10B981] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Protocolo 4×4, somático y litúrgico</span>
                  </div>
                </td>
                <td className="py-4 px-3 sm:px-4 text-[#10B981] font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                    <span>Oraciones vivas sin culpa ni juicio</span>
                  </div>
                </td>
                <td className="py-4 px-3 sm:px-4 text-[#F59E0B] font-bold">
                  <div>USD 7.99 / $29.900 COL</div>
                  <span className="text-[11px] text-[#34D399] font-semibold uppercase">Pago Único (Cero mensualidades)</span>
                </td>
                <td className="py-4 px-3 sm:px-4 text-[#38BDF8] font-semibold">
                  <div>Mentor inmutable por 30 días</div>
                  <span className="text-[11px] text-[#CBD5E1]">(Clara Luz o Leo)</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. MODELO RESCATE VS. REHABILITACIÓN CON DEMOSTRACIÓN PREVIA (FIRST WIN) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Nivel de Rescate: 100% Gratuito y Libre */}
        <div className="p-6 rounded-[20px] bg-[#071322] border border-white/[0.08] flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#34D399] bg-[#10B981]/15 px-3 py-0.5 rounded-full border border-[#10B981]/30">
                Nivel 1 • Rescate Inmediato
              </span>
              <span className="text-[11px] font-semibold text-[#CBD5E1]">100% Libre y Perpetuo</span>
            </div>

            <h4 className="font-editorial text-[20px] sm:text-[22px] text-[#F1F5F9] font-normal">
              Botiquín de Auxilio y Emergencia
            </h4>

            <p className="text-[13px] text-[#94A3B8] leading-relaxed">
              En momentos de taquicardia, llanto o pánico nocturno, <strong>nadie debe pagar por ser consolado</strong>. El auxilio es y será siempre gratuito, confidencial y sin registros obligatorios.
            </p>

            <ul className="space-y-2 text-[12.5px] text-[#CBD5E1]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Pausa respiratoria diafragmática 4×4 para apagar el sistema simpático.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span>Enraizamiento sensorial 5-4-3-2-1 para frenar el mareo mental.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                <span><strong>Semana 1 Libre (Días 1 a 7):</strong> Experimenta tu primera victoria emocional (<em>First Win</em>).</span>
              </li>
            </ul>
          </div>

          {onExploreFreeBotiquin && (
            <button
              type="button"
              onClick={onExploreFreeBotiquin}
              className="w-full py-3 px-4 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.09] text-[#CBD5E1] hover:text-white border border-white/[0.1] text-[13px] font-medium transition-colors cursor-pointer text-center"
            >
              Usar Botiquín Gratuito
            </button>
          )}
        </div>

        {/* Nivel de Rehabilitación: Proceso de 30 Días con Único Pago */}
        <div className="p-6 rounded-[20px] bg-gradient-to-b from-[#0E2849] via-[#0A1F38] to-[#071322] border-2 border-[#F59E0B] shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FBBF24] bg-[#F59E0B]/20 px-3 py-0.5 rounded-full border border-[#F59E0B]/40">
                Nivel 2 • Rehabilitación Profunda
              </span>
              <div className="text-right">
                <span className="text-[18px] font-bold text-[#F59E0B] tabular-nums block leading-tight">
                  USD 7.99 <span className="text-[11px] font-normal text-[#FBBF24]">(Pago Único)</span>
                </span>
                <span className="text-[11px] font-medium text-[#CBD5E1]">o $29.900 COL</span>
              </div>
            </div>

            <h4 className="font-editorial text-[20px] sm:text-[22px] text-[#F1F5F9] font-normal">
              Programa Estructurado de 30 Días
            </h4>

            <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
              La sanidad del sistema nervioso y la consolidación de la fe toman entre 21 y 30 días continuos. Construye una muralla de paz con tu guía personal inmutable (Clara Luz o Leo).
            </p>

            <ul className="space-y-2 text-[12.5px] text-[#E2E8F0]">
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span><strong>Racha en la Gracia (Sin Culpa):</strong> Si un día no puedes, no pierdes tu progreso ni se reinicia a cero.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span><strong>Micro-hábitos de 3 a 5 minutos:</strong> Sesiones breves diseñadas para personas ocupadas.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span><strong>Garantía de Satisfacción de 7 Días:</strong> Seguridad total y acompañamiento real.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={onStart30Days || onOpenPlanDetails}
              className="flex-1 py-3.5 px-5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#060F1E] font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>Comenzar Ruta 30 Días (USD 7.99)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. RESPUESTA A OBJECIONES COMUNES (EMBUDO DE CONVERSIÓN & CONFIANZA) */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] space-y-4">
        <div className="text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Transparencia y Paz Mental
          </span>
          <h3 className="text-[17px] sm:text-[19px] font-semibold text-[#F1F5F9]">
            Preguntas Frecuentes y Respuestas a Objeciones
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-[12.5px]">
          <div className="p-4 rounded-[14px] bg-[#071322] border border-white/[0.06] space-y-1.5">
            <strong className="text-[#F1F5F9] block font-semibold">
              ¿Sentir ansiedad o insomnio significa que tengo poca fe?
            </strong>
            <p className="text-[#94A3B8] leading-relaxed">
              En absoluto. El sistema nervioso responde a la sobrecarga biológica. El mismo Jesús experimentó angustia profunda y sudor como gotas de sangre en Getsemaní. La fe abraza tu fragilidad y te da herramientas reales para descansar.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#071322] border border-white/[0.06] space-y-1.5">
            <strong className="text-[#F1F5F9] block font-semibold">
              ¿Tendré cobros recurrentes o membresías sorpresa cada mes?
            </strong>
            <p className="text-[#94A3B8] leading-relaxed">
              Nunca. Creemos en la transparencia y en la economía de las familias en Latinoamérica y EE.UU. Es un único pago de USD 7.99 o $29.900 COL para todo el programa de 30 días, sin suscripciones automáticas.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#071322] border border-white/[0.06] space-y-1.5">
            <strong className="text-[#F1F5F9] block font-semibold">
              ¿Por qué el guía seleccionado (Clara Luz o Leo) no se puede cambiar?
            </strong>
            <p className="text-[#94A3B8] leading-relaxed">
              Porque la personalización genuina y la intimidad pastoral requieren coherencia. Tu guía te acompaña a lo largo de los 30 días, recordando tu proceso y orando contigo con un tono adaptado a tus necesidades espirituales.
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#071322] border border-white/[0.06] space-y-1.5">
            <strong className="text-[#F1F5F9] block font-semibold">
              ¿Qué ocurre si un día no tengo tiempo de hacer la sesión?
            </strong>
            <p className="text-[#94A3B8] leading-relaxed">
              Aplicamos el <strong>Principio de la Gracia</strong> (<em>Grace-Based Streaks</em>). Tu contador no vuelve a cero ni recibes notificaciones de culpa. Al día siguiente retomas exactamente donde quedaste, con los brazos abiertos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
