import { getGoogleAccessToken, connectGoogleSheets } from '../firebase';
import { GoogleSpreadsheet, SheetDataGrid, SavedAnchor, GratitudeEntry } from '../types';

const SHEETS_API_URL = 'https://sheets.googleapis.com/v4/spreadsheets';
const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';

/**
 * Helper to get the authenticated access token or request one
 */
async function getValidToken(): Promise<string> {
  const token = getGoogleAccessToken();
  if (token) return token;

  // Attempt to obtain token through popup
  try {
    return await connectGoogleSheets();
  } catch (err: any) {
    throw new Error(
      err?.message ||
        'Se requiere autorización con tu cuenta de Google para acceder a Google Sheets.'
    );
  }
}

/**
 * Handle API responses and catch 401s
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    await connectGoogleSheets();
    throw new Error('Sesión de Google actualizada. Por favor, reintenta la acción.');
  }

  if (!res.ok) {
    let message = `Error de Google Sheets API (${res.status})`;
    try {
      const errorJson = await res.json();
      if (errorJson?.error?.message) {
        message = errorJson.error.message;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(message);
  }

  return (await res.json()) as T;
}

/**
 * List spreadsheets belonging to the user from Google Drive
 */
export async function listSpreadsheets(): Promise<GoogleSpreadsheet[]> {
  const token = await getValidToken();

  const query = encodeURIComponent("mimeType='application/vnd.google-apps.spreadsheet' and trashed=false");
  const fields = encodeURIComponent('files(id,name,webViewLink,createdTime,modifiedTime)');
  const url = `${DRIVE_API_URL}/files?q=${query}&fields=${fields}&orderBy=modifiedTime desc&pageSize=30`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await handleResponse<{ files: GoogleSpreadsheet[] }>(res);
  return data.files || [];
}

/**
 * Fetch spreadsheet metadata including tabs/sheets
 */
export async function getSpreadsheetDetails(spreadsheetId: string): Promise<GoogleSpreadsheet> {
  const token = await getValidToken();
  const url = `${SHEETS_API_URL}/${spreadsheetId}?fields=spreadsheetId,properties.title,sheets.properties`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await handleResponse<any>(res);

  const sheets = (data.sheets || []).map((s: any) => ({
    sheetId: s.properties.sheetId,
    title: s.properties.title,
    index: s.properties.index || 0,
    rowCount: s.properties.gridProperties?.rowCount,
    columnCount: s.properties.gridProperties?.columnCount,
  }));

  return {
    id: data.spreadsheetId,
    name: data.properties?.title || 'Hoja de Cálculo',
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
    sheets,
  };
}

/**
 * Read values from a spreadsheet range (e.g. "Sheet1!A1:Z50" or just tab title)
 */
export async function getSheetValues(
  spreadsheetId: string,
  range: string = 'A1:Z60'
): Promise<SheetDataGrid> {
  const token = await getValidToken();
  const encodedRange = encodeURIComponent(range);
  const url = `${SHEETS_API_URL}/${spreadsheetId}/values/${encodedRange}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await handleResponse<any>(res);

  return {
    spreadsheetId,
    spreadsheetTitle: '',
    sheetTitle: range.includes('!') ? range.split('!')[0].replace(/'/g, '') : range,
    range: data.range || range,
    values: data.values || [],
  };
}

/**
 * Create a new spreadsheet with custom title and initial sheets
 */
export async function createSpreadsheet(
  title: string,
  initialSheets?: Array<{ title: string; initialRows?: string[][] }>
): Promise<GoogleSpreadsheet> {
  const token = await getValidToken();

  const body: any = {
    properties: {
      title,
    },
  };

  if (initialSheets && initialSheets.length > 0) {
    body.sheets = initialSheets.map((s) => ({
      properties: {
        title: s.title,
      },
    }));
  }

  const res = await fetch(SHEETS_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await handleResponse<any>(res);
  const spreadsheetId = data.spreadsheetId;

  // If initial rows were provided, append them
  if (initialSheets) {
    for (const sheet of initialSheets) {
      if (sheet.initialRows && sheet.initialRows.length > 0) {
        try {
          await appendRows(spreadsheetId, sheet.title, sheet.initialRows);
        } catch (e) {
          console.warn('Could not pre-fill initial rows into sheet:', e);
        }
      }
    }
  }

  return {
    id: spreadsheetId,
    name: data.properties?.title || title,
    webViewLink: `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`,
  };
}

/**
 * Append one or multiple rows to a specific tab
 */
export async function appendRows(
  spreadsheetId: string,
  sheetTitle: string,
  rows: string[][]
): Promise<any> {
  const token = await getValidToken();
  const encodedSheet = encodeURIComponent(sheetTitle);
  const url = `${SHEETS_API_URL}/${spreadsheetId}/values/${encodedSheet}:append?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: rows,
    }),
  });

  return await handleResponse<any>(res);
}

/**
 * Append a single row
 */
export async function appendRow(
  spreadsheetId: string,
  sheetTitle: string,
  row: string[]
): Promise<any> {
  return appendRows(spreadsheetId, sheetTitle, [row]);
}

/**
 * Update cell or small range
 */
export async function updateRange(
  spreadsheetId: string,
  range: string,
  values: string[][]
): Promise<any> {
  const token = await getValidToken();
  const encodedRange = encodeURIComponent(range);
  const url = `${SHEETS_API_URL}/${spreadsheetId}/values/${encodedRange}?valueInputOption=USER_ENTERED`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values,
    }),
  });

  return await handleResponse<any>(res);
}

// ----------------------------------------------------
// PRESET SPIRITUAL & DEVOTIONAL TEMPLATES
// ----------------------------------------------------

/**
 * Create a specialized "Registro de Peticiones y Oraciones" spreadsheet
 */
export async function createPrayerJournalSpreadsheet(): Promise<GoogleSpreadsheet> {
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const headers = [
    'Fecha de Petición',
    'Área de Vida / Cuadrante',
    'Motivo o Clamor al Señor',
    'Versículo Clave de Respaldo',
    'Estado',
    'Fecha de Respuesta',
    'Testimonio / Notas de Alabanza',
  ];

  const exampleRows = [
    [
      dateStr,
      'Paz Mental & Emocional',
      'Paz interior frente a situaciones de alta demanda y bendición para mi familia',
      'Filipenses 4:6-7',
      'En Oración Continua',
      '—',
      'El Señor me dio serenidad en medio del cansancio.',
    ],
    [
      dateStr,
      'Salud & Descanso',
      'Descanso reparador, sanidad física y vigor para servir con gozo',
      'Salmos 4:8',
      'Respondida por Gracia',
      dateStr,
      'Pude dormir con profunda paz en el corazón.',
    ],
  ];

  return createSpreadsheet('🕊️ Registro de Oraciones y Milagros - Fe que Sostiene', [
    {
      title: 'Peticiones y Respuestas',
      initialRows: [headers, ...exampleRows],
    },
  ]);
}

/**
 * Create a specialized "Diario de Gratitud Diaria" spreadsheet
 */
export async function createGratitudeLogSpreadsheet(): Promise<GoogleSpreadsheet> {
  const dateStr = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const headers = [
    'Fecha y Hora',
    'Motivo Principal de Gratitud',
    'Estado Emocional / Ánimo',
    'Reflexión Personal',
    'Promesa Bíblica de Ancla',
  ];

  const exampleRows = [
    [
      dateStr,
      'Por la misericordia de Dios que se renueva cada mañana y el pan en la mesa',
      'Paz y Esperanza',
      'Aprendí a contemplar las pequeñas victorias del día y agradecer cada respiro.',
      'Lamentaciones 3:22-23: Nuevas son cada mañana; grande es tu fidelidad.',
    ],
  ];

  return createSpreadsheet('🌿 Diario de Gratitud Espiritual - Fe que Sostiene', [
    {
      title: 'Diario de Gratitud',
      initialRows: [headers, ...exampleRows],
    },
  ]);
}

/**
 * Create a specialized "Plan Devocional y Promesas" spreadsheet
 */
export async function createDevotionalPlanSpreadsheet(): Promise<GoogleSpreadsheet> {
  const headers = [
    'Día / Ciclo',
    'Momento del Día',
    'Tema Devocional',
    'Cita Bíblica',
    'Promesa de Dios',
    'Oración Clave',
    'Completado (Sí/No)',
  ];

  const templateRows = [
    [
      'Día 1',
      'Amanecer',
      'La Presencia que da Reposo',
      'Éxodo 33:14',
      'Mi presencia irá contigo, y te daré descanso.',
      'Señor, en este día no doy un paso sin tu compañía.',
      'Sí',
    ],
    [
      'Día 2',
      'Tarde',
      'Fuerza para los Cansados',
      'Isaías 40:29',
      'Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.',
      'Padre, renueva mis fuerzas cuando siento que no puedo más.',
      'En Proceso',
    ],
    [
      'Día 3',
      'Noche',
      'Paz que Sobrepasa Entendimiento',
      'Filipenses 4:7',
      'Y la paz de Dios guardará vuestros corazones.',
      'Entrego toda ansiedad en tus manos en esta noche.',
      'Pendiente',
    ],
  ];

  return createSpreadsheet('📖 Plan Devocional y Promesas - Fe que Sostiene', [
    {
      title: 'Plan de Promesas',
      initialRows: [headers, ...templateRows],
    },
  ]);
}

/**
 * Export saved anchors / prayers to an existing or new spreadsheet
 */
export async function exportSavedAnchorsToSheet(
  anchors: SavedAnchor[],
  targetSpreadsheetId?: string,
  targetSheetTitle: string = 'Oraciones Guardadas'
): Promise<{ spreadsheetId: string; webViewLink: string }> {
  const headers = [
    'Fecha Guardado',
    'Categoría / Síntoma',
    'Cita Bíblica',
    'Declaración de Fe',
    'Reflexión Personal',
    'Cuadrante de Vida',
    'Mentor de Guía',
  ];

  const rows: string[][] = anchors.map((a) => [
    a.displayDate || a.dateISO || new Date().toLocaleDateString('es-ES'),
    a.symptomLabel || 'Ancla de Paz',
    a.scriptureRef || '',
    a.declaration || '',
    a.userReflection || '',
    a.quadrant || 'General',
    a.mentor || 'Clara Luz & Leo',
  ]);

  if (targetSpreadsheetId) {
    // Append rows to existing sheet
    await appendRows(targetSpreadsheetId, targetSheetTitle, rows);
    return {
      spreadsheetId: targetSpreadsheetId,
      webViewLink: `https://docs.google.com/spreadsheets/d/${targetSpreadsheetId}/edit`,
    };
  } else {
    // Create new sheet
    const created = await createSpreadsheet(
      `🕊️ Mis Anclas de Fe y Oraciones (${new Date().toLocaleDateString('es-ES')})`,
      [
        {
          title: targetSheetTitle,
          initialRows: [headers, ...rows],
        },
      ]
    );
    return {
      spreadsheetId: created.id,
      webViewLink: created.webViewLink || `https://docs.google.com/spreadsheets/d/${created.id}/edit`,
    };
  }
}

/**
 * Export gratitude entries to Google Sheets
 */
export async function exportGratitudeEntriesToSheet(
  entries: GratitudeEntry[],
  targetSpreadsheetId?: string,
  targetSheetTitle: string = 'Diario de Gratitud'
): Promise<{ spreadsheetId: string; webViewLink: string }> {
  const headers = [
    'Fecha',
    'Motivos de Gratitud / Bendiciones Nombradas',
    'Cantidad de Motivos',
  ];

  const rows: string[][] = entries.map((g) => [
    g.displayDate || g.dateISO || new Date().toLocaleDateString('es-ES'),
    g.items.join(' • '),
    g.items.length.toString(),
  ]);

  if (targetSpreadsheetId) {
    await appendRows(targetSpreadsheetId, targetSheetTitle, rows);
    return {
      spreadsheetId: targetSpreadsheetId,
      webViewLink: `https://docs.google.com/spreadsheets/d/${targetSpreadsheetId}/edit`,
    };
  } else {
    const created = await createSpreadsheet(
      `🌿 Mi Diario de Gratitud en Fe (${new Date().toLocaleDateString('es-ES')})`,
      [
        {
          title: targetSheetTitle,
          initialRows: [headers, ...rows],
        },
      ]
    );
    return {
      spreadsheetId: created.id,
      webViewLink: created.webViewLink || `https://docs.google.com/spreadsheets/d/${created.id}/edit`,
    };
  }
}
