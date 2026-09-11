export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Builds one trial's option set: the correct item plus `count - 1` random distractors from the pool. */
export function buildOptionSet<T>(pool: T[], correct: T, count: number): T[] {
  const distractorPool = pool.filter((item) => item !== correct);
  const distractors = shuffle(distractorPool).slice(0, Math.max(0, count - 1));
  return shuffle([correct, ...distractors]);
}
