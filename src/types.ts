export type SymptomId =
  | 'ansiedad'
  | 'soledad'
  | 'panico'
  | 'tristeza'
  | 'sentido'
  | 'agotamiento'
  | 'culpa';

export interface SymptomOption {
  id: SymptomId;
  label: string;
  tag: string;
}

export interface LiturgyStep {
  title: string;
  body: string;
}

export interface AnchorContent {
  symptomId: SymptomId;
  symptomLabel: string;
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
  symptomId: SymptomId;
  symptomLabel: string;
  userReflection?: string;
  scriptureRef: string;
  declaration: string;
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
  isFreePreview?: boolean;
}
