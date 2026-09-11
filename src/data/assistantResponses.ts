export interface AssistantRule {
  id: string;
  keywords: string[];
  response: string;
}

export const SUGGESTED_QUESTIONS: string[] = [
  "My child isn't responding when I call their name. What can I try?",
  'How can I encourage joint attention?',
  'What activities can improve turn taking?',
  'How can I help with sensory overload?',
  "What does today's result mean?",
];

export const ASSISTANT_RULES: AssistantRule[] = [
  {
    id: 'response_to_name',
    keywords: ['name', "isn't responding", 'not responding'],
    response:
      "Responding to name develops gradually and can vary by mood, noise level, or how engaged your child is in an activity. Try calling from a short distance, at their eye level, and pausing 3-5 seconds to give time to respond. Notice: does it happen more in noisy or quiet rooms? If you rarely get a response even during calm, one-on-one moments, that pattern is worth mentioning to a qualified professional.",
  },
  {
    id: 'joint_attention',
    keywords: ['joint attention', 'point', 'share attention', 'shared attention'],
    response:
      "Joint attention is sharing focus on something with another person — like pointing at a bird and looking back at you. To encourage it at home: point at things you find interesting and narrate them, follow your child's point and respond warmly, and play simple back-and-forth games like rolling a ball. Watch for: does your child ever look at you to share excitement, even briefly? Small, brief moments count.",
  },
  {
    id: 'turn_taking',
    keywords: ['turn taking', 'turn-taking', 'my turn', 'your turn'],
    response:
      'Turn-taking builds social reciprocity. Start with simple physical games (rolling a ball, stacking blocks one at a time) and narrate the turns out loud ("my turn... your turn!"). Board games and call-and-response songs work well as skills grow. Keep sessions short and end on a positive note.',
  },
  {
    id: 'sensory_overload',
    keywords: ['sensory overload', 'sensory', 'overwhelmed', 'meltdown', 'loud'],
    response:
      'Sensory overload can happen when sound, light, texture, or crowding become too much at once. Try noise-reducing headphones in loud places, advance warning before transitions, and a quiet retreat space at home. During an overload moment, reducing input (dim lights, quiet space) usually helps more than talking it through in the moment.',
  },
  {
    id: 'todays_result',
    keywords: ['result', 'results', "today's result", 'what does this mean'],
    response:
      "Your results combine questionnaire answers with any completed activities to highlight areas that may benefit from a little more practice or observation — they are not a diagnosis. Open Development Profile from Home to see the full breakdown, and Personalized Plan for suggested next steps.",
  },
  {
    id: 'communication',
    keywords: ['communication', 'talk', 'speech', 'language'],
    response:
      'Supporting communication works best through everyday moments: get to eye level, use short clear sentences, offer choices ("apple or banana?"), and respond to every attempt to communicate — words, sounds, or gestures. See the Communication Tips guide for more.',
  },
  {
    id: 'emotions',
    keywords: ['emotion', 'tantrum', 'upset', 'feelings'],
    response:
      "Naming feelings out loud ('I see you're frustrated') helps build emotional vocabulary. A calm-down space with a few comforting items, and practicing slow breathing during calm moments, can make it easier to use those tools when upset. See the Emotion Regulation guide for more ideas.",
  },
  {
    id: 'specialist',
    keywords: ['specialist', 'professional', 'doctor', 'therapist'],
    response:
      'If you would like additional guidance, our Parent Guide has a "Preparing for a Specialist Visit" section with tips on what to bring and how to prepare. You can also use "Find a Specialist" from this screen.',
  },
];

export const ASSISTANT_FALLBACK =
  "I don't have a specific answer for that yet, but here are a few places to start: try the Parent Guide for step-by-step tips, or ask about joint attention, turn taking, sensory overload, or today's results.";

export function matchAssistantResponse(message: string): string {
  const lower = message.toLowerCase();
  const rule = ASSISTANT_RULES.find((r) => r.keywords.some((k) => lower.includes(k)));
  return rule ? rule.response : ASSISTANT_FALLBACK;
}
