import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User as UserIcon,
  Trash2,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ShieldCheck,
  Compass,
  Heart,
  BookOpen,
  ArrowLeft,
  LogIn,
} from 'lucide-react';
import { ChatMessage } from '../types';
import { auth, loginWithGoogle } from '../firebase';
import {
  subscribeToChatMessages,
  persistChatMessage,
} from '../services/firestoreService';

interface GeminiMentorChatProps {
  onBack: () => void;
  onOpenPlan?: () => void;
}

type MentorChoice = 'clara_luz' | 'leo' | 'ambos';

const QUICK_PROMPTS = [
  {
    label: 'Ansiedad al anochecer',
    prompt: 'Tengo mucha ansiedad al acostarme y la mente no para de pensar en mis problemas. ¿Qué versículo y oración me recomiendas para soltar el control y descansar?',
  },
  {
    label: 'Miedo al futuro incierto',
    prompt: 'Siento incertidumbre por el día de mañana y temor a que las cosas salgan mal. ¿Cómo puedo arraigar mi mente en la soberanía de Dios?',
  },
  {
    label: 'Culpa y necesidad de perdón',
    prompt: 'Me siento indigno y con culpa por errores pasados. ¿Cómo puedo experimentar la gracia restauradora del Padre hoy?',
  },
  {
    label: 'Cansancio y fatiga del alma',
    prompt: 'Siento un agotamiento profundo donde las fuerzas ya no me alcanzan. ¿Cómo renovar mi vigor según Isaías 40:31?',
  },
];

export const GeminiMentorChat: React.FC<GeminiMentorChatProps> = ({
  onBack,
  onOpenPlan,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorChoice>('ambos');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Listen to Firestore chat messages if user is logged in
  useEffect(() => {
    if (currentUser) {
      const unsubFirestore = subscribeToChatMessages(currentUser.uid, (cloudMsgs) => {
        if (cloudMsgs.length > 0) {
          setMessages(cloudMsgs);
        } else {
          // Initialize welcome message for new users
          initializeDefaultMessages();
        }
      });
      return () => unsubFirestore();
    } else {
      // Local fallback from localStorage
      try {
        const stored = localStorage.getItem('fe_chat_history');
        if (stored) {
          setMessages(JSON.parse(stored));
        } else {
          initializeDefaultMessages();
        }
      } catch {
        initializeDefaultMessages();
      }
    }
  }, [currentUser]);

  const initializeDefaultMessages = () => {
    const welcomeMsg: ChatMessage = {
      id: 'welcome_' + Date.now(),
      userId: currentUser?.uid || 'guest',
      role: 'model',
      mentor: 'ambos',
      content:
        'Paz a ti. Te damos la bienvenida a este espacio sagrado de consejería y fortaleza espiritual. Somos Clara Luz y Leo. Si tu mente está cansada o tu espíritu afligido por la ansiedad, compártenos qué carga llevas esta noche. Te acompañaremos con la verdad de las Escrituras, sosiego litúrgico y principios de renovación mental.',
      timestamp: new Date().toISOString(),
    };
    setMessages([welcomeMsg]);
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const promptText = (textToSend || input).trim();
    if (!promptText || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      userId: currentUser?.uid || 'guest',
      role: 'user',
      content: promptText,
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Save locally or cloud
    if (currentUser) {
      persistChatMessage(currentUser.uid, userMessage).catch(console.error);
    } else {
      try {
        localStorage.setItem('fe_chat_history', JSON.stringify(newMessages));
      } catch {
        // Safe fallback
      }
    }

    try {
      // Send conversation context to backend endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          mentor: selectedMentor,
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Error al comunicarse con los mentores');
      }

      const data = await response.json();
      const modelReply: ChatMessage = {
        id: 'msg_model_' + Date.now(),
        userId: currentUser?.uid || 'guest',
        role: 'model',
        mentor: selectedMentor,
        content: data.reply,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...newMessages, modelReply];
      setMessages(finalMessages);

      if (currentUser) {
        persistChatMessage(currentUser.uid, modelReply).catch(console.error);
      } else {
        try {
          localStorage.setItem('fe_chat_history', JSON.stringify(finalMessages));
        } catch {
          // Safe fallback
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg: ChatMessage = {
        id: 'msg_err_' + Date.now(),
        userId: currentUser?.uid || 'guest',
        role: 'model',
        mentor: selectedMentor,
        content:
          '«No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo» (Isaías 41:10).\n\nHubo una interrupción en la señal, pero tu paz está resguardada. Toma una respiración profunda en 4 tiempos, inhala el aire fresco de la gracia y exhala la tensión. Intenta enviar tu mensaje nuevamente.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleSpeech = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_~]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9; // Calming, slow pace
    utterance.pitch = selectedMentor === 'clara_luz' ? 1.05 : 0.95;

    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);

    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearHistory = () => {
    if (window.confirm('¿Deseas reiniciar la conversación con los mentores?')) {
      initializeDefaultMessages();
      if (!currentUser) {
        localStorage.removeItem('fe_chat_history');
      }
    }
  };

  return (
    <div className="w-full max-w-[720px] mx-auto px-3 sm:px-6 py-4 flex flex-col min-h-[calc(100vh-140px)]">
      {/* Top Bar with Navigation and Clear */}
      <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/[0.08] mb-4">
        <button
          type="button"
          onClick={onBack}
          className="min-h-[44px] px-3 py-1.5 rounded-[10px] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/[0.04] text-[13px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-[#F59E0B]" strokeWidth={1.75} />
          <span>Volver</span>
        </button>

        <div className="flex items-center gap-2">
          {currentUser ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11.5px] text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden xs:inline">Historial guardado en Firestore</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => loginWithGoogle().catch(console.error)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11.5px] text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
              title="Inicia sesión con Google para sincronizar tus conversaciones"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Guardar en tu cuenta</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleClearHistory}
            className="p-2 rounded-[10px] text-[#94A3B8] hover:text-[#EF4444] hover:bg-white/[0.04] transition-colors cursor-pointer"
            title="Reiniciar conversación"
            aria-label="Reiniciar conversación"
          >
            <Trash2 className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* Header Info Banner */}
      <div className="bg-linear-to-b from-[#0F1E33] to-[#0A1424] border border-amber-500/20 rounded-[16px] p-4 sm:p-5 mb-4 shadow-sm">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0 text-[#F59E0B]">
            <Sparkles className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="space-y-1">
            <h1 className="font-editorial text-[18px] sm:text-[20px] text-[#F1F5F9] font-normal leading-tight">
              Acompañante Litúrgico & Mentores en Dios
            </h1>
            <p className="text-[12.5px] sm:text-[13px] text-[#94A3B8] leading-relaxed">
              Impulsado por Gemini 3.8 Flash con el método litúrgico de <strong>Clara Luz & Leo</strong>.
              Respuestas fundamentadas en la Palabra para calmar la rumiación nocturna y fijar tu mente en la paz de Dios.
            </p>
          </div>
        </div>

        {/* Mentor Selector Chips */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
          <span className="text-[11.5px] text-[#94A3B8] font-medium mr-1">Voz del Mentor:</span>
          <button
            type="button"
            onClick={() => setSelectedMentor('ambos')}
            className={`min-h-[34px] px-3 py-1 rounded-[8px] text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMentor === 'ambos'
                ? 'bg-[#F59E0B] text-[#060F1E] font-semibold shadow-xs'
                : 'bg-white/[0.04] text-[#CBD5E1] hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Clara Luz & Leo</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMentor('clara_luz')}
            className={`min-h-[34px] px-3 py-1 rounded-[8px] text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMentor === 'clara_luz'
                ? 'bg-rose-500 text-white font-semibold shadow-xs'
                : 'bg-white/[0.04] text-[#CBD5E1] hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Mentora Clara Luz (Ternura & Gracia)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMentor('leo')}
            className={`min-h-[34px] px-3 py-1 rounded-[8px] text-[12px] font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedMentor === 'leo'
                ? 'bg-sky-500 text-[#060F1E] font-semibold shadow-xs'
                : 'bg-white/[0.04] text-[#CBD5E1] hover:bg-white/[0.08] border border-white/[0.08]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mentor Leo (Fortaleza & Dominio)</span>
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 space-y-4 overflow-y-auto pr-1 pb-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 sm:gap-3 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  isUser
                    ? 'bg-amber-500/20 text-[#F59E0B] border border-amber-500/30'
                    : msg.mentor === 'clara_luz'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : msg.mentor === 'leo'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                    : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                }`}
              >
                {isUser ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-[14px] p-3.5 sm:p-4 text-[13.5px] sm:text-[14px] leading-relaxed relative group ${
                  isUser
                    ? 'bg-[#1E293B] text-[#F1F5F9] border border-white/[0.08] rounded-tr-xs'
                    : 'bg-[#0B1728] text-[#E2E8F0] border border-amber-500/15 rounded-tl-xs shadow-sm'
                }`}
              >
                {!isUser && (
                  <div className="flex items-center justify-between text-[11px] text-[#F59E0B] font-medium mb-1.5 border-b border-white/[0.06] pb-1">
                    <span>
                      {msg.mentor === 'clara_luz'
                        ? 'Mentora Clara Luz'
                        : msg.mentor === 'leo'
                        ? 'Mentor Leo'
                        : 'Mentores Clara Luz & Leo'}
                    </span>

                    {/* Action buttons */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.id, msg.content)}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        title="Copiar respuesta"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleSpeech(msg.id, msg.content)}
                        className="p-1 hover:text-white transition-colors cursor-pointer"
                        title={isSpeaking === msg.id ? 'Detener lectura' : 'Escuchar respuesta en voz serena'}
                      >
                        {isSpeaking === msg.id ? (
                          <VolumeX className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div className="whitespace-pre-line space-y-2">{msg.content}</div>

                <div className="mt-2 text-right text-[10px] text-[#64748B]">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-[#F59E0B] border border-amber-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 animate-spin text-[#F59E0B]" />
            </div>
            <div className="bg-[#0B1728] border border-amber-500/20 rounded-[14px] rounded-tl-xs p-3.5 text-[13px] text-[#94A3B8] flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
              <span>Los mentores están buscando en las Escrituras una respuesta de paz para ti...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      {messages.length < 3 && !isLoading && (
        <div className="mb-3 space-y-1.5">
          <div className="text-[11.5px] text-[#94A3B8] font-medium px-1">
            Consultas frecuentes de paz y descanso:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_PROMPTS.map((qp, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(qp.prompt)}
                className="px-2.5 py-1.5 rounded-[8px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[12px] text-[#CBD5E1] hover:text-[#F1F5F9] transition-colors cursor-pointer text-left"
              >
                {qp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="sticky bottom-0 bg-[#060F1E] pt-2"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe lo que inquieta tu mente o pide una oración..."
            disabled={isLoading}
            className="w-full min-h-[48px] pl-4 pr-12 rounded-[12px] bg-[#0F1E33] border border-white/[0.12] focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] text-[#F1F5F9] placeholder-[#64748B] text-[14px] outline-none transition-all shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 min-h-[38px] min-w-[38px] p-2 rounded-[9px] bg-[#F59E0B] text-[#060F1E] hover:bg-[#D97706] disabled:opacity-40 disabled:hover:bg-[#F59E0B] transition-colors cursor-pointer flex items-center justify-center font-bold"
            aria-label="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <div className="mt-1.5 text-center text-[11px] text-[#64748B]">
          Acompañamiento espiritual y litúrgico personal. En emergencias clínicas consulta un profesional médico.
        </div>
      </form>
    </div>
  );
};
