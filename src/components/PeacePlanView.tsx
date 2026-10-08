import React, { useState } from 'react';
import { PEACE_ANCHOR_PLAN } from '../data/anchors';
import {
  Compass,
  Lock,
  Sparkles,
  ShieldCheck,
  Heart,
  ArrowRight,
  Image as ImageIcon,
  CheckCircle2,
  ChevronRight,
  X,
  Eye,
  UserCheck,
  RefreshCw,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { GraceStreakTracker } from './GraceStreakTracker';
import { DayIllustrationCard } from './DayIllustrationCard';
import { FaithGallery } from './FaithGallery';
import { MentorSelectorModal } from './MentorSelectorModal';
import {
  getMentorDailyGuidance,
  CLARA_LUZ_PROFILE,
  LEO_PROFILE,
} from '../data/mentorProgramGuidance';

interface PeacePlanViewProps {
  onOpenPlanDetails?: () => void;
  onOpenDay7Paywall?: () => void;
  selectedMentor?: 'clara_luz' | 'leo';
  onSelectMentor?: (mentor: 'clara_luz' | 'leo') => void;
  onOpenChatWithMentor?: (mentor: 'clara_luz' | 'leo', prompt?: string) => void;
}

export const PeacePlanView: React.FC<PeacePlanViewProps> = ({
  onOpenPlanDetails,
  onOpenDay7Paywall,
  selectedMentor = 'clara_luz',
  onSelectMentor,
  onOpenChatWithMentor,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2]);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('todos');
  const [isMentorModalOpen, setIsMentorModalOpen] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fe_mentor_locked') !== 'true' && localStorage.getItem('fe_mentor_chosen') !== 'true';
    } catch {
      return false;
    }
  });
  const [localMentor, setLocalMentor] = useState<'clara_luz' | 'leo'>(selectedMentor);

  React.useEffect(() => {
    if (selectedMentor) {
      setLocalMentor(selectedMentor);
    }
  }, [selectedMentor]);

  const activeMentor = selectedMentor || localMentor;
  const mentorProfile = activeMentor === 'clara_luz' ? CLARA_LUZ_PROFILE : LEO_PROFILE;
  const currentPlan = PEACE_ANCHOR_PLAN.find((p) => p.dayNumber === selectedDay) || PEACE_ANCHOR_PLAN[0];
  const mentorGuidance = getMentorDailyGuidance(currentPlan.dayNumber, activeMentor);

  const weeks = [
    { number: 1, label: 'Semana 1', range: 'Días 1 - 7', desc: 'Fundamentos de Fe & Esperanza', isFree: true, quadrant: 'Cuerpo & Mente' },
    { number: 2, label: 'Semana 2', range: 'Días 8 - 14', desc: 'Familia, Amigos, Trabajo & Sociedad', isFree: false, quadrant: 'Alma & Relaciones' },
    { number: 3, label: 'Semana 3', range: 'Días 15 - 21', desc: 'Renovación de Mente & Fortaleza', isFree: false, quadrant: 'Mente & Fisiología' },
    { number: 4, label: 'Semana 4', range: 'Días 22 - 28', desc: 'Resiliencia, Alianza & Sanidad', isFree: false, quadrant: 'Alma & Sanidad' },
    { number: 5, label: 'Cierre', range: 'Días 29 - 30', desc: 'Ancla Firme & Hábito Perpetuo', isFree: false, quadrant: 'Propósito en Dios' },
  ];

  const filteredDays = PEACE_ANCHOR_PLAN.filter((d) => d.weekNumber === activeWeekTab);

  const handleChooseMentor = (mentor: 'clara_luz' | 'leo') => {
    setLocalMentor(mentor);
    try {
      localStorage.setItem('fe_mentor_chosen', 'true');
      localStorage.setItem('fe_mentor_locked', 'true');
      localStorage.setItem('fe_selected_mentor', mentor);
    } catch {}
    if (onSelectMentor) {
      onSelectMentor(mentor);
    }
    setIsMentorModalOpen(false);
  };

  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const galleryCategories = [
    { id: 'todos', label: 'Todos los 30 Días' },
    { id: 'fe_esperanza', label: 'Fe & Promesas' },
    { id: 'familia', label: 'Familia & Hogar' },
    { id: 'amigos', label: 'Amigos & Hermandad' },
    { id: 'trabajo', label: 'Trabajo & Vocación' },
    { id: 'sociedad', label: 'Luz en la Sociedad' },
    { id: 'oracion', label: 'Oración & Noche' },
    { id: 'sanidad_perdon', label: 'Sanidad & Perdón' },
  ];

  const filteredGalleryDays = selectedGalleryCategory === 'todos'
    ? PEACE_ANCHOR_PLAN
    : PEACE_ANCHOR_PLAN.filter((d) => d.category === selectedGalleryCategory);

  return (
    <div className="w-full max-w-5xl lg:max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in overflow-hidden">
      {/* 1. Header Banner & Mentor Information */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[20px] p-5 sm:p-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-white/[0.08] gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="text-[11.5px] sm:text-[12px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Ruta 30 Días: El Mapa de Transformación en Dios
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] sm:text-[10.5px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
              Días 1 a 7 Libres
            </span>
            <span className="text-[11.5px] sm:text-[12px] text-[#94A3B8] tabular-nums font-semibold">
              Día {selectedDay} de 30
            </span>
          </div>
        </div>

        {/* 2. CARD DEL GUÍA SELECCIONADO PARA EL PROGRAMA DE 30 DÍAS */}
        <div className={`p-4 sm:p-5 rounded-[18px] border-2 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
          activeMentor === 'clara_luz'
            ? 'bg-gradient-to-r from-[#072428] via-[#091D2F] to-[#071322] border-[#14B8A6]/60 shadow-[0_4px_20px_rgba(20,184,166,0.2)]'
            : 'bg-gradient-to-r from-[#241707] via-[#1F190D] to-[#071322] border-[#F59E0B]/60 shadow-[0_4px_20px_rgba(245,158,11,0.2)]'
        }`}>
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Avatar Glowing */}
            <div className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 shrink-0 ${
              activeMentor === 'clara_luz'
                ? 'bg-gradient-to-tr from-[#14B8A6] via-[#0D9488] to-[#F59E0B] shadow-[0_0_15px_rgba(20,184,166,0.4)]'
                : 'bg-gradient-to-tr from-[#0EA5E9] via-[#F59E0B] to-[#10B981] shadow-[0_0_15px_rgba(245,158,11,0.4)]'
            }`}>
              <div className="w-full h-full rounded-full bg-[#071322] flex items-center justify-center overflow-hidden border border-white/40">
                {activeMentor === 'clara_luz' ? (
                  <svg className="w-8 h-8 text-[#99F6E4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M12 14c2.5 0 4.5 1.5 4.5 3.5" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8 text-[#93C5FD]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                    <path d="M9 7h6" strokeWidth={2.5} />
                  </svg>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-0.5">
                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#CBD5E1]">
                  Tu Guía Oficial de los 30 Días:
                </span>
                <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full ${mentorProfile.badgeBg} ${mentorProfile.badgeText} border ${mentorProfile.border}`}>
                  {mentorProfile.fullName} • {mentorProfile.title}
                </span>
              </div>
              <h2 className="font-editorial text-[18px] sm:text-[21px] text-white font-normal leading-snug">
                Programa guiado por {mentorProfile.fullName}
              </h2>
              <p className="text-[12.5px] text-[#CBD5E1] line-clamp-1 max-w-[65ch]">
                {mentorProfile.specialty}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center w-full md:w-auto justify-end">
            <div className="px-3.5 py-2 rounded-[10px] bg-white/[0.05] border border-white/[0.12] text-[12px] font-semibold text-[#CBD5E1] flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Guía Permanente de tus 30 Días</span>
            </div>
          </div>
        </div>

        <h1 className="font-editorial text-[22px] sm:text-[28px] lg:text-[30px] text-[#F1F5F9] font-normal leading-snug">
          El itinerario de 30 días para ordenar tu vida con Dios
        </h1>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#94A3B8] leading-relaxed max-w-[85ch]">
          Diseñado para madres, padres y profesionales que buscan transformar la sobrecarga en un hábito sólido de paz. Todo tu proceso es acompañado por tu guía elegido ({mentorProfile.fullName}), con arte contemplativo, reflexiones personalizadas y acciones de anclaje.
        </p>

        {/* Gallery button trigger */}
        <div className="pt-1 flex items-center justify-between flex-wrap gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="min-h-[42px] px-4 py-2 rounded-[10px] bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-[#FBBF24] text-[12.5px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Ver Itinerario 30 Días (Galería)</span>
            </button>

            <a
              href="#galeria-santuario"
              className="min-h-[42px] px-3.5 py-2 rounded-[10px] bg-white/[0.03] hover:bg-white/[0.08] text-[#CBD5E1] text-[12.5px] font-medium transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Galería de Fe</span>
            </a>
          </div>

          <span className="text-[12px] font-medium text-[#CBD5E1]">
            Guía activo: <strong className="text-[#FBBF24]">{mentorProfile.fullName}</strong>
          </span>
        </div>
      </div>

      {/* Grace-Based Streak Component */}
      <GraceStreakTracker
        currentDay={selectedDay}
        completedDays={completedDays}
        onSelectDay={(dayNum) => {
          setSelectedDay(dayNum);
          const found = PEACE_ANCHOR_PLAN.find((d) => d.dayNumber === dayNum);
          if (found) setActiveWeekTab(found.weekNumber);
        }}
      />

      {/* Selector de Semanas (Tabs) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
            Itinerario Semanal (30 Días de Transformación)
          </span>
          <span className="text-[11px] text-[#94A3B8]">
            {completedDays.length} de 30 días sellados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {weeks.map((week) => (
            <button
              key={week.number}
              type="button"
              onClick={() => setActiveWeekTab(week.number)}
              className={`p-3 rounded-[12px] text-left transition-all cursor-pointer border ${
                activeWeekTab === week.number
                  ? 'bg-[#0E223D] border-[#F59E0B] shadow-sm'
                  : 'bg-[#060F1E] border-white/[0.08] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-bold ${activeWeekTab === week.number ? 'text-[#F59E0B]' : 'text-[#F1F5F9]'}`}>
                  {week.label}
                </span>
                {week.isFree ? (
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-[#10B981]/15 text-[#34D399]">
                    Libre
                  </span>
                ) : (
                  <Lock className="w-3 h-3 text-[#94A3B8]" />
                )}
              </div>
              <span className="text-[10px] text-[#94A3B8] block">{week.range}</span>
              <span className="text-[10.5px] text-[#CBD5E1] line-clamp-1 mt-0.5">{week.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Días de la Semana Activa */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[12px] text-[#94A3B8]">
          <span>Selecciona un día para meditar con tu guía {mentorProfile.fullName}:</span>
          <span>{weeks.find(w => w.number === activeWeekTab)?.quadrant}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {filteredDays.map((day) => {
            const isSelected = selectedDay === day.dayNumber;
            const isCompleted = completedDays.includes(day.dayNumber);

            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`p-2.5 rounded-[12px] border text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/40 shadow-sm'
                    : isCompleted
                    ? 'bg-[#061814] border-[#10B981]/40 hover:border-[#10B981]'
                    : 'bg-[#060F1E] border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#F59E0B]' : 'text-[#F1F5F9]'}`}>
                    Día {day.dayNumber}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                  ) : !day.isFreePreview ? (
                    <Lock className="w-3 h-3 text-[#94A3B8]" />
                  ) : null}
                </div>
                <span className="text-[10px] text-[#CBD5E1] line-clamp-2 leading-tight">
                  {day.theme}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONTENIDO DEL DÍA SELECCIONADO */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[20px] p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30">
                Semana {currentPlan.weekNumber} • Día {currentPlan.dayNumber} de 30
              </span>
              <span className={`text-[10.5px] font-semibold uppercase px-2 py-0.5 rounded-full ${mentorProfile.badgeBg} ${mentorProfile.badgeText} border ${mentorProfile.border}`}>
                Acompañado por {mentorProfile.fullName}
              </span>
            </div>
            <h2 className="font-editorial text-[22px] sm:text-[25px] text-[#F1F5F9] font-normal leading-snug">
              {currentPlan.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleDayCompletion(currentPlan.dayNumber)}
              className={`min-h-[40px] px-3.5 py-2 rounded-[10px] text-[12.5px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                completedDays.includes(currentPlan.dayNumber)
                  ? 'bg-[#10B981] text-[#060F1E]'
                  : 'bg-white/[0.05] hover:bg-white/[0.1] text-[#CBD5E1] border border-white/[0.1]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{completedDays.includes(currentPlan.dayNumber) ? 'Día Completado' : 'Marcar como Completado'}</span>
            </button>
          </div>
        </div>

        {/* 1. VISUAL ARTWORK FOR THIS DAY */}
        <div className="w-full">
          <DayIllustrationCard
            illustrationKey={currentPlan.illustrationKey || `dia_${currentPlan.dayNumber}`}
            themeTitle={currentPlan.title}
            categoryLabel={currentPlan.categoryLabel || currentPlan.theme}
          />
        </div>

        {/* 2. CARD EXCLUSIVO DE TU GUÍA OFICIAL (CLARA LUZ O LEO) */}
        <div className={`p-5 rounded-[18px] border-2 transition-all space-y-4 ${
          activeMentor === 'clara_luz'
            ? 'bg-gradient-to-br from-[#072528] via-[#091D2F] to-[#071322] border-[#14B8A6]/70 shadow-lg'
            : 'bg-gradient-to-br from-[#291807] via-[#1E180D] to-[#071322] border-[#F59E0B]/70 shadow-lg'
        }`}>
          {/* Header de la Reflexión del Guía */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                activeMentor === 'clara_luz'
                  ? 'bg-[#14B8A6]/20 border-[#14B8A6] text-[#5EEAD4]'
                  : 'bg-[#F59E0B]/20 border-[#F59E0B] text-[#FBBF24]'
              }`}>
                {activeMentor === 'clara_luz' ? (
                  <Heart className="w-5 h-5 fill-current" />
                ) : (
                  <Shield className="w-5 h-5 fill-current" />
                )}
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider block text-white">
                  Acompañamiento del Guía: {mentorProfile.fullName}
                </span>
                <span className={`text-[12px] font-medium ${mentorProfile.badgeText}`}>
                  {mentorGuidance.toneLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {onOpenChatWithMentor && (
                <button
                  type="button"
                  onClick={() => onOpenChatWithMentor(activeMentor, `Hola ${mentorProfile.fullName}, estoy en el Día ${currentPlan.dayNumber}: «${currentPlan.title}». ¿Qué consejo espiritual tienes para mí hoy?`)}
                  className="px-3 py-1.5 rounded-[10px] bg-white/[0.08] hover:bg-white/[0.15] text-[11.5px] font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Hablar con {mentorProfile.fullName}</span>
                </button>
              )}
            </div>
          </div>

          {/* Mensaje pastoral de Clara Luz o Leo */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#CBD5E1] block">
              Mensaje Personal de {mentorProfile.fullName} para tu Día {currentPlan.dayNumber}
            </span>
            <p className="font-editorial text-[14.5px] sm:text-[15.5px] text-[#F1F5F9] leading-relaxed italic bg-black/25 p-3.5 rounded-[12px] border border-white/[0.05]">
              {mentorGuidance.reflectionMessage}
            </p>
          </div>

          {/* Oración Guiada de Clara Luz o Leo */}
          <div className="space-y-1.5">
            <span className={`text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${mentorProfile.badgeText}`}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Oración de Entrega con {mentorProfile.fullName}</span>
            </span>
            <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed bg-white/[0.03] p-3 rounded-[12px] border border-white/[0.05]">
              {mentorGuidance.guidedPrayer}
            </p>
          </div>

          {/* Desafío Práctico de Fe de Clara Luz o Leo */}
          <div className="space-y-1 pt-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A7F3D0] block">
              Desafío de Calma y Fe Guiado por {mentorProfile.fullName}:
            </span>
            <p className="text-[12.5px] text-[#D1FAE5]">
              {mentorGuidance.mentorChallenge}
            </p>
          </div>
        </div>

        {/* 3. MENSAJE CLAVE DESTACADO */}
        {currentPlan.keyMessage && (
          <div className="p-4 rounded-[14px] bg-gradient-to-r from-[#F59E0B]/15 via-[#0E223D] to-[#0B1728] border border-[#F59E0B]/40 shadow-sm space-y-1">
            <span className="text-[10px] sm:text-[10.5px] font-bold text-[#FBBF24] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2.5} />
              <span>Mensaje Clave Bíblico</span>
            </span>
            <p className="text-[13px] sm:text-[14px] text-[#F1F5F9] font-medium leading-relaxed">
              {currentPlan.keyMessage}
            </p>
          </div>
        )}

        {/* Day 7 Callout to paywall */}
        {currentPlan.dayNumber === 7 && onOpenDay7Paywall && (
          <div className="p-4 rounded-[14px] bg-[#0E223D] border border-[#10B981]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34D399] block">
                Cierre de la Primera Semana
              </span>
              <p className="text-[13px] text-[#F1F5F9]">
                Construye un refugio a prueba de tormentas con tu guía {mentorProfile.fullName} durante los 30 días.
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenDay7Paywall}
              className="min-h-[44px] px-4 py-2 rounded-[10px] bg-[#F59E0B] text-[#060F1E] font-semibold text-[13px] shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm self-start sm:self-center"
            >
              <span>Ver detalles de la ruta</span>
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
            </button>
          </div>
        )}

        {/* Locked day banner */}
        {!currentPlan.isFreePreview && (
          <div className="p-4 rounded-[14px] bg-[#0E223D] border border-[#F59E0B]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div className="text-[12.5px] sm:text-[13px] text-[#CBD5E1]">
                <strong>Proceso de 30 Días con {mentorProfile.fullName}:</strong> Este día forma parte del itinerario guiado. Accede por un <strong>único valor de USD 7.99 o $29.900 COL</strong> (sin membresía ni pagos recurrentes).
              </div>
            </div>
            {onOpenPlanDetails && (
              <button
                type="button"
                onClick={onOpenPlanDetails}
                className="min-h-[44px] px-4 py-2 rounded-[10px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] text-[12.5px] font-bold shrink-0 transition-colors cursor-pointer self-start sm:self-center shadow-sm"
              >
                Desbloquear 30 Días (USD 7.99 / $29.900 COL)
              </button>
            )}
          </div>
        )}

        {/* Plan Content Details */}
        <div className="space-y-3 pt-1">
          {/* Principio de Verdad */}
          <div className="p-4 rounded-[12px] bg-[#060F1E] border border-white/[0.08]">
            <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#F59E0B] uppercase tracking-wider block mb-1">
              Principio de Verdad
            </span>
            <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed">
              {currentPlan.principle}
            </p>
          </div>

          {/* Versículo Bíblico */}
          <div className="p-4 rounded-[12px] bg-[#060F1E] border border-white/[0.08]">
            <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#CBD5E1] uppercase tracking-wider block mb-1">
              Renovación de la Mente ({currentPlan.scriptureRef})
            </span>
            <p className="font-editorial text-[14px] sm:text-[15px] italic text-[#F1F5F9] leading-relaxed">
              «{currentPlan.verse}»
            </p>
          </div>

          {/* Acción Práctica de Anclaje */}
          <div className="p-4 rounded-[12px] bg-[#10B981]/10 border border-[#10B981]/30">
            <span className="text-[10px] sm:text-[10.5px] font-semibold text-[#34D399] uppercase tracking-wider block mb-1">
              Acción Práctica de Anclaje
            </span>
            <p className="text-[13px] text-[#A7F3D0] leading-relaxed">
              {currentPlan.anchorAction}
            </p>
          </div>
        </div>
      </div>

      {/* COMPONENTE GALERÍA VISUAL DE FE */}
      <div id="galeria-santuario" className="pt-2">
        <FaithGallery />
      </div>

      {/* MODAL: Selector de Guía (Clara Luz o Leo) - Elección Permanente Obligatoria */}
      <MentorSelectorModal
        isOpen={isMentorModalOpen}
        onClose={() => {
          if (localStorage.getItem('fe_mentor_chosen') === 'true') {
            setIsMentorModalOpen(false);
          }
        }}
        currentMentor={activeMentor}
        onSelectMentor={handleChooseMentor}
        isLocked={true}
      />

      {/* MODAL: Galería de Ilustraciones Espirituales (30 Días) */}
      {isGalleryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div
            className="relative w-full max-w-[720px] max-h-[90vh] rounded-[20px] bg-[#0B1728] border border-white/[0.15] shadow-2xl flex flex-col overflow-hidden text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-editorial text-[18px] sm:text-[20px] text-[#F1F5F9] font-normal">
                    Galería de Arte Espiritual (30 Días)
                  </h3>
                  <span className="text-[11px] text-[#94A3B8] block">
                    Ilustraciones bíblicas, de familia, amigos, trabajo, sociedad y oración
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="p-2 rounded-full hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                aria-label="Cerrar galería"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="px-4 py-2.5 border-b border-white/[0.08] bg-[#060F1E] flex gap-1.5 overflow-x-auto scrollbar-none shrink-0">
              {galleryCategories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedGalleryCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    selectedGalleryCategory === cat.id
                      ? 'bg-[#F59E0B] text-[#060F1E] border-[#F59E0B]'
                      : 'bg-white/[0.03] text-[#CBD5E1] border-white/[0.08] hover:bg-white/[0.08]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Gallery Cards Grid */}
            <div className="p-4 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredGalleryDays.map((day) => (
                  <div
                    key={day.dayNumber}
                    className="rounded-[14px] bg-[#060F1E] border border-white/[0.08] p-3 space-y-2.5 hover:border-[#F59E0B]/50 transition-colors"
                  >
                    <DayIllustrationCard
                      illustrationKey={day.illustrationKey || `dia_${day.dayNumber}`}
                      themeTitle={`Día ${day.dayNumber}: ${day.theme}`}
                      categoryLabel={day.categoryLabel || 'Fe y Esperanza'}
                      showZoomButton={false}
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-[#F59E0B] block">
                        {day.scriptureRef}
                      </span>
                      <p className="text-[11.5px] text-[#CBD5E1] line-clamp-2">
                        {day.keyMessage || day.principle}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedDay(day.dayNumber);
                        setActiveWeekTab(day.weekNumber);
                        setIsGalleryOpen(false);
                      }}
                      className="w-full py-1.5 px-3 rounded-[8px] bg-white/[0.04] hover:bg-[#F59E0B] hover:text-[#060F1E] text-[#CBD5E1] text-[11.5px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Ir al proceso del Día {day.dayNumber}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3.5 bg-[#060F1E] border-t border-white/[0.08] flex items-center justify-between text-[11.5px] text-[#94A3B8] shrink-0">
              <span>{filteredGalleryDays.length} ilustraciones espirituales</span>
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                className="px-4 py-1.5 rounded-[10px] bg-[#F59E0B] text-[#060F1E] font-semibold text-[12px] cursor-pointer"
              >
                Cerrar Galería
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
