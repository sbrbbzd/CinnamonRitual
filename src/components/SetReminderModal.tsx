import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Switch,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import { scheduleReminders, cancelAllReminders } from '../services/notifications';
import { colors } from '../theme/colors';
import { spacing } from '../theme/fonts';

interface SetReminderModalProps {
    visible: boolean;
    onClose: () => void;
}

export default function SetReminderModal({ visible, onClose }: SetReminderModalProps) {
    const { t } = useTranslation();
    const { reminderSettings, setReminderSettings } = useAppStore();

    // Local state to hold changes before saving
    const [localSettings, setLocalSettings] = useState({
        morning: false,
        afternoon: false,
        evening: false,
    });

    // Initialize local settings when modal opens
    useEffect(() => {
        if (visible) {
            setLocalSettings({
                morning: reminderSettings.morning,
                afternoon: reminderSettings.afternoon,
                evening: reminderSettings.evening,
            });
        }
    }, [visible, reminderSettings]);

    const toggleReminder = (key: 'morning' | 'afternoon' | 'evening') => {
        setLocalSettings(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const handleSave = async () => {
        const newSettings = {
            ...reminderSettings,
            ...localSettings,
            enabled: true, // Always enabled if saving from this modal
        };

        await setReminderSettings(newSettings);
        await cancelAllReminders();
        await scheduleReminders(newSettings);
        onClose();
    };

    const hasSelection = localSettings.morning || localSettings.afternoon || localSettings.evening;

    const options = [
        { key: 'morning', label: t('reminder.morning') },
        { key: 'afternoon', label: t('reminder.afternoon') },
        { key: 'evening', label: t('reminder.evening') },
    ] as const;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => { }}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
            >
                {/* Stop propagation when clicking inside modal */}
                <View
                    style={styles.modalContent}
                    onStartShouldSetResponder={() => true}
                >
                    <Text style={styles.modalTitle}>{t('reminder.title')}</Text>
                    <View style={styles.optionsContainer}>
                        {options.map((option) => (
                            <View
                                key={option.key}
                                style={styles.optionRow}
                            >
                                <Text style={styles.optionText}>
                                    {option.label}
                                </Text>
                                <Switch
                                    value={localSettings[option.key]}
                                    onValueChange={() => toggleReminder(option.key)}
                                    trackColor={{ false: colors.earthBeige + '40', true: colors.primaryGold }}
                                    thumbColor={colors.earthBeige}
                                    ios_backgroundColor={colors.earthBeige + '40'}
                                />
                            </View>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            !hasSelection && styles.saveButtonDisabled
                        ]}
                        onPress={handleSave}
                        disabled={!hasSelection}
                    >
                        <Text style={[
                            styles.saveButtonText,
                            !hasSelection && styles.saveButtonTextDisabled
                        ]}>
                            {t('common.save') || 'SAVE'}
                        </Text>
                    </TouchableOpacity>
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
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primaryGold,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: spacing.lg,
        textAlign: 'center',
        width: '100%',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.primaryGold + '10',
    },
    optionText: {
        fontSize: 18,
        color: colors.earthBeige,
        opacity: 0.9,
    },
    saveButton: {
        width: '100%',
        backgroundColor: colors.secondaryRust,
        paddingVertical: spacing.md, // ~16px
        borderRadius: 9999, // Full pill shape
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    saveButtonDisabled: {
        backgroundColor: colors.earthBeige + '20',
        shadowOpacity: 0,
        elevation: 0,
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.earthBeige,
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    saveButtonTextDisabled: {
        color: colors.earthBeige + '40',
    },
});
