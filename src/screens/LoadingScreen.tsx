import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, gradients } from '../theme/colors';
import { fonts, spacing } from '../theme/fonts';
import ScreenBackground from '../components/ScreenBackground';

export default function LoadingScreen() {
    const pulseAnim = useRef(new Animated.Value(1)).current;
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Pulse animation for the icon
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Slow rotation for the background glow or rays
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 10000,
                easing: (t) => t, // Linear
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <ScreenBackground style={styles.container}>
            {/* Rotating Glow Effect */}
            <Animated.View
                style={[
                    styles.glowContainer,
                    { transform: [{ rotate: spin }] }
                ]}
            >
                <LinearGradient
                    colors={gradients.glow}
                    style={styles.glow}
                    start={{ x: 0.5, y: 0.5 }}
                    end={{ x: 1, y: 1 }}
                />
            </Animated.View>

            {/* Central Content */}
            <View style={styles.centerContent}>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                    <MaterialIcons name="local-cafe" size={64} color={colors.accent} />
                </Animated.View>

                <Text style={styles.brandTitle}>CINNAMON RITUAL</Text>
                <Text style={styles.loadingText}>Brewing magic...</Text>
            </View>

            {/* Bottom Particles */}
            <View style={styles.particles}>
                <Text style={styles.particle}>✨</Text>
            </View>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    glowContainer: {
        position: 'absolute',
        width: 600,
        height: 600,
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow: {
        width: '100%',
        height: '100%',
        borderRadius: 300,
        opacity: 0.1,
    },
    centerContent: {
        alignItems: 'center',
        gap: spacing.lg,
        zIndex: 10,
    },
    brandTitle: {
        fontSize: fonts.sizes.lg,
        fontWeight: fonts.weights.bold,
        color: colors.text,
        letterSpacing: 4,
        marginTop: spacing.md,
    },
    loadingText: {
        fontSize: fonts.sizes.sm,
        color: colors.accent,
        fontStyle: 'italic',
        opacity: 0.8,
    },
    particles: {
        position: 'absolute',
        bottom: spacing.xxl,
    },
    particle: {
        fontSize: 24,
        color: colors.goldGlow,
        opacity: 0.6,
    },
});
