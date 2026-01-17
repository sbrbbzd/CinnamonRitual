import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { scheduleReminders, cancelAllReminders } from '../services/notifications';
import { colors } from '../theme/colors';
import { fonts, spacing, borderRadius } from '../theme/fonts';

interface SetReminderModalProps {
    visible: boolean;
    onClose: () => void;
}

type ReminderOption = 'morning' | 'afternoon' | 'evening' | 'all';

export default function SetReminderModal({ visible, onClose }: SetReminderModalProps) {
    const { t } = useTranslation();
    const { reminderSettings, setReminderSettings } = useAppStore();
    const [selectedOption, setSelectedOption] = useState<ReminderOption | null>(null);

    const handleConfirm = async () => {
        if (!selectedOption) return;

        const newSettings = {
            morning: selectedOption === 'morning' || selectedOption === 'all',
            afternoon: selectedOption === 'afternoon' || selectedOption === 'all',
            evening: selectedOption === 'evening' || selectedOption === 'all',
            enabled: true,
        };

        await setReminderSettings(newSettings);
        await cancelAllReminders();
        await scheduleReminders(newSettings);

        onClose();
    };

    const options: { key: ReminderOption; label: string }[] = [
        { key: 'morning', label: t('reminder.morning') },
        { key: 'afternoon', label: t('reminder.afternoon') },
        { key: 'evening', label: t('reminder.evening') },
        { key: 'all', label: t('reminder.allOfThem') },
    ];

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{t('reminder.title')}</Text>

                    <View style={styles.divider} />

                    {options.map((option) => (
                        <TouchableOpacity
                            key={option.key}
                            style={[
                                styles.option,
                                selectedOption === option.key && styles.selectedOption,
                            ]}
                            onPress={() => setSelectedOption(option.key)}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    selectedOption === option.key && styles.selectedOptionText,
                                ]}
                            >
                                {option.label}
                            </Text>
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity
                        style={[styles.confirmButton, !selectedOption && styles.disabledButton]}
                        onPress={handleConfirm}
                        disabled={!selectedOption}
                    >
                        <Text style={styles.confirmText}>{t('reminder.confirm')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },
    modalContainer: {
        backgroundColor: colors.modalBackground,
        borderRadius: borderRadius.lg,
        padding: spacing.xl,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: fonts.sizes.lg,
        color: colors.modalText,
        textAlign: 'center',
        marginBottom: spacing.md,
        fontWeight: fonts.weights.semibold,
    },
    divider: {
        height: 2,
        backgroundColor: colors.accent,
        marginBottom: spacing.lg,
    },
    option: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borderRadius.md,
        borderWidth: 2,
        borderColor: colors.accent,
        marginBottom: spacing.md,
        backgroundColor: 'transparent',
    },
    selectedOption: {
        backgroundColor: colors.accent + '20',
    },
    optionText: {
        fontSize: fonts.sizes.md,
        color: colors.accent,
        textAlign: 'center',
    },
    selectedOptionText: {
        fontWeight: fonts.weights.semibold,
    },
    confirmButton: {
        backgroundColor: colors.accent,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.md,
        marginTop: spacing.md,
    },
    disabledButton: {
        opacity: 0.5,
    },
    confirmText: {
        fontSize: fonts.sizes.md,
        color: colors.modalBackground,
        textAlign: 'center',
        fontWeight: fonts.weights.semibold,
    },
});
