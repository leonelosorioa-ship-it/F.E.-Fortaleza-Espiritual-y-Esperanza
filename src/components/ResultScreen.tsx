import React, { useState } from 'react';
import { AnchorContent } from '../types';
import { BreathingGuide } from './BreathingGuide';
import { SensoryGrounding } from './SensoryGrounding';
import { BookOpen, Sparkles, Moon, ArrowLeft, Check, SunMedium, Compass } from 'lucide-react';

interface ResultScreenProps {
  content: AnchorContent;
  userReflection?: string;
  onFinishAndRest: () => void;
  onStartOver: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  content,
  userReflection,
  onFinishAndRest,
  onStartOver,
}) => {
  const [isRestingMode, setIsRestingMode] = useState<boolean>(false);
  const [showSensoryModal, setShowSensoryModal] = useState<boolean>(false);

  if (isRestingMode) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-fade-in">
        <div className="w-12 h-12 rounded-full border border-[#263330] bg-[#121A18] flex items-center justify-center text-[#3D7D68] mb-6">
          <Moon className="w-6 h-6" strokeWidth={1.5} />
        </div>
        <span className="text-[12px] uppercase tracking-[0.08em] font-medium text-[#A6B0AC] mb-2">
          Entrega Completada
        </span>
        <h2 className="font-editorial text-[28px] text-[#E8EBE9] mb-4">
          La guardia ha terminado por hoy
        </h2>
        <p className="font-editorial text-[17px] text-[#A6B0AC] max-w-[420px] mb-8 leading-relaxed">
          Has nombrado tu carga y la has puesto en manos que no se cansan. Ahora puedes apagar tu dispositivo y cerrar los ojos en paz.
        </p>

        <div className="p-4 rounded-[8px] border border-[#263330] bg-[#161F1E] max-w-[380px] mb-8">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6E7A75] block mb-1">
            Ancla para el amanecer
          </span>
          <p className="font-editorial text-[15px] text-[#E8EBE9] italic mb-1">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] text-[#A6B0AC]">{content.morningSeed.reference}</span>
        </div>

        <button
          type="button"
          onClick={onFinishAndRest}
          className="min-h-[48px] px-6 py-3 rounded-[6px] border border-[#263330] hover:bg-[#161F1E] text-[#A6B0AC] hover:text-[#E8EBE9] text-[14px] font-medium transition-colors duration-150"
        >
          Volver a la portada
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-10">
      {/* Top back navigation */}
      <div className="flex items-center justify-between pb-4 border-b border-[#263330]">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Cambiar emoción</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase px-2.5 py-1 rounded-[4px] bg-[#1B322F] text-[#3D7D68] border border-[#2A6F68]/30">
            {content.symptomLabel}
          </span>
        </div>
      </div>

      {/* User's unloaded thought if present */}
      {userReflection && userReflection.trim() && (
        <div className="p-4 rounded-[8px] bg-[#121A18] border border-[#263330] text-[#A6B0AC]">
          <span className="text-[11px] uppercase tracking-[0.08em] text-[#6E7A75] block mb-1 font-medium">
            Carga entregada esta noche
          </span>
          <p className="font-editorial text-[15px] italic text-[#E8EBE9]">
            «{userReflection}»
          </p>
        </div>
      )}

      {/* 1. Fisiología: Pausa de respiración */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC]">
            Paso 1: Regular el cuerpo (Respiración diafragmática)
          </span>
          <button
            type="button"
            onClick={() => setShowSensoryModal(!showSensoryModal)}
            className="text-[12px] text-[#2A6F68] hover:text-[#35837B] font-medium flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>{showSensoryModal ? 'Ocultar anclaje 5-4-3-2-1' : 'Ver anclaje sensorial 5-4-3-2-1'}</span>
          </button>
        </div>
        <BreathingGuide />
      </section>

      {/* Anclaje sensorial complementario 5-4-3-2-1 si se activa */}
      {showSensoryModal && (
        <section className="animate-fade-in">
          <SensoryGrounding onFinish={() => setShowSensoryModal(false)} />
        </section>
      )}

      {/* 2. Promesa Bíblica Clave */}
      <section className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#A6B0AC]">
            <BookOpen className="w-4 h-4 text-[#A6B0AC]" strokeWidth={1.5} />
            <span className="text-[12px] font-medium tracking-[0.08em] uppercase">
              Paso 2: La verdad que desarma la culpa
            </span>
          </div>
          <span className="text-[12px] font-medium text-[#2A6F68] bg-[#121A18] px-2.5 py-1 rounded-[4px] border border-[#263330]">
            {content.scripture.reference}
          </span>
        </div>

        <blockquote className="font-editorial text-[19px] sm:text-[21px] text-[#E8EBE9] leading-[1.45] border-l-2 border-[#2A6F68] pl-4 py-1 italic">
          «{content.scripture.verse}»
        </blockquote>

        <p className="text-[13px] text-[#A6B0AC] leading-relaxed pt-1">
          {content.scripture.contextNote}
        </p>
      </section>

      {/* 3. Declaración de Anclaje */}
      <section className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#A6B0AC]">
          <Sparkles className="w-4 h-4 text-[#C99757]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#C99757]">
            Paso 3: Declaración de anclaje para tu mente
          </span>
        </div>

        <p className="font-editorial text-[18px] sm:text-[20px] text-[#E8EBE9] leading-relaxed">
          «{content.declaration}»
        </p>
        <span className="text-[12px] text-[#6E7A75] block">
          Léela despacio una o dos veces, respirando al terminar cada frase.
        </span>
      </section>

      {/* 4. Liturgia de Entrega en Tres Tiempos */}
      <section className="space-y-4">
        <div>
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-1">
            Paso 4: Oración guiada de entrega
          </span>
          <h3 className="font-editorial text-[22px] text-[#E8EBE9]">
            La liturgia de tres tiempos
          </h3>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="bg-[#161F1E] border border-[#263330] rounded-[8px] p-5">
            <h4 className="text-[14px] font-medium text-[#E8EBE9] mb-1">
              {content.liturgy.step1.title}
            </h4>
            <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
              {content.liturgy.step1.body}
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#161F1E] border border-[#263330] rounded-[8px] p-5">
            <h4 className="text-[14px] font-medium text-[#E8EBE9] mb-1">
              {content.liturgy.step2.title}
            </h4>
            <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
              {content.liturgy.step2.body}
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#161F1E] border border-[#263330] rounded-[8px] p-5">
            <h4 className="text-[14px] font-medium text-[#E8EBE9] mb-1">
              {content.liturgy.step3.title}
            </h4>
            <p className="font-editorial text-[15px] text-[#A6B0AC] leading-relaxed">
              {content.liturgy.step3.body}
            </p>
          </div>
        </div>
      </section>

      {/* Return Trigger: Ancla para el amanecer */}
      <section className="bg-[#121A18] border border-[#263330] rounded-[12px] p-5 sm:p-6 flex items-start gap-4">
        <div className="w-9 h-9 rounded-[6px] bg-[#161F1E] border border-[#263330] flex items-center justify-center shrink-0 text-[#C99757]">
          <SunMedium className="w-5 h-5" strokeWidth={1.5} />
        </div>
        <div>
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] block mb-1">
            Semilla para tu despertar
          </span>
          <p className="font-editorial text-[15px] text-[#E8EBE9] italic mb-1">
            «{content.morningSeed.verse}»
          </p>
          <span className="text-[12px] text-[#6E7A75]">{content.morningSeed.reference}</span>
        </div>
      </section>

      {/* Botón Canónico de Cierre */}
      <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <button
          type="button"
          onClick={onStartOver}
          className="min-h-[48px] px-5 py-2.5 rounded-[6px] border border-[#263330] hover:bg-[#161F1E] text-[14px] text-[#A6B0AC] hover:text-[#E8EBE9] transition-colors duration-150 order-2 sm:order-1"
        >
          Hacer otra entrega
        </button>

        <button
          type="button"
          onClick={() => setIsRestingMode(true)}
          className="w-full sm:w-auto min-h-[48px] px-7 py-3 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] active:bg-[#235E58] text-white text-[15px] font-medium transition-colors duration-150 flex items-center justify-center gap-2 order-1 sm:order-2"
        >
          <Moon className="w-4 h-4" strokeWidth={1.5} />
          <span>Apagar pantalla y descansar</span>
        </button>
      </div>
    </div>
  );
};
