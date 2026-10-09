import React from 'react';
import { HeroCoupleIllustration } from './HeroCoupleIllustration';
import { MapaCuadrantesInteractive } from './MapaCuadrantesInteractive';
import { MentoresGuiaSection } from './MentoresGuiaSection';
import { FlexiHeroAnimation } from './FlexiHeroAnimation';
import { FaithTechDifferentiationSection } from './FaithTechDifferentiationSection';
import { UserRoleProfile, SymptomId } from '../types';
import { Sparkles, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
  onStartFlow: (initialRole?: UserRoleProfile, initialSymptom?: SymptomId) => void;
  onOpenPlan: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenReminders?: () => void;
  onOpenDailyPromise?: () => void;
  onOpenFiles?: () => void;
  onOpenGoogleDrive?: () => void;
  onOpenGoogleSheets?: () => void;
  onOpenJesusVideo?: (videoId?: string) => void;
  onOpenGallery?: () => void;
  onOpenSpiritualQuiz?: () => void;
  activeMentor?: 'clara_luz' | 'leo';
  onChooseMentorGuide?: (mentor: 'clara_luz' | 'leo') => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartFlow,
  onOpenPlan,
  onOpenAuth,
  onOpenSpiritualQuiz,
  activeMentor = 'clara_luz',
  onChooseMentorGuide,
}) => {
  const handleStartMotherSanctuary = () => {
    onStartFlow('madre_profesional', 'ansiedad_noche');
  };

  const handleQuadrantFlow = (symptomId: SymptomId, role?: UserRoleProfile) => {
    onStartFlow(role || 'hombre_fe', symptomId);
  };

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 space-y-7 sm:space-y-10 animate-fade-in overflow-hidden">
      {/* 1. Hero Principal con Animación y Llamado a la Calma */}
      <FlexiHeroAnimation
        onStartFlow={() => onStartFlow('hombre_fe', 'ansiedad_noche')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
        onOpenAuth={onOpenAuth}
        onOpenSpiritualQuiz={onOpenSpiritualQuiz}
      />

      {/* 2. Banner de Recepción: Evaluación de Entrada de 7 Preguntas */}
      {onOpenSpiritualQuiz && (
        <section
          aria-label="Evaluación espiritual de entrada"
          className="w-full rounded-[20px] sm:rounded-[26px] bg-gradient-to-r from-[#0B1E36] via-[#0E2849] to-[#081528] border border-[#F59E0B]/35 p-5 sm:p-7 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-5 transition-all relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2 text-center md:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnóstico Inicial Confidencial</span>
            </div>
            <h2 className="font-editorial text-[20px] sm:text-[25px] text-[#F1F5F9] font-normal leading-snug">
              ¿Cómo está tu estado de ánimo espiritual y conciencia hoy?
            </h2>
            <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed">
              En solo 7 preguntas, recibe un resumen profesional y espiritual con un bálsamo de esperanza. Toca tus dolores más profundos y descubre cómo el programa guiado de 30 días te ayuda a reconstruirte en Dios.
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onOpenSpiritualQuiz}
              className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#060F1E] font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Hacer Test de 7 Preguntas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      )}

      {/* 3. Emblema Visual de Hombre y Mujer en Dios */}
      <HeroCoupleIllustration
        onStart={() => onStartFlow('hombre_fe', 'presencia')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
      />

      {/* 4. El Mapa Interactivo de los 4 Cuadrantes: Cuerpo, Mente, Alma, Propósito */}
      <MapaCuadrantesInteractive onSelectQuadrantFlow={handleQuadrantFlow} />

      {/* 5. Nuestros Guías y Mentores Espirituales: Clara Luz y Leo */}
      <MentoresGuiaSection
        activeMentor={activeMentor}
        onChooseMentorGuide={onChooseMentorGuide}
        onSelectMentor={(role, symptom) => onStartFlow(role, symptom)}
        onOpenPlanDetails={onOpenPlan}
      />

      {/* 6. Enfoque FaithTech: Diferenciación Competitiva, Ciencia & Gracia */}
      <FaithTechDifferentiationSection
        onOpenPlanDetails={onOpenPlan}
        onStart30Days={() => {
          if (onChooseMentorGuide && activeMentor) {
            onChooseMentorGuide(activeMentor);
          } else {
            onOpenPlan();
          }
        }}
        onExploreFreeBotiquin={() => handleStartMotherSanctuary()}
      />
    </div>
  );
};
