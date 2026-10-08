import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Compass,
  HeartHandshake,
  Volume2,
  Sparkles,
  User as UserIcon,
  Play,
  Bell,
  Sun,
  FolderOpen,
  Film,
  HardDrive,
  FileSpreadsheet,
} from 'lucide-react';
import { TuPoderMentalLogo } from './TuPoderMentalLogo';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

interface HeaderProps {
  onGoHome: () => void;
  onOpenHistory: () => void;
  onOpenPlan?: () => void;
  onOpenPeacePlan: () => void;
  onOpenGratitude: () => void;
  onOpenAudios: () => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenJesusVideo?: () => void;
  onOpenGallery?: () => void;
  onOpenReminders?: () => void;
  onOpenDailyPromise?: () => void;
  onOpenFiles?: () => void;
  onOpenGoogleDrive?: () => void;
  onOpenGoogleSheets?: () => void;
  filesCount?: number;
  remindersActive?: boolean;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenHistory,
  onOpenPeacePlan,
  onOpenGratitude,
  onOpenAudios,
  onOpenChat,
  onOpenAuth,
  onOpenJesusVideo,
  onOpenGallery,
  onOpenReminders,
  onOpenDailyPromise,
  onOpenFiles,
  onOpenGoogleDrive,
  onOpenGoogleSheets,
  filesCount = 0,
  remindersActive,
  savedCount,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  return (
    <header className="w-full border-b border-white/[0.08] bg-[#060F1E]/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-2.5 sm:px-6 h-15 sm:h-18 flex items-center justify-between gap-1 sm:gap-3">
        {/* Brand Logo & Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none flex items-center gap-1 sm:gap-2 rounded-[10px] min-h-[44px] min-w-0 shrink overflow-hidden"
          aria-label="Ir al inicio de Tu Poder Mental F.E."
        >
          <TuPoderMentalLogo size={38} showText={true} />
        </button>

        {/* Top actions & navigation */}
        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* Jesús en Ti Confío Animation Video Trigger */}
          {onOpenJesusVideo && (
            <button
              type="button"
              onClick={onOpenJesusVideo}
              className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] bg-[#0F281E] hover:bg-[#153C2A] active:bg-[#1A4B34] border border-[#22C55E]/40 text-[11.5px] sm:text-[12px] font-semibold text-[#C6F432] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#C6F432]"
              title="Ver animación litúrgica «Jesús en Ti Confío»"
              aria-label="Ver animación Jesús en Ti Confío"
            >
              <Play className="w-3 h-3 fill-current text-[#C6F432] shrink-0" />
              <span className="hidden xl:inline">Jesús en Ti Confío</span>
            </button>
          )}

          {/* Mentores Gemini Chat */}
          <button
            type="button"
            onClick={onOpenChat}
            className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 border border-amber-500/30 text-[11.5px] sm:text-[12.5px] font-medium text-[#F59E0B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none shadow-xs"
            title="Chat con los Mentores Clara Luz & Leo (Gemini)"
            aria-label="Chat con los Mentores Clara Luz y Leo"
          >
            <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
            <span className="hidden sm:inline">Mentores</span>
          </button>

          {/* Ruta 30 Días */}
          <button
            type="button"
            onClick={onOpenPeacePlan}
            className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] active:bg-white/[0.1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            title="Ruta 30 Días con Dios"
            aria-label="Ruta 30 Días con Dios"
          >
            <Compass className="w-4 h-4 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="hidden sm:inline">Ruta 30D</span>
          </button>

          {/* Gratitud */}
          <button
            type="button"
            onClick={onOpenGratitude}
            className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] active:bg-white/[0.1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#10B981] focus-visible:outline-none"
            title="Diario de Gratitud"
            aria-label="Diario de Gratitud"
          >
            <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={1.75} />
            <span className="hidden md:inline">Gratitud</span>
          </button>

          {/* Audios */}
          <button
            type="button"
            onClick={onOpenAudios}
            className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] active:bg-white/[0.1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#0EA5E9] focus-visible:outline-none"
            title="Audios de Fe"
            aria-label="Audios de Fe"
          >
            <Volume2 className="w-4 h-4 text-[#0EA5E9] shrink-0" strokeWidth={1.75} />
            <span className="hidden md:inline">Audios</span>
          </button>

          {/* Videos de Fe & Cine Litúrgico */}
          {onOpenJesusVideo && (
            <button
              type="button"
              onClick={onOpenJesusVideo}
              className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-[#C6F432] hover:text-white hover:bg-[#C6F432]/10 active:bg-[#C6F432]/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#C6F432]/30 focus-visible:ring-2 focus-visible:ring-[#C6F432] focus-visible:outline-none"
              title="Cine de Fe & Videos Meditativos"
              aria-label="Videos y Meditaciones Visuales"
            >
              <Film className="w-3.5 h-3.5 text-[#C6F432] shrink-0" strokeWidth={2} />
              <span className="hidden sm:inline">Videos</span>
            </button>
          )}

          {/* Galería Visual de Fe */}
          {onOpenGallery && (
            <button
              type="button"
              onClick={onOpenGallery}
              className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-purple-300 hover:text-purple-100 hover:bg-purple-500/10 active:bg-purple-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-purple-500/20 focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              title="Galería Visual de Imágenes de Fe"
              aria-label="Galería Visual de Arte de Fe"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" strokeWidth={1.75} />
              <span className="hidden lg:inline">Galería</span>
            </button>
          )}

          {/* Mis Oraciones (History) */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] text-[11.5px] sm:text-[12px] font-medium text-[#F1F5F9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
            aria-label={`Ver oraciones guardadas (${savedCount})`}
            title="Mis oraciones guardadas"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="hidden lg:inline">Oraciones</span>
            {savedCount > 0 && (
              <span className="text-[10px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Archivos & Grabaciones de Fe */}
          {onOpenFiles && (
            <button
              type="button"
              onClick={onOpenFiles}
              className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] border border-sky-500/20 bg-sky-500/10 hover:bg-sky-500/20 active:bg-sky-500/30 text-[11.5px] sm:text-[12px] font-medium text-sky-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
              aria-label={`Ver archivos de fe (${filesCount})`}
              title="Base de datos de archivos y grabaciones"
            >
              <FolderOpen className="w-3.5 h-3.5 text-sky-400 shrink-0" strokeWidth={1.75} />
              <span className="hidden xl:inline">Archivos</span>
              {filesCount > 0 && (
                <span className="text-[10px] tabular-nums px-1.5 py-0.2 rounded-full bg-sky-400 text-[#060F1E] font-bold">
                  {filesCount}
                </span>
              )}
            </button>
          )}

          {/* Google Drive */}
          {onOpenGoogleDrive && (
            <button
              type="button"
              onClick={onOpenGoogleDrive}
              className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] border border-sky-400/30 bg-sky-500/10 hover:bg-sky-500/20 active:bg-sky-500/30 text-[11.5px] sm:text-[12px] font-medium text-sky-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:outline-none"
              title="Google Drive Espiritual & Respaldo"
              aria-label="Abrir Google Drive"
            >
              <HardDrive className="w-3.5 h-3.5 text-sky-400 shrink-0" strokeWidth={1.8} />
              <span className="hidden sm:inline">Drive</span>
            </button>
          )}

          {/* Google Sheets */}
          {onOpenGoogleSheets && (
            <button
              type="button"
              onClick={onOpenGoogleSheets}
              className="min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] border border-emerald-400/30 bg-emerald-500/10 hover:bg-emerald-500/20 active:bg-emerald-500/30 text-[11.5px] sm:text-[12px] font-medium text-emerald-200 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
              title="Google Sheets - Registro de Oraciones & Diario"
              aria-label="Abrir Google Sheets"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400 shrink-0" strokeWidth={1.8} />
              <span className="hidden md:inline">Sheets</span>
            </button>
          )}

          {/* Promesa del Día */}
          {onOpenDailyPromise && (
            <button
              type="button"
              onClick={onOpenDailyPromise}
              className="min-h-[40px] sm:min-h-[42px] px-1.5 sm:px-2.5 py-1.5 rounded-[10px] text-[11.5px] sm:text-[12.5px] font-medium text-[#FDE68A] hover:text-[#FEF08A] hover:bg-amber-500/10 active:bg-amber-500/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
              title="Ver Promesa Bíblica del Día"
              aria-label="Ver Promesa Bíblica del Día"
            >
              <Sun className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} />
              <span className="hidden lg:inline">Promesa</span>
            </button>
          )}

          {/* Recordatorios Diarios / Alertas */}
          {onOpenReminders && (
            <button
              type="button"
              onClick={onOpenReminders}
              className="relative min-h-[40px] sm:min-h-[42px] px-2 sm:px-2.5 py-1.5 rounded-[10px] border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 text-[11.5px] sm:text-[12px] font-medium text-[#F59E0B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none"
              title="Programar Recordatorios y Notificaciones Diarias"
              aria-label="Programar recordatorios del diario de gratitud y promesa del día"
            >
              <Bell className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={2} />
              <span className="hidden xl:inline">Recordatorios</span>
              {remindersActive && (
                <span
                  className="w-2 h-2 rounded-full bg-emerald-400 border border-[#060F1E] shrink-0"
                  title="Recordatorios activos"
                />
              )}
            </button>
          )}

          {/* Google Account / Firebase Auth Status */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="min-h-[40px] sm:min-h-[42px] min-w-[40px] sm:min-w-[42px] p-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none shrink-0"
            title={currentUser ? `Cuenta conectada: ${currentUser.email}` : 'Conectar con Google / Firebase'}
            aria-label="Abrir opciones de cuenta y sincronización Firebase"
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'Usuario'}
                className="w-6 h-6 rounded-full border border-amber-500/50 object-cover"
              />
            ) : (
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#CBD5E1]" />
                {currentUser && (
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#060F1E]" />
                )}
              </div>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
