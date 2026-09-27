import React, { useState } from 'react';
import { SymptomId, UserRoleProfile } from '../types';
import { SYMPTOM_OPTIONS, ROLE_PROFILE_OPTIONS } from '../data/anchors';
import { ArrowLeft, ArrowRight, Info, CheckCircle2, User, Sparkles, Heart, Moon, Compass, Activity, Brain } from 'lucide-react';

interface SymptomFormScreenProps {
  onBack: () => void;
  onSubmit: (symptomId: SymptomId, reflection: string, roleProfile: UserRoleProfile) => void;
  isLoading: boolean;
  initialRole?: UserRoleProfile;
  initialSymptom?: SymptomId;
}

export const SymptomFormScreen: React.FC<SymptomFormScreenProps> = ({
  onBack,
  onSubmit,
  isLoading,
  initialRole = 'hombre_fe',
  initialSymptom = 'presencia',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRoleProfile>(initialRole);
  const [selectedSymptom, setSelectedSymptom] = useState<SymptomId>(initialSymptom);
  const [reflection, setReflection] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSymptom) {
      setErrorMessage('Por favor selecciona el área o motivo en el que deseas encontrarte con Dios hoy.');
      return;
    }
    setErrorMessage(null);
    onSubmit(selectedSymptom, reflection, selectedRole);
  };

  const currentRoleInfo = ROLE_PROFILE_OPTIONS.find((r) => r.id === selectedRole);

  const getQuadrantColorBadge = (quadrant?: string) => {
    switch (quadrant) {
      case 'cuerpo':
        return 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]';
      case 'mente':
        return 'bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]';
      case 'alma':
        return 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]';
      case 'proposito':
      default:
        return 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]';
    }
  };

  return (
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Botón de regreso */}
      <div>
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          <span>Volver al inicio</span>
        </button>
      </div>

      {/* Título de Bienvenida Espiritual */}
      <div className="bg-white border border-[#E2E8F0] rounded-[18px] p-6 sm:p-8 shadow-sm space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#B45309] text-[11px] font-bold tracking-wider uppercase border border-[#FDE68A]">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Diagnóstico y Anclaje en el Mapa de tu Vida</span>
        </div>
        <h2 className="font-serif text-[26px] sm:text-[30px] text-[#0B1E36] font-normal leading-tight">
          ¿En qué área de tu vida necesitas a Dios hoy?
        </h2>
        <p className="text-[14px] text-[#64748B] leading-relaxed">
          Dios conoce tu nombre, tus anhelos y tus cargas secretas. Selecciona tu perfil y la necesidad que traes hoy ante el Señor para recibir su promesa viva, declaración afirmativa y oración guiada.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paso 1: Perfil de Identidad en Dios */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="text-[14px] font-bold text-[#0B1E36] flex items-center gap-2">
              <User className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
              <span>1. ¿Cómo te presentas delante del Señor en este momento?</span>
            </label>
            <span className="text-[11px] text-[#F59E0B] font-bold uppercase tracking-wider">
              Enfoque personal
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {ROLE_PROFILE_OPTIONS.map((role) => {
              const isSelected = selectedRole === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-[14px] text-left border transition-all flex flex-col justify-between gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FEF3C7]/40 border-[#F59E0B] ring-2 ring-[#F59E0B]/20 shadow-xs'
                      : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 w-full">
                    <span className="text-[13.5px] font-bold text-[#0B1E36] leading-snug">
                      {role.label}
                    </span>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
                      </div>
                    )}
                  </div>
                  <span className="text-[11.5px] text-[#64748B] leading-snug">
                    {role.sublabel}
                  </span>
                </button>
              );
            })}
          </div>

          {currentRoleInfo && (
            <div className="p-4 rounded-[14px] bg-[#F8FAFC] border border-[#CBD5E1] text-[13px] text-[#334155] flex items-start gap-2.5">
              <Heart className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#0B1E36] font-semibold">Propósito de oración: </strong>
                <span>{currentRoleInfo.contextDesc} </span>
                <span className="text-[#0D9488] font-medium italic">{currentRoleInfo.specificTension}</span>
              </div>
            </div>
          )}
        </div>

        {/* Paso 2: Selección de la Necesidad Espiritual y Cuadrante */}
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <label className="text-[14px] font-bold text-[#0B1E36]">
              2. ¿Qué necesidad o motivo traes a la presencia de Dios?
            </label>
            <span className="text-[11px] text-[#64748B] uppercase tracking-wider font-semibold">
              {SYMPTOM_OPTIONS.length} Vías de Gracia
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup">
            {SYMPTOM_OPTIONS.map((item) => {
              const isSelected = selectedSymptom === item.id;
              const isNightCrisis = item.id === 'ansiedad_noche';
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
                  className={`p-4 rounded-[14px] text-left transition-all border flex items-start justify-between gap-3 cursor-pointer ${
                    isSelected
                      ? 'bg-[#FEF3C7]/40 border-[#F59E0B] ring-2 ring-[#F59E0B]/20 shadow-xs'
                      : isNightCrisis
                      ? 'bg-[#FFFBEB] border-[#FDE68A] hover:border-[#F59E0B] text-[#334155]'
                      : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#334155]'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.quadrantLabel && (
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getQuadrantColorBadge(item.quadrant)}`}>
                          {item.quadrantLabel}
                        </span>
                      )}
                      {isNightCrisis && <Moon className="w-3.5 h-3.5 text-[#D97706]" />}
                    </div>

                    <span className="text-[14px] font-bold text-[#0B1E36] block">
                      {item.label}
                    </span>

                    <span className="text-[12px] text-[#64748B] block leading-snug">
                      {item.tag}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Paso 3: Petición o Desahogo del Corazón */}
        <div className="space-y-2">
          <div className="flex justify-between items-baseline">
            <label htmlFor="reflection-input" className="text-[14px] font-bold text-[#0B1E36]">
              3. Tu petición o conversación con Dios (opcional):
            </label>
            <span className="text-[12px] text-[#64748B]">
              Solo tú y Dios la leen
            </span>
          </div>
          <textarea
            id="reflection-input"
            rows={3}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="Escribe lo que sientes en tu corazón («Señor, pongo a mi familia en tus manos…», «Padre, dame fuerzas y sabiduría en mi trabajo…», «Señor, calma mis palpitaciones y ayúdame a descansar…»)"
            className="w-full p-4 rounded-[14px] bg-white border border-[#CBD5E1] text-[#0B132B] placeholder:text-[#64748B] font-serif text-[15px] leading-relaxed focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all resize-none shadow-2xs"
          />
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <div className="p-4 rounded-[12px] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-[13px] flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" strokeWidth={2} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Botón Principal */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full min-h-[52px] px-6 py-3 rounded-[12px] text-[#060F1E] text-[15px] font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer ${
              isLoading
                ? 'bg-[#EAB308] cursor-wait'
                : 'bg-gradient-to-r from-[#F59E0B] via-[#EAB308] to-[#D97706] hover:brightness-110 active:brightness-95'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#060F1E]/40 border-t-[#060F1E] rounded-full animate-spin" />
                <span>Buscando refugio en la Palabra de Dios…</span>
              </div>
            ) : (
              <>
                <span>Recibir Palabra y Oración de Fe</span>
                <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
