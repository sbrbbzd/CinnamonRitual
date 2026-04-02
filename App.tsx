import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import * as Clarity from '@microsoft/react-native-clarity';
import './src/i18n'; // Initialize i18n
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    Clarity.initialize('v3itw6fb3r', {
      logLevel: Clarity.LogLevel.None,
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  );
}
