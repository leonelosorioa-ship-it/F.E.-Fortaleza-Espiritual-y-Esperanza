import React, { useState } from 'react';
import {
  Sun,
  X,
  BookOpen,
  HeartHandshake,
  Copy,
  Check,
  Share2,
  Bell,
  Sparkles,
  Quote,
} from 'lucide-react';
import { DailyPromiseData } from '../types';
import { getTodayDailyPromise } from '../services/notificationService';
import { JesusEnTiConfioScene, JesusSceneKey } from './JesusEnTiConfioScene';

interface DailyPromiseModalProps {
  isOpen: boolean;
  onClose: () => void;
  promise?: DailyPromiseData | null;
  onOpenGratitude?: () => void;
  onOpenReminderSettings?: () => void;
}

export const DailyPromiseModal: React.FC<DailyPromiseModalProps> = ({
  isOpen,
  onClose,
  promise,
  onOpenGratitude,
  onOpenReminderSettings,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const activePromise = promise || getTodayDailyPromise();

  if (!isOpen || !activePromise) return null;

  const handleCopy = () => {
    const textToCopy = `${activePromise.theme}\n\n${activePromise.verse}\n— ${activePromise.reference}\n\nReflexión: ${activePromise.reflection}\n\nOración: ${activePromise.prayer}\n\nCompartido desde Tu Poder Mental • F.E. Fortaleza Espiritual`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formattedDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const getSceneForPromise = (): JesusSceneKey => {
    const t = (activePromise.theme + ' ' + activePromise.verse).toLowerCase();
    if (t.includes('paz') || t.includes('reposo') || t.includes('descanso')) {
      return 'campo_lavanda_juntos';
    }
    if (t.includes('misericordia') || t.includes('perdón') || t.includes('gracia')) {
      return 'adoracion_altar_misericordia';
    }
    if (t.includes('fuerza') || t.includes('fortaleza') || t.includes('valiente') || t.includes('ánimo')) {
      return 'leo_fortaleza_oracion';
    }
    if (t.includes('familia') || t.includes('casa') || t.includes('hijo')) {
      return 'custodia_santisimo_radiante';
    }
    return 'fortaleza_espiritual_final';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="daily-promise-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020610]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-[#091524] border border-amber-500/30 rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-[#F1F5F9] overflow-hidden my-auto z-10">
        {/* Subtle luminous header gradient */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B] shrink-0">
              <Sun className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B]">
                  Promesa Bíblica del Día
                </span>
                <span className="text-[11px] text-[#64748B]">• {formattedDate}</span>
              </div>
              <h2
                id="daily-promise-title"
                className="font-editorial text-[20px] sm:text-[23px] text-[#F8FAFC] font-normal leading-snug"
              >
                {activePromise.theme}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Cerrar modal de promesa del día"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
          {/* Obra Visual Sacra Litúrgica para la Promesa del Día */}
          <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 bg-[#0A1624] shadow-lg">
            <div className="h-44 sm:h-52 w-full relative overflow-hidden">
              <JesusEnTiConfioScene sceneKey={getSceneForPromise()} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/20 pointer-events-none" />
              <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10.5px] text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Arte Sagrado • {activePromise.theme}</span>
              </span>
            </div>
          </div>

          {/* Scripture Verse Card */}
          <div className="relative bg-gradient-to-br from-[#0D1D30] to-[#081320] border border-amber-500/25 rounded-2xl p-5 sm:p-6 shadow-inner">
            <Quote className="absolute top-4 right-4 w-8 h-8 text-amber-500/10 pointer-events-none" />

            <blockquote className="font-editorial text-[18px] sm:text-[20px] text-[#FEF3C7] leading-relaxed italic font-normal mb-3">
              {activePromise.verse}
            </blockquote>

            <div className="flex items-center gap-2 text-amber-400 font-semibold text-[13px]">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>{activePromise.reference}</span>
            </div>
          </div>

          {/* Spiritual Reflection */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wider text-[#94A3B8]">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Reflexión para tu Jornada</span>
            </div>
            <p className="text-[14px] text-[#CBD5E1] leading-relaxed">
              {activePromise.reflection}
            </p>
          </div>

          {/* Declarative Prayer */}
          <div className="rounded-xl bg-[#0B1A2E] border border-white/[0.08] p-4 space-y-1.5">
            <span className="text-[11.5px] font-semibold uppercase tracking-wider text-emerald-400">
              Oración de Fe para Hoy
            </span>
            <p className="text-[13px] text-[#E2E8F0] italic leading-relaxed">
              «{activePromise.prayer}»
            </p>
          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[12px]">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] active:bg-white/[0.15] text-[#CBD5E1] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">¡Copiada al portapapeles!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar promesa</span>
                </>
              )}
            </button>

            {onOpenReminderSettings && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenReminderSettings();
                }}
                className="px-3 py-1.5 rounded-lg text-[#F59E0B] hover:bg-amber-500/10 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Programar hora de entrega diaria</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#07101B] flex flex-col sm:flex-row items-center justify-between gap-3">
          {onOpenGratitude ? (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenGratitude();
              }}
              className="w-full sm:w-auto min-h-[42px] px-4 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/35 border border-emerald-500/30 text-emerald-300 text-[13px] font-medium transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Agradecer en mi Diario</span>
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[42px] px-6 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] text-[13px] font-semibold transition-colors cursor-pointer flex items-center justify-center"
          >
            Guardar en mi corazón
          </button>
        </div>
      </div>
    </div>
  );
};
