import type { ComponentType } from 'react';
import type { EngineId } from '@/types/game';
import type { GameEngineProps } from '@/games/engine/types';
import { FollowTeddyGame } from './followTeddy/FollowTeddyGame';
import { EmotionDetectivesGame } from './emotionDetectives/EmotionDetectivesGame';
import { SoundSafariGame } from './soundSafari/SoundSafariGame';
import { MemoryMatchGame } from './memoryMatch/MemoryMatchGame';
import { SequenceStoriesGame } from './sequenceStories/SequenceStoriesGame';
import { MoveLikeMeGame } from './moveLikeMe/MoveLikeMeGame';
import { ShapeExplorerGame } from './shapeExplorer/ShapeExplorerGame';

export const GAME_ENGINE_REGISTRY: Record<EngineId, ComponentType<GameEngineProps>> = {
  gazeFollow: FollowTeddyGame,
  emotionRecognition: EmotionDetectivesGame,
  soundMatch: SoundSafariGame,
  memoryMatch: MemoryMatchGame,
  sequenceOrder: SequenceStoriesGame,
  poseConfirm: MoveLikeMeGame,
  shapeMatch: ShapeExplorerGame,
};
