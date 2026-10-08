import { db } from './index.ts';
import { gratitudeEntries, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { getOrCreateUser } from './users.ts';

export async function getUserGratitude(uid: string) {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user.length) return [];

    return await db
      .select()
      .from(gratitudeEntries)
      .where(eq(gratitudeEntries.userId, user[0].id))
      .orderBy(desc(gratitudeEntries.createdAt));
  } catch (error) {
    console.error("Database query for gratitude failed:", error);
    throw new Error("No se pudieron obtener las notas de gratitud.", { cause: error });
  }
}

export async function createGratitudeEntry(
  uid: string,
  email: string,
  entryId: string,
  items: string[],
  displayDate?: string
) {
  try {
    const user = await getOrCreateUser(uid, email);

    const result = await db
      .insert(gratitudeEntries)
      .values({
        userId: user.id,
        entryId,
        items: JSON.stringify(items),
        displayDate: displayDate || null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database insert for gratitude failed:", error);
    throw new Error("No se pudo guardar la entrada de gratitud.", { cause: error });
  }
}
