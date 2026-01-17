import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { Language, LANGUAGES } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/fonts';

interface LanguageModalProps {
    visible: boolean;
    onClose: () => void;
    selectedLanguage: Language;
    onSelectLanguage: (language: Language) => void;
}

export default function LanguageModal({
    visible,
    onClose,
    selectedLanguage,
    onSelectLanguage,
}: LanguageModalProps) {
    const { t } = useTranslation();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{t('onboarding.languageLabel')}</Text>
                    <ScrollView style={styles.languageList}>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.code}
                                style={styles.languageOption}
                                onPress={() => {
                                    onSelectLanguage(lang.code);
                                    onClose();
                                }}
                            >
                                <Text style={[
                                    styles.languageOptionText,
                                    selectedLanguage === lang.code && styles.selectedLanguageText
                                ]}>
                                    {lang.nativeName}
                                </Text>
                                {selectedLanguage === lang.code && (
                                    <MaterialIcons name="check" size={20} color={colors.primaryGold} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    modalContent: {
        width: '100%',
        maxWidth: 340,
        backgroundColor: colors.earthClay,
        borderRadius: 20,
        padding: spacing.xl,
        borderWidth: 1,
        borderColor: colors.primaryGold + '30',
    },
    modalTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primaryGold,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: spacing.lg,
        textAlign: 'center',
    },
    languageList: {
        maxHeight: 300,
    },
    languageOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryGold + '10',
    },
    languageOptionText: {
        fontSize: 18,
        color: colors.earthBeige,
        opacity: 0.7,
    },
    selectedLanguageText: {
        color: colors.primaryGold,
        opacity: 1,
        fontWeight: '500',
    },
});
