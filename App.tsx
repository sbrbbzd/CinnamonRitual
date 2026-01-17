import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import './src/i18n'; // Initialize i18n
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <AppNavigator />
    </>
  );
}
