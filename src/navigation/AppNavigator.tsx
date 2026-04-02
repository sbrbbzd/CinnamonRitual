import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../store/useAppStore';
import OnboardingScreen from '../screens/OnboardingScreen';
import MainScreen from '../screens/MainScreen';
import CheckInScreen from '../screens/CheckInScreen';

import CompletionScreen from '../screens/CompletionScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { StoryTemplate } from '../components/StoryTemplate';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';

export type RootStackParamList = {
    Onboarding: undefined;
    Main: undefined;
    CheckIn: undefined;
    Completion: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Wrapper components to pass navigation
function OnboardingWrapper({ navigation }: NativeStackScreenProps<RootStackParamList, 'Onboarding'>) {
    return <OnboardingScreen onComplete={() => navigation.replace('Main')} />;
}

function MainWrapper({ navigation }: NativeStackScreenProps<RootStackParamList, 'Main'>) {
    return <MainScreen onCheckIn={() => navigation.navigate('CheckIn')} />;
}

function CheckInWrapper({ navigation }: NativeStackScreenProps<RootStackParamList, 'CheckIn'>) {
    return (
        <CheckInScreen
            onComplete={() => navigation.navigate('Completion')}
            onBack={() => navigation.goBack()}
        />
    );
}

function CompletionWrapper({ navigation }: NativeStackScreenProps<RootStackParamList, 'Completion'>) {
    const { t } = useTranslation();
    const { ritualData } = useAppStore();
    const storyRef = useRef<View>(null);

    // Get daily intention
    const intentions = t('checkIn.intentions', { returnObjects: true }) as string[];
    const intentionIndex = ritualData.currentIntentionIndex || 0;
    const currentIntention = (intentions && intentions[intentionIndex])
        ? intentions[intentionIndex]
        : t('checkIn.intention');

    const handleShare = async () => {
        try {
            // Give time for the view to render
            await new Promise(resolve => setTimeout(resolve, 100));

            if (storyRef.current) {
                const uri = await captureRef(storyRef, {
                    format: 'png',
                    quality: 1,
                    result: 'tmpfile',
                });

                const isAvailable = await Sharing.isAvailableAsync();
                if (isAvailable) {
                    await Sharing.shareAsync(uri, {
                        mimeType: 'image/png',
                        dialogTitle: t('checkIn.title'),
                    });
                } else {
                    console.log('Sharing is not available on this device');
                }
            } else {
                console.log('Story ref not available');
            }
        } catch (error) {
            console.error('Error sharing story:', error);
        }
    };

    return (
        <>
            <CompletionScreen
                onShare={handleShare}
                onBackHome={() => navigation.navigate('Main')}
            />
            {/* Hidden story template for capture */}
            <View style={{ position: 'absolute', left: -1000, top: 0 }} collapsable={false}>
                <StoryTemplate ref={storyRef} intention={currentIntention} />
            </View>
        </>
    );
}

export default function AppNavigator() {
    const { userProfile, loadData, isLoading } = useAppStore();
    const initialRoute = userProfile?.onboardingComplete ? 'Main' : 'Onboarding';

    useEffect(() => {
        const init = async () => {
            await loadData();
        };
        init();
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                id="RootStack"
                initialRouteName={initialRoute}
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                }}
            >
                <Stack.Screen name="Onboarding" component={OnboardingWrapper} />
                <Stack.Screen name="Main" component={MainWrapper} />
                <Stack.Screen name="CheckIn" component={CheckInWrapper} />
                <Stack.Screen name="Completion" component={CompletionWrapper} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
