/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SymptomId, SavedAnchor, AnchorContent, UserRoleProfile } from './types';
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
  const [activeContent, setActiveContent] = useState<AnchorContent>(ANCHOR_DATA.presencia);
  const [currentReflection, setCurrentReflection] = useState<string>('');
  const [activeRole, setActiveRole] = useState<UserRoleProfile>('hombre_fe');
  const [formInitialRole, setFormInitialRole] = useState<UserRoleProfile>('hombre_fe');
  const [formInitialSymptom, setFormInitialSymptom] = useState<SymptomId>('presencia');
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

  const handleStartFlow = (role: UserRoleProfile = 'hombre_fe', symptom: SymptomId = 'presencia') => {
    setFormInitialRole(role);
    setFormInitialSymptom(symptom);
    setCurrentScreen('form');
  };

  const handleSymptomSubmit = (symptomId: SymptomId, reflection: string, roleProfile: UserRoleProfile) => {
    const content = ANCHOR_DATA[symptomId] || ANCHOR_DATA.presencia;
    setActiveContent(content);
    setCurrentReflection(reflection);
    setActiveRole(roleProfile);

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
        roleProfile: roleProfile,
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
    const content = ANCHOR_DATA[anchor.symptomId] || ANCHOR_DATA.presencia;
    setActiveContent(content);
    setCurrentReflection(anchor.userReflection || '');
    if (anchor.roleProfile) {
      setActiveRole(anchor.roleProfile);
    }
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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0B132B] flex flex-col font-ui selection:bg-[#F59E0B] selection:text-[#060F1E]">
      {/* Cintillo Canónico de Modo Sin Conexión */}
      {isOffline && (
        <div
          role="status"
          className="w-full bg-[#060F1E] text-white py-2 px-4 text-center flex items-center justify-center gap-2 text-[12px] border-b border-[#F59E0B]/30"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={2} />
          <span>Modo refugio offline activado. Todo tu mapa y botiquín espiritual funcionan sin red.</span>
        </div>
      )}

      {/* Barra de navegación superior sobria y de alto impacto */}
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
            initialRole={formInitialRole}
            initialSymptom={formInitialSymptom}
          />
        )}

        {/* Estado de Carga Apacible */}
        {currentScreen === 'loading' && (
          <div className="w-full max-w-[720px] mx-auto px-4 py-28 flex flex-col items-center justify-center text-center">
            <div className="w-13 h-13 border-4 border-[#E2E8F0] border-t-[#F59E0B] rounded-full animate-spin mb-6" />
            <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-[#D97706] mb-2">
              Pausa de Gracia y Alineación
            </span>
            <p className="font-serif text-[24px] sm:text-[26px] text-[#0B1E36]">
              Trazando tu mapa en la presencia de Dios…
            </p>
            <p className="text-[14px] text-[#64748B] mt-2 max-w-[420px]">
              Inhala despacio mientras se prepara tu ancla bíblica y tu oración de entrega.
            </p>
          </div>
        )}

        {currentScreen === 'result' && (
          <ResultScreen
            content={activeContent}
            userReflection={currentReflection}
            roleProfile={activeRole}
            onFinishAndRest={() => setCurrentScreen('landing')}
            onStartOver={() => setCurrentScreen('form')}
          />
        )}

        {currentScreen === 'peace_plan' && (
          <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
                <span>Volver al botiquín</span>
              </button>
            </div>
            <PeacePlanView onOpenPlanDetails={() => setIsPlanOpen(true)} />
          </div>
        )}

        {currentScreen === 'gratitude' && (
          <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
                <span>Volver al botiquín</span>
              </button>
            </div>
            <GratitudeJournal />
          </div>
        )}

        {currentScreen === 'audios' && (
          <div className="w-full max-w-[840px] mx-auto px-4 sm:px-6 py-8">
            <div className="mb-6">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] text-[#475569] hover:text-[#0B1E36] hover:bg-[#F1F5F9] text-[13px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={2.5} />
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
            <div className="w-14 h-14 rounded-full border border-[#FECACA] bg-[#FEF2F2] flex items-center justify-center mb-5 text-[#DC2626]">
              <CloudOff className="w-7 h-7" strokeWidth={1.8} />
            </div>
            <h2 className="font-serif text-[24px] text-[#0B1E36] mb-2">
              Conexión temporalmente interrumpida
            </h2>
            <p className="text-[15px] text-[#64748B] max-w-[420px] mb-8 leading-relaxed">
              Tus oraciones y anclas permanecen a salvo en tu dispositivo. Puedes leerlas y meditar en ellas sin conexión a internet.
            </p>
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[48px] px-6 py-3 rounded-[12px] bg-[#060F1E] hover:bg-[#0B1E36] text-white text-[14px] font-bold transition-all flex items-center gap-2 cursor-pointer shadow-md border border-[#F59E0B]/30"
            >
              <RefreshCw className="w-4 h-4 text-[#F59E0B]" strokeWidth={2} />
              <span>Reintentar conexión</span>
            </button>
          </div>
        )}
      </main>

      {/* Pie de página sobrio y de alto impacto */}
      <footer className="w-full border-t border-[#CBD5E1] py-7 px-4 text-center bg-white mt-12">
        <div className="max-w-[840px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#64748B]">
          <div>
            El Mapa de tu Vida en Dios • F.E.™ Fortaleza Espiritual • Tu Poder Mental™
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlanOpen(true)}
              className="hover:text-[#D97706] font-bold transition-colors cursor-pointer"
            >
              Proceso 30 Días con Clara Luz y Leo (12.99 USD - Pago Único)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setCurrentScreen('error')}
              className="hover:text-[#0B1E36] transition-colors cursor-pointer"
              title="Comprobar pantalla de error canónica"
            >
              Simular error
            </button>
            <span>•</span>
            <span>Uso privado y seguro en tu equipo</span>
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
