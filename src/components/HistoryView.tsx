import React from 'react';
import { SavedAnchor } from '../types';
import { ShieldAlert, Trash2, ArrowLeft, ArrowRight, Bookmark, BookOpen, Heart } from 'lucide-react';

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
    <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Header row */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
          <span>Volver al botiquín</span>
        </button>

        {anchors.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-[36px] px-3 py-1.5 text-[12px] text-[#64748B] hover:text-[#DC2626] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Limpiar registro guardado en este dispositivo"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Borrar historial</span>
          </button>
        )}
      </div>

      {anchors.length === 0 ? (
        /* Estado vacío canónico */
        <div className="bg-white border border-[#CBD5E1] rounded-[20px] p-8 sm:p-12 text-center flex flex-col items-center shadow-xs">
          <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border border-[#FDE68A] flex items-center justify-center mb-5 text-[#D97706]">
            <Bookmark className="w-7 h-7 text-[#D97706]" strokeWidth={1.8} />
          </div>
          <h2 className="font-serif text-[22px] sm:text-[25px] text-[#0B1E36] font-normal mb-2">
            Ninguna promesa guardada aún
          </h2>
          <p className="text-[14px] text-[#64748B] max-w-[420px] mb-8 leading-relaxed">
            Aquí se guardarán de forma privada tus oraciones y anclas espirituales para que puedas volver a ellas en cualquier momento.
          </p>
          <button
            type="button"
            onClick={onStartNew}
            className="min-h-[48px] px-6 py-2.5 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[14px] font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer border border-[#F59E0B]/30"
          >
            <span>Buscar a Dios ahora</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
          </button>
        </div>
      ) : (
        /* Lista de anclas guardadas */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#D97706]">
              Tus Anclas Espirituales Guardadas ({anchors.length})
            </span>
            <span className="text-[11px] text-[#64748B]">
              Almacenadas localmente y protegidas
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {anchors.map((anchor) => (
              <button
                key={anchor.id}
                type="button"
                onClick={() => onSelectAnchor(anchor)}
                className="p-5 rounded-[16px] bg-white border border-[#CBD5E1] hover:border-[#F59E0B] text-left transition-all shadow-xs hover:shadow-md group cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B45309] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                      {anchor.symptomLabel}
                    </span>
                    <span className="text-[11px] text-[#64748B]">{anchor.displayDate}</span>
                  </div>

                  <p className="font-serif text-[15px] text-[#0B1E36] italic line-clamp-1">
                    «{anchor.declaration}»
                  </p>

                  {anchor.userReflection && (
                    <p className="text-[12px] text-[#64748B] line-clamp-1">
                      Tu desahogo: «{anchor.userReflection}»
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-[12px] font-bold text-[#D97706] group-hover:underline">
                    Reabrir ancla
                  </span>
                  <ArrowRight className="w-4 h-4 text-[#D97706] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={onStartNew}
              className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 text-[#060F1E] text-[13.5px] font-bold transition-all shadow-sm cursor-pointer"
            >
              Realizar una nueva entrega a Dios
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
