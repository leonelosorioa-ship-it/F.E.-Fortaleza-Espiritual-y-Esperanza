/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * F.E.™ • Esperanza en Dios (Módulo del ecosistema Tu Poder Mental™)
 * Microaplicación web de bienestar psicoespiritual y FaithTech.
 * Privacy-First: Almacenamiento 100% local en el cliente (LocalStorage).
 */

import React, { useState, useEffect } from 'react';
import { FaithTechHeader } from './components/FaithTechHeader';
import { FaithLandingScreen } from './components/FaithLandingScreen';
import { FaithDiagnosticForm } from './components/FaithDiagnosticForm';
import { FaithResultScreen } from './components/FaithResultScreen';
import { FaithRescueModal } from './components/FaithRescueModal';
import { FaithPlanModal } from './components/FaithPlanModal';
import { EmotionalDimensionId } from './data/faithTechData';
import { WifiOff, ShieldCheck, Heart, Sparkles } from 'lucide-react';

type MicroScreen = 'landing' | 'form' | 'result';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<MicroScreen>('landing');
  const [activeDimension, setActiveDimension] = useState<EmotionalDimensionId>('ansiedad');
  const [userReflection, setUserReflection] = useState<string>('');
  const [isRescueModalOpen, setIsRescueModalOpen] = useState<boolean>(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  // Selected Mentor ('clara_luz' o 'leo') guardado localmente
  const [selectedMentor, setSelectedMentor] = useState<'clara_luz' | 'leo'>(() => {
    try {
      const stored = localStorage.getItem('fe_selected_mentor_v2');
      return stored === 'leo' || stored === 'clara_luz' ? stored : 'clara_luz';
    } catch {
      return 'clara_luz';
    }
  });

  // Completed Days para el Grace-Based Streak
  const [completedDays, setCompletedDays] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('fe_completed_days_v2');
      return stored ? JSON.parse(stored) : [1];
    } catch {
      return [1];
    }
  });

  const handleSelectMentor = (mentor: 'clara_luz' | 'leo') => {
    setSelectedMentor(mentor);
    try {
      localStorage.setItem('fe_selected_mentor_v2', mentor);
    } catch {}
  };

  // Offline detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Diagnostic form submission
  const handleDiagnosticSubmit = (dimension: EmotionalDimensionId, reflection: string) => {
    setActiveDimension(dimension);
    setUserReflection(reflection);

    // Guardar diagnóstico reciente en LocalStorage (Privacy-First)
    try {
      const entry = {
        dimension,
        reflection,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('fe_latest_diagnostic_v2', JSON.stringify(entry));
    } catch {}

    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-[#F8FAFC] flex flex-col font-sans selection:bg-[#0D9488] selection:text-[#F8FAFC]">
      {/* Cintillo de Modo Offline */}
      {isOffline && (
        <aside
          role="status"
          className="w-full bg-[#1E293B] text-[#F8FAFC] py-2 px-4 text-center flex items-center justify-center gap-2 text-[12px] border-b border-[#0D9488]/40"
        >
          <WifiOff className="w-3.5 h-3.5 text-[#0D9488]" strokeWidth={2} />
          <span>Modo Santuario Offline activo. Todo tu botiquín y promesas funcionan sin conexión a internet.</span>
        </aside>
      )}

      {/* Header Minimalista con Acceso Rápido a Botiquín de Rescate */}
      <FaithTechHeader
        onGoHome={() => setCurrentScreen('landing')}
        onOpenRescue={() => setIsRescueModalOpen(true)}
        onOpenPlan={() => setIsPlanModalOpen(true)}
        onStartDiagnostic={() => setCurrentScreen('form')}
        currentScreen={currentScreen}
      />

      {/* Main Content Area (Mobile-First, max-w-[720px] centrado) */}
      <main className="flex-1 flex flex-col justify-start pb-10 sm:pb-16">
        {currentScreen === 'landing' && (
          <FaithLandingScreen
            onStartDiagnostic={() => {
              setCurrentScreen('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenRescue={() => setIsRescueModalOpen(true)}
            onOpenPlanModal={() => setIsPlanModalOpen(true)}
            selectedMentor={selectedMentor}
            onSelectMentor={handleSelectMentor}
            completedDaysCount={completedDays.length}
          />
        )}

        {currentScreen === 'form' && (
          <FaithDiagnosticForm
            onBack={() => {
              setCurrentScreen('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmit={handleDiagnosticSubmit}
          />
        )}

        {currentScreen === 'result' && (
          <FaithResultScreen
            dimensionId={activeDimension}
            userReflection={userReflection}
            onStartOver={() => {
              setCurrentScreen('form');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenPlanModal={() => setIsPlanModalOpen(true)}
            selectedMentor={selectedMentor}
          />
        )}
      </main>

      {/* Pie de página sobrio y reflexivo */}
      <footer className="w-full border-t border-[#334155] py-8 px-4 bg-[#0F172A] mt-auto">
        <div className="max-w-[720px] mx-auto space-y-4 text-center sm:text-left text-[12.5px] text-[#94A3B8]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-editorial text-[14px] text-[#F8FAFC] font-semibold block">
                F.E.™ • Esperanza en Dios
              </span>
              <p className="text-[11.5px] text-[#94A3B8]">
                Módulo psicoespiritual y FaithTech del ecosistema Tu Poder Mental™.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[11.5px] text-[#10B981]">
              <ShieldCheck className="w-4 h-4" />
              <span>Privacidad 100% en el cliente (LocalStorage)</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#334155]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#64748B]">
            <p>
              Diseñado para contención del sistema nervioso y edificación en la gracia. No sustituye la atención médica o psiquiátrica profesional.
            </p>
            <span>© {new Date().getFullYear()} Tu Poder Mental™</span>
          </div>
        </div>
      </footer>

      {/* Modal de Botiquín de Rescate (Bypass de Emergencia Inmediato) */}
      <FaithRescueModal
        isOpen={isRescueModalOpen}
        onClose={() => setIsRescueModalOpen(false)}
        onOpenDiagnostic={() => {
          setIsRescueModalOpen(false);
          setCurrentScreen('form');
        }}
      />

      {/* Modal del Programa de 30 Días */}
      <FaithPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        selectedMentor={selectedMentor}
        onSelectMentor={handleSelectMentor}
      />
    </div>
  );
}
