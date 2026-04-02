import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { Language, LANGUAGES } from '../types';
import {
    isThursday,
    isCompletedToday,
    getCountdownToThursday,
    shouldResetStreak,
    CountdownTime,
} from '../services/thursdayLogic';
import { colors, gradients } from '../theme/colors';
import { fonts, spacing, borderRadius } from '../theme/fonts';
import SetReminderModal from '../components/SetReminderModal';
import CheckInButton from '../components/CheckInButton';
import LanguageModal from '../components/LanguageModal';
import ScreenBackground from '../components/ScreenBackground';

interface MainScreenProps {
    onCheckIn: () => void;
}

export default function MainScreen({ onCheckIn }: MainScreenProps) {
    const { t, i18n } = useTranslation();
    const { userProfile, ritualData, resetStreak } = useAppStore();

    const [countdown, setCountdown] = useState<CountdownTime>(getCountdownToThursday());
    const [showReminderModal, setShowReminderModal] = useState(false);
    const [showJoke, setShowJoke] = useState(false);
    const [currentJoke, setCurrentJoke] = useState('');
    const [showLanguageModal, setShowLanguageModal] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<Language>(userProfile?.language || 'en');

    // Update countdown every second
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(getCountdownToThursday());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Check if streak should be reset
    useEffect(() => {
        if (ritualData.lastCompletionDate && shouldResetStreak(ritualData.lastCompletionDate)) {
            resetStreak();
        }
    }, [ritualData.lastCompletionDate]);

    const handleCheckIn = () => {
        if (isThursday()) {
            onCheckIn();
        } else {
            // Show spiritual joke
            const jokes = t('spiritualJokes', { returnObjects: true }) as string[];
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            setCurrentJoke(randomJoke);
            setShowJoke(true);
        }
    };

    const formatNumber = (num: number): string => {
        return num.toString().padStart(2, '0');
    };

    const isCompleted = isThursday() && isCompletedToday(ritualData.lastCompletionDate);

    return (
        <ScreenBackground style={styles.container}>
            {/* Background Glow Effect */}
            {/*<View style={styles.backgroundGlow} />*/}

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.iconButton} />
                <TouchableOpacity
                    style={styles.languageDropdown}
                    onPress={() => setShowLanguageModal(true)}
                >
                    <Text style={styles.languageCode}>{selectedLanguage.toUpperCase()}</Text>
                    <Text style={styles.dropdownArrow}>▼</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
                {/* Status Badge */}
                <View style={styles.statusBadge}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>{t('main.ritualActive')}</Text>
                </View>

                {/* Welcome Message */}
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText}>{t('main.welcome')},</Text>
                    <Text style={styles.nameText}>{userProfile?.name || t('main.defaultName')}</Text>
                </View>

                {/* Countdown */}
                <View style={styles.countdownContainer}>
                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{formatNumber(countdown.days)}</Text>
                        <Text style={styles.timeLabel}>{t('main.days')}</Text>
                    </View>

                    <Text style={styles.timeSeparator}>:</Text>

                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{formatNumber(countdown.hours)}</Text>
                        <Text style={styles.timeLabel}>{t('main.hours')}</Text>
                    </View>

                    <Text style={styles.timeSeparator}>:</Text>

                    <View style={styles.timeBlock}>
                        <Text style={styles.timeNumber}>{formatNumber(countdown.minutes)}</Text>
                        <Text style={styles.timeLabel}>{t('main.mins')}</Text>
                    </View>
                </View>

                {/* Until Thursday Text */}
                <View style={styles.textContainer}>
                    <Text style={styles.untilText}>{t('main.nextRitual')}</Text>
                </View>

                {/* Decorative Divider */}
                <View style={styles.divider}>
                    <View style={styles.dividerLine} />
                    <View style={styles.dividerDiamond} />
                    <View style={styles.dividerLine} />
                </View>

                {/* Check In Button */}
                <CheckInButton
                    onPress={handleCheckIn}
                    label={isCompleted ? t('main.ritualCompleted') : t('main.checkIn')}
                    disabled={isCompleted}
                />

                {/* Set Reminder Link */}
                <TouchableOpacity onPress={() => setShowReminderModal(true)}>
                    <Text style={styles.reminderLink}>{t('main.setReminder')}</Text>
                </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.prepareText}>{t('main.prepareCinnamon')}</Text>
            </View>

            {/* Reminder Modal */}
            <SetReminderModal
                visible={showReminderModal}
                onClose={() => setShowReminderModal(false)}
            />

            {/* Spiritual Joke Modal */}
            <Modal
                visible={showJoke}
                transparent
                animationType="fade"
                onRequestClose={() => setShowJoke(false)}
            >
                <View style={styles.jokeOverlay}>
                    <View style={styles.jokeContainer}>
                        <Text style={styles.jokeText}>{currentJoke}</Text>
                        <TouchableOpacity
                            style={styles.jokeButton}
                            onPress={() => setShowJoke(false)}
                        >
                            <Text style={styles.jokeButtonText}>{t('main.jokeButton')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Language Selection Modal */}
            <LanguageModal
                visible={showLanguageModal}
                onClose={() => setShowLanguageModal(false)}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={async (lang) => {
                    setSelectedLanguage(lang);
                    await i18n.changeLanguage(lang);
                    // Modal closes automatically inside component or we can close it here if needed 
                    // (LanguageModal component closes it? Let's check. Yes it calls onClose)
                    // Wait, LanguageModal calls onSelectLanguage then onClose.
                }}
            />
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundGlow: {
        position: 'absolute',
        top: '30%',
        left: '50%',
        width: 400,
        height: 400,
        marginLeft: -200,
        marginTop: -200,
        borderRadius: 200,
        backgroundColor: colors.primaryGold,
        opacity: 0.08,
        transform: [{ scale: 1.5 }],
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl * 1.5,
        paddingBottom: spacing.md,
    },
    iconButton: {
        padding: spacing.sm,
    },
    languageDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
        borderWidth: 1,
        borderColor: colors.accent,
        gap: 4,
    },
    languageCode: {
        fontSize: fonts.sizes.sm,
        color: colors.accent,
        fontWeight: fonts.weights.semibold,
        letterSpacing: 1,
    },
    dropdownArrow: {
        fontSize: 10,
        color: colors.accent,
    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xxl * 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.full,
        borderWidth: 1,
        borderColor: colors.accent + '40',
        marginBottom: spacing.xl,
        gap: spacing.xs,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.accent,
    },
    statusText: {
        fontSize: 10,
        color: colors.accent + 'CC',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        fontWeight: fonts.weights.medium,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginBottom: spacing.xxl * 2,
    },
    welcomeText: {
        fontSize: fonts.sizes.xl,
        color: colors.text,
        fontWeight: fonts.weights.light,
    },
    nameText: {
        fontSize: fonts.sizes.xxl,
        color: colors.accent,
        fontStyle: 'italic',
        fontWeight: fonts.weights.regular,
    },
    countdownContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: spacing.xl,
        gap: spacing.sm,
    },
    timeBlock: {
        alignItems: 'center',
    },
    timeNumber: {
        fontSize: 72,
        color: colors.accent,
        fontWeight: fonts.weights.light,
        lineHeight: 72,
        letterSpacing: -2,
    },
    timeLabel: {
        fontSize: 10,
        color: colors.textSecondary + '80',
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: spacing.xs,
        fontWeight: fonts.weights.medium,
    },
    timeSeparator: {
        fontSize: 48,
        color: colors.accent + '40',
        fontWeight: fonts.weights.light,
        marginBottom: spacing.lg,
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    untilText: {
        fontSize: fonts.sizes.xl,
        color: colors.text,
        fontWeight: fonts.weights.light,
        marginBottom: spacing.xs,
    },
    nextRitualText: {
        fontSize: fonts.sizes.sm,
        color: colors.accent + '66',
        letterSpacing: 1,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: spacing.xl,
        opacity: 0.3,
        gap: spacing.md,
    },
    dividerLine: {
        width: 48,
        height: 1,
        backgroundColor: colors.accent,
    },
    dividerDiamond: {
        width: 6,
        height: 6,
        borderWidth: 1,
        borderColor: colors.accent,
        transform: [{ rotate: '45deg' }],
    },

    buttonGradient: {
        paddingVertical: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    checkInIcon: {
        fontSize: 18,
        color: colors.accent + 'CC',
    },
    checkInText: {
        fontSize: fonts.sizes.md,
        color: colors.accent,
        fontWeight: fonts.weights.medium,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    reminderLink: {
        fontSize: 10,
        color: colors.accent + '99',
        textAlign: 'center',
        marginTop: spacing.sm,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        textDecorationLine: 'underline',
        fontWeight: fonts.weights.medium,
    },
    footer: {
        paddingBottom: spacing.xxl,
        alignItems: 'center',
        opacity: 0.4,
    },
    prepareText: {
        fontSize: 10,
        color: colors.text,
        textAlign: 'center',
        letterSpacing: 2.5,
        textTransform: 'uppercase',
    },
    jokeOverlay: {
        flex: 1,
        backgroundColor: colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    jokeContainer: {
        backgroundColor: colors.cardBackground,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.accent,
    },
    jokeText: {
        fontSize: fonts.sizes.lg,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.lg,
        lineHeight: 28,
    },
    jokeButton: {
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
    },
    jokeButtonText: {
        fontSize: fonts.sizes.md,
        color: colors.primary,
        fontWeight: fonts.weights.semibold,
    },
});
