import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { GAME_LIBRARY_CATEGORIES, getGamesByCategory } from '@/data/games';
import { AGE_GROUPS } from '@/data/ageGroups';
import { useChildStore } from '@/stores/childStore';
import type { GameStackParamList } from '@/navigation/types';
import type { AgeGroupId } from '@/types/child';

type Props = NativeStackScreenProps<GameStackParamList, 'GameLibrary'>;

const CATEGORY_COLORS: Record<string, string> = {
  communication: colors.green,
  social_interaction: '#FF7A93',
  joint_attention: colors.orange,
  response_to_name: colors.primary,
  emotions: colors.teal,
  cognitive_skills: colors.purple,
  sensory_skills: '#D162C9',
  motor_skills: colors.red,
  daily_living: '#FF6B81',
};

const CATEGORY_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  communication: 'megaphone-outline',
  social_interaction: 'people-outline',
  joint_attention: 'eye-outline',
  response_to_name: 'chatbubble-ellipses-outline',
  emotions: 'happy-outline',
  cognitive_skills: 'bulb-outline',
  sensory_skills: 'ear-outline',
  motor_skills: 'body-outline',
  daily_living: 'home-outline',
};

export function GameLibraryScreen({ navigation }: Props) {
  const child = useChildStore((s) => s.activeChild());
  const [ageFilter, setAgeFilter] = useState<AgeGroupId | 'all'>(child?.ageGroup ?? 'all');

  return (
    <ScreenContainer scroll>
      <AppText variant="h1" style={styles.title}>
        Game Library
      </AppText>
      <AppText variant="bodySmall" color={colors.textSecondary} style={styles.subtitle}>
        Play, learn, and grow together
      </AppText>

      <View style={styles.filterRow}>
        {(['all', ...AGE_GROUPS.map((g) => g.id)] as const).map((id) => (
          <Pressable
            key={id}
            onPress={() => setAgeFilter(id)}
            style={[styles.filterChip, ageFilter === id && styles.filterChipActive]}
            accessibilityRole="button"
            accessibilityLabel={id === 'all' ? 'All ages' : id}
          >
            <AppText variant="bodySmall" color={ageFilter === id ? colors.textInverse : colors.text}>
              {id === 'all' ? 'All Ages' : id}
            </AppText>
          </Pressable>
        ))}
      </View>

      {GAME_LIBRARY_CATEGORIES.map((category) => {
        const count = getGamesByCategory(category.id, ageFilter === 'all' ? undefined : ageFilter).length;
        if (count === 0) return null;
        return (
          <Card
            key={category.id}
            onPress={() => navigation.navigate('GameCategory', { categoryId: category.id })}
            style={styles.categoryCard}
            accessibilityLabel={`${category.label}, ${count} games`}
          >
            <View style={styles.categoryRow}>
              <View style={[styles.iconWrap, { backgroundColor: `${CATEGORY_COLORS[category.id]}1A` }]}>
                <Ionicons name={CATEGORY_ICONS[category.id]} size={22} color={CATEGORY_COLORS[category.id]} />
              </View>
              <View style={styles.categoryInfo}>
                <AppText variant="bodyMedium">{category.label}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {count} game{count === 1 ? '' : 's'}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </View>
          </Card>
        );
      })}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: spacing.xs },
  subtitle: { marginBottom: spacing.lg },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryCard: { marginBottom: spacing.md },
  categoryRow: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  categoryInfo: { flex: 1 },
});
