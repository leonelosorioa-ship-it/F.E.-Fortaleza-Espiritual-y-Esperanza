import React from 'react';
import { Heart, ArrowRight, Compass, HeartHandshake, Volume2, ShieldCheck, Moon, Sparkles } from 'lucide-react';
import { HeroCoupleIllustration } from './HeroCoupleIllustration';
import { MapaCuadrantesInteractive } from './MapaCuadrantesInteractive';
import { MentoresGuiaSection } from './MentoresGuiaSection';
import { BrandValuesRibbon } from './BrandValuesRibbon';
import { UserRoleProfile, SymptomId } from '../types';

interface LandingScreenProps {
  onStartFlow: (initialRole?: UserRoleProfile, initialSymptom?: SymptomId) => void;
  onOpenPlan: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartFlow,
  onOpenPlan,
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
}) => {
  const handleStartMotherSanctuary = () => {
    onStartFlow('madre_profesional', 'ansiedad_noche');
  };

  const handleQuadrantFlow = (symptomId: SymptomId, role?: UserRoleProfile) => {
    onStartFlow(role || 'hombre_fe', symptomId);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-8 animate-fade-in">
      {/* 
        1. HERO SECTION OPTIMIZADO PARA VIEWPORT DE 375px (MOBILE FIRST)
        Cabe en la primera pantalla a 375px sin scroll obligatorio:
        - Badge editorial
        - Titular con la Promesa exacta
        - Línea de apoyo
        - Botón de acción principal con área tocable >= 44px
      */}
      <div className="relative rounded-[20px] bg-gradient-to-b from-[#0B1728] via-[#0E223D] to-[#060F1E] border border-white/[0.08] p-4 sm:p-7 text-[#F1F5F9] shadow-xl overflow-hidden">
        <div className="space-y-3 max-w-[65ch]">
          {/* Badge Editorial */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={1.75} />
            <span>Santuario Litúrgico & Fisiológico</span>
          </div>

          {/* Titular con la Promesa Estricta */}
          <h1 className="font-editorial text-[20px] sm:text-[28px] text-[#F1F5F9] font-normal leading-snug tracking-tight">
            Para el creyente abrumado, obtén un ancla de paz y descanso del sistema nervioso sin sentir culpa religiosa.
          </h1>

          {/* Línea de Apoyo */}
          <p className="text-[13px] sm:text-[14.5px] text-[#CBD5E1] leading-relaxed">
            Si la ansiedad nocturna, la sobrecarga o el insomnio te visitan hoy, tu cuerpo no está fallando espiritualmente. Respira y entrega el control.
          </p>

          {/* Botón Principal y Acceso Rápido */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <button
              type="button"
              onClick={() => onStartFlow('madre_profesional', 'ansiedad_noche')}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            >
              <span>Iniciar botiquín de paz</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>

            <button
              type="button"
              onClick={handleStartMotherSanctuary}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-[#CBD5E1] border border-white/[0.1] text-[13px] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Moon className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Calma Nocturna (Madres y Profesionales)</span>
            </button>
          </div>

          {/* Métricas de Confianza sutiles */}
          <div className="pt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-[11.5px] text-[#94A3B8]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={1.75} />
              Refugio 100% gratuito permanente
            </span>
            <span>•</span>
            <span>Sin juicios • Confidencial en tu equipo</span>
          </div>
        </div>
      </div>

      {/* 2. Emblema Visual Armonioso de Hombre y Mujer en Dios */}
      <HeroCoupleIllustration
        onStart={() => onStartFlow('hombre_fe', 'presencia')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
      />

      {/* 3. El Mapa Interactivo de los 4 Cuadrantes: Cuerpo, Mente, Alma, Propósito */}
      <MapaCuadrantesInteractive onSelectQuadrantFlow={handleQuadrantFlow} />

      {/* 4. Nuestros 2 Guías y Mentores: Clara Luz y Leo */}
      <MentoresGuiaSection
        onSelectMentor={(role, symptom) => onStartFlow(role, symptom)}
        onOpenPlanDetails={onOpenPlan}
      />

      {/* 5. Cinta de Principios (Neurociencia + Verdad Bíblica) */}
      <BrandValuesRibbon />

      {/* 6. Módulos de Bienestar Espiritual y Hábitos */}
      <div className="space-y-3.5">
        <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1] block">
          Herramientas de Paz y Retención
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Módulo 1: Ruta 30 Días */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] hover:border-[#F59E0B]/50 text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            <div className="flex items-center justify-between mb-2">
              <Compass className="w-5 h-5 text-[#F59E0B]" strokeWidth={1.75} />
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
                Semana 1 Libre
              </span>
            </div>
            <h2 className="font-editorial text-[15.5px] text-[#F1F5F9] font-normal mb-1">
              Ruta 30 Días en Dios
            </h2>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">
              Itinerario estructurado con Clara Luz y Leo para entrenar tu mente y sistema nervioso.
            </p>
          </button>

          {/* Módulo 2: Diario de Gratitud con Jardín */}
          <button
            type="button"
            onClick={onOpenGratitude}
            className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] hover:border-[#10B981]/50 text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#10B981]"
          >
            <div className="flex items-center justify-between mb-2">
              <HeartHandshake className="w-5 h-5 text-[#10B981]" strokeWidth={1.75} />
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30">
                Jardín Vivo
              </span>
            </div>
            <h2 className="font-editorial text-[15.5px] text-[#F1F5F9] font-normal mb-1">
              Diario de Gratitud
            </h2>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">
              Siembra 3 regalos diarios para florecer un jardín botánico interior de alabanza.
            </p>
          </button>

          {/* Módulo 3: Audios de Fe */}
          <button
            type="button"
            onClick={onOpenAudios}
            className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] hover:border-[#6366F1]/50 text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#6366F1]"
          >
            <div className="flex items-center justify-between mb-2">
              <Volume2 className="w-5 h-5 text-[#0EA5E9]" strokeWidth={1.75} />
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-white/[0.05] text-[#CBD5E1]">
                Sueño & Reposo
              </span>
            </div>
            <h2 className="font-editorial text-[15.5px] text-[#F1F5F9] font-normal mb-1">
              Audios de Fe
            </h2>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">
              Lectura reposada de la Escritura con paisajes sonoros orgánicos de descanso.
            </p>
          </button>
        </div>
      </div>

      {/* 7. Rescate vs Rehabilitación: Transparencia del Proceso */}
      <div className="border border-white/[0.08] bg-[#0B1728] rounded-[18px] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-[480px]">
          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
              Botiquín Gratuito
            </span>
            <span className="text-[11.5px] font-semibold text-[#F59E0B]">
              • Programa de 30 Días: 12.99 USD (Pago Único)
            </span>
          </div>
          <h2 className="font-editorial text-[18px] text-[#F1F5F9] font-normal">
            Rescate inmediato permanente vs. Rehabilitación de 30 días
          </h2>
          <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">
            El botiquín para crisis nocturnas y oraciones de entrega siempre será gratuito. Para construir un refugio a prueba de tormentas, el proceso guiado con Clara Luz y Leo tiene un único pago de 12.99 USD (sin membresía ni suscripciones).
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPlan}
          className="min-h-[44px] px-5 py-2 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.1] text-[13px] font-medium text-[#F1F5F9] border border-white/[0.12] transition-colors shrink-0 cursor-pointer"
        >
          Consultar detalles
        </button>
      </div>
    </div>
  );
};
