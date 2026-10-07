import React, { useState, useEffect } from 'react';
import { CoreMoodOption } from './CoreFormScreen';
import { ArrowLeft, BookOpen, Heart, Wind, Check, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';
import { JesusEnTiConfioScene, JesusSceneKey } from './JesusEnTiConfioScene';

interface CoreResultScreenProps {
  mood: CoreMoodOption;
  onStartOver: () => void;
  onFinish: () => void;
}

export const CoreResultScreen: React.FC<CoreResultScreenProps> = ({
  mood,
  onStartOver,
  onFinish,
}) => {
  // Breathing visual guide state
  const [breathPhase, setBreathPhase] = useState<'inhalar' | 'sostener' | 'exhalar'>('inhalar');
  const [secondsLeft, setSecondsLeft] = useState<number>(4);
  const [isBreathingActive, setIsBreathingActive] = useState<boolean>(true);
  const [cyclesCount, setCyclesCount] = useState<number>(0);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!isBreathingActive) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        if (breathPhase === 'inhalar') {
          setBreathPhase('sostener');
          return 4;
        } else if (breathPhase === 'sostener') {
          setBreathPhase('exhalar');
          return 4;
        } else {
          setBreathPhase('inhalar');
          setCyclesCount((c) => c + 1);
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  // Contenido de ejemplo fijo y realista según la opción
  const realisticData: Record<
    CoreMoodOption,
    {
      moodLabel: string;
      prayerBody: string;
      verse: string;
      reference: string;
      contextNote: string;
    }
  > = {
    ansiedad: {
      moodLabel: 'Ansiedad',
      prayerBody:
        'Señor y Dios mío, reconozco que mi mente se ha acelerado y que mi pecho se siente oprimido por los afanes de este día. No intento ocultar mi fragilidad ni pretendo sostenerlo todo con mis propias fuerzas. En este instante suelto las riendas, entrego cada pensamiento que me inquieta y rindo mi necesidad de control. Te pido que tu paz, que supera todo razonamiento humano, descienda sobre mi cuerpo, sosiegue mi ritmo respiratorio y guarde mi corazón en reposo.',
      verse:
        'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.',
      reference: 'Filipenses 4:6-7',
      contextNote:
        'La paz que Dios ofrece no depende de que desaparezcan las dificultades externas, sino de la certeza de que tu vida está custodiada por su presencia amorosa.',
    },
    soledad: {
      moodLabel: 'Soledad',
      prayerBody:
        'Padre celestial, en este momento de silencio siento el peso del aislamiento y la sensación de que nadie comprende lo que llevo dentro. Vengo a tu presencia recordando que tú jamás te alejas de mí. Aunque los demás no alcancen a ver mis heridas o mis cargas, tú conoces cada suspiro de mi corazón. Habito en tu compañía segura y permito que tu amor llene cada rincón vacío de mi ser.',
      verse:
        'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
      reference: 'Isaías 41:10',
      contextNote:
        'En los momentos en que la compañía humana resulta insuficiente, la promesa de la presencia constante del Padre se convierte en tu ancla más firme.',
    },
    miedo: {
      moodLabel: 'Miedo',
      prayerBody:
        'Dios de fortaleza, el temor ante la incertidumbre y los desenlaces futuros ha intentado paralizar mis decisiones. Reconozco que no puedo prever el mañana, pero confío en que tú ya estás allí. Desactivo el pánico recordando que no me has dado espíritu de cobardía, sino de poder, de amor y de dominio propio. Dejo de mirar la tormenta y fijo mis ojos en tu fidelidad inmutable.',
      verse:
        'El Señor es mi luz y mi salvación; ¿de quién temeré? El Señor es la fortaleza de mi vida; ¿de quién he de atemorizarme?',
      reference: 'Salmo 27:1',
      contextNote:
        'El temor busca que magnifiques el peligro; la Escritura te invita a descansar en la magnitud del cuidado y la soberanía de Dios sobre tu vida.',
    },
    agotamiento: {
      moodLabel: 'Agotamiento',
      prayerBody:
        'Señor, mis energías físicas y emocionales han llegado a su límite. He cargado deberes, expectativas y responsabilidades que me sobrepasan. No tengo palabras complejas que ofrecerte hoy; solo traigo mi cansancio a tus pies. Recibo tu invitación de descansar sin culpa y permito que tu gracia renueve mis fuerzas mientras guardo silencio en tu regazo.',
      verse:
        'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo sobre vosotros, y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas.',
      reference: 'Mateo 11:28-29',
      contextNote:
        'El descanso no es una concesión perezosa, sino un mandamiento de confianza: soltar la labor diaria para recordar que Dios sostiene el universo.',
    },
  };

  const currentData = realisticData[mood];

  const getCoreScene = (): JesusSceneKey => {
    switch (mood) {
      case 'ansiedad':
        return 'campo_lavanda_juntos';
      case 'soledad':
        return 'clara_intimidad_paz';
      case 'miedo':
        return 'custodia_santisimo_radiante';
      case 'agotamiento':
        return 'leo_fortaleza_oracion';
      default:
        return 'fortaleza_espiritual_final';
    }
  };

  const phaseInstruction = {
    inhalar: 'Toma aire despacio por la nariz sintiendo la gracia de Dios',
    sostener: 'Retén el aire con el pecho sereno, confiando en su cuidado',
    exhalar: 'Suelta el aire como un suspiro, entregando toda tensión',
  }[breathPhase];

  const handleSaveToHistory = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('fe_saved_anchors') || '[]');
      stored.unshift({
        id: 'anchor_' + Date.now(),
        dateISO: new Date().toISOString(),
        displayDate: new Date().toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        symptomLabel: currentData.moodLabel,
        scriptureRef: currentData.reference,
        declaration: currentData.verse,
      });
      localStorage.setItem('fe_saved_anchors', JSON.stringify(stored));
    } catch {
      // Safe fallback
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-4 sm:py-6 space-y-6 animate-fade-in">
      {/* Barra de navegación superior */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.1)]">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[44px] px-3 py-1.5 rounded-[8px] text-cuerpo text-[#94A3B8] hover:text-[#F8FAF9] hover:bg-[rgba(255,255,255,0.05)] active:bg-[rgba(255,255,255,0.08)] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
          <span>Elegir otro momento</span>
        </button>

        <span className="text-rotulo text-[#F59E0B] px-2.5 py-0.5 rounded-[8px] bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)]">
          Estado: {currentData.moodLabel}
        </span>
      </div>

      {/* 
        1. GUÍA VISUAL DE RESPIRACIÓN (4x4)
        Animación suave continua con cubic-bezier, sin rebotes
      */}
      <section
        aria-label="Guía de respiración diafragmática"
        className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-5 sm:p-6 text-center space-y-4"
      >
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
            <span className="text-rotulo text-[#F8FAF9]">
              Pausa de respiración diafragmática 4×4
            </span>
          </div>
          <span className="text-rotulo text-[#94A3B8] tabular-nums">
            Ciclos completados: {cyclesCount}
          </span>
        </div>

        {/* Círculo de respiración con animación suave */}
        <div className="relative w-40 h-40 sm:w-44 sm:h-44 mx-auto my-2 flex items-center justify-center">
          <div
            className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[rgba(255,255,255,0.04)] border-2 border-[#F59E0B] flex flex-col items-center justify-center transition-all duration-[4000ms] ${
              isBreathingActive ? 'animate-breathing' : ''
            }`}
          >
            <span className="text-rotulo text-[#F59E0B] mb-0.5">
              {breathPhase.toUpperCase()}
            </span>
            <span className="text-display text-[#F8FAF9] tabular-nums leading-none">
              {secondsLeft}s
            </span>
          </div>
        </div>

        <p className="text-cuerpo text-[#F8FAF9] max-w-[42ch] mx-auto italic">
          {phaseInstruction}
        </p>

        {/* Controles de la respiración con área tocable >= 44px */}
        <div className="flex items-center justify-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => setIsBreathingActive(!isBreathingActive)}
            className="min-h-[44px] px-4 py-2 rounded-[8px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-cuerpo transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {isBreathingActive ? (
              <>
                <Pause className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Continuar</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsBreathingActive(false);
              setBreathPhase('inhalar');
              setSecondsLeft(4);
            }}
            className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-[8px] border border-[rgba(255,255,255,0.1)] text-[#94A3B8] hover:text-[#F8FAF9] hover:bg-[rgba(255,255,255,0.05)] text-cuerpo transition-colors flex items-center justify-center cursor-pointer"
            title="Reiniciar respiración"
            aria-label="Reiniciar respiración"
          >
            <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Obra Visual Sacra Litúrgica para Contemplación */}
      <section
        aria-label="Contemplación visual de fe"
        className="rounded-[16px] overflow-hidden border border-[rgba(245,158,11,0.25)] bg-[#091524] shadow-lg"
      >
        <div className="h-44 sm:h-52 w-full relative overflow-hidden">
          <JesusEnTiConfioScene sceneKey={getCoreScene()} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#091524] via-transparent to-black/20 pointer-events-none" />
          <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-rotulo text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Contemplación Litúrgica • {currentData.moodLabel}</span>
          </span>
        </div>
      </section>

      {/* 
        2. PROMESA BÍBLICA FIJA
        Filipenses 4:6-7 o pasaje canónico de anclaje
      */}
      <section
        aria-label="Promesa bíblica de anclaje"
        className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-5 sm:p-6 space-y-3"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
            <span className="text-rotulo text-[#F8FAF9]">
              Promesa bíblica de anclaje
            </span>
          </div>
          <span className="text-rotulo text-[#F59E0B] px-2.5 py-0.5 rounded-[8px] bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)]">
            {currentData.reference}
          </span>
        </div>

        <blockquote className="font-display-serif text-[18px] sm:text-[20px] text-[#F8FAF9] leading-relaxed border-l-2 border-[#F59E0B] pl-4 py-1 italic">
          «{currentData.verse}»
        </blockquote>

        <p className="text-cuerpo text-[#94A3B8]">
          {currentData.contextNote}
        </p>
      </section>

      {/* 
        3. ORACIÓN LITÚRGICA DE ENTREGA
        Texto editorial profundo y empático
      */}
      <section
        aria-label="Oración de entrega"
        className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-5 sm:p-6 space-y-3"
      >
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
          <h2 className="text-titulo text-[#F8FAF9]">
            Oración de entrega
          </h2>
        </div>

        <p className="font-display-serif text-[16px] sm:text-[17px] text-[#F8FAF9] leading-relaxed italic bg-[rgba(0,0,0,0.2)] p-4 rounded-[12px] border border-[rgba(255,255,255,0.06)]">
          {currentData.prayerBody}
        </p>
      </section>

      {/* Botones de acción final con los 7 estados */}
      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
        <button
          type="button"
          onClick={onFinish}
          className="flex-1 min-h-[44px] px-6 py-2.5 rounded-[8px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-cuerpo transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm focus-visible:outline-none"
        >
          <span>Completar tiempo de oración y reposar</span>
        </button>

        <button
          type="button"
          onClick={handleSaveToHistory}
          className="min-h-[44px] px-4 py-2.5 rounded-[8px] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.08)] active:bg-[rgba(255,255,255,0.1)] text-[#F8FAF9] border border-[rgba(255,255,255,0.1)] text-cuerpo transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isSaved ? (
            <>
              <Check className="w-4 h-4 text-[#059669]" strokeWidth={1.5} />
              <span className="text-[#059669]">Guardado en tu equipo</span>
            </>
          ) : (
            <span>Guardar en mis anclas</span>
          )}
        </button>
      </div>
    </div>
  );
};
