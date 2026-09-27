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
