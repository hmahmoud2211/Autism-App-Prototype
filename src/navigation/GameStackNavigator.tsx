import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GameLibraryScreen } from '@/screens/games/GameLibraryScreen';
import { GameCategoryScreen } from '@/screens/games/GameCategoryScreen';
import { GameDetailsScreen } from '@/screens/games/GameDetailsScreen';
import { GamePlayScreen } from '@/screens/games/GamePlayScreen';
import { GameResultScreen } from '@/screens/games/GameResultScreen';
import type { GameStackParamList } from './types';

const Stack = createNativeStackNavigator<GameStackParamList>();

export function GameStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GameLibrary" component={GameLibraryScreen} />
      <Stack.Screen name="GameCategory" component={GameCategoryScreen} />
      <Stack.Screen name="GameDetails" component={GameDetailsScreen} />
      <Stack.Screen
        name="GamePlay"
        component={GamePlayScreen as any}
        options={{ presentation: 'fullScreenModal', gestureEnabled: false }}
      />
      <Stack.Screen name="GameResult" component={GameResultScreen as any} />
    </Stack.Navigator>
  );
}
