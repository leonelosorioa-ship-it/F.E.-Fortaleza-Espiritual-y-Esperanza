import {
  db,
  doc,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import {
  SavedAnchor,
  GratitudeEntry,
  ChatMessage,
  UserProfile,
  LoginLog,
  UserFile,
} from '../types';

/**
 * Creates or updates the user profile document in Firestore
 */
export async function syncUserProfile(profile: UserProfile): Promise<void> {
  const path = `users/${profile.userId}`;
  try {
    await setDoc(doc(db, 'users', profile.userId), profile, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Listen to user profile document in real-time
 */
export function subscribeToUserProfile(
  userId: string,
  onSuccess: (profile: UserProfile | null) => void
): () => void {
  const path = `users/${userId}`;
  const userRef = doc(db, 'users', userId);

  return onSnapshot(
    userRef,
    (snapshot) => {
      if (snapshot.exists()) {
        onSuccess(snapshot.data() as UserProfile);
      } else {
        onSuccess(null);
      }
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Listen to user saved anchors in real-time
 */
export function subscribeToSavedAnchors(
  userId: string,
  onSuccess: (anchors: SavedAnchor[]) => void
): () => void {
  const path = `users/${userId}/savedAnchors`;
  const anchorsRef = collection(db, 'users', userId, 'savedAnchors');

  return onSnapshot(
    anchorsRef,
    (snapshot) => {
      const anchors: SavedAnchor[] = [];
      snapshot.forEach((d) => {
        anchors.push(d.data() as SavedAnchor);
      });
      // Sort newest first
      anchors.sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      );
      onSuccess(anchors);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Persist a newly created liturgical anchor
 */
export async function persistSavedAnchor(
  userId: string,
  anchor: SavedAnchor
): Promise<void> {
  const path = `users/${userId}/savedAnchors/${anchor.id}`;
  try {
    const payload = {
      ...anchor,
      userId,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'savedAnchors', anchor.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a saved anchor
 */
export async function removeSavedAnchor(
  userId: string,
  anchorId: string
): Promise<void> {
  const path = `users/${userId}/savedAnchors/${anchorId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'savedAnchors', anchorId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Listen to gratitude entries in real-time
 */
export function subscribeToGratitudeEntries(
  userId: string,
  onSuccess: (entries: GratitudeEntry[]) => void
): () => void {
  const path = `users/${userId}/gratitudeEntries`;
  const entriesRef = collection(db, 'users', userId, 'gratitudeEntries');

  return onSnapshot(
    entriesRef,
    (snapshot) => {
      const entries: GratitudeEntry[] = [];
      snapshot.forEach((d) => {
        entries.push(d.data() as GratitudeEntry);
      });
      entries.sort(
        (a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
      );
      onSuccess(entries);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Persist an evening gratitude entry
 */
export async function persistGratitudeEntry(
  userId: string,
  entry: GratitudeEntry
): Promise<void> {
  const path = `users/${userId}/gratitudeEntries/${entry.id}`;
  try {
    const payload = {
      ...entry,
      userId,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'gratitudeEntries', entry.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Listen to chat messages in real-time
 */
export function subscribeToChatMessages(
  userId: string,
  onSuccess: (messages: ChatMessage[]) => void
): () => void {
  const path = `users/${userId}/chatHistory`;
  const chatRef = collection(db, 'users', userId, 'chatHistory');

  return onSnapshot(
    chatRef,
    (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((d) => {
        messages.push(d.data() as ChatMessage);
      });
      // Sort oldest to newest for conversational stream
      messages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      onSuccess(messages);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Persist a chat message (user or model)
 */
export async function persistChatMessage(
  userId: string,
  message: ChatMessage
): Promise<void> {
  const path = `users/${userId}/chatHistory/${message.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'chatHistory', message.id), message);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a specific chat message
 */
export async function removeChatMessage(
  userId: string,
  messageId: string
): Promise<void> {
  const path = `users/${userId}/chatHistory/${messageId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'chatHistory', messageId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Helper to determine device type from userAgent string
 */
function parseDeviceType(ua: string): string {
  if (/mobile/i.test(ua)) return 'Dispositivo Móvil';
  if (/ipad|tablet/i.test(ua)) return 'Tablet';
  if (/mac/i.test(ua)) return 'Mac / macOS';
  if (/win/i.test(ua)) return 'PC Windows';
  if (/linux/i.test(ua)) return 'Linux';
  return 'Navegador Web';
}

/**
 * Record a successful Google email sign-in event in Firestore
 */
export async function recordGoogleLogin(
  userId: string,
  email: string,
  displayName?: string,
  photoURL?: string
): Promise<LoginLog> {
  const logId = `login_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
  const path = `users/${userId}/loginLogs/${logId}`;
  const now = new Date().toISOString();
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'Desconocido';
  const device = typeof navigator !== 'undefined' ? parseDeviceType(navigator.userAgent) : 'Web';

  const logEntry: LoginLog = {
    id: logId,
    userId,
    email,
    providerId: 'google.com',
    loginTime: now,
    device,
    userAgent: ua.substring(0, 250),
    status: 'success',
    createdAt: now,
  };

  try {
    // 1. Write login audit record
    await setDoc(doc(db, 'users', userId, 'loginLogs', logId), logEntry);

    // 2. Update user profile with latest login timestamp
    await setDoc(
      doc(db, 'users', userId),
      {
        userId,
        email,
        displayName: displayName || 'Creyente en Camino',
        ...(photoURL ? { photoURL } : {}),
        lastLoginAt: now,
        updatedAt: now,
      },
      { merge: true }
    );

    return logEntry;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return logEntry;
  }
}

/**
 * Listen to Google login logs in real-time
 */
export function subscribeToLoginLogs(
  userId: string,
  onSuccess: (logs: LoginLog[]) => void
): () => void {
  const path = `users/${userId}/loginLogs`;
  const logsRef = collection(db, 'users', userId, 'loginLogs');

  return onSnapshot(
    logsRef,
    (snapshot) => {
      const logs: LoginLog[] = [];
      snapshot.forEach((d) => {
        logs.push(d.data() as LoginLog);
      });
      // Sort newest first
      logs.sort(
        (a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime()
      );
      onSuccess(logs);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Listen to user files and recordings in real-time
 */
export function subscribeToUserFiles(
  userId: string,
  onSuccess: (files: UserFile[]) => void
): () => void {
  const path = `users/${userId}/userFiles`;
  const filesRef = collection(db, 'users', userId, 'userFiles');

  return onSnapshot(
    filesRef,
    (snapshot) => {
      const files: UserFile[] = [];
      snapshot.forEach((d) => {
        files.push(d.data() as UserFile);
      });
      // Sort newest first
      files.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      onSuccess(files);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

/**
 * Persist or upload a devotional file or audio recording in Firestore
 */
export async function persistUserFile(
  userId: string,
  file: UserFile
): Promise<void> {
  const path = `users/${userId}/userFiles/${file.id}`;
  try {
    const payload: UserFile = {
      ...file,
      userId,
      createdAt: file.createdAt || new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId, 'userFiles', file.id), payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Delete a user file from Firestore
 */
export async function removeUserFile(
  userId: string,
  fileId: string
): Promise<void> {
  const path = `users/${userId}/userFiles/${fileId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'userFiles', fileId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}
