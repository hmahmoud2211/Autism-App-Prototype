import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackNavigator } from './OnboardingStackNavigator';
import { QuestionnaireStackNavigator } from './QuestionnaireStackNavigator';
import { MainTabNavigator } from './MainTabNavigator';
import { FinalReportScreen } from '@/screens/report/FinalReportScreen';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useSettingsStore } from '@/stores/settingsStore';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * All four top-level destinations are always registered — only the initial
 * route differs per launch — so plain navigate() calls work everywhere
 * without racing a conditional re-render of the navigator tree.
 */
export function RootNavigator() {
  const initialRouteName = useMemo<keyof RootStackParamList>(() => {
    const { children, activeChildId } = useChildStore.getState();
    const onboardingCompleted = useSettingsStore.getState().onboardingCompleted;
    if (!onboardingCompleted || children.length === 0) return 'Onboarding';
    const hasProfile = activeChildId ? !!useAssessmentStore.getState().latestProfile(activeChildId) : false;
    return hasProfile ? 'Main' : 'Questionnaire';
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingStackNavigator} />
      <Stack.Screen name="Questionnaire" component={QuestionnaireStackNavigator} options={{ gestureEnabled: false }} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen name="FinalReport" component={FinalReportScreen} />
    </Stack.Navigator>
  );
}
