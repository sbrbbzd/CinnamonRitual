import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';
import { fonts, spacing, borderRadius } from '../theme/fonts';
import CheckInButton from '../components/CheckInButton';
import ScreenBackground from '../components/ScreenBackground';

interface CompletionScreenProps {
    onShare: () => void;
    onBackHome: () => void;
}

export default function CompletionScreen({ onShare, onBackHome }: CompletionScreenProps) {
    const { t } = useTranslation();

    // Glow animation using React Native's Animated API (Expo Go compatible)
    const glowScale = useRef(new Animated.Value(1)).current;
    const glowOpacity = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        // Scale animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowScale, {
                    toValue: 1.2,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(glowScale, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Opacity animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowOpacity, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(glowOpacity, {
                    toValue: 0.5,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    return (
        <ScreenBackground style={styles.container}>
            {/* Particles/Stars */}
            <View style={styles.particlesContainer}>
                <Text style={[styles.particle, { top: '10%', left: '20%' }]}>✨</Text>
                <Text style={[styles.particle, { top: '15%', right: '15%' }]}>⭐</Text>
                <Text style={[styles.particle, { top: '70%', left: '10%' }]}>✦</Text>
                <Text style={[styles.particle, { top: '75%', right: '25%' }]}>✨</Text>
            </View>

            {/* Glowing Checkmark */}
            <View style={styles.checkmarkContainer}>
                <Animated.View
                    style={[
                        styles.glow,
                        {
                            transform: [{ scale: glowScale }],
                            opacity: glowOpacity,
                        }
                    ]}
                />
                <View style={styles.checkCircle}>
                    <Text style={styles.checkmark}>✓</Text>
                </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>{t('completion.title')}</Text>

            {/* Message */}
            <Text style={styles.message}>{t('completion.message')}</Text>

            {/* Share Button */}
            <CheckInButton
                onPress={onShare}
                label={t('completion.shareButton')}
                variant="outline"
                showIcon={true}
            />

            {/* Back Home Link */}
            <TouchableOpacity onPress={onBackHome}>
                <Text style={styles.backHomeText}>{t('completion.backHome')}</Text>
            </TouchableOpacity>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    particlesContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    particle: {
        position: 'absolute',
        fontSize: 20,
        color: colors.goldGlow,
        opacity: 0.6,
    },
    checkmarkContainer: {
        marginBottom: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glow: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.goldGlow,
        opacity: 0.3,
    },
    checkCircle: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: colors.goldGlow,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmark: {
        fontSize: 48,
        color: colors.primary,
        fontWeight: 'bold',
    },
    title: {
        fontSize: fonts.sizes.xxxl,
        color: colors.text,
        textAlign: 'center',
        marginBottom: spacing.md,
    },
    message: {
        fontSize: fonts.sizes.lg,
        color: colors.textItalic,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: spacing.xxl * 2,
    },
    shareButton: {
        width: '100%',
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
        marginBottom: spacing.lg,
    },
    buttonGradient: {
        paddingVertical: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    shareIcon: {
        fontSize: 20,
    },
    shareText: {
        fontSize: fonts.sizes.md,
        color: colors.text,
        fontWeight: fonts.weights.semibold,
    },
    backHomeText: {
        fontSize: fonts.sizes.sm,
        color: colors.textSecondary,
        letterSpacing: 2,
    },
});
