import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGuideById } from '@/data/parentGuides';
import type { AssistantStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AssistantStackParamList, 'ParentGuideDetail'>;

export function ParentGuideDetailScreen({ navigation, route }: Props) {
  const guide = getGuideById(route.params.guideId);
  if (!guide) return null;

  return (
    <ScreenContainer scroll>
      <AppHeader title={guide.title} onBack={() => navigation.goBack()} />
      <Card style={styles.summaryCard}>
        <Ionicons name={guide.icon as any} size={28} color={colors.primary} style={styles.summaryIcon} />
        <AppText variant="body" color={colors.textSecondary}>
          {guide.summary}
        </AppText>
      </Card>

      <AppText variant="h3" style={styles.heading}>
        Actionable Tips
      </AppText>
      {guide.tips.map((tip, i) => (
        <View key={i} style={styles.tipRow}>
          <View style={styles.tipNumber}>
            <AppText variant="bodySmall" color={colors.primary}>
              {i + 1}
            </AppText>
          </View>
          <AppText variant="body" style={styles.tipText}>
            {tip}
          </AppText>
        </View>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  summaryCard: { marginBottom: spacing.lg },
  summaryIcon: { marginBottom: spacing.sm },
  heading: { marginBottom: spacing.sm },
  tipRow: { flexDirection: 'row', marginBottom: spacing.md },
  tipNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  tipText: { flex: 1 },
});
