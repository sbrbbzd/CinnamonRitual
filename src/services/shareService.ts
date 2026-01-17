import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import { useTranslation } from 'react-i18next';

/**
 * Generate and share Instagram story with user's intention
 */
export const generateAndShareStory = async (
    viewRef: any,
    intention: string
): Promise<void> => {
    try {
        // Capture the view as an image
        const uri = await captureRef(viewRef, {
            format: 'png',
            quality: 1,
        });

        // Check if sharing is available
        const isAvailable = await Sharing.isAvailableAsync();

        if (isAvailable) {
            await Sharing.shareAsync(uri, {
                mimeType: 'image/png',
                dialogTitle: 'Share your Cinnamon Ritual',
            });
        } else {
            console.log('Sharing is not available on this device');
        }
    } catch (error) {
        console.error('Error sharing story:', error);
    }
};
