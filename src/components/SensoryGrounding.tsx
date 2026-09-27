import React, { useState } from 'react';
import { Eye, Hand, Ear, Wind, Heart, Shield } from 'lucide-react';

interface SensoryGroundingProps {
  onFinish?: () => void;
}

export const SensoryGrounding: React.FC<SensoryGroundingProps> = ({ onFinish }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      count: '5 cosas',
      icon: Eye,
      title: 'Cinco cosas que puedes ver ahora',
      prompt: 'Mira despacio a tu alrededor en la penumbra: la esquina de la almohada, la sombra de la cortina, tus manos sobre la sábana, la textura de la pared, la luz tenue. Cada una existe bajo el orden de Dios.',
      scripture: 'Salmo 19:1 — Los cielos cuentan la gloria de Dios.',
    },
    {
      step: 2,
      count: '4 cosas',
      icon: Hand,
      title: 'Cuatro cosas que puedes tocar y sentir físicamente',
      prompt: 'Siente el peso de tu cobija, el tacto del colchón sosteniendo tu espalda, la temperatura de tus pies, el roce de tu ropa. Tu cuerpo es templo; está apoyado y seguro.',
      scripture: 'Isaías 41:10 — Siempre te sustentaré con la diestra de mi justicia.',
    },
    {
      step: 3,
      count: '3 cosas',
      icon: Ear,
      title: 'Tres sonidos que puedes escuchar con calma',
      prompt: 'Escucha el zumbido suave de la noche, el ritmo de tu propia respiración, el crujido distante de la casa. Ningún sonido amenaza tu seguridad ahora.',
      scripture: '1 Reyes 19:12 — Y tras el fuego un silbo apacible y delicado.',
    },
    {
      step: 4,
      count: '2 cosas',
      icon: Wind,
      title: 'Dos verdades que inhalas y exhalas',
      prompt: 'Inhala profundamente diciendo en tu mente: "Tu gracia me basta". Exhala despacio diciendo: "Suelto la ansiedad del mañana".',
      scripture: '2 Corintios 12:9 — Bástate mi gracia.',
    },
    {
      step: 5,
      count: '1 presencia',
      icon: Heart,
      title: 'Una Presencia que habita tu presente: El "YO SOY"',
      prompt: 'Dios no es "fui" ni "seré en tus peores temores". Él es "YO SOY" (Éxodo 3:14). Está aquí en este segundo contigo en la cama. No tienes que defenderte.',
      scripture: 'Salmo 46:10 — Estad quietos, y conoced que yo soy Dios.',
    },
  ];

  const current = steps[activeStep - 1];
  const IconComponent = current.icon;

  return (
    <div className="w-full bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-7 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#263330]">
        <div className="flex items-center gap-2 text-[#A6B0AC]">
          <Shield className="w-4 h-4 text-[#2A6F68]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase">
            Anclaje Sensorial 5-4-3-2-1 («Habitar el Presente»)
          </span>
        </div>
        <span className="text-[12px] tabular-nums text-[#6E7A75]">
          Paso {activeStep} de 5
        </span>
      </div>

      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[6px] bg-[#121A18] border border-[#263330] flex items-center justify-center shrink-0 text-[#2A6F68]">
          <IconComponent className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <div className="space-y-2 flex-1">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#3D7D68] bg-[#1B322F] px-2 py-0.5 rounded-[4px] border border-[#2A6F68]/20">
            {current.count}
          </span>
          <h3 className="font-editorial text-[18px] text-[#E8EBE9]">
            {current.title}
          </h3>
          <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
            {current.prompt}
          </p>
          <div className="pt-2 text-[12px] text-[#6E7A75] italic">
            {current.scripture}
          </div>
        </div>
      </div>

      {/* Steps indicators */}
      <div className="flex items-center gap-2 pt-2">
        {steps.map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setActiveStep(s.step)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              s.step === activeStep
                ? 'bg-[#2A6F68]'
                : s.step < activeStep
                ? 'bg-[#3D7D68]'
                : 'bg-[#263330]'
            }`}
            aria-label={`Ir al paso sensorial ${s.step}`}
          />
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={activeStep === 1}
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          className="min-h-[44px] px-3 py-1.5 text-[13px] text-[#A6B0AC] hover:text-[#E8EBE9] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        {activeStep < 5 ? (
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            className="min-h-[44px] px-4 py-2 rounded-[6px] bg-[#1D2826] border border-[#263330] hover:bg-[#222E2B] text-[#E8EBE9] text-[13px] font-medium transition-colors"
          >
            Siguiente ancla
          </button>
        ) : (
          <button
            type="button"
            onClick={onFinish}
            className="min-h-[44px] px-4 py-2 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] text-white text-[13px] font-medium transition-colors"
          >
            Completar anclaje presente
          </button>
        )}
      </div>
    </div>
  );
};
