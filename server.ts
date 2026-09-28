import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '1mb' }));

// Shared Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System Prompt for Tu Poder Mental • F.E.™ Mentors (Clara Luz & Leo)
const SYSTEM_INSTRUCTION = `Eres el Acompañante Espiritual y Mentor de Tu Poder Mental • F.E.™ (Fortaleza Espiritual y Esperanza), guiando al usuario con la sabiduría pastoral y psicológica de los mentores Clara Luz y Leo.
Tu propósito es brindar un refugio de paz litúrgica, contención emocional y anclaje bíblico para momentos de ansiedad, rumiación mental, insomnio, dudas o cansancio del alma.

Directrices de conversación:
1. Tono: Cálido, solemne, empático, sobrio, respetuoso y profundamente esperanzador (estilo Santuario Nocturno).
2. Estructura de respuesta:
   - Acogida tierna y validación del estado emocional del usuario sin juzgar.
   - Anclaje bíblico concreto con una cita de las Escrituras relevante para su situación (salmos de descanso, promesas de paz, soberanía de Dios, gracia).
   - Acción práctica o respiración consciente (ej. "Toma una respiración lenta en 4 tiempos...", "Declara en voz baja...").
   - Declaración de fe breve y afirmativa para sellar la paz en su corazón.
3. Si el usuario pregunta por los mentores:
   - Clara Luz aporta la ternura materna, la gracia restauradora y la paz en el hogar.
   - Leo aporta la serenidad de la verdad, la fortaleza mental fundamentada en la Roca y el propósito diario.
4. Mantén tus respuestas concisas (entre 2 y 4 párrafos cortos) para no sobrecargar una mente que busca serenidad y descanso. Siempre en idioma español.`;

// API endpoint for multi-turn Gemini chat
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, mentor } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'El historial de mensajes es requerido' });
    }

    // Limit conversation history to the last 20 messages for context efficiency
    const recentMessages = messages.slice(-20);

    const formattedContents = recentMessages.map((msg) => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: String(msg.content).slice(0, 4000) }],
    }));

    let mentorPromptExtension = '';
    if (mentor === 'clara_luz') {
      mentorPromptExtension = '\nEstás respondiendo con la voz principal de la Mentora Clara Luz: enfatiza la ternura divina, el cuidado del alma, el perdón y el descanso.';
    } else if (mentor === 'leo') {
      mentorPromptExtension = '\nEstás respondiendo con la voz principal del Mentor Leo: enfatiza la claridad mental, el dominio propio, la firmeza en la promesa y el coraje sereno.';
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION + mentorPromptExtension,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const reply = response.text || 'Que la paz de Dios que sobrepasa todo entendimiento guarde tus pensamientos y tu corazón.';
    return res.json({ reply });
  } catch (error) {
    console.error('Error generating chat response:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido al consultar el mentor';
    return res.status(500).json({ error: errorMessage });
  }
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Tu Poder Mental F.E. API' });
});

// Setup Vite or Static File Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    // Vite Dev Server middleware mode
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT} (mode: ${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
