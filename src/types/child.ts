export type DevelopmentAreaId =
  | 'social_interaction'
  | 'joint_attention'
  | 'response_to_name'
  | 'communication'
  | 'play_interests'
  | 'sensory_regulation'
  | 'behavior_emotions'
  | 'daily_living';

export type AgeGroupId = '3-8' | '8-13' | '13-18';

export interface Child {
  id: string;
  name: string;
  dob: string; // ISO date
  gender?: 'girl' | 'boy' | 'prefer_not_to_say';
  avatarKey: string;
  ageGroup: AgeGroupId;
  createdAt: string;
}

export interface ParentUser {
  id: string;
  name: string;
  email: string;
  language: string;
  createdAt: string;
}
