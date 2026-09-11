import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppHeader } from '@/components/common/AppHeader';
import { AppText } from '@/components/common/AppText';
import { Card } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { CATEGORY_THEME } from '@/constants/categories';
import { getSectionById } from '@/data/questionnaire';
import { recommendedGameForSection } from '@/services/recommendationEngine';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import { useChildStore } from '@/stores/childStore';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'RecommendedGame'>;

export function RecommendedGameScreen({ navigation, route }: Props) {
  const { sectionId } = route.params;
  const section = getSectionById(sectionId)!;
  const theme = CATEGORY_THEME[sectionId];
  const child = useChildStore((s) => s.activeChild());
  const game = child ? recommendedGameForSection(sectionId, child.ageGroup) : undefined;

  return (
    <ScreenContainer scroll>
      <AppHeader title="Recommended Activity" onBack={() => navigation.goBack()} />
      <Badge label="PARENT MODE" color={colors.navy} background={`${colors.navy}14`} icon="person-outline" />

      <Card style={styles.card}>
        <View style={[styles.iconWrap, { backgroundColor: theme.pastel }]}>
          <Ionicons name={(game?.icon ?? theme.icon) as any} size={30} color={theme.color} />
        </View>
        <AppText variant="h1">{game?.title ?? 'Activity'}</AppText>
        <AppText variant="bodyMedium" color={colors.textSecondary} style={styles.tagline}>
          {game?.tagline}
        </AppText>
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.sectionHeading}>
          What this measures
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          This activity is designed to gently observe {section.title.toLowerCase()} through play — {section.description}
        </AppText>
      </Card>

      <Card style={styles.card}>
        <AppText variant="h3" style={styles.sectionHeading}>
          Before you begin
        </AppText>
        <AppText variant="body" color={colors.textSecondary}>
          Hand the device to your child when ready, or play together. NUMU will record simple interaction details like
          correct responses and response time — nothing is shared outside this device.
        </AppText>
      </Card>

      <PrimaryButton
        label="Continue"
        onPress={() => game && navigation.navigate('GameInstructions', { sectionId, gameId: game.id })}
        disabled={!game}
        style={styles.cta}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: spacing.lg },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  tagline: { marginTop: spacing.xs },
  sectionHeading: { marginBottom: spacing.sm },
  cta: { marginTop: spacing.xl, marginBottom: spacing.lg },
});
