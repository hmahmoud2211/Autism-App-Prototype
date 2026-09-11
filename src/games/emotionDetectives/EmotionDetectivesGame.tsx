import React, { useMemo } from 'react';
import { ChoiceTrialGame } from '@/games/engine/ChoiceTrialGame';
import type { GameEngineProps } from '@/games/engine/types';
import { buildEmotionTrials, buildCommunicationTrials } from './trials';

/** Powers "Emotion Detectives" (behavior & emotions) and "Choose the Picture" (communication) family games. */
export function EmotionDetectivesGame({ game, level, onProgress, onFinish }: GameEngineProps) {
  const trials = useMemo(() => {
    const builder = game.contentSetId === 'communication' ? buildCommunicationTrials : buildEmotionTrials;
    return builder(level.level, level.trials);
  }, [game.contentSetId, level.level, level.trials]);

  return (
    <ChoiceTrialGame
      trials={trials}
      onProgress={onProgress}
      onFinish={({ correct, total, avgResponseTime, attempts }) => {
        const accuracy = correct / total;
        onFinish({
          score: Math.round(accuracy * 100),
          correctAnswers: correct,
          totalQuestions: total,
          responseTime: avgResponseTime,
          attempts,
          success: accuracy >= level.unlockThresholdAccuracy,
        });
      }}
    />
  );
}
