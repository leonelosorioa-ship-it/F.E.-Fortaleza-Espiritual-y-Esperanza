import React, { useState } from 'react';
import { SymptomId, UserRoleProfile } from '../types';
import { SYMPTOM_OPTIONS, ROLE_PROFILE_OPTIONS } from '../data/anchors';
import { ArrowLeft, ArrowRight, Info, CheckCircle2, User, HeartPulse } from 'lucide-react';

interface SymptomFormScreenProps {
  onBack: () => void;
  onSubmit: (symptomId: SymptomId, reflection: string, roleProfile: UserRoleProfile) => void;
  isLoading: boolean;
}

export const SymptomFormScreen: React.FC<SymptomFormScreenProps> = ({
  onBack,
  onSubmit,
  isLoading,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRoleProfile>('madre');
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomId | null>(null);
  const [reflection, setReflection] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSymptom) {
      setErrorMessage('Por favor selecciona la dimensión emocional o carga que pesa en este momento.');
      return;
    }
    setErrorMessage(null);
    onSubmit(selectedSymptom, reflection, selectedRole);
  };

  const currentRoleInfo = ROLE_PROFILE_OPTIONS.find((r) => r.id === selectedRole);

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Volver al inicio</span>
        </button>
      </div>

      {/* Screen Header */}
      <div className="mb-8">
        <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-2">
          Paso 1 de 2: La entrega de rescate
        </span>
        <h2 className="font-editorial text-[28px] sm:text-[32px] text-[#E8EBE9] leading-tight mb-2">
          ¿Dónde duele o qué pesa hoy?
        </h2>
        <p className="font-editorial text-[16px] text-[#A6B0AC] leading-relaxed">
          Nombra lo que sientes con franqueza. La gracia de Dios no exige que maquilles tu agotamiento ni tu angustia; en tu debilidad se perfecciona su poder.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Niche Persona Context Selector */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="block text-[13px] font-medium text-[#E8EBE9] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#2A6F68]" strokeWidth={1.5} />
              <span>¿Desde qué lugar estás librando esta batalla hoy?</span>
            </label>
            <span className="text-[11px] text-[#3D7D68] uppercase tracking-wider font-medium">
              Contexto personalizado
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ROLE_PROFILE_OPTIONS.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-3.5 rounded-[6px] text-left border transition-all flex items-start justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-[#1B322F] border-[#2A6F68] text-[#E8EBE9]'
                      : 'bg-[#121A18] border-[#263330] text-[#A6B0AC] hover:text-[#E8EBE9]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[13px] font-medium block text-[#E8EBE9]">
                      {role.label}
                    </span>
                    <span className="text-[11px] text-[#6E7A75] block leading-snug">
                      {role.sublabel}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-4 h-4 rounded-full bg-[#2A6F68] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {currentRoleInfo && (
            <div className="p-3 rounded-[6px] bg-[#161F1E] border border-[#263330] text-[12px] text-[#A6B0AC] flex items-start gap-2">
              <span className="text-[#C99757] font-medium shrink-0">•</span>
              <p>
                <strong className="text-[#E8EBE9]">Tensión de tu rol:</strong> {currentRoleInfo.contextDesc} {currentRoleInfo.specificTension}
              </p>
            </div>
          )}
        </div>

        {/* Selector de Síntomas / 7 Botiquines Temáticos */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="block text-[13px] font-medium text-[#E8EBE9]">
              Selecciona tu botiquín temático de emergencia (7 dimensiones):
            </label>
            <span className="text-[11px] text-[#6E7A75] uppercase tracking-wider">
              Enfoque compasivo
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Dimensiones emocionales">
            {SYMPTOM_OPTIONS.map((item) => {
              const isSelected = selectedSymptom === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => {
                    setSelectedSymptom(item.id);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  className={`min-h-[76px] p-4 rounded-[6px] text-left transition-all duration-150 border flex items-start justify-between gap-3 focus:outline-none focus:ring-2 focus:ring-[#A6B0AC] ${
                    isSelected
                      ? 'bg-[#1B322F] border-[#2A6F68] text-[#E8EBE9]'
                      : 'bg-[#161F1E] border-[#263330] hover:bg-[#1D2826] text-[#A6B0AC] hover:text-[#E8EBE9]'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[14px] font-medium block text-[#E8EBE9]">
                      {item.label}
                    </span>
                    <span className="text-[12px] text-[#6E7A75] block leading-snug">
                      {item.tag}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#2A6F68] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={1.5} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desahogo Breve Opcional */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label htmlFor="reflection-input" className="text-[13px] font-medium text-[#E8EBE9]">
              Desahogo breve (opcional):
            </label>
            <span className="text-[12px] text-[#6E7A75]">
              Solo se guardará en tu dispositivo
            </span>
          </div>
          <textarea
            id="reflection-input"
            rows={3}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Describe qué pensamiento te angustia sin temor a ser juzgada («Siento que no puedo con todo…», «Temo fallarle a Dios y a mi familia…»)"
            className="w-full p-4 rounded-[6px] bg-[#121A18] border border-[#263330] text-[#E8EBE9] placeholder:text-[#6E7A75] font-editorial text-[16px] leading-relaxed focus:outline-none focus:border-[#2A6F68] focus:ring-1 focus:ring-[#2A6F68] transition-colors duration-150 resize-none"
          />
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-3 rounded-[6px] bg-[#1A1515] border border-[#9E4D4D] text-[#9E4D4D] text-[13px] flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Botón de Acción Principal */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full min-h-[48px] px-6 py-3 rounded-[6px] text-white text-[15px] font-medium transition-all duration-150 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-[#235E58] cursor-wait'
                : 'bg-[#2A6F68] hover:bg-[#35837B] active:bg-[#235E58]'
            } focus:outline-none focus:ring-2 focus:ring-[#A6B0AC]`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Buscando refugio en la Palabra…</span>
              </div>
            ) : (
              <>
                <span>Recibir ancla de gracia</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
