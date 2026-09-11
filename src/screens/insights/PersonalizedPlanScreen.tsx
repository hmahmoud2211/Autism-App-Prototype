import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { EmptyState } from '@/components/common/EmptyState';
import { CATEGORY_THEME } from '@/constants/categories';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useChildStore } from '@/stores/childStore';
import { usePlanStore } from '@/stores/planStore';

interface Props {
  navigation: NativeStackScreenProps<any>['navigation'];
}

export function PersonalizedPlanScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const plan = usePlanStore((s) => (child ? s.personalizedPlanByChild[child.id] : undefined));

  if (!child || !plan) {
    return (
      <ScreenContainer>
        <AppHeader title="Personalized Plan" onBack={() => navigation.goBack()} />
        <EmptyState icon="clipboard-outline" title="No plan yet" message="Complete a check-in to generate a personalized plan." />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll>
      <AppHeader title={`${child.name}'s Plan`} onBack={() => navigation.goBack()} />
      <AppText variant="bodySmall" color={colors.textSecondary} style={styles.intro}>
        Focus areas based on {child.name}'s recent check-in
      </AppText>

      {plan.focusAreas.map((focus) => {
        const theme = CATEGORY_THEME[focus.area];
        return (
          <Card key={focus.area} style={styles.card}>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
                <Ionicons name={theme.icon as any} size={24} color={theme.color} />
              </View>
              <View style={styles.info}>
                <AppText variant="h3">{theme.label}</AppText>
                <AppText variant="bodySmall" color={colors.textSecondary}>
                  {focus.goal}
                </AppText>
              </View>
            </View>
            <View style={styles.metaRow}>
              <AppText variant="caption" color={colors.textSecondary}>
                {focus.activityCount} activities
              </AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                {focus.estimatedDuration}
              </AppText>
            </View>
          </Card>
        );
      })}

      <PrimaryButton label="View Activities" onPress={() => navigation.navigate('WeeklyPlan')} style={styles.cta} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: spacing.lg },
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between' },
  cta: { marginTop: spacing.lg, marginBottom: spacing.lg },
});
