import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Wind, Eye, Play, Pause, RotateCcw, Heart, ArrowRight } from 'lucide-react';

interface FaithRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDiagnostic: () => void;
}

export const FaithRescueModal: React.FC<FaithRescueModalProps> = ({
  isOpen,
  onClose,
  onOpenDiagnostic,
}) => {
  const [activeTab, setActiveTab] = useState<'respiracion' | 'anclaje'>('respiracion');
  const [phase, setPhase] = useState<'inhalar' | 'sostener' | 'exhalar' | 'reposar'>('inhalar');
  const [seconds, setSeconds] = useState<number>(4);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Box breathing 4-4-4-4 timer
  useEffect(() => {
    if (!isOpen || !isRunning || activeTab !== 'respiracion') return;

    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev > 1) return prev - 1;

        if (phase === 'inhalar') {
          setPhase('sostener');
          return 4;
        } else if (phase === 'sostener') {
          setPhase('exhalar');
          return 4;
        } else if (phase === 'exhalar') {
          setPhase('reposar');
          return 4;
        } else {
          setPhase('inhalar');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isRunning, phase, activeTab]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F172A]/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rescue-modal-title"
    >
      <div className="relative w-full max-w-[560px] bg-[#1E293B] border border-[#334155] rounded-[16px] p-5 sm:p-6 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#334155]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center text-[#F59E0B]">
              <ShieldAlert className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-[#F59E0B] block">
                Bypass de Emergencia Inmediato
              </span>
              <h2 id="rescue-modal-title" className="font-editorial text-[20px] sm:text-[22px] text-[#F8FAFC] font-normal leading-snug">
                Botiquín de Rescate • Primeros Auxilios
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] text-[#94A3B8] hover:text-[#F8FAFC] rounded-[8px] hover:bg-[#334155] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Cerrar botiquín de rescate"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Mensaje de validación inmediata */}
        <div className="p-3.5 rounded-[8px] bg-[#0F172A] border border-[#334155] flex items-start gap-3">
          <Heart className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" strokeWidth={2} />
          <p className="text-[12.5px] text-[#94A3B8] leading-relaxed">
            <strong className="text-[#F8FAFC]">Estás a salvo:</strong> Tu cuerpo está respondiendo a una sobrecarga, pero este instante pasará. No intentes forzar pensamientos heroicos; permite que tu ritmo biológico disminuya.
          </p>
        </div>

        {/* Selector de modo somático */}
        <div className="flex items-center gap-2 p-1 bg-[#0F172A] rounded-[8px] border border-[#334155]">
          <button
            type="button"
            onClick={() => setActiveTab('respiracion')}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-[6px] text-[12.5px] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'respiracion'
                ? 'bg-[#1E293B] text-[#0D9488] border border-[#0D9488]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Respiración Rítmica 4×4</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anclaje')}
            className={`flex-1 min-h-[44px] px-3 py-2 rounded-[6px] text-[12.5px] font-medium transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === 'anclaje'
                ? 'bg-[#1E293B] text-[#0D9488] border border-[#0D9488]/40 shadow-xs'
                : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Anclaje Sensorial 5-4-3-2-1</span>
          </button>
        </div>

        {/* Tab 1: Respiración Rítmica Guiada */}
        {activeTab === 'respiracion' && (
          <div className="space-y-4">
            <div className="py-6 px-4 rounded-[12px] bg-[#0F172A] border border-[#334155] flex flex-col items-center justify-center text-center space-y-3">
              {/* Círculo animado de respiración */}
              <div
                className={`w-28 h-28 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-1000 ${
                  phase === 'inhalar'
                    ? 'scale-110 border-[#0D9488] bg-[#0D9488]/15 text-[#0D9488]'
                    : phase === 'sostener'
                    ? 'scale-110 border-[#F59E0B] bg-[#F59E0B]/15 text-[#F59E0B]'
                    : phase === 'exhalar'
                    ? 'scale-90 border-[#334155] bg-[#334155]/20 text-[#94A3B8]'
                    : 'scale-90 border-[#334155] bg-[#0F172A] text-[#94A3B8]'
                }`}
              >
                <span className="text-[28px] font-bold tabular-nums">
                  {seconds}
                </span>
                <span className="text-[10.5px] uppercase tracking-wider font-semibold">
                  {phase === 'inhalar'
                    ? 'Inhala verdad'
                    : phase === 'sostener'
                    ? 'Guarda la paz'
                    : phase === 'exhalar'
                    ? 'Exhala angustia'
                    : 'Reposa'}
                </span>
              </div>

              <div className="space-y-0.5">
                <p className="text-[13px] text-[#F8FAFC] font-medium">
                  {phase === 'inhalar' && 'Respira profundo por la nariz: Dios está presente aquí.'}
                  {phase === 'sostener' && 'Sostén con calma: su gracia te sostiene en este segundo.'}
                  {phase === 'exhalar' && 'Suelta el aire por la boca: rinde la necesidad de controlar.'}
                  {phase === 'reposar' && 'Quédate vacío/a y en quietud: no tienes que luchar solo/a.'}
                </p>
                <span className="text-[11px] text-[#94A3B8] block">
                  Ciclo de 4 tiempos para desacelerar la respuesta de lucha o huida.
                </span>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsRunning(!isRunning)}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[12px] font-medium text-[#F8FAFC] border border-[#334155] flex items-center gap-1.5 cursor-pointer"
                >
                  {isRunning ? <Pause className="w-3.5 h-3.5 text-[#F59E0B]" /> : <Play className="w-3.5 h-3.5 text-[#0D9488]" />}
                  <span>{isRunning ? 'Pausar' : 'Reanudar'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPhase('inhalar');
                    setSeconds(4);
                  }}
                  className="min-h-[44px] px-3.5 py-1.5 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[12px] font-medium text-[#94A3B8] hover:text-[#F8FAFC] border border-[#334155] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reiniciar</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Anclaje Sensorial 5-4-3-2-1 */}
        {activeTab === 'anclaje' && (
          <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-2.5 text-[12.5px] text-[#94A3B8]">
            <p className="text-[#F8FAFC] font-medium">
              Mira a tu alrededor en este instante y nombra en voz baja:
            </p>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-[4px] bg-[#0D9488]/20 text-[#0D9488] font-bold text-[11px] flex items-center justify-center shrink-0">5</span>
                <span><strong>5 cosas que puedas ver:</strong> una lámpara, tus manos, la pared, un libro, el piso.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-[4px] bg-[#0D9488]/20 text-[#0D9488] font-bold text-[11px] flex items-center justify-center shrink-0">4</span>
                <span><strong>4 cosas que puedas tocar:</strong> la tela de tu ropa, la textura de la mesa, el peso de tu cuerpo en el asiento.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-[4px] bg-[#0D9488]/20 text-[#0D9488] font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                <span><strong>3 sonidos que puedas escuchar:</strong> el viento, un zumbido lejano, tu propia respiración.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-[4px] bg-[#0D9488]/20 text-[#0D9488] font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                <span><strong>2 aromas que puedas percibir:</strong> el aire fresco, el aroma de una infusión o de tu espacio.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-[4px] bg-[#0D9488]/20 text-[#0D9488] font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                <span><strong>1 certeza espiritual:</strong> Dios no te ha abandonado; su fidelidad está viva aquí y ahora.</span>
              </li>
            </ul>
          </div>
        )}

        {/* Oración de 3 líneas y promesa bíblica inmediata */}
        <div className="p-4 rounded-[12px] bg-[#0F172A] border border-[#334155] space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] block">
            Oración simple de entrega para susurrar:
          </span>
          <p className="text-[13px] text-[#F8FAFC] leading-relaxed italic">
            «Señor, no puedo con esto con mis solas fuerzas. En este segundo te entrego mi respiración y mi mente. Tú tienes el control y yo descanso en tu paz.»
          </p>
          <div className="pt-1 border-t border-[#334155] flex justify-between items-center text-[11px] text-[#94A3B8]">
            <span>Salmo 46:1 • «Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.»</span>
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#334155]">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-[8px] bg-[#1E293B] hover:bg-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] text-[13px] font-medium border border-[#334155] transition-colors cursor-pointer"
          >
            Ya me siento con más sosiego
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDiagnostic();
            }}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2 rounded-[8px] bg-[#0D9488] hover:bg-[#0F766E] text-[#F8FAFC] text-[13px] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Generar mi ancla de paz completa</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
