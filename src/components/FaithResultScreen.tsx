import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Wind,
  Eye,
  Heart,
  Check,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Lock,
  Compass,
  Plus,
  Trash2,
  Calendar,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  EmotionalDimensionId,
  EMOTIONAL_DIMENSIONS,
  generateGratitudeAffirmation,
  PROGRAM_30_DAYS,
  DayProgramPlan,
} from '../data/faithTechData';

interface FaithResultScreenProps {
  dimensionId: EmotionalDimensionId;
  userReflection?: string;
  onStartOver: () => void;
  onOpenPlanModal: () => void;
  selectedMentor: 'clara_luz' | 'leo';
}

interface GratitudeItem {
  id: string;
  text: string;
  date: string;
  affirmation: string;
  neuroNote: string;
  scriptureReference: string;
}

export const FaithResultScreen: React.FC<FaithResultScreenProps> = ({
  dimensionId,
  userReflection,
  onStartOver,
  onOpenPlanModal,
  selectedMentor,
}) => {
  const content = EMOTIONAL_DIMENSIONS[dimensionId];

  // Somatic Breathing Guide State (4-4-4)
  const [breathPhase, setBreathPhase] = useState<'inhalar' | 'sostener' | 'exhalar' | 'reposar'>('inhalar');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(true);
  const [cyclesCount, setCyclesCount] = useState<number>(0);

  // Gratitude Journal State (1 to 3 items, stored in LocalStorage)
  const [gratitudeInput, setGratitudeInput] = useState<string>('');
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeItem[]>(() => {
    try {
      const stored = localStorage.getItem('fe_gratitude_journal_v2');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [latestFeedback, setLatestFeedback] = useState<{
    affirmation: string;
    neuroNote: string;
    scriptureReference: string;
  } | null>(null);

  // 30 Days Plan Progress & Grace-Based Streaks State
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('fe_completed_days_v2');
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });

  // Grace streak days count
  const streakCount = completedDays.length;

  // Box Breathing cycle
  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) return prev - 1;

        if (breathPhase === 'inhalar') {
          setPhaseChange('sostener');
          return 4;
        } else if (breathPhase === 'sostener') {
          setPhaseChange('exhalar');
          return 4;
        } else if (breathPhase === 'exhalar') {
          setPhaseChange('reposar');
          return 4;
        } else {
          setPhaseChange('inhalar');
          setCyclesCount((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const setPhaseChange = (next: 'inhalar' | 'sostener' | 'exhalar' | 'reposar') => {
    setBreathPhase(next);
  };

  // Add Gratitude Entry
  const handleAddGratitude = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = gratitudeInput.trim();
    if (!cleanText) return;

    const feedback = generateGratitudeAffirmation(cleanText);
    const newEntry: GratitudeItem = {
      id: Date.now().toString(),
      text: cleanText,
      date: new Date().toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
      ...feedback,
    };

    const updated = [newEntry, ...gratitudeEntries].slice(0, 10);
    setGratitudeEntries(updated);
    setLatestFeedback(feedback);
    setGratitudeInput('');

    try {
      localStorage.setItem('fe_gratitude_journal_v2', JSON.stringify(updated));
    } catch {}
  };

  const handleToggleDay = (dayNum: number) => {
    // Solo para días desbloqueados (1 al 7)
    if (dayNum > 7) {
      onOpenPlanModal();
      return;
    }

    const next = completedDays.includes(dayNum)
      ? completedDays.filter((d) => d !== dayNum)
      : [...completedDays, dayNum];

    setCompletedDays(next);
    try {
      localStorage.setItem('fe_completed_days_v2', JSON.stringify(next));
    } catch {}
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-5 sm:py-8 space-y-8 animate-fade-in text-[#F8FAFC]">
      {/* Barra de navegación superior */}
      <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] border border-transparent hover:border-[#334155] transition-colors flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4 text-[#0D9488]" />
          <span>Volver o cambiar malestar</span>
        </button>

        <span className="text-[11.5px] font-medium text-[#10B981] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
          Ancla de Paz Activa
        </span>
      </div>

      {/* Encabezado del Ancla Generada */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[#1E293B] border border-[#334155] text-[#0D9488] text-[11px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Dimensión: {content.label}</span>
        </div>
        <h1 className="font-editorial text-[24px] sm:text-[28px] text-[#F8FAFC] font-normal leading-snug">
          Tu Ancla de Paz y Renovación Mental
        </h1>
        <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
          Guía personalizada guiada por tu mentor virtual{' '}
          <strong className="text-[#F8FAFC]">{selectedMentor === 'clara_luz' ? 'Clara Luz' : 'Leo'}</strong>. Lee con calma, sincroniza tu respiración y rinde el peso de este día.
        </p>
      </div>

      {/* Si el usuario ingresó desahogo libre, mostrarlo con compasión */}
      {userReflection && (
        <div className="p-4 rounded-[12px] bg-[#1E293B] border border-[#334155] space-y-1.5">
          <span className="text-[11px] uppercase tracking-wider font-bold text-[#94A3B8] block">
            Lo que tu mente nombró hoy (Tu entrega confidencial):
          </span>
          <p className="text-[13px] text-[#F8FAFC] italic leading-relaxed bg-[#0F172A] p-3 rounded-[8px] border border-[#334155]">
            «{userReflection}»
          </p>
          <p className="text-[11.5px] text-[#0D9488]">
            Al poner en palabras tu aflicción, tu corteza prefrontal modula la respuesta de alerta y abre espacio para el sosiego.
          </p>
        </div>
      )}

      {/* =========================================================================
          BLOQUE 1: PROMESA BÍBLICA CONTEXTUALIZADA (SIN TONO PUNITIVO)
         ========================================================================= */}
      <section
        aria-label="Promesa bíblica contextualizada"
        className="p-5 sm:p-6 rounded-[16px] bg-[#1E293B] border border-[#334155] space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-2 text-[#0D9488]">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-editorial text-[18px] sm:text-[20px] text-[#F8FAFC] font-normal">
            1. Promesa Bíblica Contextualizada
          </h2>
        </div>

        <blockquote className="p-4 rounded-[12px] bg-[#0F172A] border-l-4 border-[#0D9488] space-y-2">
          <p className="font-editorial text-[16px] sm:text-[17px] text-[#F8FAFC] italic leading-relaxed">
            {content.scripture.verse}
          </p>
          <cite className="text-[12px] font-bold text-[#0D9488] block text-right not-italic">
            — {content.scripture.reference}
          </cite>
        </blockquote>

        <div className="p-3.5 rounded-[8px] bg-[#0F172A] border border-[#334155] space-y-1 text-[12.5px]">
          <span className="font-bold text-[#F8FAFC] block text-[11.5px] uppercase tracking-wider text-[#0D9488]">
            Contexto Pastoral y Liberación de Culpa:
          </span>
          <p className="text-[#94A3B8] leading-relaxed">
            {content.scripture.contextPastoral}
          </p>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 2: EJERCICIO SOMÁTICO GUIADO (RESPIRACIÓN RÍTMICA O 5-4-3-2-1)
         ========================================================================= */}
      <section
        aria-label="Ejercicio somático guiado"
        className="p-5 sm:p-6 rounded-[16px] bg-[#1E293B] border border-[#334155] space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#334155]">
          <div className="flex items-center gap-2 text-[#0D9488]">
            {content.somaticExerciseType === 'respiracion_ritmica' ? (
              <Wind className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
            <h2 className="font-editorial text-[18px] sm:text-[20px] text-[#F8FAFC] font-normal">
              2. Regulación Somática del Sistema Nervioso
            </h2>
          </div>
          <span className="text-[11px] text-[#94A3B8]">
            Ciclos: {cyclesCount}
          </span>
        </div>

        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
          {content.somaticFocus}
        </p>

        {/* Animador Interactivo de Respiración Diafragmática Rítmica */}
        <div className="py-7 px-4 rounded-[12px] bg-[#0F172A] border border-[#334155] flex flex-col items-center justify-center text-center space-y-4">
          <div
            className={`w-32 h-32 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ${
              breathPhase === 'inhalar'
                ? 'scale-110 border-[#0D9488] bg-[#0D9488]/15 text-[#0D9488]'
                : breathPhase === 'sostener'
                ? 'scale-110 border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]'
                : breathPhase === 'exhalar'
                ? 'scale-90 border-[#334155] bg-[#334155]/20 text-[#94A3B8]'
                : 'scale-90 border-[#334155] bg-[#0F172A] text-[#94A3B8]'
            }`}
          >
            <span className="text-[32px] font-bold tabular-nums">
              {secondsLeft}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-bold">
              {breathPhase === 'inhalar'
                ? 'Inhala verdad'
                : breathPhase === 'sostener'
                ? 'Guarda la paz'
                : breathPhase === 'exhalar'
                ? 'Exhala angustia'
                : 'Reposa'}
            </span>
          </div>

          <div className="space-y-1 max-w-[42ch]">
            <p className="text-[13px] text-[#F8FAFC] font-medium">
              {breathPhase === 'inhalar' && 'Inhala profundo: recibes el aliento de vida que Dios te concede hoy.'}
              {breathPhase === 'sostener' && 'Sostén con calma: el Señor cuida de cada latido de tu pecho.'}
              {breathPhase === 'exhalar' && 'Exhala despacio: suelta el afán y la urgencia de sostenerlo todo.'}
              {breathPhase === 'reposar' && 'Permanece en silencio: eres criatura amada, no el creador del mundo.'}
            </p>
          </div>

          {/* Controles del ejercicio */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[12.5px] font-medium text-[#F8FAFC] border border-[#334155] flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0D9488]"
            >
              {isBreathingActive ? <Pause className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Play className="w-3.5 h-3.5 text-[#0D9488]" />}
              <span>{isBreathingActive ? 'Pausar' : 'Reanudar'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setBreathPhase('inhalar');
                setSecondsLeft(4);
              }}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[12.5px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] flex items-center gap-1.5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0D9488]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar ciclo</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 3: LITURGIA DE ENTREGA EN TRES TIEMPOS
         ========================================================================= */}
      <section
        aria-label="Liturgia de entrega en tres tiempos"
        className="p-5 sm:p-6 rounded-[16px] bg-[#1E293B] border border-[#334155] space-y-4 shadow-sm"
      >
        <div className="flex items-center gap-2 text-[#0D9488]">
          <Heart className="w-5 h-5" />
          <h2 className="font-editorial text-[18px] sm:text-[20px] text-[#F8FAFC] font-normal">
            3. Liturgia de Entrega en Tres Tiempos
          </h2>
        </div>

        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
          Lee estas oraciones en voz baja, haciendo una pausa al final de cada tiempo para permitir que el mensaje se asiente en tu espíritu:
        </p>

        <div className="space-y-3">
          {/* Tiempo 1 */}
          <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F59E0B] block">
              {content.liturgy.step1_reconocer.title}
            </span>
            <p className="text-[13px] text-[#F8FAFC] leading-relaxed italic">
              «{content.liturgy.step1_reconocer.prayer}»
            </p>
          </div>

          {/* Tiempo 2 */}
          <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488] block">
              {content.liturgy.step2_soltar.title}
            </span>
            <p className="text-[13px] text-[#F8FAFC] leading-relaxed italic">
              «{content.liturgy.step2_soltar.prayer}»
            </p>
          </div>

          {/* Tiempo 3 */}
          <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981] block">
              {content.liturgy.step3_descansar.title}
            </span>
            <p className="text-[13px] text-[#F8FAFC] leading-relaxed italic">
              «{content.liturgy.step3_descansar.prayer}»
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BLOQUE 4: DIARIO DE GRATITUD INTELIGENTE (NEUROPLASTICIDAD Y FILIPENSES 4:8)
         ========================================================================= */}
      <section
        aria-label="Diario de gratitud inteligente"
        className="p-5 sm:p-6 rounded-[16px] bg-[#1E293B] border border-[#334155] space-y-4 shadow-sm"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[#334155]">
          <div className="flex items-center gap-2 text-[#0D9488]">
            <Sparkles className="w-5 h-5" />
            <h2 className="font-editorial text-[18px] sm:text-[20px] text-[#F8FAFC] font-normal">
              4. Diario de Gratitud Inteligente
            </h2>
          </div>
          <span className="text-[11px] text-[#10B981] font-semibold bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
            Neuroplasticidad & Filipenses 4:8
          </span>
        </div>

        <p className="text-[13px] text-[#94A3B8] leading-relaxed">
          Ingresa de 1 a 3 motivos de gratitud o bendición concreta de tu jornada. El sistema transformará tu enfoque rumiante en una afirmación de fe basada en neuroplasticidad y 2 Corintios 10:5 («llevar cautivo todo pensamiento»).
        </p>

        {/* Input de gratitud */}
        <form onSubmit={handleAddGratitude} className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={gratitudeInput}
              onChange={(e) => setGratitudeInput(e.target.value)}
              placeholder="Escribe hoy un motivo de agradecimiento..."
              className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-[8px] bg-[#0F172A] border border-[#334155] focus:border-[#0D9488] focus:outline-none focus:ring-1 focus:ring-[#0D9488] text-[13px] text-[#F8FAFC] placeholder:text-[#64748B] transition-colors"
            />
            <button
              type="submit"
              disabled={!gratitudeInput.trim()}
              className="min-h-[44px] px-4 py-2.5 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] disabled:opacity-50 disabled:cursor-not-allowed text-[#F8FAFC] text-[13px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Guardar motivo</span>
            </button>
          </div>
        </form>

        {/* Retroalimentación neuro-pastoral inmediata */}
        {latestFeedback && (
          <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#0D9488]/40 space-y-2 animate-fade-in">
            <div className="flex items-center gap-1.5 text-[#0D9488] text-[11px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Transformación Cognitiva Aplicada:</span>
            </div>
            <p className="text-[13px] text-[#F8FAFC] leading-relaxed font-medium">
              {latestFeedback.affirmation}
            </p>
            <div className="pt-2 border-t border-[#334155] flex flex-col sm:flex-row justify-between gap-1 text-[11.5px] text-[#94A3B8]">
              <span><strong>Base neurobiológica:</strong> {latestFeedback.neuroNote}</span>
            </div>
            <span className="text-[11px] font-semibold text-[#0D9488] block text-right">
              {latestFeedback.scriptureReference}
            </span>
          </div>
        )}

        {/* Lista de entradas previas guardadas en LocalStorage */}
        {gratitudeEntries.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-[11.5px] uppercase tracking-wider font-bold text-[#94A3B8] block">
              Tus motivos registrados recientemente:
            </span>
            <div className="space-y-2">
              {gratitudeEntries.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-[8px] bg-[#0F172A] border border-[#334155] flex items-start justify-between gap-3 text-[12.5px]"
                >
                  <div className="space-y-0.5">
                    <span className="text-[#F8FAFC] font-medium block">«{item.text}»</span>
                    <span className="text-[11px] text-[#94A3B8]">{item.date}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const filtered = gratitudeEntries.filter((g) => g.id !== item.id);
                      setGratitudeEntries(filtered);
                      try {
                        localStorage.setItem('fe_gratitude_journal_v2', JSON.stringify(filtered));
                      } catch {}
                    }}
                    className="text-[#64748B] hover:text-[#EF4444] p-1 rounded-[4px] transition-colors cursor-pointer"
                    title="Eliminar motivo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          BLOQUE 5: VISTA DE PROGRESO DEL PLAN DE 30 DÍAS (GRACE-BASED STREAKS)
         ========================================================================= */}
      <section
        aria-label="Progreso del plan de 30 días"
        className="p-5 sm:p-6 rounded-[16px] bg-[#1E293B] border border-[#334155] space-y-5 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#334155]">
          <div>
            <div className="flex items-center gap-2 text-[#0D9488]">
              <Calendar className="w-5 h-5" />
              <h2 className="font-editorial text-[18px] sm:text-[20px] text-[#F8FAFC] font-normal">
                5. Progreso del Plan de 30 Días: Fortaleza Espiritual
              </h2>
            </div>
            <p className="text-[12.5px] text-[#94A3B8] mt-0.5">
              Acompañado/a por {selectedMentor === 'clara_luz' ? 'Clara Luz' : 'Leo'} • Días 1 al 7 libres en LocalStorage.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-full border border-[#10B981]/30">
              Grace Streak: {streakCount} días completados
            </span>
          </div>
        </div>

        {/* Mensaje de Grace-Based Streaks */}
        <div className="p-3.5 rounded-[8px] bg-[#0F172A] border border-[#334155] space-y-1 text-[12px] text-[#94A3B8]">
          <span className="text-[#10B981] font-semibold block">
            Principio de Gracia en tu Progreso:
          </span>
          <p>
            Si se te pasa un día, tu racha no se reinicia a cero ni te penalizamos. La misericordia de Dios es nueva cada mañana (Lamentaciones 3:22-23); retomas el camino sin reproches ni culpa acumulada.
          </p>
        </div>

        {/* Grilla interactiva de los 30 Días */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-[12px]">
          {PROGRAM_30_DAYS.slice(0, 12).map((day) => {
            const isCompleted = completedDays.includes(day.dayNumber);
            const isFree = day.isUnlocked;

            return (
              <div
                key={day.dayNumber}
                onClick={() => handleToggleDay(day.dayNumber)}
                className={`p-3 rounded-[8px] border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isCompleted
                    ? 'bg-[#0F172A] border-[#10B981]/60'
                    : isFree
                    ? 'bg-[#0F172A] border-[#334155] hover:border-[#0D9488]'
                    : 'bg-[#0F172A]/50 border-[#334155]/40 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold ${isFree ? 'text-[#0D9488]' : 'text-[#F59E0B]'}`}>
                    Día {day.dayNumber}
                  </span>
                  {isFree ? (
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isCompleted ? 'border-[#10B981] bg-[#10B981] text-[#0F172A]' : 'border-[#64748B]'
                      }`}
                    >
                      {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  )}
                </div>

                <span className="text-[12px] text-[#F8FAFC] line-clamp-2 leading-tight">
                  {day.title.replace(/^Día \d+:\s*/, '')}
                </span>

                <span className="text-[10px] text-[#94A3B8] block pt-1 border-t border-[#334155]/50">
                  {day.scriptureAnchor}
                </span>
              </div>
            );
          })}
        </div>

        {/* Llamado a desbloquear Días 8 a 30 (USD 7.99 o $29.900 COL) */}
        <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#0D9488]/40 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Acceso Completo • Días 8 al 30
              </span>
              <h3 className="text-[14.5px] font-semibold text-[#F8FAFC] mt-0.5">
                Pase Guiado de Renovación Mental (USD 7.99 o $29.900 COL)
              </h3>
            </div>
            <a
              href="https://buy.stripe.com/test_fe_esperanza_30dias"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] px-4 py-2 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-[#F8FAFC] text-[12.5px] font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Desbloquear ahora</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-[12px] text-[#94A3B8]">
            Desbloquea los 23 días restantes de reestructuración profunda con Clara Luz o Leo. Un único pago de USD 7.99 ($29.900 COL), sin suscripciones ni cobros mensuales.
          </p>
        </div>
      </section>

      {/* Botón final para reiniciar o volver a portada */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[44px] px-6 py-2.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] text-[13px] font-medium border border-[#334155] transition-colors cursor-pointer"
        >
          Guardar progreso y regresar a la portada
        </button>
      </div>
    </div>
  );
};
