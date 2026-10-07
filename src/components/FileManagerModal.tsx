import React, { useState, useRef, useEffect } from 'react';
import {
  FolderOpen,
  Mic,
  Square,
  Play,
  Pause,
  Upload,
  Trash2,
  Download,
  FileText,
  Volume2,
  FileCheck,
  X,
  Plus,
  AlertCircle,
  Clock,
  Sparkles,
  HardDrive,
  FileUp,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { UserFile, UserFileCategory, UserFileType } from '../types';
import { auth } from '../firebase';

interface FileManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  files: UserFile[];
  onSaveFile: (file: UserFile) => Promise<void>;
  onDeleteFile: (fileId: string) => Promise<void>;
  onOpenAuth?: () => void;
}

export const FileManagerModal: React.FC<FileManagerModalProps> = ({
  isOpen,
  onClose,
  files,
  onSaveFile,
  onDeleteFile,
  onOpenAuth,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'record' | 'upload'>('list');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordedAudioBlob, setRecordedAudioBlob] = useState<Blob | null>(null);
  const [recordingTitle, setRecordingTitle] = useState('');
  const [recordingCategory, setRecordingCategory] = useState<UserFileCategory>('audio_devocional');
  const [recordingDescription, setRecordingDescription] = useState('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // File Upload State
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState<UserFileCategory>('oracion');
  const [uploadDescription, setUploadDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Playback state
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  if (!isOpen) return null;

  // Category labels
  const categoryLabels: Record<UserFileCategory, string> = {
    oracion: 'Oración Escrita',
    reflexion: 'Reflexión Espiritual',
    diario: 'Diario Devocional',
    audio_devocional: 'Audio de Fe / Clamor',
    estudio: 'Estudio Bíblico',
    otro: 'Otro Documento',
  };

  // Start voice recording
  const startRecording = async () => {
    setStatusMessage(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setRecordedAudioBlob(audioBlob);
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      setStatusMessage({
        type: 'error',
        text: 'No se pudo acceder al micrófono. Por favor verifica los permisos del navegador.',
      });
    }
  };

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  // Convert blob to base64 DataURL
  const blobToDataURL = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Save voice recording to database
  const handleSaveRecording = async () => {
    if (!recordedAudioBlob) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const dataUrl = await blobToDataURL(recordedAudioBlob);
      const title =
        recordingTitle.trim() ||
        `Oración Grabada ${new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`;

      const newFile: UserFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        userId: auth.currentUser?.uid || 'guest_user',
        name: title,
        fileType: 'audio',
        mimeType: recordedAudioBlob.type || 'audio/webm',
        sizeBytes: recordedAudioBlob.size,
        category: recordingCategory,
        description: recordingDescription.trim() || undefined,
        dataUrl,
        createdAt: new Date().toISOString(),
      };

      await onSaveFile(newFile);
      setStatusMessage({ type: 'success', text: '¡Audio de oración guardado en la base de datos!' });
      // Reset
      setRecordedAudioBlob(null);
      setRecordedAudioUrl(null);
      setRecordingTitle('');
      setRecordingDescription('');
      setActiveTab('list');
    } catch (err) {
      console.error('Error saving audio file:', err);
      setStatusMessage({ type: 'error', text: 'Error al guardar el archivo en la base de datos.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle file input selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1500000) {
      setStatusMessage({
        type: 'error',
        text: 'El archivo supera el límite recomendado de 1.5MB para almacenamiento directo en Firestore.',
      });
      return;
    }

    setUploadFile(file);
    if (!uploadTitle) {
      setUploadTitle(file.name.replace(/\.[^/.]+$/, ''));
    }
  };

  // Save uploaded file to database
  const handleSaveUploadedFile = async () => {
    if (!uploadFile) return;
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const dataUrl = await blobToDataURL(uploadFile);
      let fileType: UserFileType = 'other';
      if (uploadFile.type.startsWith('audio/')) fileType = 'audio';
      else if (uploadFile.type === 'application/pdf') fileType = 'pdf';
      else if (uploadFile.type.startsWith('image/')) fileType = 'image';
      else if (uploadFile.type.includes('text') || uploadFile.type.includes('document')) fileType = 'document';

      const newFile: UserFile = {
        id: `file_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        userId: auth.currentUser?.uid || 'guest_user',
        name: uploadTitle.trim() || uploadFile.name,
        fileType,
        mimeType: uploadFile.type,
        sizeBytes: uploadFile.size,
        category: uploadCategory,
        description: uploadDescription.trim() || undefined,
        dataUrl,
        createdAt: new Date().toISOString(),
      };

      await onSaveFile(newFile);
      setStatusMessage({ type: 'success', text: '¡Archivo subido y registrado en la base de datos con éxito!' });
      setUploadFile(null);
      setUploadTitle('');
      setUploadDescription('');
      setActiveTab('list');
    } catch (err) {
      console.error('Error saving uploaded file:', err);
      setStatusMessage({ type: 'error', text: 'No se pudo guardar el archivo en la base de datos.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Download a file
  const handleDownload = (file: UserFile) => {
    if (!file.dataUrl) return;
    const link = document.createElement('a');
    link.href = file.dataUrl;
    link.download = file.name.includes('.') ? file.name : `${file.name}.${file.fileType === 'audio' ? 'webm' : 'dat'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Format bytes
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Filtered files
  const filteredFiles = files.filter((f) => {
    const matchesCat = selectedCategory === 'all' || f.category === selectedCategory || f.fileType === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.description && f.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const totalBytes = files.reduce((acc, f) => acc + (f.sizeBytes || 0), 0);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-[800px] max-h-[92vh] flex flex-col bg-[#0B1728] border border-amber-500/25 rounded-[22px] shadow-2xl text-[#F1F5F9] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/[0.08] flex items-center justify-between shrink-0 bg-[#0F1E33]/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B]">
              <FolderOpen className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-editorial text-[20px] sm:text-[22px] text-[#F1F5F9] font-normal leading-tight">
                  Base de Datos de Archivos de Fe
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <HardDrive className="w-2.5 h-2.5" />
                  Firestore DB
                </span>
              </div>
              <p className="text-[12px] text-[#94A3B8]">
                Audios de clamor, oraciones grabadas, notas devocionales y documentos
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#94A3B8] hover:text-[#F1F5F9] rounded-full hover:bg-white/[0.06] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 pb-2 border-b border-white/[0.06] bg-[#0A1424]/40 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-amber-500 text-[#060F1E] font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
              }`}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Mis Archivos ({files.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('record')}
              className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'record'
                  ? 'bg-red-500 text-white font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-red-400" />
              <span>Grabar Oración de Voz</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1.5 rounded-[10px] text-[12.5px] font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-sky-500 text-white font-semibold shadow-sm'
                  : 'bg-white/[0.04] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08]'
              }`}
            >
              <FileUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Subir Archivo</span>
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
            <span>Uso de BD:</span>
            <span className="font-semibold text-amber-400">{formatBytes(totalBytes)}</span>
          </div>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`mx-4 sm:mx-6 mt-3 p-3 rounded-[12px] text-[12.5px] flex items-center gap-2 border ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
                : 'bg-red-500/15 border-red-500/30 text-red-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{statusMessage.text}</span>
          </div>
        )}

        {/* Guest Warning */}
        {!auth.currentUser && (
          <div className="mx-4 sm:mx-6 mt-3 p-2.5 rounded-[12px] bg-amber-500/10 border border-amber-500/25 flex items-center justify-between gap-3 text-[12px]">
            <div className="flex items-center gap-2 text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Modo local temporal. Inicia sesión con Google para sincronizar tus archivos en Firestore.</span>
            </div>
            {onOpenAuth && (
              <button
                type="button"
                onClick={onOpenAuth}
                className="px-2.5 py-1 rounded-[8px] bg-amber-500 text-[#060F1E] font-semibold text-[11px] shrink-0 cursor-pointer hover:bg-amber-400"
              >
                Conectar Google
              </button>
            )}
          </div>
        )}

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* TAB 1: LIST FILES */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Filter and Search Bar */}
              <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                  {['all', 'audio', 'document', 'pdf', 'image'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-2.5 py-1 rounded-[8px] text-[11.5px] font-medium capitalize transition-colors cursor-pointer shrink-0 ${
                        selectedCategory === cat
                          ? 'bg-white/[0.15] text-[#F1F5F9] border border-white/[0.2]'
                          : 'bg-white/[0.03] text-[#94A3B8] hover:bg-white/[0.08]'
                      }`}
                    >
                      {cat === 'all' ? 'Todos los archivos' : cat === 'audio' ? '🎵 Audios' : cat === 'document' ? '📄 Documentos' : cat}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Buscar archivos de fe..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-3 py-1.5 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[12.5px] text-[#F1F5F9] focus:outline-none focus:border-amber-500/50 w-full sm:w-[220px]"
                />
              </div>

              {filteredFiles.length === 0 ? (
                /* Empty state */
                <div className="p-8 sm:p-12 rounded-[18px] bg-[#0A1424]/60 border border-white/[0.06] text-center flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                    <FolderOpen className="w-6 h-6" />
                  </div>
                  <h3 className="font-editorial text-[20px] text-[#F1F5F9] mb-1 font-normal">
                    {files.length === 0 ? 'No hay archivos en tu base de datos de fe' : 'No se encontraron archivos con ese filtro'}
                  </h3>
                  <p className="text-[13px] text-[#94A3B8] max-w-[42ch] mb-5">
                    Graba oraciones en audio, sube reflexiones o guarda documentos de estudio espiritual directamente en Firestore.
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('record')}
                      className="px-4 py-2 rounded-[10px] bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 text-[12.5px] font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5 text-red-400" />
                      <span>Grabar Oración</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('upload')}
                      className="px-4 py-2 rounded-[10px] bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30 text-[12.5px] font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-sky-400" />
                      <span>Subir Documento</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* File Cards Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredFiles.map((file) => {
                    const isAudio = file.fileType === 'audio';
                    const isPlaying = currentlyPlayingId === file.id;

                    return (
                      <div
                        key={file.id}
                        className="p-4 rounded-[14px] bg-[#0A1424] border border-white/[0.08] hover:border-white/[0.16] transition-all flex flex-col justify-between space-y-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                isAudio
                                  ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                                  : file.fileType === 'pdf'
                                  ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                                  : 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                              }`}
                            >
                              {isAudio ? (
                                <Volume2 className="w-5 h-5" />
                              ) : file.fileType === 'pdf' ? (
                                <FileCheck className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <h4 className="text-[14px] font-semibold text-[#F1F5F9] truncate" title={file.name}>
                                {file.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#94A3B8]">
                                <span className="px-1.5 py-0.5 rounded-full bg-white/[0.06] text-[#CBD5E1]">
                                  {file.category ? categoryLabels[file.category] || file.category : file.fileType}
                                </span>
                                <span>•</span>
                                <span>{formatBytes(file.sizeBytes)}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleDownload(file)}
                              className="p-1.5 rounded-[8px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.08] transition-colors cursor-pointer"
                              title="Descargar archivo"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => onDeleteFile(file.id)}
                              className="p-1.5 rounded-[8px] text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                              title="Eliminar de Firestore"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {file.description && (
                          <p className="text-[12px] text-[#94A3B8] line-clamp-2 italic bg-black/20 p-2 rounded-[8px]">
                            «{file.description}»
                          </p>
                        )}

                        {/* Audio In-line Player */}
                        {isAudio && file.dataUrl && (
                          <div className="pt-1">
                            <audio
                              controls
                              src={file.dataUrl}
                              className="w-full h-8 accent-amber-500 opacity-90 rounded-md"
                              preload="none"
                            />
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-1 border-t border-white/[0.04] text-[10.5px] text-[#64748B]">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(file.createdAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <span className="text-emerald-400/80 font-medium">Sincronizado en BD</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RECORD VOICE PRAYER */}
          {activeTab === 'record' && (
            <div className="space-y-4 max-w-[560px] mx-auto p-4 sm:p-6 rounded-[18px] bg-[#0A1424] border border-red-500/20">
              <div className="text-center space-y-1">
                <h3 className="font-editorial text-[20px] text-[#F1F5F9] font-normal">
                  Grabar Clamor u Oración de Fe
                </h3>
                <p className="text-[12.5px] text-[#94A3B8]">
                  Tu voz expresando gratitud, petición o reflexión bíblica. Se guardará directamente en tu base de datos.
                </p>
              </div>

              {/* Recording status circle */}
              <div className="py-6 flex flex-col items-center justify-center space-y-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-red-500/20 border-2 border-red-500 animate-pulse text-red-500 scale-105 shadow-lg shadow-red-500/20'
                      : recordedAudioBlob
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-white/[0.04] border border-white/[0.1] text-[#94A3B8]'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </div>

                <div className="text-center">
                  <div className="font-mono text-[26px] font-bold text-[#F1F5F9]">
                    {formatTime(recordingSeconds)}
                  </div>
                  <div className="text-[12px] text-[#94A3B8] mt-1">
                    {isRecording
                      ? '🔴 Grabando en tiempo real...'
                      : recordedAudioBlob
                      ? 'Grabación lista para guardar'
                      : 'Presiona "Iniciar Grabación" para comenzar'}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="px-6 py-2.5 rounded-[12px] bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold text-[13.5px] flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                    >
                      <Mic className="w-4 h-4" />
                      <span>{recordedAudioBlob ? 'Grabar de nuevo' : 'Iniciar Grabación'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="px-6 py-2.5 rounded-[12px] bg-white text-[#060F1E] hover:bg-white/90 font-semibold text-[13.5px] flex items-center gap-2 cursor-pointer shadow-md transition-colors"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      <span>Detener Grabación</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Playback preview if recorded */}
              {recordedAudioUrl && !isRecording && (
                <div className="p-3.5 rounded-[12px] bg-[#0F1E33] border border-white/[0.08] space-y-3">
                  <div className="text-[12px] font-medium text-[#CBD5E1] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Escuchar vista previa antes de guardar:</span>
                  </div>
                  <audio controls src={recordedAudioUrl} className="w-full h-9 accent-amber-500" />

                  {/* Form fields */}
                  <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                    <div>
                      <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                        Título de la Oración o Clamor:
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Oración de fortaleza en la noche"
                        value={recordingTitle}
                        onChange={(e) => setRecordingTitle(e.target.value)}
                        className="w-full px-3 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[13px] text-[#F1F5F9] focus:outline-none focus:border-amber-500/50"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                          Categoría Devocional:
                        </label>
                        <select
                          value={recordingCategory}
                          onChange={(e) => setRecordingCategory(e.target.value as UserFileCategory)}
                          className="w-full px-2.5 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[12.5px] text-[#F1F5F9] focus:outline-none"
                        >
                          <option value="audio_devocional">Audio de Fe / Clamor</option>
                          <option value="oracion">Oración Personal</option>
                          <option value="reflexion">Reflexión Bíblica</option>
                          <option value="diario">Testimonio de Gratitud</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                          Notas opcionales:
                        </label>
                        <input
                          type="text"
                          placeholder="Cita bíblica o motivo..."
                          value={recordingDescription}
                          onChange={(e) => setRecordingDescription(e.target.value)}
                          className="w-full px-3 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[12.5px] text-[#F1F5F9] focus:outline-none focus:border-amber-500/50"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleSaveRecording}
                      disabled={isSaving}
                      className="w-full mt-2 py-2.5 px-4 rounded-[12px] bg-[#F59E0B] hover:bg-[#D97706] text-[#060F1E] font-semibold text-[13.5px] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors disabled:opacity-50"
                    >
                      <HardDrive className="w-4 h-4" />
                      <span>{isSaving ? 'Guardando en Firestore...' : 'Guardar en Base de Datos'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div className="space-y-4 max-w-[560px] mx-auto p-4 sm:p-6 rounded-[18px] bg-[#0A1424] border border-sky-500/20">
              <div className="text-center space-y-1">
                <h3 className="font-editorial text-[20px] text-[#F1F5F9] font-normal">
                  Subir Archivo de Fe o Documento
                </h3>
                <p className="text-[12.5px] text-[#94A3B8]">
                  Sube audios mp3/wav, documentos PDF, reflexiones o notas devocionales.
                </p>
              </div>

              {/* File upload dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 rounded-[14px] border-2 border-dashed border-white/[0.15] hover:border-sky-500/50 bg-[#0F1E33]/40 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-2 group-hover:scale-105 transition-transform">
                  <Upload className="w-5 h-5" />
                </div>
                <div className="text-[13.5px] font-medium text-[#F1F5F9]">
                  {uploadFile ? uploadFile.name : 'Haz clic para seleccionar un archivo'}
                </div>
                <div className="text-[11.5px] text-[#94A3B8] mt-1">
                  {uploadFile ? `${formatBytes(uploadFile.size)} • Listo para subir` : 'Formatos permitidos: MP3, WAV, M4A, PDF, TXT, JPG, PNG (hasta 1.5MB)'}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="audio/*,.pdf,.txt,.doc,.docx,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {uploadFile && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                      Nombre o Título del Archivo:
                    </label>
                    <input
                      type="text"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[13px] text-[#F1F5F9] focus:outline-none focus:border-sky-500/50"
                      placeholder="Título del documento..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                        Categoría:
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as UserFileCategory)}
                        className="w-full px-2.5 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[12.5px] text-[#F1F5F9] focus:outline-none"
                      >
                        <option value="oracion">Oración Escrita</option>
                        <option value="audio_devocional">Audio Devocional</option>
                        <option value="reflexion">Reflexión Espiritual</option>
                        <option value="estudio">Estudio Bíblico</option>
                        <option value="diario">Diario de Gratitud</option>
                        <option value="otro">Otro Documento</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11.5px] font-medium text-[#94A3B8] mb-1">
                        Descripción o Cita:
                      </label>
                      <input
                        type="text"
                        value={uploadDescription}
                        onChange={(e) => setUploadDescription(e.target.value)}
                        placeholder="Descripción breve..."
                        className="w-full px-3 py-2 rounded-[10px] bg-[#0A1424] border border-white/[0.1] text-[12.5px] text-[#F1F5F9] focus:outline-none focus:border-sky-500/50"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSaveUploadedFile}
                    disabled={isSaving}
                    className="w-full py-2.5 px-4 rounded-[12px] bg-sky-500 hover:bg-sky-600 text-white font-semibold text-[13.5px] flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors disabled:opacity-50"
                  >
                    <HardDrive className="w-4 h-4" />
                    <span>{isSaving ? 'Registrando en base de datos...' : 'Guardar en Base de Datos'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
