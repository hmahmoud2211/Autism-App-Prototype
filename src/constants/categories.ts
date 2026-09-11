import { colors } from './colors';
import type { DevelopmentAreaId } from '@/types/child';

/**
 * Central theme configuration for the 8 developmental areas.
 * Every screen that needs an area's label/icon/color should read from here
 * instead of re-declaring it, so the mapping stays consistent app-wide.
 */
export interface CategoryTheme {
  id: DevelopmentAreaId;
  label: string;
  shortLabel: string;
  color: string;
  pastel: string;
  icon: string; // Ionicons name
  purpose: string;
}

export const CATEGORY_THEME: Record<DevelopmentAreaId, CategoryTheme> = {
  social_interaction: {
    id: 'social_interaction',
    label: 'Social Interaction',
    shortLabel: 'Social',
    color: '#FF7A93',
    pastel: '#FFE4EA',
    icon: 'people-outline',
    purpose: 'Looking at people, faces, social signals, and engagement.',
  },
  joint_attention: {
    id: 'joint_attention',
    label: 'Joint Attention',
    shortLabel: 'Attention',
    color: colors.orange,
    pastel: '#FFF2DE',
    icon: 'eye-outline',
    purpose: "Following another person's gaze, pointing, and shared attention.",
  },
  response_to_name: {
    id: 'response_to_name',
    label: 'Response to Name',
    shortLabel: 'Name',
    color: colors.primary,
    pastel: '#DDF1FC',
    icon: 'chatbubble-ellipses-outline',
    purpose: "Responding appropriately when the child's name is called.",
  },
  communication: {
    id: 'communication',
    label: 'Communication',
    shortLabel: 'Talk',
    color: colors.green,
    pastel: '#E4F8EC',
    icon: 'megaphone-outline',
    purpose: 'Understanding, expressing, and using language.',
  },
  play_interests: {
    id: 'play_interests',
    label: 'Play & Interests',
    shortLabel: 'Play',
    color: colors.purple,
    pastel: '#F0EAFC',
    icon: 'game-controller-outline',
    purpose: 'Play variety, engagement, flexibility, imagination, and interests.',
  },
  sensory_regulation: {
    id: 'sensory_regulation',
    label: 'Sensory Regulation',
    shortLabel: 'Sensory',
    color: '#D162C9',
    pastel: '#FAE6F7',
    icon: 'ear-outline',
    purpose: 'Managing sensory input, sounds, visual stimuli, textures, and reactions.',
  },
  behavior_emotions: {
    id: 'behavior_emotions',
    label: 'Behavior & Emotions',
    shortLabel: 'Emotions',
    color: colors.teal,
    pastel: '#DEF6F3',
    icon: 'happy-outline',
    purpose: 'Recognizing emotions, managing emotions, understanding situations, and regulation.',
  },
  daily_living: {
    id: 'daily_living',
    label: 'Daily Living Skills',
    shortLabel: 'Daily',
    color: '#FF6B81',
    pastel: '#FFE6EA',
    icon: 'home-outline',
    purpose: 'Routine, independence, self-care, planning, and everyday tasks.',
  },
};

export const CATEGORY_ORDER: DevelopmentAreaId[] = [
  'communication',
  'social_interaction',
  'joint_attention',
  'response_to_name',
  'play_interests',
  'sensory_regulation',
  'behavior_emotions',
  'daily_living',
];
