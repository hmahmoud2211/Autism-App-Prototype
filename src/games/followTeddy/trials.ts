import type { TrialSpec, TrialOption } from '@/games/engine/ChoiceTrialGame';
import { buildOptionSet, pickRandom } from '@/games/engine/trialUtils';

const OBJECT_POOL: TrialOption[] = [
  { id: 'car', icon: 'car-outline', label: 'Car' },
  { id: 'ball', icon: 'football-outline', label: 'Ball' },
  { id: 'book', icon: 'book-outline', label: 'Book' },
  { id: 'balloon', icon: 'balloon-outline', label: 'Balloon' },
  { id: 'gift', icon: 'gift-outline', label: 'Gift' },
  { id: 'star', icon: 'star-outline', label: 'Star' },
];

const FACE_POOL: TrialOption[] = [
  { id: 'looking_at_you', emoji: '👀', label: 'Looking at You' },
  { id: 'looking_away', emoji: '🙈', label: 'Looking Away' },
  { id: 'eyes_closed', emoji: '😴', label: 'Eyes Closed' },
  { id: 'looking_down', emoji: '🙄', label: 'Looking Down' },
  { id: 'looking_up', emoji: '😲', label: 'Looking Up' },
];

function optionCountForLevel(level: 1 | 2 | 3): number {
  return level === 1 ? 3 : level === 2 ? 4 : 5;
}

export function buildJointAttentionTrials(level: 1 | 2 | 3, trialCount: number): TrialSpec[] {
  const optionCount = optionCountForLevel(level);
  return Array.from({ length: trialCount }, () => {
    const correct = pickRandom(OBJECT_POOL);
    const options = buildOptionSet(OBJECT_POOL, correct, optionCount);
    return {
      prompt: 'Teddy is looking at something.\nWhere is Teddy looking?',
      options,
      correctOptionId: correct.id,
    };
  });
}

export function buildSocialAttentionTrials(level: 1 | 2 | 3, trialCount: number): TrialSpec[] {
  const optionCount = Math.min(FACE_POOL.length, optionCountForLevel(level));
  return Array.from({ length: trialCount }, () => {
    const correct = FACE_POOL[0]; // "Looking at You" is always the correct social-attention answer
    const options = buildOptionSet(FACE_POOL, correct, optionCount);
    return {
      prompt: 'Which friend is looking at you?',
      options,
      correctOptionId: correct.id,
    };
  });
}
