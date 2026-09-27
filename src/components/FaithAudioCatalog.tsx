import React, { useState } from 'react';
import { FAITH_AUDIO_SESSIONS } from '../data/anchors';
import { AudioFaithSession } from '../types';
import { Volume2, Play, Pause, Waves, Sparkles, Moon, Clock, Lock } from 'lucide-react';

interface FaithAudioCatalogProps {
  onOpenPlanDetails?: () => void;
}

export const FaithAudioCatalog: React.FC<FaithAudioCatalogProps> = ({ onOpenPlanDetails }) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string, isFreePreview: boolean = true) => {
    if (!isFreePreview && onOpenPlanDetails) {
      onOpenPlanDetails();
      return;
    }
    setPlayingId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[20px] p-6 sm:p-9 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <Volume2 className="w-5 h-5 text-[#6366F1]" strokeWidth={2} />
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0B1E36]">
            Audios de Fe y Paisajes Sonoros Devocionales
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase px-3 py-0.5 rounded-full bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
          Inducción al sueño y sosiego
        </span>
      </div>

      <div>
        <h3 className="font-serif text-[22px] sm:text-[26px] text-[#0B1E36] font-normal mb-1">
          Narraciones reposadas y frecuencias de descanso en Dios
        </h3>
        <p className="text-[14px] text-[#475569] leading-relaxed">
          Lectura envolvente de las promesas de la Escritura acompañadas de texturas de sonido orgánicas (lluvia suave, arroyos serenos y frecuencias de reposo). Las sesiones introductorias son libres; las vigilias extendidas forman parte de la suscripción mensual de 30 días ($4.99/mes).
        </p>
      </div>

      <div className="space-y-4">
        {FAITH_AUDIO_SESSIONS.map((session) => {
          const isPlaying = playingId === session.id;
          const isFree = session.isFreePreview !== false;

          return (
            <div
              key={session.id}
              className={`p-5 rounded-[14px] border transition-all ${
                isPlaying
                  ? 'bg-[#FEF3C7]/40 border-[#F59E0B] shadow-xs'
                  : 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-[#F59E0B]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] font-bold tracking-wider uppercase text-[#D97706]">
                      {session.scriptureTheme}
                    </span>
                    {!isFree && (
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Plan 30 Días
                      </span>
                    )}
                  </div>
                  <h4 className="font-serif text-[18px] text-[#0B1E36] font-normal">
                    {session.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => togglePlay(session.id, isFree)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm ${
                    isPlaying
                      ? 'bg-[#F59E0B] text-[#060F1E]'
                      : isFree
                      ? 'bg-[#060F1E] hover:bg-[#0B1E36] text-white border border-[#F59E0B]/40'
                      : 'bg-[#F59E0B] hover:brightness-110 text-[#060F1E]'
                  }`}
                  aria-label={isPlaying ? 'Pausar sesión' : 'Reproducir sesión'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : !isFree ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  )}
                </button>
              </div>

              <p className="text-[13px] text-[#475569] leading-relaxed mb-3">
                {session.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[12px] text-[#334155] pt-2 border-t border-[#E2E8F0]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{session.durationMinutes}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Moon className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>{session.narrator}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Waves className="w-3.5 h-3.5 text-[#0D9488]" />
                  <span>{session.soundscape}</span>
                </div>
              </div>

              {isPlaying && (
                <div className="mt-4 p-3 rounded-[10px] bg-white border border-[#FDE68A] flex items-center justify-between text-[12.5px] text-[#92400E] animate-fade-in shadow-2xs">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-[#F59E0B] animate-bounce" />
                      <div className="w-1 h-4 bg-[#F59E0B] animate-bounce delay-75" />
                      <div className="w-1 h-2 bg-[#F59E0B] animate-bounce delay-150" />
                    </div>
                    <span>Reproduciendo experiencia devocional envolvente…</span>
                  </div>
                  <span className="font-bold text-[#D97706]">En vivo</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
