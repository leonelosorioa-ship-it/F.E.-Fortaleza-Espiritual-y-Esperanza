import { db } from './index.ts';
import { savedAnchors, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { getOrCreateUser } from './users.ts';

export interface CreateAnchorInput {
  anchorId: string;
  symptomId: string;
  symptomLabel: string;
  scriptureRef: string;
  declaration: string;
  userReflection?: string;
  quadrant?: string;
  mentor?: string;
  displayDate?: string;
}

export async function getUserAnchors(uid: string) {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user.length) return [];

    return await db
      .select()
      .from(savedAnchors)
      .where(eq(savedAnchors.userId, user[0].id))
      .orderBy(desc(savedAnchors.createdAt));
  } catch (error) {
    console.error("Database query for anchors failed:", error);
    throw new Error("No se pudieron obtener las oraciones de la base de datos.", { cause: error });
  }
}

export async function createAnchor(uid: string, email: string, input: CreateAnchorInput) {
  try {
    const user = await getOrCreateUser(uid, email);

    const result = await db
      .insert(savedAnchors)
      .values({
        userId: user.id,
        anchorId: input.anchorId,
        symptomId: input.symptomId,
        symptomLabel: input.symptomLabel,
        scriptureRef: input.scriptureRef,
        declaration: input.declaration,
        userReflection: input.userReflection || null,
        quadrant: input.quadrant || null,
        mentor: input.mentor || null,
        displayDate: input.displayDate || null,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database insert for anchor failed:", error);
    throw new Error("No se pudo guardar la oración en la base de datos.", { cause: error });
  }
}
