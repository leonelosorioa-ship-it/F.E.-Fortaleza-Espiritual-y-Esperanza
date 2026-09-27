/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SymptomId, SavedAnchor, AnchorContent } from './types';
import { ANCHOR_DATA } from './data/anchors';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { SymptomFormScreen } from './components/SymptomFormScreen';
import { ResultScreen } from './components/ResultScreen';
import { HistoryView } from './components/HistoryView';
import { PeacePlanView } from './components/PeacePlanView';
import { GratitudeJournal } from './components/GratitudeJournal';
import { FaithAudioCatalog } from './components/FaithAudioCatalog';
import { PlanDetailsModal } from './components/PlanDetailsModal';
import { CloudOff, RefreshCw, WifiOff, ArrowLeft } from 'lucide-react';

type Screen = 'landing' | 'form' | 'loading' | 'result' | 'history' | 'peace_plan' | 'gratitude' | 'audios' | 'error';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [activeContent, setActiveContent] = useState<AnchorContent>(ANCHOR_DATA.ansiedad);
  const [currentReflection, setCurrentReflection] = useState<string>('');
  const [savedAnchors, setSavedAnchors] = useState<SavedAnchor[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [isPlanOpen, setIsPlanOpen] = useState<boolean>(false);

  // Load saved anchors from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('fe_saved_anchors');
      if (stored) {
        setSavedAnchors(JSON.parse(stored));
      }
    } catch {
      // Fallback in case of storage quota or privacy mode
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleStartFlow = () => {
    setCurrentScreen('form');
  };

  const handleSymptomSubmit = (symptomId: SymptomId, reflection: string) => {
    const content = ANCHOR_DATA[symptomId];
    setActiveContent(content);
    setCurrentReflection(reflection);

    // Show peaceful loading state for 1.2s to encourage breathing pause
    setCurrentScreen('loading');
    setTimeout(() => {
      // Save entry to local storage
      const newEntry: SavedAnchor = {
        id: 'anchor_' + Date.now(),
        dateISO: new Date().toISOString(),
        displayDate: new Date().toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }),
        symptomId: symptomId,
        symptomLabel: content.symptomLabel,
        userReflection: reflection.trim() || undefined,
        scriptureRef: content.scripture.reference,
        declaration: content.declaration,
      };

      try {
        const updated = [newEntry, ...savedAnchors];
        setSavedAnchors(updated);
        localStorage.setItem('fe_saved_anchors', JSON.stringify(updated));
      } catch {
        // Safe local fallback
      }

      setCurrentScreen('result');
    }, 1200);
  };

  const handleSelectFromHistory = (anchor: SavedAnchor) => {
    const content = ANCHOR_DATA[anchor.symptomId] || ANCHOR_DATA.ansiedad;
    setActiveContent(content);
    setCurrentReflection(anchor.userReflection || '');
    setCurrentScreen('result');
  };

  const handleClearHistory = () => {
    setSavedAnchors([]);
    try {
      localStorage.removeItem('fe_saved_anchors');
    } catch {
      // Ignore
    }
  };

  const handleToggleOffline = () => {
    setIsOffline((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0E1413] text-[#E8EBE9] flex flex-col font-ui selection:bg-[#2A6F68] selection:text-white">
      {/* Cintillo Canónico de Modo Sin Conexión */}
      {isOffline && (
        <div
          role="status"
          className="w-full bg-[#1A2422] border-b border-[#263330] py-2 px-4 text-center flex items-center justify-center gap-2 text-[#A6B0AC] text-[12px]"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#3D7D68]" strokeWidth={1.5} />
          <span>Modo refugio offline activado. Todo tu botiquín funciona sin red.</span>
        </div>
      )}

      {/* Barra de navegación superior sobria */}
      <Header
        onGoHome={() => setCurrentScreen('landing')}
        onOpenHistory={() => setCurrentScreen('history')}
        onOpenPlan={() => setIsPlanOpen(true)}
        onOpenPeacePlan={() => setCurrentScreen('peace_plan')}
        onOpenGratitude={() => setCurrentScreen('gratitude')}
        onOpenAudios={() => setCurrentScreen('audios')}
        savedCount={savedAnchors.length}
        isOfflineMode={isOffline}
        onToggleOffline={handleToggleOffline}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStartFlow={handleStartFlow}
            onOpenPlan={() => setIsPlanOpen(true)}
            onOpenPeacePlan={() => setCurrentScreen('peace_plan')}
            onOpenGratitude={() => setCurrentScreen('gratitude')}
            onOpenAudios={() => setCurrentScreen('audios')}
          />
        )}

        {currentScreen === 'form' && (
          <SymptomFormScreen
            onBack={() => setCurrentScreen('landing')}
            onSubmit={handleSymptomSubmit}
            isLoading={false}
          />
        )}

        {/* Estado Canónico de Carga */}
        {currentScreen === 'loading' && (
          <div className="w-full max-w-[720px] mx-auto px-4 py-28 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 border-2 border-[#263330] border-t-[#2A6F68] rounded-full animate-spin mb-6" />
            <span className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#A6B0AC] mb-2">
              Pausa de gracia
            </span>
            <p className="font-editorial text-[20px] text-[#E8EBE9]">
              Buscando refugio en la Palabra…
            </p>
            <p className="text-[13px] text-[#6E7A75] mt-2">
              Inhala despacio mientras se prepara tu ancla de paz.
            </p>
          </div>
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            content={activeContent}
            userReflection={currentReflection}
            onFinishAndRest={() => setCurrentScreen('landing')}
            onStartOver={() => setCurrentScreen('form')}
          />
        )}

        {currentScreen === 'peace_plan' && (
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                <span>Volver al botiquín</span>
              </button>
            </div>
            <PeacePlanView onOpenPlanDetails={() => setIsPlanOpen(true)} />
          </div>
        )}

        {currentScreen === 'gratitude' && (
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                <span>Volver al botiquín</span>
              </button>
            </div>
            <GratitudeJournal />
          </div>
        )}

        {currentScreen === 'audios' && (
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[44px] px-3 py-2 rounded-[6px] text-[#A6B0AC] hover:text-[#E8EBE9] hover:bg-[#161F1E] text-[13px] font-medium flex items-center gap-1.5 transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
                <span>Volver al botiquín</span>
              </button>
            </div>
            <FaithAudioCatalog onOpenPlanDetails={() => setIsPlanOpen(true)} />
          </div>
        )}

        {currentScreen === 'history' && (
          <HistoryView
            anchors={savedAnchors}
            onSelectAnchor={handleSelectFromHistory}
            onStartNew={() => setCurrentScreen('form')}
            onClearAll={handleClearHistory}
            onBack={() => setCurrentScreen('landing')}
          />
        )}

        {/* Estado Canónico de Error */}
        {currentScreen === 'error' && (
          <div className="w-full max-w-[720px] mx-auto px-4 py-20 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#263330] bg-[#121A18] flex items-center justify-center mb-5 text-[#9E4D4D]">
              <CloudOff className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-editorial text-[22px] text-[#E8EBE9] mb-2">
              Conexión interrumpida
            </h2>
            <p className="font-editorial text-[16px] text-[#A6B0AC] max-w-[420px] mb-8 leading-relaxed">
              Tu oración permanece a salvo en tu dispositivo. Puedes leerla y meditar en ella sin conexión.
            </p>
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[48px] px-6 py-3 rounded-[6px] bg-[#2A6F68] hover:bg-[#35837B] text-white text-[15px] font-medium transition-colors duration-150 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
              <span>Reintentar conexión</span>
            </button>
          </div>
        )}
      </main>

      {/* Pie de página sobrio */}
      <footer className="w-full border-t border-[#263330] py-6 px-4 text-center bg-[#0E1413]">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#6E7A75]">
          <div>
            F.E.™ Fortaleza Espiritual y Esperanza — Dimensión Trascendente de Tu Poder Mental™
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlanOpen(true)}
              className="hover:text-[#A6B0AC] transition-colors"
            >
              Plan 4.99 USD
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setCurrentScreen('error')}
              className="hover:text-[#A6B0AC] transition-colors"
              title="Comprobar pantalla de error canónica"
            >
              Simular error
            </button>
            <span>•</span>
            <span>Uso confidencial en tu equipo</span>
          </div>
        </div>
      </footer>

      {/* Modal de detalles de plan */}
      <PlanDetailsModal
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />
    </div>
  );
}
