import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { GameShell } from '@/components/games/GameShell';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGameById } from '@/data/games';
import { GAME_ENGINE_REGISTRY } from '@/games/registry';
import type { GameEngineSummary } from '@/games/engine/types';
import { useChildStore } from '@/stores/childStore';
import { useGameStore } from '@/stores/gameStore';
import { useAssessmentStore } from '@/stores/assessmentStore';
import type { DevelopmentAreaId } from '@/types/child';

type ParamList = {
  GamePlay: { gameId: string; level: 1 | 2 | 3; sectionId?: DevelopmentAreaId };
};

interface Props {
  navigation: NativeStackNavigationProp<ParamList, 'GamePlay'>;
  route: RouteProp<ParamList, 'GamePlay'>;
}

export function GamePlayScreen({ navigation, route }: Props) {
  const { gameId, level, sectionId } = route.params;
  const game = getGameById(gameId)!;
  const levelConfig = game.levels[level - 1];
  const EngineComponent = GAME_ENGINE_REGISTRY[game.engineId];

  const child = useChildStore((s) => s.activeChild());
  const addResult = useGameStore((s) => s.addResult);
  const attachGameResult = useAssessmentStore((s) => s.attachGameResult);

  const [trialProgress, setTrialProgress] = useState({ index: 0, total: levelConfig.trials });
  const [summary, setSummary] = useState<GameEngineSummary | null>(null);

  function handleExit() {
    navigation.goBack();
  }

  function handleContinueToResults() {
    if (!summary || !child) return;
    const resultId = addResult({
      gameId,
      childId: child.id,
      completedAt: new Date().toISOString(),
      score: summary.score,
      correctAnswers: summary.correctAnswers,
      totalQuestions: summary.totalQuestions,
      responseTime: summary.responseTime,
      attempts: summary.attempts,
      duration: summary.duration,
      level,
      developmentalArea: game.area,
      success: summary.success,
    });
    if (sectionId) attachGameResult(child.id, sectionId, resultId);
    (navigation as any).replace('GameResult', { gameId, level, resultId, sectionId });
  }

  if (summary) {
    return (
      <View style={styles.celebrationContainer}>
        <Animated.View entering={ZoomIn.duration(300)} style={styles.celebrationIcon}>
          <Ionicons name="trophy" size={56} color={colors.orange} />
        </Animated.View>
        <AppText variant="h1" center style={styles.celebrationTitle}>
          Great Job!
        </AppText>
        <AppText variant="body" color={colors.textSecondary} center style={styles.celebrationBody}>
          {sectionId ? 'Give the device back to your parent.' : "You've completed this activity."}
        </AppText>
        <PrimaryButton
          label="Continue to Parent Results"
          onPress={handleContinueToResults}
          style={styles.celebrationCta}
        />
      </View>
    );
  }

  return (
    <GameShell title={game.title} trialIndex={trialProgress.index} totalTrials={trialProgress.total} onExit={handleExit}>
      <EngineComponent
        game={game}
        level={levelConfig}
        onProgress={(index, total) => setTrialProgress({ index, total })}
        onFinish={setSummary}
      />
    </GameShell>
  );
}

const styles = StyleSheet.create({
  celebrationContainer: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  celebrationIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.orange}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  celebrationTitle: { marginBottom: spacing.sm },
  celebrationBody: { marginBottom: spacing.xxl },
  celebrationCta: { paddingHorizontal: spacing.xl },
});
