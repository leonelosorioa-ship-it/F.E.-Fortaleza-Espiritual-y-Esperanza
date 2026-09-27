import React, { useState } from 'react';
import { ShieldCheck, HeartPulse, ArrowRight, Compass, HeartHandshake, Volume2, Sparkles, BookOpen } from 'lucide-react';

interface LandingScreenProps {
  onStartFlow: () => void;
  onOpenPlan: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartFlow,
  onOpenPlan,
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailSaved, setEmailSaved] = useState<boolean>(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      onStartFlow();
      return;
    }

    try {
      const stored = localStorage.getItem('fe_subscriber_emails');
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(email.trim().toLowerCase())) {
        list.push(email.trim().toLowerCase());
        localStorage.setItem('fe_subscriber_emails', JSON.stringify(list));
      }
      setEmailSaved(true);
      setTimeout(() => {
        onStartFlow();
      }, 600);
    } catch {
      onStartFlow();
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      {/* Editorial Anchor Top Badge */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#3D7D68] bg-[#1B322F] px-2.5 py-1 rounded-[4px] border border-[#2A6F68]/30">
            Ecosistema Digital Tu Poder Mental™
          </span>
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC]">
            Dimensión Trascendente y Fe
          </span>
        </div>

        {/* Titular canónico */}
        <h1 className="font-editorial text-[30px] sm:text-[36px] text-[#E8EBE9] leading-[1.15] tracking-[-0.025em]">
          Para madres y profesionales en crisis de ansiedad nocturna: obtén calma fisiológica y descanso en la gracia de Dios sin la culpa de sentir que te falta fe.
        </h1>

        {/* Slogan y Promesa Estratégica del documento maestro */}
        <p className="font-editorial text-[17px] sm:text-[18px] text-[#A6B0AC] leading-[1.5] max-w-[640px]">
          Un espacio para fortalecer el alma, renovar la esperanza y encontrar paz en medio de las dificultades. De sentirte sola frente a la tormenta a descansar anclada en una promesa superior.
        </p>
      </div>

      {/* Acción principal canónica */}
      <div className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-7">
        <div className="flex items-center gap-2 mb-3 text-[#A6B0AC]">
          <HeartPulse className="w-4 h-4 text-[#2A6F68]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase">
            Botiquín de Primeros Auxilios Espirituales (7 Dimensiones)
          </span>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo (opcional para plan mensual de 30 días)"
              className="min-h-[48px] flex-1 px-4 py-3 rounded-[6px] bg-[#121A18] border border-[#263330] text-[#E8EBE9] placeholder:text-[#6E7A75] text-[14px] focus:outline-none focus:border-[#2A6F68] focus:ring-1 focus:ring-[#2A6F68] transition-colors duration-150"
            />
            <button
              type="submit"
              className="min-h-[48px] px-6 py-3 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] active:bg-[#235E58] text-white text-[15px] font-medium transition-colors duration-150 flex items-center justify-center gap-2 shrink-0"
            >
              <span>{emailSaved ? 'Guardado, anclando…' : 'Anclar mi mente ahora'}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <p className="text-[12px] text-[#6E7A75]">
            Sin registro obligatorio. Acceso libre e inmediato en menos de 15 segundos al botiquín gratuito perpetuo.
          </p>
        </form>
      </div>

      {/* Mensaje de Marca y Posicionamiento UVP */}
      <div className="p-4 sm:p-5 rounded-[8px] bg-[#121A18] border-l-2 border-[#2A6F68] border-y border-r border-[#263330]">
        <p className="font-editorial text-[16px] text-[#E8EBE9] italic leading-relaxed">
          «Tu fe y tu salud mental no son enemigas; caminan juntas hacia la paz que sobrepasa todo entendimiento.»
        </p>
        <span className="text-[12px] text-[#6E7A75] block mt-1">
          Tener ansiedad no te hace un mal creyente; te hace humano. La paz de Dios es saber que Cristo está contigo en la barca.
        </span>
      </div>

      {/* Tres beneficios directos con verbo */}
      <div className="space-y-4">
        <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#6E7A75] block">
          Pilares del método compasivo
        </span>
        <div className="grid grid-cols-1 gap-3.5">
          <div className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-[6px] bg-[#121A18] border border-[#263330] flex items-center justify-center shrink-0 text-[#3D7D68]">
              <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-editorial text-[18px] text-[#E8EBE9] mb-1">
                Desarmar la culpa religiosa
              </h3>
              <p className="text-[14px] text-[#A6B0AC] leading-relaxed">
                Desmonta el estigma legalista que te dice que tu ansiedad es pecado o debilidad moral. Jesús, David y Elías experimentaron angustia profunda sin que eso anulara su relación con el Padre.
              </p>
            </div>
          </div>

          <div className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-[6px] bg-[#121A18] border border-[#263330] flex items-center justify-center shrink-0 text-[#2A6F68]">
              <HeartPulse className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-editorial text-[18px] text-[#E8EBE9] mb-1">
                Acompasar tu respiración agitada y sentidos
              </h3>
              <p className="text-[14px] text-[#A6B0AC] leading-relaxed">
                Regula el sistema simpático («el gipoteo del alma») combinando respiración diafragmática 4×4 y anclaje sensorial 5-4-3-2-1 con la presencia del «YO SOY».
              </p>
            </div>
          </div>

          <div className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-[6px] bg-[#121A18] border border-[#263330] flex items-center justify-center shrink-0 text-[#C99757]">
              <Compass className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-editorial text-[18px] text-[#E8EBE9] mb-1">
                Soltar el control nocturno
              </h3>
              <p className="text-[14px] text-[#A6B0AC] leading-relaxed">
                Rinde los escenarios que tu mente quiere forzar de madrugada mediante una liturgia de entrega en tres tiempos: reconocer el dolor, renunciar al control y descansar en la soberanía.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Módulos complementarios del documento maestro */}
      <div className="space-y-4">
        <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#6E7A75] block">
          Herramientas del Ecosistema F.E.™
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="p-4 rounded-[8px] bg-[#161F1E] border border-[#263330] hover:border-[#2A6F68] text-left transition-all group"
          >
            <Compass className="w-5 h-5 text-[#2A6F68] mb-2 group-hover:scale-105 transition-transform" strokeWidth={1.5} />
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-[14px] font-medium text-[#E8EBE9]">
                Ruta 30 Días «Ancla de Paz»
              </h4>
              <span className="text-[10px] uppercase px-1.5 py-0.2 rounded bg-[#3D7D68]/20 text-[#3D7D68] font-medium">
                D1-7 Gratis
              </span>
            </div>
            <p className="text-[12px] text-[#A6B0AC] line-clamp-2">
              Programa mensual estructurado en 4 semanas para edificar estabilidad emocional duradera.
            </p>
          </button>

          <button
            type="button"
            onClick={onOpenGratitude}
            className="p-4 rounded-[8px] bg-[#161F1E] border border-[#263330] hover:border-[#C99757] text-left transition-all group"
          >
            <HeartHandshake className="w-5 h-5 text-[#C99757] mb-2 group-hover:scale-105 transition-transform" strokeWidth={1.5} />
            <h4 className="text-[14px] font-medium text-[#E8EBE9] mb-1">
              Regalos de Hoy (Gratitud)
            </h4>
            <p className="text-[12px] text-[#A6B0AC] line-clamp-2">
              Diario nocturno de 3 bendiciones para activar neuroplasticidad de paz.
            </p>
          </button>

          <button
            type="button"
            onClick={onOpenAudios}
            className="p-4 rounded-[8px] bg-[#161F1E] border border-[#263330] hover:border-[#3D7D68] text-left transition-all group"
          >
            <Volume2 className="w-5 h-5 text-[#3D7D68] mb-2 group-hover:scale-105 transition-transform" strokeWidth={1.5} />
            <h4 className="text-[14px] font-medium text-[#E8EBE9] mb-1">
              Audios de Fe y Paisajes
            </h4>
            <p className="text-[12px] text-[#A6B0AC] line-clamp-2">
              Narraciones pausadas con lluvia, arroyos y frecuencias de descanso.
            </p>
          </button>
        </div>
      </div>

      {/* Bloque «Detalles del plan» */}
      <div className="border border-[#263330] bg-[#161F1E]/50 rounded-[12px] p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-1">
            Detalles del plan mensual
          </span>
          <div className="font-editorial text-[20px] text-[#E8EBE9] mb-1">
            Botiquín gratuito perpetuo y suscripción de 30 días por 4.99 USD/mes
          </div>
          <p className="text-[13px] text-[#6E7A75] max-w-[440px]">
            El auxilio de emergencia y los primeros 7 días del plan son 100% libres de costo. La suscripción de 4.99 USD habilita el programa mensual completo de 30 días y todas las vigilias.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenPlan}
          className="min-h-[44px] px-4 py-2 rounded-[6px] border border-[#263330] hover:bg-[#161F1E] text-[13px] font-medium text-[#E8EBE9] shrink-0 transition-colors duration-150"
        >
          Consultar detalles
        </button>
      </div>
    </div>
  );
};
