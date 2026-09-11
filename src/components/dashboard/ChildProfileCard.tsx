import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { ageGroupMeta } from '@/data/ageGroups';
import { ageFromDob } from '@/utils/date';
import type { Child } from '@/types/child';

interface ChildProfileCardProps {
  child: Child;
  selected?: boolean;
  onPress?: () => void;
}

export function ChildProfileCard({ child, selected, onPress }: ChildProfileCardProps) {
  const meta = ageGroupMeta(child.ageGroup);
  return (
    <Card onPress={onPress} style={[styles.card, selected && styles.selected]} accessibilityLabel={`${child.name}, ${meta.label}`}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Ionicons name="happy-outline" size={28} color={colors.primary} />
        </View>
        <View style={styles.info}>
          <AppText variant="h3">{child.name}</AppText>
          <AppText variant="bodySmall" color={colors.textSecondary}>
            Age: {ageFromDob(child.dob)} years
          </AppText>
          <AppText variant="caption" color={colors.textSecondary} style={styles.ageGroup}>
            {meta.label} · {meta.name}
          </AppText>
        </View>
        {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  selected: { borderWidth: 2, borderColor: colors.primary },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1 },
  ageGroup: { marginTop: 2 },
});
