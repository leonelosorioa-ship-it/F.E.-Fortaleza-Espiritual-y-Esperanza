export type SymptomId =
  | 'presencia'
  | 'ansiedad_noche'
  | 'confianza'
  | 'cansancio'
  | 'direccion'
  | 'peticion'
  | 'perdon'
  | 'gratitud';

export type ConversationalMood = 'panico' | 'insomnio' | 'culpa' | 'agotamiento';

export type UserRoleProfile =
  | 'madre_profesional'
  | 'padre_familia'
  | 'profesional_creyente'
  | 'hombre_fe'
  | 'mujer_fe';

export type LifeQuadrant = 'cuerpo' | 'mente' | 'alma' | 'proposito';

export type MentorId = 'clara_luz' | 'leo' | 'ambos';

export interface MentorPillar {
  name: string;
  tagline: string;
  iconName: string;
}

export interface MentorProfile {
  id: 'clara_luz' | 'leo';
  fullName: string;
  title: string;
  motto: string;
  shortBio: string;
  pillars: MentorPillar[];
  specialty: string;
  primaryColor: string;
  badgeColor: string;
  glowColor: string;
}

export interface QuadrantInfo {
  id: LifeQuadrant;
  name: string;
  tagline: string;
  description: string;
  focusArea: string;
  iconName: string;
  accentColor: string;
  recommendedSymptom: SymptomId;
}

export interface RoleProfileOption {
  id: UserRoleProfile;
  label: string;
  sublabel: string;
  contextDesc: string;
  specificTension: string;
  iconName: string;
}

export interface SymptomOption {
  id: SymptomId;
  label: string;
  tag: string;
  iconColor: string;
  quadrant?: LifeQuadrant;
  quadrantLabel?: string;
  conversationalMood?: ConversationalMood;
}

export interface LiturgyStep {
  title: string;
  body: string;
}

export interface AnchorContent {
  symptomId: SymptomId;
  symptomLabel: string;
  quadrant?: LifeQuadrant;
  scripture: {
    verse: string;
    reference: string;
    contextNote: string;
  };
  declaration: string;
  liturgy: {
    step1: LiturgyStep;
    step2: LiturgyStep;
    step3: LiturgyStep;
  };
  morningSeed: {
    verse: string;
    reference: string;
  };
}

export interface SavedAnchor {
  id: string;
  dateISO: string;
  displayDate: string;
  roleProfile?: UserRoleProfile;
  symptomId: SymptomId;
  symptomLabel: string;
  userReflection?: string;
  scriptureRef: string;
  declaration: string;
  quadrant?: LifeQuadrant;
  mentor?: MentorId;
}

export interface GratitudeEntry {
  id: string;
  dateISO: string;
  displayDate: string;
  items: string[];
}

export interface DailyPlanDay {
  dayNumber: number;
  weekNumber: number;
  title: string;
  theme: string;
  principle: string;
  renewal: string;
  anchorAction: string;
  scriptureRef: string;
  verse: string;
  keyMessage?: string;
  category?: 'fe_esperanza' | 'familia' | 'amigos' | 'trabajo' | 'sociedad' | 'oracion' | 'sanidad_perdon';
  categoryLabel?: string;
  illustrationKey?: string;
  quadrant?: LifeQuadrant;
  mentorGuide?: 'Clara Luz' | 'Leo' | 'Clara Luz & Leo';
  isFreePreview?: boolean;
}

export interface AudioFaithSession {
  id: string;
  title: string;
  durationMinutes: string;
  narrator: string;
  soundscape: string;
  description: string;
  scriptureTheme: string;
  quadrant?: LifeQuadrant;
  mentorId?: MentorId;
  isFreePreview?: boolean;
}

export interface GraceStreakState {
  completedDays: number[];
  lastCompletedDateISO?: string;
  totalCheckIns: number;
  graceShieldActive: boolean;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'user' | 'model';
  content: string;
  mentor?: 'clara_luz' | 'leo' | 'ambos';
  timestamp: string;
}

export interface UserProfile {
  userId: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  activeRole?: UserRoleProfile;
  currentDay?: number;
  hasFullAccess?: boolean;
  lastLoginAt?: string;
  loginCount?: number;
  storageQuotaUsedBytes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginLog {
  id: string;
  userId: string;
  email: string;
  providerId: string;
  loginTime: string;
  device?: string;
  userAgent?: string;
  status?: string;
  createdAt?: string;
}

export type UserFileCategory =
  | 'oracion'
  | 'reflexion'
  | 'diario'
  | 'audio_devocional'
  | 'estudio'
  | 'otro';

export type UserFileType = 'audio' | 'pdf' | 'image' | 'document' | 'other';

export interface UserFile {
  id: string;
  userId: string;
  name: string;
  fileType: UserFileType;
  mimeType?: string;
  sizeBytes: number;
  category?: UserFileCategory;
  description?: string;
  dataUrl?: string; // Base64 data URL or audio recording data
  createdAt: string;
}

export interface ReminderItemConfig {
  enabled: boolean;
  time: string; // "HH:MM" e.g. "21:00"
  title: string;
  body: string;
  lastFiredDate?: string; // "YYYY-MM-DD"
}

export interface NotificationScheduleConfig {
  soundEnabled: boolean;
  gratitude: ReminderItemConfig;
  dailyPromise: ReminderItemConfig;
}

export interface DailyPromiseData {
  id: string;
  theme: string;
  verse: string;
  reference: string;
  reflection: string;
  prayer: string;
  quadrant?: LifeQuadrant;
}

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  iconLink?: string;
  thumbnailLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  description?: string;
  parents?: string[];
  isFolder?: boolean;
}

export interface GoogleDriveQuota {
  limit?: string;
  usage?: string;
  usageInDrive?: string;
  usageInDriveTrash?: string;
}

export interface GoogleDriveUser {
  displayName?: string;
  emailAddress?: string;
  photoLink?: string;
}

export interface SheetTabInfo {
  sheetId: number;
  title: string;
  index: number;
  rowCount?: number;
  columnCount?: number;
}

export interface GoogleSpreadsheet {
  id: string;
  name: string;
  webViewLink?: string;
  createdTime?: string;
  modifiedTime?: string;
  sheets?: SheetTabInfo[];
}

export interface SheetDataGrid {
  spreadsheetId: string;
  spreadsheetTitle: string;
  sheetTitle: string;
  range: string;
  values: string[][];
}

export type SheetTemplateType =
  | 'prayer_requests'
  | 'gratitude_journal'
  | 'devotional_plan'
  | 'blank';



