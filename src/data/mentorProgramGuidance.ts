import { MentorProfile } from '../types';

export interface MentorDailyGuidance {
  mentorId: 'clara_luz' | 'leo';
  mentorName: string;
  mentorTitle: string;
  mentorMotto: string;
  mentorColor: string;
  toneLabel: string;
  avatarIcon: 'heart' | 'shield';
  reflectionMessage: string;
  guidedPrayer: string;
  mentorChallenge: string;
}

export const CLARA_LUZ_PROFILE = {
  id: 'clara_luz' as const,
  fullName: 'Clara Luz',
  title: 'Tu Guía de F.E.™',
  motto: 'Encuentra tu ancla de paz',
  shortBio: 'Mentora espiritual y de sosiego interior. Te acompaña a conectar con el corazón del Padre, calmar la sobrecarga emocional y el insomnio, y descansar en su gracia sin juicio ni culpa.',
  specialty: 'Paz interior, calma fisiológica, sanidad de la culpa y gracia para el corazón.',
  color: '#14B8A6',
  badgeBg: 'bg-[#14B8A6]/20',
  badgeText: 'text-[#5EEAD4]',
  border: 'border-[#14B8A6]/40',
  welcomeGreeting: '«Hijo(a) amado(a), la paz de Dios sea con tu corazón. Durante estos 30 días caminaré a tu lado con la ternura y la gracia del Padre. Vamos a desarmar el miedo, sanar la culpa religiosa y enseñarle a tu sistema nervioso a reposar en Sus brazos.»',
};

export const LEO_PROFILE = {
  id: 'leo' as const,
  fullName: 'Leo',
  title: 'Camina con F.E.™',
  motto: 'Renueva tu fortaleza espiritual',
  shortBio: 'Mentor de fortaleza y liderazgo de fe. Te impulsa a superar la parálisis, ordenar tus prioridades con sabiduría de Dios y caminar con paso firme cada día.',
  specialty: 'Fortaleza espiritual, disciplina interior, propósito profesional y perseverancia diaria.',
  color: '#F59E0B',
  badgeBg: 'bg-[#F59E0B]/20',
  badgeText: 'text-[#FBBF24]',
  border: 'border-[#F59E0B]/40',
  welcomeGreeting: '«Hermano(a), bienvenido a este mapa de renovación. Durante estos 30 días caminaré contigo para forjar una fe inquebrantable, dominio propio y coraje santo. Si la prueba arrecia, nos levantamos con alas como las águilas fundamentados en la Roca.»',
};

// Generador de reflexiones y oraciones dinámicas según el guía elegido para cada uno de los 30 días
export function getMentorDailyGuidance(dayNumber: number, mentorId: 'clara_luz' | 'leo'): MentorDailyGuidance {
  if (mentorId === 'clara_luz') {
    return {
      mentorId: 'clara_luz',
      mentorName: 'Clara Luz',
      mentorTitle: 'Tu Guía de F.E.™ • Sosiego & Gracia',
      mentorMotto: '«Encuentra tu ancla de paz»',
      mentorColor: '#14B8A6',
      toneLabel: 'Ternura Maternal, Gracia & Descanso',
      avatarIcon: 'heart',
      reflectionMessage: getClaraLuzReflection(dayNumber),
      guidedPrayer: getClaraLuzPrayer(dayNumber),
      mentorChallenge: getClaraLuzChallenge(dayNumber),
    };
  } else {
    return {
      mentorId: 'leo',
      mentorName: 'Leo',
      mentorTitle: 'Camina con F.E.™ • Fortaleza & Dirección',
      mentorMotto: '«Renueva tu fortaleza espiritual»',
      mentorColor: '#F59E0B',
      toneLabel: 'Disciplina Interior, Coraje & Firmeza',
      avatarIcon: 'shield',
      reflectionMessage: getLeoReflection(dayNumber),
      guidedPrayer: getLeoPrayer(dayNumber),
      mentorChallenge: getLeoChallenge(dayNumber),
    };
  }
}

function getClaraLuzReflection(day: number): string {
  const reflections: Record<number, string> = {
    1: '«Amado(a), hoy iniciamos juntos este viaje. Quiero que respires hondo y recuerdes: tu valor no depende de tus logros ni de tu perfección, sino del amor infinito con que Cristo te redimió. Hoy no hay condenación para ti.»',
    2: '«El gozo que Dios te regala hoy no es una emoción superficial; es una corriente profunda de consuelo que no se seca cuando la tormenta arrecia. Deja que Su ternura acaricie tu mente fatigada.»',
    3: '«Cuando el insomnio o la inquietud toquen a tu puerta, no luches con tus fuerzas. Entrégale a Jesús cada preocupación como quien deposita un peso en las manos del mejor de los padres.»',
    4: '«La comunión con Dios no es un examen que debas aprobar; es una mesa donde siempre eres bienvenido(a). Descansa en saber que Él te escucha aun en tus silencios y suspiros.»',
    5: '«Dios no rompe sus promesas. Si hoy sientes que te faltan fuerzas, reclínate en Su fidelidad. No tienes que sostener el mundo; Él te sostiene a ti.»',
    6: '«La gracia es el antídoto contra el perfeccionismo que agota el alma. Perdónate por lo que no pudiste hacer hoy y regocíjate en lo que Dios ya ha hecho en tu vida.»',
    7: '«Has completado tu primera semana conmigo. Siente el latido de tu corazón en calma: Dios ha estado presente en cada segundo de tu respiración. Estás a salvo.»',
  };
  return reflections[day] || `«En este Día ${day}, recuerda que el amor de Dios sobrepasa cualquier afán. Su gracia te basta para hoy; suelta el control de mañana y permite que la serenidad del Espíritu Santo inunde cada rincón de tus pensamientos.»`;
}

function getClaraLuzPrayer(day: number): string {
  const prayers: Record<number, string> = {
    1: '«Padre celestial, tomo de la mano a mi hermano(a) en este primer día. Te entrego todo remordimiento y culpa. Envuelve su corazón en tu ternura y dale hoy el descanso que solo proviene de saberse perdonado(a) y amado(a). En el nombre de Jesús, amén.»',
    2: '«Señor de la paz, desactiva en este día la rumiación y la tristeza. Siembra un gozo sereno en su espíritu y que al acostarse hoy experimente la dulzura de tu compañía protectora. Amén.»',
    3: '«Jesús amado, calma las aguas turbulentas de sus pensamientos. Te entregamos los pendientes, las noticias difíciles y la incertidumbre. Que tu paz, que sobrepasa todo entendimiento, sea su almohada esta noche. Amén.»',
    4: '«Dios de consuelo, abre los ojos de su alma para contemplar la esperanza viva de tu gloria. Sana cualquier herida invisible y llénalo(a) de tu dulce presencia ahora mismo. Amén.»',
    5: '«Fiel Señor, gracias porque tu pacto de misericordia jamás expira. Si hoy el temor asoma, que recuerde que estás a su diestra y nunca resbalará. Amén.»',
    6: '«Padre tierno, limpia su mente de reproches internos y libéralo(a) de la carga de complacer a todos. Que hoy experimente la libertad santa de tus hijos. Amén.»',
    7: '«Gracias Señor por esta primera semana de bendición. Sella con tu Espíritu la paz sembrada en su hogar y en su interior. Amén.»',
  };
  return prayers[day] || `«Padre amoroso, junto a Clara Luz encomiendo la vida de mi hermano(a) en este Día ${day}. Cubre su mente con tu paz inquebrantable, bendice su descanso y dale la certeza de que nada puede separarlo(a) de tu amor. Amén.»`;
}

function getClaraLuzChallenge(day: number): string {
  const challenges: Record<number, string> = {
    1: 'Pon tu mano sobre el pecho, inhala suavemente en 4 segundos, exhala en 6 segundos y di: «En Cristo soy una nueva criatura; descanso en su gracia».',
    2: 'Identifica una culpa del pasado que te quitaba la paz y pronuncia en voz alta: «Jesús ya pagó por mí; hoy elijo el gozo de su salvación».',
    3: 'Esta noche, antes de dormir, toma un vaso de agua con calma, apaga las pantallas y escucha el sonido de tu respiración entregada a Dios.',
    4: 'Escribe en tu libreta o notas de gratitud 3 momentos donde sentiste el abrazo y la compasión del Señor en los últimos meses.',
    5: 'Cuando sientas taquicardia o apuro hoy, haz una pausa de 60 segundos, mira al cielo y dile al Padre: «Tú eres fiel, confío en Ti».',
    6: 'Haz un acto de gracia hacia ti mismo(a): perdónate por un error reciente y cena con alegría en familia o en serena gratitud.',
    7: 'Coloca ambas manos abiertas hacia arriba en señal de entrega y di: «Gracias Señor por cuidar de mí durante estos primeros 7 días».',
  };
  return challenges[day] || `Pausa de 2 minutos guiada por Clara Luz: Respira hondo 3 veces, bendice el lugar donde estás y declara con serenidad: «Mi alma reposa tranquila en Dios».`;
}

function getLeoReflection(day: number): string {
  const reflections: Record<number, string> = {
    1: '«¡Firmeza y adelante, mi hermano(a)! Comenzamos este plan de 30 días para forjar convicciones inconmovibles. El pasado ya no tiene jurisdicción sobre tu vida; Cristo te llamó a la libertad y a la victoria sobre la derrota mental.»',
    2: '«El verdadero gozo en Cristo no es evasión de la realidad; es la certeza del guerrero que sabe que la batalla final ya fue ganada en la Cruz. Levanta la mirada con coraje santo.»',
    3: '«La incertidumbre se disuelve ante la soberanía de Dios. Cuando el mundo tiembla, nosotros no retrocedemos: plantamos los pies sobre la Roca eterna y ordenamos nuestras prioridades con disciplina.»',
    4: '«Tenemos acceso directo al Creador del universo. No vivas con espíritu de timidez o mendicidad; camina con la dignidad de quien representa el Reino de Dios en su trabajo, familia y comunidad.»',
    5: '«Dios no es hombre para mentir. Su Palabra es espada y escudo en medio de la adversidad. Aférrate a Sus promesas y rechaza cualquier mentira del desánimo.»',
    6: '«El liderazgo espiritual empieza con el dominio propio. Hoy vence la procrastinación y la queja; enfócate en cumplir con integridad tu deber mientras Dios libra tus batallas.»',
    7: '«Primera semana conquistada. Has demostrado disciplina y fe activa. Ahora nos preparamos para avanzar hacia los cuadrantes de relaciones, familia y vocación. ¡No te detengas!»',
  };
  return reflections[day] || `«En este Día ${day}, mantén la frente en alto y la mirada fija en el Autor de la Fe. Con Dios no hay prueba insuperable ni montaña que no se rinda ante la oración perseverante. ¡Avanza con valentía!»`;
}

function getLeoPrayer(day: number): string {
  const prayers: Record<number, string> = {
    1: '«Señor Todopoderoso, como mentor Leo me pongo en la brecha por mi hermano(a). Despierta en su espíritu un espíritu de valentía y firmeza. Rompe las cadenas de la indecisión y guíalo(a) en el camino de la verdad. En el poderoso nombre de Jesús, amén.»',
    2: '«Dios de los ejércitos celestiales, llena hoy sus pulmones de vigor y convicción. Que ningún obstáculo apague su entusiasmo ni su testimonio en el hogar o el trabajo. Amén.»',
    3: '«Padre y Protector supremo, guarda sus pensamientos bajo tu soberanía. Si el enemigo intenta traer duda o confusión, levanta bandera de victoria a su favor. Amén.»',
    4: '«Señor Jesús, concédele sabiduría estratégica para liderar con integridad, hablar con prudencia y actuar con determinación guiado(a) por tu Espíritu Santo. Amén.»',
    5: '«Roca eterna, gracias por tu fidelidad comprobada a través de las generaciones. Fortalece las rodillas débiles y haz que sus pasos sean firmes y seguros hoy. Amén.»',
    6: '«Dios de orden y poder, líbralo(a) de la pereza espiritual y del desánimo. Que en cada decisión diaria refleje tu excelencia y tu carácter santo. Amén.»',
    7: '«Bendito seas Señor por los primeros 7 días de entrenamiento espiritual. Ungelo(a) con nuevo vigor para los días que vienen y protege su casa y su heredad. Amén.»',
  };
  return prayers[day] || `«Dios de gloria y poder, junto a Leo te pido que descienda sobre mi hermano(a) un espíritu de poder, de amor y de dominio propio en este Día ${day}. Dale fuerzas como las del búfalo y guíalo(a) a la victoria en Ti. Amén.»`;
}

function getLeoChallenge(day: number): string {
  const challenges: Record<number, string> = {
    1: 'Párate erguido(a), mira hacia adelante y declara con convicción: «Todo lo puedo en Cristo que me fortalece; hoy camino sin mirar atrás».',
    2: 'Elige la tarea o conversación difícil que has estado posponiendo y enfréntala hoy con la serenidad y firmeza que Dios te otorga.',
    3: 'Antes de que inicie tu jornada, planifica tus 3 prioridades del día bajo la dirección de Dios y rechaza cualquier distracción que robe tu enfoque.',
    4: 'Dedica 5 minutos a bendecir con palabras de afirmación a un miembro de tu familia o compañero de labores, ejerciendo liderazgo de fe.',
    5: 'Memoriza Hebreos 10:23 y repítelo con voz firme cada vez que el desánimo o la duda intenten asaltar tu mente hoy.',
    6: 'Haz una auditoría rápida de tus hábitos: elimina un gasto o pérdida de tiempo innecesaria y dedícasela a la oración o al servicio.',
    7: 'Agradece a Dios por la resistencia ganada esta semana y comprométete a culminar victoriosamente los 30 días de la ruta.',
  };
  return challenges[day] || `Desafío de liderazgo guiado por Leo: Define con claridad tu objetivo del día, encomiéndaselo a Dios al iniciar y no desistas hasta haberlo alcanzado con excelencia.`;
}
