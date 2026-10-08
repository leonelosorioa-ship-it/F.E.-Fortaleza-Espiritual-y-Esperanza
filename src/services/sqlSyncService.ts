import { auth } from '../firebase';
import { SavedAnchor, GratitudeEntry } from '../types';

/**
 * Sync user profile to Cloud SQL backend
 */
export async function syncUserToCloudSql(displayName?: string, photoUrl?: string) {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/user/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ displayName, photoUrl }),
    });

    if (!res.ok) {
      console.warn('Could not sync user to Cloud SQL:', res.status);
      return null;
    }
    return await res.json();
  } catch (err) {
    console.warn('Network error syncing to Cloud SQL:', err);
    return null;
  }
}

/**
 * Backup saved anchor to Cloud SQL
 */
export async function saveAnchorToCloudSql(anchor: SavedAnchor) {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/anchors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        anchorId: anchor.id,
        symptomId: anchor.symptomId,
        symptomLabel: anchor.symptomLabel,
        scriptureRef: anchor.scriptureRef,
        declaration: anchor.declaration,
        userReflection: anchor.userReflection,
        quadrant: anchor.quadrant,
        mentor: anchor.mentor,
        displayDate: anchor.displayDate,
      }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Error saving anchor to Cloud SQL:', err);
    return null;
  }
}

/**
 * Backup gratitude entry to Cloud SQL
 */
export async function saveGratitudeToCloudSql(entry: GratitudeEntry) {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const token = await user.getIdToken();
    const res = await fetch('/api/gratitude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        entryId: entry.id,
        items: entry.items,
        displayDate: entry.displayDate,
      }),
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.warn('Error saving gratitude to Cloud SQL:', err);
    return null;
  }
}
