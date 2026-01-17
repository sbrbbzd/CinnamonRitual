export const colors = {
    // Primary colors
    primary: '#2B1810', // Dark brown/espresso
    background: '#1A0F0A', // Darker brown
    accent: '#C8956B', // Gold/copper
    accentDark: '#A67C52', // Darker gold

    // Text colors
    text: '#f1dfc8ff', // Cream/beige
    textSecondary: '#C4B5A0', // Muted cream
    textItalic: '#D4C4B0', // Italic text color

    // Special effects
    goldGlow: '#9b812cff', // Gold glow
    success: '#888888', // Success green

    // UI elements
    cardBackground: '#221612',
    modalBackground: '#F5E6D3',
    modalText: '#2B1810',

    // Transparent overlays
    overlay: 'rgba(26, 15, 10, 0.9)',
    glassEffect: 'rgba(200, 149, 107, 0.1)',

    // "Modern Mystic" Design Colors
    earthDark: '#1f140f',
    earthClay: '#3d2820',
    earthBeige: '#eaddcf',
    primaryGold: '#cd9c62',
    secondaryRust: '#b85c38',
};

export const gradients = {
    primary: ['#2B1810', '#1A0F0A'] as const,
    gold: ['#D4AF37', '#C8956B'] as const,
    glow: ['rgba(212, 175, 55, 0.3)', 'rgba(212, 175, 55, 0)'] as const,
};
