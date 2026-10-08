import React, { useState, useEffect, useRef } from 'react';
import {
  Bookmark,
  Compass,
  HeartHandshake,
  Volume2,
  Sparkles,
  User as UserIcon,
  Bell,
  Sun,
  FolderOpen,
  Film,
  HardDrive,
  FileSpreadsheet,
  Menu,
  X,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setCurrentUser(u);
    });
    return () => unsub();
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="w-full border-b border-white/[0.08] bg-[#060F1E]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="max-w-5xl lg:max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo: Full and never shrink */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:outline-none flex items-center shrink-0"
          aria-label="Ir al inicio de Tu Poder Mental F.E."
        >
          <TuPoderMentalLogo size={42} showText={true} />
        </button>

        {/* Clean, uncluttered Navigation */}
        <nav aria-label="Navegación principal" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Desktop/Tablet Direct Shortcuts (Hidden on mobile to preserve brand space) */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {/* Mentores Chat */}
            <button
              type="button"
              onClick={onOpenChat}
              className="min-h-[40px] px-3 py-1.5 rounded-[10px] bg-amber-500/10 hover:bg-amber-500/20 active:bg-amber-500/30 border border-amber-500/30 text-[12.5px] font-medium text-[#F59E0B] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Conversar con Clara Luz & Leo"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
              <span>Mentores</span>
            </button>

            {/* Ruta 30D */}
            <button
              type="button"
              onClick={onOpenPeacePlan}
              className="min-h-[40px] px-2.5 py-1.5 rounded-[10px] text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Ruta 30 Días en Dios"
            >
              <Compass className="w-4 h-4 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
              <span>Ruta 30D</span>
            </button>

            {/* Gratitud */}
            <button
              type="button"
              onClick={onOpenGratitude}
              className="min-h-[40px] px-2.5 py-1.5 rounded-[10px] text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Diario de Gratitud"
            >
              <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0" strokeWidth={1.75} />
              <span>Gratitud</span>
            </button>

            {/* Audios */}
            <button
              type="button"
              onClick={onOpenAudios}
              className="min-h-[40px] px-2.5 py-1.5 rounded-[10px] text-[12.5px] font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Audios de Fe"
            >
              <Volume2 className="w-4 h-4 text-[#0EA5E9] shrink-0" strokeWidth={1.75} />
              <span>Audios</span>
            </button>

            {/* Mis Oraciones (with counter badge) */}
            <button
              type="button"
              onClick={onOpenHistory}
              className="min-h-[40px] px-3 py-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[12.5px] font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer"
              aria-label={`Ver oraciones guardadas (${savedCount})`}
              title="Mis oraciones guardadas"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
              <span>Oraciones</span>
              {savedCount > 0 && (
                <span className="text-[10.5px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile-only visible quick action: Oraciones */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="md:hidden min-h-[40px] px-2.5 py-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-[12px] font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer"
            aria-label={`Ver oraciones guardadas (${savedCount})`}
            title="Mis oraciones guardadas"
          >
            <Bookmark className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" strokeWidth={1.75} />
            <span className="hidden xs:inline text-[11.5px]">Oraciones</span>
            {savedCount > 0 && (
              <span className="text-[10px] tabular-nums px-1.5 py-0.2 rounded-full bg-[#F59E0B] text-[#060F1E] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* Menú Desplegable Completo y Limpio */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded-[10px] text-[12px] sm:text-[13px] font-medium transition-colors flex items-center gap-1.5 cursor-pointer border ${
                isMenuOpen
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.04] hover:bg-white/[0.08] border-white/[0.1] text-[#CBD5E1] hover:text-[#F1F5F9]'
              }`}
              title="Abrir menú de herramientas y recursos"
              aria-expanded={isMenuOpen}
              aria-label="Menú principal"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-amber-400" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
              <span className="text-[12px] font-semibold">Menú</span>
            </button>

            {/* Dropdown Menu Modal */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 max-h-[85vh] overflow-y-auto rounded-2xl bg-[#091524] border border-white/[0.14] shadow-2xl py-2 z-50 text-[13px] animate-fade-in backdrop-blur-xl">
                {/* Mobile Extra Links */}
                <div className="md:hidden border-b border-white/[0.08] pb-1.5 mb-1.5">
                  <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#F59E0B]">
                    Accesos Principales
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenChat();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>Hablar con los Mentores</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenPeacePlan();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Compass className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>Ruta 30 Días en Dios</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenGratitude();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>Diario de Gratitud</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenAudios();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-[#0EA5E9] shrink-0" />
                    <span>Audios de Fe</span>
                  </button>
                </div>

                <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Experiencias de Fe
                </div>

                {onOpenDailyPromise && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenDailyPromise();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Promesa del Día</span>
                  </button>
                )}

                {onOpenJesusVideo && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenJesusVideo();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Film className="w-4 h-4 text-[#C6F432] shrink-0" />
                    <span>Cine de Fe & Videos</span>
                  </button>
                )}

                {onOpenGallery && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenGallery();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>Galería de Fe</span>
                  </button>
                )}

                {onOpenReminders && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenReminders();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center justify-between gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Bell className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Recordatorios</span>
                    </div>
                    {remindersActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                    )}
                  </button>
                )}

                <div className="px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] border-t border-white/[0.06] my-1 pt-2">
                  Nube & Archivos
                </div>

                {onOpenFiles && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenFiles();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center justify-between gap-2.5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderOpen className="w-4 h-4 text-sky-400 shrink-0" />
                      <span>Mis Archivos</span>
                    </div>
                    {filesCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-sky-500/20 text-sky-300 font-bold">
                        {filesCount}
                      </span>
                    )}
                  </button>
                )}

                {onOpenGoogleDrive && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenGoogleDrive();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <HardDrive className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>Google Drive</span>
                  </button>
                )}

                {onOpenGoogleSheets && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenGoogleSheets();
                    }}
                    className="w-full px-3.5 py-2 text-left hover:bg-white/[0.06] text-[#CBD5E1] hover:text-[#F1F5F9] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Google Sheets</span>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cuenta Google / Perfil */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="min-h-[40px] min-w-[40px] p-1.5 rounded-[10px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-0.5"
            title={currentUser ? `Cuenta: ${currentUser.email}` : 'Conectar con Google'}
            aria-label="Abrir cuenta"
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
