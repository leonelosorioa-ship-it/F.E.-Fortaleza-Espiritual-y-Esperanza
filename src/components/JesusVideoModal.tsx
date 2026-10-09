import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Sparkles,
  Compass,
  ShieldCheck,
  Film,
  Music,
  Maximize2,
  Minimize2,
  ListVideo,
  ChevronRight,
} from 'lucide-react';
import { JesusEnTiConfioScene, JesusSceneKey } from './JesusEnTiConfioScene';

export interface SpiritualVideoTrack {
  id: string;
  title: string;
  subtitle: string;
  theme: string;
  durationLabel: string;
  badgeColor: string;
  scenes: {
    key: JesusSceneKey;
    durationMs: number;
    title: string;
    subtitle: string;
    prayer: string;
  }[];
}

export const SPIRITUAL_VIDEO_PLAYLIST: SpiritualVideoTrack[] = [
  {
    id: 'short_taquicardia',
    title: 'De la Taquicardia a la Serenidad',
    subtitle: 'Short 9:16 • Transición Rápida del Pánico a la Paz',
    theme: 'Short 9:16 (35s) • Rescate Agudo',
    durationLabel: '35 seg',
    badgeColor: 'border-rose-500/40 text-rose-300 bg-rose-500/10',
    scenes: [
      {
        key: 'leo_fortaleza_oracion',
        durationMs: 8000,
        title: 'Fase 1: Reconoce el pánico sin juzgarte',
        subtitle: 'Tu corazón late rápido porque busca auxilio, no porque te falte fe',
        prayer: '«Padre, mi pecho arde y mi mente se agita. No peleo con mis fuerzas, me detengo.»',
      },
      {
        key: 'adoracion_altar_misericordia',
        durationMs: 9000,
        title: 'Fase 2: Respiración 4×4 ante el Altar',
        subtitle: 'Inhala en 4 segundos... exhala en 4 segundos...',
        prayer: '«Jesús, en Ti confío. Apago la alarma de mi mente. Tú sostienes mis latidos.»',
      },
      {
        key: 'mirada_amor_rayos',
        durationMs: 9000,
        title: 'Fase 3: La mirada que no condena',
        subtitle: 'No hay juicio en los ojos de Cristo para ti',
        prayer: '«Ninguna condenación hay para quienes reposan en Él. Tu cuerpo se aquieta.»',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 9000,
        title: 'Fase 4: Paz serena instaurada',
        subtitle: 'La tormenta pasa; Dios permanece',
        prayer: '«La paz de Dios que sobrepasa todo entendimiento guarda mi corazón. Amén.»',
      },
    ],
  },
  {
    id: 'short_mente_2am',
    title: 'Cuando la Mente no Apaga a las 2 AM',
    subtitle: 'Short 9:16 • Alivio Inmediato del Insomnio',
    theme: 'Short 9:16 (35s) • Rumiación Nocturna',
    durationLabel: '35 seg',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    scenes: [
      {
        key: 'clara_intimidad_paz',
        durationMs: 9000,
        title: 'Fase 1: Suelta los pendientes de mañana',
        subtitle: 'La noche no es para resolver, es para confiar',
        prayer: '«Señor, lo que no resolví hoy lo pongo en tus manos. Tú no duermes cuidando mi casa.»',
      },
      {
        key: 'custodia_santisimo_radiante',
        durationMs: 9000,
        title: 'Fase 2: Presencia Viva en el Silencio',
        subtitle: 'Tu habitación es un santuario protegido',
        prayer: '««En paz me acostaré, y asimismo dormiré; porque solo Tú me haces vivir confiado.» (Salmo 4:8)»',
      },
      {
        key: 'mirada_amor_rayos',
        durationMs: 9000,
        title: 'Fase 3: Rayos de Gracia sobre tu Almohada',
        subtitle: 'Respira hondo y entrega el volante',
        prayer: '«Descanso en tu regazo. Mañana traerá su propio afán; esta noche es de Dios.»',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 8000,
        title: 'Fase 4: Sueño Reparador en Dios',
        subtitle: 'Cierra los ojos con la certeza de Su amor',
        prayer: '«Jesús, en Ti confío. Jesús, en Ti confío. Dulce y santo descanso.»',
      },
    ],
  },
  {
    id: 'short_ansiedad_fe',
    title: '«Sentir Ansiedad no es Falta de Fe»',
    subtitle: 'Short 9:16 • Disolver la Culpa Religiosa',
    theme: 'Short 9:16 (40s) • Gracia sin Culpa',
    durationLabel: '40 seg',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    scenes: [
      {
        key: 'campo_lavanda_juntos',
        durationMs: 10000,
        title: 'Tu fe y tu mente caminan juntas',
        subtitle: 'Tener taquicardia o cansancio no es pecado; es humanidad',
        prayer: '«Jesús mismo sintió angustia en Getsemaní. Tu dolor no te aleja de Dios, te acerca a Su gracia.»',
      },
      {
        key: 'adoracion_altar_misericordia',
        durationMs: 10000,
        title: 'El bálsamo de la Gracia Incondicional',
        subtitle: 'Dios no te pide fingir sonrisas cuando estás roto/a',
        prayer: '««Cercano está el Señor a los quebrantados de corazón, y salva a los contritos de espíritu.» (Salmo 34:18)»',
      },
      {
        key: 'clara_intimidad_paz',
        durationMs: 10000,
        title: 'Entrega de la autoexigencia tóxica',
        subtitle: 'No tienes que salvar al mundo; Dios ya lo salvó',
        prayer: '«Suelto la necesidad de controlarlo todo. Me dejo amar y sostener por mi Creador.»',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 10000,
        title: 'Paz que renueva tus días',
        subtitle: 'Caminas en fe, cuidado y compasión',
        prayer: '«Mi corazón descansa seguro. Mi fe y mi salud mental florecen unidas en Dios.»',
      },
    ],
  },
  {
    id: 'misericordia',
    title: 'Jesús de la Divina Misericordia',
    subtitle: 'Rayos de Gracia, Custodia & Entrega Total',
    theme: 'Misericordia & Redención',
    durationLabel: '3:45 min',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    scenes: [
      {
        key: 'adoracion_altar_misericordia',
        durationMs: 4000,
        title: 'Jesús de la Divina Misericordia',
        subtitle: 'Ante el altar y el Santísimo Sacramento',
        prayer: '«Jesús, en Ti confío. De tu costado brotan sangre y agua como fuente de misericordia inagotable.»',
      },
      {
        key: 'custodia_santisimo_radiante',
        durationMs: 3800,
        title: 'La Custodia Radiante del Santísimo',
        subtitle: 'Cristo vivo en medio de tu noche',
        prayer: '«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.» (Mateo 11:28)',
      },
      {
        key: 'mirada_amor_rayos',
        durationMs: 3400,
        title: 'Mirada de Amor y Compasión',
        subtitle: 'En sus ojos no hay juicio ni condenación',
        prayer: '«Nadie te condena; ni yo te condeno. Vete en paz y descansa en mi misericordia.»',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 4500,
        title: 'Fortaleza Espiritual y Esperanza',
        subtitle: 'La paz de Dios queda contigo hoy y siempre',
        prayer: '«Jesús, en Ti confío. Jesús, en Ti confío. En tus manos encomiendo mi descanso.»',
      },
    ],
  },
  {
    id: 'aguas_reposo',
    title: 'Amanecer en Aguas de Reposo (Salmo 23)',
    subtitle: 'Quietud, Alivio y Restauración del Alma',
    theme: 'Paz Interior & Sistema Nervioso',
    durationLabel: '3:20 min',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    scenes: [
      {
        key: 'campo_lavanda_juntos',
        durationMs: 3800,
        title: 'Amanecer en el Campo de Paz',
        subtitle: 'Clara Luz & Leo en la presencia de Dios',
        prayer: '«Junto a aguas de reposo me pastoreará. Confortará mi alma; me guiará por sendas de justicia.» (Salmo 23:2-3)',
      },
      {
        key: 'clara_intimidad_paz',
        durationMs: 3500,
        title: 'Clara Luz • Calma y Gracia Interior',
        subtitle: 'Suelto la autoexigencia y el control',
        prayer: '«Por nada estéis afanosos; la paz de Dios que sobrepasa todo entendimiento guardará vuestros corazones.» (Filipenses 4:7)',
      },
      {
        key: 'mirada_amor_rayos',
        durationMs: 3200,
        title: 'Comunión y Esperanza en Dios',
        subtitle: 'El cordón de tres dobleces no se rompe fácilmente',
        prayer: '«Donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.» (Mateo 18:20)',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 4000,
        title: 'Descanso Santo al Final del Día',
        subtitle: 'Tu respiración se aquieta en Su amor',
        prayer: '«En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado.» (Salmo 4:8)',
      },
    ],
  },
  {
    id: 'fortaleza_oracion',
    title: 'Fortaleza en la Prueba & Renovación',
    subtitle: 'Nuevas Fuerzas para el Creyente Abrumado',
    theme: 'Coraje & Esperanza',
    durationLabel: '3:30 min',
    badgeColor: 'border-sky-500/40 text-sky-300 bg-sky-500/10',
    scenes: [
      {
        key: 'leo_fortaleza_oracion',
        durationMs: 3800,
        title: 'Leo • Firmeza y Oración Ferviente',
        subtitle: 'Renovación de fuerzas en la tormenta',
        prayer: '«Los que esperan en el Señor tendrán nuevas fuerzas; levantarán alas como las águilas; correrán y no se cansarán.» (Isaías 40:31)',
      },
      {
        key: 'custodia_santisimo_radiante',
        durationMs: 3500,
        title: 'Luz Inextinguible en la Noche',
        subtitle: 'Tu socorro viene del Creador de los cielos',
        prayer: '«El Señor es tu guardador; el Señor es tu sombra a tu mano derecha. De noche el sol no te fatigará.» (Salmo 121:5)',
      },
      {
        key: 'adoracion_altar_misericordia',
        durationMs: 3800,
        title: 'Consagración al Sagrado Corazón',
        subtitle: 'Todo lo puedo en Cristo que me fortalece',
        prayer: '«Bástate mi gracia; porque mi poder se perfecciona en la debilidad.» (2 Corintios 12:9)',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 4200,
        title: 'Victoria y Paz Inconmovible',
        subtitle: 'Ninguna aflicción te apartará de Su amor',
        prayer: '«Si Dios es por nosotros, ¿quién contra nosotros? Jesús, en Ti confío victoriosamente.» (Romanos 8:31)',
      },
    ],
  },
  {
    id: 'altar_familiar',
    title: 'El Altar del Hogar & Bendición Familiar',
    subtitle: 'Protección para Padres, Hijos y Matrimonios',
    theme: 'Familia & Alianza',
    durationLabel: '3:15 min',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    scenes: [
      {
        key: 'campo_lavanda_juntos',
        durationMs: 3500,
        title: 'Alianza de Amor en el Hogar',
        subtitle: 'Unidos en un mismo espíritu de gratitud',
        prayer: '«Pero yo y mi casa serviremos al Señor con alegría y fidelidad perpetua.» (Josué 24:15)',
      },
      {
        key: 'clara_intimidad_paz',
        durationMs: 3200,
        title: 'Ternura Maternal y Paz Conyugal',
        subtitle: 'El perdón y la paciencia florecen en casa',
        prayer: '«El amor es paciente, es bondadoso; no guarda rencor, todo lo sufre, todo lo cree, todo lo espera.» (1 Corintios 13:4-7)',
      },
      {
        key: 'adoracion_altar_misericordia',
        durationMs: 3800,
        title: 'El Manto de Protección sobre tus Hijos',
        subtitle: 'Ángeles acampan alrededor de tu morada',
        prayer: '«Pues a sus ángeles mandará acerca de ti, que te guarden en todos tus caminos.» (Salmo 91:11)',
      },
      {
        key: 'fortaleza_espiritual_final',
        durationMs: 4200,
        title: 'Paz Profunda en el Santuario Familiar',
        subtitle: 'Dormir con la certeza de que Dios cuida a los tuyos',
        prayer: '«La bendición del Señor enriquecerá tu casa, y no añadirá tristeza con ella.» (Proverbios 10:22)',
      },
    ],
  },
];

interface JesusVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFlow?: () => void;
  initialVideoId?: string;
}

export const JesusVideoModal: React.FC<JesusVideoModalProps> = ({
  isOpen,
  onClose,
  onStartFlow,
  initialVideoId = 'misericordia',
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(initialVideoId);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhala' | 'sosten' | 'exhala' | 'reposa'>('inhala');

  // Web Audio Context for ambient contemplative soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Active track
  const currentVideo = SPIRITUAL_VIDEO_PLAYLIST.find((v) => v.id === selectedVideoId) || SPIRITUAL_VIDEO_PLAYLIST[0];
  const scenes = currentVideo.scenes;

  useEffect(() => {
    if (initialVideoId) {
      setSelectedVideoId(initialVideoId);
      setCurrentIdx(0);
    }
  }, [initialVideoId]);

  useEffect(() => {
    if (!isOpen) {
      stopAmbientSound();
      return;
    }

    setCurrentIdx(0);
    setIsPlaying(true);
  }, [isOpen, selectedVideoId]);

  // Scene transition timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const currentScene = scenes[currentIdx];
    if (!currentScene) return;

    const timer = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % scenes.length);
    }, currentScene.durationMs);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentIdx, scenes]);

  // Breathing loop synchronized with the video
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setBreathPhase((prev) => {
        if (prev === 'inhala') return 'sosten';
        if (prev === 'sosten') return 'exhala';
        if (prev === 'exhala') return 'reposa';
        return 'inhala';
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Web Audio ambient soundscape (warm meditative sine drone with soft singing bowl chime)
  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 3);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Deep root warm drone (C3: 130.81Hz & G3: 196Hz)
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(130.81, ctx.currentTime);

      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(196.00, ctx.currentTime);

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.5;

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(masterGain);

      osc1.start();
      osc2.start();

      // Periodic soft chime
      oscillatorIntervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== 'running') return;
        const chime = audioCtxRef.current.createOscillator();
        const chimeGain = audioCtxRef.current.createGain();
        chime.type = 'sine';
        chime.frequency.setValueAtTime(523.25, audioCtxRef.current.currentTime); // C5
        chimeGain.gain.setValueAtTime(0.15, audioCtxRef.current.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 3.5);
        chime.connect(chimeGain);
        chimeGain.connect(masterGain);
        chime.start();
        chime.stop(audioCtxRef.current.currentTime + 3.5);
      }, 7000);

      setIsAudioMuted(false);
    } catch {
      setIsAudioMuted(true);
    }
  };

  const stopAmbientSound = () => {
    if (oscillatorIntervalRef.current) {
      clearInterval(oscillatorIntervalRef.current);
      oscillatorIntervalRef.current = null;
    }
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch {
        // Safe close
      }
      audioCtxRef.current = null;
    }
    setIsAudioMuted(true);
  };

  const toggleAudio = () => {
    if (isAudioMuted) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  };

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
    setCurrentIdx(0);
    setShowPlaylistMenu(false);
  };

  if (!isOpen) return null;

  const currentScene = scenes[currentIdx] || scenes[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/92 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[560px] max-h-[96vh] rounded-[24px] bg-[#071322] border-2 border-[#F59E0B]/40 shadow-[0_0_60px_rgba(245,158,11,0.35)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-[#060F1E]/95 via-[#060F1E]/75 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F432] animate-pulse" />
            <button
              type="button"
              onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
              className="text-[11.5px] sm:text-[12.5px] font-bold uppercase tracking-wider text-[#FEF08A] drop-shadow-md hover:text-[#C6F432] flex items-center gap-1.5 cursor-pointer"
              title="Cambiar video o meditación"
            >
              <span>{currentVideo.title}</span>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showPlaylistMenu ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Playlist Menu Button */}
            <button
              type="button"
              onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                showPlaylistMenu
                  ? 'bg-amber-500 text-[#060F1E] border-amber-400'
                  : 'bg-black/60 text-[#CBD5E1] border-white/20 hover:text-white'
              }`}
              title="Catálogo de Videos Espirituales"
              aria-label="Catálogo de videos espirituales"
            >
              <ListVideo className="w-4 h-4" />
            </button>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                !isAudioMuted
                  ? 'bg-[#F59E0B] text-[#060F1E] border-[#F59E0B] shadow-md'
                  : 'bg-black/60 text-[#CBD5E1] border-white/20 hover:text-white'
              }`}
              title={!isAudioMuted ? 'Silenciar sonido de meditación' : 'Activar sonido de oración ambiental'}
              aria-label={!isAudioMuted ? 'Silenciar sonido' : 'Activar sonido'}
            >
              {!isAudioMuted ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar video' : 'Reanudar video'}
              aria-label={isPlaying ? 'Pausar video' : 'Reanudar video'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar reproductor"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Playlist Drawer Overlay */}
        {showPlaylistMenu && (
          <div className="absolute top-14 left-0 right-0 z-40 p-4 bg-[#06121E]/95 backdrop-blur-md border-b border-white/10 max-h-[70%] overflow-y-auto space-y-2 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] uppercase tracking-wider text-amber-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5" />
                <span>Colección de Videos & Meditaciones de Fe</span>
              </span>
              <span>{SPIRITUAL_VIDEO_PLAYLIST.length} Videos</span>
            </div>

            <div className="space-y-1.5">
              {SPIRITUAL_VIDEO_PLAYLIST.map((video) => {
                const isCurrent = video.id === selectedVideoId;
                return (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() => handleSelectVideo(video.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-400/60 shadow-md'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-white/20'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[12.5px] font-semibold text-[#F1F5F9]">
                          {video.title}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-medium ${video.badgeColor}`}>
                          {video.theme}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#94A3B8]">{video.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10.5px] text-[#CBD5E1] tabular-nums">{video.durationLabel}</span>
                      {isCurrent ? (
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-[#06121E] flex items-center justify-center font-bold text-[10px]">
                          ▶
                        </span>
                      ) : (
                        <Play className="w-4 h-4 text-white/50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Video Canvas Area */}
        <div className="relative w-full aspect-[9/12] sm:aspect-[9/13] bg-[#0A1624] overflow-hidden flex items-center justify-center">
          <JesusEnTiConfioScene sceneKey={currentScene.key} className="transition-opacity duration-700" />

          {/* Gentle vignette / dark bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/30 pointer-events-none" />

          {/* Breathing Guide Overlay (Sync with Scene) */}
          <div className="absolute top-16 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-[#060F1E]/80 backdrop-blur-md border border-[#F59E0B]/30 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[11.5px] sm:text-[12px] font-bold text-[#F1F5F9] uppercase tracking-wider">
                {breathPhase === 'inhala' && 'Inhala la paz de Dios (4s)'}
                {breathPhase === 'sosten' && 'Sostén y confía (7s)'}
                {breathPhase === 'exhala' && 'Exhala todo afán (8s)'}
                {breathPhase === 'reposa' && 'Descansa en Su presencia'}
              </span>
            </div>
          </div>
        </div>

        {/* Scene Details & Liturgical Prayer Caption */}
        <div className="p-4 sm:p-5 bg-[#071322] space-y-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] text-[#F59E0B] font-semibold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentScene.title}</span>
            </span>
            <span className="tabular-nums">
              Escena {currentIdx + 1} de {scenes.length}
            </span>
          </div>

          <p className="font-editorial text-[14px] sm:text-[15.5px] italic text-[#FEF08A] leading-relaxed">
            {currentScene.prayer}
          </p>

          {/* Progress Timeline Dots */}
          <div className="flex items-center gap-1.5 py-1">
            {scenes.map((s, idx) => (
              <button
                key={`${s.key}-${idx}`}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIdx === idx
                    ? 'w-8 bg-[#C6F432]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {/* Action Row */}
          <div className="pt-1 flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onStartFlow) onStartFlow();
              }}
              className="flex-1 min-h-[46px] px-5 py-2.5 rounded-full bg-[#C6F432] hover:bg-[#D9F95C] text-[#061A0E] font-bold text-[14px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,244,50,0.3)]"
            >
              <span>Entrar al Santuario de Oración</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

