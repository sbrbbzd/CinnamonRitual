import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { colors, gradients } from '../theme/colors';
import { fonts, spacing, borderRadius } from '../theme/fonts';
import CheckInButton from '../components/CheckInButton';
import ScreenBackground from '../components/ScreenBackground';

interface CheckInScreenProps {
    onComplete: () => void;
    onBack: () => void;
}

export default function CheckInScreen({ onComplete, onBack }: CheckInScreenProps) {
    const { t } = useTranslation();
    const { ritualData, completeRitual } = useAppStore();

    // Get daily intention
    const intentions = t('checkIn.intentions', { returnObjects: true }) as string[];
    const intentionIndex = ritualData.currentIntentionIndex || 0;
    const currentIntention = (intentions && intentions[intentionIndex])
        ? intentions[intentionIndex]
        : t('checkIn.intention');

    const handleComplete = async () => {
        await completeRitual();
        onComplete();
    };

    return (
        <ScreenBackground style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.headerButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('main.checkIn')}</Text>
                <TouchableOpacity style={styles.headerButton}>

                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Text style={styles.thursdayLabel}>{t('checkIn.thursday')}</Text>
                    <Text style={styles.mainTitle}>{t('checkIn.title')}</Text>
                </View>

                {/* Intention Card */}
                <View style={styles.intentionCard}>
                    {/* Star Icon */}
                    <View style={styles.starCircle}>
                        <Text style={styles.starIcon}>✦</Text>
                    </View>

                    {/* Card Title */}
                    <Text style={styles.intentionTitle}>{t('checkIn.theIntention')}</Text>
                    <Text style={styles.intentionSubtitle}>{t('checkIn.subtitle')}</Text>

                    {/* Quote */}
                    <View style={styles.quoteContainer}>
                        <Text style={styles.quoteMarkLeft}>"</Text>
                        <Text style={styles.intentionText}>
                            {currentIntention}
                        </Text>
                        <Text style={styles.quoteMarkRight}>"</Text>
                    </View>
                </View>

                {/* Complete Button */}
                <CheckInButton
                    onPress={handleComplete}
                    label={t('checkIn.completeButton')}
                    variant="outline"
                    showIcon={true}
                />

                {/* Streak Counter */}
                <View style={styles.streakContainer}>
                    <MaterialIcons name="local-fire-department" size={20} color={colors.accent} />
                    <Text style={styles.streakText}>
                        {ritualData.currentStreak} Weeks Streak
                    </Text>
                </View>
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl * 1.5,
        paddingBottom: spacing.md,
    },
    headerButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        fontSize: 32,
        color: colors.text,
        fontWeight: fonts.weights.light,
    },
    menuDots: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    dot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.text,
    },
    headerTitle: {
        fontSize: fonts.sizes.sm,
        color: colors.accent,
        letterSpacing: 3,
        fontWeight: fonts.weights.medium,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        alignItems: 'center',
        paddingBottom: spacing.xxl * 2,
        flexGrow: 1,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: spacing.xl * 1.5,
        marginTop: spacing.md,
    },
    thursdayLabel: {
        fontSize: 11,
        color: colors.textSecondary,
        letterSpacing: 3,
        marginBottom: spacing.sm,
        opacity: 0.6,
    },
    mainTitle: {
        fontSize: 36,
        color: colors.text,
        fontWeight: fonts.weights.light,
        letterSpacing: 0.5,
    },
    intentionCard: {
        backgroundColor: '#1A1310',
        borderRadius: 20,
        paddingVertical: spacing.xl * 1.5,
        paddingHorizontal: spacing.xl,
        width: '100%',
        alignItems: 'center',
        marginBottom: spacing.xxl * 1.5,
        borderWidth: 1,
        borderColor: colors.accent + '15',
    },
    starCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.accent + '25',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    starIcon: {
        fontSize: 20,
        color: colors.accent,
    },
    intentionTitle: {
        fontSize: 28,
        color: colors.text,
        marginBottom: spacing.xs,
        fontWeight: fonts.weights.regular,
        letterSpacing: 0.5,
    },
    intentionSubtitle: {
        fontSize: 10,
        color: colors.textSecondary,
        letterSpacing: 2,
        opacity: 0.5,
        marginBottom: spacing.xl,
    },
    quoteContainer: {
        width: '100%',
        position: 'relative',
        paddingHorizontal: spacing.md,
    },
    quoteMarkLeft: {
        position: 'absolute',
        left: 0,
        top: -8,
        fontSize: 36,
        color: colors.accent,
        opacity: 0.3,
        lineHeight: 36,
    },
    quoteMarkRight: {
        position: 'absolute',
        right: 0,
        bottom: -20,
        fontSize: 36,
        color: colors.accent,
        opacity: 0.3,
        lineHeight: 36,
    },
    intentionText: {
        fontSize: 20,
        color: colors.text,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 32,
        fontWeight: fonts.weights.light,
        paddingHorizontal: spacing.sm,
    },


    streakContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        opacity: 0.7,
    },
    streakIcon: {
        fontSize: 18,
    },
    streakText: {
        fontSize: fonts.sizes.md,
        color: colors.textSecondary,
        letterSpacing: 0.5,
    },

});
