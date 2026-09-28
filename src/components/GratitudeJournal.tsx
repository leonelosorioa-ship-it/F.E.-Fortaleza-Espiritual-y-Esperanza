import React, { useState, useEffect } from 'react';
import { HeartHandshake, Plus, Trash2, CheckCircle2, Sparkles, Heart, Sprout, Flower2, TreePine, Sun, Cloud } from 'lucide-react';
import { GratitudeEntry } from '../types';
import { auth } from '../firebase';
import {
  subscribeToGratitudeEntries,
  persistGratitudeEntry,
} from '../services/firestoreService';
import { User } from 'firebase/auth';

export const GratitudeJournal: React.FC = () => {
  const [entries, setEntries] = useState<GratitudeEntry[]>([]);
  const [item1, setItem1] = useState<string>('');
  const [item2, setItem2] = useState<string>('');
  const [item3, setItem3] = useState<string>('');
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    let unsubFirestore: (() => void) | null = null;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        unsubFirestore = subscribeToGratitudeEntries(user.uid, (cloudEntries) => {
          setEntries(cloudEntries);
          try {
            localStorage.setItem('fe_gratitude_entries', JSON.stringify(cloudEntries));
          } catch {
            // Ignore
          }
        });
      } else {
        try {
          const stored = localStorage.getItem('fe_gratitude_entries');
          if (stored) {
            setEntries(JSON.parse(stored));
          }
        } catch {
          // Ignore storage errors
        }
      }
    });

    return () => {
      unsubAuth();
      if (unsubFirestore) unsubFirestore();
    };
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const items = [item1.trim(), item2.trim(), item3.trim()].filter((i) => i.length > 0);
    if (items.length === 0) return;

    const newEntry: GratitudeEntry = {
      id: Date.now().toString(),
      dateISO: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
      items,
    };

    if (currentUser) {
      persistGratitudeEntry(currentUser.uid, newEntry).catch(console.error);
    }

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
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
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

  // Botanical Garden Progression Level
  const totalEntries = entries.length;
  const gardenStage =
    totalEntries === 0
      ? { level: 0, title: 'Tierra Preparada', desc: 'Siembra tu primera semilla de agradecimiento hoy.' }
      : totalEntries < 3
      ? { level: 1, title: 'Primeros Brotes', desc: 'Las semillas de gratitud comienzan a abrirse en tu corazón.' }
      : totalEntries < 7
      ? { level: 2, title: 'Hojas de Olivo', desc: 'Tu mente se entrena a reconocer los favores diarios de Dios.' }
      : totalEntries < 14
      ? { level: 3, title: 'Ramas en Crecimiento', desc: 'Un árbol de paz plantado junto a corrientes de aguas vivas.' }
      : { level: 4, title: 'Jardín Florecido', desc: 'Abundancia de alabanza y reposo firme en la providencia del Padre.' };

  return (
    <div className="w-full max-w-[720px] mx-auto space-y-7 animate-fade-in">
      {/* Header */}
      <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#10B981]" strokeWidth={1.75} />
            <span className="text-[11.5px] font-semibold tracking-wider uppercase text-[#CBD5E1]">
              Diario Espiritual • Cuadrante Alma
            </span>
          </div>
          <span className="text-[12px] font-medium text-[#F59E0B] tabular-nums">
            {totalEntries} ofrendas sembradas
          </span>
        </div>

        <h1 className="font-editorial text-[24px] sm:text-[28px] text-[#F1F5F9] font-normal leading-snug">
          Jardín de Gratitud y Alabanza
        </h1>
        <p className="text-[14px] text-[#94A3B8] leading-relaxed">
          «Bendice, alma mía, al Señor, y no olvides ninguno de sus beneficios» (Salmo 103:2). Nombrar tres muestras de su fidelidad antes de dormir calma la amígdala cerebral y entrena el reposo.
        </p>
      </div>

      {/* Visual Progressive Garden Banner */}
      <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-[#0B1728] via-[#0E223D] to-[#0A1A2F] border border-white/[0.08] p-5 sm:p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <Sprout className="w-4 h-4 text-[#10B981]" strokeWidth={1.75} />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#34D399]">
                Etapa {gardenStage.level}: {gardenStage.title}
              </span>
            </div>
            <p className="text-[13px] text-[#CBD5E1]">
              {gardenStage.desc}
            </p>
          </div>

          {/* SVG Botanical Representation */}
          <div className="relative w-40 h-20 shrink-0 flex items-center justify-center">
            <svg viewBox="0 0 160 80" className="w-full h-full" fill="none">
              {/* Soil line */}
              <path d="M10 70 Q 80 66 150 70" stroke="#334155" strokeWidth="2" strokeLinecap="round" />

              {/* Seed/Sprout Elements depending on stage */}
              {gardenStage.level >= 0 && (
                <circle cx="80" cy="68" r="3.5" fill="#F59E0B" opacity="0.8" />
              )}

              {gardenStage.level >= 1 && (
                <g>
                  <path d="M80 68 Q 80 50 74 42" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
                  <path d="M74 42 C 65 38 68 48 74 42 Z" fill="#34D399" />
                </g>
              )}

              {gardenStage.level >= 2 && (
                <g>
                  <path d="M80 56 Q 88 46 92 40" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M92 40 C 98 42 96 34 92 40 Z" fill="#10B981" />
                  <path d="M80 48 Q 72 38 68 32" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M68 32 C 62 30 65 38 68 32 Z" fill="#6EE7B7" />
                </g>
              )}

              {gardenStage.level >= 3 && (
                <g>
                  <path d="M80 68 L 80 28" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                  <path d="M80 34 Q 96 26 104 22" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M104 22 C 110 24 108 16 104 22 Z" fill="#34D399" />
                  <path d="M80 26 Q 66 20 60 16" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                  <path d="M60 16 C 54 18 56 12 60 16 Z" fill="#6EE7B7" />
                </g>
              )}

              {gardenStage.level >= 4 && (
                <g>
                  {/* Golden central flower bloom */}
                  <circle cx="80" cy="22" r="5" fill="#F59E0B" />
                  <circle cx="80" cy="14" r="3" fill="#FDE68A" opacity="0.9" />
                  <circle cx="88" cy="22" r="3" fill="#FDE68A" opacity="0.9" />
                  <circle cx="72" cy="22" r="3" fill="#FDE68A" opacity="0.9" />
                  <circle cx="80" cy="30" r="3" fill="#FDE68A" opacity="0.9" />
                  {/* Sun glow */}
                  <circle cx="130" cy="24" r="8" fill="#F59E0B" opacity="0.25" />
                  <circle cx="130" cy="24" r="4" fill="#F59E0B" opacity="0.8" />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Form: 3 Gifts of Grace */}
      <form onSubmit={handleSave} className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-6 sm:p-7 space-y-4">
        <h2 className="font-editorial text-[18px] text-[#F1F5F9] font-normal">
          Tres regalos de gracia hoy
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/[0.05] text-[#F59E0B] border border-white/[0.08] text-[12px] font-semibold flex items-center justify-center shrink-0">
              1
            </span>
            <input
              type="text"
              value={item1}
              onChange={(e) => setItem1(e.target.value)}
              placeholder="Un detalle de amor, una provisión o un momento de paz..."
              className="min-h-[44px] flex-1 px-4 py-2.5 rounded-[12px] bg-[#060F1E] border border-white/[0.08] text-[#F1F5F9] placeholder:text-[#64748B] text-[13.5px] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/[0.05] text-[#F59E0B] border border-white/[0.08] text-[12px] font-semibold flex items-center justify-center shrink-0">
              2
            </span>
            <input
              type="text"
              value={item2}
              onChange={(e) => setItem2(e.target.value)}
              placeholder="Una palabra de aliento o alguien a quien diste las gracias..."
              className="min-h-[44px] flex-1 px-4 py-2.5 rounded-[12px] bg-[#060F1E] border border-white/[0.08] text-[#F1F5F9] placeholder:text-[#64748B] text-[13.5px] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-white/[0.05] text-[#F59E0B] border border-white/[0.08] text-[12px] font-semibold flex items-center justify-center shrink-0">
              3
            </span>
            <input
              type="text"
              value={item3}
              onChange={(e) => setItem3(e.target.value)}
              placeholder="El simple hecho de tener vida, aire y perdón de Dios..."
              className="min-h-[44px] flex-1 px-4 py-2.5 rounded-[12px] bg-[#060F1E] border border-white/[0.08] text-[#F1F5F9] placeholder:text-[#64748B] text-[13.5px] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-[12.5px] font-semibold text-[#10B981] flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
              Ofrenda guardada en tu jardín
            </span>
          ) : (
            <span className="text-[11.5px] text-[#64748B]">
              Se almacena de forma privada en tu equipo
            </span>
          )}

          <button
            type="submit"
            className="min-h-[44px] px-5 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] font-semibold text-[13px] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span>Sembrar agradecimiento</span>
          </button>
        </div>
      </form>

      {/* History of Gratitude */}
      {entries.length > 0 && (
        <div className="space-y-3">
          <span className="text-[12px] font-semibold uppercase tracking-wider text-[#CBD5E1] block">
            Cosecha de Días Anteriores
          </span>

          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-5 rounded-[16px] bg-[#0B1728] border border-white/[0.08] space-y-2.5"
              >
                <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                  <span className="text-[12.5px] font-semibold text-[#F59E0B] capitalize">
                    {entry.displayDate}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    className="min-h-[36px] min-w-[36px] text-[#64748B] hover:text-[#EF4444] transition-colors flex items-center justify-center cursor-pointer"
                    aria-label="Eliminar entrada de gratitud"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                </div>

                <ul className="space-y-1.5 text-[13.5px] text-[#CBD5E1]">
                  {entry.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Heart className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-1" strokeWidth={1.75} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
