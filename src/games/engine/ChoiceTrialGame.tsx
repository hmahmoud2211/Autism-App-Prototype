import React, { useRef, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { FaceIllustration, type FaceConfig } from '@/components/games/FaceIllustration';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';

export interface TrialOption {
  id: string;
  icon?: keyof typeof Ionicons.glyphMap;
  emoji?: string;
  face?: FaceConfig;
  label: string;
}

export interface TrialSpec {
  prompt: string;
  /** An optional stimulus face shown above the prompt (e.g. "which emotion is this?"). */
  promptFace?: FaceConfig;
  options: TrialOption[];
  correctOptionId: string;
}

interface ChoiceTrialGameProps {
  trials: TrialSpec[];
  onProgress: (trialIndex: number, totalTrials: number) => void;
  onFinish: (summary: { correct: number; total: number; avgResponseTime: number; attempts: number }) => void;
}

/**
 * Shared "look at a prompt, tap the matching option" mechanic used by
 * gazeFollow, emotionRecognition, and soundMatch — each supplies its own
 * TrialSpec content but the interaction loop and scoring are identical.
 */
export function ChoiceTrialGame({ trials, onProgress, onFinish }: ChoiceTrialGameProps) {
  const [trialIndex, setTrialIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const responseTimes = useRef<number[]>([]);
  const trialStartedAt = useRef(Date.now());

  const trial = trials[trialIndex];

  React.useEffect(() => {
    onProgress(trialIndex, trials.length);
    trialStartedAt.current = Date.now();
    setSelected(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trialIndex]);

  function handleSelect(optionId: string) {
    if (selected) return; // lock after first choice this trial
    setSelected(optionId);
    setAttempts((a) => a + 1);
    const elapsed = (Date.now() - trialStartedAt.current) / 1000;
    responseTimes.current.push(elapsed);
    const isCorrect = optionId === trial.correctOptionId;
    if (isCorrect) setCorrectCount((c) => c + 1);
    Haptics.notificationAsync(isCorrect ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning).catch(
      () => {},
    );

    setTimeout(() => {
      if (trialIndex + 1 < trials.length) {
        setTrialIndex((i) => i + 1);
      } else {
        const total = trials.length;
        const avg = responseTimes.current.reduce((a, b) => a + b, 0) / Math.max(1, responseTimes.current.length);
        onFinish({
          correct: correctCount + (isCorrect ? 1 : 0),
          total,
          avgResponseTime: Math.round(avg * 10) / 10,
          attempts: attempts + 1,
        });
      }
    }, 550);
  }

  const columns = trial.options.length <= 3 ? trial.options.length : trial.options.length <= 4 ? 2 : 3;

  return (
    <View style={styles.container}>
      <Animated.View key={trialIndex} entering={FadeIn.duration(200)} style={styles.promptWrap}>
        {trial.promptFace ? (
          <View style={styles.promptFaceWrap}>
            <FaceIllustration {...trial.promptFace} size={104} />
          </View>
        ) : null}
        <AppText variant="h2" center>
          {trial.prompt}
        </AppText>
      </Animated.View>

      <View style={[styles.grid, { justifyContent: columns <= 2 ? 'center' : 'flex-start' }]}>
        {trial.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectOption = option.id === trial.correctOptionId;
          const showFeedback = !!selected;
          const feedbackColor = showFeedback && isCorrectOption ? colors.green : showFeedback && isSelected ? colors.red : colors.border;

          return (
            <Animated.View key={option.id} entering={ZoomIn.duration(200)} style={{ width: `${100 / columns}%` }}>
              <Pressable
                onPress={() => handleSelect(option.id)}
                disabled={!!selected}
                accessibilityRole="button"
                accessibilityLabel={option.label}
                style={styles.optionPad}
              >
                <View style={[styles.option, { borderColor: feedbackColor }, showFeedback && isCorrectOption && styles.optionCorrectBg]}>
                  {option.face ? (
                    <FaceIllustration {...option.face} size={64} />
                  ) : option.emoji ? (
                    <AppText style={styles.optionEmoji}>{option.emoji}</AppText>
                  ) : option.icon ? (
                    <Ionicons name={option.icon} size={36} color={showFeedback ? feedbackColor : colors.primary} />
                  ) : null}
                  <AppText
                    variant={option.face || option.emoji || option.icon ? 'bodySmall' : 'bodyMedium'}
                    center
                    style={styles.optionLabel}
                  >
                    {option.label}
                  </AppText>
                </View>
              </Pressable>
            </Animated.View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', paddingTop: spacing.xl },
  promptWrap: { marginBottom: spacing.xl, alignItems: 'center' },
  promptFaceWrap: { marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  optionPad: { padding: spacing.xs },
  option: {
    borderWidth: 2,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    minHeight: 96,
  },
  optionCorrectBg: { backgroundColor: `${colors.green}14` },
  optionEmoji: { fontSize: 36 },
  optionLabel: { marginTop: spacing.xs },
});
