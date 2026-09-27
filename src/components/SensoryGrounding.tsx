import React, { useState } from 'react';
import { Eye, Hand, Ear, Wind, Heart, Shield, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface SensoryGroundingProps {
  onClose?: () => void;
}

export const SensoryGrounding: React.FC<SensoryGroundingProps> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      count: '5 cosas',
      icon: Eye,
      title: 'Cinco cosas que puedes ver ahora',
      prompt: 'Mira despacio a tu alrededor: la esquina de la almohada, la sombra de la cortina, tus manos sobre la mesa o sábana, la textura de la pared, la luz tenue. Cada una existe bajo el orden y soberanía de Dios.',
      scripture: 'Salmo 19:1 — Los cielos cuentan la gloria de Dios, y el firmamento anuncia la obra de sus manos.',
    },
    {
      step: 2,
      count: '4 cosas',
      icon: Hand,
      title: 'Cuatro cosas que puedes tocar y sentir físicamente',
      prompt: 'Siente el peso de tu ropa o cobija, el tacto del respaldo o colchón sosteniendo tu espalda, la temperatura de tus manos, tus pies apoyados en el suelo. Tu cuerpo es templo; está sostenido y seguro.',
      scripture: 'Isaías 41:10 — No temas, porque yo estoy contigo... siempre te sustentaré con la diestra de mi justicia.',
    },
    {
      step: 3,
      count: '3 cosas',
      icon: Ear,
      title: 'Tres sonidos que puedes escuchar con serenidad',
      prompt: 'Escucha el zumbido apacible del entorno, el ritmo de tu propia respiración, el viento o sonido lejano. Ningún ruido amenaza tu seguridad bajo la protección de Dios.',
      scripture: '1 Reyes 19:12 — Y tras el fuego un silbo apacible y delicado.',
    },
    {
      step: 4,
      count: '2 cosas',
      icon: Wind,
      title: 'Dos verdades que inhalas y exhalas',
      prompt: 'Inhala profundamente diciendo en tu mente: "Tu gracia me basta". Exhala despacio diciendo: "Suelto la autoexigencia y el control del mañana".',
      scripture: '2 Corintios 12:9 — Bástate mi gracia; porque mi poder se perfecciona en la debilidad.',
    },
    {
      step: 5,
      count: '1 presencia',
      icon: Heart,
      title: 'Una Presencia viva que habita tu presente: El "YO SOY"',
      prompt: 'Dios no es "fui" ni "seré en tus peores temores". Él es "YO SOY" (Éxodo 3:14). Está aquí en este segundo contigo. No tienes que defenderte ni resolverlo todo solo.',
      scripture: 'Salmo 46:10 — Estad quietos, y conoced que yo soy Dios.',
    },
  ];

  const current = steps[activeStep - 1];
  const IconComponent = current.icon;

  return (
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[18px] p-6 sm:p-7 space-y-6 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <Shield className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0B1E36]">
            Técnica 5-4-3-2-1 con Anclaje Bíblico (Cuadrante Cuerpo & Mente)
          </span>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-[#64748B] hover:text-[#0B1E36] p-1 rounded-md transition-colors cursor-pointer"
            aria-label="Cerrar anclaje sensorial"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div>
        <span className="text-[11px] font-bold tracking-wider uppercase text-[#D97706] block mb-1">
          Paso {current.step} de 5 • {current.count}
        </span>
        <h4 className="font-serif text-[18px] sm:text-[20px] text-[#0B1E36] font-normal mb-2 flex items-center gap-2">
          <IconComponent className="w-5 h-5 text-[#F59E0B]" />
          <span>{current.title}</span>
        </h4>
        <p className="text-[14px] text-[#334155] leading-relaxed mb-4">
          {current.prompt}
        </p>

        <div className="p-3.5 rounded-[12px] bg-[#FEF3C7]/40 border border-[#FDE68A] text-[13px] text-[#92400E] font-serif italic">
          «{current.scripture}»
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
        <button
          type="button"
          disabled={activeStep === 1}
          onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
          className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] disabled:opacity-40 text-[#334155] text-[12.5px] font-medium flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Paso anterior</span>
        </button>

        <div className="flex gap-1.5">
          {steps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setActiveStep(s.step)}
              className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                activeStep === s.step ? 'bg-[#F59E0B] w-6' : 'bg-[#CBD5E1]'
              }`}
              aria-label={`Ir al paso ${s.step}`}
            />
          ))}
        </div>

        {activeStep < 5 ? (
          <button
            type="button"
            onClick={() => setActiveStep((prev) => Math.min(5, prev + 1))}
            className="min-h-[40px] px-4 py-1.5 rounded-[10px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[12.5px] font-bold flex items-center gap-1.5 cursor-pointer border border-[#F59E0B]/30"
          >
            <span>Siguiente</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        ) : (
          onClose && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-[40px] px-4 py-1.5 rounded-[10px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 text-[#060F1E] text-[12.5px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Concluir</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
