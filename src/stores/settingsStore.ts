import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { asyncJSONStorage, STORAGE_KEYS } from '@/services/localStorage';

interface ReminderSettings {
  dailyReminder: boolean;
  weeklySummary: boolean;
  activityReminder: boolean;
}

interface SettingsState {
  onboardingCompleted: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  language: string;
  reminders: ReminderSettings;

  setOnboardingCompleted: (v: boolean) => void;
  toggleSound: () => void;
  toggleReducedMotion: () => void;
  setLanguage: (lang: string) => void;
  toggleReminder: (key: keyof ReminderSettings) => void;
  reset: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      onboardingCompleted: false,
      soundEnabled: true,
      reducedMotion: false,
      language: 'English',
      reminders: { dailyReminder: true, weeklySummary: true, activityReminder: true },

      setOnboardingCompleted: (v) => set({ onboardingCompleted: v }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),
      setLanguage: (language) => set({ language }),
      toggleReminder: (key) =>
        set((state) => ({ reminders: { ...state.reminders, [key]: !state.reminders[key] } })),
      reset: () =>
        set({
          onboardingCompleted: false,
          soundEnabled: true,
          reducedMotion: false,
          language: 'English',
          reminders: { dailyReminder: true, weeklySummary: true, activityReminder: true },
        }),
    }),
    { name: STORAGE_KEYS.settings, storage: asyncJSONStorage, version: 1 },
  ),
);
