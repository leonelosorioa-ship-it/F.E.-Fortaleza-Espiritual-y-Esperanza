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
import { GeminiMentorChat } from './components/GeminiMentorChat';
import { UserAuthModal } from './components/UserAuthModal';
import { JesusVideoModal } from './components/JesusVideoModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';
import { DailyPromiseModal } from './components/DailyPromiseModal';
import { FileManagerModal } from './components/FileManagerModal';
import { FaithGallery } from './components/FaithGallery';
import { GoogleDriveModal } from './components/GoogleDriveModal';
import { GoogleSheetsModal } from './components/GoogleSheetsModal';
import {
  checkAndFireScheduledReminders,
  loadNotificationSettings,
  getTodayDailyPromise,
} from './services/notificationService';
import { DailyPromiseData, UserFile, LoginLog, GratitudeEntry } from './types';
import { CloudOff, RefreshCw, WifiOff, ArrowLeft, Film } from 'lucide-react';
import { auth } from './firebase';
import {
  subscribeToSavedAnchors,
  persistSavedAnchor,
  removeSavedAnchor,
  syncUserProfile,
  subscribeToUserFiles,
  persistUserFile,
  removeUserFile,
  subscribeToLoginLogs,
  subscribeToGratitudeEntries,
} from './services/firestoreService';
import { syncUserToCloudSql } from './services/sqlSyncService';
import { User } from 'firebase/auth';

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
  | 'gallery'
  | 'chat'
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isJesusVideoOpen, setIsJesusVideoOpen] = useState<boolean>(false);
  const [activeVideoTrack, setActiveVideoTrack] = useState<string>('misericordia');
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [isDailyPromiseModalOpen, setIsDailyPromiseModalOpen] = useState<boolean>(false);
  const [selectedDailyPromise, setSelectedDailyPromise] = useState<DailyPromiseData | null>(null);
  const [hasActiveReminders, setHasActiveReminders] = useState<boolean>(() => {
    const s = loadNotificationSettings();
    return s.gratitude.enabled || s.dailyPromise.enabled;
  });
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [isFilesModalOpen, setIsFilesModalOpen] = useState<boolean>(false);
  const [isGoogleDriveOpen, setIsGoogleDriveOpen] = useState<boolean>(false);
  const [isGoogleSheetsOpen, setIsGoogleSheetsOpen] = useState<boolean>(false);
  const [userFiles, setUserFiles] = useState<UserFile[]>(() => {
    try {
      const stored = localStorage.getItem('fe_user_files');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntry[]>(() => {
    try {
      const stored = localStorage.getItem('fe_gratitude_entries');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Background Web Notification Scheduler Check (every 30s)
  useEffect(() => {
    const checkReminders = () => {
      checkAndFireScheduledReminders({
        onOpenGratitude: () => {
          setCurrentScreen('gratitude');
        },
        onOpenDailyPromise: (promise) => {
          setSelectedDailyPromise(promise);
          setIsDailyPromiseModalOpen(true);
        },
      });
    };

    checkReminders();
    const timer = setInterval(checkReminders, 30000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Auth & Firestore Synchronization
  useEffect(() => {
    let unsubAnchors: (() => void) | null = null;
    let unsubFiles: (() => void) | null = null;
    let unsubLogs: (() => void) | null = null;
    let unsubGratitude: (() => void) | null = null;

    const unsubAuth = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      if (user) {
        // Sync profile to Firestore
        syncUserProfile({
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Creyente en Camino',
          photoURL: user.photoURL || undefined,
          activeRole,
          currentDay: 1,
          hasFullAccess: false,
          lastLoginAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }).catch(console.error);

        // Sync profile to Cloud SQL PostgreSQL
        syncUserToCloudSql(user.displayName || undefined, user.photoURL || undefined).catch(console.error);

        // 1. Subscribe to real-time Cloud Anchors
        unsubAnchors = subscribeToSavedAnchors(user.uid, (cloudAnchors) => {
          setSavedAnchors(cloudAnchors);
          try {
            localStorage.setItem('fe_saved_anchors', JSON.stringify(cloudAnchors));
          } catch {
            // Safe fallback
          }
        });

        // 2. Subscribe to real-time Cloud Files & Voice Audio
        unsubFiles = subscribeToUserFiles(user.uid, (cloudFiles) => {
          setUserFiles(cloudFiles);
          try {
            localStorage.setItem('fe_user_files', JSON.stringify(cloudFiles));
          } catch {
            // Safe fallback
          }
        });

        // 3. Subscribe to Google Login Logs
        unsubLogs = subscribeToLoginLogs(user.uid, (logs) => {
          setLoginLogs(logs);
        });

        // 4. Subscribe to Gratitude Entries
        unsubGratitude = subscribeToGratitudeEntries(user.uid, (entries) => {
          setGratitudeEntries(entries);
          try {
            localStorage.setItem('fe_gratitude_entries', JSON.stringify(entries));
          } catch {
            // Safe fallback
          }
        });

        // Sync any guest anchors previously saved locally into user's Firestore cloud account
        try {
          const storedAnchors = localStorage.getItem('fe_saved_anchors');
          if (storedAnchors) {
            const localList: SavedAnchor[] = JSON.parse(storedAnchors);
            localList.forEach((localAnchor) => {
              persistSavedAnchor(user.uid, localAnchor).catch(console.error);
            });
          }

          const storedFiles = localStorage.getItem('fe_user_files');
          if (storedFiles) {
            const localFiles: UserFile[] = JSON.parse(storedFiles);
            localFiles.forEach((f) => {
              persistUserFile(user.uid, f).catch(console.error);
            });
          }
        } catch {
          // Safe fallback
        }
      } else {
        // Unauthenticated fallback: Load from localStorage
        try {
          const stored = localStorage.getItem('fe_saved_anchors');
          if (stored) setSavedAnchors(JSON.parse(stored));
          const storedF = localStorage.getItem('fe_user_files');
          if (storedF) setUserFiles(JSON.parse(storedF));
          const storedG = localStorage.getItem('fe_gratitude_entries');
          if (storedG) setGratitudeEntries(JSON.parse(storedG));
        } catch {
          // Safe fallback
        }
      }
    });

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      unsubAuth();
      if (unsubAnchors) unsubAnchors();
      if (unsubFiles) unsubFiles();
      if (unsubLogs) unsubLogs();
      if (unsubGratitude) unsubGratitude();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [activeRole]);

  // File persistence handler
  const handleSaveUserFile = async (file: UserFile) => {
    if (currentUser) {
      await persistUserFile(currentUser.uid, file);
    } else {
      setUserFiles((prev) => {
        const next = [file, ...prev];
        try {
          localStorage.setItem('fe_user_files', JSON.stringify(next));
        } catch {}
        return next;
      });
    }
  };

  // File deletion handler
  const handleDeleteUserFile = async (fileId: string) => {
    if (currentUser) {
      await removeUserFile(currentUser.uid, fileId);
    } else {
      setUserFiles((prev) => {
        const next = prev.filter((f) => f.id !== fileId);
        try {
          localStorage.setItem('fe_user_files', JSON.stringify(next));
        } catch {}
        return next;
      });
    }
  };

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

    // Save anchor entry
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

    // Save to Firestore if authenticated, plus localStorage
    if (currentUser) {
      persistSavedAnchor(currentUser.uid, newEntry).catch(console.error);
    }

    try {
      const updated = [newEntry, ...savedAnchors];
      setSavedAnchors(updated);
      localStorage.setItem('fe_saved_anchors', JSON.stringify(updated));
    } catch {
      // Safe fallback
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

  const handleOpenJesusVideo = (trackId: string = 'misericordia') => {
    setActiveVideoTrack(trackId);
    setIsJesusVideoOpen(true);
  };

  const handleClearHistory = () => {
    if (currentUser) {
      savedAnchors.forEach((a) => {
        removeSavedAnchor(currentUser.uid, a.id).catch(console.error);
      });
    }
    setSavedAnchors([]);
    try {
      localStorage.removeItem('fe_saved_anchors');
    } catch {
      // Ignore
    }
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
        onOpenChat={() => setCurrentScreen('chat')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenJesusVideo={() => handleOpenJesusVideo('misericordia')}
        onOpenGallery={() => setCurrentScreen('gallery')}
        onOpenReminders={() => setIsReminderModalOpen(true)}
        onOpenDailyPromise={() => {
          setSelectedDailyPromise(getTodayDailyPromise());
          setIsDailyPromiseModalOpen(true);
        }}
        onOpenFiles={() => setIsFilesModalOpen(true)}
        onOpenGoogleDrive={() => setIsGoogleDriveOpen(true)}
        onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
        filesCount={userFiles.length}
        remindersActive={hasActiveReminders}
        savedCount={savedAnchors.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-start pb-8 sm:pb-12">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStartFlow={handleStartFlow}
            onOpenPlan={() => setIsPlanOpen(true)}
            onOpenPeacePlan={() => setCurrentScreen('peace_plan')}
            onOpenGratitude={() => setCurrentScreen('gratitude')}
            onOpenAudios={() => setCurrentScreen('audios')}
            onOpenChat={() => setCurrentScreen('chat')}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenReminders={() => setIsReminderModalOpen(true)}
            onOpenDailyPromise={() => {
              setSelectedDailyPromise(getTodayDailyPromise());
              setIsDailyPromiseModalOpen(true);
            }}
            onOpenFiles={() => setIsFilesModalOpen(true)}
            onOpenGoogleDrive={() => setIsGoogleDriveOpen(true)}
            onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
            onOpenJesusVideo={(trackId) => handleOpenJesusVideo(trackId || 'misericordia')}
            onOpenGallery={() => setCurrentScreen('gallery')}
          />
        )}

        {currentScreen === 'chat' && (
          <GeminiMentorChat
            onBack={() => setCurrentScreen('landing')}
            onOpenPlan={() => setIsPlanOpen(true)}
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
          <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
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
          <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
            <button
              type="button"
              onClick={() => setCurrentScreen('landing')}
              className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
              <span>Volver al botiquín</span>
            </button>
            <GratitudeJournal
              onOpenReminderSettings={() => setIsReminderModalOpen(true)}
              onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
            />
          </div>
        )}

        {currentScreen === 'audios' && (
          <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
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

        {currentScreen === 'gallery' && (
          <div className="w-full max-w-5xl lg:max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setCurrentScreen('landing')}
                className="min-h-[44px] px-3.5 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
                <span>Volver al botiquín</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenJesusVideo('misericordia')}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-[#C6F432] hover:bg-[#D9F95C] text-[#061A0E] font-bold text-[13px] flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(198,244,50,0.3)] transition-all"
              >
                <Film className="w-4 h-4 text-[#061A0E]" />
                <span>Ver Cine de Fe & Videos</span>
              </button>
            </div>
            <FaithGallery onSelectInspiringDay={() => setCurrentScreen('peace_plan')} />
          </div>
        )}

        {currentScreen === 'history' && (
          <HistoryView
            anchors={savedAnchors}
            onSelectAnchor={handleSelectFromHistory}
            onStartNew={() => setCurrentScreen('form')}
            onClearAll={handleClearHistory}
            onBack={() => setCurrentScreen('landing')}
            gratitudeEntries={gratitudeEntries}
            userFiles={userFiles}
            loginLogs={loginLogs}
            onSelectGratitude={() => setCurrentScreen('gratitude')}
            onOpenFilesManager={() => setIsFilesModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onOpenGoogleSheets={() => setIsGoogleSheetsOpen(true)}
          />
        )}

        {/* Estado Canónico de Error */}
        {currentScreen === 'error' && (
          <div className="w-full max-w-xl mx-auto px-4 py-20 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-[#EF4444]/30 bg-[#EF4444]/10 flex items-center justify-center mb-5 text-[#EF4444]">
              <CloudOff className="w-7 h-7" strokeWidth={1.75} />
            </div>
            <h1 className="font-editorial text-[24px] text-[#F1F5F9] mb-2 font-normal">
              Conexión temporalmente interrumpida
            </h1>
            <p className="text-[14.5px] text-[#94A3B8] max-w-[42ch] mb-8 leading-relaxed">
              Tus oraciones y anclas permanecen a salvo en tu dispositivo y en la nube. Puedes leerlas y meditar en ellas sin conexión a internet.
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

      {/* Botón flotante persistente de Bypass de Emergencia (solo en pantallas secundarias) */}
      <EmergencyBypassButton
        visible={currentScreen !== 'landing' && currentScreen !== 'form' && currentScreen !== 'transition' && currentScreen !== 'chat'}
        onClick={() => handleStartFlow('madre_profesional', 'ansiedad_noche')}
      />

      {/* Pie de página sobrio y editorial */}
      <footer className="w-full border-t border-white/[0.08] py-8 sm:py-10 px-4 sm:px-6 text-center bg-[#060F1E] mt-16 relative z-10">
        <div className="max-w-5xl lg:max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#94A3B8]">
          <div className="text-center sm:text-left">
            <span className="font-medium text-[#CBD5E1]">Tu Poder Mental™</span>
            <span className="mx-1.5">•</span>
            <span>F.E.™ Fortaleza Espiritual</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-center">
            <button
              type="button"
              onClick={() => setIsPlanOpen(true)}
              className="hover:text-[#F59E0B] font-semibold transition-colors cursor-pointer"
            >
              Ruta 30 Días con Clara Luz y Leo
            </button>
            <span className="hidden xs:inline">•</span>
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {currentUser ? 'Cuenta sincronizada con Google' : 'Conectar con Google'}
            </button>
          </div>
        </div>
      </footer>

      {/* Modal de detalles de plan */}
      <PlanDetailsModal
        isOpen={isPlanOpen}
        onClose={() => setIsPlanOpen(false)}
      />

      {/* Modal de autenticación con Firebase y Google Sign-In */}
      <UserAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        savedCount={savedAnchors.length}
        filesCount={userFiles.length}
        gratitudeCount={gratitudeEntries.length}
        onOpenFiles={() => setIsFilesModalOpen(true)}
        onOpenHistory={() => setCurrentScreen('history')}
      />

      {/* Modal de Gestor de Archivos y Grabaciones de Fe */}
      <FileManagerModal
        isOpen={isFilesModalOpen}
        onClose={() => setIsFilesModalOpen(false)}
        files={userFiles}
        onSaveFile={handleSaveUserFile}
        onDeleteFile={handleDeleteUserFile}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenGoogleDrive={() => {
          setIsFilesModalOpen(false);
          setIsGoogleDriveOpen(true);
        }}
        onOpenGoogleSheets={() => {
          setIsFilesModalOpen(false);
          setIsGoogleSheetsOpen(true);
        }}
      />

      {/* Modal de Integración de Google Drive (Google Workspace API) */}
      <GoogleDriveModal
        isOpen={isGoogleDriveOpen}
        onClose={() => setIsGoogleDriveOpen(false)}
        localFiles={userFiles}
        onOpenGoogleSheets={() => {
          setIsGoogleDriveOpen(false);
          setIsGoogleSheetsOpen(true);
        }}
      />

      {/* Modal de Integración de Google Sheets (Google Workspace API) */}
      <GoogleSheetsModal
        isOpen={isGoogleSheetsOpen}
        onClose={() => setIsGoogleSheetsOpen(false)}
        onOpenGoogleDrive={() => {
          setIsGoogleSheetsOpen(false);
          setIsGoogleDriveOpen(true);
        }}
        savedAnchors={savedAnchors}
        gratitudeEntries={gratitudeEntries}
      />

      {/* Modal de experiencia contemplativa y animación Jesús en Ti Confío */}
      <JesusVideoModal
        isOpen={isJesusVideoOpen}
        onClose={() => setIsJesusVideoOpen(false)}
        initialVideoId={activeVideoTrack}
        onStartFlow={() => handleStartFlow('hombre_fe', 'ansiedad_noche')}
      />

      {/* Modal de Recordatorios y Notificaciones Diarias (Web Notification API) */}
      <NotificationSettingsModal
        isOpen={isReminderModalOpen}
        onClose={() => {
          setIsReminderModalOpen(false);
          const s = loadNotificationSettings();
          setHasActiveReminders(s.gratitude.enabled || s.dailyPromise.enabled);
        }}
        onOpenGratitude={() => {
          setCurrentScreen('gratitude');
        }}
        onOpenDailyPromise={(promise) => {
          setSelectedDailyPromise(promise);
          setIsDailyPromiseModalOpen(true);
        }}
      />

      {/* Modal de Promesa Bíblica del Día */}
      <DailyPromiseModal
        isOpen={isDailyPromiseModalOpen}
        onClose={() => setIsDailyPromiseModalOpen(false)}
        promise={selectedDailyPromise}
        onOpenGratitude={() => {
          setIsDailyPromiseModalOpen(false);
          setCurrentScreen('gratitude');
        }}
        onOpenReminderSettings={() => {
          setIsDailyPromiseModalOpen(false);
          setIsReminderModalOpen(true);
        }}
      />
    </div>
  );
}
