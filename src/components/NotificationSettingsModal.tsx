import React, { useState, useEffect } from 'react';
import {
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Volume2,
  X,
  Sparkles,
  HeartHandshake,
  Sun,
  Send,
  Info,
  Check,
  ShieldCheck,
} from 'lucide-react';
import {
  isNotificationSupported,
  getNotificationPermission,
  requestNotificationPermission,
  loadNotificationSettings,
  saveNotificationSettings,
  playGentleChime,
  triggerWebNotification,
  getTodayDailyPromise,
} from '../services/notificationService';
import { NotificationScheduleConfig, DailyPromiseData } from '../types';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenGratitude?: () => void;
  onOpenDailyPromise?: (promise: DailyPromiseData) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  onOpenGratitude,
  onOpenDailyPromise,
}) => {
  const [config, setConfig] = useState<NotificationScheduleConfig>(loadNotificationSettings());
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [testStatusMessage, setTestStatusMessage] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const todayPromise = getTodayDailyPromise();

  useEffect(() => {
    if (isOpen) {
      setConfig(loadNotificationSettings());
      setPermission(getNotificationPermission());
      setTestStatusMessage(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const res = await requestNotificationPermission();
    setPermission(res);
    if (res === 'granted') {
      setTestStatusMessage('¡Permiso concedido con éxito! Ya puedes recibir tus recordatorios diarios.');
      setTimeout(() => setTestStatusMessage(null), 4000);
    } else if (res === 'denied') {
      setTestStatusMessage('Las notificaciones fueron bloqueadas en los ajustes de tu navegador.');
    }
  };

  const handleSave = () => {
    saveNotificationSettings(config);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 900);
  };

  const handleTestNotification = async (type: 'gratitude' | 'promise') => {
    let currentPerm = getNotificationPermission();

    if (currentPerm === 'default') {
      currentPerm = await requestNotificationPermission();
      setPermission(currentPerm);
    }

    if (currentPerm === 'denied') {
      setTestStatusMessage('Para probar la notificación, debes habilitar los permisos en el icono de candado de tu navegador.');
      return;
    }

    if (currentPerm === 'unsupported') {
      if (config.soundEnabled) playGentleChime();
      setTestStatusMessage('Tu navegador actual no admite notificaciones del sistema, pero el tono sonoro sí fue ejecutado.');
      return;
    }

    if (type === 'gratitude') {
      triggerWebNotification(config.gratitude.title, {
        body: config.gratitude.body,
        tag: 'test-gratitud',
        playSound: config.soundEnabled,
        onClick: () => {
          onClose();
          onOpenGratitude?.();
        },
      });
      setTestStatusMessage('Recordatorio de Gratitud enviado al sistema. Revisa tus notificaciones.');
    } else {
      triggerWebNotification(config.dailyPromise.title, {
        body: `${todayPromise.verse} (${todayPromise.reference})`,
        tag: 'test-promesa',
        playSound: config.soundEnabled,
        onClick: () => {
          onClose();
          onOpenDailyPromise?.(todayPromise);
        },
      });
      setTestStatusMessage('Recordatorio de Promesa del Día enviado al sistema.');
    }

    setTimeout(() => setTestStatusMessage(null), 5000);
  };

  const handlePlayChimeTest = () => {
    playGentleChime();
    setTestStatusMessage('Reproduciendo campana de paz armónica...');
    setTimeout(() => setTestStatusMessage(null), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reminder-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020610]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#091524] border border-white/[0.12] rounded-[22px] shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-[#F1F5F9] overflow-hidden my-auto z-10">
        {/* Subtle decorative gold top bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-[#10B981] to-[#F59E0B]" />

        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B] shrink-0 shadow-xs">
              <Bell className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <h2
                id="reminder-modal-title"
                className="font-editorial text-[20px] sm:text-[23px] text-[#F8FAFC] font-normal leading-snug"
              >
                Recordatorios Diarios y Notificaciones
              </h2>
              <p className="text-[12.5px] sm:text-[13px] text-[#94A3B8]">
                Programa una hora específica para recibir tu Promesa Bíblica o tu Diario de Gratitud.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[40px] min-w-[40px] p-2 rounded-lg text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center justify-center"
            aria-label="Cerrar modal de recordatorios"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Permission Status Banner */}
          <div className="rounded-xl border p-3.5 sm:p-4 text-[13px] transition-all bg-[#0B1A2E]/70 border-white/[0.08]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start sm:items-center gap-2.5">
                {permission === 'granted' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
                ) : permission === 'denied' ? (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 sm:mt-0" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                )}
                <div>
                  <div className="font-medium text-[#F1F5F9]">
                    {permission === 'granted' && 'Notificaciones del navegador: Permitidas'}
                    {permission === 'denied' && 'Notificaciones bloqueadas por el navegador'}
                    {permission === 'default' && 'Permiso de notificaciones pendiente'}
                    {permission === 'unsupported' && 'Web Notification API no soportada en este entorno'}
                  </div>
                  <p className="text-[12px] text-[#94A3B8] mt-0.5">
                    {permission === 'granted' && 'Recibirás avisos emergentes locales a la hora configurada.'}
                    {permission === 'denied' && 'Haz clic en el candado de la barra de direcciones de tu navegador para permitir notificaciones.'}
                    {permission === 'default' && 'Se requiere autorizar los avisos para que aparezcan en tu pantalla.'}
                    {permission === 'unsupported' && 'Se emitirá una campana sonora y alerta interna cada vez que sea la hora.'}
                  </p>
                </div>
              </div>

              {permission === 'default' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 active:scale-95 text-[#060F1E] font-semibold text-[12.5px] transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  Activar en el navegador
                </button>
              )}
            </div>
          </div>

          {/* Feedback message banner if test triggered */}
          {testStatusMessage && (
            <div className="rounded-lg bg-emerald-950/60 border border-emerald-500/40 p-3 text-[12.5px] text-emerald-200 flex items-center gap-2 animate-fade-in">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{testStatusMessage}</span>
            </div>
          )}

          {/* Reminder 1: Diario de Gratitud */}
          <div className="bg-[#0D1D30] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <HeartHandshake className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#F1F5F9] flex items-center gap-2">
                    Recordatorio Nocturno • 8:30 PM (Contra la Rumiación)
                  </h3>
                  <p className="text-[12px] text-[#94A3B8]">
                    Horario estratégico antes de dormir: 3 minutos para pausar, entregar cargas a Dios y calmar tu sistema nervioso.
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={config.gratitude.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      gratitude: { ...config.gratitude, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                  aria-label="Activar recordatorio de gratitud"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>

            {config.gratitude.enabled && (
              <div className="space-y-3 pt-2 border-t border-white/[0.06] animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[13px] text-[#CBD5E1]">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Hora programada del día:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={config.gratitude.time}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          gratitude: { ...config.gratitude, time: e.target.value },
                        })
                      }
                      className="bg-[#07111D] border border-white/[0.15] focus:border-emerald-500 rounded-lg px-3 py-1.5 text-[14px] text-[#F1F5F9] font-mono outline-none cursor-pointer"
                      aria-label="Seleccionar hora para el diario de gratitud"
                    />
                  </div>
                </div>

                {/* Quick time presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                  <span className="text-[#94A3B8] mr-1">Preajustes sugeridos:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        gratitude: { ...config.gratitude, time: '20:30' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    20:30 (Noche tranquila)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        gratitude: { ...config.gratitude, time: '21:30' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    21:30 (Antes de dormir)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        gratitude: { ...config.gratitude, time: '18:00' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    18:00 (Fin de jornada)
                  </button>
                </div>

                {/* Action to test */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11.5px] text-[#64748B]">
                    Al hacer clic en la alerta se abrirá tu Diario de Gratitud.
                  </span>
                  <button
                    type="button"
                    onClick={() => handleTestNotification('gratitude')}
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 active:bg-emerald-500/35 border border-emerald-500/30 text-emerald-300 text-[11.5px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Probar alerta ahora</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reminder 2: Promesa del Día */}
          <div className="bg-[#0D1D30] border border-white/[0.08] rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-[#F59E0B] shrink-0">
                  <Sun className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-[#F1F5F9] flex items-center gap-2">
                    Recordatorio de la Promesa del Día
                  </h3>
                  <p className="text-[12px] text-[#94A3B8]">
                    Recibe cada mañana una promesa viva de las Sagradas Escrituras con reflexión guiada.
                  </p>
                </div>
              </div>

              {/* Toggle switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={config.dailyPromise.enabled}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dailyPromise: { ...config.dailyPromise, enabled: e.target.checked },
                    })
                  }
                  className="sr-only peer"
                  aria-label="Activar recordatorio de promesa del día"
                />
                <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {config.dailyPromise.enabled && (
              <div className="space-y-3 pt-2 border-t border-white/[0.06] animate-fade-in">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-[13px] text-[#CBD5E1]">
                    <Clock className="w-4 h-4 text-[#F59E0B]" />
                    <span>Hora programada del día:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={config.dailyPromise.time}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          dailyPromise: { ...config.dailyPromise, time: e.target.value },
                        })
                      }
                      className="bg-[#07111D] border border-white/[0.15] focus:border-amber-500 rounded-lg px-3 py-1.5 text-[14px] text-[#F1F5F9] font-mono outline-none cursor-pointer"
                      aria-label="Seleccionar hora para la promesa del día"
                    />
                  </div>
                </div>

                {/* Quick time presets */}
                <div className="flex flex-wrap items-center gap-1.5 text-[11.5px]">
                  <span className="text-[#94A3B8] mr-1">Preajustes sugeridos:</span>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        dailyPromise: { ...config.dailyPromise, time: '06:30' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    06:30 (Amanecer)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        dailyPromise: { ...config.dailyPromise, time: '08:00' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    08:00 (Inicio de jornada)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setConfig({
                        ...config,
                        dailyPromise: { ...config.dailyPromise, time: '12:00' },
                      })
                    }
                    className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-[#CBD5E1] transition-colors cursor-pointer"
                  >
                    12:00 (Mediodía)
                  </button>
                </div>

                {/* Today's Promise Preview Pill */}
                <div className="bg-[#07111D] border border-amber-500/20 rounded-xl p-3 text-[12px] space-y-1">
                  <div className="flex items-center justify-between text-[#F59E0B] font-medium text-[11.5px]">
                    <span>Promesa de hoy: {todayPromise.theme}</span>
                    <span className="text-[#94A3B8]">{todayPromise.reference}</span>
                  </div>
                  <p className="text-[#CBD5E1] italic line-clamp-2">
                    {todayPromise.verse}
                  </p>
                </div>

                {/* Action to test or view */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenDailyPromise?.(todayPromise);
                    }}
                    className="text-[12px] text-[#F59E0B] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ver promesa completa de hoy</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleTestNotification('promise')}
                    className="min-h-[34px] px-3 py-1 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 active:bg-amber-500/35 border border-amber-500/30 text-[#F59E0B] text-[11.5px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Probar alerta ahora</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sound & Web Audio Settings */}
          <div className="bg-[#0B1728] border border-white/[0.08] rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px]">
            <div className="flex items-center gap-2.5">
              <Volume2 className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <span className="font-medium text-[#F1F5F9]">Campana armónica de paz</span>
                <p className="text-[11.5px] text-[#94A3B8]">
                  Emite un acorde armónico relajante en el navegador al dispararse la notificación.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handlePlayChimeTest}
                className="px-2.5 py-1 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-[11.5px] text-[#CBD5E1] transition-colors cursor-pointer"
                title="Probar sonido de campana"
              >
                Escuchar tono
              </button>
              <input
                type="checkbox"
                checked={config.soundEnabled}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    soundEnabled: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-amber-500 cursor-pointer"
                aria-label="Activar sonido de campana armónica"
              />
            </div>
          </div>

          {/* Privacy & Technology Note */}
          <div className="flex items-start gap-2.5 text-[11.5px] text-[#64748B] bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
            <Info className="w-4 h-4 shrink-0 text-[#94A3B8] mt-0.5" />
            <p className="leading-relaxed">
              Las notificaciones se procesan localmente en tu dispositivo mediante la Web Notification API nativa. Tus horarios y preferencias se guardan de forma privada y no consumen batería adicional.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[#07101B] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[42px] px-4 py-2 rounded-xl text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:scale-95 text-[#060F1E] text-[13.5px] font-semibold transition-all cursor-pointer flex items-center gap-2 shadow-md"
          >
            {saveSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>¡Preferencias guardadas!</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Guardar recordatorios</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
