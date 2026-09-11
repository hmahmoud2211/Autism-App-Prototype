import React, { useState } from 'react';
import { StyleSheet, View, Switch, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { SectionHeader } from '@/components/common/SectionHeader';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { useSettingsStore } from '@/stores/settingsStore';
import { resetAllAppData } from '@/services/resetApp';
import { resetToOnboarding } from '@/navigation/navigationRef';
import type { ProfileStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Settings'>;

const LANGUAGES = ['English', 'Arabic', 'Spanish', 'French'];

export function SettingsScreen({ navigation }: Props) {
  const soundEnabled = useSettingsStore((s) => s.soundEnabled);
  const reducedMotion = useSettingsStore((s) => s.reducedMotion);
  const language = useSettingsStore((s) => s.language);
  const toggleSound = useSettingsStore((s) => s.toggleSound);
  const toggleReducedMotion = useSettingsStore((s) => s.toggleReducedMotion);
  const setLanguage = useSettingsStore((s) => s.setLanguage);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <ScreenContainer scroll>
      <AppHeader title="Settings" onBack={() => navigation.goBack()} />

      <SectionHeader title="Language" />
      <View style={styles.languageRow}>
        {LANGUAGES.map((lang) => (
          <Pressable
            key={lang}
            onPress={() => setLanguage(lang)}
            style={[styles.langChip, language === lang && styles.langChipActive]}
            accessibilityRole="button"
            accessibilityLabel={lang}
          >
            <AppText variant="bodySmall" color={language === lang ? colors.textInverse : colors.text}>
              {lang}
            </AppText>
          </Pressable>
        ))}
      </View>

      <SectionHeader title="Accessibility" />
      <Card style={styles.toggleCard}>
        <View style={styles.toggleRow}>
          <AppText variant="bodyMedium">Sound Effects</AppText>
          <Switch value={soundEnabled} onValueChange={toggleSound} accessibilityLabel="Toggle sound effects" />
        </View>
        <View style={styles.toggleRow}>
          <AppText variant="bodyMedium">Reduce Motion</AppText>
          <Switch value={reducedMotion} onValueChange={toggleReducedMotion} accessibilityLabel="Toggle reduced motion" />
        </View>
      </Card>

      <SectionHeader title="Data" />
      <Card onPress={() => setConfirmReset(true)} style={styles.dangerCard} accessibilityLabel="Reset demo data">
        <AppText variant="bodyMedium" color={colors.red}>
          Reset Demo Data
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          Clears all local data and returns to the welcome screen.
        </AppText>
      </Card>

      <ConfirmationDialog
        visible={confirmReset}
        title="Reset all data?"
        message="This clears every child profile, assessment, and game result stored on this device."
        confirmLabel="Reset"
        destructive
        onConfirm={async () => {
          setConfirmReset(false);
          await resetAllAppData();
          resetToOnboarding();
        }}
        onCancel={() => setConfirmReset(false)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  languageRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  langChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  langChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  toggleCard: { marginBottom: spacing.lg },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
  dangerCard: { borderWidth: 1, borderColor: `${colors.red}40` },
});
