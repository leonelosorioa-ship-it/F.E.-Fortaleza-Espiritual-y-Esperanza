import React, { useState } from 'react';
import { AnchorContent, UserRoleProfile } from '../types';
import { ROLE_PROFILE_OPTIONS, SYMPTOM_OPTIONS } from '../data/anchors';
import { BreathingGuide } from './BreathingGuide';
import { SensoryGrounding } from './SensoryGrounding';
import { BookOpen, Sparkles, Moon, ArrowLeft, SunMedium, Compass, Heart, Share2, Check, Activity, Brain } from 'lucide-react';

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
  roleProfile = 'hombre_fe',
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
      <div className="w-full min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-[#B45309] mb-6 shadow-md">
          <Heart className="w-8 h-8 text-[#D97706] fill-[#D97706]" />
        </div>
        <span className="text-[12px] uppercase tracking-[0.14em] font-bold text-[#D97706] mb-2">
          Tiempo en la Presencia de Dios
        </span>
        <h2 className="font-serif text-[28px] sm:text-[34px] text-[#0B1E36] font-normal mb-4">
          La paz de Dios queda contigo
        </h2>
        <p className="text-[16px] text-[#475569] max-w-[460px] mb-8 leading-relaxed">
          Has depositado tus anhelos en las manos del Creador. Puedes descansar o continuar tu día con gozo, sabiendo que Aquel que comenzó la buena obra en ti la perfeccionará.
        </p>

        <div className="p-5 rounded-[16px] border border-[#CBD5E1] bg-white max-w-[460px] mb-8 shadow-sm">
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#F59E0B] block mb-1">
            Palabra para tu Corazón
          </span>
          <p className="font-serif text-[16px] text-[#0B1E36] italic mb-1">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] font-bold text-[#D97706]">{content.morningSeed.reference}</span>
        </div>

        <button
          type="button"
          onClick={onFinishAndRest}
          className="min-h-[48px] px-8 py-3 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[14px] font-bold transition-all shadow-md cursor-pointer border border-[#F59E0B]/30"
        >
          Volver al botiquín
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          <span>Elegir otro momento</span>
        </button>

        <div className="flex items-center gap-2">
          {symptomInfo?.quadrantLabel && (
            <span className="text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
              {symptomInfo.quadrantLabel}
            </span>
          )}
          <span className="text-[11px] font-bold tracking-[0.06em] uppercase px-3 py-1 rounded-full bg-[#F1F5F9] text-[#0B1E36] border border-[#CBD5E1]">
            {roleInfo.label}
          </span>
          <button
            type="button"
            onClick={handleCopyPrayer}
            className="min-h-[36px] px-3 py-1 rounded-[8px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-[12px] font-semibold text-[#334155] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Copiar texto de oración"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={2.5} />
                <span className="text-[#10B981] font-bold">Copiado</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2} />
                <span>Guardar texto</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* User's unloaded thought if present */}
      {userReflection && userReflection.trim() && (
        <div className="p-4 rounded-[14px] bg-white border border-[#CBD5E1] text-[#334155] shadow-xs">
          <span className="text-[11px] uppercase tracking-[0.1em] text-[#D97706] block mb-1 font-bold">
            Tu conversación con Dios hoy:
          </span>
          <p className="font-serif text-[15px] italic text-[#0B1E36]">
            «{userReflection}»
          </p>
        </div>
      )}

      {/* 1. Promesa Bíblica Viva */}
      <section className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#0B1E36]">
            <BookOpen className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
            <span className="text-[13px] font-bold tracking-[0.1em] uppercase">
              Palabra de Dios para tu Vida
            </span>
          </div>
          <span className="text-[12px] font-bold text-[#D97706] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#FDE68A]">
            {content.scripture.reference}
          </span>
        </div>

        <blockquote className="font-serif text-[20px] sm:text-[22px] text-[#0B1E36] leading-[1.5] border-l-4 border-[#F59E0B] pl-4 py-1 italic">
          «{content.scripture.verse}»
        </blockquote>

        <p className="text-[14px] text-[#475569] leading-relaxed pt-1">
          {content.scripture.contextNote}
        </p>
      </section>

      {/* 2. Declaración de Anclaje y Fe */}
      <section className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <Sparkles className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase text-[#0B1E36]">
            Declaración de Fe para tu Corazón
          </span>
        </div>

        <p className="font-serif text-[18px] sm:text-[20px] text-[#0B1E36] leading-relaxed">
          «{content.declaration}»
        </p>

        {/* Declaración contextualizada al arquetipo */}
        <div className="pt-3 border-t border-[#E2E8F0] bg-[#F8FAFC] p-4 rounded-[12px]">
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#D97706] block mb-1">
            Enfoque para {roleInfo.label.toLowerCase()}:
          </span>
          <p className="font-serif text-[15px] text-[#334155] italic leading-relaxed">
            «{getRolePersonalizedAffirmation()}»
          </p>
        </div>

        <span className="text-[12px] text-[#64748B] block">
          Repítela con convicción: la verdad de Dios renueva tu mente y fortalece tu espíritu.
        </span>
      </section>

      {/* 3. Fisiología: Pausa de paz y respiración consciente */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase text-[#0B1E36] flex items-center gap-2">
            <Heart className="w-4 h-4 text-[#10B981]" />
            <span>Pausa de Serenidad (Respiración 4×4 en la Presencia de Dios)</span>
          </span>
          <button
            type="button"
            onClick={() => setShowSensoryModal(!showSensoryModal)}
            className="text-[12px] text-[#D97706] hover:text-[#0B1E36] font-bold flex items-center gap-1 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2} />
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
      <section className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <SunMedium className="w-5 h-5 text-[#F59E0B]" strokeWidth={2} />
          <span className="text-[13px] font-bold tracking-[0.1em] uppercase">
            Oración Guiada de Entrega en Tres Tiempos
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] space-y-1">
            <h4 className="text-[14px] font-bold text-[#0B1E36]">
              {content.liturgy.step1.title}
            </h4>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {content.liturgy.step1.body}
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] space-y-1">
            <h4 className="text-[14px] font-bold text-[#0B1E36]">
              {content.liturgy.step2.title}
            </h4>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {content.liturgy.step2.body}
            </p>
          </div>

          <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] space-y-1">
            <h4 className="text-[14px] font-bold text-[#0B1E36]">
              {content.liturgy.step3.title}
            </h4>
            <p className="text-[14px] text-[#334155] leading-relaxed">
              {content.liturgy.step3.body}
            </p>
          </div>
        </div>
      </section>

      {/* 5. Semilla de Paz para la Noche o el Amanecer */}
      <section className="p-5 rounded-[16px] bg-[#FEF3C7]/40 border border-[#FDE68A] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-[#B45309] block mb-1">
            Semilla para tu descanso o jornada
          </span>
          <p className="font-serif text-[15px] text-[#0B1E36] italic">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] text-[#D97706] font-bold">{content.morningSeed.reference}</span>
        </div>
      </section>

      {/* Botones de Cierre */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setIsRestingMode(true)}
          className="flex-1 min-h-[50px] px-6 py-3 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[14.5px] font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#F59E0B]/30"
        >
          <Moon className="w-4 h-4 text-[#FBBF24]" />
          <span>Apagar pantalla y descansar en Dios</span>
        </button>

        <button
          type="button"
          onClick={onFinishAndRest}
          className="min-h-[50px] px-6 py-3 rounded-[12px] bg-white border border-[#CBD5E1] hover:bg-[#F8FAFC] text-[#334155] text-[14px] font-bold transition-all cursor-pointer"
        >
          Volver al botiquín
        </button>
      </div>
    </div>
  );
};
