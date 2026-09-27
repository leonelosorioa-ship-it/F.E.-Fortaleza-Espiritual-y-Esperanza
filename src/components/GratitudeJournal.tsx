import React, { useState, useEffect } from 'react';
import { GratitudeEntry } from '../types';
import { HeartHandshake, Plus, Trash2, CheckCircle2, Sparkles, Heart } from 'lucide-react';

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
    <div className="w-full bg-white border border-[#CBD5E1] rounded-[20px] p-6 sm:p-9 space-y-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2 text-[#0B1E36]">
          <HeartHandshake className="w-5 h-5 text-[#0D9488]" strokeWidth={2} />
          <span className="text-[12px] font-bold tracking-[0.08em] uppercase text-[#0B1E36]">
            Diario de Gratitud Espiritual («Regalos de Hoy»)
          </span>
        </div>
        <span className="text-[11px] font-bold uppercase px-3 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
          Cuadrante Mente & Neuroplasticidad
        </span>
      </div>

      <div>
        <h3 className="font-serif text-[22px] sm:text-[26px] text-[#0B1E36] font-normal mb-1">
          Tres bendiciones concretas antes de descansar
        </h3>
        <p className="text-[14px] text-[#475569] leading-relaxed">
          La mente humana tiende a fijarse en la amenaza y el problema. Entrenar tu atención en las bondades cotidianas de Dios estimula la calma fisiológica y disuelve el ruido mental.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        <div className="space-y-2">
          <input
            type="text"
            value={item1}
            onChange={(e) => setItem1(e.target.value)}
            placeholder="1. Una provisión, conversación o muestra de amor que viví hoy…"
            className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B132B] placeholder:text-[#64748B] text-[14px] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
          />
          <input
            type="text"
            value={item2}
            onChange={(e) => setItem2(e.target.value)}
            placeholder="2. Una dificultad en la que Dios me sostuvo o me dio paciencia…"
            className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B132B] placeholder:text-[#64748B] text-[14px] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
          />
          <input
            type="text"
            value={item3}
            onChange={(e) => setItem3(e.target.value)}
            placeholder="3. Un detalle simple que agradezco (un café, una respiración, un abrazo)…"
            className="w-full px-4 py-3 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] text-[#0B132B] placeholder:text-[#64748B] text-[14px] focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 transition-all"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            disabled={!item1.trim() && !item2.trim() && !item3.trim()}
            className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-110 disabled:opacity-50 text-[#060F1E] text-[13.5px] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4 text-[#060F1E]" strokeWidth={2.5} />
            <span>Guardar bendiciones de hoy</span>
          </button>

          {isSavedRecently && (
            <span className="text-[12.5px] text-[#059669] flex items-center gap-1.5 font-bold animate-fade-in">
              <CheckCircle2 className="w-4 h-4" />
              <span>Guardado en tu equipo</span>
            </span>
          )}
        </div>
      </form>

      {/* Historial de gratitudes */}
      {entries.length > 0 && (
        <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            Tus memorias de gracia recientes ({entries.length})
          </span>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-[12px] bg-[#F8FAFC] border border-[#CBD5E1] flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[11.5px] font-bold text-[#0D9488] block">
                    {entry.displayDate}
                  </span>
                  <ul className="list-disc list-inside text-[13px] text-[#334155] space-y-0.5">
                    {entry.items.map((it, idx) => (
                      <li key={idx}>{it}</li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="text-[#64748B] hover:text-[#DC2626] p-1 transition-colors cursor-pointer"
                  title="Eliminar registro"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
