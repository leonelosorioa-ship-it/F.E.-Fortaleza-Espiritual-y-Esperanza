import React, { useState, useEffect } from 'react';
import { GratitudeEntry } from '../types';
import { HeartHandshake, Plus, Trash2, CheckCircle2, Sparkles } from 'lucide-react';

export const GratitudeJournal: React.FC = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [item1, setItem1] = useState<string>('');
  const [item2, setItem2] = useState<string>('');
  const [item3, setItem3] = useState<string>('');
  const [isSavedRecently, setIsSavedRecently] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('fe_gratitude_entries');
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const items = [item1.trim(), item2.trim(), item3.trim()].filter(Boolean);
    if (items.length === 0) return;

    const newEntry: GratitudeEntry = {
      id: 'gratitude_' + Date.now(),
      dateISO: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('es-ES', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
      items,
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem('fe_gratitude_entries', JSON.stringify(updated));
    } catch {
      // Ignore
    }

    setItem1('');
    setItem2('');
    setItem3('');
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    try {
      localStorage.setItem('fe_gratitude_entries', JSON.stringify(updated));
    } catch {
      // Ignore
    }
  };

  return (
    <div className="w-full bg-[#161F1E] border border-[#263330] rounded-[12px] p-6 sm:p-7 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#263330]">
        <div className="flex items-center gap-2 text-[#A6B0AC]">
          <HeartHandshake className="w-4 h-4 text-[#C99757]" strokeWidth={1.5} />
          <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#C99757]">
            Diario de Gratitud Espiritual («Regalos de Hoy»)
          </span>
        </div>
        <span className="text-[12px] text-[#6E7A75]">
          Neuroplasticidad y gracia
        </span>
      </div>

      <div>
        <h3 className="font-editorial text-[20px] text-[#E8EBE9] mb-1">
          Tres bendiciones concretas antes de dormir
        </h3>
        <p className="font-editorial text-[14px] text-[#A6B0AC] leading-relaxed">
          La ansiedad estrecha tu visión al peligro; la gratitud abre el lente gran angular hacia la fidelidad de Dios en lo pequeño.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <div>
          <label className="sr-only" htmlFor="gift-1">Regalo 1</label>
          <input
            id="gift-1"
            type="text"
            value={item1}
            onChange={(e) => setItem1(e.target.value)}
            placeholder="1. Una provisión, abrazo o detalle inadvertido de hoy…"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[6px] bg-[#121A18] border border-[#263330] text-[#E8EBE9] placeholder:text-[#6E7A75] text-[14px] font-editorial focus:outline-none focus:border-[#2A6F68]"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="gift-2">Regalo 2</label>
          <input
            id="gift-2"
            type="text"
            value={item2}
            onChange={(e) => setItem2(e.target.value)}
            placeholder="2. Una dificultad en la que Dios te sostuvo sin que colapsaras…"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[6px] bg-[#121A18] border border-[#263330] text-[#E8EBE9] placeholder:text-[#6E7A75] text-[14px] font-editorial focus:outline-none focus:border-[#2A6F68]"
          />
        </div>

        <div>
          <label className="sr-only" htmlFor="gift-3">Regalo 3</label>
          <input
            id="gift-3"
            type="text"
            value={item3}
            onChange={(e) => setItem3(e.target.value)}
            placeholder="3. Una promesa o momento de sosiego que agradeces esta noche…"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-[6px] bg-[#121A18] border border-[#263330] text-[#E8EBE9] placeholder:text-[#6E7A75] text-[14px] font-editorial focus:outline-none focus:border-[#2A6F68]"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {isSavedRecently ? (
            <span className="text-[13px] text-[#3D7D68] flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
              <span>Regalos guardados en tu corazón y equipo</span>
            </span>
          ) : (
            <span className="text-[12px] text-[#6E7A75]">
              No necesitas perfección; solo sinceridad
            </span>
          )}

          <button
            type="submit"
            className="min-h-[44px] px-4 py-2 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] active:bg-[#235E58] text-white text-[13px] font-medium transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
            <span>Guardar regalos de hoy</span>
          </button>
        </div>
      </form>

      {/* Historical entries */}
      {entries.length > 0 && (
        <div className="pt-4 border-t border-[#263330] space-y-3">
          <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#6E7A75] block">
            Tus memorias recientes de gracia
          </span>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {entries.slice(0, 3).map((entry) => (
              <div
                key={entry.id}
                className="p-3 rounded-[6px] bg-[#121A18] border border-[#263330]/80 flex items-start justify-between gap-3 text-[13px]"
              >
                <div className="space-y-1">
                  <span className="text-[11px] tabular-nums text-[#3D7D68] font-medium block">
                    {entry.displayDate}
                  </span>
                  <ul className="list-disc list-inside text-[#A6B0AC] font-editorial space-y-0.5">
                    {entry.items.map((item, idx) => (
                      <li key={idx} className="line-clamp-1">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-[#6E7A75] hover:text-[#9E4D4D] p-1"
                  title="Eliminar registro"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
