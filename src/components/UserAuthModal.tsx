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
  HardDrive,
  Clock,
  Laptop,
  Smartphone,
  FolderOpen,
  History,
  KeyRound,
  UserCheck,
} from 'lucide-react';
import { auth, loginWithGoogle, logoutUser } from '../firebase';
import { recordGoogleLogin, subscribeToLoginLogs } from '../services/firestoreService';
import { User } from 'firebase/auth';
import { LoginLog } from '../types';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedCount: number;
  filesCount?: number;
  gratitudeCount?: number;
  onOpenFiles?: () => void;
  onOpenHistory?: () => void;
}

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  savedCount,
  filesCount = 0,
  gratitudeCount = 0,
  onOpenFiles,
  onOpenHistory,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [loginLogs, setLoginLogs] = useState<LoginLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'logins'>('profile');

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) {
      setLoginLogs([]);
      return;
    }
    const unsubLogs = subscribeToLoginLogs(user.uid, (logs) => {
      setLoginLogs(logs);
    });
    return () => unsubLogs();
  }, [user]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { user: loggedUser } = await loginWithGoogle();
      // Record login in Firestore database
      if (loggedUser) {
        await recordGoogleLogin(
          loggedUser.uid,
          loggedUser.email || '',
          loggedUser.displayName || undefined,
          loggedUser.photoURL || undefined
        );
      }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-[500px] max-h-[92vh] flex flex-col bg-[#0B1728] border border-amber-500/25 rounded-[22px] shadow-2xl text-[#F1F5F9] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0F1E33]/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
              <ShieldCheck className="w-6 h-6" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-[20px] sm:text-[21px] text-[#F1F5F9] font-normal leading-tight">
                  Registro de Usuario & Base de Datos
                </h2>
              </div>
              <p className="text-[12px] text-[#94A3B8]">
                Autenticación Google & Sincronización Cloud Firestore
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Cerrar ventana"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mx-4 sm:mx-6 mt-3 p-3 rounded-[10px] bg-red-500/15 border border-red-500/30 text-red-300 text-[12.5px]">
            {error}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {user ? (
            /* Signed-in user profile */
            <div className="space-y-4">
              {/* Profile Card */}
              <div className="flex items-center gap-3.5 p-3.5 rounded-[16px] bg-[#0F1E33] border border-white/[0.08]">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Usuario'}
                    className="w-13 h-13 rounded-full border border-amber-500/40 object-cover shrink-0"
                  />
                ) : (
                  <div className="w-13 h-13 rounded-full bg-amber-500/20 text-[#F59E0B] font-bold text-[20px] flex items-center justify-center border border-amber-500/30 shrink-0">
                    {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[15px] font-semibold text-[#F1F5F9] truncate">
                      {user.displayName || 'Creyente en Camino'}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                      Verificado
                    </span>
                  </div>
                  <div className="text-[12.5px] text-[#94A3B8] truncate">{user.email}</div>
                  <div className="text-[11px] font-mono text-[#64748B] mt-0.5 truncate">
                    UID: {user.uid.substring(0, 16)}...
                  </div>
                </div>
              </div>

              {/* Subtabs: Resumen vs Historial de Logins */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'profile'
                      ? 'bg-amber-500/15 text-[#F59E0B] border border-amber-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Base de Datos del Usuario</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('logins')}
                  className={`px-3 py-1.5 rounded-[8px] text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'logins'
                      ? 'bg-amber-500/15 text-[#F59E0B] border border-amber-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Historial de Logins ({loginLogs.length})</span>
                </button>
              </div>

              {activeTab === 'profile' && (
                <div className="space-y-3">
                  <div className="text-[11.5px] uppercase font-semibold text-[#CBD5E1] tracking-wider">
                    Registros en tu cuenta de Firestore
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[12px]">
                    <div className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <div className="flex items-center gap-1.5 text-[#F59E0B]">
                        <BookMarked className="w-4 h-4" />
                        <span className="font-medium">Oraciones</span>
                      </div>
                      <div className="text-[18px] font-bold text-[#F1F5F9]">{savedCount}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">Anclas guardadas</div>
                    </div>

                    <div className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <HeartHandshake className="w-4 h-4" />
                        <span className="font-medium">Gratitud</span>
                      </div>
                      <div className="text-[18px] font-bold text-[#F1F5F9]">{gratitudeCount}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">Entradas de diario</div>
                    </div>

                    <div className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <div className="flex items-center gap-1.5 text-sky-400">
                        <FolderOpen className="w-4 h-4" />
                        <span className="font-medium">Archivos</span>
                      </div>
                      <div className="text-[18px] font-bold text-[#F1F5F9]">{filesCount}</div>
                      <div className="text-[10.5px] text-[#94A3B8]">Audios y documentos</div>
                    </div>

                    <div className="p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.06] space-y-1">
                      <div className="flex items-center gap-1.5 text-indigo-400">
                        <MessageSquare className="w-4 h-4" />
                        <span className="font-medium">Consejería</span>
                      </div>
                      <div className="text-[18px] font-bold text-[#F1F5F9]">Activa</div>
                      <div className="text-[10.5px] text-[#94A3B8]">Gemini Mentores</div>
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {onOpenFiles && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenFiles();
                        }}
                        className="p-2.5 rounded-[10px] bg-sky-500/15 border border-sky-500/30 hover:bg-sky-500/25 text-sky-300 text-[12px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <FolderOpen className="w-4 h-4" />
                        <span>Mis Archivos de Fe</span>
                      </button>
                    )}

                    {onOpenHistory && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenHistory();
                        }}
                        className="p-2.5 rounded-[10px] bg-amber-500/15 border border-amber-500/30 hover:bg-amber-500/25 text-amber-300 text-[12px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <History className="w-4 h-4" />
                        <span>Ver Historial Total</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'logins' && (
                <div className="space-y-3">
                  <div className="text-[11.5px] uppercase font-semibold text-[#CBD5E1] tracking-wider flex items-center justify-between">
                    <span>Registro de Inicios de Sesión (Google)</span>
                    <span className="text-[10px] text-[#94A3B8] font-normal">Auditoría segura</span>
                  </div>

                  {loginLogs.length === 0 ? (
                    <div className="p-5 rounded-[12px] bg-white/[0.02] border border-white/[0.06] text-center text-[12.5px] text-[#94A3B8]">
                      Registro de sesión actual inicializado en Firestore.
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                      {loginLogs.map((log) => (
                        <div
                          key={log.id}
                          className="p-2.5 rounded-[10px] bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-[11.5px]"
                        >
                          <div className="flex items-center gap-2">
                            {log.device?.toLowerCase().includes('móvil') ? (
                              <Smartphone className="w-4 h-4 text-[#F59E0B]" />
                            ) : (
                              <Laptop className="w-4 h-4 text-sky-400" />
                            )}
                            <div>
                              <div className="font-semibold text-[#F1F5F9]">
                                {log.device || 'Navegador Web'}
                              </div>
                              <div className="text-[#94A3B8] text-[10.5px]">
                                {new Date(log.loginTime).toLocaleDateString('es-ES', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 text-[10px] font-medium">
                              Google OAuth
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sign out button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isLoading}
                className="w-full mt-2 min-h-[44px] py-2.5 px-4 rounded-[12px] border border-red-500/25 bg-red-500/10 hover:bg-red-500/20 text-[13px] font-medium text-red-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>{isLoading ? 'Cerrando sesión...' : 'Cerrar sesión'}</span>
              </button>
            </div>
          ) : (
            /* Sign-in prompt view */
            <div className="space-y-4">
              <p className="text-[13.5px] text-[#94A3B8] leading-relaxed">
                Registra tu usuario e inicia sesión con tu correo electrónico de Google para activar la base de datos persistente en Firestore:
              </p>

              <div className="space-y-2.5 p-3.5 rounded-[16px] bg-[#0F1E33] border border-white/[0.08]">
                <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                  <Cloud className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F1F5F9]">Base de datos de usuario:</strong> Guarda tu perfil, progreso y configuración de fe.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                  <FolderOpen className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F1F5F9]">Base de datos de archivos:</strong> Graba oraciones en audio y sube documentos devocionales.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                  <History className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F1F5F9]">Base de datos de historial:</strong> Registra oraciones, diario de gratitud y auditoría de logins.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                  <HardDrive className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F1F5F9]">Google Drive integrado:</strong> Guarda y respalda notas devocionales, diarios y oraciones en tu nube personal.
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-[12.5px] text-[#CBD5E1]">
                  <KeyRound className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F1F5F9]">Login seguro por correo Google:</strong> Acceso autenticado mediante OAuth 2.0.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignIn}
                disabled={isLoading}
                className="w-full min-h-[48px] py-2.5 px-4 rounded-[12px] bg-white hover:bg-slate-100 active:bg-slate-200 text-[#1F2937] font-semibold text-[14px] flex items-center justify-center gap-3 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                </svg>
                <span>{isLoading ? 'Conectando con Google...' : 'Iniciar Sesión con Google'}</span>
              </button>

              <p className="text-[11px] text-center text-[#64748B]">
                Tus datos están protegidos por Firebase Security Rules ABAC. Nadie más puede acceder a tus oraciones.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
