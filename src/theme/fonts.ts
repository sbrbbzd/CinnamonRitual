export const fonts = {
    // Font families (will be loaded via expo-font)
    serif: 'Playfair Display',
    serifItalic: 'Playfair Display Italic',
    sans: 'Inter',

    // Font sizes
    sizes: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
        xxxl: 48,
        huge: 64,
    },

    // Font weights
    weights: {
        light: '300' as const,
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    full: 9999,
};
