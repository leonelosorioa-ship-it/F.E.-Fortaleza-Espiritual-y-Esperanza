import React, { useState } from 'react';
import { LifeQuadrant, SymptomId, UserRoleProfile } from '../types';
import { Activity, Brain, Heart, Compass, ArrowRight, Sparkles, CheckCircle2, Shield, Moon } from 'lucide-react';

interface MapaProps {
  onSelectQuadrantFlow: (symptomId: SymptomId, roleProfile?: UserRoleProfile) => void;
}

export const MapaCuadrantesInteractive: React.FC<MapaProps> = ({ onSelectQuadrantFlow }) => {
  const [selectedQuadrant, setSelectedQuadrant] = useState<LifeQuadrant>('mente');

  const quadrants = [
    {
      id: 'cuerpo' as LifeQuadrant,
      name: '1. CUERPO',
      tagline: 'Fisiología & Alivio del Insomnio',
      icon: Activity,
      color: '#10B981', // Emerald
      bgAccent: 'from-[#ECFDF5] to-[#D1FAE5]',
      borderAccent: 'border-[#10B981]',
      badge: 'Calma Biológica',
      diagnosis: 'Taquicardia, opresión en el pecho, tensión muscular o insomnio prolongado por sobreexigencia.',
      solution: 'Respiración diafragmática 4×4 y anclaje sensorial para desactivar el sistema simpático de alarma.',
      scripture: '«En paz me acostaré, y asimismo dormiré; porque solo tú, Señor, me haces vivir confiado.» (Salmo 4:8)',
      actionText: 'Calmar mi cuerpo ahora',
      targetSymptom: 'ansiedad_noche' as SymptomId,
    },
    {
      id: 'mente' as LifeQuadrant,
      name: '2. MENTE',
      tagline: 'Freno al Sobrepensamiento & Rumiación',
      icon: Brain,
      color: '#F59E0B', // Amber Gold
      bgAccent: 'from-[#FFFBEB] to-[#FEF3C7]',
      borderAccent: 'border-[#F59E0B]',
      badge: 'Claridad Mental',
      diagnosis: 'Bucle incesante de «¿y si pasa lo peor?», anticipación de catástrofes y rumiación al intentar descansar.',
      solution: 'Reestructuración cognitiva basada en Filipenses 4: sustituir escenarios falsos por soberanía divina.',
      scripture: '«Por nada estéis afanosos… y la paz de Dios guardará vuestros corazones y pensamientos.» (Filipenses 4:6-7)',
      actionText: 'Desarmar la rumiación',
      targetSymptom: 'confianza' as SymptomId,
    },
    {
      id: 'alma' as LifeQuadrant,
      name: '3. ALMA',
      tagline: 'Paz en la Gracia & Cero Culpa',
      icon: Heart,
      color: '#0D9488', // Deep Teal
      bgAccent: 'from-[#F0FDFA] to-[#CCFBF1]',
      borderAccent: 'border-[#0D9488]',
      badge: 'Sanidad Interior',
      diagnosis: 'Sentimiento de culpa religiosa: pensar que estar cansado o angustiado significa que «te falta fe».',
      solution: 'Acoger la gracia incondicional de Cristo. Dios no te pide perfección; te ofrece su abrazo en tu fragilidad.',
      scripture: '«Ahora, pues, ninguna condenación hay para los que están en Cristo Jesús.» (Romanos 8:1)',
      actionText: 'Descansar en su gracia',
      targetSymptom: 'perdon' as SymptomId,
    },
    {
      id: 'proposito' as LifeQuadrant,
      name: '4. PROPÓSITO',
      tagline: 'Dirección, Vocación & Hábitos Diarios',
      icon: Compass,
      color: '#6366F1', // Indigo Violet
      bgAccent: 'from-[#EEF2FF] to-[#E0E7FF]',
      borderAccent: 'border-[#6366F1]',
      badge: 'Acción y Sabiduría',
      diagnosis: 'Parálisis por análisis, desorden en las prioridades familiares y laborales, o temor al futuro económico.',
      solution: 'Alineación diaria con la voluntad de Dios y establecimiento de microhábitos de paz innegociables.',
      scripture: '«Fíate de Jehová de todo tu corazón… y él enderezará tus veredas.» (Proverbios 3:5-6)',
      actionText: 'Alinear mi propósito',
      targetSymptom: 'direccion' as SymptomId,
    },
  ];

  const current = quadrants.find((q) => q.id === selectedQuadrant) || quadrants[0];
  const CurrentIcon = current.icon;

  return (
    <div className="w-full bg-gradient-to-b from-[#060F1E] via-[#0B1E36] to-[#060F1E] text-white rounded-[20px] p-6 sm:p-9 shadow-xl border border-[#F59E0B]/30 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="relative z-10 text-center max-w-[620px] mx-auto mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#FBBF24] text-[11px] font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Metodología Integral de Transformación</span>
        </div>

        <h3 className="font-serif text-[24px] sm:text-[30px] text-white font-normal leading-tight">
          El Mapa de tu Vida en Dios
        </h3>
        <p className="text-[13.5px] sm:text-[14.5px] text-[#CBD5E1] leading-relaxed">
          Para que tu vida se ordene y la ansiedad ceda el paso a la paz, los 4 cuadrantes deben alinearse bajo la gracia divina: <strong>Cuerpo, Mente, Alma y Propósito</strong>. Toca cada cuadrante para diagnosticar tu estado y recibir la respuesta de Dios.
        </p>
      </div>

      {/* Interactive 4 Quadrants Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {quadrants.map((quad) => {
          const isSelected = selectedQuadrant === quad.id;
          const Icon = quad.icon;

          return (
            <button
              key={quad.id}
              type="button"
              onClick={() => setSelectedQuadrant(quad.id)}
              className={`p-4 rounded-[14px] text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[120px] ${
                isSelected
                  ? 'bg-gradient-to-b from-[#11243E] to-[#0A1728] border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.25)] ring-2 ring-[#F59E0B]/30'
                  : 'bg-[#091526]/80 border-[#1E3A5F] hover:border-[#F59E0B]/60 hover:bg-[#0D1E36]'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center"
                  style={{ backgroundColor: `${quad.color}25`, color: quad.color }}
                >
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-pulse" />
                )}
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase block text-[#FBBF24]">
                  {quad.name}
                </span>
                <span className="text-[12px] text-[#E2E8F0] font-medium line-clamp-1">
                  {quad.tagline}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Quadrant Detailed Card */}
      <div className="relative z-10 bg-[#0B1A2F] border-2 border-[#1E3A5F] rounded-[16px] p-5 sm:p-7 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1E3A5F]">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${current.color}25`, color: current.color }}
            >
              <CurrentIcon className="w-6 h-6" strokeWidth={2} />
            </div>
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: current.color }}>
                {current.badge}
              </span>
              <h4 className="font-serif text-[20px] sm:text-[22px] text-white font-normal">
                {current.name}: {current.tagline}
              </h4>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectQuadrantFlow(current.targetSymptom)}
            className="min-h-[44px] px-5 py-2.5 rounded-[10px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#F59E0B] text-[#060F1E] font-bold text-[13.5px] transition-all flex items-center justify-center gap-2 shrink-0 shadow-md cursor-pointer self-start sm:self-center"
          >
            <span>{current.actionText}</span>
            <ArrowRight className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-[12px] bg-[#071322] border border-[#162C47] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#EF4444] flex items-center gap-1.5">
              <span>⚠️</span> El síntoma o bloqueo en tu vida:
            </span>
            <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
              {current.diagnosis}
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#071322] border border-[#162C47] space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#10B981] flex items-center gap-1.5">
              <span>✨</span> El ancla y solución en Dios:
            </span>
            <p className="text-[13px] text-[#CBD5E1] leading-relaxed">
              {current.solution}
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-[10px] bg-[#081729] border border-[#1E3A5F] text-[13px] text-[#FBBF24] font-serif italic text-center">
          {current.scripture}
        </div>
      </div>
    </div>
  );
};
