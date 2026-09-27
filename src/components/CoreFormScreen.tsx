import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, AlertCircle, Loader2 } from 'lucide-react';

export type CoreMoodOption = 'ansiedad' | 'soledad' | 'miedo' | 'agotamiento';

interface CoreFormScreenProps {
  onBack: () => void;
  onSubmitMood: (mood: CoreMoodOption) => void;
}

interface MoodCardItem {
  id: CoreMoodOption;
  label: string;
  tagline: string;
  description: string;
}

export const CoreFormScreen: React.FC<CoreFormScreenProps> = ({
  onBack,
  onSubmitMood,
}) => {
  const [selectedMood, setSelectedMood] = useState<CoreMoodOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const moodCards: MoodCardItem[] = [
    {
      id: 'ansiedad',
      label: 'Ansiedad',
      tagline: 'Palpitaciones, inquietud o respiración acelerada',
      description: 'Tu mente anticipa escenarios difíciles y tu cuerpo permanece en estado de guardia constante. Necesitas calma biológica.',
    },
    {
      id: 'soledad',
      label: 'Soledad',
      tagline: 'Sensación de aislamiento en medio de la multitud',
      description: 'Sientes que nadie comprende tus batallas secretas o la pesadez de tu corazón. Necesitas intimidad con el Padre.',
    },
    {
      id: 'miedo',
      label: 'Miedo',
      tagline: 'Temor al futuro, la salud o la estabilidad familiar',
      description: 'La incertidumbre te paraliza y te cuesta dar el siguiente paso. Necesitas el sustento inquebrantable de Dios.',
    },
    {
      id: 'agotamiento',
      label: 'Agotamiento',
      tagline: 'Cansancio profundo físico, mental y espiritual',
      description: 'Has entregado toda tu energía al trabajo y las responsabilidades, y no te quedan fuerzas para continuar. Necesitas reposo.',
    },
  ];

  const handleCardClick = (id: CoreMoodOption) => {
    setSelectedMood(id);
    if (showError) setShowError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) {
      setShowError(true);
      return;
    }

    setIsLoading(true);

    // Simulate transition loading without changing button dimensions
    setTimeout(() => {
      onSubmitMood(selectedMood);
    }, 600);
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 py-4 sm:py-6 space-y-6 animate-fade-in">
      {/* Barra superior de navegación */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(255,255,255,0.1)]">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="min-h-[44px] px-3 py-1.5 rounded-[8px] text-cuerpo text-[#94A3B8] hover:text-[#F8FAF9] hover:bg-[rgba(255,255,255,0.05)] active:bg-[rgba(255,255,255,0.08)] flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.5} />
          <span>Volver al inicio</span>
        </button>

        <span className="text-rotulo text-[#94A3B8]">
          Paso 1 de 2 • Selección consciente
        </span>
      </div>

      {/* Título de la acción central en lenguaje humano */}
      <div className="space-y-1.5">
        <span className="text-rotulo text-[#F59E0B] block">
          Acción central • Diagnóstico empático
        </span>
        <h1 className="text-display text-[#F8FAF9]">
          ¿Cómo te sientes en este momento?
        </h1>
        <p className="text-cuerpo text-[#94A3B8]">
          Elige la opción que mejor describa tu carga presente. Dios conoce tu corazón antes de que pronuncies una sola palabra.
        </p>
      </div>

      {/* Tarjetas interactivas grandes con 7 estados */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div
          role="radiogroup"
          aria-label="¿Cómo te sientes en este momento?"
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {moodCards.map((card) => {
            const isSelected = selectedMood === card.id;

            return (
              <button
                key={card.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleCardClick(card.id)}
                disabled={isLoading}
                className={`min-h-[140px] p-5 rounded-[16px] text-left transition-colors border cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[rgba(255,255,255,0.08)] border-[#F59E0B] shadow-sm ring-1 ring-[#F59E0B]'
                    : 'bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.25)] hover:bg-[rgba(255,255,255,0.07)] active:bg-[rgba(255,255,255,0.09)]'
                } disabled:opacity-60 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <h2 className="text-titulo text-[#F8FAF9]">
                      {card.label}
                    </h2>
                    <span className="text-rotulo text-[#F59E0B] block">
                      {card.tagline}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B] text-[#060F1E]'
                        : 'border-[rgba(255,255,255,0.2)] bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </div>
                </div>

                <p className="text-cuerpo text-[#94A3B8] pt-2">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Mensaje de error si se intenta enviar vacío */}
        {showError && !selectedMood && (
          <div
            role="alert"
            className="p-3.5 rounded-[8px] bg-[rgba(239,68,68,0.1)] border border-[#EF4444] text-[#EF4444] text-cuerpo flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>Por favor, selecciona una tarjeta de estado emocional para continuar.</span>
          </div>
        )}

        {/* Botón de acción principal con verbo y área tocable >= 44px */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-rotulo text-[#94A3B8]">
            {selectedMood ? (
              <span className="text-[#059669]">
                Opción elegida: {moodCards.find((c) => c.id === selectedMood)?.label}
              </span>
            ) : (
              <span>Selecciona una tarjeta para habilitar el anclaje</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedMood || isLoading}
            className="min-h-[44px] min-w-[220px] px-6 py-2.5 rounded-[8px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-cuerpo transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none"
            aria-disabled={!selectedMood || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin shrink-0" strokeWidth={1.5} />
                <span>Iniciando anclaje...</span>
              </>
            ) : (
              <>
                <span>Comenzar anclaje de respiración</span>
                <ArrowRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
