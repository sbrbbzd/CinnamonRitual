/**
 * Thursday Logic Service
 * Handles all Thursday-specific calculations and validations
 */

export interface CountdownTime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

/**
 * Check if current day is Thursday
 */
export const isThursday = (): boolean => {
    const now = new Date();
    return now.getDay() === 4; // 0 = Sunday, 4 = Thursday
};

/**
 * Get the next Thursday date
 */
export const getNextThursday = (): Date => {
    const now = new Date();
    const currentDay = now.getDay();
    const daysUntilThursday = currentDay <= 4 ? 4 - currentDay : 11 - currentDay;

    const nextThursday = new Date(now);
    nextThursday.setDate(now.getDate() + daysUntilThursday);
    nextThursday.setHours(0, 0, 0, 0);

    return nextThursday;
};

/**
 * Get current Thursday (if today is Thursday) or next Thursday
 */
export const getCurrentOrNextThursday = (): Date => {
    const now = new Date();
    if (isThursday()) {
        const today = new Date(now);
        today.setHours(0, 0, 0, 0);
        return today;
    }
    return getNextThursday();
};

/**
 * Get the end of current Thursday (11:59:59 PM)
 */
export const getThursdayEndTime = (): Date | null => {
    if (!isThursday()) return null;

    const now = new Date();
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    return endOfDay;
};

/**
 * Calculate countdown to next Thursday (or end of current Thursday if today is Thursday)
 */
export const getCountdownToThursday = (): CountdownTime => {
    const now = new Date();
    let targetDate: Date;

    if (isThursday()) {
        // If it's Thursday, countdown to end of day
        targetDate = getThursdayEndTime()!;
    } else {
        // Otherwise, countdown to next Thursday start
        targetDate = getNextThursday();
    }

    const diff = targetDate.getTime() - now.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

/**
 * Check if streak should be reset based on last completion date
 * Streak resets if last completion was NOT the previous Thursday
 */
export const shouldResetStreak = (lastCompletionDate: string | null): boolean => {
    if (!lastCompletionDate) return false;

    // If completed today, don't reset
    if (isCompletedToday(lastCompletionDate)) return false;

    const lastCompletion = new Date(lastCompletionDate);
    const now = new Date();

    // Get the previous Thursday
    const currentDay = now.getDay();
    let daysToLastThursday: number;

    if (currentDay === 4) {
        // If today is Thursday, check if last completion was last week's Thursday
        daysToLastThursday = 7;
    } else if (currentDay > 4) {
        // If we're past Thursday this week, last Thursday was this week
        daysToLastThursday = currentDay - 4;
    } else {
        // If we haven't reached Thursday yet, last Thursday was last week
        daysToLastThursday = currentDay + 3;
    }

    const previousThursday = new Date(now);
    previousThursday.setDate(now.getDate() - daysToLastThursday);
    previousThursday.setHours(0, 0, 0, 0);

    const nextDay = new Date(previousThursday);
    nextDay.setDate(previousThursday.getDate() + 1);

    // Check if last completion was on the previous Thursday
    return !(
        lastCompletion >= previousThursday && lastCompletion < nextDay
    );
};

/**
 * Check if a date is a Thursday
 */
export const isDateThursday = (date: Date): boolean => {
    return date.getDay() === 4;
};

/**
 * Get a formatted date string for today (ISO format)
 */
export const getTodayDateString = (): string => {
    return new Date().toISOString();
};

/**
 * Check if the ritual was completed today
 */
export const isCompletedToday = (lastCompletionDate: string | null): boolean => {
    if (!lastCompletionDate) return false;
    const last = new Date(lastCompletionDate);
    const now = new Date();
    return last.getDate() === now.getDate() &&
        last.getMonth() === now.getMonth() &&
        last.getFullYear() === now.getFullYear();
};
