import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { ScreenContainer } from '@/components/common/ScreenContainer';
import { AppText } from '@/components/common/AppText';
import { Badge } from '@/components/common/Badge';
import { PrimaryButton } from '@/components/common/PrimaryButton';
import { SecondaryButton } from '@/components/common/SecondaryButton';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';
import { getGameById } from '@/data/games';
import { useGameStore } from '@/stores/gameStore';
import { useChildStore } from '@/stores/childStore';
import type { QuestionnaireStackParamList } from '@/navigation/types';
import type { EngineId } from '@/types/game';

type Props = NativeStackScreenProps<QuestionnaireStackParamList, 'GameInstructions'>;

const ENGINE_INSTRUCTIONS: Record<EngineId, string> = {
  gazeFollow: 'Look where the character is looking, then tap the matching picture!',
  emotionRecognition: 'Look carefully, then choose the best answer from the options.',
  soundMatch: 'Listen carefully, then tap the picture that matches what you hear.',
  memoryMatch: 'Flip two cards at a time and try to find matching pairs.',
  sequenceOrder: 'Put the pictures in the right order, from first to last.',
  poseConfirm: 'Watch the movement, try it yourself, then tap "I Did It!"',
  shapeMatch: 'Drag or tap each shape into the place where it belongs.',
};

export function GameInstructionsScreen({ navigation, route }: Props) {
  const { sectionId, gameId } = route.params;
  const game = getGameById(gameId)!;
  const child = useChildStore((s) => s.activeChild());
  const getUnlockedLevel = useGameStore((s) => s.getUnlockedLevel);
  const level = child ? getUnlockedLevel(child.id, gameId) : 1;

  return (
    <ScreenContainer scroll contentStyle={styles.center}>
      <Badge label="CHILD ACTIVITY" color={colors.teal} background={`${colors.teal}14`} icon="game-controller-outline" />
      <View style={styles.iconWrap}>
        <Ionicons name={game.icon as any} size={40} color={colors.primary} />
      </View>
      <AppText variant="h1" center style={styles.title}>
        {game.title}
      </AppText>
      <AppText variant="body" color={colors.textSecondary} center style={styles.instructions}>
        {ENGINE_INSTRUCTIONS[game.engineId]}
      </AppText>

      <PrimaryButton
        label="Start"
        onPress={() => navigation.navigate('GamePlay', { gameId, level, sectionId })}
        style={styles.cta}
      />
      <SecondaryButton label="Back" variant="ghost" onPress={() => navigation.goBack()} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', paddingTop: spacing.xxl },
  iconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: `${colors.primary}1A`,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  title: { marginBottom: spacing.md },
  instructions: { marginBottom: spacing.xxl, paddingHorizontal: spacing.lg },
  cta: { marginBottom: spacing.sm },
});
