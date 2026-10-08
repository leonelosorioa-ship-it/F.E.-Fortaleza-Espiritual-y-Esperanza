import React, { useState, useEffect } from 'react';
import {
  HeartHandshake,
  Bookmark,
  FileSpreadsheet,
  User as UserIcon,
  Home,
  Sparkles,
} from 'lucide-react';
import { TuPoderMentalLogo } from './TuPoderMentalLogo';
import { auth } from '../firebase';
import { User } from 'firebase/auth';

interface HeaderProps {
  onGoHome: () => void;
  onOpenHistory: () => void;
  onOpenGratitude: () => void;
  onOpenChat: () => void;
  onOpenAuth: () => void;
  onOpenGoogleSheets?: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onGoHome,
  onOpenHistory,
  onOpenGratitude,
  onOpenChat,
  onOpenAuth,
  onOpenGoogleSheets,
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
      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo / Inicio */}
        <button
          type="button"
          onClick={onGoHome}
          className="text-left group cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl flex items-center gap-2 min-h-[44px]"
          aria-label="Ir al inicio"
        >
          <TuPoderMentalLogo size={36} showText={true} />
        </button>

        {/* Navegación Simple y Práctica */}
        <nav aria-label="Navegación principal" className="flex items-center gap-1 sm:gap-2">
          {/* 1. Inicio / Calma */}
          <button
            type="button"
            onClick={onGoHome}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Inicio - Botiquín de Calma"
          >
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Inicio</span>
          </button>

          {/* 2. Diario de Gratitud */}
          <button
            type="button"
            onClick={onOpenGratitude}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Diario de Gratitud"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Gratitud</span>
          </button>

          {/* 3. Mis Oraciones */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-[#CBD5E1] hover:text-[#F1F5F9] hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Mis Oraciones Guardadas"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">Oraciones</span>
            {savedCount > 0 && (
              <span className="text-[10px] tabular-nums px-1.5 py-0.2 rounded-full bg-amber-400 text-[#060F1E] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          {/* 4. Google Sheets */}
          {onOpenGoogleSheets && (
            <button
              type="button"
              onClick={onOpenGoogleSheets}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Google Sheets - Registro de Peticiones"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">Sheets</span>
            </button>
          )}

          {/* 5. Mentores (Consejería) */}
          <button
            type="button"
            onClick={onOpenChat}
            className="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Acompañamiento con Mentores"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">Mentores</span>
          </button>

          {/* 6. Perfil / Cuenta Google */}
          <button
            type="button"
            onClick={onOpenAuth}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] text-xs font-medium text-[#F1F5F9] flex items-center gap-1.5 transition-colors cursor-pointer ml-1"
            title={currentUser ? `Conectado como ${currentUser.email}` : 'Conectar cuenta de Google'}
          >
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt=""
                className="w-5 h-5 rounded-full object-cover"
              />
            ) : (
              <UserIcon className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span className="hidden sm:inline max-w-[100px] truncate text-[11.5px]">
              {currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'Cuenta'}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
