import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { colors } from '@/constants/colors';

interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  trackColor?: string;
  height?: number;
}

export function ProgressBar({ progress, color = colors.primary, trackColor = colors.border, height = 8 }: ProgressBarProps) {
  const width = useSharedValue(0);
  const clamped = Math.max(0, Math.min(1, progress));

  useEffect(() => {
    width.value = withTiming(clamped, { duration: 350 });
  }, [clamped, width]);

  const animatedStyle = useAnimatedStyle(() => ({ width: `${width.value * 100}%` }));

  return (
    <View
      style={[styles.track, { backgroundColor: trackColor, height, borderRadius: height / 2 }]}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
    >
      <Animated.View style={[styles.fill, { backgroundColor: color, borderRadius: height / 2 }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', overflow: 'hidden' },
  fill: { height: '100%' },
});
