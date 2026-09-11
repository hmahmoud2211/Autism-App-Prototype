export interface SequenceCard {
  id: string;
  emoji: string;
  label: string;
}

export interface SequenceSet {
  title: string;
  steps: SequenceCard[]; // in correct order
}

const ROUTINE_SEQUENCES: SequenceSet[] = [
  {
    title: 'Morning Routine',
    steps: [
      { id: 'wake', emoji: '🛏️', label: 'Wake up' },
      { id: 'teeth', emoji: '🪥', label: 'Brush teeth' },
      { id: 'dress', emoji: '👕', label: 'Get dressed' },
      { id: 'school', emoji: '🎒', label: 'Go to school' },
    ],
  },
  {
    title: 'Getting Ready for Bed',
    steps: [
      { id: 'bath', emoji: '🛁', label: 'Take a bath' },
      { id: 'pajamas', emoji: '🥱', label: 'Put on pajamas' },
      { id: 'story', emoji: '📖', label: 'Read a story' },
      { id: 'sleep', emoji: '😴', label: 'Go to sleep' },
    ],
  },
  {
    title: 'Making a Snack',
    steps: [
      { id: 'wash', emoji: '🧼', label: 'Wash hands' },
      { id: 'grab', emoji: '🍎', label: 'Grab a snack' },
      { id: 'plate', emoji: '🍽️', label: 'Put it on a plate' },
      { id: 'eat', emoji: '😋', label: 'Enjoy!' },
    ],
  },
  {
    title: 'Planning the Day',
    steps: [
      { id: 'checklist', emoji: '📝', label: 'Make a checklist' },
      { id: 'priorities', emoji: '📌', label: 'Pick priorities' },
      { id: 'schedule', emoji: '🗓️', label: 'Schedule tasks' },
      { id: 'review', emoji: '✅', label: 'Review at night' },
    ],
  },
];

export function buildSequenceRounds(level: 1 | 2 | 3, roundCount: number): SequenceSet[] {
  const stepCount = level === 1 ? 3 : 4;
  return Array.from({ length: roundCount }, (_, i) => {
    const base = ROUTINE_SEQUENCES[i % ROUTINE_SEQUENCES.length];
    return { title: base.title, steps: base.steps.slice(0, stepCount) };
  });
}
