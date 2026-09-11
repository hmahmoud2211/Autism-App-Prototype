import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { HomeStackNavigator } from './HomeStackNavigator';
import { GameStackNavigator } from './GameStackNavigator';
import { ProgressScreen } from '@/screens/progress/ProgressScreen';
import { AssistantStackNavigator } from './AssistantStackNavigator';
import { ProfileStackNavigator } from './ProfileStackNavigator';
import { colors } from '@/constants/colors';
import { fontFamily } from '@/constants/typography';
import type { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const ICONS: Record<keyof MainTabParamList, keyof typeof Ionicons.glyphMap> = {
  HomeTab: 'home',
  GamesTab: 'game-controller',
  ProgressTab: 'bar-chart',
  AssistantTab: 'sparkles',
  ProfileTab: 'person',
};

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontFamily: fontFamily.bodyMedium, fontSize: 11 },
        tabBarStyle: { borderTopColor: colors.border, height: 60, paddingBottom: 8, paddingTop: 6 },
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={(focused ? ICONS[route.name] : `${ICONS[route.name]}-outline`) as keyof typeof Ionicons.glyphMap}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} options={{ title: 'Home' }} />
      <Tab.Screen name="GamesTab" component={GameStackNavigator} options={{ title: 'Games' }} />
      <Tab.Screen name="ProgressTab" component={ProgressScreen} options={{ title: 'Progress' }} />
      <Tab.Screen name="AssistantTab" component={AssistantStackNavigator} options={{ title: 'Assistant' }} />
      <Tab.Screen name="ProfileTab" component={ProfileStackNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
