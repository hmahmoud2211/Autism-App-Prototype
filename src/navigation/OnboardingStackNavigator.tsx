import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '@/screens/onboarding/WelcomeScreen';
import { CreateAccountScreen } from '@/screens/onboarding/CreateAccountScreen';
import { AddChildScreen } from '@/screens/onboarding/AddChildScreen';
import { AgeGroupScreen } from '@/screens/onboarding/AgeGroupScreen';
import type { OnboardingStackParamList } from './types';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

export function OnboardingStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="AddChild" component={AddChildScreen} />
      <Stack.Screen name="AgeGroup" component={AgeGroupScreen} />
    </Stack.Navigator>
  );
}
