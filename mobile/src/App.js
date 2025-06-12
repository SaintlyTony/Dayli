import React from 'react';
import { SafeAreaView } from 'react-native';
import OnboardingScreen from './screens/OnboardingScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OnboardingScreen />
    </SafeAreaView>
  );
}
