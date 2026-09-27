import React, { useState } from 'react';
import { ArrowRight, Check, Heart, Shield, Sparkles, Loader2, AlertCircle } from 'lucide-react';

interface CoreLandingScreenProps {
  onStart: () => void;
  onOpenPlanModal: () => void;
}

export const CoreLandingScreen: React.FC<CoreLandingScreenProps> = ({
  onStart,
  onOpenPlanModal,
}) => {
  const [email, setEmail] = useState<string>('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'loading' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setEmailStatus('error');
      setErrorMessage('Por favor, ingresa tu correo electrónico para reservar tu ancla.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setEmailStatus('error');
      setErrorMessage('Ingresa un correo electrónico con formato válido.');
      return;
    }

    setEmailStatus('loading');
    setErrorMessage('');

    // Simulate saving to simple list without changing button dimensions
    setTimeout(() => {
      try {
        const stored = JSON.parse(localStorage.getItem('fe_subscriber_emails') || '[]');
        stored.push({ email: cleanEmail, date: new Date().toISOString() });
        localStorage.setItem('fe_subscriber_emails', JSON.stringify(stored));
      } catch {
        // Safe fallback
      }
      setEmailStatus('saved');
      setTimeout(() => {
        onStart();
      }, 700);
    }, 800);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-4 sm:py-6 space-y-7 animate-fade-in">
      {/* 
        PRIMERA PANTALLA (ABOVE-THE-FOLD a 375px):
        - Titular con la promesa exacta
        - Línea de apoyo empática
        - Botón principal "Encuentra tu ancla hoy" con simulación de correo
      */}
      <section
        aria-label="Presentación y acción principal"
        className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-5 sm:p-7 space-y-4"
      >
        <div className="space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[8px] bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] text-[#F59E0B] text-rotulo">
            <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Santuario de calma para el creyente</span>
          </div>

          {/* Titular con la promesa estricta */}
          <h1 className="text-display text-[#F8FAF9]">
            Encuentra tu ancla de paz, renueva tu esperanza y calma tu sistema nervioso sin sentir culpa religiosa.
          </h1>

          {/* Línea de apoyo empática */}
          <p className="text-cuerpo text-[#94A3B8]">
            Si la sobrecarga, la ansiedad nocturna o el pánico te visitan hoy, tu cuerpo no está fallando espiritualmente. Respira y entrega el control.
          </p>
        </div>

        {/* Input de Correo y Botón Principal con los 7 estados requeridos */}
        <form onSubmit={handleEmailSubmit} className="space-y-2 pt-1" noValidate>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailStatus === 'error') setEmailStatus('idle');
                }}
                disabled={emailStatus === 'loading'}
                placeholder="Ingresa tu correo para guardar tu progreso..."
                aria-label="Correo electrónico"
                aria-invalid={emailStatus === 'error'}
                className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-[8px] bg-[#060F1E] text-cuerpo text-[#F8FAF9] placeholder:text-[#64748B] border transition-colors ${
                  emailStatus === 'error'
                    ? 'border-[#EF4444] focus:outline-none focus:ring-1 focus:ring-[#EF4444]'
                    : 'border-[rgba(255,255,255,0.1)] focus:outline-none focus:border-[#F59E0B]'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>

            {/* Botón Principal "Encuentra tu ancla hoy" */}
            <button
              type="submit"
              disabled={emailStatus === 'loading'}
              className="min-h-[44px] min-w-[200px] px-5 py-2.5 rounded-[8px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-cuerpo transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none"
            >
              {emailStatus === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" strokeWidth={1.5} />
                  <span>Preparando...</span>
                </>
              ) : emailStatus === 'saved' ? (
                <>
                  <Check className="w-4 h-4 text-[#060F1E] shrink-0" strokeWidth={1.5} />
                  <span>Ancla reservada</span>
                </>
              ) : (
                <>
                  <span>Encuentra tu ancla hoy</span>
                  <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                </>
              )}
            </button>
          </div>

          {/* Mensaje de error / ayuda accesible */}
          {emailStatus === 'error' && (
            <div className="flex items-center gap-1.5 text-rotulo text-[#EF4444] pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" strokeWidth={1.5} />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-rotulo text-[#94A3B8] pt-1">
            <span>Uso confidencial en tu equipo</span>
            <button
              type="button"
              onClick={onStart}
              className="text-[#F59E0B] hover:underline cursor-pointer min-h-[44px] inline-flex items-center"
            >
              Ir directo al botiquín sin correo
            </button>
          </div>
        </form>
      </section>

      {/* 
        TRES BENEFICIOS ESTRUCTURADOS CON VERBO
        1. Soltar el control
        2. Habitar el presente
        3. Construir un hábito
      */}
      <section aria-label="Beneficios del ancla" className="space-y-3">
        <h2 className="text-titulo text-[#F8FAF9]">
          Beneficios del reposo en Dios
        </h2>

        <div className="space-y-2.5">
          {/* Beneficio 1 */}
          <div className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-4 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
              <Heart className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-subtitulo text-[#F8FAF9]">
                Soltar el control
              </h3>
              <p className="text-cuerpo text-[#94A3B8]">
                Rendir la sobrecarga mental y física ante el Creador, permitiendo que tu sistema nervioso desactive la alerta biológica de peligro.
              </p>
            </div>
          </div>

          {/* Beneficio 2 */}
          <div className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-4 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-[rgba(5,150,105,0.15)] flex items-center justify-center text-[#059669] shrink-0 mt-0.5">
              <Shield className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-subtitulo text-[#F8FAF9]">
                Habitar el presente
              </h3>
              <p className="text-cuerpo text-[#94A3B8]">
                Detener el ciclo de rumiación nocturna mediante la respiración serena y el anclaje litúrgico en la Escritura viva.
              </p>
            </div>
          </div>

          {/* Beneficio 3 */}
          <div className="rounded-[16px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] p-4 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-[rgba(245,158,11,0.15)] flex items-center justify-center text-[#F59E0B] shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-subtitulo text-[#F8FAF9]">
                Construir un hábito
              </h3>
              <p className="text-cuerpo text-[#94A3B8]">
                Entrenar tu mente con regularidad para responder con paz en lugar de pánico cuando las tormentas cotidianas se presenten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 
        BLOQUE DE DETALLES DEL PLAN
        Promoviendo un proceso guiado de 30 días por un único pago tentativo de 12.99 USD
      */}
      <section
        aria-label="Detalles del plan"
        className="rounded-[16px] border-2 border-[#F59E0B] bg-[rgba(255,255,255,0.05)] p-5 sm:p-6 space-y-3.5"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <span className="text-rotulo text-[#F59E0B] block">
              Detalles del plan • Proceso guiado
            </span>
            <h2 className="text-titulo text-[#F8FAF9]">
              Ruta de 30 Días con Clara Luz y Leo
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[20px] font-semibold text-[#F59E0B] tabular-nums">
              12.99 USD
            </span>
            <span className="text-rotulo text-[#94A3B8] block">
              Pago único • Sin mensualidades
            </span>
          </div>
        </div>

        <p className="text-cuerpo text-[#94A3B8]">
          El botiquín de emergencia es permanente y gratuito. Para profundizar en la sanidad interior y consolidar tu descanso nocturno, el programa de 30 días ofrece itinerarios diarios guiados por Clara Luz y Leo por un único valor de 12.99 USD (sin cuotas recurrentes).
        </p>

        <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={onStart}
            className="min-h-[44px] px-5 py-2.5 rounded-[8px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-cuerpo transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Iniciar la acción central</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={onOpenPlanModal}
            className="min-h-[44px] px-4 py-2.5 rounded-[8px] bg-transparent hover:bg-[rgba(255,255,255,0.05)] text-[#F8FAF9] border border-[rgba(255,255,255,0.1)] text-cuerpo transition-colors cursor-pointer"
          >
            Leer más del plan
          </button>
        </div>
      </section>
    </div>
  );
};
