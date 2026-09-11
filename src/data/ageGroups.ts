import type { AgeGroupId } from '@/types/child';

export interface AgeGroupMeta {
  id: AgeGroupId;
  label: string; // "3-8 years"
  name: string; // "Early Learners"
  description: string;
  icon: string;
}

export const AGE_GROUPS: AgeGroupMeta[] = [
  {
    id: '3-8',
    label: '3–8 years',
    name: 'Early Learners',
    description: 'Large visuals, simple instructions, short playful tasks and encouragement.',
    icon: 'happy-outline',
  },
  {
    id: '8-13',
    label: '8–13 years',
    name: 'Growing Skills',
    description: 'More interactive tasks, choices, problem solving, and building independence.',
    icon: 'bulb-outline',
  },
  {
    id: '13-18',
    label: '13–18 years',
    name: 'Building Independence',
    description: 'Realistic scenarios, social decision making, planning, and daily life challenges.',
    icon: 'rocket-outline',
  },
];

export function ageGroupMeta(id: AgeGroupId): AgeGroupMeta {
  const meta = AGE_GROUPS.find((g) => g.id === id);
  if (!meta) throw new Error(`Unknown age group: ${id}`);
  return meta;
}
