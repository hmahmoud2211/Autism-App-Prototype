import React from 'react';
import Svg, { Circle, Path, Ellipse, Line } from 'react-native-svg';

export type EyeDirection = 'center' | 'down' | 'up' | 'side' | 'closed' | 'wide';
export type MouthShape = 'smile' | 'bigSmile' | 'frown' | 'open' | 'neutral' | 'wavy';
export type BrowShape = 'none' | 'flat' | 'angledIn' | 'angledUp';

export interface FaceConfig {
  headColor: string;
  eyes: EyeDirection;
  mouth: MouthShape;
  brows?: BrowShape;
}

interface FaceIllustrationProps extends FaceConfig {
  size?: number;
}

const INK = '#17324D';

/**
 * A small purpose-built SVG face avatar — used by Face Finder/Social Scenes
 * (gaze direction) and Emotion Detectives (expression) so answer options show
 * an actual illustrated face rather than a bare emoji/label.
 *
 * Gaze direction is deliberately exaggerated (large pupil travel, a shrunken
 * off-axis pupil so plenty of white shows on the opposite side, a drooping
 * eyelid cue for "down") — subtle pupil shifts don't read at 64-100px, so
 * "looking at you" vs "looking away" needs to be unmistakable at a glance.
 */
export function FaceIllustration({ headColor, eyes, mouth, brows = 'none', size = 72 }: FaceIllustrationProps) {
  const isCenterGaze = eyes === 'center' || eyes === 'wide';
  const eyeRadius = eyes === 'wide' ? 12 : 10;
  const pupilRadius = isCenterGaze ? 5.5 : 3;
  const offset = { center: [0, 0], down: [0, 6.5], up: [0, -6.5], side: [6.5, 0], closed: [0, 0], wide: [0, 0] }[eyes];

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={44} fill={headColor} />

      {/* Eyebrows */}
      {brows === 'flat' && (
        <>
          <Line x1={24} y1={30} x2={40} y2={30} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <Line x1={60} y1={30} x2={76} y2={30} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </>
      )}
      {brows === 'angledIn' && (
        <>
          <Line x1={24} y1={27} x2={40} y2={34} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <Line x1={76} y1={27} x2={60} y2={34} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </>
      )}
      {brows === 'angledUp' && (
        <>
          <Line x1={24} y1={34} x2={40} y2={25} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <Line x1={76} y1={34} x2={60} y2={25} stroke={INK} strokeWidth={3} strokeLinecap="round" />
        </>
      )}

      {/* Eyes */}
      {eyes === 'closed' ? (
        <>
          <Path d="M 22 45 Q 33 53 44 45" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
          <Path d="M 56 45 Q 67 53 78 45" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          {[33, 67].map((cx) => (
            <React.Fragment key={cx}>
              <Circle cx={cx} cy={45} r={eyeRadius} fill="#FFFFFF" stroke="#D8E3EC" strokeWidth={1} />
              <Circle cx={cx + offset[0]} cy={45 + offset[1]} r={pupilRadius} fill={INK} />
              {isCenterGaze && <Circle cx={cx - 1.8} cy={43.2} r={1.6} fill="#FFFFFF" />}
            </React.Fragment>
          ))}
          {eyes === 'down' && (
            <>
              <Path d="M 22 40 Q 33 36 44 40" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
              <Path d="M 56 40 Q 67 36 78 40" stroke={INK} strokeWidth={3} fill="none" strokeLinecap="round" />
            </>
          )}
        </>
      )}

      {/* Mouth */}
      {mouth === 'smile' && <Path d="M 30 65 Q 50 80 70 65" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mouth === 'bigSmile' && <Path d="M 26 63 Q 50 88 74 63 Q 50 76 26 63 Z" fill={INK} opacity={0.9} />}
      {mouth === 'frown' && <Path d="M 30 74 Q 50 60 70 74" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />}
      {mouth === 'open' && <Ellipse cx={50} cy={68} rx={9} ry={11} fill={INK} />}
      {mouth === 'neutral' && <Line x1={34} y1={68} x2={66} y2={68} stroke={INK} strokeWidth={4} strokeLinecap="round" />}
      {mouth === 'wavy' && (
        <Path d="M 30 66 Q 40 59 48 66 Q 56 73 66 66" stroke={INK} strokeWidth={4} fill="none" strokeLinecap="round" />
      )}
    </Svg>
  );
}
