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
    <div className="w-full bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#263330]">
        <div className="flex items-center gap-2 text-[#A6B0AC]">
          <Volume2 className="w-4 h-4 text-[#C99757]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#C99757]">
            Audios de Fe y Paisajes Sonoros Devocionales
          </span>
        </div>
        <span className="text-[12px] text-[#6E7A75]">
          Inducción al sueño
        </span>
      </div>

      <div>
        <h3 className="font-editorial text-[22px] sm:text-[24px] text-[#E8EBE9] mb-1">
          Narraciones reposadas y frecuencias de descanso
        </h3>
        <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
          Lectura envolvente de las promesas de la Escritura acompañadas de texturas de sonido orgánicas (lluvia suave, arroyos serenos y frecuencias de reposo). Las sesiones introductorias son libres; las vigilias extendidas forman parte de la suscripción mensual de 30 días.
        </p>
      </div>

      <div className="space-y-4">
        {FAITH_AUDIO_SESSIONS.map((session) => {
          const isPlaying = playingId === session.id;
          const isFree = session.isFreePreview !== false;

          return (
            <div
              key={session.id}
              className={`p-5 rounded-[8px] border transition-all ${
                isPlaying
                  ? 'bg-[#1B322F]/40 border-[#2A6F68]'
                  : 'bg-[#121A18] border-[#263330] hover:border-[#3D4C47]'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#3D7D68] bg-[#161F1E] px-2 py-0.5 rounded-[4px] border border-[#263330]">
                      {session.narrator}
                    </span>
                    <span className="text-[12px] tabular-nums text-[#6E7A75] flex items-center gap-1">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />
                      {session.durationMinutes}
                    </span>
                    {isFree ? (
                      <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-[#3D7D68]/20 text-[#3D7D68] font-medium">
                        Libre
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-[#C99757]/20 text-[#C99757] font-medium flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Plan 30D
                      </span>
                    )}
                  </div>
                  <h4 className="font-editorial text-[18px] text-[#E8EBE9]">
                    {session.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => togglePlay(session.id, isFree)}
                  className={`min-h-[44px] min-w-[44px] rounded-full border flex items-center justify-center shrink-0 transition-all ${
                    isPlaying
                      ? 'bg-[#2A6F68] border-[#2A6F68] text-white'
                      : isFree
                      ? 'border-[#263330] bg-[#161F1E] text-[#E8EBE9] hover:bg-[#1D2826]'
                      : 'border-[#263330] bg-[#161F1E] text-[#C99757] hover:border-[#C99757]'
                  }`}
                  aria-label={
                    !isFree
                      ? 'Desbloquear con plan mensual 4.99 USD'
                      : isPlaying
                      ? 'Pausar sesión de audio'
                      : 'Reproducir sesión de audio'
                  }
                  title={!isFree ? 'Disponible en suscripción mensual 4.99 USD' : undefined}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" strokeWidth={1.5} />
                  ) : !isFree ? (
                    <Lock className="w-4 h-4 text-[#C99757]" strokeWidth={1.5} />
                  ) : (
                    <Play className="w-4 h-4 ml-0.5" strokeWidth={1.5} />
                  )}
                </button>
              </div>

              <p className="font-editorial text-[14px] text-[#A6B0AC] leading-relaxed mb-3">
                {session.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#263330]/60 text-[12px]">
                <span className="text-[#6E7A75] flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-[#2A6F68]" strokeWidth={1.5} />
                  <span>Textura: {session.soundscape}</span>
                </span>
                <span className="text-[#A6B0AC] italic">
                  {session.scriptureTheme}
                </span>
              </div>

              {/* Indicador de simulación de audio interactivo */}
              {isPlaying && (
                <div className="mt-4 pt-3 border-t border-[#2A6F68]/30 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <span className="w-1 h-3 bg-[#2A6F68] animate-pulse rounded-full" />
                    <span className="w-1 h-5 bg-[#3D7D68] animate-pulse delay-75 rounded-full" />
                    <span className="w-1 h-4 bg-[#2A6F68] animate-pulse delay-150 rounded-full" />
                    <span className="w-1 h-2 bg-[#A6B0AC] animate-pulse rounded-full" />
                  </div>
                  <span className="text-[12px] text-[#3D7D68] font-medium">
                    Reproduciendo atmósfera sonora para apagar la rumiación… Cierra los ojos.
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
