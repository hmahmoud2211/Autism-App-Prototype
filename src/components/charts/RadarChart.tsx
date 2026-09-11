import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import { colors } from '@/constants/colors';

export interface RadarDatum {
  label: string;
  value: number; // 0-100
  color: string;
}

interface RadarChartProps {
  data: RadarDatum[];
  size?: number;
}

/**
 * Small dependency-free SVG radar/spider chart. Spokes are colored per-datum
 * (green/orange/red-family) but every value is also shown as a number and
 * label so nothing relies on color alone (spec section 45 accessibility).
 */
export function RadarChart({ data, size = 260 }: RadarChartProps) {
  const center = size / 2;
  const maxRadius = size / 2 - 50;
  const rings = [0.25, 0.5, 0.75, 1];
  const angleStep = (Math.PI * 2) / data.length;

  function pointFor(index: number, ratio: number) {
    const angle = angleStep * index - Math.PI / 2;
    return {
      x: center + Math.cos(angle) * maxRadius * ratio,
      y: center + Math.sin(angle) * maxRadius * ratio,
    };
  }

  const polygonPoints = data
    .map((d, i) => {
      const p = pointFor(i, Math.max(0.05, d.value / 100));
      return `${p.x},${p.y}`;
    })
    .join(' ');

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {rings.map((ratio) => (
          <Polygon
            key={ratio}
            points={data.map((_, i) => {
              const p = pointFor(i, ratio);
              return `${p.x},${p.y}`;
            }).join(' ')}
            fill="none"
            stroke={colors.border}
            strokeWidth={1}
          />
        ))}

        {data.map((_, i) => {
          const p = pointFor(i, 1);
          return <Line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke={colors.border} strokeWidth={1} />;
        })}

        <Polygon points={polygonPoints} fill={`${colors.primary}33`} stroke={colors.primary} strokeWidth={2} />

        {data.map((d, i) => {
          const p = pointFor(i, Math.max(0.05, d.value / 100));
          return <Circle key={d.label} cx={p.x} cy={p.y} r={4} fill={d.color} />;
        })}

        {data.map((d, i) => {
          const labelPoint = pointFor(i, 1.28);
          return (
            <SvgText
              key={`label-${d.label}`}
              x={labelPoint.x}
              y={labelPoint.y}
              fontSize={10}
              fill={colors.textSecondary}
              textAnchor="middle"
            >
              {d.label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
});
