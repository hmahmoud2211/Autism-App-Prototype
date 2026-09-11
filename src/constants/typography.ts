/**
 * NUMU typography scale.
 * Headings use Nunito (rounded, friendly); body copy uses Inter (readable).
 * Font family keys match the ones registered via useFonts in App.tsx.
 */
export const fontFamily = {
  headingBold: 'Nunito_800ExtraBold',
  headingSemiBold: 'Nunito_700Bold',
  headingRegular: 'Nunito_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
} as const;

export interface TypeStyle {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
}

export const typography: Record<string, TypeStyle> = {
  display: { fontFamily: fontFamily.headingBold, fontSize: 30, lineHeight: 38 },
  h1: { fontFamily: fontFamily.headingBold, fontSize: 25, lineHeight: 32 },
  h2: { fontFamily: fontFamily.headingSemiBold, fontSize: 21, lineHeight: 27 },
  h3: { fontFamily: fontFamily.headingSemiBold, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: fontFamily.body, fontSize: 16, lineHeight: 23 },
  bodyMedium: { fontFamily: fontFamily.bodyMedium, fontSize: 16, lineHeight: 23 },
  bodySmall: { fontFamily: fontFamily.body, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fontFamily.bodyMedium, fontSize: 12, lineHeight: 16 },
  button: { fontFamily: fontFamily.bodySemiBold, fontSize: 16, lineHeight: 20 },
};
