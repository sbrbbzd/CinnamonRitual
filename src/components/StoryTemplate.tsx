import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '../theme/colors';
import { fonts, spacing } from '../theme/fonts';
import { useTranslation } from 'react-i18next';

interface StoryTemplateProps {
    intention: string;
}

export const StoryTemplate = React.forwardRef<View, StoryTemplateProps>(
    ({ intention }, ref) => {
        const { t } = useTranslation();
        return (
            <View ref={ref} style={styles.container} collapsable={false}>
                <LinearGradient colors={gradients.primary} style={styles.gradient}>
                    {/* Particles */}
                    <View style={styles.particlesContainer}>
                        <Text style={[styles.particle, { top: '10%', left: '20%' }]}>✨</Text>
                        <Text style={[styles.particle, { top: '15%', right: '15%' }]}>⭐</Text>
                        <Text style={[styles.particle, { top: '70%', left: '10%' }]}>✦</Text>
                        <Text style={[styles.particle, { top: '75%', right: '25%' }]}>✨</Text>
                    </View>

                    {/* Content */}
                    <View style={styles.content}>
                        <Text style={styles.title}>{t('completion.title').replace(' ', '\n')}</Text>

                        <Text style={styles.intention}>{intention}</Text>

                        <View style={styles.footer}>
                            <Text style={styles.icon}>☕</Text>
                            <Text style={styles.brandText}>{t('checkIn.title').toUpperCase()}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        width: 360,
        height: 640,
        backgroundColor: colors.primary,
    },
    gradient: {
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
    content: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: spacing.xxl,
    },
    title: {
        fontSize: 36,
        color: colors.text,
        textAlign: 'center',
        lineHeight: 42,
    },
    intention: {
        fontSize: 18,
        color: colors.textItalic,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 26,
        paddingHorizontal: spacing.lg,
    },
    footer: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 24,
        marginBottom: spacing.sm,
    },
    brandText: {
        fontSize: 12,
        color: colors.accent,
        letterSpacing: 2,
    },
});
