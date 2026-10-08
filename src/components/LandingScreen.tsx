import React from 'react';
import { HeroCoupleIllustration } from './HeroCoupleIllustration';
import { MapaCuadrantesInteractive } from './MapaCuadrantesInteractive';
import { MentoresGuiaSection } from './MentoresGuiaSection';
import { FlexiHeroAnimation } from './FlexiHeroAnimation';
import { UserRoleProfile, SymptomId } from '../types';

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
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartFlow,
  onOpenPlan,
  onOpenAuth,
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
      />

      {/* 2. Emblema Visual de Hombre y Mujer en Dios */}
      <HeroCoupleIllustration
        onStart={() => onStartFlow('hombre_fe', 'presencia')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
      />

      {/* 3. El Mapa Interactivo de los 4 Cuadrantes: Cuerpo, Mente, Alma, Propósito */}
      <MapaCuadrantesInteractive onSelectQuadrantFlow={handleQuadrantFlow} />

      {/* 4. Nuestros Guías y Mentores Espirituales: Clara Luz y Leo */}
      <MentoresGuiaSection
        onSelectMentor={(role, symptom) => onStartFlow(role, symptom)}
        onOpenPlanDetails={onOpenPlan}
      />
    </div>
  );
};
