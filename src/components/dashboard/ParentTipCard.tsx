import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/common/Card';
import { AppText } from '@/components/common/AppText';
import { colors } from '@/constants/colors';
import { spacing } from '@/constants/spacing';

interface ParentTipCardProps {
  title: string;
  tip: string;
  onPress?: () => void;
}

export function ParentTipCard({ title, tip, onPress }: ParentTipCardProps) {
  return (
    <Card onPress={onPress} style={styles.card} accessibilityLabel={`Parent tip: ${title}`}>
      <View style={styles.header}>
        <Ionicons name="bulb-outline" size={18} color={colors.orange} />
        <AppText variant="bodyMedium" style={styles.title}>
          {title}
        </AppText>
      </View>
      <AppText variant="bodySmall" color={colors.textSecondary}>
        {tip}
      </AppText>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFF8EC' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  title: { marginLeft: spacing.xs },
});
