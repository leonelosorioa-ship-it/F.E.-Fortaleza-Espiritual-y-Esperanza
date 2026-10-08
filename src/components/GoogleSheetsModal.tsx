import React, { useState, useEffect } from 'react';
import {
  X,
  FileSpreadsheet,
  Table,
  Plus,
  RefreshCw,
  ExternalLink,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  Download,
  Calendar,
  Layers,
  Heart,
  BookOpen,
  ArrowRight,
  Send,
  Loader2,
} from 'lucide-react';
import { auth, getGoogleAccessToken, connectGoogleSheets } from '../firebase';
import {
  GoogleSpreadsheet,
  SheetDataGrid,
  SavedAnchor,
  GratitudeEntry,
} from '../types';
import {
  listSpreadsheets,
  getSpreadsheetDetails,
  getSheetValues,
  createSpreadsheet,
  appendRow,
  createPrayerJournalSpreadsheet,
  createGratitudeLogSpreadsheet,
  createDevotionalPlanSpreadsheet,
  exportSavedAnchorsToSheet,
  exportGratitudeEntriesToSheet,
} from '../services/googleSheetsService';

interface GoogleSheetsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGoogleDrive?: () => void;
  savedAnchors: SavedAnchor[];
  gratitudeEntries: GratitudeEntry[];
}

type SheetsTab = 'list' | 'viewer' | 'templates' | 'export';

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  isOpen,
  onClose,
  onOpenGoogleDrive,
  savedAnchors,
  gratitudeEntries,
}) => {
  const [activeTab, setActiveTab] = useState<SheetsTab>('list');
  const [spreadsheets, setSpreadsheets] = useState<GoogleSpreadsheet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Selected spreadsheet & data
  const [selectedSheet, setSelectedSheet] = useState<GoogleSpreadsheet | null>(null);
  const [selectedTabTitle, setSelectedTabTitle] = useState<string>('');
  const [sheetData, setSheetData] = useState<SheetDataGrid | null>(null);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);

  // Custom new sheet modal / state
  const [isCreatingCustom, setIsCreatingCustom] = useState<boolean>(false);
  const [newSheetTitle, setNewSheetTitle] = useState<string>('');
  const [isSubmittingNew, setIsSubmittingNew] = useState<boolean>(false);

  // New row form
  const [isAddingRow, setIsAddingRow] = useState<boolean>(false);
  const [newRowValues, setNewRowValues] = useState<string[]>([]);
  const [isSubmittingRow, setIsSubmittingRow] = useState<boolean>(false);

  // Export action loading
  const [exportingType, setExportingType] = useState<'anchors' | 'gratitude' | null>(null);
  const [lastExportResult, setLastExportResult] = useState<{ name: string; url: string } | null>(null);

  const currentUser = auth.currentUser;
  const hasToken = !!getGoogleAccessToken();

  // Load spreadsheets on open or when tab changes to list
  useEffect(() => {
    if (isOpen) {
      loadSpreadsheetsList();
    }
  }, [isOpen]);

  const loadSpreadsheetsList = async () => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const list = await listSpreadsheets();
      setSpreadsheets(list);
    } catch (err: any) {
      console.warn('Error listing spreadsheets:', err);
      setAuthError(err?.message || 'Inicia sesión con Google para acceder a tus hojas de cálculo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConnectGoogle = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      await connectGoogleSheets();
      setStatusMessage({ type: 'success', text: '¡Conectado exitosamente con Google Sheets!' });
      await loadSpreadsheetsList();
    } catch (err: any) {
      setAuthError(err?.message || 'No se pudo conectar con la cuenta de Google.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  // Open viewer for a spreadsheet
  const handleSelectSpreadsheet = async (sheet: GoogleSpreadsheet) => {
    setSelectedSheet(sheet);
    setActiveTab('viewer');
    setIsLoadingData(true);
    setStatusMessage(null);
    try {
      const details = await getSpreadsheetDetails(sheet.id);
      setSelectedSheet(details);
      const defaultTab = details.sheets?.[0]?.title || 'Hoja 1';
      setSelectedTabTitle(defaultTab);
      const values = await getSheetValues(sheet.id, `${defaultTab}!A1:Z60`);
      setSheetData(values);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al cargar la hoja: ${err?.message || 'Permiso denegado'}`,
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Switch tab inside selected spreadsheet
  const handleSwitchTab = async (tabTitle: string) => {
    if (!selectedSheet) return;
    setSelectedTabTitle(tabTitle);
    setIsLoadingData(true);
    try {
      const values = await getSheetValues(selectedSheet.id, `${tabTitle}!A1:Z60`);
      setSheetData(values);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al leer la pestaña ${tabTitle}: ${err?.message}`,
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Create custom blank or named spreadsheet
  const handleCreateCustomSpreadsheet = async () => {
    if (!newSheetTitle.trim()) return;
    setIsSubmittingNew(true);
    try {
      const created = await createSpreadsheet(newSheetTitle.trim(), [
        {
          title: 'Principal',
          initialRows: [
            ['Fecha', 'Categoría', 'Descripción', 'Estado', 'Notas'],
            [
              new Date().toLocaleDateString('es-ES'),
              'Devocional',
              'Inicio de registro espiritual',
              'Activo',
              'Creado desde Fe que Sostiene',
            ],
          ],
        },
      ]);
      setStatusMessage({
        type: 'success',
        text: `¡Hoja "${created.name}" creada exitosamente en tu Google Drive!`,
      });
      setIsCreatingCustom(false);
      setNewSheetTitle('');
      await loadSpreadsheetsList();
      await handleSelectSpreadsheet(created);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al crear hoja: ${err?.message}`,
      });
    } finally {
      setIsSubmittingNew(false);
    }
  };

  // Template creation helpers
  const handleCreateTemplate = async (
    type: 'prayer' | 'gratitude' | 'devotional'
  ) => {
    setIsLoading(true);
    setStatusMessage(null);
    try {
      let created: GoogleSpreadsheet;
      if (type === 'prayer') {
        created = await createPrayerJournalSpreadsheet();
      } else if (type === 'gratitude') {
        created = await createGratitudeLogSpreadsheet();
      } else {
        created = await createDevotionalPlanSpreadsheet();
      }

      setStatusMessage({
        type: 'success',
        text: `¡Plantilla "${created.name}" creada en tu Google Drive!`,
      });
      await loadSpreadsheetsList();
      await handleSelectSpreadsheet(created);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al generar la plantilla: ${err?.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Export current app data to Google Sheets
  const handleExportAnchors = async () => {
    if (savedAnchors.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'Aún no tienes oraciones o anclas guardadas para exportar.',
      });
      return;
    }
    setExportingType('anchors');
    try {
      const res = await exportSavedAnchorsToSheet(savedAnchors);
      setLastExportResult({
        name: '🕊️ Mis Anclas de Fe y Oraciones',
        url: res.webViewLink,
      });
      setStatusMessage({
        type: 'success',
        text: `¡Se exportaron ${savedAnchors.length} oraciones exitosamente a Google Sheets!`,
      });
      await loadSpreadsheetsList();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al exportar: ${err?.message}`,
      });
    } finally {
      setExportingType(null);
    }
  };

  const handleExportGratitude = async () => {
    if (gratitudeEntries.length === 0) {
      setStatusMessage({
        type: 'error',
        text: 'Aún no tienes registros de gratitud para exportar.',
      });
      return;
    }
    setExportingType('gratitude');
    try {
      const res = await exportGratitudeEntriesToSheet(gratitudeEntries);
      setLastExportResult({
        name: '🌿 Mi Diario de Gratitud en Fe',
        url: res.webViewLink,
      });
      setStatusMessage({
        type: 'success',
        text: `¡Se exportaron ${gratitudeEntries.length} entradas de gratitud exitosamente a Google Sheets!`,
      });
      await loadSpreadsheetsList();
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al exportar: ${err?.message}`,
      });
    } finally {
      setExportingType(null);
    }
  };

  // Submit new row to currently selected sheet
  const handleAppendRowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSheet || !selectedTabTitle) return;

    // Filter empty values or preserve columns
    if (newRowValues.every((val) => !val.trim())) return;

    setIsSubmittingRow(true);
    try {
      await appendRow(selectedSheet.id, selectedTabTitle, newRowValues);
      setStatusMessage({
        type: 'success',
        text: '¡Nueva fila agregada con éxito a la hoja de cálculo!',
      });
      setIsAddingRow(false);
      setNewRowValues([]);
      // Reload values
      const updated = await getSheetValues(
        selectedSheet.id,
        `${selectedTabTitle}!A1:Z60`
      );
      setSheetData(updated);
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `Error al agregar fila: ${err?.message}`,
      });
    } finally {
      setIsSubmittingRow(false);
    }
  };

  if (!isOpen) return null;

  const filteredSheets = spreadsheets.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div
        className="w-full max-w-4xl bg-gradient-to-b from-[#0D192B] to-[#060F1E] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-950/40 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-emerald-500/20 bg-[#091524] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-400 p-0.5 shadow-md shadow-emerald-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#060F1E] rounded-[10px] flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#F1F5F9] font-playfair tracking-wide flex items-center gap-2">
                  Google Sheets Espiritual
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Workspace
                  </span>
                </h2>
              </div>
              <p className="text-xs text-[#94A3B8]">
                Registro de oraciones, peticiones respondidas y diario de gratitud en hojas de cálculo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenGoogleDrive && (
              <button
                type="button"
                onClick={onOpenGoogleDrive}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-950/50 hover:bg-sky-900/60 text-sky-300 text-xs border border-sky-600/30 transition-colors"
                title="Ir a Google Drive"
              >
                <HardDrive className="w-3.5 h-3.5" />
                <span>Google Drive</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Status Message Toast */}
        {statusMessage && (
          <div
            className={`px-4 py-2.5 flex items-center justify-between gap-3 text-xs shrink-0 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/80 border-b border-emerald-500/30 text-emerald-200'
                : 'bg-rose-950/80 border-b border-rose-500/30 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-[#94A3B8] hover:text-[#F1F5F9] p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Authentication Notice if missing token */}
        {!hasToken && (
          <div className="mx-4 sm:mx-6 mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-950/70 via-[#0B1E2E] to-emerald-950/70 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300 shrink-0 mt-0.5">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#F1F5F9]">
                  Conecta tu cuenta de Google
                </h4>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Concede acceso a Google Sheets y Google Drive para leer, crear y guardar tus peticiones y oraciones directamente en tus hojas de cálculo personales.
                </p>
                {authError && (
                  <p className="text-xs text-rose-300 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
              </div>
            </div>

            {/* Official Sign in with Google Button per skill guidelines */}
            <button
              type="button"
              onClick={handleConnectGoogle}
              disabled={isAuthenticating}
              className="gsi-material-button shrink-0 shadow-lg cursor-pointer"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #dadce0',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                color: '#3c4043',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {isAuthenticating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                  <span>Conectando...</span>
                </>
              ) : (
                <>
                  <div className="gsi-material-button-icon" style={{ width: 18, height: 18 }}>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      style={{ display: 'block' }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </div>
                  <span>Vincular Google Sheets</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-emerald-500/15 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === 'list'
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              <Table className="w-4 h-4" />
              <span>Mis Hojas ({spreadsheets.length})</span>
            </button>

            {selectedSheet && (
              <button
                type="button"
                onClick={() => setActiveTab('viewer')}
                className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === 'viewer'
                    ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                    : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span className="max-w-[130px] truncate">{selectedSheet.name}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setActiveTab('templates')}
              className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === 'templates'
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Plantillas Espirituales</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`px-3 py-2 rounded-t-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 border-b-2 cursor-pointer ${
                activeTab === 'export'
                  ? 'border-emerald-400 text-emerald-300 bg-emerald-500/10'
                  : 'border-transparent text-[#94A3B8] hover:text-[#F1F5F9]'
              }`}
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>Exportar / Sincronizar</span>
            </button>
          </div>

          <div className="flex items-center gap-2 pb-1.5">
            <button
              type="button"
              onClick={() => setIsCreatingCustom(true)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nueva Hoja</span>
            </button>
            <button
              type="button"
              onClick={loadSpreadsheetsList}
              disabled={isLoading}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-slate-800/60 transition-colors"
              title="Actualizar lista"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Modal Body / Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 min-h-[360px]">
          {/* TAB 1: SPREADSHEETS LIST */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar hojas de cálculo en tu Google Drive..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#091524] border border-emerald-500/20 rounded-xl text-xs sm:text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-emerald-400 transition-colors"
                />
              </div>

              {/* Spreadsheets Grid */}
              {isLoading && spreadsheets.length === 0 ? (
                <div className="py-16 text-center text-[#94A3B8]">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto mb-3" />
                  <p className="text-sm">Buscando tus hojas de cálculo en Google Sheets...</p>
                </div>
              ) : filteredSheets.length === 0 ? (
                <div className="py-12 px-4 text-center rounded-2xl bg-[#091524]/60 border border-emerald-500/15">
                  <FileSpreadsheet className="w-12 h-12 text-emerald-500/40 mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-[#F1F5F9]">
                    {searchQuery ? 'No se encontraron hojas con esa búsqueda' : 'No tienes hojas de cálculo aún'}
                  </h4>
                  <p className="text-xs text-[#94A3B8] max-w-md mx-auto mt-1 mb-4">
                    Puedes crear una hoja en blanco o utilizar nuestras plantillas espirituales pre-configuradas para registrar tus peticiones y gratitud.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCreatingCustom(true)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-colors"
                    >
                      Crear Nueva Hoja
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('templates')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-500/30 transition-colors"
                    >
                      Ver Plantillas
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredSheets.map((sheet) => (
                    <div
                      key={sheet.id}
                      className="p-4 rounded-xl bg-gradient-to-br from-[#091524] to-[#0D1C30] border border-emerald-500/20 hover:border-emerald-500/50 transition-all flex flex-col justify-between group shadow-sm"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                            </div>
                            <h4 className="text-sm font-semibold text-[#F1F5F9] group-hover:text-emerald-300 transition-colors line-clamp-1">
                              {sheet.name}
                            </h4>
                          </div>
                          {sheet.webViewLink && (
                            <a
                              href={sheet.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-emerald-300 hover:bg-emerald-950/40 transition-colors"
                              title="Abrir en Google Sheets"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                        </div>

                        {sheet.modifiedTime && (
                          <p className="text-[11px] text-[#64748B] mt-2 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3" />
                            <span>
                              Modificado: {new Date(sheet.modifiedTime).toLocaleDateString('es-ES', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </p>
                        )}
                      </div>

                      <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => handleSelectSpreadsheet(sheet)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 hover:text-emerald-200 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/30 transition-colors cursor-pointer"
                        >
                          <Table className="w-3.5 h-3.5" />
                          <span>Ver y Gestionar Datos</span>
                        </button>
                        {sheet.webViewLink && (
                          <a
                            href={sheet.webViewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center gap-1"
                          >
                            <span>Abrir web</span>
                            <ArrowRight className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VIEWER & EDITOR */}
          {activeTab === 'viewer' && selectedSheet && (
            <div className="space-y-4">
              {/* Sheet Header & Tabs Bar */}
              <div className="p-3.5 rounded-xl bg-[#091524] border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9]">
                      {selectedSheet.name}
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Pestaña activa: <span className="text-emerald-300 font-medium">{selectedTabTitle}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (sheetData?.values?.[0]) {
                        setNewRowValues(new Array(sheetData.values[0].length).fill(''));
                      } else {
                        setNewRowValues(['', '', '', '']);
                      }
                      setIsAddingRow(true);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir Fila</span>
                  </button>
                  {selectedSheet.webViewLink && (
                    <a
                      href={selectedSheet.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#CBD5E1] text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Abrir en Google</span>
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => handleSwitchTab(selectedTabTitle)}
                    disabled={isLoadingData}
                    className="p-1.5 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-slate-800/60 transition-colors"
                    title="Recargar datos de la hoja"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoadingData ? 'animate-spin text-emerald-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Sub-tabs if multiple sheets */}
              {selectedSheet.sheets && selectedSheet.sheets.length > 1 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  <Layers className="w-4 h-4 text-[#64748B] shrink-0 mr-1" />
                  {selectedSheet.sheets.map((tab) => (
                    <button
                      key={tab.sheetId}
                      type="button"
                      onClick={() => handleSwitchTab(tab.title)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        selectedTabTitle === tab.title
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-[#091524] text-[#94A3B8] hover:text-[#F1F5F9]'
                      }`}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              )}

              {/* Add Row Form Collapse */}
              {isAddingRow && (
                <form
                  onSubmit={handleAppendRowSubmit}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#091E29] to-[#0A1624] border border-emerald-500/40 animate-fade-in space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5" />
                      Añadir Nueva Fila a "{selectedTabTitle}"
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsAddingRow(false)}
                      className="text-xs text-[#94A3B8] hover:text-[#F1F5F9]"
                    >
                      Cancelar
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {(sheetData?.values?.[0] && sheetData.values[0].length > 0
                      ? sheetData.values[0]
                      : ['Columna 1', 'Columna 2', 'Columna 3', 'Columna 4']
                    ).map((colName, index) => (
                      <div key={index} className="space-y-1">
                        <label className="text-[11px] text-[#94A3B8] font-medium block truncate">
                          {colName || `Columna ${index + 1}`}
                        </label>
                        <input
                          type="text"
                          value={newRowValues[index] || ''}
                          onChange={(e) => {
                            const copy = [...newRowValues];
                            copy[index] = e.target.value;
                            setNewRowValues(copy);
                          }}
                          placeholder={
                            index === 0
                              ? new Date().toLocaleDateString('es-ES')
                              : `Valor para ${colName}`
                          }
                          className="w-full px-3 py-1.5 bg-[#060F1E] border border-emerald-500/20 rounded-lg text-xs text-[#F1F5F9] focus:outline-none focus:border-emerald-400"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingRow(false)}
                      className="px-3 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-[#F1F5F9]"
                    >
                      Descartar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmittingRow}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                    >
                      {isSubmittingRow ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Guardando en Google Sheets...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Insertar en Hoja</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Data Grid Table View */}
              {isLoadingData ? (
                <div className="py-20 text-center text-[#94A3B8]">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-400 mx-auto mb-3" />
                  <p className="text-sm">Leyendo celdas y filas desde Google Sheets...</p>
                </div>
              ) : !sheetData || !sheetData.values || sheetData.values.length === 0 ? (
                <div className="py-14 text-center rounded-xl bg-[#091524]/60 border border-emerald-500/15">
                  <Table className="w-10 h-10 text-emerald-500/40 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-[#F1F5F9]">
                    Esta pestaña está vacía
                  </p>
                  <p className="text-xs text-[#94A3B8] mt-1 mb-3">
                    Empieza añadiendo tu primera fila de datos o peticiones.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setNewRowValues(['', '', '', '']);
                      setIsAddingRow(true);
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
                  >
                    Añadir Primera Fila
                  </button>
                </div>
              ) : (
                <div className="border border-emerald-500/20 rounded-xl overflow-hidden bg-[#071220]">
                  <div className="overflow-x-auto max-h-[380px]">
                    <table className="w-full text-left border-collapse text-xs">
                      {/* Headers */}
                      <thead>
                        <tr className="bg-[#0D1E32] border-b border-emerald-500/30 text-emerald-300 sticky top-0 z-10">
                          <th className="py-2.5 px-3 font-semibold text-[11px] uppercase tracking-wider text-[#64748B] w-12 text-center border-r border-slate-800">
                            #
                          </th>
                          {sheetData.values[0].map((header, colIndex) => (
                            <th
                              key={colIndex}
                              className="py-2.5 px-3.5 font-bold uppercase tracking-wider border-r border-slate-800/80 min-w-[140px]"
                            >
                              {header || `Col ${colIndex + 1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      {/* Rows */}
                      <tbody className="divide-y divide-slate-800/60">
                        {sheetData.values.slice(1).map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="hover:bg-emerald-950/20 transition-colors text-[#CBD5E1]"
                          >
                            <td className="py-2 px-3 text-[11px] text-center text-[#64748B] font-mono border-r border-slate-800/80 bg-[#091524]/40">
                              {rowIndex + 1}
                            </td>
                            {sheetData.values[0].map((_, colIndex) => (
                              <td
                                key={colIndex}
                                className="py-2 px-3.5 border-r border-slate-800/40 truncate max-w-[260px]"
                                title={String(row[colIndex] || '')}
                              >
                                {row[colIndex] !== undefined && row[colIndex] !== '' ? (
                                  <span>{String(row[colIndex])}</span>
                                ) : (
                                  <span className="text-slate-600 italic">—</span>
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="px-3 py-2 bg-[#091524] border-t border-slate-800 flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>
                      Mostrando {sheetData.values.length - 1} fila(s) y {sheetData.values[0]?.length || 0} columna(s)
                    </span>
                    <span className="font-mono text-emerald-400">Rango: {sheetData.range}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SPIRITUAL TEMPLATES */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Plantillas Espirituales en Google Sheets
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Crea en 1 clic hojas de cálculo preparadas con fórmulas, encabezados y estructura bíblica para llevar un registro fiel de tu caminar espiritual.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Template 1: Prayer Requests */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#091A28] to-[#0A1624] border border-amber-500/30 flex flex-col justify-between hover:border-amber-400/60 transition-all shadow-md group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-3">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#F1F5F9] group-hover:text-amber-300 transition-colors">
                      Registro de Oraciones y Milagros
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                      Lleva cuenta detallada de tus peticiones al Señor, versículos de respaldo, fecha de clamor, estado y testimonios cuando Dios responda.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        7 Columnas
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                        Testimonios
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCreateTemplate('prayer')}
                    disabled={isLoading}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Crear Esta Hoja</span>
                  </button>
                </div>

                {/* Template 2: Gratitude Log */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#091D26] to-[#0A1624] border border-emerald-500/30 flex flex-col justify-between hover:border-emerald-400/60 transition-all shadow-md group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#F1F5F9] group-hover:text-emerald-300 transition-colors">
                      Diario de Gratitud Diaria
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                      Estructura para registrar diariamente los motivos de gratitud, estado de ánimo matutino/nocturno, reflexión y promesas de ancla.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        5 Columnas
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">
                        Paz Interior
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCreateTemplate('gratitude')}
                    disabled={isLoading}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Crear Esta Hoja</span>
                  </button>
                </div>

                {/* Template 3: Devotional Plan */}
                <div className="p-4 rounded-xl bg-gradient-to-b from-[#0B1A2E] to-[#0A1624] border border-sky-500/30 flex flex-col justify-between hover:border-sky-400/60 transition-all shadow-md group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-[#F1F5F9] group-hover:text-sky-300 transition-colors">
                      Plan Devocional y Promesas
                    </h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed">
                      Cronograma con momentos del día (amanecer, tarde, noche), promesa bíblica, citas, oración sugerida y casilla de verificación.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        7 Columnas
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                        Disciplinas
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCreateTemplate('devotional')}
                    disabled={isLoading}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Crear Esta Hoja</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORT / SYNC */}
          {activeTab === 'export' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-[#F1F5F9] flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-400" />
                  Sincronizar y Exportar Datos a Google Sheets
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  Guarda de forma permanente todas tus anclas de paz, oraciones y diario de gratitud en una hoja de cálculo en la nube de Google.
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Saved Anchors */}
                <div className="p-4 rounded-xl bg-[#091524] border border-amber-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-amber-400" />
                        <h4 className="text-sm font-bold text-[#F1F5F9]">
                          Anclas de Fe y Oraciones
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">
                        {savedAnchors.length} guardadas
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2">
                      Exporta tus versículos de apoyo, reflexiones de calma y oraciones personalizadas guardadas en esta sesión.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportAnchors}
                    disabled={exportingType === 'anchors' || savedAnchors.length === 0}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    {exportingType === 'anchors' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Exportando a Sheets...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Sincronizar a Google Sheets</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Export Gratitude */}
                <div className="p-4 rounded-xl bg-[#091524] border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-sm font-bold text-[#F1F5F9]">
                          Diario de Gratitud
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                        {gratitudeEntries.length} entradas
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-2">
                      Exporta todos los motivos de agradecimiento, emociones sentidas y promesas anotadas en tu diario espiritual.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleExportGratitude}
                    disabled={exportingType === 'gratitude' || gratitudeEntries.length === 0}
                    className="mt-4 w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                  >
                    {exportingType === 'gratitude' ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Exportando a Sheets...</span>
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                        <span>Sincronizar a Google Sheets</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Last Export Link */}
              {lastExportResult && (
                <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-between gap-3 animate-fade-in">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-200">
                        {lastExportResult.name}
                      </p>
                      <p className="text-[11px] text-emerald-300/80">
                        Tu hoja de cálculo ha sido creada y actualizada en Google Drive.
                      </p>
                    </div>
                  </div>
                  <a
                    href={lastExportResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
                  >
                    <span>Abrir en Sheets</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-emerald-500/20 bg-[#071220] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs text-[#94A3B8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {currentUser?.email ? (
                <>
                  Conectado como <strong className="text-[#F1F5F9]">{currentUser.email}</strong>
                </>
              ) : (
                'Google Workspace OAuth 2.0 Integrado'
              )}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[#CBD5E1] font-medium transition-colors cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      {/* SUB-MODAL: Create custom blank sheet */}
      {isCreatingCustom && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-[#0D192B] border border-emerald-500/40 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-[#F1F5F9]">
                  Crear Nueva Hoja de Cálculo
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreatingCustom(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs text-[#94A3B8] block mb-1">
                  Nombre de la Hoja
                </label>
                <input
                  type="text"
                  value={newSheetTitle}
                  onChange={(e) => setNewSheetTitle(e.target.value)}
                  placeholder="Ej: Registro de Oraciones Familiares"
                  className="w-full px-3.5 py-2 bg-[#060F1E] border border-emerald-500/30 rounded-xl text-sm text-[#F1F5F9] focus:outline-none focus:border-emerald-400"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingCustom(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs text-[#94A3B8] hover:text-[#F1F5F9]"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleCreateCustomSpreadsheet}
                  disabled={!newSheetTitle.trim() || isSubmittingNew}
                  className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-colors"
                >
                  {isSubmittingNew ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Creando en Google...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crear Hoja</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
