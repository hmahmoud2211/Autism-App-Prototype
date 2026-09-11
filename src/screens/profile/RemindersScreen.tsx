import React from 'react';
import { StyleSheet, View, Switch } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { SectionHeader } from '@/components/common/SectionHeader';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { useSettingsStore } from '@/stores/settingsStore';
import type { ProfileStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Reminders'>;

const MOCK_REMINDERS = [
  { icon: 'today-outline' as const, title: "Today's Activity", detail: '5:00 PM' },
  { icon: 'calendar-outline' as const, title: 'Weekly Check-in', detail: 'Sunday' },
  { icon: 'sparkles-outline' as const, title: 'New Activity Available', detail: 'Just added' },
  { icon: 'clipboard-outline' as const, title: 'Follow-up Assessment', detail: 'In 2 weeks' },
];

export function RemindersScreen({ navigation }: Props) {
  const reminders = useSettingsStore((s) => s.reminders);
  const toggleReminder = useSettingsStore((s) => s.toggleReminder);

  return (
    <ScreenContainer scroll>
      <AppHeader title="Reminders" onBack={() => navigation.goBack()} />

      <SectionHeader title="Upcoming" />
      {MOCK_REMINDERS.map((r) => (
        <Card key={r.title} style={styles.reminderCard}>
          <View style={styles.row}>
            <Ionicons name={r.icon} size={20} color={colors.primary} style={styles.icon} />
            <View style={styles.info}>
              <AppText variant="bodyMedium">{r.title}</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                {r.detail}
              </AppText>
            </View>
          </View>
        </Card>
      ))}

      <SectionHeader title="Reminder Settings" />
      <Card style={styles.settingsCard}>
        <View style={styles.toggleRow}>
          <AppText variant="bodyMedium">Daily reminder</AppText>
          <Switch value={reminders.dailyReminder} onValueChange={() => toggleReminder('dailyReminder')} />
        </View>
        <View style={styles.toggleRow}>
          <AppText variant="bodyMedium">Weekly summary</AppText>
          <Switch value={reminders.weeklySummary} onValueChange={() => toggleReminder('weeklySummary')} />
        </View>
        <View style={styles.toggleRow}>
          <AppText variant="bodyMedium">Activity reminder</AppText>
          <Switch value={reminders.activityReminder} onValueChange={() => toggleReminder('activityReminder')} />
        </View>
      </Card>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  reminderCard: { marginBottom: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: spacing.md },
  info: { flex: 1 },
  settingsCard: { marginBottom: spacing.lg },
  toggleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm },
});
