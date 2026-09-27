import React, { useState } from 'react';
import { Heart, ArrowRight, Compass, HeartHandshake, Volume2, ShieldCheck, Sun, Moon, Sparkles, BookOpen, Activity, Brain } from 'lucide-react';
import { HeroCoupleIllustration } from './HeroCoupleIllustration';
import { MapaCuadrantesInteractive } from './MapaCuadrantesInteractive';
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
  const [email, setEmail] = useState<string>('');
  const [emailSaved, setEmailSaved] = useState<boolean>(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      onStartFlow();
      return;
    }

    try {
      const stored = localStorage.getItem('fe_subscriber_emails');
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(email.trim().toLowerCase())) {
        list.push(email.trim().toLowerCase());
        localStorage.setItem('fe_subscriber_emails', JSON.stringify(list));
      }
      setEmailSaved(true);
      setTimeout(() => {
        onStartFlow();
      }, 500);
    } catch {
      onStartFlow();
    }
  };

  const handleStartMotherSanctuary = () => {
    onStartFlow('madre_profesional', 'ansiedad_noche');
  };

  const handleQuadrantFlow = (symptomId: SymptomId, role?: UserRoleProfile) => {
    onStartFlow(role || 'hombre_fe', symptomId);
  };

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10">
      {/* 1. Hero Principal: El Mapa de tu Vida en Dios para Hombres y Mujeres */}
      <HeroCoupleIllustration
        onStart={() => onStartFlow('hombre_fe', 'presencia')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
      />

      {/* 2. El Mapa Interactivo de los 4 Cuadrantes: Cuerpo, Mente, Alma, Propósito */}
      <MapaCuadrantesInteractive onSelectQuadrantFlow={handleQuadrantFlow} />

      {/* 3. Nicho Especial Ampliado: Hombres y Mujeres en Crisis Nocturna y Sobrecarga */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#FFFBEB] via-[#FFFFFF] to-[#F0FDF4] border-2 border-[#F59E0B]/40 rounded-[18px] p-6 sm:p-7 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-[530px]">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#B45309] text-[11px] font-bold tracking-wider uppercase border border-[#F59E0B]/30">
                <Moon className="w-3.5 h-3.5 text-[#D97706]" />
                Santuario de Calma Nocturna
              </span>
              <span className="text-[11px] text-[#64748B] hidden sm:inline">
                • Para hombres y mujeres • Sin juicios ni culpa
              </span>
            </div>

            <h3 className="font-serif text-[20px] sm:text-[23px] text-[#0F172A] font-normal leading-snug">
              Para hombres y mujeres, madres y profesionales en crisis de ansiedad nocturna:
            </h3>

            <p className="text-[13.5px] text-[#334155] leading-relaxed">
              Obtén <strong>calma fisiológica</strong> y descanso en la <strong>gracia de Dios</strong> sin la culpa de sentir que te falta fe. Si la rumiación nocturna, la taquicardia o el peso de tus responsabilidades te visitan hoy, tu cuerpo no está fallando espiritualmente; seas hombre o mujer, aquí tienes un ancla de sosiego, respiración guiada y reposo en la soberanía divina.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartMotherSanctuary}
            className="min-h-[46px] px-5 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 text-[#060F1E] text-[13.5px] font-bold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Iniciar calma y descanso</span>
            <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* 4. Cinta de Valores y Arquitectura del Mapa */}
      <BrandValuesRibbon />

      {/* 5. Acción Central: Botiquín Espiritual de Encuentro con Dios */}
      <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-5 h-5 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#0B1E36]">
            Botiquín Espiritual de Encuentro con Dios
          </span>
        </div>

        <h3 className="font-serif text-[22px] sm:text-[26px] text-[#0B1E36] font-normal leading-snug mb-2">
          ¿En qué área de tu mapa necesitas a Dios hoy?
        </h3>
        <p className="text-[14px] text-[#64748B] mb-6">
          Un espacio cálido y personal para hombres y mujeres. Ingresa tu correo opcional para recibir el devocional matutino o avanza directamente a tu tiempo de oración.
        </p>

        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico (opcional)"
              className="min-h-[48px] flex-1 px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B132B] placeholder:text-[#64748B] text-[14px] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
            />
            <button
              type="submit"
              className="min-h-[48px] px-7 py-3 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[15px] font-bold transition-all flex items-center justify-center gap-2 shadow-sm shrink-0 cursor-pointer border border-[#F59E0B]/30"
            >
              <span>{emailSaved ? 'Conectando con Dios…' : 'Buscar a Dios ahora'}</span>
              <ArrowRight className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
            </button>
          </div>
          <p className="text-[12px] text-[#64748B]">
            Acceso libre perpetuo al botiquín • Sin contraseñas obligatorias • Confidencial en tu dispositivo
          </p>
        </form>
      </div>

      {/* 6. Pilares para Hombres y Mujeres de Dios */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#0D9488]">
            Enfocado en toda persona que anhela la gracia de Dios
          </span>
          <span className="text-[12px] text-[#64748B]">
            Hombres • Mujeres • Familias
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-5 shadow-xs hover:border-[#F59E0B]/50 transition-colors">
            <div className="w-10 h-10 rounded-[10px] bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-3">
              <Sun className="w-5 h-5 text-[#D97706]" strokeWidth={2} />
            </div>
            <h4 className="font-serif text-[17px] text-[#0B1E36] font-normal mb-1">
              Para el Hombre de Fe
            </h4>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Fuerza espiritual para liderar con sabiduría, vencer la soledad en las batallas de provisión y descansar en la soberanía divina.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-5 shadow-xs hover:border-[#10B981]/50 transition-colors">
            <div className="w-10 h-10 rounded-[10px] bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
              <Heart className="w-5 h-5 text-[#059669] fill-[#059669]" />
            </div>
            <h4 className="font-serif text-[17px] text-[#0B1E36] font-normal mb-1">
              Para la Mujer de Fe
            </h4>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Un refugio de ternura y dignidad donde soltar la sobrecarga emocional y recibir el abrazo incondicional de un Dios que nunca falla.
            </p>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-5 shadow-xs hover:border-[#6366F1]/50 transition-colors">
            <div className="w-10 h-10 rounded-[10px] bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5 text-[#4F46E5]" strokeWidth={2} />
            </div>
            <h4 className="font-serif text-[17px] text-[#0B1E36] font-normal mb-1">
              Gracia sin Juicios
            </h4>
            <p className="text-[13px] text-[#475569] leading-relaxed">
              Dios no te pide fingir que eres invencible. En tu debilidad humana resplandece la grandeza de su poder, amor y comprensión.
            </p>
          </div>
        </div>
      </div>

      {/* 7. Módulos Interactivos de Bienestar Espiritual */}
      <div className="space-y-4">
        <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#0B1E36] block">
          Caminos de Crecimiento y Transformación
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="p-5 rounded-[16px] bg-white border border-[#E2E8F0] hover:border-[#F59E0B] text-left transition-all shadow-xs hover:shadow-md group cursor-pointer"
          >
            <Compass className="w-6 h-6 text-[#F59E0B] mb-3 group-hover:scale-105 transition-transform" strokeWidth={2} />
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-serif text-[16.5px] text-[#0B1E36] font-normal">
                Ruta 30 Días con Dios
              </h4>
              <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] font-bold">
                D1-7 Libre
              </span>
            </div>
            <p className="text-[12.5px] text-[#475569] leading-relaxed">
              El mapa mensual completo: 4 semanas caminando en su palabra con reflexiones, neuroplasticidad y acciones prácticas.
            </p>
          </button>

          <button
            type="button"
            onClick={onOpenGratitude}
            className="p-5 rounded-[16px] bg-white border border-[#E2E8F0] hover:border-[#0D9488] text-left transition-all shadow-xs hover:shadow-md group cursor-pointer"
          >
            <HeartHandshake className="w-6 h-6 text-[#0D9488] mb-3 group-hover:scale-105 transition-transform" strokeWidth={2} />
            <h4 className="font-serif text-[16.5px] text-[#0B1E36] font-normal mb-1">
              Diario de Gratitud Espiritual
            </h4>
            <p className="text-[12.5px] text-[#475569] leading-relaxed">
              Registra 3 bendiciones y regalos de Dios al final de cada jornada para entrenar tu cerebro en su providencia.
            </p>
          </button>

          <button
            type="button"
            onClick={onOpenAudios}
            className="p-5 rounded-[16px] bg-white border border-[#E2E8F0] hover:border-[#6366F1] text-left transition-all shadow-xs hover:shadow-md group cursor-pointer"
          >
            <Volume2 className="w-6 h-6 text-[#6366F1] mb-3 group-hover:scale-105 transition-transform" strokeWidth={2} />
            <h4 className="font-serif text-[16.5px] text-[#0B1E36] font-normal mb-1">
              Audios de Fe y Devoción
            </h4>
            <p className="text-[12.5px] text-[#475569] leading-relaxed">
              Narraciones de promesas bíblicas acompañadas de suaves arroyos, lluvia apacible y frecuencias de reposo.
            </p>
          </button>
        </div>
      </div>

      {/* 8. Detalles del Plan Mensual (4.99 USD) */}
      <div className="border border-[#CBD5E1] bg-gradient-to-r from-[#FFFFFF] via-[#FFFBEB]/40 to-[#F0FDF4]/40 rounded-[18px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#D97706] block mb-1">
            Transparencia y Sostenimiento de la Plataforma
          </span>
          <div className="font-serif text-[20px] text-[#0B1E36] font-normal mb-1">
            Botiquín gratuito permanente y suscripción mensual de 4.99 USD
          </div>
          <p className="text-[13px] text-[#475569] max-w-[480px]">
            El acceso básico para buscar a Dios siempre será gratuito y libre. La suscripción opcional de $4.99/mes sostiene este ministerio y habilita el programa completo de 30 días y todas las vigilias sonoras extendidas.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenPlan}
          className="min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-[13px] font-bold text-white shrink-0 transition-colors shadow-sm cursor-pointer border border-[#F59E0B]/40"
        >
          Consultar detalles
        </button>
      </div>
    </div>
  );
};
