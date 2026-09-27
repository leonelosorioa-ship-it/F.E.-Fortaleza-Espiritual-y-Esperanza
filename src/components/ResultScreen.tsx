import React, { useState } from 'react';
import { AnchorContent, UserRoleProfile } from '../types';
import { ROLE_PROFILE_OPTIONS, SYMPTOM_OPTIONS } from '../data/anchors';
import { BreathingGuide } from './BreathingGuide';
import { SensoryGrounding } from './SensoryGrounding';
import { BookOpen, Sparkles, Moon, ArrowLeft, SunMedium, Compass, Heart, Share2, Check } from 'lucide-react';

interface ResultScreenProps {
  content: AnchorContent;
  userReflection?: string;
  roleProfile?: UserRoleProfile;
  onFinishAndRest: () => void;
  onStartOver: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  content,
  userReflection,
  roleProfile = 'madre_profesional',
  onFinishAndRest,
  onStartOver,
}) => {
  const [isRestingMode, setIsRestingMode] = useState<boolean>(false);
  const [showSensoryModal, setShowSensoryModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const roleInfo = ROLE_PROFILE_OPTIONS.find((r) => r.id === roleProfile) || ROLE_PROFILE_OPTIONS[0];
  const symptomInfo = SYMPTOM_OPTIONS.find((s) => s.id === content.symptomId);

  const getRolePersonalizedAffirmation = () => {
    switch (roleProfile) {
      case 'hombre_fe':
        return 'Dios renueva mi fuerza y guía mis pasos con rectitud. No dependo de mi autosuficiencia; mi provisión, mi liderazgo y mi paz provienen del Señor todopoderoso.';
      case 'mujer_fe':
        return 'Soy preciosa a los ojos de Dios. En su presencia encuentro gracia infinita; suelto las expectativas humanas y descanso sabiendo que el Padre sostiene a mi familia y mi corazón.';
      case 'madre_profesional':
        return 'Mi valor no se mide por la perfección ni el agotamiento de mis fuerzas. Dios me abraza con ternura; mi ansiedad nocturna, taquicardia o sobrecarga no es falta de fe, sino la señal para soltar el control y descansar en sus brazos de amor incondicional.';
      case 'padre_familia':
        return 'Mi casa y mis hijos están consagrados al Señor. La paz de Cristo guarda nuestro hogar y su fidelidad nos acompaña de generación en generación.';
      case 'profesional_creyente':
      default:
        return 'Mi vocación está en las manos de Dios. Camino con integridad y descanso en que el Señor prospera la labor de mis manos y me bendice abundantemente.';
    }
  };

  const handleCopyPrayer = () => {
    const textToCopy = `${content.scripture.verse} (${content.scripture.reference})\n\nDeclaración: ${content.declaration}\n\nOración:\n1. ${content.liturgy.step1.title}: ${content.liturgy.step1.body}\n2. ${content.liturgy.step2.title}: ${content.liturgy.step2.body}\n3. ${content.liturgy.step3.title}: ${content.liturgy.step3.body}`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isRestingMode) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/40 flex items-center justify-center text-[#F59E0B] mb-6 shadow-md">
          <Heart className="w-8 h-8 fill-[#F59E0B]/20" strokeWidth={1.75} />
        </div>
        <span className="text-[11.5px] uppercase tracking-widest font-semibold text-[#F59E0B] mb-2">
          Tiempo en la Presencia de Dios
        </span>
        <h1 className="font-editorial text-[26px] sm:text-[32px] text-[#F1F5F9] font-normal mb-3">
          La paz de Dios queda contigo
        </h1>
        <p className="text-[14.5px] text-[#CBD5E1] max-w-[46ch] mb-8 leading-relaxed mx-auto">
          Has depositado tus anhelos en las manos del Creador. Puedes descansar en paz, sabiendo que Aquel que comenzó la buena obra en ti la perfeccionará.
        </p>

        <div className="p-5 rounded-[16px] border border-white/[0.08] bg-[#0B1728] max-w-[460px] mb-8 text-left shadow-sm space-y-1">
          <span className="text-[10.5px] font-semibold tracking-wider uppercase text-[#F59E0B] block">
            Palabra para tu reposo
          </span>
          <p className="font-editorial text-[15px] text-[#F1F5F9] italic">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] font-medium text-[#94A3B8] block">{content.morningSeed.reference}</span>
        </div>

        <button
          type="button"
          onClick={onFinishAndRest}
          className="min-h-[48px] px-8 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[13.5px] transition-colors cursor-pointer shadow-md"
        >
          Volver al botiquín
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-6 sm:py-8 space-y-7 animate-fade-in">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span>Elegir otro momento</span>
        </button>

        <div className="flex items-center gap-2">
          {symptomInfo?.quadrantLabel && (
            <span className="text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
              {symptomInfo.quadrantLabel}
            </span>
          )}
          <span className="text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.04] text-[#CBD5E1] border border-white/[0.08]">
            {roleInfo.label}
          </span>
          <button
            type="button"
            onClick={handleCopyPrayer}
            className="min-h-[36px] px-3 py-1 rounded-[8px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[12px] font-medium text-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copiar texto de oración"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2} />
                <span className="text-[#10B981] font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={1.75} />
                <span>Guardar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User reflection if present */}
      {userReflection && userReflection.trim() && (
        <div className="p-4 rounded-[14px] bg-[#0E223D]/70 border border-white/[0.08] text-[#CBD5E1]">
          <span className="text-[10.5px] uppercase tracking-wider text-[#F59E0B] block mb-1 font-semibold">
            Tu conversación con Dios hoy:
          </span>
          <p className="font-editorial text-[14.5px] italic text-[#F1F5F9]">
            «{userReflection}»
          </p>
        </div>
      )}

      {/* 1. Promesa Bíblica Viva */}
      <section className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
            <h2 className="text-[12px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Palabra de Dios para tu Vida
            </h2>
          </div>
          <span className="text-[11.5px] font-semibold text-[#F59E0B] bg-[#F59E0B]/15 px-3 py-0.5 rounded-full border border-[#F59E0B]/30">
            {content.scripture.reference}
          </span>
        </div>

        <blockquote className="font-editorial text-[18px] sm:text-[21px] text-[#F1F5F9] leading-relaxed border-l-2 border-[#F59E0B] pl-4 py-1 italic">
          «{content.scripture.verse}»
        </blockquote>

        <p className="text-[13.5px] text-[#94A3B8] leading-relaxed pt-1">
          {content.scripture.contextNote}
        </p>
      </section>

      {/* 2. Declaración de Anclaje y Fe */}
      <section className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-3.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
          <h2 className="text-[12px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
            Declaración de Fe para tu Corazón
          </h2>
        </div>

        <p className="font-editorial text-[17px] sm:text-[19px] text-[#F1F5F9] leading-relaxed">
          «{content.declaration}»
        </p>

        {/* Declaración contextualizada al rol */}
        <div className="pt-3 border-t border-white/[0.06] bg-[#0E223D]/60 p-4 rounded-[12px] space-y-1">
          <span className="text-[10.5px] font-semibold tracking-wider uppercase text-[#F59E0B] block">
            Enfoque para {roleInfo.label.toLowerCase()}:
          </span>
          <p className="font-editorial text-[14.5px] text-[#CBD5E1] italic leading-relaxed">
            «{getRolePersonalizedAffirmation()}»
          </p>
        </div>
      </section>

      {/* 3. Fisiología: Pausa de paz y respiración 4x4 */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#10B981]" strokeWidth={1.75} />
            <h2 className="text-[12px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Pausa de Serenidad • Fisiología del Sosiego
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowSensoryModal(!showSensoryModal)}
            className="text-[12px] text-[#F59E0B] hover:text-[#D97706] font-medium flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>{showSensoryModal ? 'Ocultar 5-4-3-2-1' : 'Ver anclaje sensorial'}</span>
          </button>
        </div>

        {/* Breathing guide component */}
        <BreathingGuide />

        {/* Sensory grounding interactive panel if toggled */}
        {showSensoryModal && (
          <div className="mt-4">
            <SensoryGrounding onClose={() => setShowSensoryModal(false)} />
          </div>
        )}
      </section>

      {/* 4. Oración Guiada de Entrega en Tres Tiempos */}
      <section className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-2">
          <SunMedium className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
          <h2 className="text-[12px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
            Oración Guiada de Entrega en Tres Tiempos
          </h2>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.06] space-y-1">
            <h3 className="text-[13.5px] font-semibold text-[#F1F5F9]">
              {content.liturgy.step1.title}
            </h3>
            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              {content.liturgy.step1.body}
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.06] space-y-1">
            <h3 className="text-[13.5px] font-semibold text-[#F1F5F9]">
              {content.liturgy.step2.title}
            </h3>
            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              {content.liturgy.step2.body}
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.06] space-y-1">
            <h3 className="text-[13.5px] font-semibold text-[#F1F5F9]">
              {content.liturgy.step3.title}
            </h3>
            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              {content.liturgy.step3.body}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semilla de Paz para el descanso */}
      <section className="p-5 rounded-[16px] bg-[#0E223D]/80 border border-[#F59E0B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <span className="text-[10.5px] font-semibold tracking-wider uppercase text-[#F59E0B] block">
            Semilla para tu descanso o jornada
          </span>
          <p className="font-editorial text-[14.5px] text-[#F1F5F9] italic">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] text-[#CBD5E1] font-medium block">{content.morningSeed.reference}</span>
        </div>
      </section>

      {/* Botones de Cierre */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setIsRestingMode(true)}
          className="flex-1 min-h-[48px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] text-[14px] font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Moon className="w-4 h-4" strokeWidth={1.75} />
          <span>Apagar pantalla y descansar en Dios</span>
        </button>

        <button
          type="button"
          onClick={onFinishAndRest}
          className="min-h-[48px] px-6 py-2.5 rounded-[12px] bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] text-[#CBD5E1] text-[13.5px] font-medium transition-colors cursor-pointer"
        >
          Volver al botiquín
        </button>
      </div>
    </div>
  );
};
