import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import type { OnboardingStackParamList } from '@/navigation/types';
import { seedDemoData } from '@/services/demoSeed';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <ScreenContainer edges={['top', 'bottom']}>
      <LinearGradient colors={[colors.primary, colors.teal]} style={styles.hero}>
        <View style={styles.logoWrap}>
          <Image source={require('../../../assets/icon.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
        <AppText variant="display" color={colors.textInverse} center>
          NUMU
        </AppText>
        <AppText variant="bodyMedium" color={colors.textInverse} center style={styles.subtitle}>
          Neurodevelopment Understanding & Monitoring Unit
        </AppText>
        <AppText variant="body" color={colors.textInverse} center style={styles.tagline}>
          Play · Learn · Grow
        </AppText>
      </LinearGradient>

      <View style={styles.bottom}>
        <AppText variant="bodySmall" color={colors.textSecondary} center style={styles.blurb}>
          Nurturing every child's potential — one playful check-in at a time.
        </AppText>
        <PrimaryButton label="Get Started" onPress={() => navigation.navigate('CreateAccount')} />
        <SecondaryButton
          label="Try Demo (Sarah & Adam)"
          onPress={() => {
            seedDemoData();
            navigation.getParent()?.navigate('Main' as never);
          }}
          style={styles.demoButton}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    marginBottom: spacing.lg,
  },
  logoWrap: {
    width: 108,
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  logoImage: { width: 108, height: 108 },
  subtitle: { marginTop: spacing.sm, opacity: 0.9, paddingHorizontal: spacing.lg },
  tagline: { marginTop: spacing.xl, opacity: 0.95 },
  bottom: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
  blurb: { marginBottom: spacing.lg },
  demoButton: { marginTop: spacing.md },
});
