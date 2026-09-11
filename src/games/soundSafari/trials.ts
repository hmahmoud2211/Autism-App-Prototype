import type { TrialSpec, TrialOption } from '@/games/engine/ChoiceTrialGame';
import { buildOptionSet, pickRandom } from '@/games/engine/trialUtils';

interface AnimalSound {
  id: string;
  emoji: string;
  label: string;
  sound: string;
}

const ANIMAL_POOL: AnimalSound[] = [
  { id: 'dog', emoji: '🐶', label: 'Dog', sound: '"Woof! Woof!"' },
  { id: 'cat', emoji: '🐱', label: 'Cat', sound: '"Meow!"' },
  { id: 'bird', emoji: '🐦', label: 'Bird', sound: '"Tweet tweet!"' },
  { id: 'cow', emoji: '🐮', label: 'Cow', sound: '"Moo!"' },
  { id: 'duck', emoji: '🦆', label: 'Duck', sound: '"Quack!"' },
];

function optionCountForLevel(level: 1 | 2 | 3): number {
  return level === 1 ? 3 : level === 2 ? 4 : 5;
}

/** No bundled audio assets — the sound is represented as an on-screen cue (spec section 20 fallback). */
export function buildSoundSafariTrials(level: 1 | 2 | 3, trialCount: number): TrialSpec[] {
  const pool: TrialOption[] = ANIMAL_POOL.map((a) => ({ id: a.id, emoji: a.emoji, label: a.label }));
  const optionCount = Math.min(pool.length, optionCountForLevel(level));

  return Array.from({ length: trialCount }, () => {
    const correctAnimal = pickRandom(ANIMAL_POOL);
    const correctOption = pool.find((p) => p.id === correctAnimal.id)!;
    const options = buildOptionSet(pool, correctOption, optionCount);
    return {
      prompt: `🔊 ${correctAnimal.sound}\nTap the animal you hear.`,
      options,
      correctOptionId: correctAnimal.id,
    };
  });
}

export function buildNameResponseTrials(level: 1 | 2 | 3, trialCount: number, childName: string): TrialSpec[] {
  const otherNames = ['Mia', 'Sam', 'Lily', 'Omar', 'Zoe', 'Noah'].filter((n) => n.toLowerCase() !== childName.toLowerCase());
  const namePool = [childName, ...otherNames];
  const pool: TrialOption[] = namePool.map((n) => ({ id: n, emoji: '🧑', label: n }));
  const optionCount = level === 1 ? 2 : level === 2 ? 3 : 4;

  return Array.from({ length: trialCount }, () => {
    // The child's own name is the target roughly half the time; a distractor name otherwise.
    const targetIsChild = Math.random() < 0.5;
    const targetName = targetIsChild ? childName : pickRandom(otherNames);
    const targetOption = pool.find((p) => p.id === targetName)!;
    const options = buildOptionSet(pool, targetOption, Math.min(pool.length, optionCount));
    return {
      prompt: `🔊 "${targetName}!"\nSomeone is calling a name. Who is it?`,
      options,
      correctOptionId: targetName,
    };
  });
}
