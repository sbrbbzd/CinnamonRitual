import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserProfile, RitualData, ReminderSettings } from '../types';

const KEYS = {
    USER_PROFILE: '@cinnamon_ritual:user_profile',
    RITUAL_DATA: '@cinnamon_ritual:ritual_data',
    REMINDER_SETTINGS: '@cinnamon_ritual:reminder_settings',
};

// User Profile
export const getUserProfile = async (): Promise<UserProfile | null> => {
    try {
        const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
};

export const setUserProfile = async (profile: UserProfile): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
    } catch (error) {
        console.error('Error setting user profile:', error);
    }
};

// Ritual Data
export const getRitualData = async (): Promise<RitualData> => {
    try {
        const data = await AsyncStorage.getItem(KEYS.RITUAL_DATA);
        return data
            ? JSON.parse(data)
            : {
                currentStreak: 0,
                lastCompletionDate: null,
                totalCompletions: 0,
            };
    } catch (error) {
        console.error('Error getting ritual data:', error);
        return {
            currentStreak: 0,
            lastCompletionDate: null,
            totalCompletions: 0,
        };
    }
};

export const setRitualData = async (data: RitualData): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEYS.RITUAL_DATA, JSON.stringify(data));
    } catch (error) {
        console.error('Error setting ritual data:', error);
    }
};

// Reminder Settings
export const getReminderSettings = async (): Promise<ReminderSettings> => {
    try {
        const data = await AsyncStorage.getItem(KEYS.REMINDER_SETTINGS);
        return data
            ? JSON.parse(data)
            : {
                morning: false,
                afternoon: false,
                evening: false,
                enabled: false,
            };
    } catch (error) {
        console.error('Error getting reminder settings:', error);
        return {
            morning: false,
            afternoon: false,
            evening: false,
            enabled: false,
        };
    }
};

export const setReminderSettings = async (
    settings: ReminderSettings
): Promise<void> => {
    try {
        await AsyncStorage.setItem(KEYS.REMINDER_SETTINGS, JSON.stringify(settings));
    } catch (error) {
        console.error('Error setting reminder settings:', error);
    }
};

// Clear all data (for testing)
export const clearAllData = async (): Promise<void> => {
    try {
        await AsyncStorage.multiRemove([
            KEYS.USER_PROFILE,
            KEYS.RITUAL_DATA,
            KEYS.REMINDER_SETTINGS,
        ]);
    } catch (error) {
        console.error('Error clearing data:', error);
    }
};
