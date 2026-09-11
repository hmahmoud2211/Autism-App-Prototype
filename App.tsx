import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts as useNunitoFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { useFonts as useInterFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';

import { RootNavigator } from '@/navigation/RootNavigator';
import { navigationRef } from '@/navigation/navigationRef';
import { colors } from '@/constants/colors';
import { useUserStore } from '@/stores/userStore';
import { useChildStore } from '@/stores/childStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import { useGameStore } from '@/stores/gameStore';
import { usePlanStore } from '@/stores/planStore';
import { useSettingsStore } from '@/stores/settingsStore';

SplashScreen.preventAutoHideAsync().catch(() => {});

const PERSISTED_STORES = [useUserStore, useChildStore, useAssessmentStore, useGameStore, usePlanStore, useSettingsStore];

function useStoresHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let remaining = PERSISTED_STORES.length;
    const unsubscribers = PERSISTED_STORES.map((store) => {
      if (store.persist.hasHydrated()) {
        remaining -= 1;
        return undefined;
      }
      return store.persist.onFinishHydration(() => {
        remaining -= 1;
        if (remaining <= 0) setHydrated(true);
      });
    });
    if (remaining <= 0) setHydrated(true);
    return () => unsubscribers.forEach((unsub) => unsub?.());
  }, []);

  return hydrated;
}

export default function App() {
  const [nunitoLoaded] = useNunitoFonts({ Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold });
  const [interLoaded] = useInterFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold });
  const hydrated = useStoresHydrated();
  const ready = nunitoLoaded && interLoaded && hydrated;

  const onLayoutRootView = useCallback(async () => {
    if (ready) await SplashScreen.hideAsync().catch(() => {});
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <StatusBar style="dark" />
          <NavigationContainer ref={navigationRef}>
            <RootNavigator />
          </NavigationContainer>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
