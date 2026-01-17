import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { fonts, spacing, borderRadius } from '../theme/fonts';

interface CheckInButtonProps {
    onPress: () => void;
    label: string;
    disabled?: boolean;
    style?: ViewStyle;
    variant?: 'outline' | 'filled';
    showIcon?: boolean;
}

export default function CheckInButton({
    onPress,
    label,
    disabled = false,
    style,
    variant = 'outline',
    showIcon = false,
}: CheckInButtonProps) {

    if (variant === 'filled') {
        return (
            <TouchableOpacity
                style={[styles.filledButton, disabled && styles.disabledFilledButton, style]}
                onPress={onPress}
                activeOpacity={0.9}
                disabled={disabled}
            >
                {showIcon && (
                    <View style={styles.checkCircle}>
                        <Text style={styles.checkIcon}>✓</Text>
                    </View>
                )}
                <Text style={styles.filledLabel}>{label}</Text>
            </TouchableOpacity>
        );
    }

    // Outline variant (default)
    return (
        <TouchableOpacity
            style={[styles.outlineButton, disabled && styles.disabledOutlineButton, style]}
            onPress={onPress}
            activeOpacity={0.8}
            disabled={disabled}
        >
            <LinearGradient
                colors={disabled
                    ? ['#555555' + '20', '#444444' + '10', '#555555' + '20']
                    : [colors.accent + '20', colors.accent + '10', colors.accent + '20']
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradient}
            >
                <Text style={[styles.outlineLabel, disabled && styles.disabledOutlineLabel]}>
                    {label}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    // Outline variant styles
    outlineButton: {
        width: '100%',
        maxWidth: 320,
        borderRadius: borderRadius.full,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.accent + '50',
        marginBottom: spacing.xl,
    },
    disabledOutlineButton: {
        opacity: 0.6,
        borderColor: '#555555' + '50',
    },
    gradient: {
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    outlineLabel: {
        fontSize: fonts.sizes.md,
        color: colors.accent,
        fontWeight: fonts.weights.medium,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    disabledOutlineLabel: {
        color: '#888888',
    },

    // Filled variant styles
    filledButton: {
        width: '100%',
        backgroundColor: colors.accent,
        borderRadius: 30,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.md,
        shadowColor: colors.accent,
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        elevation: 8,
    },
    disabledFilledButton: {
        opacity: 0.6,
        backgroundColor: '#666666',
    },
    checkCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkIcon: {
        fontSize: 16,
        color: colors.accent,
        fontWeight: 'bold',
    },
    filledLabel: {
        fontSize: fonts.sizes.lg,
        color: '#FFFFFF',
        fontWeight: fonts.weights.medium,
        letterSpacing: 0.3,
    },
});
