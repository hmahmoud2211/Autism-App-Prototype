import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { GameResultCard, GameResultRow } from '@/components/games/GameResultCard';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGameById } from '@/data/games';
import { useGameStore } from '@/stores/gameStore';
import { useChildStore } from '@/stores/childStore';
import { nextSectionAfter } from '@/services/questionnaireFlow';
import { useAssessmentStore } from '@/stores/assessmentStore';
import type { DevelopmentAreaId } from '@/types/child';

type ParamList = {
  GameResult: { gameId: string; level: 1 | 2 | 3; resultId: string; sectionId?: DevelopmentAreaId };
};

interface Props {
  navigation: NativeStackNavigationProp<ParamList, 'GameResult'>;
  route: RouteProp<ParamList, 'GameResult'>;
}

export function GameResultScreen({ navigation, route }: Props) {
  const { gameId, level, resultId, sectionId } = route.params;
  const game = getGameById(gameId)!;
  const result = useGameStore((s) => s.results.find((r) => r.id === resultId));
  const child = useChildStore((s) => s.activeChild());
  const getUnlockedLevel = useGameStore((s) => s.getUnlockedLevel);
  const unlockedLevel = child ? getUnlockedLevel(child.id, gameId) : 1;

  const setCursor = useAssessmentStore((s) => s.setCursor);
  const completeSession = useAssessmentStore((s) => s.completeSession);

  if (!result) {
    return (
      <ScreenContainer>
        <AppText variant="body" center style={styles.pad}>
          Result not found.
        </AppText>
      </ScreenContainer>
    );
  }

  const canGoNextLevel = result.success && level < 3 && unlockedLevel > level;

  function handleContinueQuestionnaire() {
    if (!child || !sectionId) return;
    const next = nextSectionAfter(sectionId);
    if (next) {
      setCursor(child.id, next.sectionIndex, 0);
      (navigation as any).navigate('QuestionnaireQuestion');
    } else {
      completeSession(child.id);
      (navigation as any).navigate('AssessmentComplete');
    }
  }

  return (
    <ScreenContainer scroll contentStyle={styles.center}>
      <View style={styles.iconWrap}>
        <Ionicons name={result.success ? 'ribbon' : 'sparkles-outline'} size={40} color={colors.primary} />
      </View>
      <AppText variant="h1" center>
        {result.success ? 'Great Job!' : 'Nice Try!'}
      </AppText>
      <AppText variant="bodyMedium" color={colors.textSecondary} center style={styles.subtitle}>
        Level {level} {result.success ? 'Complete' : 'Results'} — {game.title}
      </AppText>

      <GameResultRow>
        {result.correctAnswers != null && result.totalQuestions != null ? (
          <GameResultCard label="Correct Responses" value={`${result.correctAnswers}/${result.totalQuestions}`} />
        ) : null}
        {result.responseTime != null ? (
          <GameResultCard label="Avg. Response Time" value={`${result.responseTime}s`} />
        ) : null}
      </GameResultRow>
      <View style={styles.rowSpacer} />
      <GameResultRow>
        {result.attempts != null ? <GameResultCard label="Attempts" value={`${result.attempts}`} /> : null}
        {result.duration != null ? <GameResultCard label="Duration" value={`${result.duration}s`} /> : null}
      </GameResultRow>

      <View style={styles.actions}>
        {sectionId ? (
          <PrimaryButton label="Continue" onPress={handleContinueQuestionnaire} style={styles.actionButton} />
        ) : (
          <>
            {canGoNextLevel ? (
              <PrimaryButton
                label="Next Level"
                onPress={() => (navigation as any).replace('GamePlay', { gameId, level: (level + 1) as 1 | 2 | 3 })}
                style={styles.actionButton}
              />
            ) : null}
            <SecondaryButton
              label="Play Again"
              onPress={() => (navigation as any).replace('GamePlay', { gameId, level })}
              style={styles.actionButton}
            />
            <SecondaryButton label="Back to Games" variant="ghost" onPress={() => navigation.popToTop()} />
          </>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  pad: { padding: spacing.xxl },
  center: { alignItems: 'center', paddingTop: spacing.xl },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  subtitle: { marginBottom: spacing.xl },
  rowSpacer: { height: spacing.md },
  actions: { alignSelf: 'stretch', marginTop: spacing.xxl, gap: spacing.sm },
  actionButton: { marginBottom: 0 },
});
