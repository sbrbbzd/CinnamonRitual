export interface UserProfile {
  name: string;
  language: Language;
  onboardingComplete: boolean;
}

export interface RitualData {
  currentStreak: number;
  lastCompletionDate: string | null; // ISO date string
  totalCompletions: number;
  currentIntentionIndex?: number;
  currentIntentionDate?: string; // Date string 'YYYY-MM-DD'
}

export interface ReminderSettings {
  morning: boolean;
  afternoon: boolean;
  evening: boolean;
  enabled: boolean;
}

export type Language = 'en' | 'fr' | 'de' | 'az' | 'tr' | 'ru' | 'ar';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];
