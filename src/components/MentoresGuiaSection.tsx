import React from 'react';
import { Heart, Compass, Anchor, BookOpen, TrendingUp, Users, Sparkles, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { UserRoleProfile, SymptomId } from '../types';

interface MentoresProps {
  onSelectMentor: (roleProfile: UserRoleProfile, symptomId: SymptomId) => void;
  onOpenPlanDetails: () => void;
}

export const MentoresGuiaSection: React.FC<MentoresProps> = ({
  onSelectMentor,
  onOpenPlanDetails,
}) => {
  return (
    <div className="w-full space-y-6">
      {/* Title & context */}
      <div className="text-center max-w-[700px] mx-auto space-y-2.5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] text-[11px] font-bold tracking-widest uppercase shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2.5} />
          <span>Nuestros 2 Guías o Mentores en este Proceso Espiritual y de Esperanza FE</span>
        </div>

        <h2 className="font-serif text-[26px] sm:text-[34px] text-[#0B1E36] font-normal leading-tight">
          Caminando con Clara Luz y Leo durante los 30 Días
        </h2>

        <p className="text-[14.5px] sm:text-[15.5px] text-[#475569] leading-relaxed">
          No estás solo en este camino. Nuestros dos mentores te acompañarán paso a paso en tus 4 cuadrantes (Cuerpo, Mente, Alma y Propósito) <strong>durante los 30 días por un único valor de 12.99 Dólares</strong>. <em>Por el momento no existirá una membresía, es un único pago.</em>
        </p>
      </div>

      {/* Grid de los 2 Mentores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1: CLARA LUZ */}
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#0B1728] via-[#0D223B] to-[#0A1A2F] border-2 border-[#14B8A6]/50 p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden group">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14B8A6]/15 rounded-full blur-3xl pointer-events-none" />

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
                  {/* Stylized vector representation of Clara Luz */}
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

            {/* 3 Pillars of Clara Luz from uploaded image: Conexión, Seguridad, Sabiduría */}
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
            <button
              type="button"
              onClick={() => onSelectMentor('mujer_fe', 'ansiedad_noche')}
              className="w-full min-h-[46px] px-5 py-2.5 rounded-[12px] bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:brightness-110 text-[#060F1E] font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Caminar con Clara Luz</span>
              <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* CARD 2: LEO */}
        <div className="relative rounded-[22px] bg-gradient-to-b from-[#0B1728] via-[#0E2038] to-[#0A1A2F] border-2 border-[#F59E0B]/50 p-6 sm:p-7 text-white shadow-xl flex flex-col justify-between overflow-hidden group">
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

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
              {/* Circular Avatar with Glowing Neon Halo like the photo */}
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-tr from-[#0EA5E9] via-[#F59E0B] to-[#10B981] shadow-[0_0_20px_rgba(245,158,11,0.5)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                  {/* Stylized vector representation of Leo with sunglasses & beard */}
                  <svg className="w-12 h-12 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    {/* Sunglasses line */}
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

            {/* 3 Pillars of Leo from uploaded image: Crecimiento, Dirección, Comunidad */}
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
            <button
              type="button"
              onClick={() => onSelectMentor('hombre_fe', 'confianza')}
              className="w-full min-h-[46px] px-5 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 text-[#060F1E] font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Caminar con Leo</span>
              <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Banner de Valor Único: $12.99 USD Pago Único (Sin membresías) */}
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
            El Mapa Completo de 30 Días con Clara Luz y Leo: 12.99 USD
          </h3>

          <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
            Realizas un <strong>único pago de 12.99 USD</strong> y desbloqueas el itinerario íntegro de 30 días, las vigilias de insomnio prolongado narradas por Clara Luz y Leo, y el acompañamiento en tus 4 cuadrantes. <em>Por el momento no existirá membresía ni cargos mensuales.</em>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPlanDetails}
          className="min-h-[48px] px-6 py-3 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] transition-colors flex items-center gap-2 shrink-0 cursor-pointer shadow-md"
        >
          <span>Ver Programa Completo (12.99 USD)</span>
          <ArrowRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};
