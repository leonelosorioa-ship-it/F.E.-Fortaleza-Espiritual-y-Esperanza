/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SymptomId, SavedAnchor, AnchorContent, UserRoleProfile, ConversationalMood } from './types';
import { ANCHOR_DATA } from './data/anchors';
import { Header } from './components/Header';
import { LandingScreen } from './components/LandingScreen';
import { ConversationalDiagnosticScreen } from './components/ConversationalDiagnosticScreen';
import { HapticTransitionScreen } from './components/HapticTransitionScreen';
import { ResultScreen } from './components/ResultScreen';
import { HistoryView } from './components/HistoryView';
import { PeacePlanView } from './components/PeacePlanView';
import { GratitudeJournal } from './components/GratitudeJournal';
import { FaithAudioCatalog } from './components/FaithAudioCatalog';
import { PlanDetailsModal } from './components/PlanDetailsModal';
import { Day7PaywallView } from './components/Day7PaywallView';
import { EmergencyBypassButton } from './components/EmergencyBypassButton';
import { CloudOff, RefreshCw, WifiOff, ArrowLeft } from 'lucide-react';

type Screen =
  | 'landing'
  | 'form'
  | 'transition'
  | 'result'
  | 'history'
  | 'peace_plan'
  | 'day7_paywall'
  | 'gratitude'
  | 'audios'
  | 'error';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [activeContent, setActiveContent] = useState<AnchorContent>(ANCHOR_DATA.presencia);
  const [currentReflection, setCurrentReflection] = useState<string>('');
  const [activeRole, setActiveRole] = useState<UserRoleProfile>('madre_profesional');
  const [activeMood, setActiveMood] = useState<ConversationalMood>('insomnio');
  const [formInitialRole, setFormInitialRole] = useState<UserRoleProfile>('madre_profesional');
  const [formInitialSymptom, setFormInitialSymptom] = useState<SymptomId>('ansiedad_noche');
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
      // Safe fallback
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

  const handleStartFlow = (role: UserRoleProfile = 'madre_profesional', symptom: SymptomId = 'ansiedad_noche') => {
    setFormInitialRole(role);
    setFormInitialSymptom(symptom);
    setCurrentScreen('form');
  };

  const handleDiagnosticSubmit = (
    role: UserRoleProfile,
    symptomId: SymptomId,
    mood: ConversationalMood
  ) => {
    const content = ANCHOR_DATA[symptomId] || ANCHOR_DATA.ansiedad_noche;
    setActiveContent(content);
    setActiveRole(role);
    setActiveMood(mood);

    // Save anchor entry to local history
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
      roleProfile: role,
      symptomId: symptomId,
      symptomLabel: content.symptomLabel,
      scriptureRef: content.scripture.reference,
      declaration: content.declaration,
    };

    try {
      const updated = [newEntry, ...savedAnchors];
      setSavedAnchors(updated);
      localStorage.setItem('fe_saved_anchors', JSON.stringify(updated));
    } catch {
      // Safe local storage fallback
    }

    // Enter 2.5-3s Haptic Breathing Transition Screen
    setCurrentScreen('transition');
  };

  const handleTransitionComplete = () => {
    setCurrentScreen('result');
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
    <div className="min-h-screen bg-[#060F1E] text-[#F1F5F9] flex flex-col font-ui selection:bg-[#F59E0B] selection:text-[#060F1E]">
      {/* Cintillo de Modo Sin Conexión */}
      {isOffline && (
        <aside
          role="status"
          className="w-full bg-[#0B1728] text-[#F1F5F9] py-2 px-4 text-center flex items-center justify-center gap-2 text-[12px] border-b border-[#F59E0B]/30"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#F59E0B]" strokeWidth={1.75} />
          <span>Modo refugio offline activo. Todo tu botiquín y oraciones funcionan sin conexión.</span>
        </aside>
      )}

      {/* Barra de navegación superior sobria en Santuario Nocturno */}
      <Header
        onGoHome={() => setCurrentScreen('landing')}
        onOpenHistory={() => setCurrentScreen('history')}
        onOpenPlan={() => setIsPlanOpen(true)}
        onOpenPeacePlan={() => setCurrentScreen('peace_plan')}
        onOpenGratitude={() => setCurrentScreen('gratitude')}
        onOpenAudios={() => setCurrentScreen('audios')}
        savedCount={savedAnchors.length}
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
          <ConversationalDiagnosticScreen
            onBack={() => setCurrentScreen('landing')}
            onSubmit={handleDiagnosticSubmit}
            initialRole={formInitialRole}
            initialSymptom={formInitialSymptom}
          />
        )}

        {currentScreen === 'transition' && (
          <HapticTransitionScreen
            onComplete={handleTransitionComplete}
            targetMoodLabel={activeMood}
          />
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
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Volver al botiquín</span>
            </button>
            <PeacePlanView
              onOpenPlanDetails={() => setIsPlanOpen(true)}
              onOpenDay7Paywall={() => setCurrentScreen('day7_paywall')}
            />
          </div>
        )}

        {currentScreen === 'day7_paywall' && (
          <Day7PaywallView
            onBackToFreeBotiquin={() => setCurrentScreen('landing')}
            onProceedPurchase={() => setIsPlanOpen(true)}
          />
        )}

        {currentScreen === 'gratitude' && (
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Volver al botiquín</span>
            </button>
            <GratitudeJournal />
          </div>
        )}

        {currentScreen === 'audios' && (
          <div className="w-full max-w-[720px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Volver al botiquín</span>
            </button>
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
            <div className="w-14 h-14 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 flex items-center justify-center mb-5 text-[#EF4444]">
              <CloudOff className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <h1 className="font-editorial text-[24px] text-[#F1F5F9] mb-2 font-normal">
              Conexión temporalmente interrumpida
            </h1>
            <p className="text-[14.5px] text-[#94A3B8] max-w-[42ch] mb-8 leading-relaxed">
              Tus oraciones y anclas permanecen a salvo en tu dispositivo. Puedes leerlas y meditar en ellas sin conexión a internet.
            </p>
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] text-[13.5px] font-semibold transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.75} />
              <span>Reintentar conexión</span>
            </button>
          </div>
        )}
      </main>

      {/* Botón flotante persistente de Bypass de Emergencia */}
      <EmergencyBypassButton
        visible={currentScreen !== 'form' && currentScreen !== 'transition'}
        onClick={() => handleStartFlow('madre_profesional', 'ansiedad_noche')}
      />

      {/* Pie de página sobrio y editorial */}
      <footer className="w-full border-t border-white/[0.08] py-6 px-4 text-center bg-[#060F1E] mt-12">
        <div className="max-w-[720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#94A3B8]">
          <div>
            El Mapa de tu Vida en Dios • F.E.™ Fortaleza Espiritual • Tu Poder Mental™
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPlanOpen(true)}
              className="hover:text-[#F59E0B] font-semibold transition-colors cursor-pointer"
            >
              Proceso 30 Días con Clara Luz y Leo (12.99 USD - Pago Único)
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
