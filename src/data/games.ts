import type { AgeGroupId, DevelopmentAreaId } from '@/types/child';
import type { EngineId, GameCategoryId, GameMeta } from '@/types/game';
import { defaultLevels } from './gameLevels';

const AGE_GROUPS: AgeGroupId[] = ['3-8', '8-13', '13-18'];

interface GameFamily {
  slug: string; // stable id fragment
  area: DevelopmentAreaId;
  category: GameCategoryId;
  engineId: EngineId;
  contentSetId: string;
  icon: string;
  tagline: string;
  estMinutes: [string, string, string]; // per age group
  trials: [number, number, number];
  /** true when this family is the §9 recommendation-table mapping for its area. */
  isRecommendable: boolean;
  names: Record<AgeGroupId, string>;
}

// The 8 questionnaire domains each get one named game per age group — this is
// the literal mapping table from spec section 9. Three general-purpose games
// (Memory Match, Move Like Me, Shape Explorer) round out the library and map
// to the Cognitive Skills / Motor Skills library categories from spec section 16.
const GAME_FAMILIES: GameFamily[] = [
  {
    slug: 'face-finder',
    area: 'social_interaction',
    category: 'social_interaction',
    engineId: 'gazeFollow',
    contentSetId: 'socialAttention',
    icon: 'people-outline',
    tagline: 'Helps your child engage with people and recognize social cues.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [5, 6, 7],
    isRecommendable: true,
    names: { '3-8': 'Face Finder', '8-13': 'Social Scenes', '13-18': 'Real-Life Social Attention' },
  },
  {
    slug: 'follow-teddy',
    area: 'joint_attention',
    category: 'joint_attention',
    engineId: 'gazeFollow',
    contentSetId: 'jointAttention',
    icon: 'eye-outline',
    tagline: 'Look where the character is looking!',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [5, 6, 7],
    isRecommendable: true,
    names: { '3-8': 'Follow Teddy', '8-13': 'Follow the Gaze', '13-18': 'Social Attention Scenes' },
  },
  {
    slug: 'name-game',
    area: 'response_to_name',
    category: 'response_to_name',
    engineId: 'soundMatch',
    contentSetId: 'nameResponse',
    icon: 'chatbubble-ellipses-outline',
    tagline: 'Listen carefully and respond when you hear the cue.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [5, 6, 7],
    isRecommendable: true,
    names: { '3-8': 'Name Game', '8-13': 'Find Me', '13-18': 'Name in Noise' },
  },
  {
    slug: 'choose-the-picture',
    area: 'communication',
    category: 'communication',
    engineId: 'emotionRecognition',
    contentSetId: 'communication',
    icon: 'megaphone-outline',
    tagline: 'Choose the picture that matches best.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [6, 8, 10],
    isRecommendable: true,
    names: { '3-8': 'Choose the Picture', '8-13': 'Complete the Story', '13-18': 'Conversation Scenario' },
  },
  {
    slug: 'free-play',
    area: 'play_interests',
    category: 'cognitive_skills',
    engineId: 'shapeMatch',
    contentSetId: 'play',
    icon: 'game-controller-outline',
    tagline: 'Explore, build, and imagine!',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [3, 4, 5],
    isRecommendable: true,
    names: { '3-8': 'Free Play', '8-13': 'Build Together', '13-18': 'Imagination Challenge' },
  },
  {
    slug: 'sound-safari',
    area: 'sensory_regulation',
    category: 'sensory_skills',
    engineId: 'soundMatch',
    contentSetId: 'soundSafari',
    icon: 'ear-outline',
    tagline: 'Listen carefully. Tap the animal you hear.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [5, 5, 5],
    isRecommendable: true,
    names: { '3-8': 'Sound Safari', '8-13': 'Sound Matching', '13-18': 'What Feels Better?' },
  },
  {
    slug: 'emotion-detectives',
    area: 'behavior_emotions',
    category: 'emotions',
    engineId: 'emotionRecognition',
    contentSetId: 'emotions',
    icon: 'happy-outline',
    tagline: 'Look at the face and choose the correct emotion.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [10, 10, 10],
    isRecommendable: true,
    names: { '3-8': 'Emotion Detectives', '8-13': 'What Should I Do?', '13-18': 'Real-Life Emotional Choices' },
  },
  {
    slug: 'my-routine',
    area: 'daily_living',
    category: 'daily_living',
    engineId: 'sequenceOrder',
    contentSetId: 'routine',
    icon: 'home-outline',
    tagline: 'Put the steps in the right order.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [3, 4, 4],
    isRecommendable: true,
    names: { '3-8': 'My Routine', '8-13': 'Time to Get Ready', '13-18': 'Plan My Day' },
  },
  {
    slug: 'memory-match',
    area: 'play_interests',
    category: 'cognitive_skills',
    engineId: 'memoryMatch',
    contentSetId: 'memory',
    icon: 'grid-outline',
    tagline: 'Flip the cards and find the matching pairs.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [3, 4, 6],
    isRecommendable: false,
    names: { '3-8': 'Memory Match', '8-13': 'Memory Match', '13-18': 'Memory Match' },
  },
  {
    slug: 'move-like-me',
    area: 'daily_living',
    category: 'motor_skills',
    engineId: 'poseConfirm',
    contentSetId: 'moveLikeMe',
    icon: 'body-outline',
    tagline: 'Watch the movement and do the same.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [3, 5, 5],
    isRecommendable: false,
    names: { '3-8': 'Move Like Me', '8-13': 'Move Like Me', '13-18': 'Move Like Me' },
  },
  {
    slug: 'shape-explorer',
    area: 'play_interests',
    category: 'cognitive_skills',
    engineId: 'shapeMatch',
    contentSetId: 'shapeExplorer',
    icon: 'shapes-outline',
    tagline: 'Match each shape to its place in the house.',
    estMinutes: ['2-3 min', '3-4 min', '4-5 min'],
    trials: [3, 4, 5],
    isRecommendable: false,
    names: { '3-8': 'Shape Explorer', '8-13': 'Shape Explorer', '13-18': 'Shape Explorer' },
  },
];

export const GAME_CATALOG: GameMeta[] = GAME_FAMILIES.flatMap((family) =>
  AGE_GROUPS.map((ageGroup, ageIndex) => ({
    id: `${family.slug}_${ageGroup}`,
    engineId: family.engineId,
    contentSetId: family.contentSetId,
    title: family.names[ageGroup],
    tagline: family.tagline,
    ageGroup,
    area: family.area,
    category: family.category,
    icon: family.icon,
    estMinutes: family.estMinutes[ageIndex],
    isRecommendable: family.isRecommendable,
    levels: defaultLevels([family.trials[0], family.trials[1], family.trials[2]]),
  })),
);

export function getGameById(id: string): GameMeta | undefined {
  return GAME_CATALOG.find((g) => g.id === id);
}

export function getGamesByArea(area: DevelopmentAreaId, ageGroup?: AgeGroupId): GameMeta[] {
  return GAME_CATALOG.filter((g) => g.area === area && (!ageGroup || g.ageGroup === ageGroup));
}

export function getGamesByCategory(category: GameCategoryId, ageGroup?: AgeGroupId): GameMeta[] {
  return GAME_CATALOG.filter((g) => g.category === category && (!ageGroup || g.ageGroup === ageGroup));
}

export const GAME_LIBRARY_CATEGORIES: { id: GameCategoryId; label: string }[] = [
  { id: 'communication', label: 'Communication' },
  { id: 'social_interaction', label: 'Social Interaction' },
  { id: 'joint_attention', label: 'Joint Attention' },
  { id: 'response_to_name', label: 'Response to Name' },
  { id: 'emotions', label: 'Emotions' },
  { id: 'cognitive_skills', label: 'Cognitive Skills' },
  { id: 'sensory_skills', label: 'Sensory Skills' },
  { id: 'motor_skills', label: 'Motor Skills' },
  { id: 'daily_living', label: 'Daily Living Skills' },
];
