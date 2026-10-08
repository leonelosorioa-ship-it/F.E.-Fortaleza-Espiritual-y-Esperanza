import React from 'react';
import { Heart, Compass, Anchor, BookOpen, TrendingUp, Users, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { UserRoleProfile, SymptomId } from '../types';

interface MentoresProps {
  onSelectMentor?: (roleProfile: UserRoleProfile, symptomId: SymptomId) => void;
  onOpenPlanDetails: () => void;
  activeMentor?: 'clara_luz' | 'leo';
  onChooseMentorGuide?: (mentor: 'clara_luz' | 'leo') => void;
}

export const MentoresGuiaSection: React.FC<MentoresProps> = ({
  onSelectMentor,
  onOpenPlanDetails,
  activeMentor = 'clara_luz',
  onChooseMentorGuide,
}) => {
  const isMentorLocked = typeof window !== 'undefined' && localStorage.getItem('fe_mentor_locked') === 'true';

  const handleSelectClara = () => {
    if (isMentorLocked && activeMentor !== 'clara_luz') return;
    if (onChooseMentorGuide) {
      onChooseMentorGuide('clara_luz');
    } else if (onSelectMentor) {
      onSelectMentor('mujer_fe', 'ansiedad_noche');
    }
  };

  const handleSelectLeo = () => {
    if (isMentorLocked && activeMentor !== 'leo') return;
    if (onChooseMentorGuide) {
      onChooseMentorGuide('leo');
    } else if (onSelectMentor) {
      onSelectMentor('hombre_fe', 'confianza');
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Title & context */}
      <div className="text-center max-w-[720px] mx-auto space-y-2.5 px-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FBBF24] text-[10.5px] sm:text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2.5} />
          <span>Nuestros 2 Únicos Guías • Clara Luz y Leo</span>
        </div>

        <h2 className="font-editorial text-[24px] sm:text-[34px] text-[#F1F5F9] font-normal leading-tight">
          Caminando con Clara Luz o Leo durante los 30 Días
        </h2>

        <p className="text-[13.5px] sm:text-[15.5px] text-[#CBD5E1] leading-relaxed">
          {isMentorLocked ? (
            <>
              Has elegido a <strong>{activeMentor === 'clara_luz' ? 'Clara Luz' : 'Leo'}</strong> como tu guía definitivo. Todo tu itinerario, oraciones, devocionales y conversaciones son <strong>100% personalizados</strong> con tu guía.
            </>
          ) : (
            <>
              Al iniciar tu programa de 30 días, escogerás a tu guía entre <strong>Clara Luz o Leo</strong>. Esta decisión es definitiva: de ahí en adelante, todo tu proceso será guiado exclusivamente por el mentor que hayas seleccionado. <strong>Un único valor de USD 7.99 o $29.900 COL</strong> (sin membresías).
            </>
          )}
        </p>
      </div>

      {/* Grid de los 2 Mentores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* CARD 1: CLARA LUZ */}
        <div className={`relative rounded-[22px] p-4 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden group border-2 transition-all ${
          activeMentor === 'clara_luz'
            ? 'bg-gradient-to-b from-[#0B2533] via-[#0D223B] to-[#0A1A2F] border-[#14B8A6] ring-1 ring-[#14B8A6]/60 shadow-[0_0_30px_rgba(20,184,166,0.3)]'
            : 'bg-gradient-to-b from-[#0B1728] via-[#0D223B] to-[#0A1A2F] border-[#14B8A6]/50 hover:border-[#14B8A6]'
        }`}>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Active Guide Badge */}
          {activeMentor === 'clara_luz' && (
            <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6] text-[#061517] font-bold text-[11px] shadow-md">
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              <span>Tu Guía Seleccionado</span>
            </div>
          )}

          <div className="relative z-10 space-y-5">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#14B8A6]/20 text-[#5EEAD4] border border-[#14B8A6]/40">
                Paz • Gracia • Sanidad
              </span>
              <span className="text-[11px] text-[#94A3B8] font-semibold">
                Guía de F.E.™
              </span>
            </div>

            {/* Mentor Visual Emblem / Portrait */}
            <div className="flex items-center gap-4">
              {/* Circular Avatar with Glowing Halo */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#14B8A6] via-[#0D9488] to-[#F59E0B] shadow-[0_0_20px_rgba(20,184,166,0.35)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                  <svg className="w-12 h-12 text-[#99F6E4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M12 14c2.5 0 4.5 1.5 4.5 3.5" />
                  </svg>
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#5EEAD4] tracking-wider uppercase block">
                  CLARA LUZ
                </span>
                <h3 className="font-serif text-[22px] sm:text-[24px] text-white font-normal leading-snug">
                  Tu Guía de F.E.™
                </h3>
                <p className="text-[13px] text-[#FDE68A] font-serif italic mt-0.5">
                  «Encuentra tu ancla de paz»
                </p>
              </div>
            </div>

            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              Especialista en sosiego emocional, calma del sistema nervioso y liberación de culpas religiosas. Te enseña a descansar en la gracia del Padre sin sentir que te falta fe.
            </p>

            {/* 3 Pillars of Clara Luz */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E3A5F]">
              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <Heart className="w-4 h-4 text-[#F59E0B] mx-auto mb-1 fill-[#F59E0B]/20" />
                <span className="text-[11px] font-bold text-white block uppercase">Conexión</span>
                <span className="text-[9.5px] text-[#94A3B8] block">Intimidad</span>
              </div>

              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <Anchor className="w-4 h-4 text-[#14B8A6] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block uppercase">Seguridad</span>
                <span className="text-[9.5px] text-[#94A3B8] block">Ancla firme</span>
              </div>

              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <BookOpen className="w-4 h-4 text-[#FBBF24] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block uppercase">Sabiduría</span>
                <span className="text-[9.5px] text-[#94A3B8] block">La Palabra</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-5 mt-4 border-t border-[#1E3A5F]">
            {isMentorLocked && activeMentor !== 'clara_luz' ? (
              <div className="w-full min-h-[48px] px-4 py-2.5 rounded-[12px] bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] font-medium text-[13px] text-center flex items-center justify-center">
                <span>Tu proceso de 30 días está asignado a Leo</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSelectClara}
                className="w-full min-h-[48px] px-5 py-2.5 rounded-[12px] bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:brightness-110 active:scale-[0.98] text-[#060F1E] font-bold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>{activeMentor === 'clara_luz' ? 'Continuar Ruta con Clara Luz' : 'Escoger a Clara Luz como mi Guía'}</span>
                <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>

        {/* CARD 2: LEO */}
        <div className={`relative rounded-[22px] p-4 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden group border-2 transition-all ${
          activeMentor === 'leo'
            ? 'bg-gradient-to-b from-[#251A0A] via-[#0E2038] to-[#0A1A2F] border-[#F59E0B] ring-1 ring-[#F59E0B]/60 shadow-[0_0_30px_rgba(245,158,11,0.3)]'
            : 'bg-gradient-to-b from-[#0B1728] via-[#0E2038] to-[#0A1A2F] border-[#F59E0B]/50 hover:border-[#F59E0B]'
        }`}>
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Active Guide Badge */}
          {activeMentor === 'leo' && (
            <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold text-[11px] shadow-md">
              <Check className="w-3.5 h-3.5" strokeWidth={3} />
              <span>Tu Guía Seleccionado</span>
            </div>
          )}

          <div className="relative z-10 space-y-5">
            {/* Header Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40">
                Fortaleza • Dirección • Liderazgo
              </span>
              <span className="text-[11px] text-[#94A3B8] font-semibold">
                Camina con F.E.™
              </span>
            </div>

            {/* Mentor Visual Emblem / Portrait */}
            <div className="flex items-center gap-4">
              {/* Circular Avatar with Glowing Neon Halo */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#0EA5E9] via-[#F59E0B] to-[#10B981] shadow-[0_0_20px_rgba(245,158,11,0.5)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                  <svg className="w-12 h-12 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M9 7h6" strokeWidth={2.5} />
                  </svg>
                </div>
              </div>

              <div>
                <span className="text-[12px] font-bold text-[#FBBF24] tracking-wider uppercase block">
                  LEO
                </span>
                <h3 className="font-serif text-[22px] sm:text-[24px] text-white font-normal leading-snug">
                  Camina con F.E.™
                </h3>
                <p className="text-[13px] text-[#93C5FD] font-serif italic mt-0.5">
                  «Renueva tu fortaleza espiritual»
                </p>
              </div>
            </div>

            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              Mentor de disciplina interior, liderazgo de fe y constancia diaria. Te impulsa a desarmar la parálisis, alinear tu propósito laboral y familiar, y no rendirte jamás en la prueba.
            </p>

            {/* 3 Pillars of Leo */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#1E3A5F]">
              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <TrendingUp className="w-4 h-4 text-[#F59E0B] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block uppercase">Crecimiento</span>
                <span className="text-[9.5px] text-[#94A3B8] block">Hábitos y fe</span>
              </div>

              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <Compass className="w-4 h-4 text-[#0EA5E9] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block uppercase">Dirección</span>
                <span className="text-[9.5px] text-[#94A3B8] block">Faro de luz</span>
              </div>

              <div className="p-2.5 rounded-[12px] bg-[#071322] border border-[#162C47] text-center">
                <Users className="w-4 h-4 text-[#10B981] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block uppercase">Comunidad</span>
                <span className="text-[9.5px] text-[#94A3B8] block">Hogar y unión</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-5 mt-4 border-t border-[#1E3A5F]">
            {isMentorLocked && activeMentor !== 'leo' ? (
              <div className="w-full min-h-[48px] px-4 py-2.5 rounded-[12px] bg-white/[0.04] border border-white/[0.08] text-[#94A3B8] font-medium text-[13px] text-center flex items-center justify-center">
                <span>Tu proceso de 30 días está asignado a Clara Luz</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleSelectLeo}
                className="w-full min-h-[48px] px-5 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 active:scale-[0.98] text-[#060F1E] font-bold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>{activeMentor === 'leo' ? 'Continuar Ruta con Leo' : 'Escoger a Leo como mi Guía'}</span>
                <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner de Valor Único: USD 7.99 o $29.900 COL Pago Único (Sin membresías) */}
      <div className="rounded-[20px] bg-gradient-to-r from-[#0B1728] via-[#0E223D] to-[#0A1A2F] border-2 border-[#F59E0B] p-6 sm:p-7 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-[#F1F5F9]">
        <div className="space-y-1.5 max-w-[540px]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/40">
              Acceso Completo 30 Días
            </span>
            <span className="text-[11.5px] font-semibold text-[#34D399]">
              • Pago Único • Sin membresía recurrente
            </span>
          </div>

          <h3 className="font-editorial text-[20px] sm:text-[23px] text-[#F1F5F9] font-normal">
            El Mapa Completo de 30 Días con Clara Luz o Leo: USD 7.99 o $29.900 COL
          </h3>

          <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
            Realizas un <strong>único pago de USD 7.99 o $29.900 COL</strong> y desbloqueas el itinerario íntegro de 30 días, las vigilias de insomnio prolongado narradas por tu guía elegido (Clara Luz o Leo), y el acompañamiento en tus 4 cuadrantes. <em>Por el momento no existirá membresía ni cargos mensuales.</em>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPlanDetails}
          className="min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
        >
          <span>Ver Programa Completo (USD 7.99 / $29.900 COL)</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
