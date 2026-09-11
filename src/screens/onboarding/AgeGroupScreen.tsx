import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { AgeGroupCard } from '@/components/dashboard/AgeGroupCard';
import { spacing } from '@/constants/spacing';
import { AGE_GROUPS } from '@/data/ageGroups';
import { colors } from '@/constants/colors';
import type { OnboardingStackParamList } from '@/navigation/types';
import { useChildStore } from '@/stores/childStore';
import { useSettingsStore } from '@/stores/settingsStore';
import type { AgeGroupId } from '@/types/child';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'AgeGroup'>;

export function AgeGroupScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const updateChild = useChildStore((s) => s.updateChild);
  const setOnboardingCompleted = useSettingsStore((s) => s.setOnboardingCompleted);
  const [selected, setSelected] = useState<AgeGroupId>(child?.ageGroup ?? '3-8');

  function handleNext() {
    if (child) updateChild(child.id, { ageGroup: selected });
    setOnboardingCompleted(true);
    navigation.getParent()?.navigate('Questionnaire' as never);
  }

  return (
    <ScreenContainer scroll>
      <AppHeader
        title="Select Age Group"
        subtitle={child ? `For ${child.name}` : undefined}
        onBack={() => navigation.goBack()}
      />
      <AppText variant="bodySmall" color={colors.textSecondary} style={styles.intro}>
        We've suggested a group based on date of birth — feel free to adjust it.
      </AppText>
      {AGE_GROUPS.map((group) => (
        <AgeGroupCard
          key={group.id}
          ageGroup={group}
          selected={selected === group.id}
          suggested={child?.ageGroup === group.id}
          onPress={() => setSelected(group.id)}
        />
      ))}
      <PrimaryButton label="Next" onPress={handleNext} style={styles.submit} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  submit: { marginTop: spacing.md },
});
