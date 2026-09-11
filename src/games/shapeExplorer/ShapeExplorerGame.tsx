import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { ZoomIn } from 'react-native-reanimated';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing, radius } from '@/constants/spacing';
import { shuffle } from '@/games/engine/trialUtils';
import type { GameEngineProps } from '@/games/engine/types';

interface ShapeDef {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}

const SHAPE_POOL: ShapeDef[] = [
  { id: 'square', icon: 'square-outline', label: 'Square' },
  { id: 'circle', icon: 'ellipse-outline', label: 'Circle' },
  { id: 'triangle', icon: 'triangle-outline', label: 'Triangle' },
  { id: 'diamond', icon: 'diamond-outline', label: 'Diamond' },
  { id: 'star', icon: 'star-outline', label: 'Star' },
];

function shapeCountForLevel(level: 1 | 2 | 3): number {
  return level === 1 ? 3 : level === 2 ? 4 : 5;
}

/** Powers Shape Explorer, Free Play, Build Together, and Imagination Challenge — all a tap-to-place shape-matching task. */
export function ShapeExplorerGame({ level, onProgress, onFinish }: GameEngineProps) {
  const shapes = useMemo(() => shuffle(SHAPE_POOL).slice(0, shapeCountForLevel(level.level)), [level.level]);
  const [palette, setPalette] = useState<ShapeDef[]>(() => shuffle(shapes));
  const [placed, setPlaced] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [wrongSlotId, setWrongSlotId] = useState<string | null>(null);

  const placedCount = Object.keys(placed).length;

  function handleSelectPaletteShape(shape: ShapeDef) {
    setSelectedId((current) => (current === shape.id ? null : shape.id));
  }

  function handleSelectSlot(slot: ShapeDef) {
    if (placed[slot.id] || !selectedId) return;
    setAttempts((a) => a + 1);
    if (selectedId === slot.id) {
      const nextPlaced = { ...placed, [slot.id]: true };
      setPlaced(nextPlaced);
      setPalette((p) => p.filter((s) => s.id !== selectedId));
      setSelectedId(null);
      onProgress(Object.keys(nextPlaced).length, shapes.length);

      if (Object.keys(nextPlaced).length === shapes.length) {
        const totalAttempts = attempts + 1;
        const accuracy = Math.min(1, shapes.length / Math.max(totalAttempts, shapes.length));
        onFinish({
          score: Math.round(accuracy * 100),
          attempts: totalAttempts,
          success: totalAttempts <= shapes.length + 2,
        });
      }
    } else {
      setWrongSlotId(slot.id);
      setTimeout(() => setWrongSlotId(null), 400);
    }
  }

  return (
    <View style={styles.container}>
      <AppText variant="bodyMedium" color={colors.textSecondary} center style={styles.instructions}>
        Tap a shape, then tap where it belongs.
      </AppText>

      <View style={styles.slotRow}>
        {shapes.map((slot) => (
          <View
            key={slot.id}
            style={[
              styles.slot,
              placed[slot.id] && styles.slotFilled,
              wrongSlotId === slot.id && styles.slotWrong,
              selectedId && !placed[slot.id] && styles.slotHighlight,
            ]}
          >
            <Pressable
              onPress={() => handleSelectSlot(slot)}
              disabled={!!placed[slot.id]}
              accessibilityRole="button"
              accessibilityLabel={`Slot for ${slot.label}`}
              style={styles.slotPressable}
            >
              <Ionicons
                name={slot.icon}
                size={30}
                color={placed[slot.id] ? colors.green : colors.border}
              />
            </Pressable>
          </View>
        ))}
      </View>

      <View style={styles.paletteRow}>
        {palette.map((shape) => (
          <Animated.View key={shape.id} entering={ZoomIn.duration(150)}>
            <Pressable
              onPress={() => handleSelectPaletteShape(shape)}
              accessibilityRole="button"
              accessibilityLabel={shape.label}
              style={[styles.paletteItem, selectedId === shape.id && styles.paletteItemSelected]}
            >
              <Ionicons name={shape.icon} size={30} color={selectedId === shape.id ? colors.textInverse : colors.primary} />
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  instructions: { marginBottom: spacing.xl },
  slotRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: spacing.md, marginBottom: spacing.xxl },
  slot: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotPressable: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  slotFilled: { borderStyle: 'solid', borderColor: colors.green, backgroundColor: `${colors.green}14` },
  slotWrong: { borderColor: colors.red },
  slotHighlight: { borderColor: colors.primary },
  paletteRow: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: spacing.md },
  paletteItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paletteItemSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
});
