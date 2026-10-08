import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Compass,
  Flame,
  Sun,
  Moon,
  Feather,
  CheckCircle2,
  X,
  FileText,
  Clock,
  Volume2,
  BookOpen,
} from 'lucide-react';

export interface QuizQuestion {
  id: number;
  category: string;
  categoryLabel: string;
  iconName: 'moon' | 'heart' | 'flame' | 'compass' | 'feather' | 'sun' | 'sparkles';
  question: string;
  subtitle: string;
  options: {
    text: string;
    description: string;
    severity: number; // 1 (optimal) to 4 (intense need)
    painPoint?: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'mente',
    categoryLabel: 'Paz Mental y Descanso Nocturno',
    iconName: 'moon',
    question: 'Al acostarte o quedarte en silencio, ¿cómo se comporta tu mente?',
    subtitle: 'Identifica el nivel de rumiación y agitación en tus horas de reposo.',
    options: [
      {
        text: 'Serena y en reposo reparador',
        description: 'Logro apagar los pendientes y descanso en las manos de Dios con confianza.',
        severity: 1,
      },
      {
        text: 'Ocasionalmente inquieta con tareas del día',
        description: 'Pienso en lo pendiente, pero con un poco de esfuerzo logro desconectarme.',
        severity: 2,
        painPoint: 'Tensión acumulada de responsabilidades diurnas',
      },
      {
        text: 'Una cascada incesante de pensamientos y temores',
        description: 'Doy vueltas en la cama reviviendo conversaciones, errores o temores del día.',
        severity: 3,
        painPoint: 'Rumiación nocturna e insomnio por hiperactividad mental',
      },
      {
        text: 'Agotamiento extremo con taquicardia o angustia en el pecho',
        description: 'La noche me asusta; siento una pesadez física que me roba el descanso y la paz.',
        severity: 4,
        painPoint: 'Crisis de angustia nocturna y fatiga nerviosa acumulada',
      },
    ],
  },
  {
    id: 2,
    category: 'alma',
    categoryLabel: 'Conexión y Cercanía con Dios',
    iconName: 'heart',
    question: 'En este momento de tu vida, ¿cómo percibes la cercanía de Dios?',
    subtitle: 'Evalúa la intimidad y la sensación de refugio o lejanía espiritual.',
    options: [
      {
        text: 'Cercano, como un Padre amoroso y refugio constante',
        description: 'Siento su guía diaria y acudo a Él en oración con intimidad y paz.',
        severity: 1,
      },
      {
        text: 'Presente en mi fe, pero a veces silencioso',
        description: 'Sé que existe y creo en Él, aunque no siempre logro sentir su consuelo en el día a día.',
        severity: 2,
        painPoint: 'Rutina espiritual con momentos de frialdad emocional',
      },
      {
        text: 'Distante e inaccesible; siento que mis oraciones rebotan',
        description: 'Le hablo pero siento un muro invisible, como si estuviera demasiado ocupado para mi dolor.',
        severity: 3,
        painPoint: 'Sensación de desconexión y soledad espiritual en la prueba',
      },
      {
        text: 'Profundamente desconectado/a o con dudas de su amor hacia mí',
        description: 'Me he preguntado si Dios se olvidó de mí o si mi dolor es una señal de rechazo.',
        severity: 4,
        painPoint: 'Herida de abandono espiritual y sensación de desamparo',
      },
    ],
  },
  {
    id: 3,
    category: 'cuerpo',
    categoryLabel: 'Fatiga Emocional y Sobrecarga del Alma',
    iconName: 'flame',
    question: '¿Qué nivel de cansancio llevas acumulado en tu pecho y en tu cuerpo?',
    subtitle: 'El cuerpo suele ser el altar donde el alma grita lo que calla la mente.',
    options: [
      {
        text: 'Equilibrado; mis pausas y descansos me revitalizan',
        description: 'Tengo energía para mis tareas y sé respetar mis momentos de quietud.',
        severity: 1,
      },
      {
        text: 'Cansancio manejable por trabajo y compromisos',
        description: 'Termino agotado/a algunas jornadas, pero los fines de semana me recupero.',
        severity: 2,
        painPoint: 'Sobrecarga de horarios y falta de pausas contemplativas',
      },
      {
        text: 'Un cansancio que dormir ya no repara; vivo en modo supervivencia',
        description: 'Me despierto fatigado/a, sosteniendo responsabilidades con un hilo de energía.',
        severity: 3,
        painPoint: 'Agotamiento del sistema nervioso y modo supervivencia crónico',
      },
      {
        text: 'Al borde del colapso emocional o físico',
        description: 'Siento que el peso que llevo es insostenible y que en cualquier momento me quiebro.',
        severity: 4,
        painPoint: 'Sobrecarga total del sistema neuro-espiritual y desgaste vital',
      },
    ],
  },
  {
    id: 4,
    category: 'conciencia',
    categoryLabel: 'Conciencia y Sentido de Propósito',
    iconName: 'compass',
    question: 'Al mirar tu día a día, ¿qué tanta claridad sientes sobre tu camino?',
    subtitle: 'Mide la orientación interior y la conexión con el llamado divino.',
    options: [
      {
        text: 'Clara, con sentido y guiada por los propósitos de Dios',
        description: 'Sé hacia dónde voy y experimento satisfacción en lo que construyo cada día.',
        severity: 1,
      },
      {
        text: 'Tengo objetivos, pero a veces pierdo el enfoque trascendente',
        description: 'Cumplo con lo que debo, aunque a veces me pregunto si estoy haciendo lo correcto.',
        severity: 2,
        painPoint: 'Desvío de prioridades esenciales hacia lo urgente',
      },
      {
        text: 'Siento que voy en piloto automático, apagando incendios',
        description: 'Los días pasan iguales; cumplo con todos menos con el cuidado de mi propia alma.',
        severity: 3,
        painPoint: 'Pérdida de la presencia consciente y automatismo vital',
      },
      {
        text: 'Vacío existencial o desorientación profunda',
        description: 'No sé qué hago aquí ni cuál es mi vocación en Dios; siento que he perdido el norte.',
        severity: 4,
        painPoint: 'Crisis de propósito, vacío interior y desorientación de fe',
      },
    ],
  },
  {
    id: 5,
    category: 'heridas',
    categoryLabel: 'Cargas del Corazón: Culpa y Sanidad',
    iconName: 'feather',
    question: '¿Hay culpas, autoexigencia o heridas del pasado que pesen en tu pecho?',
    subtitle: 'Explora el peso de los juicios internos y la capacidad de recibir el perdón.',
    options: [
      {
        text: 'Mi corazón está libre en la gracia y el perdón de Dios',
        description: 'He soltado el pasado y camino sin recriminaciones internas.',
        severity: 1,
      },
      {
        text: 'Recuerdos difíciles, pero voy aprendiendo a entregarlos',
        description: 'A veces me castigo por errores pasados, pero busco la misericordia divina.',
        severity: 2,
        painPoint: 'Tendencia al reproche propio y autoexigencia perfeccionista',
      },
      {
        text: 'Carga pesada de autoexigencia o culpa que me roba la paz',
        description: 'Siento que no soy suficiente, que fallo constantemente y que no merezco estar en paz.',
        severity: 3,
        painPoint: 'Síndrome del impostor espiritual y culpa paralizante',
      },
      {
        text: 'Heridas vivas, traiciones o rencores que aún arden en mi interior',
        description: 'Llevo un nudo en la garganta de amargura o dolor que no he podido desatar.',
        severity: 4,
        painPoint: 'Heridas no cicatrizadas, resentimiento y dolor enquistado',
      },
    ],
  },
  {
    id: 6,
    category: 'incertidumbre',
    categoryLabel: 'Manejo del Futuro: Confianza vs. Ansiedad',
    iconName: 'sun',
    question: 'Ante la incertidumbre o lo que no puedes controlar, ¿cómo reaccionas?',
    subtitle: 'La prueba de fuego entre el control humano y el abandono en la Providencia.',
    options: [
      {
        text: 'Entrega serena; confío en que Dios cuida de cada detalle',
        description: 'Sé en Quién he creído y descanso en su soberana protección.',
        severity: 1,
      },
      {
        text: 'Procuro confiar, pero suelo desgastarme intentando resolver todo',
        description: 'Me cuesta soltar el volante y a menudo me anticipo demasiado.',
        severity: 2,
        painPoint: 'Hipervigilancia y necesidad de control circunstancial',
      },
      {
        text: 'Ansiedad anticipatoria y temor constante a que algo salga mal',
        description: 'Mi cabeza proyecta el peor escenario y vivo a la defensiva esperando malas noticias.',
        severity: 3,
        painPoint: 'Catastrofismo mental y ansiedad crónica por el futuro',
      },
      {
        text: 'Sensación de pánico o bloqueo ante el día de mañana',
        description: 'La incertidumbre me paraliza el estómago y no me permite disfrutar de mi presente.',
        severity: 4,
        painPoint: 'Parálisis por miedo, angustia fóbica al porvenir',
      },
    ],
  },
  {
    id: 7,
    category: 'sed',
    categoryLabel: 'Anhelo de Restauración y Cambio Real',
    iconName: 'sparkles',
    question: '¿Qué tan urgente y necesario es para tu vida hoy iniciar un camino de 30 días en Dios?',
    subtitle: 'El deseo del corazón es el suelo donde la semilla de la gracia germina.',
    options: [
      {
        text: 'Quiero profundizar y consolidar mis hábitos de oración y paz',
        description: 'Estoy estable, pero anhelo una estructura más rica y constante con Dios.',
        severity: 1,
      },
      {
        text: 'Es un buen momento para ordenar mi vida interior',
        description: 'Siento que necesito una pausa reflexiva y un acompañamiento que me guíe.',
        severity: 2,
        painPoint: 'Falta de disciplina y método espiritual estructurado',
      },
      {
        text: 'Muy necesario; mi alma me pide a gritos auxilio y dirección diaria',
        description: 'He intentado cambiar solo/a muchas veces y vuelvo a caer en la misma ansiedad.',
        severity: 3,
        painPoint: 'Ciclo de recaídas por falta de acompañamiento diario',
      },
      {
        text: 'Urgente y vital; no puedo seguir viviendo de esta manera un mes más',
        description: 'Necesito ser rescatado/a, sostenido/a por la mano de Dios y guiado/a día tras día.',
        severity: 4,
        painPoint: 'Grito de auxilio del alma: momento decisivo de transformación',
      },
    ],
  },
];

interface QuizResult {
  scoreTotal: number;
  averageSeverity: number;
  title: string;
  levelBadge: string;
  subtitle: string;
  primaryPains: string[];
  spiritualDiagnosis: string;
  hopeMessage: string;
  scriptureAnchor: {
    verse: string;
    reference: string;
  };
}

function calculateQuizResult(answers: Record<number, number>): QuizResult {
  let total = 0;
  const painPoints: string[] = [];

  QUIZ_QUESTIONS.forEach((q) => {
    const selectedOptionIdx = answers[q.id] ?? 1;
    const option = q.options[selectedOptionIdx] || q.options[0];
    total += option.severity;
    if (option.painPoint && option.severity >= 3) {
      painPoints.push(option.painPoint);
    }
  });

  const avg = total / QUIZ_QUESTIONS.length;

  if (avg >= 3.2) {
    return {
      scoreTotal: total,
      averageSeverity: avg,
      title: 'Corazón en Colapso Silencioso & Sobrecarga del Alma',
      levelBadge: 'Nivel Alto de Agotamiento y Sed Espiritual',
      subtitle:
        'Llevas demasiado tiempo sosteniendo el mundo entero sobre tus hombros. Tu sistema nervioso y tu espíritu han encendido la alarma.',
      primaryPains: painPoints.length > 0 ? painPoints : [
        'Rumiación e insomnio por hiperactividad mental',
        'Sensación de soledad y lejanía de Dios en la prueba',
        'Agotamiento crónico que el sueño ya no repara',
        'Culpa o autoexigencia que apagan tu merecimiento de paz',
      ],
      spiritualDiagnosis:
        'Tu diagnóstico revela un estado de sobreexigencia y fatiga espiritual profunda. Has sido el pilar de otros, absorbiendo tensiones, frustraciones y miedos sin darle a tu propia alma un refugio seguro. No estás fallando en tu fe: estás fisiológicamente y espiritualmente agotado/a. Las soluciones superficiales como "échale ganas" o "no te preocupes" no funcionan porque tu vasija interior está completamente vacía.',
      hopeMessage:
        'Hay una promesa inquebrantable para ti hoy: Dios no rechaza el corazón quebrantado ni se cansa de quien ya no puede más. Este diagnóstico no es una sentencia, sino el punto de inflexión donde dejas de pelear con tus fuerzas humanas para comenzar a descansar en la fortaleza de Dios. No tienes que arreglarte primero para venir a Él; Él te recibe exactamente como estás.',
      scriptureAnchor: {
        verse: '«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo sobre vosotros y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas.»',
        reference: 'Mateo 11:28-29',
      },
    };
  } else if (avg >= 2.2) {
    return {
      scoreTotal: total,
      averageSeverity: avg,
      title: 'Espíritu en Modo Supervivencia & Búsqueda de Ancla',
      levelBadge: 'Nivel Moderado de Tensión y Fatiga',
      subtitle:
        'Logras funcionar por fuera, pero por dentro experimentas un desgaste progresivo que te roba la serenidad y la cercanía con Dios.',
      primaryPains: painPoints.length > 0 ? painPoints : [
        'Dificultad para desconectar la mente en las noches',
        'Rutina que te hace vivir en piloto automático',
        'Miedo sutil a perder el control de las circunstancias',
        'Anhelo de un encuentro más íntimo y regular con Dios',
      ],
      spiritualDiagnosis:
        'Tu estado actual es el de un alma que ha aprendido a resistir, pero a costa de su propia serenidad interior. La rutina, las responsabilidades laborales o familiares y la falta de un acompañamiento espiritual ordenado te hacen navegar en aguas movedizas. Tienes fe y convicción, pero te falta el método diario y el refugio constante para que esa fe se traduzca en descanso real.',
      hopeMessage:
        'La gracia de Dios no es una teoría lejana, sino una presencia tangible que puede reconstruir tus mañanas y proteger tus noches. Estás en el momento perfecto para detener la fuga de energía y construir una muralla de paz alrededor de tu mente antes de que el desgaste se convierta en crisis mayor.',
      scriptureAnchor: {
        verse: '«Los que esperan a Dios tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.»',
        reference: 'Isaías 40:31',
      },
    };
  } else {
    return {
      scoreTotal: total,
      averageSeverity: avg,
      title: 'Alma en Sendero de Gracia & Consolidación Interior',
      levelBadge: 'Estado Estable con Sed de Profundidad',
      subtitle:
        'Cuentas con fundamentos de fe y serenidad, pero anhelas dar el paso hacia una disciplina contemplativa y una arquitectura sólida de paz.',
      primaryPains: painPoints.length > 0 ? painPoints : [
        'Deseo de mayor constancia en la oración contemplativa',
        'Protección de la paz frente a imprevistos o tormentas',
        'Anhelo de un itinerario guiado paso a paso',
      ],
      spiritualDiagnosis:
        'Tu conciencia espiritual reconoce la importancia de Dios en tu vida. Sin embargo, en un mundo saturado de ruido y distracciones, mantener el templo interior limpio y en calma requiere un entrenamiento constante. El programa de 30 días te permitirá pasar de la tranquilidad esporádica a una fortaleza inquebrantable a prueba de tormentas.',
      hopeMessage:
        'Estás invitado/a a subir un escalón más en tu intimidad con Dios. Con la compañía diaria de un guía dedicado (Clara Luz o Leo), transformarás tus momentos cotidianos en un santuario vivo de gratitud y victoria espiritual.',
      scriptureAnchor: {
        verse: '«Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.»',
        reference: 'Filipenses 4:7',
      },
    };
  }
}

interface SpiritualQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart30DayPlan: () => void;
  onSelectMentorGuide?: (mentor: 'clara_luz' | 'leo') => void;
  onExploreFreeBotiquin?: () => void;
}

export const SpiritualQuizModal: React.FC<SpiritualQuizModalProps> = ({
  isOpen,
  onClose,
  onStart30DayPlan,
  onExploreFreeBotiquin,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 = bienvenida, 1-7 = preguntas, 8 = resultado
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [hasCompletedBefore, setHasCompletedBefore] = useState<boolean>(() => {
    try {
      return localStorage.getItem('fe_spiritual_quiz_completed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Si ya completó antes y tiene respuestas guardadas
    try {
      const saved = localStorage.getItem('fe_spiritual_quiz_answers');
      if (saved) {
        setAnswers(JSON.parse(saved));
      }
    } catch {}
  }, []);

  if (!isOpen) return null;

  const currentQuestion = QUIZ_QUESTIONS[currentStep - 1];
  const progressPercent = Math.min(100, Math.round(((currentStep) / 7) * 100));

  const handleSelectOption = (severityIdx: number) => {
    if (!currentQuestion) return;
    const nextAnswers = { ...answers, [currentQuestion.id]: severityIdx };
    setAnswers(nextAnswers);

    try {
      localStorage.setItem('fe_spiritual_quiz_answers', JSON.stringify(nextAnswers));
    } catch {}

    // Avance automático suave al siguiente
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar quiz
      try {
        localStorage.setItem('fe_spiritual_quiz_completed', 'true');
        setHasCompletedBefore(true);
      } catch {}
      setCurrentStep(8);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentStep(1);
    setAnswers({});
  };

  const handleCompleteAndGoToPlan = () => {
    try {
      localStorage.setItem('fe_spiritual_quiz_completed', 'true');
    } catch {}
    onClose();
    onStart30DayPlan();
  };

  const quizResult = calculateQuizResult(answers);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#030814]/90 backdrop-blur-md animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quiz-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#081426] border border-[#F59E0B]/30 rounded-[22px] sm:rounded-[26px] shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Top Glow bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#10B981]" />

        {/* Header Bar */}
        <div className="px-5 sm:px-7 py-3.5 sm:py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#060F1E]/80 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <Sparkles className="w-4 h-4" strokeWidth={1.75} />
            </div>
            <div>
              <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#F59E0B] block">
                Evaluación Espiritual & Conciencia
              </span>
              <h2 id="quiz-modal-title" className="text-[13px] sm:text-[14px] font-semibold text-[#F1F5F9] leading-tight">
                {currentStep === 0
                  ? 'Bienvenido/a • Diagnóstico del Alma'
                  : currentStep >= 1 && currentStep <= 7
                  ? `Pregunta ${currentStep} de 7 • ${currentQuestion?.categoryLabel}`
                  : 'Tu Diagnóstico Espiritual y de Esperanza'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentStep === 8 && (
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="text-[11.5px] text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1 px-2.5 py-1 rounded-[8px] hover:bg-white/[0.05] transition-colors cursor-pointer"
                title="Repetir el test"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Repetir</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-[8px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar for Questions (Steps 1 to 7) */}
        {currentStep >= 1 && currentStep <= 7 && (
          <div className="w-full bg-[#0E223D] h-1 shrink-0">
            <div
              className="bg-gradient-to-r from-[#F59E0B] to-[#10B981] h-1 transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

        {/* Modal Body: Scrollable */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6 text-[#E2E8F0]">
          {/* ================= STEP 0: BIENVENIDA / ONBOARDING ================= */}
          {currentStep === 0 && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              <div className="max-w-xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-[11.5px] font-medium mx-auto sm:mx-0">
                  <Heart className="w-3.5 h-3.5 fill-[#F59E0B]/20" />
                  <span>Recepción Espiritual Personalizada</span>
                </div>

                <h3 className="font-editorial text-[24px] sm:text-[28px] text-[#F1F5F9] leading-snug font-normal">
                  Antes de comenzar, escuchemos cómo está realmente tu alma
                </h3>

                <p className="text-[13.5px] sm:text-[14px] text-[#94A3B8] leading-relaxed">
                  Vivimos en un mundo que nos exige ser fuertes, eficientes e inquebrantables. Pero Dios no te pide que escondas tu dolor, tu cansancio ni tus noches en vela.
                </p>

                <div className="p-4 rounded-[16px] bg-[#0E223D]/60 border border-white/[0.08] text-left space-y-2.5">
                  <div className="flex items-center gap-2 text-[#F59E0B] font-semibold text-[13px]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>¿En qué consiste esta evaluación confidencial?</span>
                  </div>
                  <ul className="text-[12.5px] text-[#CBD5E1] space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>7 preguntas breves</strong> diseñadas por profesionales de la fe y el bienestar emocional.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Diagnóstico claro de tu <strong>estado de ánimo espiritual, nivel de conciencia y fatiga</strong>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                      <span>Un <strong>resumen profesional con bálsamo de esperanza</strong> y la ruta exacta de 30 días para reconstruirte en Dios.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center sm:justify-start">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-[14px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#D97706] hover:to-[#B45309] text-[#060F1E] font-semibold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/20 transition-all cursor-pointer"
                  >
                    <span>Comenzar las 7 Preguntas</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {hasCompletedBefore && (
                    <button
                      type="button"
                      onClick={() => setCurrentStep(8)}
                      className="w-full sm:w-auto px-4 py-3 rounded-[14px] bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] text-[13px] font-medium border border-white/[0.08] transition-colors cursor-pointer"
                    >
                      Ver mi último diagnóstico
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-[#64748B] text-center sm:text-left">
                  Tus respuestas son totalmente privadas y se guardan únicamente en tu dispositivo.
                </p>
              </div>
            </div>
          )}

          {/* ================= STEPS 1-7: PREGUNTAS DEL QUIZ ================= */}
          {currentStep >= 1 && currentStep <= 7 && currentQuestion && (
            <div className="space-y-5 animate-fade-in">
              {/* Category Pill & Step Counter */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#F59E0B] bg-[#F59E0B]/10 px-2.5 py-1 rounded-full border border-[#F59E0B]/25">
                  Pregunta {currentStep} de 7 • {currentQuestion.categoryLabel}
                </span>
                <span className="text-[11.5px] text-[#94A3B8]">
                  Paso {currentStep}/7
                </span>
              </div>

              {/* Question Header */}
              <div className="space-y-1.5">
                <h3 className="font-editorial text-[20px] sm:text-[23px] text-[#F1F5F9] font-normal leading-snug">
                  {currentQuestion.question}
                </h3>
                <p className="text-[12.5px] sm:text-[13px] text-[#94A3B8]">
                  {currentQuestion.subtitle}
                </p>
              </div>

              {/* 4 Options Grid */}
              <div className="space-y-2.5 pt-1">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = answers[currentQuestion.id] === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-[14px] border transition-all cursor-pointer flex items-start gap-3.5 group ${
                        isSelected
                          ? 'bg-[#0E2849] border-[#F59E0B] shadow-md shadow-[#F59E0B]/10 ring-1 ring-[#F59E0B]'
                          : 'bg-[#0B1728]/80 hover:bg-[#0E223D] border-white/[0.08] hover:border-white/[0.18]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? 'border-[#F59E0B] bg-[#F59E0B] text-[#060F1E]'
                            : 'border-[#64748B] group-hover:border-[#94A3B8]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>

                      <div className="flex-1 space-y-0.5">
                        <span
                          className={`text-[13.5px] sm:text-[14px] font-semibold block transition-colors ${
                            isSelected ? 'text-[#F59E0B]' : 'text-[#F1F5F9] group-hover:text-white'
                          }`}
                        >
                          {opt.text}
                        </span>
                        <p className="text-[12px] text-[#94A3B8] leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation buttons: Anterior / Saltar */}
              <div className="pt-2 flex items-center justify-between border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-3 py-2 text-[12.5px] text-[#94A3B8] hover:text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                {answers[currentQuestion.id] !== undefined && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentStep < 7) {
                        setCurrentStep(currentStep + 1);
                      } else {
                        try {
                          localStorage.setItem('fe_spiritual_quiz_completed', 'true');
                          setHasCompletedBefore(true);
                        } catch {}
                        setCurrentStep(8);
                      }
                    }}
                    className="px-4 py-2 text-[12.5px] font-semibold text-[#F59E0B] hover:text-white bg-[#F59E0B]/10 hover:bg-[#F59E0B]/20 rounded-[10px] border border-[#F59E0B]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{currentStep === 7 ? 'Ver mi Diagnóstico' : 'Siguiente'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 8: RESULTADO PROFESIONAL, ESPIRITUAL Y DE ESPERANZA ================= */}
          {currentStep === 8 && (
            <div className="space-y-6 animate-fade-in">
              {/* Badge & Title */}
              <div className="space-y-2 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>{quizResult.levelBadge}</span>
                </div>
                <h3 className="font-editorial text-[24px] sm:text-[27px] text-[#F1F5F9] leading-tight font-normal">
                  {quizResult.title}
                </h3>
                <p className="text-[13px] sm:text-[13.5px] text-[#CBD5E1] leading-relaxed">
                  {quizResult.subtitle}
                </p>
              </div>

              {/* 1. Tocar sus Dolores Identificados */}
              <div className="p-4 sm:p-5 rounded-[16px] bg-[#0A1628] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-[#EF4444] font-semibold text-[13px]">
                  <Flame className="w-4 h-4" />
                  <span>Tus Puntos de Mayor Dolor y Desgaste Identificados:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px] text-[#CBD5E1]">
                  {quizResult.primaryPains.map((pain, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-[10px] bg-[#060F1E]/90 border border-white/[0.05] flex items-start gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                      <span>{pain}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[12.5px] text-[#94A3B8] leading-relaxed pt-1 border-t border-white/[0.06]">
                  {quizResult.spiritualDiagnosis}
                </p>
              </div>

              {/* 2. Bálsamo de Esperanza y Promesa Bíblica */}
              <div className="p-4 sm:p-5 rounded-[16px] bg-gradient-to-br from-[#0E2849] to-[#0A1A2F] border border-[#F59E0B]/30 space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-[#F59E0B] font-semibold text-[13px]">
                  <Sun className="w-4 h-4" />
                  <span>El Bálsamo de Esperanza para tu Alma:</span>
                </div>
                <p className="text-[13px] text-[#E2E8F0] leading-relaxed italic">
                  "{quizResult.hopeMessage}"
                </p>
                <div className="p-3.5 rounded-[12px] bg-[#060F1E]/70 border border-[#F59E0B]/20 space-y-1">
                  <p className="text-[12px] sm:text-[12.5px] text-[#F1F5F9] leading-relaxed">
                    {quizResult.scriptureAnchor.verse}
                  </p>
                  <span className="text-[11px] font-semibold text-[#F59E0B] block text-right">
                    — {quizResult.scriptureAnchor.reference}
                  </span>
                </div>
              </div>

              {/* 3. El Llamado a la Acción (CTA): Programa de 30 Días con UN ÚNICO PAGO */}
              <div className="p-5 sm:p-6 rounded-[18px] bg-gradient-to-b from-[#132A4A] to-[#0B1E36] border-2 border-[#F59E0B] shadow-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.1]">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#34D399] bg-[#10B981]/15 px-2.5 py-0.5 rounded-full border border-[#10B981]/30">
                      Solución Estructurada • Día 1 al 30
                    </span>
                    <h4 className="text-[17px] sm:text-[18px] font-bold text-[#F1F5F9] mt-1">
                      El Programa de 30 Días con tu Guía Personal
                    </h4>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-[20px] sm:text-[22px] font-bold text-[#F59E0B] block leading-none">
                      USD 7.99 <span className="text-[12px] text-[#FBBF24] font-medium">(Pago Único)</span>
                    </span>
                    <span className="text-[12px] font-medium text-[#CBD5E1]">
                      o $29.900 COL • Sin suscripciones mensuales
                    </span>
                  </div>
                </div>

                {/* Beneficios Reales que Obtendrá */}
                <div className="space-y-2">
                  <span className="text-[12px] font-semibold text-[#CBD5E1] block uppercase tracking-wider">
                    Beneficios reales que transformarás al ingresar:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[12px] text-[#E2E8F0]">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Acompañamiento Fijo con Clara Luz o Leo:</strong> Tu guía personal te acompañará durante los 30 días sin cambios.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Itinerario Paso a Paso:</strong> Desafíos diarios de oración, entrega nocturna y renovación de fortaleza.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Botiquín Fisiológico 4×4:</strong> Protocolos de respiración diafragmática para apagar la taquicardia y conciliar el sueño.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Diario Espiritual y de Gratitud:</strong> Registro íntimo de milagros cotidianos y cuaderno de promesas.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Chat de Mentoría Espiritual:</strong> Consejería compasiva en tiempo real cuando la aflicción golpee tu puerta.</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span><strong>Acceso Vitalicio y Privado:</strong> Tus reflexiones y archivos protegidos sin caducidad.</span>
                    </div>
                  </div>
                </div>

                {/* Botones de Acción Primarios y Secundarios */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleCompleteAndGoToPlan}
                    className="flex-1 py-3.5 px-5 rounded-[14px] bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] hover:from-[#EAB308] hover:to-[#B45309] text-[#060F1E] font-bold text-[14px] flex items-center justify-center gap-2 shadow-lg shadow-[#F59E0B]/25 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Ingresar al Programa de 30 Días (USD 7.99)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {onExploreFreeBotiquin && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onExploreFreeBotiquin();
                      }}
                      className="py-3 px-4 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.1] text-[#CBD5E1] text-[12.5px] font-medium border border-white/[0.1] transition-colors cursor-pointer text-center"
                    >
                      Explorar el Botiquín Gratuito
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 text-[11px] text-[#94A3B8] pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    Pago 100% seguro y garantizado
                  </span>
                  <span>•</span>
                  <span>Acceso inmediato para siempre</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
