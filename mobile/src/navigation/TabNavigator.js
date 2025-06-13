import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/MenuScreen';
import ProgressScreen from '../screens/ProgressScreen';
import OrderScreen from '../screens/OrderScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Рацион" component={MenuScreen} />
      <Tab.Screen name="Прогресс" component={ProgressScreen} />
      <Tab.Screen name="Доставка" component={OrderScreen} />
      <Tab.Screen name="Профиль" component={OnboardingScreen} />
    </Tab.Navigator>
  );
}
