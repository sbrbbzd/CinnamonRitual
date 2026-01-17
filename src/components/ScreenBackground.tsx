import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

interface ScreenBackgroundProps {
    children?: React.ReactNode;
    style?: ViewStyle;
}

export default function ScreenBackground({ children, style }: ScreenBackgroundProps) {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.topGradient} />
            <View style={styles.bottomGradient} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.earthDark,
    },
    topGradient: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: colors.secondaryRust,
        opacity: 0.15,
        transform: [{ scale: 1.5 }],
    },
    bottomGradient: {
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 350,
        height: 350,
        borderRadius: 175,
        backgroundColor: colors.primaryGold,
        opacity: 0.08,
        transform: [{ scale: 1.5 }],
    },
});
