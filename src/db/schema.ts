import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table with Firebase Auth UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  photoUrl: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Saved Spiritual Anchors
export const savedAnchors = pgTable('saved_anchors', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  anchorId: text('anchor_id').notNull(),
  symptomId: text('symptom_id').notNull(),
  symptomLabel: text('symptom_label').notNull(),
  scriptureRef: text('scripture_ref').notNull(),
  declaration: text('declaration').notNull(),
  userReflection: text('user_reflection'),
  quadrant: text('quadrant'),
  mentor: text('mentor'),
  displayDate: text('display_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Gratitude Journal Entries
export const gratitudeEntries = pgTable('gratitude_entries', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  entryId: text('entry_id').notNull(),
  items: text('items').notNull(), // JSON string array of gratitude blessings
  displayDate: text('display_date'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Devotional and Prayer Files
export const userFiles = pgTable('user_files', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  fileId: text('file_id').notNull(),
  name: text('name').notNull(),
  fileType: text('file_type').notNull(),
  category: text('category'),
  sizeBytes: integer('size_bytes').notNull().default(0),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  anchors: many(savedAnchors),
  gratitude: many(gratitudeEntries),
  files: many(userFiles),
}));

export const savedAnchorsRelations = relations(savedAnchors, ({ one }) => ({
  user: one(users, {
    fields: [savedAnchors.userId],
    references: [users.id],
  }),
}));

export const gratitudeEntriesRelations = relations(gratitudeEntries, ({ one }) => ({
  user: one(users, {
    fields: [gratitudeEntries.userId],
    references: [users.id],
  }),
}));

export const userFilesRelations = relations(userFiles, ({ one }) => ({
  user: one(users, {
    fields: [userFiles.userId],
    references: [users.id],
  }),
}));
