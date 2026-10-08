import { getGoogleAccessToken, connectGoogleDrive } from '../firebase';
import { GoogleDriveFile, GoogleDriveQuota, GoogleDriveUser, UserFile } from '../types';

const DRIVE_API_URL = 'https://www.googleapis.com/drive/v3';
const DRIVE_UPLOAD_URL = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';

export const APP_FOLDER_NAME = 'Tu Poder Mental - Botiquín de Fe';

// Ensure a valid token exists or prompt authentication
async function getAuthHeaders(): Promise<HeadersInit> {
  let token = getGoogleAccessToken();
  if (!token) {
    // Attempt to acquire access token
    token = await connectGoogleDrive();
  }
  if (!token) {
    throw new Error('Se requiere autenticación con Google para acceder a Google Drive.');
  }
  return {
    Authorization: `Bearer ${token}`,
  };
}

// Get Google Drive User and Storage Quota
export async function getDriveAbout(): Promise<{ quota: GoogleDriveQuota; user?: GoogleDriveUser }> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${DRIVE_API_URL}/about?fields=storageQuota,user`, {
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Error al obtener información de Google Drive (${response.status})`);
  }

  const data = await response.json();
  return {
    quota: data.storageQuota || {},
    user: data.user
      ? {
          displayName: data.user.displayName,
          emailAddress: data.user.emailAddress,
          photoLink: data.user.photoLink,
        }
      : undefined,
  };
}

// Search & List Files in Google Drive
export async function listDriveFiles(options: {
  folderId?: string;
  query?: string;
  mimeTypeFilter?: string;
  pageSize?: number;
} = {}): Promise<GoogleDriveFile[]> {
  const headers = await getAuthHeaders();
  const { folderId, query, mimeTypeFilter, pageSize = 40 } = options;

  const queryParts: string[] = ['trashed = false'];

  if (folderId) {
    queryParts.push(`'${folderId}' in parents`);
  }

  if (query && query.trim()) {
    const safeQuery = query.replace(/'/g, "\\'");
    queryParts.push(`(name contains '${safeQuery}' or fullText contains '${safeQuery}')`);
  }

  if (mimeTypeFilter && mimeTypeFilter !== 'all') {
    if (mimeTypeFilter === 'folder') {
      queryParts.push(`mimeType = 'application/vnd.google-apps.folder'`);
    } else if (mimeTypeFilter === 'document') {
      queryParts.push(
        `(mimeType contains 'document' or mimeType contains 'text' or mimeType = 'application/vnd.google-apps.document' or mimeType = 'application/pdf')`
      );
    } else if (mimeTypeFilter === 'audio') {
      queryParts.push(`mimeType contains 'audio/'`);
    } else if (mimeTypeFilter === 'image') {
      queryParts.push(`mimeType contains 'image/'`);
    }
  }

  const q = encodeURIComponent(queryParts.join(' and '));
  const fields = encodeURIComponent(
    'files(id, name, mimeType, size, iconLink, thumbnailLink, webViewLink, webContentLink, createdTime, modifiedTime, description, parents)'
  );

  const url = `${DRIVE_API_URL}/files?q=${q}&pageSize=${pageSize}&orderBy=folder,modifiedTime desc&fields=${fields}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Error al listar archivos de Google Drive (${response.status})`);
  }

  const data = await response.json();
  return (data.files || []).map((f: any) => ({
    id: f.id,
    name: f.name,
    mimeType: f.mimeType,
    size: f.size,
    iconLink: f.iconLink,
    thumbnailLink: f.thumbnailLink,
    webViewLink: f.webViewLink,
    webContentLink: f.webContentLink,
    createdTime: f.createdTime,
    modifiedTime: f.modifiedTime,
    description: f.description,
    parents: f.parents,
    isFolder: f.mimeType === 'application/vnd.google-apps.folder',
  }));
}

// Find or Create App Root Folder
export async function getOrCreateAppFolder(): Promise<GoogleDriveFile> {
  const headers = await getAuthHeaders();
  // Check if exists
  const safeName = APP_FOLDER_NAME.replace(/'/g, "\\'");
  const q = encodeURIComponent(`name = '${safeName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`);
  const checkUrl = `${DRIVE_API_URL}/files?q=${q}&fields=files(id,name,mimeType,webViewLink)`;

  const checkRes = await fetch(checkUrl, { headers });
  if (checkRes.ok) {
    const data = await checkRes.json();
    if (data.files && data.files.length > 0) {
      return {
        ...data.files[0],
        isFolder: true,
      };
    }
  }

  // Create folder
  return createDriveFolder(APP_FOLDER_NAME);
}

// Create a new Folder in Google Drive
export async function createDriveFolder(folderName: string, parentFolderId?: string): Promise<GoogleDriveFile> {
  const headers = await getAuthHeaders();
  const metadata: any = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder',
  };

  if (parentFolderId) {
    metadata.parents = [parentFolderId];
  }

  const response = await fetch(`${DRIVE_API_URL}/files?fields=id,name,mimeType,webViewLink,createdTime`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(metadata),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Error al crear carpeta en Google Drive (${response.status})`);
  }

  const created = await response.json();
  return {
    ...created,
    isFolder: true,
  };
}

// Multipart Upload to Google Drive (Supports text, audio, images, PDFs)
export async function uploadToDrive(
  fileBlob: Blob,
  fileName: string,
  mimeType: string,
  options: {
    folderId?: string;
    description?: string;
  } = {}
): Promise<GoogleDriveFile> {
  const token = getGoogleAccessToken() || (await connectGoogleDrive());
  if (!token) {
    throw new Error('Se requiere autenticación con Google para subir archivos a Google Drive.');
  }

  const metadata: any = {
    name: fileName,
    mimeType: mimeType || 'application/octet-stream',
    description: options.description,
  };

  if (options.folderId) {
    metadata.parents = [options.folderId];
  }

  const boundary = `-------314159265358979323846_${Date.now()}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadataBlob = new Blob(
    [
      delimiter,
      'Content-Type: application/json; charset=UTF-8\r\n\r\n',
      JSON.stringify(metadata),
      delimiter,
      `Content-Type: ${mimeType}\r\n\r\n`,
    ],
    { type: 'text/plain' }
  );

  const closeBlob = new Blob([closeDelimiter], { type: 'text/plain' });
  const multipartBlob = new Blob([metadataBlob, fileBlob, closeBlob], {
    type: `multipart/related; boundary=${boundary}`,
  });

  const response = await fetch(DRIVE_UPLOAD_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBlob,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Error al subir archivo a Google Drive (${response.status})`);
  }

  const result = await response.json();
  return {
    id: result.id,
    name: result.name,
    mimeType: result.mimeType,
    webViewLink: result.webViewLink,
    isFolder: false,
  };
}

// Create Devotional Note or Prayer document in Drive
export async function createDevotionalNoteInDrive(
  title: string,
  content: string,
  folderId?: string
): Promise<GoogleDriveFile> {
  const fileName = title.endsWith('.txt') ? title : `${title}.txt`;
  const textBlob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  return uploadToDrive(textBlob, fileName, 'text/plain', {
    folderId,
    description: 'Nota devocional guardada desde F.E.™ Tu Poder Mental',
  });
}

// Upload a UserFile (audio or document) to Google Drive
export async function uploadUserFileToDrive(userFile: UserFile, folderId?: string): Promise<GoogleDriveFile> {
  if (!userFile.dataUrl) {
    throw new Error('El archivo no contiene datos transferibles.');
  }

  // Convert base64 dataUrl to Blob
  const res = await fetch(userFile.dataUrl);
  const blob = await res.blob();
  const mimeType = userFile.mimeType || (userFile.fileType === 'audio' ? 'audio/webm' : 'application/octet-stream');
  const extension = userFile.fileType === 'audio' ? '.webm' : '';
  const fileName = userFile.name.includes('.') ? userFile.name : `${userFile.name}${extension}`;

  return uploadToDrive(blob, fileName, mimeType, {
    folderId,
    description: userFile.description || `Archivo devocional (${userFile.category || 'fe'}) guardado desde F.E.™`,
  });
}

// Delete file or folder in Google Drive (Destructive operation!)
// CAUTION: Caller MUST show user confirmation dialog before calling this!
export async function deleteDriveFile(fileId: string): Promise<void> {
  const headers = await getAuthHeaders();
  const response = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: 'DELETE',
    headers,
  });

  if (!response.ok && response.status !== 204) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody?.error?.message || `Error al eliminar archivo de Google Drive (${response.status})`);
  }
}
