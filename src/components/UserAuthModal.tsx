import React, { useState, useEffect } from 'react';
import {
  X,
  LogIn,
  LogOut,
  ShieldCheck,
  Cloud,
  CheckCircle2,
  Sparkles,
  BookMarked,
  HeartHandshake,
  MessageSquare,
} from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from '../firebase';
import { User } from 'firebase/auth';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  savedCount,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await loginWithGoogle();
      onClose();
    } catch (err: unknown) {
      console.error('Sign-in error:', err);
      setError('No se pudo completar el inicio de sesión con Google. Por favor, reintenta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      onClose();
    } catch (err) {
      console.error('Sign-out error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-[440px] bg-[#0A1424] border border-amber-500/25 rounded-[20px] p-6 shadow-2xl text-[#F1F5F9] space-y-5">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
            <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />
          </div>
          <div>
            <h2 className="font-editorial text-[20px] text-[#F1F5F9] font-normal">
              Cuenta & Respaldo en la Nube
            </h2>
            <p className="text-[12.5px] text-[#94A3B8]">
              Firebase Authentication & Firestore
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-[10px] bg-red-500/15 border border-red-500/30 text-red-300 text-[12.5px]">
            {error}
          </div>
        )}

        {user ? (
          /* User Profile View */
          <div className="space-y-4 pt-1">
            <div className="flex items-center gap-3.5 p-3.5 rounded-[14px] bg-[#0F1E33] border border-white/[0.08]">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Usuario'}
                  className="w-12 h-12 rounded-full border border-amber-500/40 object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-[#F59E0B] font-bold text-[18px] flex items-center justify-center border border-amber-500/30">
                  {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-[14px] font-semibold text-[#F1F5F9] truncate">
                  {user.displayName || 'Hijo(a) de Dios'}
                </div>
                <div className="text-[12px] text-[#94A3B8] truncate">{user.email}</div>
                <div className="flex items-center gap-1.5 mt-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Sincronización activa con Firestore</span>
                </div>
              </div>
            </div>

            {/* Cloud Sync Status Features */}
            <div className="space-y-2 text-[12.5px] text-[#CBD5E1]">
              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <BookMarked className="w-4 h-4 text-[#F59E0B]" />
                  <span>Oraciones y anclas guardadas</span>
                </div>
                <span className="font-semibold text-[#F59E0B]">{savedCount}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4 text-[#10B981]" />
                  <span>Diario de gratitud vespertino</span>
                </div>
                <span className="text-[11px] text-emerald-400">En la nube</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.04]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#0EA5E9]" />
                  <span>Historial de consejería con Gemini</span>
                </div>
                <span className="text-[11px] text-sky-400">Protegido</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full min-h-[44px] py-2.5 px-4 rounded-[12px] border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-[13px] font-medium text-[#EF4444] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </button>
          </div>
        ) : (
          /* Sign-in prompt view */
          <div className="space-y-4 pt-1">
            <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
              Inicia sesión con tu cuenta de Google para mantener tus oraciones litúrgicas, notas de gratitud y conversaciones con los mentores respaldadas de forma segura y permanente en la base de datos de Firestore.
            </p>

            <div className="space-y-2.5 py-1">
              <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                <Cloud className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>Acceso sincronizado en tu celular, tablet o computadora.</span>
              </div>
              <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                <Sparkles className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>Conserva el historial completo de consejería de los 30 días.</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignIn}
              disabled={isLoading}
              className="w-full min-h-[48px] py-2.5 px-4 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#060F1E] font-semibold text-[14px] flex items-center justify-center gap-2.5 transition-colors cursor-pointer shadow-md disabled:opacity-50"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoading ? 'Conectando con Google...' : 'Continuar con Google'}</span>
            </button>

            <p className="text-[11px] text-center text-[#64748B]">
              Tus datos son privados. Solo tú tienes acceso a tus oraciones y reflexiones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
