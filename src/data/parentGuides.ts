export interface ParentGuideTopic {
  id: string;
  title: string;
  icon: string;
  summary: string;
  tips: string[];
}

export const PARENT_GUIDES: ParentGuideTopic[] = [
  {
    id: 'understanding_development',
    title: 'Understanding Development',
    icon: 'compass-outline',
    summary:
      'Every child develops at their own pace. This guide helps you understand what NUMU observes and why it matters.',
    tips: [
      'Development isn’t a straight line — progress can be uneven across areas.',
      'Small, consistent observations over time are more useful than a single moment.',
      'NUMU highlights patterns worth exploring further, not conclusions.',
      'Celebrate progress at your child’s own pace.',
    ],
  },
  {
    id: 'communication_tips',
    title: 'Communication Tips',
    icon: 'megaphone-outline',
    summary: 'Simple ways to support your child’s understanding and use of language at home.',
    tips: [
      'Get down to your child’s eye level when talking with them.',
      'Use short, clear sentences and pause to give time to respond.',
      'Narrate everyday activities ("We are washing hands now").',
      'Offer choices ("apple or banana?") to encourage communication.',
      'Respond to any communication attempt — words, gestures, or sounds.',
    ],
  },
  {
    id: 'joint_attention_at_home',
    title: 'Joint Attention at Home',
    icon: 'eye-outline',
    summary: 'Everyday ways to build shared attention and pointing/looking together.',
    tips: [
      'Point at things you find interesting and say what they are.',
      'Follow your child’s point or gaze and talk about what they noticed.',
      'Play simple turn-taking games like rolling a ball back and forth.',
      'Read books together and pause to point at pictures.',
    ],
  },
  {
    id: 'emotion_regulation',
    title: 'Emotion Regulation',
    icon: 'happy-outline',
    summary: 'Helping your child recognize, name, and manage big feelings.',
    tips: [
      'Name emotions out loud, for yourself and your child ("I see you’re frustrated").',
      'Create a calm-down space with a few comforting items.',
      'Practice slow breathing together during calm moments so it’s familiar when upset.',
      'Praise effort to self-regulate, not just the outcome.',
      'Keep your own tone calm — children often mirror it.',
    ],
  },
  {
    id: 'sensory_friendly_environment',
    title: 'Sensory-Friendly Environment',
    icon: 'ear-outline',
    summary: 'Small adjustments at home that can make sensory input easier to manage.',
    tips: [
      'Offer noise-reducing headphones in loud environments.',
      'Give advance notice before transitions or new sensory experiences.',
      'Provide a quiet retreat space your child can use when overwhelmed.',
      'Notice which textures, sounds, or lights your child avoids or seeks out.',
    ],
  },
  {
    id: 'building_daily_routines',
    title: 'Building Daily Routines',
    icon: 'home-outline',
    summary: 'Predictable routines can build confidence and independence.',
    tips: [
      'Use a simple visual schedule for morning and bedtime routines.',
      'Break tasks into small, clear steps.',
      'Keep routines consistent, but allow flexibility when needed.',
      'Let your child do as much of the task independently as possible, even if slower.',
    ],
  },
  {
    id: 'play_and_interaction',
    title: 'Play & Interaction',
    icon: 'game-controller-outline',
    summary: 'Play is one of the most natural ways children build skills.',
    tips: [
      'Follow your child’s lead in play before introducing new ideas.',
      'Gradually introduce variety alongside favorite toys or games.',
      'Use pretend play to practice social scripts (ordering food, greetings).',
      'Keep play sessions short and positive rather than long and forced.',
    ],
  },
  {
    id: 'preparing_for_specialist_visit',
    title: 'Preparing for a Specialist Visit',
    icon: 'clipboard-outline',
    summary: 'If you decide to seek professional input, a little preparation goes a long way.',
    tips: [
      'Bring your NUMU development profile and activity history as talking points.',
      'Write down specific examples of behaviors you’ve observed.',
      'Note any changes in routine, environment, or health recently.',
      'Prepare a few questions you want answered during the visit.',
      'Remember: this is a conversation, not a test — you know your child best.',
    ],
  },
];

export function getGuideById(id: string): ParentGuideTopic | undefined {
  return PARENT_GUIDES.find((g) => g.id === id);
}
