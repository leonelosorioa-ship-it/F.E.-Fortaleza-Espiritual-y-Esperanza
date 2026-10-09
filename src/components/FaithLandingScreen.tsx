import React, { useState } from 'react';
import {
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Heart,
  Check,
  Compass,
  Lock,
  Volume2,
  BookOpen,
  Calendar,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { FlexiHeroAnimation } from './FlexiHeroAnimation';
import { PROGRAM_30_DAYS } from '../data/faithTechData';

interface FaithLandingScreenProps {
  onStartDiagnostic: () => void;
  onOpenRescue: () => void;
  onOpenPlanModal: () => void;
  selectedMentor: 'clara_luz' | 'leo';
  onSelectMentor: (mentor: 'clara_luz' | 'leo') => void;
  completedDaysCount: number;
}

export const FaithLandingScreen: React.FC<FaithLandingScreenProps> = ({
  onStartDiagnostic,
  onOpenRescue,
  onOpenPlanModal,
  selectedMentor,
  onSelectMentor,
  completedDaysCount,
}) => {
  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-4 sm:py-6 space-y-7 animate-fade-in text-[#F8FAFC]">
      {/* 1. PORTADA PRINCIPAL: DOS FILAS DE IMÁGENES QUE SUBEN Y BAJAN DESDE EL PRINCIPIO */}
      <FlexiHeroAnimation
        onStartFlow={onStartDiagnostic}
        onOpenRescue={onOpenRescue}
        onOpenSpiritualQuiz={onOpenPlanModal}
      />

      {/* 2. SECCIÓN DE VALIDACIÓN PASTORAL Y REFUGIO DEL ALMA */}
      <section
        aria-label="Reflexión pastoral y validación"
        className="rounded-[16px] bg-[#1E293B] border border-[#334155] p-5 sm:p-6 space-y-4 shadow-sm"
      >
        <div className="space-y-2">
          {/* Badge reflexivo */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#0F172A] border border-[#334155] text-[#0D9488] text-[11px] font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Santuario Nocturno • Sin Juicio Religioso</span>
          </div>

          <h2 className="font-editorial text-[20px] sm:text-[23px] text-[#F8FAFC] font-normal leading-snug">
            Tu fe y tu salud mental caminan juntas hacia la paz
          </h2>

          <p className="text-[13.5px] sm:text-[14px] text-[#94A3B8] leading-relaxed">
            Si la opresión en el pecho, la rumiación nocturna o el insomnio te visitan hoy, tu sistema nervioso necesita calma y contención, no condenación. Experimentar debilidad biológica no es falta de fe; es la invitación para que la gracia de Dios te sostenga.
          </p>
        </div>

        {/* Garantías de Privacidad y Gracia */}
        <div className="pt-2 border-t border-[#334155] flex flex-wrap items-center justify-between gap-2 text-[11.5px] text-[#94A3B8]">
          <span className="flex items-center gap-1.5 text-[#10B981]">
            <Check className="w-3.5 h-3.5" />
            100% privado en tu dispositivo (LocalStorage)
          </span>
          <span>•</span>
          <span>Sin registro obligatorio ni servidores externos</span>
        </div>
      </section>

      {/* 2. BLOQUE DE PRESENTACIÓN DEL PROGRAMA GUIDADO DE 30 DÍAS */}
      <section
        aria-label="Programa guiado de 30 días"
        className="rounded-[16px] bg-[#1E293B] border border-[#334155] p-5 sm:p-7 space-y-6 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#334155]">
          <div>
            <div className="flex items-center gap-2 text-[#0D9488] mb-1">
              <Compass className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Itinerario Progresivo
              </span>
            </div>
            <h2 className="font-editorial text-[20px] sm:text-[22px] text-[#F8FAFC] font-normal leading-snug">
              Programa Guiado de 30 Días: Fortaleza Espiritual y Renovación Mental
            </h2>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-[11px] font-semibold text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30 block w-fit sm:ml-auto">
              Días 1 al 7 libres
            </span>
          </div>
        </div>

        <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
          Un camino estructurado para desarmar la rumiación, regular el nervio vago y sustituir pensamientos intrusivos con la Palabra. Diseñado con acompañamiento de mentores virtuales, diario interactivo de gratitud inteligente y audios con frecuencias devocionales.
        </p>

        {/* Pilares del programa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[12.5px]">
          <div className="p-3.5 rounded-[8px] bg-[#0F172A] border border-[#334155] space-y-1">
            <div className="flex items-center gap-2 text-[#0D9488] font-semibold">
              <BookOpen className="w-4 h-4" />
              <span>Reestructuración Cognitiva Bíblica</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              30 días de ejercicios somáticos y promesas contextualizadas para pasar de la hipervigilancia al reposo.
            </p>
          </div>

          <div className="p-3.5 rounded-[8px] bg-[#0F172A] border border-[#334155] space-y-1">
            <div className="flex items-center gap-2 text-[#0D9488] font-semibold">
              <Volume2 className="w-4 h-4" />
              <span>Audios Devocionales de Sosiego</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              Pausas guiadas de respiración y oración contemplativa para apagar la taquicardia al acostarte.
            </p>
          </div>
        </div>

        {/* Mentores virtuales del programa */}
        <div className="space-y-3 pt-1">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
            Acompañamiento de mentores virtuales:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Clara Luz */}
            <div
              onClick={() => onSelectMentor('clara_luz')}
              className={`p-4 rounded-[8px] border transition-all cursor-pointer ${
                selectedMentor === 'clara_luz'
                  ? 'bg-[#0F172A] border-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'bg-[#0F172A]/70 border-[#334155] hover:border-[#94A3B8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-semibold text-[#F8FAFC]">
                  Clara Luz
                </span>
                <span className="text-[11px] text-[#0D9488] font-medium bg-[#0D9488]/15 px-2 py-0.5 rounded-[4px]">
                  Sosiego y Liberación de Culpas
                </span>
              </div>
              <p className="text-[12px] text-[#94A3B8] leading-relaxed">
                Acompañamiento tierno y materno. Ideal si luchas con autorreproches religiosos, sensación de indignidad o noches de insomnio.
              </p>
            </div>

            {/* Leo */}
            <div
              onClick={() => onSelectMentor('leo')}
              className={`p-4 rounded-[8px] border transition-all cursor-pointer ${
                selectedMentor === 'leo'
                  ? 'bg-[#0F172A] border-[#0D9488] ring-1 ring-[#0D9488]'
                  : 'bg-[#0F172A]/70 border-[#334155] hover:border-[#94A3B8]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[14px] font-semibold text-[#F8FAFC]">
                  Leo
                </span>
                <span className="text-[11px] text-[#0D9488] font-medium bg-[#0D9488]/15 px-2 py-0.5 rounded-[4px]">
                  Fortaleza y Resiliencia
                </span>
              </div>
              <p className="text-[12px] text-[#94A3B8] leading-relaxed">
                Acompañamiento firme y de aliento. Ideal si sientes pérdida de fuerzas, parálisis ante decisiones difíciles o incertidumbre laboral.
              </p>
            </div>
          </div>
        </div>

        {/* Modelo Freemium / Trial: Días 1 al 7 Gratuitos */}
        <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#10B981] font-semibold text-[13px]">
              <Calendar className="w-4 h-4" />
              <span>Semana 1: «Ancla de Paz» (100% Libre y Gratuita)</span>
            </div>
            <span className="text-[11px] text-[#94A3B8]">
              {completedDaysCount}/7 completados
            </span>
          </div>

          <p className="text-[12px] text-[#94A3B8] leading-relaxed">
            Los primeros 7 días están inmediatamente desbloqueados en tu navegador. Si dejas de practicar un día, nuestra arquitectura se basa en <strong>Grace-Based Streaks</strong>: tu progreso no se castiga ni se reinicia a cero; la gracia se retoma en el momento en que vuelves.
          </p>

          {/* Días 1-7 preview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11.5px] pt-1">
            {PROGRAM_30_DAYS.slice(0, 4).map((d) => (
              <div key={d.dayNumber} className="p-2 rounded-[6px] bg-[#1E293B] border border-[#334155] space-y-0.5">
                <span className="text-[10px] text-[#0D9488] font-bold block">Día {d.dayNumber}</span>
                <span className="text-[#F8FAFC] line-clamp-1">{d.title.split(':')[1] || d.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Componente UI seguro para acceso premium (Días 8 al 30 - USD 7.99 o $29.900 COL) */}
        <div className="p-4 sm:p-5 rounded-[12px] bg-[#0F172A] border border-[#0D9488]/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#F59E0B] flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                Acceso Completo • Días 8 al 30
              </span>
              <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#F8FAFC] mt-0.5">
                Desbloqueo de los 30 Días de Renovación Mental
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[18px] font-bold text-[#F8FAFC] block leading-none">
                USD 7.99 <span className="text-[13px] text-[#0D9488] font-semibold">o $29.900 COL</span>
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                Pago único • Sin suscripciones mensuales
              </span>
            </div>
          </div>

          <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">
            Profundiza en la sanidad de la memoria, desactivación de alarmas de pánico crónico y consolidación de una mente en reposo. Sin suscripciones recurrentes ni cobros sorpresa.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="button"
              onClick={onOpenPlanModal}
              className="flex-1 min-h-[44px] px-4 py-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[#F8FAFC] text-[13px] font-medium border border-[#334155] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#0D9488]" />
              <span>Ver itinerario de los 30 días</span>
            </button>

            <a
              href="https://buy.stripe.com/test_fe_esperanza_30dias"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-[#F8FAFC] text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Desbloquear pase completo (USD 7.99 • $29.900 COL)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
