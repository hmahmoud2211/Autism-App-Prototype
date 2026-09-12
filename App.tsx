import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
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

  const isWeb = Platform.OS === 'web';

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        {/*
          NUMU is designed as a phone experience. On web (e.g. a desktop
          browser tab), letting it stretch full-bleed produces the stretched
          cards / oddly-centered content you'd see on an ultra-wide viewport,
          so it's constrained to a phone-width column there; native platforms
          are unaffected (isWeb is false) and just fill the screen normally.
        */}
        <View style={isWeb ? styles.webBackdrop : styles.flexFill}>
          <View style={[styles.flexFill, isWeb && styles.phoneFrame]}>
            <StatusBar style="dark" />
            <NavigationContainer ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </View>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexFill: { flex: 1, backgroundColor: colors.background },
  webBackdrop: { flex: 1, backgroundColor: '#DCE6EE', alignItems: 'center' },
  phoneFrame: {
    width: '100%',
    maxWidth: 480,
    // Web-only CSS passthrough (react-native-web); ignored on native, where phoneFrame isn't applied anyway.
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0 0 0 1px rgba(23,50,77,0.06), 0 24px 60px rgba(23,50,77,0.18)' } as object)
      : null),
  },
});
