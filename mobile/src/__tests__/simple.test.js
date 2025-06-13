import React from 'react';
import { render } from '@testing-library/react-native';
import OnboardingScreen from '../screens/OnboardingScreen';

test('renders onboarding title', () => {
  const { getByText } = render(<OnboardingScreen />);
  expect(getByText('Анкета')).toBeTruthy();
});
