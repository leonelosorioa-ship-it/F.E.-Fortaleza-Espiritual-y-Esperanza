import React, { useState } from 'react';
import { FAITH_AUDIO_SESSIONS } from '../data/anchors';
import { Volume2, Play, Pause, Waves, Moon, Clock, Lock } from 'lucide-react';

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
    <div className="w-full max-w-[720px] mx-auto bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-6 shadow-sm animate-fade-in">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-[#0EA5E9]" strokeWidth={1.75} />
          <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
            Audios de Fe y Paisajes Sonoros Devocionales
          </span>
        </div>
        <span className="text-[10.5px] font-semibold uppercase px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
          Inducción al sueño y sosiego
        </span>
      </div>

      <div className="space-y-1.5">
        <h1 className="font-editorial text-[22px] sm:text-[26px] text-[#F1F5F9] font-normal">
          Narraciones reposadas y frecuencias de descanso en Dios
        </h1>
        <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
          Lectura envolvente de las promesas de la Escritura acompañadas de texturas de sonido orgánicas (lluvia suave, arroyos serenos y frecuencias de reposo). Las sesiones introductorias son libres; las vigilias extendidas forman parte del proceso de 30 días guiado por Clara Luz y Leo por un <strong>único valor de USD 7.99 o $29.900 COL</strong>. <em>Por el momento no existirá una membresía, es un único pago.</em>
        </p>
      </div>

      <div className="space-y-3.5">
        {FAITH_AUDIO_SESSIONS.map((session) => {
          const isPlaying = playingId === session.id;
          const isFree = session.isFreePreview !== false;

          return (
            <div
              key={session.id}
              className={`p-5 rounded-[16px] border transition-all ${
                isPlaying
                  ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/30 shadow-md'
                  : 'bg-[#060F1E] border-white/[0.08] hover:border-white/[0.18]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10.5px] font-semibold tracking-wider uppercase text-[#F59E0B]">
                      {session.scriptureTheme}
                    </span>
                    {!isFree && (
                      <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30 flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" strokeWidth={2} /> Proceso 30 Días (USD 7.99 / $29.900 COL)
                      </span>
                    )}
                  </div>
                  <h2 className="font-editorial text-[17.5px] text-[#F1F5F9] font-normal">
                    {session.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => togglePlay(session.id, isFree)}
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-colors cursor-pointer shadow-sm ${
                    isPlaying
                      ? 'bg-[#F59E0B] text-[#060F1E]'
                      : isFree
                      ? 'bg-white/[0.08] hover:bg-[#F59E0B] hover:text-[#060F1E] text-[#F1F5F9] border border-white/[0.1]'
                      : 'bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E]'
                  }`}
                  aria-label={isPlaying ? 'Pausar sesión' : 'Reproducir sesión'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-current" />
                  ) : !isFree ? (
                    <Lock className="w-3.5 h-3.5" strokeWidth={2} />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5 fill-current" />
                  )}
                </button>
              </div>

              <p className="text-[13px] text-[#CBD5E1] leading-relaxed mb-3">
                {session.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11.5px] text-[#94A3B8] pt-2.5 border-t border-white/[0.06]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={1.75} />
                  <span className="tabular-nums">{session.durationMinutes}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Moon className="w-3.5 h-3.5 text-[#CBD5E1]" strokeWidth={1.75} />
                  <span>{session.narrator}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Waves className="w-3.5 h-3.5 text-[#10B981]" strokeWidth={1.75} />
                  <span>{session.soundscape}</span>
                </div>
              </div>

              {/* In-player smooth opacity wave (NO BOUNCE) */}
              {isPlaying && (
                <div className="mt-3.5 p-3 rounded-[10px] bg-[#0B1728] border border-[#F59E0B]/40 flex items-center justify-between text-[12px] text-[#CBD5E1] animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-[#F59E0B] rounded-full animate-pulse-subtle" />
                      <div className="w-1 h-4 bg-[#F59E0B] rounded-full animate-pulse-subtle" style={{ animationDelay: '200ms' }} />
                      <div className="w-1 h-2.5 bg-[#F59E0B] rounded-full animate-pulse-subtle" style={{ animationDelay: '400ms' }} />
                    </div>
                    <span>Reproduciendo experiencia devocional reposada…</span>
                  </div>
                  <span className="font-semibold text-[#F59E0B]">En curso</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
