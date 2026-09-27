import React from 'react';
import { SavedAnchor } from '../types';
import { ShieldAlert, Trash2, ArrowLeft, ArrowRight } from 'lucide-react';

interface HistoryViewProps {
  anchors: SavedAnchor[];
  onSelectAnchor: (anchor: SavedAnchor) => void;
  onStartNew: () => void;
  onClearAll: () => void;
  onBack: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  anchors,
  onSelectAnchor,
  onStartNew,
  onClearAll,
  onBack,
}) => {
  return (
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#263330]">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          <span>Volver al botiquín</span>
        </button>

        {anchors.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-[44px] px-3 py-2 text-[12px] text-[#A6B0AC] hover:text-[#9E4D4D] flex items-center gap-1.5 transition-colors duration-150"
            title="Limpiar registro guardado en este dispositivo"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Borrar historial</span>
          </button>
        )}
      </div>

      {anchors.length === 0 ? (
        /* Estado vacío canónico */
        <div className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-8 sm:p-12 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-full border border-[#2D3936] bg-[#121A18] flex items-center justify-center mb-5 text-[#6E7A75]">
            <ShieldAlert className="w-7 h-7" strokeWidth={1.5} />
          </div>
          <h2 className="font-editorial text-[22px] text-[#E8EBE9] mb-2">
            Ningún ancla guardada
          </h2>
          <p className="font-editorial text-[16px] text-[#A6B0AC] max-w-[420px] mb-8 leading-relaxed">
            No hay oraciones guardadas aún. Ancla tu primera entrega nocturna.
          </p>
          <button
            type="button"
            onClick={onStartNew}
            className="min-h-[48px] px-6 py-3 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] active:bg-[#235E58] text-white text-[15px] font-medium transition-colors duration-150 flex items-center gap-2"
          >
            <span>Comenzar entrega nocturna</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      ) : (
        /* List of saved entries */
        <div className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-editorial text-[24px] text-[#E8EBE9]">
              Tus entregas nocturnas
            </h2>
            <span className="text-[12px] tabular-nums text-[#6E7A75]">
              {anchors.length} {anchors.length === 1 ? 'registro' : 'registros'} en este dispositivo
            </span>
          </div>

          <div className="space-y-4">
            {anchors.map((item) => (
              <div
                key={item.id}
                className="bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 hover:border-[#3D4C47] transition-colors duration-150"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="text-[11px] font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded-[4px] bg-[#1B322F] text-[#3D7D68] border border-[#2A6F68]/30">
                    {item.symptomLabel}
                  </span>
                  <span className="text-[12px] tabular-nums text-[#6E7A75]">
                    {item.displayDate}
                  </span>
                </div>

                {item.userReflection && (
                  <p className="font-editorial text-[15px] text-[#A6B0AC] italic mb-4 border-l-2 border-[#2D3936] pl-3 py-0.5">
                    «{item.userReflection}»
                  </p>
                )}

                <div className="text-[14px] text-[#E8EBE9] font-editorial mb-2 line-clamp-2">
                  {item.declaration}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#263330]/60 mt-4">
                  <span className="text-[12px] font-medium text-[#A6B0AC]">
                    {item.scriptureRef}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectAnchor(item)}
                    className="min-h-[44px] px-3 py-1 text-[13px] font-medium text-[#2A6F68] hover:text-[#35837B] flex items-center gap-1"
                  >
                    <span>Meditar en esta ancla</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={onStartNew}
              className="min-h-[48px] px-6 py-3 rounded-[6px] border border-[#263330] hover:bg-[#161F1E] text-[#E8EBE9] text-[14px] font-medium transition-colors duration-150"
            >
              Hacer una nueva entrega ahora
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
