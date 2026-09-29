import React, { useState, useEffect, useRef } from 'react';
import { X, Volume2, VolumeX, Play, Pause, Heart, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { JesusEnTiConfioScene, JesusSceneKey } from './JesusEnTiConfioScene';

interface JesusVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFlow?: () => void;
}

const SCENE_SEQUENCE: { key: JesusSceneKey; durationMs: number; title: string; subtitle: string; prayer: string }[] = [
  {
    key: 'campo_lavanda_juntos',
    durationMs: 3500,
    title: 'Amanecer en el Campo de Paz',
    subtitle: 'Clara Luz & Leo en la presencia de Dios',
    prayer: '«Junto a aguas de reposo me pastoreará. Confortará mi alma.» (Salmo 23)',
  },
  {
    key: 'clara_intimidad_paz',
    durationMs: 3000,
    title: 'Clara Luz • Calma y Gracia Interior',
    subtitle: 'Suelto la autoexigencia y el control',
    prayer: '«Por nada estéis afanosos; la paz de Dios guardará vuestros corazones.» (Filipenses 4)',
  },
  {
    key: 'leo_fortaleza_oracion',
    durationMs: 3000,
    title: 'Leo • Firmeza y Fortaleza Espiritual',
    subtitle: 'Renovación de fuerzas en la prueba',
    prayer: '«Los que esperan en el Señor tendrán nuevas fuerzas; levantarán alas como las águilas.» (Isaías 40)',
  },
  {
    key: 'mirada_amor_rayos',
    durationMs: 3000,
    title: 'Unión y Comunión de Fe',
    subtitle: 'El cordón de tres dobleces no se rompe',
    prayer: '«Donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.» (Mateo 18)',
  },
  {
    key: 'adoracion_altar_misericordia',
    durationMs: 4000,
    title: 'Jesús de la Divina Misericordia',
    subtitle: 'Ante el altar y el Santísimo Sacramento',
    prayer: '«Jesús, en Ti confío. De tu costado brotan sangre y agua como fuente de misericordia.»',
  },
  {
    key: 'custodia_santisimo_radiante',
    durationMs: 3500,
    title: 'La Custodia Radiante del Santísimo',
    subtitle: 'Cristo vivo en medio de tu noche',
    prayer: '«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.» (Mateo 11)',
  },
  {
    key: 'fortaleza_espiritual_final',
    durationMs: 4500,
    title: 'Fortaleza Espiritual y Esperanza',
    subtitle: 'La paz de Dios queda contigo',
    prayer: '«Jesús, en Ti confío. Jesús, en Ti confío. Jesús, en Ti confío.»',
  },
];

export const JesusVideoModal: React.FC<JesusVideoModalProps> = ({
  isOpen,
  onClose,
  onStartFlow,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [breathPhase, setBreathPhase] = useState<'inhala' | 'sosten' | 'exhala' | 'reposa'>('inhala');

  // Web Audio Context for ambient contemplative soundscape
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      stopAmbientSound();
      return;
    }

    setCurrentIdx(0);
    setIsPlaying(true);
  }, [isOpen]);

  // Scene transition timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const currentScene = SCENE_SEQUENCE[currentIdx];
    const timer = setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % SCENE_SEQUENCE.length);
    }, currentScene.durationMs);

    return () => clearTimeout(timer);
  }, [isOpen, isPlaying, currentIdx]);

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
      // Audio autoplay blocked fallback
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

  if (!isOpen) return null;

  const currentScene = SCENE_SEQUENCE[currentIdx];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[480px] sm:max-w-[540px] max-h-[95vh] rounded-[24px] bg-[#071322] border-2 border-[#F59E0B]/40 shadow-[0_0_50px_rgba(245,158,11,0.3)] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-4 flex items-center justify-between bg-gradient-to-b from-[#060F1E]/90 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6F432] animate-pulse" />
            <span className="text-[12px] font-bold uppercase tracking-wider text-[#FEF08A] drop-shadow-md">
              Jesús, en Ti Confío
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAudio}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                !isAudioMuted
                  ? 'bg-[#F59E0B] text-[#060F1E] border-[#F59E0B] shadow-md'
                  : 'bg-black/60 text-[#CBD5E1] border-white/20 hover:text-white'
              }`}
              title={!isAudioMuted ? 'Silenciar sonido' : 'Activar sonido de oración'}
            >
              {!isAudioMuted ? (
                <Volume2 className="w-4 h-4 animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
              title={isPlaying ? 'Pausar animación' : 'Reanudar'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-black/60 border border-white/20 text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Area */}
        <div className="relative w-full aspect-[9/12] sm:aspect-[9/13] bg-[#0A1624] overflow-hidden flex items-center justify-center">
          <JesusEnTiConfioScene sceneKey={currentScene.key} className="transition-opacity duration-700" />

          {/* Gentle vignette / dark bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-black/30 pointer-events-none" />

          {/* Breathing Guide Overlay (Sync with Scene) */}
          <div className="absolute top-16 left-0 right-0 z-20 flex justify-center pointer-events-none">
            <div className="px-4 py-1.5 rounded-full bg-[#060F1E]/80 backdrop-blur-md border border-[#F59E0B]/30 flex items-center gap-2 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[12px] font-bold text-[#F1F5F9] uppercase tracking-wider">
                {breathPhase === 'inhala' && 'Inhala la paz de Dios (4s)'}
                {breathPhase === 'sosten' && 'Sostén y confía (7s)'}
                {breathPhase === 'exhala' && 'Exhala todo temor (8s)'}
                {breathPhase === 'reposa' && 'Descansa en Su amor'}
              </span>
            </div>
          </div>
        </div>

        {/* Scene Details & Liturgical Prayer Caption */}
        <div className="p-4 sm:p-5 bg-[#071322] space-y-3 border-t border-white/[0.08]">
          <div className="flex items-center justify-between text-[11px] text-[#F59E0B] font-semibold">
            <span>{currentScene.title}</span>
            <span className="tabular-nums">
              {currentIdx + 1} de {SCENE_SEQUENCE.length}
            </span>
          </div>

          <p className="font-editorial text-[14px] sm:text-[15px] italic text-[#FEF08A] leading-relaxed">
            {currentScene.prayer}
          </p>

          {/* Progress Timeline Dots */}
          <div className="flex items-center gap-1.5 py-1">
            {SCENE_SEQUENCE.map((s, idx) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setCurrentIdx(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIdx === idx
                    ? 'w-7 bg-[#C6F432]'
                    : 'w-2 bg-white/20 hover:bg-white/40'
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
              <span>Entrar al Santuario de Paz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
