import { DailyPromiseData, NotificationScheduleConfig, ReminderItemConfig } from '../types';

export const DAILY_PROMISES_LIST: DailyPromiseData[] = [
  {
    id: 'promesa_1',
    theme: 'Fortaleza y Compañía Divina',
    verse: '«No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.»',
    reference: 'Isaías 41:10',
    reflection: 'Dios no te promete la ausencia de tormentas, sino su presencia inquebrantable en medio de ellas. Hoy no caminas en tus propias fuerzas; su diestra sostiene tus pasos.',
    prayer: 'Padre celestial, desecho hoy el temor y me rindo ante tu presencia protectora. Gracias por ser mi fuerza viva.',
    quadrant: 'alma',
  },
  {
    id: 'promesa_2',
    theme: 'Paz que Sobrepasa el Entendimiento',
    verse: '«Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias. Y la paz de Dios, que sobrepasa todo entendimiento, guardará vuestros corazones y vuestros pensamientos en Cristo Jesús.»',
    reference: 'Filipenses 4:6-7',
    reflection: 'La paz de Dios no es una emoción pasajera; es un centinela espiritual que custodia tu mente de los pensamientos de ansiedad y catástrofe.',
    prayer: 'Señor Jesús, te entrego cada preocupación que pesa sobre mis hombros. Que tu paz gobierne mis pensamientos hoy.',
    quadrant: 'mente',
  },
  {
    id: 'promesa_3',
    theme: 'Reposo para los Agobiados',
    verse: '«Vengan a mí todos ustedes que están cansados y agobiados, y yo les daré descanso. Lleven mi yugo sobre ustedes y aprendan de mí, que soy manso y humilde de corazón, y hallarán descanso para sus almas.»',
    reference: 'Mateo 11:28-29',
    reflection: 'El Creador del universo te extiende una invitación íntima al descanso. No tienes que fingir fortaleza cuando estás exhausto; en sus brazos encuentras reposo genuino.',
    prayer: 'Jesús, vengo a ti con mi cansancio físico y mental. En ti descansa mi espíritu hoy.',
    quadrant: 'cuerpo',
  },
  {
    id: 'promesa_4',
    theme: 'Planes de Bienestar y Porvenir',
    verse: '«Porque yo sé muy bien los planes que tengo para ustedes —afirma el Señor—, planes de bienestar y no de calamidad, a fin de darles un futuro y una esperanza.»',
    reference: 'Jeremías 29:11',
    reflection: 'Tu porvenir no depende del azar ni de los errores del pasado. El Señor ha diseñado un camino de esperanza y propósito para ti y para tu casa.',
    prayer: 'Dios eterno, descanso en que tus planes para mi vida son de bendición y vida abundante. Confío en tus tiempos perfectos.',
    quadrant: 'proposito',
  },
  {
    id: 'promesa_5',
    theme: 'La Paz que el Mundo no Conoce',
    verse: '«La paz les dejo, mi paz les doy; yo no se la doy como el mundo la da. No se turbe su corazón, ni tenga miedo.»',
    reference: 'Juan 14:27',
    reflection: 'La paz terrenal depende de circunstancias favorables, pero la paz de Cristo florece aún en medio del dolor y la incertidumbre. Es un regalo divino inamovible.',
    prayer: 'Príncipe de Paz, llena mi hogar y mi corazón de tu sosiego celestial. Ninguna turbación vencerá tu promesa.',
    quadrant: 'alma',
  },
  {
    id: 'promesa_6',
    theme: 'El Señor es mi Pastor y Cuidador',
    verse: '«El Señor es mi pastor, nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará. Confortará mi alma.»',
    reference: 'Salmo 23:1-3',
    reflection: 'Bajo el cayado del Buen Pastor, no hay carencia espiritual ni abandono. Él sabe exactamente cuándo necesitas detenerte, beber de sus aguas y renovar tu alma.',
    prayer: 'Señor, gracias por guiarme con ternura y proveer lo que necesito para cada jornada. Eres mi refugio.',
    quadrant: 'alma',
  },
  {
    id: 'promesa_7',
    theme: 'Refugio Inconmovible en la Angustia',
    verse: '«Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones. Por tanto, no temeremos, aunque la tierra sea removida.»',
    reference: 'Salmo 46:1-2',
    reflection: 'Cuando los cimientos a tu alrededor parecen tambalearse, la roca eterna sobre la que estás edificado permanece firme. Dios es tu escudo impenetrable.',
    prayer: 'Padre Dios, eres mi refugio y mi protector. En tus manos deposito a mi familia y mi bienestar.',
    quadrant: 'cuerpo',
  },
  {
    id: 'promesa_8',
    theme: 'Fiel es Quien Hizo la Promesa',
    verse: '«Mantengamos firme la esperanza que profesamos, porque fiel es el que hizo la promesa.»',
    reference: 'Hebreos 10:23',
    reflection: 'La fidelidad de Dios no cambia con las estaciones ni con nuestros altibajos emocionales. Lo que Él prometió para tu vida se cumplirá con precisión divina.',
    prayer: 'Dios fiel, afirmo hoy mi fe en tus promesas que jamás envejecen ni fallan.',
    quadrant: 'mente',
  },
  {
    id: 'promesa_9',
    theme: 'Cuidado Absoluto en la Ansiedad',
    verse: '«Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.»',
    reference: '1 Pedro 5:7',
    reflection: 'Depositar tu ansiedad no es resignación; es un acto sagrado de confianza. El Padre celestial cuida de cada latido, cada suspiro y cada detalle de tu existencia.',
    prayer: 'Jesús misericordioso, en tus llagas y en tu amor derramo mis cargas. En ti confío.',
    quadrant: 'alma',
  },
  {
    id: 'promesa_10',
    theme: 'Luz y Salvación en el Camino',
    verse: '«El Señor es mi luz y mi salvación; ¿de quién temeré? El Señor es la fortaleza de mi vida; ¿de quién he de atemorizarme?»',
    reference: 'Salmo 27:1',
    reflection: 'Donde la luz de Dios resplandece, las sombras de la duda y la soledad son disipadas. Eres portador de una victoria que nada en este mundo te puede arrebatar.',
    prayer: 'Señor, alumbra mi camino hoy y disipa todo pensamiento de desaliento con la verdad de tu Evangelio.',
    quadrant: 'proposito',
  },
];

const SETTINGS_STORAGE_KEY = 'fe_notification_settings';

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationScheduleConfig = {
  soundEnabled: true,
  gratitude: {
    enabled: true,
    time: '21:00',
    title: '🌿 Momento de Agradecer • Diario de Gratitud',
    body: 'Tómate 2 minutos antes de descansar: escribe 3 bendiciones que Dios puso hoy en tu jornada.',
  },
  dailyPromise: {
    enabled: true,
    time: '08:00',
    title: '☀️ Tu Promesa del Día • F.E. Fortaleza Espiritual',
    body: '«No temas, porque yo estoy contigo...» Comienza tu día anclado en la paz y el poder de Dios.',
  },
};

/**
 * Check if the browser environment supports the Web Notification API
 */
export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

/**
 * Retrieve current Web Notification permission state
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  return Notification.permission;
}

/**
 * Request permission from the user to display notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission | 'unsupported'> {
  if (!isNotificationSupported()) {
    return 'unsupported';
  }
  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return Notification.permission;
  }
}

/**
 * Load notification settings from localStorage with fallback to defaults
 */
export function loadNotificationSettings(): NotificationScheduleConfig {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_SETTINGS;
  try {
    const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        soundEnabled: parsed.soundEnabled ?? DEFAULT_NOTIFICATION_SETTINGS.soundEnabled,
        gratitude: {
          ...DEFAULT_NOTIFICATION_SETTINGS.gratitude,
          ...(parsed.gratitude || {}),
        },
        dailyPromise: {
          ...DEFAULT_NOTIFICATION_SETTINGS.dailyPromise,
          ...(parsed.dailyPromise || {}),
        },
      };
    }
  } catch (error) {
    console.warn('Could not read notification settings from localStorage:', error);
  }
  return DEFAULT_NOTIFICATION_SETTINGS;
}

/**
 * Save notification schedule configuration to localStorage
 */
export function saveNotificationSettings(config: NotificationScheduleConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.warn('Could not save notification settings to localStorage:', error);
  }
}

/**
 * Play a gentle, soothing sacred chime using the Web Audio API
 */
export function playGentleChime(): void {
  try {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;

    const ctx = new AudioCtxClass();
    const now = ctx.currentTime;

    // Harmonic peaceful chord progression (C5 -> E5 -> G5 -> C6)
    const notes = [
      { freq: 523.25, startOffset: 0, duration: 1.6 },   // C5
      { freq: 659.25, startOffset: 0.08, duration: 1.5 }, // E5
      { freq: 783.99, startOffset: 0.16, duration: 1.8 }, // G5
      { freq: 1046.50, startOffset: 0.24, duration: 2.2 }, // C6
    ];

    notes.forEach(({ freq, startOffset, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + startOffset);

      gain.gain.setValueAtTime(0.0001, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.05, now + startOffset + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + startOffset + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration + 0.1);
    });
  } catch (e) {
    // Gracefully ignore audio errors (e.g. browser autoplay restrictions)
  }
}

/**
 * Get today's daily promise based on the day of the year
 */
export function getTodayDailyPromise(): DailyPromiseData {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  const index = Math.abs(dayOfYear) % DAILY_PROMISES_LIST.length;
  return DAILY_PROMISES_LIST[index] || DAILY_PROMISES_LIST[0];
}

/**
 * Trigger an immediate Web Notification
 */
export function triggerWebNotification(
  title: string,
  options: {
    body: string;
    tag?: string;
    onClick?: () => void;
    playSound?: boolean;
  }
): Notification | null {
  if (!isNotificationSupported()) return null;
  if (Notification.permission !== 'granted') return null;

  if (options.playSound) {
    playGentleChime();
  }

  try {
    const notification = new Notification(title, {
      body: options.body,
      tag: options.tag || 'fe-fortaleza-recordatorio',
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      silent: true, // We provide our own peaceful chime
    });

    if (options.onClick) {
      notification.onclick = () => {
        try {
          window.focus();
        } catch {
          // Ignore
        }
        options.onClick?.();
        notification.close();
      };
    }

    return notification;
  } catch (error) {
    console.error('Failed to create Notification:', error);
    return null;
  }
}

/**
 * Check if a reminder should fire at the current time and execute
 */
export function checkAndFireScheduledReminders(
  callbacks: {
    onOpenGratitude?: () => void;
    onOpenDailyPromise?: (promise: DailyPromiseData) => void;
  }
): { firedGratitude: boolean; firedPromise: boolean } {
  if (!isNotificationSupported() || Notification.permission !== 'granted') {
    return { firedGratitude: false, firedPromise: false };
  }

  const settings = loadNotificationSettings();
  const now = new Date();
  const todayDateStr = now.toISOString().slice(0, 10); // "YYYY-MM-DD"
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeStr = `${currentHours}:${currentMinutes}`;

  let firedGratitude = false;
  let firedPromise = false;
  let settingsChanged = false;

  // 1. Check Gratitude reminder
  if (settings.gratitude.enabled) {
    const isDue = settings.gratitude.time === currentTimeStr;
    const alreadyFiredToday = settings.gratitude.lastFiredDate === todayDateStr;

    if (isDue && !alreadyFiredToday) {
      triggerWebNotification(settings.gratitude.title, {
        body: settings.gratitude.body,
        tag: 'fe-gratitud-diaria',
        playSound: settings.soundEnabled,
        onClick: () => {
          callbacks.onOpenGratitude?.();
        },
      });

      settings.gratitude.lastFiredDate = todayDateStr;
      firedGratitude = true;
      settingsChanged = true;
    }
  }

  // 2. Check Daily Promise reminder
  if (settings.dailyPromise.enabled) {
    const isDue = settings.dailyPromise.time === currentTimeStr;
    const alreadyFiredToday = settings.dailyPromise.lastFiredDate === todayDateStr;

    if (isDue && !alreadyFiredToday) {
      const todayPromise = getTodayDailyPromise();
      const bodyText = `${todayPromise.verse} (${todayPromise.reference})`;

      triggerWebNotification(settings.dailyPromise.title, {
        body: bodyText,
        tag: 'fe-promesa-diaria',
        playSound: settings.soundEnabled,
        onClick: () => {
          callbacks.onOpenDailyPromise?.(todayPromise);
        },
      });

      settings.dailyPromise.lastFiredDate = todayDateStr;
      firedPromise = true;
      settingsChanged = true;
    }
  }

  if (settingsChanged) {
    saveNotificationSettings(settings);
  }

  return { firedGratitude, firedPromise };
}
