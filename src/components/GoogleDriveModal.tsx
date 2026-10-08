import React, { useState, useEffect } from 'react';
import {
  X,
  HardDrive,
  FolderOpen,
  FolderPlus,
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Plus,
  Sparkles,
  Cloud,
  FileAudio,
  File,
  LogIn,
  Shield,
  Layers,
  ArrowRight,
  FileSpreadsheet,
} from 'lucide-react';
import {
  getDriveAbout,
  listDriveFiles,
  createDriveFolder,
  createDevotionalNoteInDrive,
  uploadToDrive,
  uploadUserFileToDrive,
  deleteDriveFile,
  getOrCreateAppFolder,
  APP_FOLDER_NAME,
} from '../services/googleDriveService';
import { getGoogleAccessToken, connectGoogleDrive, auth } from '../firebase';
import { GoogleDriveFile, GoogleDriveQuota, GoogleDriveUser, UserFile } from '../types';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  localFiles?: UserFile[];
  onOpenGoogleSheets?: () => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  localFiles = [],
  onOpenGoogleSheets,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [driveFiles, setDriveFiles] = useState<GoogleDriveFile[]>([]);
  const [quota, setQuota] = useState<GoogleDriveQuota | null>(null);
  const [driveUser, setDriveUser] = useState<GoogleDriveUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [currentFolderId, setCurrentFolderId] = useState<string | undefined>(undefined);
  const [folderHistory, setFolderHistory] = useState<{ id?: string; name: string }[]>([
    { name: 'Mi Unidad' },
  ]);

  // Modal active tabs
  const [activeTab, setActiveTab] = useState<'browse' | 'new_note' | 'upload' | 'sync'>('browse');

  // Form states
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [selectedUploadFile, setSelectedUploadFile] = useState<File | null>(null);
  const [uploadDescription, setUploadDescription] = useState('');

  // Status feedback
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  // Destructive Confirmation Dialog State
  const [fileToDelete, setFileToDelete] = useState<GoogleDriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState<string | null>(null);

  // Check auth and load Drive files
  useEffect(() => {
    if (!isOpen) return;
    const token = getGoogleAccessToken();
    if (token) {
      setIsConnected(true);
      loadDriveData();
    } else {
      setIsConnected(false);
    }
  }, [isOpen, currentFolderId, filterType]);

  const loadDriveData = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      const about = await getDriveAbout();
      setQuota(about.quota);
      if (about.user) setDriveUser(about.user);

      const files = await listDriveFiles({
        folderId: currentFolderId,
        query: searchQuery,
        mimeTypeFilter: filterType,
      });
      setDriveFiles(files);
      setIsConnected(true);
    } catch (err: any) {
      console.warn('Google Drive load error:', err);
      // If unauthorized, prompt sign in
      if (err.message && (err.message.includes('401') || err.message.includes('autenticación'))) {
        setIsConnected(false);
      } else {
        setStatusMessage({
          type: 'error',
          text: err.message || 'No se pudieron cargar los archivos de Google Drive.',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      await connectGoogleDrive();
      setIsConnected(true);
      await loadDriveData();
      setStatusMessage({
        type: 'success',
        text: '¡Google Drive conectado exitosamente con tu cuenta!',
      });
    } catch (err: any) {
      console.error('Error connecting Google Drive:', err);
      setStatusMessage({
        type: 'error',
        text: 'No se pudo conectar a Google Drive. Por favor concede los permisos solicitados.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    loadDriveData();
  };

  // Navigate into a folder
  const handleOpenFolder = (folder: GoogleDriveFile) => {
    setCurrentFolderId(folder.id);
    setFolderHistory((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  // Navigate back in breadcrumb
  const handleBreadcrumbClick = (index: number) => {
    const target = folderHistory[index];
    setFolderHistory((prev) => prev.slice(0, index + 1));
    setCurrentFolderId(target.id);
  };

  // Create new folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setIsLoading(true);
    try {
      await createDriveFolder(newFolderName.trim(), currentFolderId);
      setStatusMessage({
        type: 'success',
        text: `Carpeta "${newFolderName.trim()}" creada con éxito en Google Drive.`,
      });
      setNewFolderName('');
      setIsCreatingFolder(false);
      await loadDriveData();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al crear la carpeta en Google Drive.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Create devotional text note
  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;
    setIsLoading(true);
    try {
      const created = await createDevotionalNoteInDrive(
        newNoteTitle.trim(),
        newNoteContent.trim(),
        currentFolderId
      );
      setStatusMessage({
        type: 'success',
        text: `Nota devocional "${created.name}" guardada con éxito en Google Drive.`,
      });
      setNewNoteTitle('');
      setNewNoteContent('');
      setActiveTab('browse');
      await loadDriveData();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al guardar la nota devocional en Google Drive.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Upload local file to Drive
  const handleUploadFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUploadFile) return;
    setIsLoading(true);
    try {
      await uploadToDrive(
        selectedUploadFile,
        selectedUploadFile.name,
        selectedUploadFile.type,
        {
          folderId: currentFolderId,
          description: uploadDescription || 'Archivo cargado desde F.E.™ Tu Poder Mental',
        }
      );
      setStatusMessage({
        type: 'success',
        text: `Archivo "${selectedUploadFile.name}" subido con éxito a Google Drive.`,
      });
      setSelectedUploadFile(null);
      setUploadDescription('');
      setActiveTab('browse');
      await loadDriveData();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al subir el archivo a Google Drive.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Backup all local files to Google Drive
  const handleSyncLocalFiles = async () => {
    if (!localFiles || localFiles.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'No tienes archivos ni grabaciones locales para respaldar.',
      });
      return;
    }

    setIsSyncing(true);
    setStatusMessage(null);
    try {
      setSyncProgress('Creando o verificando carpeta en Google Drive...');
      const appFolder = await getOrCreateAppFolder();
      let count = 0;

      for (let i = 0; i < localFiles.length; i++) {
        const file = localFiles[i];
        setSyncProgress(`Subiendo (${i + 1}/${localFiles.length}): ${file.name}...`);
        await uploadUserFileToDrive(file, appFolder.id);
        count++;
      }

      setStatusMessage({
        type: 'success',
        text: `¡Se respaldaron con éxito ${count} archivo(s) en la carpeta "${APP_FOLDER_NAME}" de Google Drive!`,
      });
      setCurrentFolderId(appFolder.id);
      setFolderHistory([{ name: 'Mi Unidad' }, { id: appFolder.id, name: appFolder.name }]);
      setActiveTab('browse');
      await loadDriveData();
    } catch (err: any) {
      console.error('Sync error:', err);
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error durante la sincronización a Google Drive.',
      });
    } finally {
      setIsSyncing(false);
      setSyncProgress(null);
    }
  };

  // Perform confirmed deletion (Destructive operation dialog)
  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      setStatusMessage({
        type: 'success',
        text: `"${fileToDelete.name}" fue eliminado de Google Drive.`,
      });
      setFileToDelete(null);
      await loadDriveData();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err.message || 'Error al eliminar el archivo de Google Drive.',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  // Format bytes helper
  const formatBytes = (bytesStr?: string) => {
    if (!bytesStr) return '0 B';
    const bytes = parseInt(bytesStr, 10);
    if (isNaN(bytes) || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Calculate quota percentage
  const usageBytes = quota?.usage ? parseInt(quota.usage, 10) : 0;
  const limitBytes = quota?.limit ? parseInt(quota.limit, 10) : 0;
  const quotaPercent = limitBytes > 0 ? Math.min(100, Math.round((usageBytes / limitBytes) * 100)) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#081220] border border-sky-500/30 rounded-[24px] shadow-2xl text-[#F1F5F9] overflow-hidden">
        {/* Header with Google Drive Branding */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0B1A2E]/80">
          <div className="flex items-center gap-3">
            {/* Google Drive Tri-Color Icon Badge */}
            <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-sky-500/20 via-emerald-500/20 to-amber-500/20 border border-sky-400/30 flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6" viewBox="0 0 87.3 78" xmlns="http://www.w3.org/2000/svg">
                <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44c-.8 1.4-1.2 2.95-1.2 4.5h27.5z" fill="#00ac47"/>
                <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.5l5.85 10.15z" fill="#ea4335"/>
                <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.4-4.5 1.2z" fill="#00832d"/>
                <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.4 4.5-1.2z" fill="#2684fc"/>
                <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-[20px] sm:text-[22px] text-[#F1F5F9] font-normal leading-tight">
                  Google Drive Integrado
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10.5px] px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
                  Workspace API
                </span>
              </div>
              <p className="text-[12px] text-[#94A3B8]">
                Almacenamiento, respaldo de fe y notas devocionales en tu nube de Google
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenGoogleSheets && (
              <button
                type="button"
                onClick={onOpenGoogleSheets}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 text-xs border border-emerald-500/30 transition-colors cursor-pointer"
                title="Abrir Google Sheets"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Google Sheets</span>
              </button>
            )}

            {isConnected && (
              <button
                type="button"
                onClick={loadDriveData}
                disabled={isLoading}
                title="Actualizar archivos"
                className="p-2 text-[#94A3B8] hover:text-sky-300 rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-sky-400' : ''}`} />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {statusMessage && (
          <div
            className={`mx-4 sm:mx-6 mt-3 p-3 rounded-[12px] text-[12.5px] flex items-center justify-between gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/15 border border-red-500/30 text-red-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs opacity-75 hover:opacity-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {!isConnected ? (
            /* Not Connected State: Official Google Sign-in Prompt */
            <div className="py-8 px-4 text-center max-w-lg mx-auto space-y-5">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shadow-lg">
                <HardDrive className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-[20px] font-semibold text-[#F1F5F9]">
                  Conecta tu Google Drive
                </h3>
                <p className="text-[13.5px] text-[#94A3B8] mt-2 leading-relaxed">
                  Accede a tus documentos, oraciones grabadas, diarios y estudios bíblicos almacenados directamente en tu unidad personal de Google Drive con permisos seguros otorgados por ti.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="p-3 rounded-[14px] bg-[#0E1A2B] border border-white/[0.08] text-[12px] text-[#CBD5E1] space-y-1">
                  <div className="font-semibold text-sky-300 flex items-center gap-1.5">
                    <Cloud className="w-3.5 h-3.5" />
                    <span>Nube Personal</span>
                  </div>
                  <p className="text-[#94A3B8]">Tus archivos se guardan directamente en tu cuenta privada de Google.</p>
                </div>

                <div className="p-3 rounded-[14px] bg-[#0E1A2B] border border-white/[0.08] text-[12px] text-[#CBD5E1] space-y-1">
                  <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Permiso Controlado</span>
                  </div>
                  <p className="text-[#94A3B8]">Tú decides cuándo crear, respaldar o eliminar archivos en tu Drive.</p>
                </div>
              </div>

              {/* Official Google Sign-In Styled Button per skill requirements */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleConnect}
                  disabled={isLoading}
                  className="min-h-[48px] px-6 py-2.5 rounded-[12px] bg-white hover:bg-slate-100 text-[#1F2937] font-semibold text-[14px] flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span>{isLoading ? 'Conectando con Google Drive...' : 'Conectar con Google Drive'}</span>
                </button>
              </div>

              <p className="text-[11px] text-[#64748B]">
                Acceso mediante token seguro en memoria (OAuth 2.0). Cumple con las directivas de seguridad de Google.
              </p>
            </div>
          ) : (
            /* Connected View: Full Google Drive Experience */
            <div className="space-y-4">
              {/* Account & Storage Info Banner */}
              <div className="p-3.5 sm:p-4 rounded-[16px] bg-[#0E1A2B] border border-white/[0.08] flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {driveUser?.photoLink ? (
                    <img
                      src={driveUser.photoLink}
                      alt="Usuario Google"
                      className="w-10 h-10 rounded-full border border-sky-400/40 object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {driveUser?.displayName?.charAt(0) || 'G'}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-semibold text-[#F1F5F9] truncate">
                        {driveUser?.displayName || auth.currentUser?.displayName || 'Cuenta de Google'}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                        Drive Activo
                      </span>
                    </div>
                    <div className="text-[12px] text-[#94A3B8] truncate">
                      {driveUser?.emailAddress || auth.currentUser?.email}
                    </div>
                  </div>
                </div>

                {/* Quota Progress Bar */}
                {quota && limitBytes > 0 && (
                  <div className="w-full md:w-64 space-y-1.5 shrink-0">
                    <div className="flex items-center justify-between text-[11px] text-[#94A3B8]">
                      <span>Almacenamiento en Drive:</span>
                      <span className="font-mono text-[#CBD5E1]">
                        {formatBytes(quota.usage)} / {formatBytes(quota.limit)} ({quotaPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/[0.08] overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-emerald-400 rounded-full transition-all duration-500"
                        style={{ width: `${quotaPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Tabs */}
              <div className="flex items-center gap-2 border-b border-white/[0.08] pb-2 overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab('browse')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'browse'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  <span>Explorar Drive ({driveFiles.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('new_note')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'new_note'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Crear Nota Devocional en Drive</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'upload'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  <span>Subir Archivo a Drive</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('sync')}
                  className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                    activeTab === 'sync'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                      : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Respaldar Archivos Locales</span>
                </button>
              </div>

              {/* Tab 1: Browse Files */}
              {activeTab === 'browse' && (
                <div className="space-y-4">
                  {/* Search, Filter & New Folder Bar */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                    <form onSubmit={handleSearch} className="relative flex-1">
                      <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar archivos por nombre o contenido..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-[#0E1A2B] border border-white/[0.08] rounded-[10px] text-[13px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-sky-500"
                      />
                    </form>

                    <div className="flex items-center gap-2">
                      <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="bg-[#0E1A2B] border border-white/[0.08] rounded-[10px] px-3 py-2 text-[12px] text-[#CBD5E1] focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="all">Todos los tipos</option>
                        <option value="folder">Carpetas</option>
                        <option value="document">Documentos / Notas</option>
                        <option value="audio">Audios</option>
                        <option value="image">Imágenes</option>
                      </select>

                      <button
                        type="button"
                        onClick={() => setIsCreatingFolder(!isCreatingFolder)}
                        className="px-3 py-2 rounded-[10px] bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-300 text-[12px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      >
                        <FolderPlus className="w-4 h-4" />
                        <span>Nueva Carpeta</span>
                      </button>
                    </div>
                  </div>

                  {/* Create Folder Inline Form */}
                  {isCreatingFolder && (
                    <form
                      onSubmit={handleCreateFolder}
                      className="p-3 rounded-[12px] bg-[#0E1A2B] border border-sky-500/30 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Nombre de la nueva carpeta (ej. Oraciones 2026)..."
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        autoFocus
                        className="flex-1 bg-black/40 border border-white/[0.1] rounded-[8px] px-3 py-1.5 text-[13px] text-[#F1F5F9] focus:outline-none focus:border-sky-400"
                      />
                      <button
                        type="submit"
                        disabled={isLoading || !newFolderName.trim()}
                        className="px-3 py-1.5 rounded-[8px] bg-sky-500 text-[#060F1E] font-semibold text-[12px] cursor-pointer hover:bg-sky-400 disabled:opacity-50"
                      >
                        Crear
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCreatingFolder(false)}
                        className="p-1.5 text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </form>
                  )}

                  {/* Breadcrumb Navigation */}
                  <div className="flex items-center gap-1.5 text-[12px] text-[#94A3B8] overflow-x-auto py-1">
                    {folderHistory.map((crumb, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && <span>/</span>}
                        <button
                          type="button"
                          onClick={() => handleBreadcrumbClick(idx)}
                          className={`hover:underline cursor-pointer ${
                            idx === folderHistory.length - 1
                              ? 'text-sky-300 font-semibold'
                              : 'text-[#94A3B8]'
                          }`}
                        >
                          {crumb.name}
                        </button>
                      </React.Fragment>
                    ))}
                  </div>

                  {/* File List */}
                  {isLoading ? (
                    <div className="py-12 text-center text-[#94A3B8] space-y-2">
                      <RefreshCw className="w-6 h-6 mx-auto animate-spin text-sky-400" />
                      <p className="text-[13px]">Consultando Google Drive...</p>
                    </div>
                  ) : driveFiles.length === 0 ? (
                    <div className="py-12 text-center text-[#94A3B8] bg-[#0E1A2B]/40 border border-dashed border-white/[0.08] rounded-[16px] space-y-2">
                      <FolderOpen className="w-8 h-8 mx-auto text-[#64748B]" />
                      <p className="text-[13.5px] font-medium text-[#CBD5E1]">
                        No se encontraron archivos en esta ubicación
                      </p>
                      <p className="text-[12px] text-[#64748B]">
                        Crea una nota devocional o sube un archivo para verlo aquí.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {driveFiles.map((file) => (
                        <div
                          key={file.id}
                          className="p-3.5 rounded-[14px] bg-[#0E1A2B] border border-white/[0.08] hover:border-sky-500/40 transition-all flex items-start justify-between gap-3 group"
                        >
                          <div
                            className="flex items-start gap-3 min-w-0 flex-1 cursor-pointer"
                            onClick={() => (file.isFolder ? handleOpenFolder(file) : null)}
                          >
                            {/* File/Folder Icon */}
                            <div className="w-10 h-10 rounded-[10px] bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                              {file.isFolder ? (
                                <FolderOpen className="w-5 h-5 text-amber-400" />
                              ) : file.mimeType.includes('audio') ? (
                                <FileAudio className="w-5 h-5 text-emerald-400" />
                              ) : file.mimeType.includes('document') || file.mimeType.includes('text') ? (
                                <FileText className="w-5 h-5 text-sky-400" />
                              ) : (
                                <File className="w-5 h-5 text-indigo-400" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-[13.5px] font-medium text-[#F1F5F9] truncate group-hover:text-sky-300 transition-colors">
                                {file.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-[#94A3B8] mt-0.5">
                                {file.size && <span>{formatBytes(file.size)}</span>}
                                {file.modifiedTime && (
                                  <span>• {new Date(file.modifiedTime).toLocaleDateString('es-ES')}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex items-center gap-1 shrink-0">
                            {file.webViewLink && (
                              <a
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Abrir en Google Drive"
                                className="p-1.5 text-[#94A3B8] hover:text-sky-300 hover:bg-white/[0.06] rounded-[8px] transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}

                            {/* Delete Button (Triggers Mandatory Confirmation Dialog) */}
                            <button
                              type="button"
                              onClick={() => setFileToDelete(file)}
                              title="Eliminar de Google Drive"
                              className="p-1.5 text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 rounded-[8px] transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Create Devotional Note in Drive */}
              {activeTab === 'new_note' && (
                <form onSubmit={handleCreateNote} className="space-y-4 max-w-2xl mx-auto">
                  <div className="p-3.5 rounded-[14px] bg-amber-500/10 border border-amber-500/25 text-[12.5px] text-amber-200">
                    <p className="font-semibold">Guardar en Google Drive como Documento:</p>
                    <p className="text-amber-300/80 mt-0.5">
                      Esta nota se creará como archivo de texto devocional directamente en tu unidad personal de Google Drive.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-medium text-[#CBD5E1] mb-1.5">
                      Título del Devocional o Clamor:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Salmo 23 y Oración por Paz Nocturna"
                      value={newNoteTitle}
                      onChange={(e) => setNewNoteTitle(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#0E1A2B] border border-white/[0.1] rounded-[12px] text-[13.5px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-medium text-[#CBD5E1] mb-1.5">
                      Contenido / Declaración de Fe:
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Escribe tu reflexión espiritual, versículos de anclaje, peticiones o diario de gratitud..."
                      value={newNoteContent}
                      onChange={(e) => setNewNoteContent(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-[#0E1A2B] border border-white/[0.1] rounded-[12px] text-[13.5px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('browse')}
                      className="px-4 py-2 rounded-[10px] text-[13px] text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !newNoteTitle.trim() || !newNoteContent.trim()}
                      className="px-5 py-2 rounded-[12px] bg-amber-500 hover:bg-amber-400 text-[#060F1E] font-semibold text-[13px] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{isLoading ? 'Guardando en Drive...' : 'Crear en Google Drive'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 3: Upload Local File */}
              {activeTab === 'upload' && (
                <form onSubmit={handleUploadFile} className="space-y-4 max-w-2xl mx-auto">
                  <div className="p-3.5 rounded-[14px] bg-emerald-500/10 border border-emerald-500/25 text-[12.5px] text-emerald-200">
                    <p className="font-semibold">Subir Archivo Local a tu Google Drive:</p>
                    <p className="text-emerald-300/80 mt-0.5">
                      Sube archivos PDF, documentos bíblicos, notas de audio o imágenes devocionales.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-medium text-[#CBD5E1] mb-1.5">
                      Seleccionar Archivo:
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setSelectedUploadFile(e.target.files?.[0] || null)}
                      required
                      className="w-full px-3 py-2 bg-[#0E1A2B] border border-white/[0.1] rounded-[12px] text-[12.5px] text-[#CBD5E1] file:mr-3 file:py-1.5 file:px-3 file:rounded-[8px] file:border-0 file:text-[12px] file:font-semibold file:bg-emerald-500/20 file:text-emerald-300 hover:file:bg-emerald-500/30 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="block text-[12.5px] font-medium text-[#CBD5E1] mb-1.5">
                      Descripción (Opcional):
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Audio de clamor grabado en vigilia"
                      value={uploadDescription}
                      onChange={(e) => setUploadDescription(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#0E1A2B] border border-white/[0.1] rounded-[12px] text-[13px] text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('browse')}
                      className="px-4 py-2 rounded-[10px] text-[13px] text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading || !selectedUploadFile}
                      className="px-5 py-2 rounded-[12px] bg-emerald-500 hover:bg-emerald-400 text-[#060F1E] font-semibold text-[13px] flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Upload className="w-4 h-4" />
                      <span>{isLoading ? 'Subiendo a Drive...' : 'Subir a Google Drive'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Tab 4: Sync Local Files */}
              {activeTab === 'sync' && (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="p-4 rounded-[16px] bg-indigo-500/10 border border-indigo-500/25 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-300 font-semibold text-[14px]">
                      <Layers className="w-5 h-5" />
                      <span>Copia de Respaldo en la Carpeta "{APP_FOLDER_NAME}"</span>
                    </div>
                    <p className="text-[12.5px] text-[#CBD5E1] leading-relaxed">
                      Sincroniza todos tus audios grabados, notas y documentos guardados localmente hacia una carpeta organizada en tu Google Drive para que nunca pierdas tu historial espiritual.
                    </p>
                  </div>

                  <div className="p-4 rounded-[14px] bg-[#0E1A2B] border border-white/[0.08] space-y-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="text-[#94A3B8]">Archivos locales disponibles:</span>
                      <span className="font-semibold text-[#F1F5F9]">{localFiles.length} archivo(s)</span>
                    </div>

                    {localFiles.length > 0 && (
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {localFiles.map((f) => (
                          <div
                            key={f.id}
                            className="p-2 rounded-[8px] bg-white/[0.03] flex items-center justify-between text-[12px]"
                          >
                            <span className="text-[#CBD5E1] truncate">{f.name}</span>
                            <span className="text-[#64748B] text-[11px] shrink-0">
                              {f.fileType === 'audio' ? 'Audio' : 'Doc'}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {syncProgress && (
                    <div className="p-3 rounded-[10px] bg-sky-500/15 border border-sky-500/30 text-sky-300 text-[12.5px] flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                      <span>{syncProgress}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('browse')}
                      className="px-4 py-2 rounded-[10px] text-[13px] text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                    >
                      Volver
                    </button>
                    <button
                      type="button"
                      onClick={handleSyncLocalFiles}
                      disabled={isSyncing || localFiles.length === 0}
                      className="px-5 py-2.5 rounded-[12px] bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-[13px] flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <Cloud className="w-4 h-4" />
                      <span>{isSyncing ? 'Sincronizando...' : 'Iniciar Respaldo a Google Drive'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Confirmation Dialog for Destructive Operations (MANDATORY per Workspace skill) */}
        {fileToDelete && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          >
            <div className="w-full max-w-md bg-[#0F1E33] border border-red-500/30 rounded-[20px] p-5 shadow-2xl text-[#F1F5F9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-[17px] font-semibold text-[#F1F5F9]">
                  ¿Eliminar archivo de Google Drive?
                </h3>
                <p className="text-[13px] text-[#94A3B8] leading-relaxed">
                  Estás a punto de eliminar permanentemente{' '}
                  <strong className="text-red-300">"{fileToDelete.name}"</strong> de tu cuenta de Google Drive.
                </p>
              </div>

              <p className="text-[11.5px] text-[#64748B] text-center">
                Esta acción no se puede deshacer. Se requiere confirmación explícita según las directivas de seguridad.
              </p>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-[10px] text-[13px] text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 rounded-[10px] bg-red-500 hover:bg-red-600 text-white font-semibold text-[13px] flex items-center gap-1.5 cursor-pointer shadow-md disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeleting ? 'Eliminando...' : 'Sí, Eliminar de Drive'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
