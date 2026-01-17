import { create } from 'zustand';
import { UserProfile, RitualData, ReminderSettings } from '../types';
import * as storage from '../services/storage';

interface AppState {
    // User data
    userProfile: UserProfile | null;
    ritualData: RitualData;
    reminderSettings: ReminderSettings;

    // Loading states
    isLoading: boolean;

    // Actions
    setUserProfile: (profile: UserProfile) => Promise<void>;
    setRitualData: (data: RitualData) => Promise<void>;
    setReminderSettings: (settings: ReminderSettings) => Promise<void>;
    completeRitual: () => Promise<void>;
    loadData: () => Promise<void>;
    resetStreak: () => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    userProfile: null,
    ritualData: {
        currentStreak: 0,
        lastCompletionDate: null,
        totalCompletions: 0,
    },
    reminderSettings: {
        morning: false,
        afternoon: false,
        evening: false,
        enabled: false,
    },
    isLoading: true,

    // Actions
    setUserProfile: async (profile: UserProfile) => {
        await storage.setUserProfile(profile);
        set({ userProfile: profile });
    },

    setRitualData: async (data: RitualData) => {
        await storage.setRitualData(data);
        set({ ritualData: data });
    },

    setReminderSettings: async (settings: ReminderSettings) => {
        await storage.setReminderSettings(settings);
        set({ reminderSettings: settings });
    },

    completeRitual: async () => {
        const { ritualData } = get();
        const newData: RitualData = {
            currentStreak: ritualData.currentStreak + 1,
            lastCompletionDate: new Date().toISOString(),
            totalCompletions: ritualData.totalCompletions + 1,
        };
        await storage.setRitualData(newData);
        set({ ritualData: newData });
    },

    resetStreak: async () => {
        const { ritualData } = get();
        const newData: RitualData = {
            ...ritualData,
            currentStreak: 0,
        };
        await storage.setRitualData(newData);
        set({ ritualData: newData });
    },

    loadData: async () => {
        set({ isLoading: true });
        const [userProfile, ritualData, reminderSettings] = await Promise.all([
            storage.getUserProfile(),
            storage.getRitualData(),
            storage.getReminderSettings(),
        ]);

        // Check for daily intention update
        const today = new Date().toISOString().split('T')[0];
        let newRitualData = ritualData;

        // If no intention date or it's not today, generate new intention
        if (!ritualData.currentIntentionDate || ritualData.currentIntentionDate !== today) {
            // Generate random index between 0 and 5 (assuming 6 intentions)
            const newIndex = Math.floor(Math.random() * 6);

            newRitualData = {
                ...ritualData,
                currentIntentionDate: today,
                currentIntentionIndex: newIndex,
            };

            // Should we persist this immediately? Yes, to keep it consistent for the day
            await storage.setRitualData(newRitualData);
        }

        set({
            userProfile,
            ritualData: newRitualData,
            reminderSettings,
            isLoading: false,
        });
    },
}));
