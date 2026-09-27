import React, { useState } from 'react';
import { PEACE_ANCHOR_PLAN } from '../data/anchors';
import { Compass, Lock, Sparkles, ShieldCheck, Heart, ArrowRight, Image as ImageIcon, CheckCircle2, ChevronRight, X, Eye } from 'lucide-react';
import { GraceStreakTracker } from './GraceStreakTracker';
import { DayIllustrationCard } from './DayIllustrationCard';
import { FaithGallery } from './FaithGallery';

interface PeacePlanViewProps {
  onOpenPlanDetails?: () => void;
  onOpenDay7Paywall?: () => void;
}

export const PeacePlanView: React.FC<PeacePlanViewProps> = ({
  onOpenPlanDetails,
  onOpenDay7Paywall,
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [activeWeekTab, setActiveWeekTab] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<number[]>([1, 2]);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('todos');

  const currentPlan = PEACE_ANCHOR_PLAN.find((p) => p.dayNumber === selectedDay) || PEACE_ANCHOR_PLAN[0];

  const weeks = [
    { number: 1, label: 'Semana 1', range: 'Días 1 - 7', desc: 'Fundamentos de Fe & Esperanza', isFree: true, quadrant: 'Cuerpo & Mente' },
    { number: 2, label: 'Semana 2', range: 'Días 8 - 14', desc: 'Familia, Amigos, Trabajo & Sociedad', isFree: false, quadrant: 'Alma & Relaciones' },
    { number: 3, label: 'Semana 3', range: 'Días 15 - 21', desc: 'Renovación de Mente & Fortaleza', isFree: false, quadrant: 'Mente & Fisiología' },
    { number: 4, label: 'Semana 4', range: 'Días 22 - 28', desc: 'Resiliencia, Alianza & Sanidad', isFree: false, quadrant: 'Alma & Sanidad' },
    { number: 5, label: 'Cierre', range: 'Días 29 - 30', desc: 'Ancla Firme & Hábito Perpetuo', isFree: false, quadrant: 'Propósito en Dios' },
  ];

  const filteredDays = PEACE_ANCHOR_PLAN.filter((d) => d.weekNumber === activeWeekTab);

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
    <div className="w-full max-w-[720px] mx-auto space-y-5 sm:space-y-7 animate-fade-in overflow-hidden">
      {/* Header Banner */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-4 sm:p-7 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/[0.08] gap-2">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="text-[11px] sm:text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
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

        <h1 className="font-editorial text-[22px] sm:text-[28px] text-[#F1F5F9] font-normal leading-snug">
          El itinerario de 30 días para ordenar tu vida con Dios
        </h1>
        <p className="text-[13px] sm:text-[14px] text-[#94A3B8] leading-relaxed">
          Diseñado para madres, padres y profesionales que buscan transformar la sobrecarga en un hábito sólido de paz. Cada día incluye arte espiritual contemplativo, versículos con mensaje clave y acción de anclaje.
        </p>

        {/* Gallery button trigger */}
        <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setIsGalleryOpen(true)}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] border border-white/[0.1] text-[#FBBF24] text-[12px] sm:text-[12.5px] font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <ImageIcon className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Ver Itinerario 30 Días</span>
            </button>

            <a
              href="#galeria-santuario"
              className="min-h-[44px] px-3 py-1.5 rounded-[10px] bg-white/[0.03] hover:bg-white/[0.08] text-[#CBD5E1] text-[12px] font-medium transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Galería de Fe Aleatoria</span>
            </a>
          </div>

          <span className="text-[11px] text-[#94A3B8]">
            Mentores: Clara Luz & Leo
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

      {/* Week Selector Tabs - Horizontal Swipeable on Mobile */}
      <div className="space-y-1.5">
        <span className="text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] block">
          Semanas del Proceso:
        </span>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x -mx-1 px-1">
          {weeks.map((w) => {
            const isActive = activeWeekTab === w.number;
            return (
              <button
                key={w.number}
                type="button"
                onClick={() => {
                  setActiveWeekTab(w.number);
                  const firstDayOfWeek = PEACE_ANCHOR_PLAN.find((d) => d.weekNumber === w.number);
                  if (firstDayOfWeek) setSelectedDay(firstDayOfWeek.dayNumber);
                }}
                className={`min-h-[44px] px-3.5 py-2 rounded-[12px] text-left transition-all border shrink-0 snap-start cursor-pointer min-w-[130px] sm:min-w-0 sm:flex-1 ${
                  isActive
                    ? 'bg-[#0E223D] text-[#F1F5F9] border-[#F59E0B] shadow-sm ring-1 ring-[#F59E0B]/30'
                    : 'bg-[#0B1728] text-[#94A3B8] border-white/[0.08] hover:bg-[#0B1728]/80 hover:text-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center gap-1.5 justify-between">
                  <span className="text-[12px] font-semibold whitespace-nowrap">{w.label}</span>
                  {!w.isFree ? (
                    <Lock className="w-3 h-3 text-[#F59E0B]" strokeWidth={2} />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  )}
                </div>
                <span className={`text-[9.5px] block truncate mt-0.5 ${isActive ? 'text-[#F59E0B]' : 'text-[#64748B]'}`}>
                  {w.range}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Days Grid in Active Week - Responsive 3 col on mobile, 4 on tablet, 7 on desktop */}
      <div className="space-y-1.5">
        <span className="text-[10.5px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#94A3B8] block">
          Días en {weeks.find((w) => w.number === activeWeekTab)?.label}:
        </span>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {filteredDays.map((day) => {
            const isSelected = selectedDay === day.dayNumber;
            const isFree = day.isFreePreview !== false;
            const isDone = completedDays.includes(day.dayNumber);

            return (
              <button
                key={day.dayNumber}
                type="button"
                onClick={() => setSelectedDay(day.dayNumber)}
                className={`p-2.5 sm:p-3 rounded-[12px] text-center transition-all border flex flex-col items-center justify-between min-h-[76px] sm:min-h-[82px] cursor-pointer ${
                  isSelected
                    ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/50 shadow-md'
                    : 'bg-[#0B1728] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0B1728]/90'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] sm:text-[11.5px] font-bold text-[#F1F5F9]">
                    Día {day.dayNumber}
                  </span>
                  {!isFree ? (
                    <Lock className="w-3 h-3 text-[#F59E0B]" strokeWidth={2} />
                  ) : isDone ? (
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                  ) : null}
                </div>

                <span className="text-[9.5px] sm:text-[10px] text-[#CBD5E1] line-clamp-2 text-left w-full mt-1 leading-snug">
                  {day.theme}
                </span>

                {isSelected && <div className="w-2.5 h-1 rounded-full bg-[#F59E0B] mt-1 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Process Card */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-4 sm:p-6 space-y-4 shadow-xl">
        {/* Day Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#F59E0B]">
                {currentPlan.categoryLabel || currentPlan.theme}
              </span>
              <span className="text-[#64748B]">•</span>
              <span className="text-[10.5px] text-[#94A3B8] font-semibold">
                Día {currentPlan.dayNumber} de 30
              </span>
            </div>
            <h2 className="font-editorial text-[19px] sm:text-[23px] text-[#F1F5F9] font-normal leading-snug">
              {currentPlan.title}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <button
              type="button"
              onClick={() => toggleDayCompletion(currentPlan.dayNumber)}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[12px] font-medium border cursor-pointer transition-colors flex items-center gap-1.5 ${
                completedDays.includes(currentPlan.dayNumber)
                  ? 'bg-[#10B981]/20 border-[#10B981] text-[#A7F3D0]'
                  : 'bg-white/[0.04] border-white/[0.1] text-[#CBD5E1] hover:bg-white/[0.08]'
              }`}
            >
              {completedDays.includes(currentPlan.dayNumber) && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
              )}
              <span>{completedDays.includes(currentPlan.dayNumber) ? 'Completado' : 'Marcar completado'}</span>
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

        {/* 2. MENSAJE CLAVE DESTACADO (Solicitado por el usuario) */}
        {currentPlan.keyMessage && (
          <div className="p-4 rounded-[14px] bg-gradient-to-r from-[#F59E0B]/15 via-[#0E223D] to-[#0B1728] border border-[#F59E0B]/40 shadow-sm space-y-1">
            <span className="text-[10px] sm:text-[10.5px] font-bold text-[#FBBF24] uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2.5} />
              <span>Mensaje Clave para Renovar el Ánimo y la Confianza</span>
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
                Construye un refugio a prueba de tormentas con Clara Luz y Leo durante los 30 días.
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
                <strong>Proceso de 30 Días con Clara Luz y Leo:</strong> Este día forma parte del itinerario guiado por nuestros dos mentores de Fe y Esperanza. Accede por un <strong>único valor de 12.99 Dólares</strong> (sin membresía ni pagos recurrentes).
              </div>
            </div>
            {onOpenPlanDetails && (
              <button
                type="button"
                onClick={onOpenPlanDetails}
                className="min-h-[44px] px-4 py-2 rounded-[10px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] text-[12.5px] font-bold shrink-0 transition-colors cursor-pointer self-start sm:self-center shadow-sm"
              >
                Desbloquear 30 Días (12.99 USD)
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

      {/* COMPONENTE GALERÍA VISUAL DE FE (FAMILIAS, NATURALEZA, ORACIÓN - MODO SANTUARIO NOCTURNO) */}
      <div id="galeria-santuario" className="pt-2">
        <FaithGallery />
      </div>

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
