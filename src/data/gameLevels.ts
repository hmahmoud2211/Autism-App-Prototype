import type { GameLevelConfig } from '@/types/game';

/**
 * Default 3-level difficulty template shared by every game (spec section 17):
 * Level 1 = simple/clear, Level 2 = more elements/choices, Level 3 = more
 * realistic/challenging. `trials` and `unlockThresholdAccuracy` can be
 * overridden per game in data/games.ts.
 */
export function defaultLevels(trialsPerLevel: [number, number, number] = [5, 5, 5]): [
  GameLevelConfig,
  GameLevelConfig,
  GameLevelConfig,
] {
  return [
    {
      level: 1,
      label: 'Level 1',
      description: 'Simple and clear',
      trials: trialsPerLevel[0],
      unlockThresholdAccuracy: 0.6,
    },
    {
      level: 2,
      label: 'Level 2',
      description: 'More elements / more choices',
      trials: trialsPerLevel[1],
      unlockThresholdAccuracy: 0.65,
    },
    {
      level: 3,
      label: 'Level 3',
      description: 'More realistic / more challenging',
      trials: trialsPerLevel[2],
      unlockThresholdAccuracy: 0.7,
    },
  ];
}
