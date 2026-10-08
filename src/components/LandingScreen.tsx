import React from 'react';
import {
  Heart,
  ArrowRight,
  Compass,
  HeartHandshake,
  Volume2,
  ShieldCheck,
  Moon,
  Sparkles,
  Sun,
  Bell,
  FolderOpen,
  HardDrive,
  FileSpreadsheet,
  KeyRound,
  Film,
  Play,
  Eye,
} from 'lucide-react';
import { HeroCoupleIllustration } from './HeroCoupleIllustration';
import { MapaCuadrantesInteractive } from './MapaCuadrantesInteractive';
import { MentoresGuiaSection } from './MentoresGuiaSection';
import { BrandValuesRibbon } from './BrandValuesRibbon';
import { FlexiHeroAnimation } from './FlexiHeroAnimation';
import { JesusEnTiConfioScene } from './JesusEnTiConfioScene';
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
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
  onOpenChat,
  onOpenAuth,
  onOpenReminders,
  onOpenDailyPromise,
  onOpenFiles,
  onOpenGoogleDrive,
  onOpenGoogleSheets,
  onOpenJesusVideo,
  onOpenGallery,
}) => {
  const handleStartMotherSanctuary = () => {
    onStartFlow('madre_profesional', 'ansiedad_noche');
  };

  const handleQuadrantFlow = (symptomId: SymptomId, role?: UserRoleProfile) => {
    onStartFlow(role || 'hombre_fe', symptomId);
  };

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-3.5 sm:px-6 py-4 sm:py-8 space-y-7 sm:space-y-10 animate-fade-in overflow-hidden">
      {/* 
        1. HERO PRINCIPAL ESTILO "EJEMPLO FLEXI" CON ANIMACIÓN MULTI-COLUMNA CONTINUA
        Y ESCENAS DE "JESÚS EN TI CONFÍO SIN AUDIO"
      */}
      <FlexiHeroAnimation
        onStartFlow={() => onStartFlow('hombre_fe', 'ansiedad_noche')}
        onOpenMotherSanctuary={handleStartMotherSanctuary}
        onOpenAuth={onOpenAuth}
      />

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

        {/* Banner Destacado: Chatbot con Gemini 3.8 Flash */}
        <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-[#0F223D] via-[#122A4E] to-[#0A1728] border border-amber-500/30 p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-[460px]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[#F59E0B] text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acompañante Gemini 3.8 Flash • Multi-Turno</span>
            </div>
            <h2 className="font-editorial text-[17px] sm:text-[19px] text-[#F1F5F9] font-normal">
              Conversa con los Mentores Clara Luz & Leo
            </h2>
            <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed">
              Recibe consejería espiritual personalizada, oraciones guiadas y versículos de fortaleza para tus luchas de hoy. Respaldado en la nube.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenChat}
            className="min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[13.5px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Hablar con los Mentores</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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

          {/* Módulo 3: Promesa Bíblica del Día & Recordatorios */}
          <button
            type="button"
            onClick={onOpenDailyPromise || onOpenReminders}
            className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] hover:border-amber-400/50 text-left transition-all group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <div className="flex items-center justify-between mb-2">
              <Sun className="w-5 h-5 text-amber-400" strokeWidth={1.75} />
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                Diario & Alerta
              </span>
            </div>
            <h2 className="font-editorial text-[15.5px] text-[#F1F5F9] font-normal mb-1">
              Promesa del Día
            </h2>
            <p className="text-[12px] text-[#94A3B8] leading-relaxed">
              Palabra bíblica viva y recordatorio programable con la Web Notification API.
            </p>
          </button>

          {/* Módulo 4: Audios de Fe */}
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

        {/* Quick access to notification scheduling */}
        {onOpenReminders && (
          <div className="bg-[#091524] border border-amber-500/25 rounded-2xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <span className="font-medium text-[#F1F5F9]">¿Deseas no olvidar tu tiempo con Dios?</span>
                <p className="text-[12px] text-[#94A3B8]">
                  Programa recordatorios locales a una hora específica del día para tu Diario de Gratitud o Promesa del Día.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenReminders}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 active:bg-amber-500/35 border border-amber-500/30 text-amber-300 font-semibold text-[12.5px] transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Programar recordatorio</span>
            </button>
          </div>
        )}

        {/* Cloud Database, User Registration & Files Storage Banner */}
        <div className="bg-gradient-to-r from-[#0F1E33] to-[#0A1424] border border-sky-500/25 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[13px]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5 sm:mt-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#F1F5F9] text-[14px]">
                  Base de Datos Cloud Firestore & Cuenta Google
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  En Línea
                </span>
              </div>
              <p className="text-[12px] text-[#94A3B8] mt-0.5 max-w-[62ch]">
                Registro de usuarios con correo Google, repositorio de archivos y oraciones grabadas con tu voz, e historial sincronizado de fe.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {onOpenFiles && (
              <button
                type="button"
                onClick={onOpenFiles}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/35 text-sky-300 font-semibold text-[12.5px] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Mis Archivos</span>
              </button>
            )}

            {onOpenGoogleDrive && (
              <button
                type="button"
                onClick={onOpenGoogleDrive}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/40 text-sky-200 font-semibold text-[12.5px] transition-all cursor-pointer flex items-center gap-1.5"
                title="Google Drive Espiritual"
              >
                <HardDrive className="w-3.5 h-3.5 text-sky-400" />
                <span>Google Drive</span>
              </button>
            )}

            {onOpenGoogleSheets && (
              <button
                type="button"
                onClick={onOpenGoogleSheets}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 font-semibold text-[12.5px] transition-all cursor-pointer flex items-center gap-1.5"
                title="Google Sheets - Registro de Peticiones y Diario"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Google Sheets</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenAuth}
              className="min-h-[38px] px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#060F1E] font-semibold text-[12.5px] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Registro Google</span>
            </button>
          </div>
        </div>

        {/* ====================================================================
            7. NUEVO SECTOR VISUAL: CINE DE FE & GALERÍA DE IMÁGENES SACRAS
           ==================================================================== */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#C6F432]/10 border border-[#C6F432]/30 text-[#C6F432] text-[11px] font-bold tracking-wider uppercase mb-1">
                <Film className="w-3.5 h-3.5" />
                <span>Cine Litúrgico & Experiencia Audiovisual de Fe</span>
              </div>
              <h2 className="font-editorial text-[20px] sm:text-[23px] text-[#F1F5F9] font-normal">
                Videos Meditativos y Obras Visuales
              </h2>
              <p className="text-[12.5px] text-[#94A3B8]">
                Contempla la paz divina con animaciones litúrgicas, paisajes sagrados y paisajes sonoros en vivo.
              </p>
            </div>

            {onOpenGallery && (
              <button
                type="button"
                onClick={onOpenGallery}
                className="min-h-[40px] px-4 py-2 rounded-xl border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white font-semibold text-[12.5px] transition-all flex items-center gap-2 cursor-pointer shrink-0 self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Ver Galería Completa</span>
              </button>
            )}
          </div>

          {/* Grid de 4 Videos de Fe */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* Video 1: Jesús de la Divina Misericordia */}
            <div className="group relative rounded-2xl bg-[#091524] border border-amber-500/30 overflow-hidden shadow-lg hover:border-amber-400 transition-all flex flex-col">
              <div className="relative aspect-[16/10] bg-[#0A1624] overflow-hidden">
                <JesusEnTiConfioScene sceneKey="adoracion_altar_misericordia" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/30 pointer-events-none" />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-amber-300 font-bold border border-amber-500/40">
                  3:45 min
                </span>
                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('misericordia')}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer"
                  title="Reproducir Jesús de la Divina Misericordia"
                >
                  <span className="w-11 h-11 rounded-full bg-[#C6F432] group-hover:scale-110 text-[#061A0E] flex items-center justify-center transition-transform shadow-[0_0_20px_rgba(198,244,50,0.5)]">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block mb-0.5">
                    Misericordia & Altar
                  </span>
                  <h3 className="text-[13.5px] font-semibold text-[#F1F5F9] leading-snug">
                    Jesús de la Divina Misericordia
                  </h3>
                  <p className="text-[11.5px] text-[#94A3B8] mt-1 line-clamp-2">
                    Rayos sagrados de sangre y agua, adoración ante la custodia y descanso total.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('misericordia')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-medium text-[11.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Ver Video</span>
                </button>
              </div>
            </div>

            {/* Video 2: Aguas de Reposo (Salmo 23) */}
            <div className="group relative rounded-2xl bg-[#091524] border border-emerald-500/30 overflow-hidden shadow-lg hover:border-emerald-400 transition-all flex flex-col">
              <div className="relative aspect-[16/10] bg-[#0A1624] overflow-hidden">
                <JesusEnTiConfioScene sceneKey="campo_lavanda_juntos" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/30 pointer-events-none" />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-emerald-300 font-bold border border-emerald-500/40">
                  3:20 min
                </span>
                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('aguas_reposo')}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer"
                  title="Reproducir Aguas de Reposo"
                >
                  <span className="w-11 h-11 rounded-full bg-[#10B981] group-hover:scale-110 text-[#061A0E] flex items-center justify-center transition-transform shadow-[0_0_20px_rgba(16,185,129,0.5)]">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                  </span>
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block mb-0.5">
                    Salmo 23 & Naturaleza
                  </span>
                  <h3 className="text-[13.5px] font-semibold text-[#F1F5F9] leading-snug">
                    Amanecer en Aguas de Reposo
                  </h3>
                  <p className="text-[11.5px] text-[#94A3B8] mt-1 line-clamp-2">
                    Clara Luz & Leo en el amanecer con respiración guiada para apagar la rumiación.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('aguas_reposo')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-medium text-[11.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Ver Video</span>
                </button>
              </div>
            </div>

            {/* Video 3: Fortaleza en la Prueba & Oración */}
            <div className="group relative rounded-2xl bg-[#091524] border border-sky-500/30 overflow-hidden shadow-lg hover:border-sky-400 transition-all flex flex-col">
              <div className="relative aspect-[16/10] bg-[#0A1624] overflow-hidden">
                <JesusEnTiConfioScene sceneKey="leo_fortaleza_oracion" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/30 pointer-events-none" />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-sky-300 font-bold border border-sky-500/40">
                  3:30 min
                </span>
                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('fortaleza_oracion')}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer"
                  title="Reproducir Fortaleza en la Prueba"
                >
                  <span className="w-11 h-11 rounded-full bg-sky-500 group-hover:scale-110 text-[#061A0E] flex items-center justify-center transition-transform shadow-[0_0_20px_rgba(14,165,233,0.5)]">
                    <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                  </span>
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sky-400 block mb-0.5">
                    Isaías 40 & Valentía
                  </span>
                  <h3 className="text-[13.5px] font-semibold text-[#F1F5F9] leading-snug">
                    Fortaleza en la Prueba & Renovación
                  </h3>
                  <p className="text-[11.5px] text-[#94A3B8] mt-1 line-clamp-2">
                    Leo en oración ferviente levantando alas como las águilas ante la adversidad.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('fortaleza_oracion')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-medium text-[11.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Ver Video</span>
                </button>
              </div>
            </div>

            {/* Video 4: El Altar del Hogar */}
            <div className="group relative rounded-2xl bg-[#091524] border border-purple-500/30 overflow-hidden shadow-lg hover:border-purple-400 transition-all flex flex-col">
              <div className="relative aspect-[16/10] bg-[#0A1624] overflow-hidden">
                <JesusEnTiConfioScene sceneKey="custodia_santisimo_radiante" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/30 pointer-events-none" />
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] text-purple-300 font-bold border border-purple-500/40">
                  3:15 min
                </span>
                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('altar_familiar')}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors cursor-pointer"
                  title="Reproducir El Altar del Hogar"
                >
                  <span className="w-11 h-11 rounded-full bg-purple-500 group-hover:scale-110 text-white flex items-center justify-center transition-transform shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </span>
                </button>
              </div>

              <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400 block mb-0.5">
                    Josué 24 & Hogar
                  </span>
                  <h3 className="text-[13.5px] font-semibold text-[#F1F5F9] leading-snug">
                    El Altar del Hogar & Bendición
                  </h3>
                  <p className="text-[11.5px] text-[#94A3B8] mt-1 line-clamp-2">
                    Protección sagrada para padres, hijos y matrimonios bajo la custodia de Dios.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenJesusVideo?.('altar_familiar')}
                  className="w-full py-1.5 px-2.5 rounded-lg bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 font-medium text-[11.5px] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Ver Video</span>
                </button>
              </div>
            </div>
          </div>
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
