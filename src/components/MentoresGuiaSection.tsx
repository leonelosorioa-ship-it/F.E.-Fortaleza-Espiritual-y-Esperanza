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
              {/* Circular Avatar with Glowing Neon Halo matching the photo */}
              <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-[#14B8A6] via-[#C084FC] to-[#F43F5E] shadow-[0_0_25px_rgba(20,184,166,0.6)] shrink-0">
                <div className="w-full h-full rounded-full bg-[#0B1728] flex items-center justify-center overflow-hidden border-2 border-white/50 relative shadow-inner">
                  {/* Detailed Portrait Illustration of Clara Luz from photo */}
                  <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      {/* Gradients for hair, skin, blazer and neon halo */}
                      <radialGradient id="claraHalo" cx="50%" cy="40%" r="50%">
                        <stop offset="60%" stopColor="#14B8A6" stopOpacity="0.25" />
                        <stop offset="90%" stopColor="#C084FC" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#0B1728" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="claraSkin" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FDE3D2" />
                        <stop offset="60%" stopColor="#F5CAA8" />
                        <stop offset="100%" stopColor="#E39D72" />
                      </linearGradient>
                      <linearGradient id="claraHair" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8A4A21" />
                        <stop offset="45%" stopColor="#C27838" />
                        <stop offset="70%" stopColor="#D98A44" />
                        <stop offset="100%" stopColor="#6E3210" />
                      </linearGradient>
                      <linearGradient id="claraBlazer" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" />
                        <stop offset="50%" stopColor="#6D28D9" />
                        <stop offset="100%" stopColor="#4C1D95" />
                      </linearGradient>
                      <linearGradient id="neonRing" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#2DD4BF" />
                        <stop offset="50%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#F43F5E" />
                      </linearGradient>
                    </defs>

                    {/* Background garden evening ambience */}
                    <rect width="100" height="100" fill="#081426" />
                    <circle cx="50" cy="45" r="42" fill="url(#claraHalo)" />

                    {/* Glowing neon halo ring from photo */}
                    <circle cx="50" cy="44" r="34" stroke="url(#neonRing)" strokeWidth="2.5" strokeDasharray="180 15" opacity="0.95" />
                    <circle cx="50" cy="44" r="35.5" stroke="#2DD4BF" strokeWidth="0.8" opacity="0.6" filter="blur(1px)" />

                    {/* Back hair volume */}
                    <path d="M28 42 C26 58 24 74 34 85 C40 76 38 60 36 48 Z" fill="url(#claraHair)" />
                    <path d="M72 42 C74 58 76 74 66 85 C60 76 62 60 64 48 Z" fill="url(#claraHair)" />

                    {/* Torso & Lilac Blazer from photo */}
                    <path d="M24 100 L30 84 C33 78 40 76 50 76 C60 76 67 78 70 84 L76 100 Z" fill="#EDE9FE" />
                    {/* Blazer jacket */}
                    <path d="M18 100 L27 82 C30 76 38 74 44 74 L48 88 L34 100 Z" fill="url(#claraBlazer)" />
                    <path d="M82 100 L73 82 C70 76 62 74 56 74 L52 88 L66 100 Z" fill="url(#claraBlazer)" />
                    {/* Blazer lapels */}
                    <path d="M43 74 L49 89 L38 88 Z" fill="#A78BFA" opacity="0.8" />
                    <path d="M57 74 L51 89 L62 88 Z" fill="#7C3AED" opacity="0.9" />

                    {/* Neck */}
                    <path d="M43 64 L43 74 C46 76 54 76 57 74 L57 64 Z" fill="#E39D72" />
                    <path d="M44 65 C48 68 52 68 56 65" stroke="#C97D54" strokeWidth="1" fill="none" opacity="0.5" />

                    {/* Head / Face */}
                    <ellipse cx="50" cy="48" rx="14" ry="17" fill="url(#claraSkin)" />

                    {/* Cheeks and subtle blush */}
                    <ellipse cx="42" cy="52" rx="3.5" ry="2" fill="#F43F5E" opacity="0.22" />
                    <ellipse cx="58" cy="52" rx="3.5" ry="2" fill="#F43F5E" opacity="0.22" />

                    {/* Warm, smiling eyes */}
                    <ellipse cx="44" cy="46" rx="2.5" ry="1.6" fill="#451A03" />
                    <ellipse cx="56" cy="46" rx="2.5" ry="1.6" fill="#451A03" />
                    <circle cx="44.8" cy="45.5" r="0.7" fill="#FFFFFF" />
                    <circle cx="56.8" cy="45.5" r="0.7" fill="#FFFFFF" />
                    {/* Eyebrows */}
                    <path d="M40.5 42.5 C42.5 41.5 46.5 42 47.5 43.5" stroke="#5C2B0E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                    <path d="M59.5 42.5 C57.5 41.5 53.5 42 52.5 43.5" stroke="#5C2B0E" strokeWidth="1.2" strokeLinecap="round" fill="none" />

                    {/* Nose */}
                    <path d="M49 48 L48.5 53 C49 54 51 54 51.5 53" stroke="#C97D54" strokeWidth="1" strokeLinecap="round" fill="none" />

                    {/* Radiant, kind smile from photo */}
                    <path d="M44 57 C47 62 53 62 56 57 Z" fill="#FFFFFF" />
                    <path d="M43 56.5 C47 62.5 53 62.5 57 56.5" stroke="#E11D48" strokeWidth="1.4" strokeLinecap="round" fill="none" />

                    {/* Golden hoop earrings from photo */}
                    <ellipse cx="36" cy="51" rx="1.2" ry="3.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" />
                    <ellipse cx="64" cy="51" rx="1.2" ry="3.5" stroke="#FBBF24" strokeWidth="1.2" fill="none" />

                    {/* Front hair framing face (honey-brown wavy locks) */}
                    <path d="M50 31 C40 31 34 38 34 46 C34 54 37 63 39 67 C41 64 40 54 40 48 C40 40 45 37 50 37 C55 37 60 40 60 48 C60 54 59 64 61 67 C63 63 66 54 66 46 C66 38 60 31 50 31 Z" fill="url(#claraHair)" />
                    {/* Hair highlight strands */}
                    <path d="M43 35 C38 41 37 50 38 58" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity="0.6" fill="none" />
                    <path d="M57 35 C62 41 63 50 62 58" stroke="#FDE68A" strokeWidth="1" strokeLinecap="round" opacity="0.6" fill="none" />

                    {/* Front table subtle rim glow (holographic laptop aura) */}
                    <ellipse cx="50" cy="98" rx="38" ry="8" fill="#14B8A6" opacity="0.3" filter="blur(2px)" />
                  </svg>
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[13px] font-bold text-[#F472B6] tracking-wider uppercase drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]">
                    CLARA LUZ:
                  </span>
                  <span className="text-[13px] font-bold text-[#2DD4BF] tracking-wider uppercase drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]">
                    TU GUÍA DE F.E.™
                  </span>
                </div>
                <h3 className="font-serif text-[20px] sm:text-[23px] text-white font-normal leading-snug">
                  Encuentra tu Ancla de Paz
                </h3>
                <p className="text-[12px] text-[#A7F3D0] font-sans font-medium flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                  Acompañamiento en el Proceso de 30 Días
                </p>
              </div>
            </div>

            <p className="text-[13.5px] text-[#CBD5E1] leading-relaxed">
              Especialista en sosiego emocional, calma del sistema nervioso y liberación de culpas religiosas. Te enseña a descansar en la gracia del Padre sin sentir que te falta fe.
            </p>

            {/* 3 Pillars of Clara Luz from photo: Conexión, Seguridad, Sabiduría */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-[#1E3A5F]">
              {/* Medallion 1: CONEXIÓN - Hands holding golden heart */}
              <div className="p-2.5 rounded-[14px] bg-gradient-to-b from-[#0F1E33] to-[#071322] border border-[#F59E0B]/40 text-center shadow-xs flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-[#1C2C42] border border-[#F59E0B]/60 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(245,158,11,0.3)]">
                  <svg className="w-5 h-5 text-[#FBBF24]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {/* Golden heart held by hands */}
                    <path d="M12 7.5 C10.5 4.5 6 4.5 4.5 7.5 C3 10.5 6 13.5 12 18 C18 13.5 21 10.5 19.5 7.5 C18 4.5 13.5 4.5 12 7.5 Z" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1.2" />
                    <path d="M3 14 C3 18 6 21 10 21" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M21 14 C21 18 18 21 14 21" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block uppercase tracking-wider">Conexión</span>
                <span className="text-[9px] text-[#CBD5E1] block">Intimidad</span>
              </div>

              {/* Medallion 2: SEGURIDAD - Anchor over ocean waves medallion */}
              <div className="p-2.5 rounded-[14px] bg-gradient-to-b from-[#0F1E33] to-[#071322] border border-[#14B8A6]/40 text-center shadow-xs flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-[#112F3D] border border-[#14B8A6]/60 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(20,184,166,0.3)]">
                  <svg className="w-5 h-5 text-[#2DD4BF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {/* Anchor */}
                    <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M12 7v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M8 10h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M5 14c0 4.5 3.5 6 7 6s7-1.5 7-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    {/* Waves */}
                    <path d="M4 21c2-1 4 1 6 0s4-1 6 0s3-0.5 4 0" stroke="#99F6E4" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block uppercase tracking-wider">Seguridad</span>
                <span className="text-[9px] text-[#CBD5E1] block">Ancla de Paz</span>
              </div>

              {/* Medallion 3: SABIDURÍA - Open bible with divine light rays */}
              <div className="p-2.5 rounded-[14px] bg-gradient-to-b from-[#0F1E33] to-[#071322] border border-[#EAB308]/40 text-center shadow-xs flex flex-col items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-[#2A2B1D] border border-[#EAB308]/60 flex items-center justify-center mb-1 shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                  <svg className="w-5 h-5 text-[#FDE047]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    {/* Open book */}
                    <path d="M2 5v13c3-1 6-0.5 10 1c4-1.5 7-2 10-1V5c-3-1-6-0.5-10 1c-4-1.5-7-2-10-1z" stroke="currentColor" strokeWidth="1.6" fill="#713F12" fillOpacity="0.3" />
                    <path d="M12 6v14" stroke="currentColor" strokeWidth="1.8" />
                    {/* Sun rays above */}
                    <path d="M12 2v2M8 3l1 1.5M16 3l-1 1.5" stroke="#FEF08A" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold text-white block uppercase tracking-wider">Sabiduría</span>
                <span className="text-[9px] text-[#CBD5E1] block">La Palabra</span>
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
      <div className="rounded-[20px] bg-gradient-to-r from-[#FFFBEB] via-[#FFFFFF] to-[#F0FDF4] border-2 border-[#F59E0B] p-6 sm:p-7 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1.5 max-w-[540px]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
              Acceso Completo 30 Días
            </span>
            <span className="text-[12px] font-bold text-[#059669]">
              • Pago Único • Sin membresía recurrente
            </span>
          </div>

          <h3 className="font-serif text-[20px] sm:text-[23px] text-[#0B1E36] font-normal">
            El Mapa Completo de 30 Días con Clara Luz y Leo: 12.99 USD
          </h3>

          <p className="text-[13.5px] text-[#334155] leading-relaxed">
            Realizas un <strong>único pago de 12.99 USD</strong> y desbloqueas el itinerario íntegro de 30 días, las vigilias de insomnio prolongado narradas por Clara Luz y Leo, y el acompañamiento en tus 4 cuadrantes. <em>Por el momento no existirá membresía ni cargos mensuales.</em>
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenPlanDetails}
          className="min-h-[48px] px-6 py-3 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white font-bold text-[14px] transition-all flex items-center gap-2 shrink-0 cursor-pointer shadow-md border border-[#F59E0B]/40"
        >
          <span>Ver Programa Completo (12.99 USD)</span>
          <ArrowRight className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
