import React from 'react';
import {
  Moon,
  Sparkles,
  Heart,
  HeartHandshake,
  Compass,
  FileSpreadsheet,
  HardDrive,
  Sun,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { UserRoleProfile, SymptomId } from '../types';

interface LandingScreenProps {
  onStartFlow: (initialRole?: UserRoleProfile, initialSymptom?: SymptomId) => void;
  onOpenPlan?: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios?: () => void;
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
  onOpenGratitude,
  onOpenChat,
  onOpenDailyPromise,
  onOpenGoogleSheets,
  onOpenGoogleDrive,
  onOpenAuth,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-10 animate-fade-in">
      {/* 1. HERO PRINCIPAL: OBJETIVO CLARO Y SERENO */}
      <div className="text-center space-y-4 max-w-2xl mx-auto pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>F.E.™ Fortaleza Espiritual • Tu Refugio de Calma</span>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F1F5F9] font-normal tracking-tight leading-tight">
          Encuentra Paz para tu Mente y Descanso para tu Alma
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Un espacio sencillo y práctico para entregar la ansiedad en manos de Dios, meditar en sus promesas y organizar tus oraciones diarias sin distracciones.
        </p>
      </div>

      {/* 2. BOTIQUÍN DE AUXILIO RÁPIDO: ¿CÓMO TE SIENTES HOY? */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-400" />
              <span>Botiquín de Calma Inmediata</span>
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Selecciona lo que estás experimentando para recibir una promesa bíblica y oración guiada:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Opción 1: Ansiedad / Insomnio */}
          <button
            type="button"
            onClick={() => onStartFlow('madre_profesional', 'ansiedad_noche')}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1A2E] to-[#071220] border border-amber-500/25 hover:border-amber-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-md hover:shadow-amber-500/5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-3">
                <Moon className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-amber-300 transition-colors">
              Ansiedad o Insomnio Nocturno
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              «En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado» (Salmo 4:8).
            </p>
          </button>

          {/* Opción 2: Cansancio / Carga */}
          <button
            type="button"
            onClick={() => onStartFlow('hombre_fe', 'cansancio')}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1A2E] to-[#071220] border border-sky-500/25 hover:border-sky-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-md hover:shadow-sky-500/5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mb-3">
                <Compass className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-sky-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-sky-300 transition-colors">
              Cansancio & Sobrecarga Mental
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              «Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas» (Isaías 40:29).
            </p>
          </button>

          {/* Opción 3: Incertidumbre / Miedo */}
          <button
            type="button"
            onClick={() => onStartFlow('madre_profesional', 'confianza')}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#0B1A2E] to-[#071220] border border-emerald-500/25 hover:border-emerald-400/60 text-left transition-all group cursor-pointer shadow-sm hover:shadow-md hover:shadow-emerald-500/5"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-emerald-300 transition-colors">
              Incertidumbre o Miedo al Mañana
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              «Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios» (Filipenses 4:6).
            </p>
          </button>

          {/* Opción 4: Hablar con los Mentores */}
          <button
            type="button"
            onClick={onOpenChat}
            className="p-5 rounded-2xl bg-gradient-to-br from-[#122238] to-[#091524] border border-amber-400/40 hover:border-amber-400 text-left transition-all group cursor-pointer shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#64748B] group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-base font-bold text-[#F1F5F9] group-hover:text-amber-300 transition-colors">
              Consejería con Mentores de Fe
            </h3>
            <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
              Conversa con Clara Luz y Leo para recibir acompañamiento espiritual, discernimiento y oración personalizada.
            </p>
          </button>
        </div>
      </div>

      {/* 3. PROMESA BÍBLICA DEL DÍA: SERENA Y DIRECTA */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#09182C] via-[#0E223D] to-[#0A1624] border border-amber-500/30 shadow-xl relative overflow-hidden">
        <div className="relative space-y-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Sun className="w-4 h-4" />
              Promesa Bíblica para Hoy
            </span>
            {onOpenDailyPromise && (
              <button
                type="button"
                onClick={onOpenDailyPromise}
                className="text-xs text-amber-300 hover:text-white underline cursor-pointer"
              >
                Ver reflexión completa
              </button>
            )}
          </div>

          <blockquote className="font-editorial text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed">
            «Mi presencia irá contigo, y te daré descanso.»
          </blockquote>
          <p className="text-xs font-semibold text-amber-400 font-mono">
            — Éxodo 33:14
          </p>

          <p className="text-xs text-[#CBD5E1] pt-1 leading-relaxed max-w-xl">
            No tienes que llevar la carga en tus propias fuerzas hoy. Dios camina a tu lado en cada paso.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onStartFlow('hombre_fe', 'presencia')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-[#060F1E] font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <span>Orar con este versículo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. HERRAMIENTAS PRÁCTICAS: DIARIO DE GRATITUD & GOOGLE SHEETS */}
      <div className="space-y-4">
        <div className="border-b border-white/[0.08] pb-2">
          <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9] flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span>Tus Herramientas Prácticas</span>
          </h2>
          <p className="text-xs text-[#94A3B8]">
            Escribe tus motivos de agradecimiento y guarda tus peticiones de forma privada.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Tarjeta 1: Diario de Gratitud */}
          <div className="p-5 rounded-2xl bg-[#091524] border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#F1F5F9]">
                Diario de Gratitud Nocturna
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Nombrar 3 bendiciones del día antes de dormir reduce el estrés, calma la amígdala cerebral y entrena el descanso en Dios.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenGratitude}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Abrir Diario de Gratitud</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Tarjeta 2: Google Sheets & Drive */}
          <div className="p-5 rounded-2xl bg-[#091524] border border-sky-500/20 hover:border-sky-500/40 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-[#F1F5F9]">
                Peticiones en Google Sheets
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Visualiza y gestiona tu registro de oraciones y testimonios en tu propia hoja de cálculo conectada a Google Workspace.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {onOpenGoogleSheets && (
                <button
                  type="button"
                  onClick={onOpenGoogleSheets}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Google Sheets</span>
                </button>
              )}
              {onOpenGoogleDrive && (
                <button
                  type="button"
                  onClick={onOpenGoogleDrive}
                  className="py-2.5 px-3 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-500/30 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  title="Ver archivos en Google Drive"
                >
                  <HardDrive className="w-3.5 h-3.5" />
                  <span>Drive</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 5. SEGURIDAD Y PRIVACIDAD EN TU CUENTA */}
      <div className="p-4 rounded-xl bg-[#071220] border border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#94A3B8]">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Tus oraciones son 100% privadas y seguras en tu cuenta de Google.
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenAuth}
          className="text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
        >
          Gestionar cuenta y accesos
        </button>
      </div>
    </div>
  );
};
