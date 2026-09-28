import React, { useState } from 'react';
import { ShieldAlert, Moon, Heart, BatteryCharging, ArrowLeft, ArrowRight, Sparkles, Check, Compass } from 'lucide-react';
import { SymptomId, UserRoleProfile, ConversationalMood } from '../types';

interface ConversationalDiagnosticProps {
  onBack: () => void;
  onSubmit: (role: UserRoleProfile, symptomId: SymptomId, mood: ConversationalMood) => void;
  initialRole?: UserRoleProfile;
  initialSymptom?: SymptomId;
}

interface MoodCard {
  id: ConversationalMood;
  symptomId: SymptomId;
  title: string;
  subtitle: string;
  description: string;
  scripturePreview: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  quadrantName: string;
}

export const ConversationalDiagnosticScreen: React.FC<ConversationalDiagnosticProps> = ({
  onBack,
  onSubmit,
  initialRole = 'madre_profesional',
  initialSymptom = 'ansiedad_noche',
}) => {
  // Map initial symptom to mood
  const defaultMood: ConversationalMood =
    initialSymptom === 'cansancio'
      ? 'agotamiento'
      : initialSymptom === 'perdon'
      ? 'culpa'
      : initialSymptom === 'confianza'
      ? 'panico'
      : 'insomnio';

  const [selectedMood, setSelectedMood] = useState<ConversationalMood>(defaultMood);
  const [selectedRole, setSelectedRole] = useState<UserRoleProfile>(initialRole);
  const [step, setStep] = useState<1 | 2>(1); // Step 1: Mood, Step 2: Role confirmation

  const moodCards: MoodCard[] = [
    {
      id: 'panico',
      symptomId: 'confianza',
      title: 'Pánico y Taquicardia',
      subtitle: 'Alivio fisiológico urgente',
      description: 'Sientes palpitaciones, opresión en el pecho o la sensación de perder el control. Tu cuerpo necesita volver al reposo.',
      scripturePreview: '«No temas, porque yo estoy contigo... te sustentaré con la diestra de mi justicia.» (Isaías 41:10)',
      icon: ShieldAlert,
      quadrantName: 'Cuadrante Cuerpo',
    },
    {
      id: 'insomnio',
      symptomId: 'ansiedad_noche',
      title: 'Insomnio y Rumiación',
      subtitle: 'Sosiego mental nocturno',
      description: 'Es medianoche, tu mente repasa pendientes, temores y escenarios futuros sin descanso. Necesitas apagar el ruido mental.',
      scripturePreview: '«En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado.» (Salmo 4:8)',
      icon: Moon,
      quadrantName: 'Cuadrante Mente',
    },
    {
      id: 'culpa',
      symptomId: 'perdon',
      title: 'Culpa y Autoexigencia',
      subtitle: 'Gracia sobre el juicio',
      description: 'Sientes que no deberías estar ansioso, que te falta fe o que estás fallando a tu familia y a Dios. Necesitas gracia sin reproches.',
      scripturePreview: '«Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús.» (Romanos 8:1)',
      icon: Heart,
      quadrantName: 'Cuadrante Alma',
    },
    {
      id: 'agotamiento',
      symptomId: 'cansancio',
      title: 'Agotamiento y Sobrecarga',
      subtitle: 'Renovación de fuerzas',
      description: 'La carga del trabajo, los hijos o los deberes te drenó la energía. No tienes fuerzas ni para orar; solo anhelas reposo.',
      scripturePreview: '«Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.» (Mateo 11:28)',
      icon: BatteryCharging,
      quadrantName: 'Cuadrante Propósito',
    },
  ];

  const roleOptions: { id: UserRoleProfile; label: string; context: string }[] = [
    {
      id: 'madre_profesional',
      label: 'Madre o Profesional con sobrecarga',
      context: 'Llevas la responsabilidad de tu hogar o empleo y necesitas soltar la autoexigencia.',
    },
    {
      id: 'padre_familia',
      label: 'Padre de familia o proveedor',
      context: 'Batallas con la presión de la provisión y anhelas paz para liderar con sabiduría.',
    },
    {
      id: 'hombre_fe',
      label: 'Hombre en busca de dirección divina',
      context: 'Deseas vencer la soledad interior y confiar tus decisiones al Padre celestial.',
    },
    {
      id: 'mujer_fe',
      label: 'Mujer en la presencia de Dios',
      context: 'Buscas un refugio sereno donde sanar el corazón y descansar en su cuidado tierno.',
    },
    {
      id: 'profesional_creyente',
      label: 'Líder o profesional en alta exigencia',
      context: 'Enfrentas tensión laboral y buscas claridad para no desgastar tu salud mental.',
    },
  ];

  const currentMoodObj = moodCards.find((m) => m.id === selectedMood) || moodCards[0];

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onSubmit(selectedRole, currentMoodObj.symptomId, selectedMood);
    }
  };

  return (
    <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-7 sm:space-y-8 animate-fade-in">
      {/* Navigation Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={step === 2 ? () => setStep(1) : onBack}
          className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span>{step === 2 ? 'Cambiar estado de ánimo' : 'Volver al inicio'}</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-[#CBD5E1]">
            Paso {step} de 2
          </span>
        </div>
      </div>

      {/* STEP 1: Conversational Mood Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Diagnóstico de Paz Litúrgica</span>
            </div>
            <h1 className="font-editorial text-[24px] sm:text-[30px] text-[#F1F5F9] font-normal leading-snug">
              ¿Cómo te sientes en este momento?
            </h1>
            <p className="text-[14px] text-[#94A3B8] leading-relaxed">
              Selecciona la tarjeta que describe tu estado presente. No hay respuestas equivocadas ni juicio en la presencia de Dios.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {moodCards.map((item) => {
              const Icon = item.icon;
              const isSelected = selectedMood === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedMood(item.id)}
                  className={`min-h-[140px] p-5 rounded-[16px] text-left transition-all duration-200 border cursor-pointer flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/40 shadow-lg'
                      : 'bg-[#0B1728] border-white/[0.08] hover:border-white/[0.2] hover:bg-[#0B1728]/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-[10px] flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#F59E0B] text-[#060F1E]'
                            : 'bg-white/[0.05] text-[#F59E0B] group-hover:bg-[#F59E0B]/20'
                        }`}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <span className="text-[10.5px] uppercase font-semibold tracking-wider text-[#94A3B8] block">
                          {item.quadrantName}
                        </span>
                        <h2 className="font-editorial text-[17px] text-[#F1F5F9] font-normal leading-tight">
                          {item.title}
                        </h2>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#F59E0B] bg-[#F59E0B] text-[#060F1E]'
                          : 'border-white/20 bg-transparent'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3" strokeWidth={2.5} />}
                    </div>
                  </div>

                  <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed mt-3">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="pt-3 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Continuar al paso siguiente</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Role Context Confirmation */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#10B981] block">
              Personalización de la Oración
            </span>
            <h2 className="font-editorial text-[24px] sm:text-[28px] text-[#F1F5F9] font-normal leading-snug">
              ¿En qué contexto caminas hoy?
            </h2>
            <p className="text-[14px] text-[#94A3B8] leading-relaxed">
              Adaptamos las palabras de entrega y la Escritura a tu realidad personal, sin fórmulas vacías.
            </p>
          </div>

          {/* Role list */}
          <div className="space-y-2.5">
            {roleOptions.map((role) => {
              const isSelected = selectedRole === role.id;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`w-full min-h-[58px] p-4 rounded-[14px] text-left transition-all border cursor-pointer flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-[#0E223D] border-[#F59E0B] ring-1 ring-[#F59E0B]/30'
                      : 'bg-[#0B1728] border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[14.5px] font-medium text-[#F1F5F9] block">
                      {role.label}
                    </span>
                    <span className="text-[12px] text-[#94A3B8] block">
                      {role.context}
                    </span>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'border-[#F59E0B] bg-[#F59E0B] text-[#060F1E]'
                        : 'border-white/20 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" strokeWidth={2.5} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Diagnostic Summary Callout */}
          <div className="p-4 rounded-[14px] bg-[#0E223D]/60 border border-white/[0.08] flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#F59E0B] shrink-0 mt-0.5" strokeWidth={1.75} />
            <div className="text-[13px] text-[#CBD5E1] space-y-1">
              <span className="font-semibold text-[#F1F5F9] block">
                Tu ancla seleccionada: {currentMoodObj.title}
              </span>
              <p className="italic text-[#94A3B8]">
                {currentMoodObj.scripturePreview}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full sm:w-auto min-h-[46px] px-4 py-2 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] text-[13px] font-medium flex items-center justify-center transition-colors cursor-pointer"
            >
              Atrás
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Entrar al Santuario de Paz</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
