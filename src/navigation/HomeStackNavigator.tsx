import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { DevelopmentProfileScreen } from '@/screens/insights/DevelopmentProfileScreen';
import { ResultsExplanationScreen } from '@/screens/insights/ResultsExplanationScreen';
import { PersonalizedPlanScreen } from '@/screens/insights/PersonalizedPlanScreen';
import { WeeklyPlanScreen } from '@/screens/insights/WeeklyPlanScreen';
import type { HomeStackParamList } from './types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DevelopmentProfile" component={DevelopmentProfileScreen} />
      <Stack.Screen name="ResultsExplanation" component={ResultsExplanationScreen} />
      <Stack.Screen name="PersonalizedPlan" component={PersonalizedPlanScreen} />
      <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen} />
    </Stack.Navigator>
  );
}
