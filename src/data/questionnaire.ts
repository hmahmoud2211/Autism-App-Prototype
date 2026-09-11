import type { QuestionnaireSection } from '@/types/questionnaire';
import { CATEGORY_THEME } from '@/constants/categories';

/**
 * The full questionnaire bank: 8 developmental sections, exactly 5 questions each.
 * `positiveOrientation: true` means "yes" is the developmentally-expected answer;
 * `false` means "no" is (used by the mock scoring engine, see services/mockScoringEngine.ts).
 */
export const QUESTIONNAIRE_SECTIONS: QuestionnaireSection[] = [
  {
    id: 'social_interaction',
    title: CATEGORY_THEME.social_interaction.label,
    icon: CATEGORY_THEME.social_interaction.icon,
    description: CATEGORY_THEME.social_interaction.purpose,
    questions: [
      {
        id: 'social_1',
        question: 'Does your child make eye contact during play or conversation?',
        explanation: 'Looking at faces during interaction is an early social signal.',
        example: 'For example, your child looks up at you while you read a story together.',
        positiveOrientation: true,
      },
      {
        id: 'social_2',
        question: 'Does your child smile back when you smile at them?',
        example: 'For example, you smile while playing peekaboo and your child smiles in return.',
        positiveOrientation: true,
      },
      {
        id: 'social_3',
        question: 'Does your child show interest in other children nearby?',
        explanation: 'This can include watching, approaching, or trying to join other children.',
        positiveOrientation: true,
      },
      {
        id: 'social_4',
        question: 'Does your child seem to prefer playing alone most of the time, even when others are around?',
        example: 'For example, at a birthday party your child stays away from the group.',
        positiveOrientation: false,
      },
      {
        id: 'social_5',
        question: 'Does your child enjoy simple social games like peekaboo or chase?',
        positiveOrientation: true,
      },
    ],
  },
  {
    id: 'joint_attention',
    title: CATEGORY_THEME.joint_attention.label,
    icon: CATEGORY_THEME.joint_attention.icon,
    description: CATEGORY_THEME.joint_attention.purpose,
    questions: [
      {
        id: 'joint_1',
        question: 'Does your child point to something interesting and then look back at you?',
        explanation: 'This is called joint attention — sharing interest in something with another person.',
        example:
          'For example, your child sees a toy across the room, points toward it, and looks at you to share their interest.',
        positiveOrientation: true,
      },
      {
        id: 'joint_2',
        question: 'Does your child follow your gaze when you look at something across the room?',
        example: 'For example, you look at a bird outside the window and your child looks too.',
        positiveOrientation: true,
      },
      {
        id: 'joint_3',
        question: 'Does your child bring or show you objects just to share their excitement?',
        example: 'For example, your child hands you a drawing and waits for your reaction.',
        positiveOrientation: true,
      },
      {
        id: 'joint_4',
        question: 'Does your child follow a simple point, such as when you point at a picture in a book?',
        positiveOrientation: true,
      },
      {
        id: 'joint_5',
        question: 'Does your child rarely check your face to see how you are reacting to something new?',
        example: 'For example, seeing a loud toy for the first time without glancing at you.',
        positiveOrientation: false,
      },
    ],
  },
  {
    id: 'response_to_name',
    title: CATEGORY_THEME.response_to_name.label,
    icon: CATEGORY_THEME.response_to_name.icon,
    description: CATEGORY_THEME.response_to_name.purpose,
    questions: [
      {
        id: 'name_1',
        question: 'Does your child turn or look toward you when you call their name?',
        positiveOrientation: true,
      },
      {
        id: 'name_2',
        question: 'Does it usually take calling your child’s name more than twice to get a response?',
        example: 'For example, you call from another room and need to repeat it several times.',
        positiveOrientation: false,
      },
      {
        id: 'name_3',
        question: 'Does your child respond similarly whether you call their name in a quiet or noisy room?',
        positiveOrientation: true,
      },
      {
        id: 'name_4',
        question: 'Does your child seem to recognize their own name when it is used in conversation?',
        example: 'For example, they look up when hearing their name mentioned even if not spoken to directly.',
        positiveOrientation: true,
      },
      {
        id: 'name_5',
        question: 'Does your child continue what they are doing without any reaction when called, even when not deeply focused?',
        positiveOrientation: false,
      },
    ],
  },
  {
    id: 'communication',
    title: CATEGORY_THEME.communication.label,
    icon: CATEGORY_THEME.communication.icon,
    description: CATEGORY_THEME.communication.purpose,
    questions: [
      {
        id: 'comm_1',
        question: 'Does your child use words, signs, or pictures to ask for things they want?',
        positiveOrientation: true,
      },
      {
        id: 'comm_2',
        question: 'Does your child understand simple instructions, such as "put it on the table"?',
        positiveOrientation: true,
      },
      {
        id: 'comm_3',
        question: 'Does your child use gestures, like waving or nodding, to communicate?',
        positiveOrientation: true,
      },
      {
        id: 'comm_4',
        question: 'Does your child repeat words or phrases without seeming to use them to communicate a need?',
        explanation: 'This is sometimes called echoing, and can be worth noting either way.',
        positiveOrientation: false,
      },
      {
        id: 'comm_5',
        question: 'Can your child hold a short back-and-forth exchange, even a simple one?',
        example: 'For example, you ask a question and your child answers or reacts in a related way.',
        positiveOrientation: true,
      },
    ],
  },
  {
    id: 'play_interests',
    title: CATEGORY_THEME.play_interests.label,
    icon: CATEGORY_THEME.play_interests.icon,
    description: CATEGORY_THEME.play_interests.purpose,
    questions: [
      {
        id: 'play_1',
        question: 'Does your child engage in pretend play, such as feeding a doll or "driving" a toy car?',
        positiveOrientation: true,
      },
      {
        id: 'play_2',
        question: 'Does your child enjoy a variety of toys and activities, rather than just one or two?',
        positiveOrientation: true,
      },
      {
        id: 'play_3',
        question: 'Does your child get very upset when a favorite routine or toy arrangement is changed?',
        example: 'For example, lining up toys the exact same way every time and becoming distressed if moved.',
        positiveOrientation: false,
      },
      {
        id: 'play_4',
        question: 'Can your child shift easily from one activity to another when needed?',
        positiveOrientation: true,
      },
      {
        id: 'play_5',
        question: 'Does your child show curiosity when trying a new toy or game for the first time?',
        positiveOrientation: true,
      },
    ],
  },
  {
    id: 'sensory_regulation',
    title: CATEGORY_THEME.sensory_regulation.label,
    icon: CATEGORY_THEME.sensory_regulation.icon,
    description: CATEGORY_THEME.sensory_regulation.purpose,
    questions: [
      {
        id: 'sensory_1',
        question: 'Does your child cover their ears or become distressed with everyday sounds, like a vacuum?',
        positiveOrientation: false,
      },
      {
        id: 'sensory_2',
        question: 'Does your child seem comfortable with different textures, such as sand, grass, or certain fabrics?',
        positiveOrientation: true,
      },
      {
        id: 'sensory_3',
        question: 'Does your child seek out spinning, rocking, or repetitive movement more than other children their age?',
        positiveOrientation: false,
      },
      {
        id: 'sensory_4',
        question: 'Does bright or flickering light seem to bother your child noticeably more than others?',
        positiveOrientation: false,
      },
      {
        id: 'sensory_5',
        question: 'Can your child stay reasonably calm in a mildly noisy or busy environment, like a store?',
        positiveOrientation: true,
      },
    ],
  },
  {
    id: 'behavior_emotions',
    title: CATEGORY_THEME.behavior_emotions.label,
    icon: CATEGORY_THEME.behavior_emotions.icon,
    description: CATEGORY_THEME.behavior_emotions.purpose,
    questions: [
      {
        id: 'behavior_1',
        question: 'Can your child usually calm down within a few minutes after being upset?',
        positiveOrientation: true,
      },
      {
        id: 'behavior_2',
        question: 'Does your child recognize when someone else is happy, sad, or upset?',
        positiveOrientation: true,
      },
      {
        id: 'behavior_3',
        question: 'Does your child have frequent, intense tantrums that seem hard to predict?',
        positiveOrientation: false,
      },
      {
        id: 'behavior_4',
        question: 'Does your child show affection in their own way, such as hugs, snuggling, or gentle touch?',
        positiveOrientation: true,
      },
      {
        id: 'behavior_5',
        question: 'Does your child struggle to express how they are feeling, even with simple words or gestures?',
        positiveOrientation: false,
      },
    ],
  },
  {
    id: 'daily_living',
    title: CATEGORY_THEME.daily_living.label,
    icon: CATEGORY_THEME.daily_living.icon,
    description: CATEGORY_THEME.daily_living.purpose,
    questions: [
      {
        id: 'daily_1',
        question: 'Can your child follow a familiar daily routine, like getting ready in the morning, with minimal help?',
        positiveOrientation: true,
      },
      {
        id: 'daily_2',
        question: 'Does your child attempt self-care tasks appropriate for their age, like washing hands or dressing?',
        positiveOrientation: true,
      },
      {
        id: 'daily_3',
        question: 'Does your child need step-by-step guidance for tasks that same-age peers usually do independently?',
        positiveOrientation: false,
      },
      {
        id: 'daily_4',
        question: 'Can your child adjust reasonably well when the daily routine changes unexpectedly?',
        positiveOrientation: true,
      },
      {
        id: 'daily_5',
        question: 'Does your child show awareness of simple safety rules, like not running into the street?',
        positiveOrientation: true,
      },
    ],
  },
];

export function getSectionById(id: string): QuestionnaireSection | undefined {
  return QUESTIONNAIRE_SECTIONS.find((s) => s.id === id);
}
