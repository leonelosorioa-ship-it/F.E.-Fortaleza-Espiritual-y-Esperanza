import React from 'react';
import { Heart, Compass, Anchor, BookOpen, TrendingUp, Users, Sparkles, Check, ArrowRight, X, Shield } from 'lucide-react';
import { CLARA_LUZ_PROFILE, LEO_PROFILE } from '../data/mentorProgramGuidance';

interface MentorSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentMentor?: 'clara_luz' | 'leo';
  onSelectMentor: (mentor: 'clara_luz' | 'leo') => void;
  title?: string;
  isLocked?: boolean;
}

export const MentorSelectorModal: React.FC<MentorSelectorModalProps> = ({
  isOpen,
  onClose,
  currentMentor = 'clara_luz',
  onSelectMentor,
  title = 'Elige tu Guía para el Programa de 30 Días',
  isLocked = false,
}) => {
  const [pendingMentor, setPendingMentor] = React.useState<'clara_luz' | 'leo' | null>(null);

  if (!isOpen) return null;

  const handleConfirmChoice = (mentor: 'clara_luz' | 'leo') => {
    onSelectMentor(mentor);
    setPendingMentor(null);
    onClose();
  };

  const selectedProfile = pendingMentor === 'clara_luz' ? CLARA_LUZ_PROFILE : LEO_PROFILE;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={isLocked ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] rounded-[24px] bg-[#0A1626] border border-white/[0.15] shadow-2xl flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-start sm:items-center justify-between gap-4 shrink-0 bg-[#060F1E]/60">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#FBBF24] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Nuestros 2 Únicos Guías Disponibles</span>
            </div>
            <h2 className="font-editorial text-[22px] sm:text-[26px] text-[#F1F5F9] font-normal leading-tight">
              {title}
            </h2>
            <p className="text-[12.5px] sm:text-[13.5px] text-[#CBD5E1] max-w-[65ch]">
              Tenemos dos únicos guías en este programa: <strong>Clara Luz</strong> y <strong>Leo</strong>. Al iniciar tu programa de 30 días, escoge a tu guía. De ahí en adelante, todo el programa será guiado exclusivamente por el mentor que selecciones. <strong>Una vez elegido, no podrás cambiarlo.</strong>
            </p>
          </div>

          {!isLocked && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer shrink-0"
              aria-label="Cerrar selección"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Confirmation Screen */}
        {pendingMentor ? (
          <div className="p-6 sm:p-8 flex-1 flex flex-col justify-center items-center text-center space-y-6 max-w-xl mx-auto animate-fade-in">
            {/* Mentor Portrait with Halo */}
            <div className={`relative w-24 h-24 rounded-full p-1 shrink-0 ${
              pendingMentor === 'clara_luz'
                ? 'bg-gradient-to-tr from-[#14B8A6] via-[#0D9488] to-[#F59E0B] shadow-[0_0_25px_rgba(20,184,166,0.5)]'
                : 'bg-gradient-to-tr from-[#0EA5E9] via-[#F59E0B] to-[#10B981] shadow-[0_0_25px_rgba(245,158,11,0.5)]'
            }`}>
              <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                {pendingMentor === 'clara_luz' ? (
                  <svg className="w-14 h-14 text-[#99F6E4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M12 14c2.5 0 4.5 1.5 4.5 3.5" />
                  </svg>
                ) : (
                  <svg className="w-14 h-14 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M9 7h6" strokeWidth={2.5} />
                  </svg>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className={`text-[12px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${selectedProfile.badgeBg} ${selectedProfile.badgeText} border ${selectedProfile.border}`}>
                {selectedProfile.fullName} • {selectedProfile.title}
              </span>
              <h3 className="font-editorial text-[24px] sm:text-[28px] text-white font-normal leading-tight">
                ¿Confirmas a {selectedProfile.fullName} como tu guía definitivo?
              </h3>
            </div>

            {/* Permanent Lock Warning Callout */}
            <div className="p-4 rounded-[16px] bg-[#F59E0B]/10 border-2 border-[#F59E0B]/50 text-left space-y-2">
              <div className="flex items-center gap-2 text-[#FBBF24] font-bold text-[13px] uppercase tracking-wide">
                <Shield className="w-4 h-4 text-[#F59E0B]" />
                <span>Elección Permanente • No Podrás Cambiarlo Después</span>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-[#CBD5E1] leading-relaxed">
                Al confirmar a <strong>{selectedProfile.fullName}</strong>, todo tu proceso de 30 días será guiado exclusivamente por él/ella. Toda la conversación, tus datos, registros e interacciones serán <strong>100% personalizados</strong> entre tú y tu guía.
              </p>
            </div>

            {/* Action buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setPendingMentor(null)}
                className="w-full sm:w-1/2 min-h-[48px] px-4 py-2.5 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.12] text-[#CBD5E1] font-semibold text-[13.5px] transition-colors cursor-pointer"
              >
                Volver a revisar
              </button>

              <button
                type="button"
                onClick={() => handleConfirmChoice(pendingMentor)}
                className={`w-full sm:w-1/2 min-h-[48px] px-5 py-2.5 rounded-[12px] font-bold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg active:scale-[0.98] ${
                  pendingMentor === 'clara_luz'
                    ? 'bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-[#061517] hover:brightness-110'
                    : 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-[#060F1E] hover:brightness-110'
                }`}
              >
                <span>Confirmar Definitivamente</span>
                <Check className="w-4 h-4" strokeWidth={3} />
              </button>
            </div>
          </div>
        ) : (
          /* Content: 2 Mentors Cards */
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* GUÍA 1: CLARA LUZ */}
              <div
                className={`relative rounded-[22px] p-5 sm:p-6 flex flex-col justify-between transition-all border-2 ${
                  currentMentor === 'clara_luz'
                    ? 'bg-gradient-to-b from-[#0B2533] via-[#0E1F2F] to-[#071322] border-[#14B8A6] shadow-[0_0_25px_rgba(20,184,166,0.3)] ring-1 ring-[#14B8A6]'
                    : 'bg-gradient-to-b from-[#0B1728] to-[#071322] border-white/[0.1] hover:border-[#14B8A6]/60'
                }`}
              >
                {/* Selected Badge */}
                {currentMentor === 'clara_luz' && (
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14B8A6] text-[#061517] font-bold text-[11px] shadow-md">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    <span>Tu Guía Actual</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    {/* Portrait Avatar with Glowing Halo */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#14B8A6] via-[#0D9488] to-[#F59E0B] shadow-[0_0_20px_rgba(20,184,166,0.4)] shrink-0">
                      <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                        <svg className="w-11 h-11 text-[#99F6E4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                          <path d="M12 14c2.5 0 4.5 1.5 4.5 3.5" />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#5EEAD4] tracking-wider uppercase block">
                        CLARA LUZ
                      </span>
                      <h3 className="font-editorial text-[20px] sm:text-[22px] text-white font-normal leading-tight">
                        Tu Guía de F.E.™
                      </h3>
                      <p className="text-[12px] text-[#FDE68A] italic">
                        «Encuentra tu ancla de paz»
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/20 text-[#5EEAD4] border border-[#14B8A6]/30 text-[11px] font-medium">
                    <Heart className="w-3.5 h-3.5 fill-[#14B8A6]/30" />
                    <span>Paz interior • Sosiego nocturno • Gracia</span>
                  </div>

                  <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
                    {CLARA_LUZ_PROFILE.shortBio}
                  </p>

                  {/* Pilares */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08] text-center">
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Conexión</span>
                      <span className="text-[9.5px] text-[#94A3B8]">Intimidad</span>
                    </div>
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Seguridad</span>
                      <span className="text-[9.5px] text-[#94A3B8]">Ancla firme</span>
                    </div>
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Sabiduría</span>
                      <span className="text-[9.5px] text-[#94A3B8]">La Palabra</span>
                    </div>
                  </div>

                  {/* Voz del Guía */}
                  <div className="p-3 rounded-[12px] bg-[#14B8A6]/10 border border-[#14B8A6]/30 text-[12px] text-[#CCFBF1] italic leading-relaxed">
                    {CLARA_LUZ_PROFILE.welcomeGreeting}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setPendingMentor('clara_luz')}
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] bg-gradient-to-r from-[#14B8A6] to-[#0D9488] hover:brightness-110 active:scale-[0.98] text-[#061517] font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Elegir a Clara Luz (Definitivo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* GUÍA 2: LEO */}
              <div
                className={`relative rounded-[22px] p-5 sm:p-6 flex flex-col justify-between transition-all border-2 ${
                  currentMentor === 'leo'
                    ? 'bg-gradient-to-b from-[#2A1D0B] via-[#20180B] to-[#071322] border-[#F59E0B] shadow-[0_0_25px_rgba(245,158,11,0.3)] ring-1 ring-[#F59E0B]'
                    : 'bg-gradient-to-b from-[#0B1728] to-[#071322] border-white/[0.1] hover:border-[#F59E0B]/60'
                }`}
              >
                {/* Selected Badge */}
                {currentMentor === 'leo' && (
                  <div className="absolute top-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold text-[11px] shadow-md">
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    <span>Tu Guía Actual</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    {/* Portrait Avatar with Glowing Halo */}
                    <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-full p-1 bg-gradient-to-tr from-[#0EA5E9] via-[#F59E0B] to-[#10B981] shadow-[0_0_20px_rgba(245,158,11,0.4)] shrink-0">
                      <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                        <svg className="w-11 h-11 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                          <path d="M9 7h6" strokeWidth={2.5} />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#FBBF24] tracking-wider uppercase block">
                        LEO
                      </span>
                      <h3 className="font-editorial text-[20px] sm:text-[22px] text-white font-normal leading-tight">
                        Camina con F.E.™
                      </h3>
                      <p className="text-[12px] text-[#93C5FD] italic">
                        «Renueva tu fortaleza espiritual»
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FBBF24] border border-[#F59E0B]/30 text-[11px] font-medium">
                    <Shield className="w-3.5 h-3.5 fill-[#F59E0B]/30" />
                    <span>Fortaleza • Disciplina • Dirección & Propósito</span>
                  </div>

                  <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
                    {LEO_PROFILE.shortBio}
                  </p>

                  {/* Pilares */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/[0.08] text-center">
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Crecimiento</span>
                      <span className="text-[9.5px] text-[#94A3B8]">Hábitos</span>
                    </div>
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Dirección</span>
                      <span className="text-[9.5px] text-[#94A3B8]">Faro de luz</span>
                    </div>
                    <div className="p-2 rounded-[10px] bg-[#06111D] border border-white/[0.06]">
                      <span className="text-[11px] font-bold text-white block">Comunidad</span>
                      <span className="text-[9.5px] text-[#94A3B8]">Hogar</span>
                    </div>
                  </div>

                  {/* Voz del Guía */}
                  <div className="p-3 rounded-[12px] bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[12px] text-[#FEF3C7] italic leading-relaxed">
                    {LEO_PROFILE.welcomeGreeting}
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setPendingMentor('leo')}
                    className="w-full min-h-[46px] px-4 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 active:scale-[0.98] text-[#060F1E] font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Elegir a Leo (Definitivo)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
