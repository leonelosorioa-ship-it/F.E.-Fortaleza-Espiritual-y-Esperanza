import React from 'react';
import { SavedAnchor } from '../types';
import { Trash2, ArrowLeft, ArrowRight, Bookmark, BookOpen } from 'lucide-react';

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
    <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Header row */}
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span>Volver al botiquín</span>
        </button>

        {anchors.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="min-h-[44px] px-3 py-1.5 text-[12px] text-[#94A3B8] hover:text-[#EF4444] flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Limpiar registro guardado en este equipo"
          >
            <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
            <span>Borrar historial</span>
          </button>
        )}
      </div>

      {anchors.length === 0 ? (
        /* Estado vacío canónico */
        <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-8 sm:p-12 text-center flex flex-col items-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center mb-4 text-[#F59E0B]">
            <Bookmark className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <h2 className="font-editorial text-[22px] sm:text-[24px] text-[#F1F5F9] font-normal mb-2">
            Ninguna promesa guardada aún
          </h2>
          <p className="text-[14px] text-[#94A3B8] max-w-[42ch] mb-6 leading-relaxed">
            Aquí se guardarán de forma privada tus oraciones y anclas espirituales para que puedas volver a ellas en cualquier momento.
          </p>
          <button
            type="button"
            onClick={onStartNew}
            className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] font-semibold text-[13.5px] transition-colors cursor-pointer shadow-md"
          >
            Buscar a Dios ahora
          </button>
        </div>
      ) : (
        /* List of saved anchors */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Oraciones Guardadas en tu Dispositivo ({anchors.length})
            </span>
          </div>

          <div className="space-y-3">
            {anchors.map((anchor) => (
              <div
                key={anchor.id}
                className="p-5 rounded-[16px] bg-[#0B1728] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10.5px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                        {anchor.symptomLabel}
                      </span>
                      <span className="text-[11.5px] text-[#94A3B8]">
                        {anchor.displayDate}
                      </span>
                    </div>
                    <span className="text-[12px] font-semibold text-[#10B981] flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                      {anchor.scriptureRef}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectAnchor(anchor)}
                    className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] bg-white/[0.04] hover:bg-[#F59E0B] hover:text-[#060F1E] text-[#F1F5F9] border border-white/[0.1] text-[12px] font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <span>Releer</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                </div>

                <p className="font-editorial text-[14px] italic text-[#CBD5E1] line-clamp-2 leading-relaxed">
                  «{anchor.declaration}»
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
