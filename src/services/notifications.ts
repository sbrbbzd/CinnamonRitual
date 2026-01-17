import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { ReminderSettings } from '../types';

// Configure notification behavior
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

/**
 * Request notification permissions
 */
export const requestNotificationPermissions = async (): Promise<boolean> => {
    try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    } catch (error) {
        console.error('Error requesting notification permissions:', error);
        return false;
    }
};

/**
 * Schedule weekly Thursday notifications based on settings
 */
export const scheduleReminders = async (settings: ReminderSettings): Promise<void> => {
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
        console.log('Notification permissions not granted');
        return;
    }

    const times: { hour: number; minute: number; key: keyof ReminderSettings }[] = [];

    if (settings.morning) {
        times.push({ hour: 8, minute: 0, key: 'morning' });
    }
    if (settings.afternoon) {
        times.push({ hour: 14, minute: 0, key: 'afternoon' });
    }
    if (settings.evening) {
        times.push({ hour: 19, minute: 0, key: 'evening' });
    }

    for (const time of times) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Time for your Cinnamon Ritual ☕',
                body: 'Jupiter Thursday awaits. Prepare your intention and cinnamon.',
                sound: true,
            },
            trigger: {
                type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
                weekday: 5, // Thursday (1 = Sunday, 5 = Thursday)
                hour: time.hour,
                minute: time.minute,
                repeats: true,
            },
        });
    }

    console.log('Reminders scheduled successfully');
};

/**
 * Cancel all scheduled notifications
 */
export const cancelAllReminders = async (): Promise<void> => {
    try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        console.log('All reminders cancelled');
    } catch (error) {
        console.error('Error cancelling reminders:', error);
    }
};

/**
 * Get all scheduled notifications (for debugging)
 */
export const getScheduledNotifications = async () => {
    try {
        const notifications = await Notifications.getAllScheduledNotificationsAsync();
        console.log('Scheduled notifications:', notifications);
        return notifications;
    } catch (error) {
        console.error('Error getting scheduled notifications:', error);
        return [];
    }
};
