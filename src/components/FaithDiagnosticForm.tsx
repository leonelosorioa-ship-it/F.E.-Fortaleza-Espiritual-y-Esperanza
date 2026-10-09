import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Heart, AlertCircle, Wind, Sparkles } from 'lucide-react';
import { EmotionalDimensionId, EMOTIONAL_DIMENSIONS } from '../data/faithTechData';

interface FaithDiagnosticFormProps {
  onBack: () => void;
  onSubmit: (dimension: EmotionalDimensionId, freeReflection: string) => void;
}

export const FaithDiagnosticForm: React.FC<FaithDiagnosticFormProps> = ({
  onBack,
  onSubmit,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<EmotionalDimensionId | null>(null);
  const [freeReflection, setFreeReflection] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dimensionList: EmotionalDimensionId[] = [
    'ansiedad',
    'miedo',
    'culpa',
    'insomnio',
    'agotamiento',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDimension) {
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    // Smooth transition
    setTimeout(() => {
      onSubmit(selectedDimension, freeReflection.trim());
    }, 400);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-5 sm:py-8 space-y-6 animate-fade-in text-[#F8FAFC]">
      {/* Barra superior de navegación */}
      <div className="flex items-center justify-between pb-3 border-b border-[#334155]">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] text-[13px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-[#1E293B] active:bg-[#334155] border border-transparent hover:border-[#334155] transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none"
        >
          <ArrowLeft className="w-4 h-4 text-[#0D9488]" />
          <span>Volver a la portada</span>
        </button>

        <span className="text-[11.5px] font-medium text-[#94A3B8]">
          Paso 1 de 2 • Discernimiento consciente
        </span>
      </div>

      {/* Título de la acción central */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] bg-[#1E293B] text-[#0D9488] text-[11px] font-semibold tracking-wider uppercase border border-[#334155]">
          <Heart className="w-3 h-3" />
          <span>Acción Central • Reestructuración Pastoral</span>
        </div>
        <h1 className="font-editorial text-[24px] sm:text-[28px] text-[#F8FAFC] font-normal leading-snug">
          ¿Dónde duele o qué pesa hoy?
        </h1>
        <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
          Selecciona la carga emocional que describe tu estado presente. No hay respuestas incorrectas ni condenación. Al nombrar tu malestar con honestidad, permites que la verdad de Dios y la regulación somática comiencen a operar.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Selector visual interactivo: 5 opciones claras */}
        <div className="space-y-2.5">
          <label className="text-[12.5px] font-semibold uppercase tracking-wider text-[#94A3B8] block">
            Elige tu foco de necesidad:
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Opciones de diagnóstico emocional">
            {dimensionList.map((dimKey) => {
              const item = EMOTIONAL_DIMENSIONS[dimKey];
              const isSelected = selectedDimension === dimKey;

              return (
                <div
                  key={dimKey}
                  onClick={() => {
                    setSelectedDimension(dimKey);
                    if (showError) setShowError(false);
                  }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      setSelectedDimension(dimKey);
                      if (showError) setShowError(false);
                    }
                  }}
                  className={`p-4 rounded-[12px] border transition-all cursor-pointer flex flex-col justify-between space-y-2 focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none ${
                    isSelected
                      ? 'bg-[#1E293B] border-[#0D9488] shadow-xs ring-1 ring-[#0D9488]'
                      : 'bg-[#1E293B]/70 border-[#334155] hover:border-[#94A3B8] hover:bg-[#1E293B]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-[14px] font-semibold ${isSelected ? 'text-[#0D9488]' : 'text-[#F8FAFC]'}`}>
                        {item.label}
                      </span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'border-[#0D9488] bg-[#0D9488]' : 'border-[#64748B]'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-[#0F172A]" />}
                      </div>
                    </div>
                    <p className="text-[12px] text-[#94A3B8] leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#334155]/60 flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
                    <Wind className="w-3 h-3 text-[#0D9488]" />
                    <span className="line-clamp-1">{item.somaticFocus.split(':')[0]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {showError && (
            <div className="p-3 rounded-[8px] bg-[#1E293B] border border-[#F59E0B]/50 flex items-center gap-2 text-[#F59E0B] text-[12.5px] animate-fade-in" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Por favor, selecciona una de las cinco opciones para personalizar tu ancla de paz.</span>
            </div>
          )}
        </div>

        {/* Campo de texto opcional y compasivo para desahogo libre */}
        <div className="space-y-2 p-4 rounded-[12px] bg-[#1E293B] border border-[#334155]">
          <div className="space-y-1">
            <label htmlFor="free-reflection" className="text-[13px] font-semibold text-[#F8FAFC] block">
              Escribe aquí lo que tu mente no logra callar <span className="text-[11.5px] font-normal text-[#94A3B8]">(Opcional y confidencial)</span>
            </label>
            <p className="text-[12px] text-[#94A3B8]">
              Desahoga los pensamientos que te quitan el sueño o la opresión que llevas en el pecho. Este texto no se almacena en ningún servidor externo; permanece seguro en la memoria privada de tu navegador.
            </p>
          </div>

          <textarea
            id="free-reflection"
            value={freeReflection}
            onChange={(e) => setFreeReflection(e.target.value)}
            disabled={isSubmitting}
            placeholder="Por ejemplo: Siento que tengo que resolver todo solo/a y me da pánico fallar..."
            rows={4}
            className="w-full p-3 rounded-[8px] bg-[#0F172A] border border-[#334155] focus:border-[#0D9488] focus:outline-none focus:ring-1 focus:ring-[#0D9488] text-[13px] text-[#F8FAFC] placeholder:text-[#64748B] transition-colors resize-y min-h-[96px] disabled:opacity-50"
          />
        </div>

        {/* Botón de envío con verbo claro */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#334155]">
          <div className="flex items-center gap-2 text-[12px] text-[#94A3B8]">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            <span>Privacidad local garantizada (LocalStorage)</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] active:scale-[0.99] text-[#F8FAFC] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[#0D9488] focus-visible:outline-none"
          >
            <span>{isSubmitting ? 'Preparando ancla...' : 'Generar ancla de paz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
