/**
 * NUMU design tokens — colors.
 * Keep all hex values here; components should reference `colors.*`, never hardcode hex.
 */
export const colors = {
  primary: '#169FE6',
  primaryDark: '#0E7FC0',
  navy: '#163B6D',
  teal: '#27B7A9',
  green: '#5BCB8A',
  orange: '#FFB347',
  red: '#FF6B6B',
  purple: '#9B7AE5',

  background: '#F7FAFC',
  card: '#FFFFFF',
  border: '#E4EBF2',

  text: '#17324D',
  textSecondary: '#73859A',
  textInverse: '#FFFFFF',

  // Non-diagnostic score bands — never label these as clinical severity.
  band: {
    developing: '#5BCB8A', // "Developing Well"
    practice: '#FFB347', // "Continue Practice"
    support: '#FF6B6B', // "May Benefit From Support"
    insufficient: '#B9C4D0', // not enough data yet
  },

  overlay: 'rgba(23, 50, 77, 0.55)',
  white: '#FFFFFF',
  black: '#0B1B2B',
} as const;

export type ColorToken = keyof typeof colors;
