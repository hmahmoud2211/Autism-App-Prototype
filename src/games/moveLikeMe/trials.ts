export interface PosePrompt {
  id: string;
  emoji: string;
  label: string;
}

const SINGLE_POSES: PosePrompt[] = [
  { id: 'arms_up', emoji: '🙌', label: 'Raise your arms' },
  { id: 'touch_head', emoji: '🤚', label: 'Touch your head' },
  { id: 'one_foot', emoji: '🦵', label: 'Stand on one foot' },
  { id: 'clap', emoji: '👏', label: 'Clap your hands' },
  { id: 'wiggle', emoji: '💃', label: 'Wiggle like a noodle' },
];

const COMBINED_POSES: PosePrompt[] = [
  { id: 'clap_jump', emoji: '👏🤸', label: 'Clap, then jump' },
  { id: 'arms_spin', emoji: '🙌🔄', label: 'Raise arms, then turn around' },
  { id: 'touch_toes_stretch', emoji: '🙆', label: 'Touch your toes, then stretch up tall' },
];

export function buildPoseRounds(level: 1 | 2 | 3, roundCount: number): { pose: PosePrompt; seconds: number }[] {
  const pool = level === 3 ? COMBINED_POSES : SINGLE_POSES;
  const seconds = level === 1 ? 8 : level === 2 ? 6 : 7;
  return Array.from({ length: roundCount }, (_, i) => ({ pose: pool[i % pool.length], seconds }));
}
