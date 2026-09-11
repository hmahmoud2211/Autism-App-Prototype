import type { TrialSpec, TrialOption } from '@/games/engine/ChoiceTrialGame';
import { buildOptionSet, pickRandom } from '@/games/engine/trialUtils';

const EMOTION_POOL: { emoji: string; label: string }[] = [
  { emoji: '😊', label: 'Happy' },
  { emoji: '😢', label: 'Sad' },
  { emoji: '😠', label: 'Angry' },
  { emoji: '😲', label: 'Surprised' },
  { emoji: '😨', label: 'Scared' },
  { emoji: '😕', label: 'Confused' },
];

function emotionOptionCountForLevel(level: 1 | 2 | 3): number {
  return level === 1 ? 2 : level === 2 ? 4 : 6;
}

export function buildEmotionTrials(level: 1 | 2 | 3, trialCount: number): TrialSpec[] {
  const pool: TrialOption[] = EMOTION_POOL.map((e) => ({ id: e.label.toLowerCase(), emoji: e.emoji, label: e.label }));
  const usablePool = level === 1 ? pool.slice(0, 4) : pool;
  const optionCount = Math.min(usablePool.length, emotionOptionCountForLevel(level));

  return Array.from({ length: trialCount }, () => {
    const correct = pickRandom(usablePool);
    const options = buildOptionSet(usablePool, correct, optionCount);
    return {
      prompt: 'Look at the face.\nWhich emotion is this?',
      options,
      correctOptionId: correct.id,
    };
  });
}

interface CommunicationScenario {
  prompt: string;
  correct: TrialOption;
  distractors: TrialOption[];
}

const COMMUNICATION_SCENARIOS: CommunicationScenario[] = [
  {
    prompt: 'Which picture shows "I am thirsty"?',
    correct: { id: 'water', emoji: '🥤', label: 'A drink' },
    distractors: [
      { id: 'book', emoji: '📖', label: 'A book' },
      { id: 'shoe', emoji: '👟', label: 'A shoe' },
      { id: 'ball', emoji: '⚽', label: 'A ball' },
    ],
  },
  {
    prompt: 'Which picture shows "I want to play"?',
    correct: { id: 'toy', emoji: '🧸', label: 'A toy' },
    distractors: [
      { id: 'plate', emoji: '🍽️', label: 'A plate' },
      { id: 'bed', emoji: '🛏️', label: 'A bed' },
      { id: 'bath', emoji: '🛁', label: 'A bath' },
    ],
  },
  {
    prompt: 'What comes next in the story: "First we got dressed, then we..."',
    correct: { id: 'eat', emoji: '🍳', label: 'Ate breakfast' },
    distractors: [
      { id: 'sleep', emoji: '😴', label: 'Went to sleep' },
      { id: 'bath2', emoji: '🛁', label: 'Took a bath' },
      { id: 'pajamas', emoji: '🥱', label: 'Put on pajamas' },
    ],
  },
  {
    prompt: 'A friend says "Hi, how are you?" What is the best reply?',
    correct: { id: 'good_thanks', emoji: '🙂', label: '"I\'m good, thanks!"' },
    distractors: [
      { id: 'silence', emoji: '🤐', label: 'Say nothing' },
      { id: 'walk_away', emoji: '🚶', label: 'Walk away' },
      { id: 'random', emoji: '🍕', label: '"I like pizza."' },
    ],
  },
];

export function buildCommunicationTrials(level: 1 | 2 | 3, trialCount: number): TrialSpec[] {
  const optionCount = level === 1 ? 2 : level === 2 ? 3 : 4;
  return Array.from({ length: trialCount }, (_, i) => {
    const scenario = COMMUNICATION_SCENARIOS[i % COMMUNICATION_SCENARIOS.length];
    const pool = [scenario.correct, ...scenario.distractors];
    const options = buildOptionSet(pool, scenario.correct, Math.min(pool.length, optionCount));
    return {
      prompt: scenario.prompt,
      options,
      correctOptionId: scenario.correct.id,
    };
  });
}
