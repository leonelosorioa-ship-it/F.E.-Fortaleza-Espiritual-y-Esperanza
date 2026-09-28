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
import { SavedAnchor, GratitudeEntry, ChatMessage, UserProfile } from '../types';

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
