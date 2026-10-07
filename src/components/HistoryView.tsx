import React, { useState } from 'react';
import {
  SavedAnchor,
  GratitudeEntry,
  UserFile,
  LoginLog,
} from '../types';
import {
  Trash2,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  FolderOpen,
  HeartHandshake,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Laptop,
  Volume2,
  FileText,
  Clock,
  Sparkles,
  Download,
  Calendar,
  Cloud,
} from 'lucide-react';
import { auth } from '../firebase';

interface HistoryViewProps {
  anchors: SavedAnchor[];
  onSelectAnchor: (anchor: SavedAnchor) => void;
  onStartNew: () => void;
  onClearAll: () => void;
  onBack: () => void;
  gratitudeEntries?: GratitudeEntry[];
  userFiles?: UserFile[];
  loginLogs?: LoginLog[];
  onSelectGratitude?: () => void;
  onOpenFilesManager?: () => void;
  onOpenAuth?: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  anchors,
  onSelectAnchor,
  onStartNew,
  onClearAll,
  onBack,
  gratitudeEntries = [],
  userFiles = [],
  loginLogs = [],
  onSelectGratitude,
  onOpenFilesManager,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'anchors' | 'files' | 'gratitude' | 'logins'>('anchors');
  const [searchFilter, setSearchFilter] = useState('');

  const currentUser = auth.currentUser;

  return (
    <div className="w-full max-w-[820px] mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fade-in">
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/[0.08] gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer w-fit"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span>Volver al botiquín</span>
        </button>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-emerald-500/10 border border-emerald-500/25 text-[11.5px] text-emerald-300">
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sincronizado con Firestore: {currentUser.email}</span>
            </div>
          ) : (
            onOpenAuth && (
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-3 py-1.5 rounded-[10px] bg-amber-500/15 border border-amber-500/30 text-amber-300 hover:bg-amber-500/25 text-[12px] font-medium transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Conectar con Google</span>
              </button>
            )
          )}

          {activeTab === 'anchors' && anchors.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="min-h-[40px] px-3 py-1.5 text-[12px] text-[#94A3B8] hover:text-[#EF4444] hover:bg-red-500/10 rounded-[8px] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Limpiar registro guardado en este equipo"
            >
              <Trash2 className="w-3.5 h-3.5" strokeWidth={1.75} />
              <span>Borrar anclas</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Title & Description */}
      <div>
        <h1 className="font-editorial text-[24px] sm:text-[28px] text-[#F1F5F9] font-normal leading-tight">
          Centro de Historial & Registros de Fe
        </h1>
        <p className="text-[13.5px] text-[#94A3B8] mt-1">
          Base de datos de tus oraciones, audios devocionales, notas de gratitud y accesos de usuario.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-white/[0.08] scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('anchors')}
          className={`px-3.5 py-2 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'anchors'
              ? 'bg-[#F59E0B] text-[#060F1E] font-semibold shadow-sm'
              : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Oraciones Guardadas ({anchors.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('files')}
          className={`px-3.5 py-2 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'files'
              ? 'bg-sky-500 text-white font-semibold shadow-sm'
              : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Archivos & Audios ({userFiles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('gratitude')}
          className={`px-3.5 py-2 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'gratitude'
              ? 'bg-emerald-500 text-[#060F1E] font-semibold shadow-sm'
              : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
          }`}
        >
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Diario de Gratitud ({gratitudeEntries.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logins')}
          className={`px-3.5 py-2 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-2 shrink-0 ${
            activeTab === 'logins'
              ? 'bg-indigo-500 text-white font-semibold shadow-sm'
              : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
          }`}
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Inicios de Sesión ({loginLogs.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED ANCHORS */}
      {activeTab === 'anchors' && (
        <div className="space-y-4">
          {anchors.length === 0 ? (
            <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-8 sm:p-12 text-center flex flex-col items-center shadow-sm">
              <div className="w-14 h-14 rounded-full bg-[#F59E0B]/15 border border-[#F59E0B]/30 flex items-center justify-center mb-4 text-[#F59E0B]">
                <Bookmark className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <h2 className="font-editorial text-[22px] sm:text-[24px] text-[#F1F5F9] font-normal mb-2">
                Ninguna promesa guardada aún
              </h2>
              <p className="text-[14px] text-[#94A3B8] max-w-[42ch] mb-6 leading-relaxed">
                Aquí se guardarán de forma privada tus oraciones y anclas espirituales para que puedas volver a ellas en cualquier momento.
              </p>
              <button
                type="button"
                onClick={onStartNew}
                className="min-h-[46px] px-6 py-2.5 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] font-semibold text-[13.5px] transition-colors cursor-pointer shadow-md"
              >
                Buscar a Dios ahora
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {anchors.map((anchor) => (
                <div
                  key={anchor.id}
                  className="p-5 rounded-[16px] bg-[#0B1728] border border-white/[0.08] hover:border-white/[0.18] transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10.5px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">
                          {anchor.symptomLabel}
                        </span>
                        <span className="text-[11.5px] text-[#94A3B8]">
                          {anchor.displayDate}
                        </span>
                      </div>
                      <span className="text-[12px] font-semibold text-[#10B981] flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                        {anchor.scriptureRef}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectAnchor(anchor)}
                      className="min-h-[40px] px-3.5 py-1.5 rounded-[10px] bg-white/[0.04] hover:bg-[#F59E0B] hover:text-[#060F1E] text-[#F1F5F9] border border-white/[0.1] text-[12px] font-medium transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Releer</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                    </button>
                  </div>

                  <p className="font-editorial text-[14px] italic text-[#CBD5E1] line-clamp-2 leading-relaxed">
                    «{anchor.declaration}»
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: USER FILES & VOICE RECORDINGS */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#94A3B8]">
              Documentos, audios de clamor y archivos registrados en Firestore
            </span>
            {onOpenFilesManager && (
              <button
                type="button"
                onClick={onOpenFilesManager}
                className="px-3 py-1.5 rounded-[10px] bg-sky-500 hover:bg-sky-600 text-white text-[12px] font-medium flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Abrir Gestor de Archivos</span>
              </button>
            )}
          </div>

          {userFiles.length === 0 ? (
            <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-3">
                <FolderOpen className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-[20px] text-[#F1F5F9] font-normal mb-1">
                Aún no has guardado archivos ni audios de oración
              </h3>
              <p className="text-[13px] text-[#94A3B8] max-w-[42ch] mb-4">
                Puedes grabar oraciones con tu voz o subir notas y documentos devocionales a tu base de datos.
              </p>
              {onOpenFilesManager && (
                <button
                  type="button"
                  onClick={onOpenFilesManager}
                  className="px-5 py-2.5 rounded-[12px] bg-sky-500 hover:bg-sky-600 text-white font-semibold text-[13px] cursor-pointer"
                >
                  Grabar o Subir Primer Archivo
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {userFiles.map((f) => (
                <div
                  key={f.id}
                  className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
                        {f.fileType === 'audio' ? <Volume2 className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13.5px] font-semibold text-[#F1F5F9] truncate">{f.name}</div>
                        <div className="text-[11px] text-[#94A3B8]">
                          {f.category || f.fileType} • {(f.sizeBytes / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                  </div>

                  {f.description && (
                    <p className="text-[11.5px] text-[#94A3B8] italic bg-white/[0.02] p-2 rounded-[8px]">
                      «{f.description}»
                    </p>
                  )}

                  {f.fileType === 'audio' && f.dataUrl && (
                    <audio controls src={f.dataUrl} className="w-full h-8 accent-sky-400" preload="none" />
                  )}

                  <div className="text-[10.5px] text-[#64748B] pt-1 border-t border-white/[0.04]">
                    Registrado el {new Date(f.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GRATITUDE JOURNAL ENTRIES */}
      {activeTab === 'gratitude' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#94A3B8]">
              Tus motivos diarios de agradecimiento registrados ante Dios
            </span>
            {onSelectGratitude && (
              <button
                type="button"
                onClick={onSelectGratitude}
                className="px-3 py-1.5 rounded-[10px] bg-emerald-500 hover:bg-emerald-600 text-[#060F1E] text-[12px] font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              >
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Abrir Diario de Gratitud</span>
              </button>
            )}
          </div>

          {gratitudeEntries.length === 0 ? (
            <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-[20px] text-[#F1F5F9] font-normal mb-1">
                No hay entradas de gratitud registradas
              </h3>
              <p className="text-[13px] text-[#94A3B8] max-w-[42ch] mb-4">
                Escribe tres motivos diarios de bendición para activar el bienestar espiritual y registrarlo en tu historial.
              </p>
              {onSelectGratitude && (
                <button
                  type="button"
                  onClick={onSelectGratitude}
                  className="px-5 py-2.5 rounded-[12px] bg-emerald-500 hover:bg-emerald-600 text-[#060F1E] font-semibold text-[13px] cursor-pointer"
                >
                  Escribir Diario de Hoy
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {gratitudeEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 rounded-[14px] bg-[#0B1728] border border-white/[0.08] space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-2">
                    <span className="text-[12.5px] font-semibold text-emerald-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {entry.displayDate || entry.dateISO}
                    </span>
                    <span className="text-[11px] text-[#94A3B8]">
                      {entry.items.length} bendiciones anotadas
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-[13px] text-[#CBD5E1]">
                    {entry.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: GOOGLE LOGIN LOGS AUDIT */}
      {activeTab === 'logins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-[#94A3B8]">
              Registro de inicios de sesión por correo electrónico de Google
            </span>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
              OAuth 2.0 Audit
            </span>
          </div>

          {loginLogs.length === 0 ? (
            <div className="bg-[#0B1728] border border-white/[0.08] rounded-[18px] p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-[20px] text-[#F1F5F9] font-normal mb-1">
                Registro de sesión activo
              </h3>
              <p className="text-[13px] text-[#94A3B8] max-w-[42ch]">
                {currentUser
                  ? `Sesión actual autenticada como: ${currentUser.email}. Las entradas de auditoría se guardan automáticamente en Firestore.`
                  : 'Inicia sesión con tu correo de Google para ver el historial completo de accesos.'}
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {loginLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3.5 rounded-[12px] bg-[#0B1728] border border-white/[0.08] flex items-center justify-between gap-3 text-[12.5px]"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                      {log.device?.toLowerCase().includes('móvil') ? (
                        <Smartphone className="w-4 h-4" />
                      ) : (
                        <Laptop className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="font-semibold text-[#F1F5F9]">
                        {log.email}
                      </div>
                      <div className="text-[11.5px] text-[#94A3B8] flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(log.loginTime).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span>•</span>
                        <span>{log.device || 'Navegador Web'}</span>
                      </div>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10.5px] font-medium shrink-0">
                    Google OAuth ✓
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
