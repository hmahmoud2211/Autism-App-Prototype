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
import { PARENT_GUIDES } from '@/data/parentGuides';
import type { AssistantStackParamList } from '@/navigation/types';

type Props = NativeStackScreenProps<AssistantStackParamList, 'ParentGuide'>;

export function ParentGuideScreen({ navigation }: Props) {
  return (
    <ScreenContainer scroll>
      <AppHeader title="Parent Guide" onBack={() => navigation.goBack()} />
      {PARENT_GUIDES.map((guide) => (
        <Card
          key={guide.id}
          onPress={() => navigation.navigate('ParentGuideDetail', { guideId: guide.id })}
          style={styles.card}
          accessibilityLabel={guide.title}
        >
          <View style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name={guide.icon as any} size={22} color={colors.primary} />
            </View>
            <View style={styles.info}>
              <AppText variant="bodyMedium">{guide.title}</AppText>
              <AppText variant="caption" color={colors.textSecondary} numberOfLines={2}>
                {guide.summary}
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
          </View>
        </Card>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  info: { flex: 1, marginRight: spacing.sm },
});
