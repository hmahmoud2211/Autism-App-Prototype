import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AssistantScreen } from '@/screens/assistant/AssistantScreen';
import { ParentGuideScreen } from '@/screens/assistant/ParentGuideScreen';
import { ParentGuideDetailScreen } from '@/screens/assistant/ParentGuideDetailScreen';
import type { AssistantStackParamList } from './types';

const Stack = createNativeStackNavigator<AssistantStackParamList>();

export function AssistantStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AssistantHome" component={AssistantScreen} />
      <Stack.Screen name="ParentGuide" component={ParentGuideScreen} />
      <Stack.Screen name="ParentGuideDetail" component={ParentGuideDetailScreen} />
    </Stack.Navigator>
  );
}
