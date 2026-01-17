import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { Language, LANGUAGES } from '../types';
import { colors } from '../theme/colors';
import { fonts, spacing } from '../theme/fonts';
import LanguageModal from '../components/LanguageModal';
import ScreenBackground from '../components/ScreenBackground';

interface OnboardingScreenProps {
    onComplete: () => void;
}

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
    const { t, i18n } = useTranslation();
    const setUserProfile = useAppStore((state) => state.setUserProfile);

    const [name, setName] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
    const [showLanguages, setShowLanguages] = useState(false);

    const handleContinue = async () => {
        if (name.trim()) {
            await i18n.changeLanguage(selectedLanguage);
            await setUserProfile({
                name: name.trim(),
                language: selectedLanguage,
                onboardingComplete: true,
            });
            onComplete();
        }
    };

    const selectedLangOption = LANGUAGES.find((l) => l.code === selectedLanguage);

    return (
        <ScreenBackground>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.iconWrapper}>
                            <View style={styles.iconGlow} />
                            <MaterialIcons name="local-cafe" size={32} color={colors.primaryGold} />
                        </View>

                        <Text style={styles.title}>
                            {t('onboarding.welcome')}{'\n'}
                            <Text style={styles.titleItalic}>{t('onboarding.yourRitual')}</Text>
                        </Text>

                        <Text style={styles.subtitle}>{t('onboarding.subtitle')}</Text>
                    </View>

                    {/* Image Section */}
                    <View style={styles.imageSection}>
                        {/* Background Border Effect */}
                        <View style={styles.imageBorderBack} />

                        {/* Main Image Container */}
                        <View style={styles.imageContainer}>
                            <View style={styles.imageOverlayDark} />
                            <View style={styles.imageOverlayColor} />
                            <Image
                                source={require('../../assets/coffee.png')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Form Section */}
                    <View style={styles.formSection}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('onboarding.nameLabel')}</Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('onboarding.namePlaceholder')}
                                    placeholderTextColor={colors.earthBeige + '40'} // 25% opacity
                                    value={name}
                                    onChangeText={setName}
                                />
                                <MaterialIcons
                                    name="edit"
                                    size={20}
                                    color={colors.primaryGold}
                                    style={styles.inputIcon}
                                />
                            </View>
                        </View>

                        {/* Language Selector */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('onboarding.languageLabel')}</Text>
                            <TouchableOpacity
                                style={styles.inputWrapper}
                                onPress={() => setShowLanguages(true)}
                            >
                                <Text style={styles.inputText}>
                                    {selectedLangOption?.nativeName || 'English'}
                                </Text>
                                <MaterialIcons
                                    name="expand-more"
                                    size={24}
                                    color={colors.primaryGold}
                                    style={styles.inputIcon}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* Begin Button */}
                        <TouchableOpacity
                            style={styles.beginButton}
                            onPress={handleContinue}
                            disabled={!name.trim()}
                            activeOpacity={0.9}
                        >
                            <View style={[styles.buttonInner, !name.trim() && styles.buttonDisabled]}>
                                <Text style={styles.buttonText}>BEGIN</Text>
                                <MaterialIcons name="arrow-forward" size={18} color={colors.earthBeige} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Language Modal */}
            <LanguageModal
                visible={showLanguages}
                onClose={() => setShowLanguages(false)}
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
            />
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.lg,
        paddingTop: spacing.xxl,
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
    },
    iconWrapper: {
        marginBottom: spacing.lg,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
    },
    iconGlow: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primaryGold,
        opacity: 0.1,
    },
    title: {
        fontSize: 32,
        color: colors.earthBeige,
        textAlign: 'center',
        lineHeight: 38,
        fontWeight: '500', // font-medium equivalent 
    },
    titleItalic: {
        color: colors.primaryGold,
        fontStyle: 'italic',
        fontWeight: '300', // font-light equivalent
    },
    subtitle: {
        marginTop: spacing.sm,
        fontSize: 16,
        color: colors.earthBeige,
        opacity: 0.7,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 260,
    },
    imageSection: {
        marginVertical: spacing.xl,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        height: 220,
        width: 2000,
    },
    imageBorderBack: {
        position: 'absolute',
        width: 200,
        height: 260,
        borderWidth: 1,
        borderColor: colors.primaryGold,
        opacity: 0.3,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        transform: [{ rotate: '3deg' }],
        zIndex: 0,
    },
    imageContainer: {
        width: 200,
        height: 260,
        backgroundColor: colors.earthClay,
        borderTopLeftRadius: 100,
        borderTopRightRadius: 100,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        overflow: 'hidden',
        transform: [{ rotate: '-2deg' }],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
        zIndex: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        opacity: 0.85,
    },
    imageOverlayDark: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.earthDark,
        opacity: 0.2, // Simulate mix-blend-multiply
        zIndex: 2,
    },
    imageOverlayColor: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.secondaryRust,
        opacity: 0.1, // Simulate mix-blend-overlay
        zIndex: 3,
    },
    formSection: {
        width: '100%',
        maxWidth: 340,
        gap: spacing.xl,
    },
    inputGroup: {
        width: '100%',
    },
    label: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.primaryGold,
        letterSpacing: 2, // tracking-[0.2em]
        textTransform: 'uppercase',
        marginBottom: spacing.sm,
        marginLeft: 4,
        opacity: 0.9,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryGold,
        paddingVertical: spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 24, // text-2xl/3xl
        color: colors.earthBeige,
        paddingVertical: spacing.xs,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif', // Simulate Noto Serif
    },
    inputText: {
        flex: 1,
        fontSize: 24,
        color: colors.earthBeige,
        paddingVertical: spacing.xs,
        fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    },
    inputIcon: {
        opacity: 0.5,
    },
    beginButton: {
        marginTop: spacing.md,
        width: '100%',
        borderRadius: 9999, // full
        backgroundColor: colors.secondaryRust, // secondary
        padding: 2, // p-0.5 roughly
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonInner: {
        backgroundColor: colors.secondaryRust,
        borderRadius: 9999,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56, // h-14
    },
    buttonDisabled: {
        opacity: 0.7,
        backgroundColor: '#7a3e26', // darker rust
    },
    buttonText: {
        color: colors.earthBeige,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 3, // tracking-widest
        marginRight: spacing.sm,
    },
});
