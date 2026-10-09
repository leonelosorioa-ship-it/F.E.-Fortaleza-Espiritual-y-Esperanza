/**
 * Datos canónicos del ecosistema F.E.™ • Esperanza en Dios (Tu Poder Mental™)
 * Contenido pastoral, reestructuración cognitiva y anclaje somático libre de legalismos.
 */

export type EmotionalDimensionId =
  | 'ansiedad'
  | 'miedo'
  | 'culpa'
  | 'insomnio'
  | 'agotamiento';

export interface EmotionalDimensionOption {
  id: EmotionalDimensionId;
  label: string;
  tagline: string;
  somaticFocus: string;
  somaticExerciseType: 'respiracion_ritmica' | 'anclaje_54321';
  scripture: {
    verse: string;
    reference: string;
    contextPastoral: string;
  };
  liturgy: {
    step1_reconocer: {
      title: string;
      prayer: string;
    };
    step2_soltar: {
      title: string;
      prayer: string;
    };
    step3_descansar: {
      title: string;
      prayer: string;
    };
  };
}

export const EMOTIONAL_DIMENSIONS: Record<EmotionalDimensionId, EmotionalDimensionOption> = {
  ansiedad: {
    id: 'ansiedad',
    label: 'Ansiedad / Hipercontrol',
    tagline: 'Opresión en el pecho, necesidad de vigilarlo todo y anticipación desgastante.',
    somaticFocus: 'Respiración diafragmática 4×4: Inhalar verdad divina / Exhalar la urgencia de controlar.',
    somaticExerciseType: 'respiracion_ritmica',
    scripture: {
      verse: '«Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.»',
      reference: 'Filipenses 4:6-7',
      contextPastoral: 'Pablo escribió esto desde una celda romana, no desde un palacio. La paz prometida aquí no es la ausencia de problemas, sino una guardia militar divina («guardará») que protege tu mente cuando tus fuerzas humanas no alcanzan para sostener el mañana.',
    },
    liturgy: {
      step1_reconocer: {
        title: '1. Reconocer el dolor humano',
        prayer: 'Señor, mi pecho está tenso y mi respiración se siente corta. Nombro delante de ti mi agitación: he querido controlar lo que escapa de mis manos. Valido mi cuerpo: este dolor no es falta de fe, es la señal de que estoy cargando más de lo que fui diseñado/a para soportar.',
      },
      step2_soltar: {
        title: '2. Soltar el control',
        prayer: 'Rindo la ilusión de que mis preocupaciones pueden cambiar el desenlace del mañana. Abro mis manos en este instante y te entrego cada escenario catastrófico que mi mente ha fabricado. No soy el guardián del universo; tú lo eres.',
      },
      step3_descansar: {
        title: '3. Descansar en la soberanía divina',
        prayer: 'Me cobijo en tu providencia amorosa. Si tú vistes los lirios y alimentas las aves, también cuidas de mí y de quienes amo. Dejo caer el peso de mi cuerpo en este asiento y elijo confiar en que tu gracia me basta para hoy.',
      },
    },
  },
  miedo: {
    id: 'miedo',
    label: 'Miedo / Pánico agudo',
    tagline: 'Sensación de peligro inminente, temblor, mareo o taquicardia que nubla el juicio.',
    somaticFocus: 'Anclaje sensorial 5-4-3-2-1: Traer la mente al presente seguro donde Dios te sostiene.',
    somaticExerciseType: 'anclaje_54321',
    scripture: {
      verse: '«No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.»',
      reference: 'Isaías 41:10',
      contextPastoral: 'El mandato bíblico «no temas» no es una reprimenda moral, sino la caricia de un Padre que te toma de la mano en medio de la oscuridad. Dios no te pide que no sientas la emoción del miedo, sino que recuerdes que no estás solo/a en medio de ella.',
    },
    liturgy: {
      step1_reconocer: {
        title: '1. Reconocer el dolor humano',
        prayer: 'Dios mío, mi cuerpo ha disparado una alarma de peligro. Mi corazón late aprisa y el temor intenta paralizarme. Acepto esta emoción sin juzgarme: mi sistema nervioso está buscando protegerme, pero en este instante estoy a salvo bajo tu amparo.',
      },
      step2_soltar: {
        title: '2. Soltar el control',
        prayer: 'Suelto la necesidad de defenderme con mis propios recursos. Renuncio a alimentar pensamientos de desgracia o catástrofe. Te entrego la incertidumbre de este minuto y dejo de forcejear con la tormenta.',
      },
      step3_descansar: {
        title: '3. Descansar en la soberanía divina',
        prayer: 'Tú eres mi refugio y fortaleza, mi pronto auxilio en las tribulaciones. Aunque la tierra tiemble, descanso en tu diestra fiel. En este lugar y en este segundo, tu presencia me envuelve y me guarda.',
      },
    },
  },
  culpa: {
    id: 'culpa',
    label: 'Culpa / Autorreproche religioso',
    tagline: 'Juicio interno implacable, sensación de indignidad o miedo a haber decepcionado a Dios.',
    somaticFocus: 'Respiración de desahogo: Inhalar perdón gratuito / Exhalar la autoexigencia punitiva.',
    somaticExerciseType: 'respiracion_ritmica',
    scripture: {
      verse: '«Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús... Porque el Señor es compasivo y misericordioso, lento para la ira y grande en misericordia.»',
      reference: 'Romanos 8:1 • Salmo 103:8',
      contextPastoral: 'La culpa neurótica y el autorreproche religioso provienen de creer que la salvación depende de tu perfección personal. El Evangelio enseña que el amor de Dios hacia ti no sube cuando tienes un buen día ni baja cuando tu debilidad se hace evidente.',
    },
    liturgy: {
      step1_reconocer: {
        title: '1. Reconocer el dolor humano',
        prayer: 'Señor, traigo ante ti el peso del autorreproche. Me he sentido culpable por no ser lo suficientemente fuerte, por dudar o por sentirme frágil. Reconozco que he confundido mi voz interna acusadora con tu voz pastoral.',
      },
      step2_soltar: {
        title: '2. Soltar el control',
        prayer: 'Renuncio a castigarme a mí mismo/a para sentirme digno/a de tu amor. Suelto las expectativas legalistas que hombres o costumbres pusieron sobre mis hombros. No tengo que pagar penitencia por lo que tu gracia ya cubrió.',
      },
      step3_descansar: {
        title: '3. Descansar en la soberanía divina',
        prayer: 'Acepto tu perdón incondicional. Descanso en que me miras con ojos de compasión, como un alfarero que conoce el barro del que fui formado/a. Me declaro en paz contigo y en paz con mi propia alma.',
      },
    },
  },
  insomnio: {
    id: 'insomnio',
    label: 'Insomnio / Rumiación nocturna',
    tagline: 'La noche se convierte en un tribunal de pensamientos circulares y vigilia forzada.',
    somaticFocus: 'Ralentización fisiológica 4-4-4: Desactivar la vigilia mental para invitar al sueño reparador.',
    somaticExerciseType: 'respiracion_ritmica',
    scripture: {
      verse: '«En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado. No se adormecerá ni dormirá el que guarda a Israel.»',
      reference: 'Salmo 4:8 • Salmo 121:4',
      contextPastoral: 'El salmista David escribió esto en medio de persecuciones reales. La capacidad de dormir en paz nace de una verdad teológica profunda: tú puedes cerrar los ojos y dejar la vigilia porque Dios nunca duerme; Él cuida el turno de la noche por ti.',
    },
    liturgy: {
      step1_reconocer: {
        title: '1. Reconocer el dolor humano',
        prayer: 'Padre, el silencio de la noche se ha llenado de ruidos y pendientes. Mi mente repite conversaciones, deudas y temores. Acepto que mi cuerpo necesita descansar y que forzarme a dormir solo aumenta mi tensión.',
      },
      step2_soltar: {
        title: '2. Soltar el control',
        prayer: 'Apago en este instante el tribunal mental. Nada de lo que piense esta madrugada cambiará la realidad de mañana. Te entrego mis tareas inconclusas y renuncio a vigilar el mundo mientras la noche avanza.',
      },
      step3_descansar: {
        title: '3. Descansar en la soberanía divina',
        prayer: 'Tú te quedas despierto cuidando de mi hogar y de mi destino. Cierro mis párpados con la certeza de que tu fidelidad amanece conmigo. Me entrego al reposo profundo bajo la sombra de tus alas.',
      },
    },
  },
  agotamiento: {
    id: 'agotamiento',
    label: 'Agotamiento / Pérdida de fuerzas',
    tagline: 'Cansancio del alma que el dormir no repara, sensación de haber vaciado todo el depósito.',
    somaticFocus: 'Enraizamiento y rendición corporal: Permitir que la gravedad y la gracia sostengan tu peso.',
    somaticExerciseType: 'anclaje_54321',
    scripture: {
      verse: '«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar. Llevad mi yugo sobre vosotros y aprended de mí, que soy manso y humilde de corazón; y hallaréis descanso para vuestras almas.»',
      reference: 'Mateo 11:28-29',
      contextPastoral: 'Jesús no ofrece una técnica de productividad, sino un relevo de carga. En el mundo antiguo, el yugo unía a dos bueyes: uno fuerte y experimentado, y otro cansado. Jesús se ofrece a llevar la parte pesada para que tú camines ligero.',
    },
    liturgy: {
      step1_reconocer: {
        title: '1. Reconocer el dolor humano',
        prayer: 'Señor, no me queda energía en la vasija. He intentado ser el sostén de otros, cumplir con expectativas gigantescas y disimular mi fatiga. Te digo la verdad: estoy agotado/a y necesito detenerme.',
      },
      step2_soltar: {
        title: '2. Soltar el control',
        prayer: 'Suelto la autoexigencia de resolverlo todo hoy. Acepto mis límites biológicos como un recordatorio saludable de que soy criatura y no creador. No tengo que demostrarle nada a nadie para ser amado/a por ti.',
      },
      step3_descansar: {
        title: '3. Descansar en la soberanía divina',
        prayer: 'Tú renuevas las fuerzas del que no tiene ningunas. Me refugio en tu regazo sin prisas. No me levanto hasta que tu Santo Espíritu haya restaurado el aliento de vida en mi corazón.',
      },
    },
  },
};

// Generador de afirmación pastoral para el Diario de Gratitud Inteligente
export function generateGratitudeAffirmation(gratitudeText: string): {
  affirmation: string;
  neuroNote: string;
  scriptureReference: string;
} {
  const clean = gratitudeText.trim().toLowerCase();

  if (clean.includes('salud') || clean.includes('cuerpo') || clean.includes('respirar') || clean.includes('despertar')) {
    return {
      affirmation: 'Tu agradecimiento por la vida activa los circuitos de calma en tu cerebro y honra el templo que Dios te dio.',
      neuroNote: 'Enfocar la atención en el funcionamiento básico de tu cuerpo reduce la actividad en la amígdala y restablece la regulación vagal.',
      scriptureReference: 'Filipenses 4:8 • «En esto pensad: en todo lo verdadero, todo lo honesto, todo lo justo...»',
    };
  }

  if (clean.includes('familia') || clean.includes('hijo') || clean.includes('espos') || clean.includes('amig') || clean.includes('mamá') || clean.includes('papá')) {
    return {
      affirmation: 'Celebrar los vínculos afectivos es un reflejo del pacto de amor con el que Dios te rodea día tras día.',
      neuroNote: 'El recuerdo afectivo libera oxitocina, disminuyendo la sensación de amenaza y contrarrestando la rumiación de aislamiento.',
      scriptureReference: 'Colosenses 3:15 • «Y la paz de Dios gobierne en vuestros corazones... y sed agradecidos.»',
    };
  }

  if (clean.includes('trabajo') || clean.includes('provis') || clean.includes('comida') || clean.includes('techo') || clean.includes('pan')) {
    return {
      affirmation: 'Reconocer el sustento diario derriba la mentira de la escasez y reafirma que el Padre conoce cada una de tus necesidades.',
      neuroNote: 'La gratitud por provisión entrena la corteza prefrontal para detectar oportunidades de paz en lugar de amenazas ficticias.',
      scriptureReference: 'Mateo 6:31-33 • «No os afanéis, pues... vuestro Padre celestial sabe que tenéis necesidad de todas estas cosas.»',
    };
  }

  // Predeterminado reflexivo
  return {
    affirmation: 'Al nombrar este motivo de gratitud, llevas cautivo un pensamiento rumiante y lo reemplazas con la fidelidad visible de Dios.',
    neuroNote: 'La neuroplasticidad confirma que aquello en lo que enfocas tu mente de forma deliberada reconfigura tus vías de respuesta emocional.',
    scriptureReference: '2 Corintios 10:5 • «Llevando cautivo todo pensamiento a la obediencia de Cristo.»',
  };
}

export interface DayProgramPlan {
  dayNumber: number;
  title: string;
  subtitle: string;
  focus: string;
  isUnlocked: boolean; // Días 1-7 son true, 8-30 son false por defecto
  mentor: 'clara_luz' | 'leo';
  scriptureAnchor: string;
}

export const PROGRAM_30_DAYS: DayProgramPlan[] = [
  {
    dayNumber: 1,
    title: 'Día 1: Desarmar la culpa de sentir dolor',
    subtitle: 'Tu sistema nervioso y tu fe no son enemigos.',
    focus: 'Validación fisiológica y teología de la gracia.',
    isUnlocked: true,
    mentor: 'clara_luz',
    scriptureAnchor: 'Salmo 103:14',
  },
  {
    dayNumber: 2,
    title: 'Día 2: El santuario de la respiración consciente',
    subtitle: 'El aliento de vida (Ruaj) como ancla biológica.',
    focus: 'Respiración rítmica y pausa en la tormenta.',
    isUnlocked: true,
    mentor: 'clara_luz',
    scriptureAnchor: 'Génesis 2:7',
  },
  {
    dayNumber: 3,
    title: 'Día 3: Rendir la ilusión del hipercontrol',
    subtitle: 'Caminar con manos abiertas ante el mañana.',
    focus: 'Reestructuración cognitiva del afán.',
    isUnlocked: true,
    mentor: 'leo',
    scriptureAnchor: 'Mateo 6:27',
  },
  {
    dayNumber: 4,
    title: 'Día 4: Apagar el tribunal de la noche',
    subtitle: 'Dios hace el turno de vigilia mientras tú descansas.',
    focus: 'Higiene del sueño y entrega nocturna.',
    isUnlocked: true,
    mentor: 'clara_luz',
    scriptureAnchor: 'Salmo 121:4',
  },
  {
    dayNumber: 5,
    title: 'Día 5: Fortaleza en la vulnerabilidad',
    subtitle: 'El poder que se perfecciona en tu debilidad.',
    focus: 'Resiliencia espiritual basada en la cruz.',
    isUnlocked: true,
    mentor: 'leo',
    scriptureAnchor: '2 Corintios 12:9',
  },
  {
    dayNumber: 6,
    title: 'Día 6: Filtros mentales de Filipenses 4:8',
    subtitle: 'Reentrenar la mirada hacia lo verdadero y puro.',
    focus: 'Neuroplasticidad y meditación bíblica.',
    isUnlocked: true,
    mentor: 'clara_luz',
    scriptureAnchor: 'Filipenses 4:8',
  },
  {
    dayNumber: 7,
    title: 'Día 7: El ancla de paz consolidada',
    subtitle: 'Cierre de la primera semana de refugio.',
    focus: 'Celebración de la gracia y recapitulación semanal.',
    isUnlocked: true,
    mentor: 'leo',
    scriptureAnchor: 'Hebreos 6:19',
  },
  // Días 8 a 30: Bloqueados por defecto (Trial freemium)
  ...Array.from({ length: 23 }, (_, i) => {
    const day = i + 8;
    const mentors: ('clara_luz' | 'leo')[] = ['clara_luz', 'leo'];
    const titles = [
      'Desactivar la alarma del pánico',
      'El perdón como liberación corporal',
      'Silenciar las voces de condenación',
      'Reconstrucción de la identidad en Dios',
      'Paz en medio de pérdidas cotidianas',
      'El arte de esperar sin desesperar',
      'Desarraigar el perfeccionismo destructivo',
      'Sanar la memoria del corazón',
      'La armadura de Dios en el pensamiento',
      'Fidelidad en lo pequeño y cotidiano',
      'Confianza cuando el camino se torna oscuro',
      'Renovar el pacto de amor propio y compasión',
      'El fruto del Espíritu en tu sistema nervioso',
      'Sobrellevar las cargas en comunidad',
      'Vencer la trampa de la comparación',
      'Paz financiera y provisión soberana',
      'Vivir en presencia consciente ante Dios',
      'Liderar tu mente desde el sosiego',
      'La alabanza como medicina fisiológica',
      'Certeza de esperanza contra toda duda',
      'Construir un refugio para tormentas futuras',
      'El legado de un corazón en reposo',
      'Día 30: Una mente renovada para toda la vida',
    ];
    return {
      dayNumber: day,
      title: `Día ${day}: ${titles[i] || 'Profundización de paz'}`,
      subtitle: 'Contenido guiado para consolidar tu fortaleza espiritual.',
      focus: 'Reestructuración cognitiva y oración contemplativa avanzada.',
      isUnlocked: false,
      mentor: mentors[i % 2],
      scriptureAnchor: 'Isaías 26:3',
    };
  }),
];
