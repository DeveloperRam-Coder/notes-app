import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

// Components
import { H4, Body1 } from './Typography';

// Theme
import { useTheme } from '../../theme';
import { useColorScheme } from 'react-native';

interface EmptyStateProps {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Animated.View 
      entering={FadeIn.duration(400)}
      style={styles.container}
    >
      <Animated.View 
        entering={SlideInUp.delay(200).springify()}
        style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}
      >
        <Feather name={icon} size={40} color={theme.colors.primary} />
      </Animated.View>
      
      <H4 style={[styles.title, { color: theme.colors.text }]}>
        {title}
      </H4>
      
      <Body1 style={[styles.description, { color: theme.colors.textSecondary }]}>
        {description}
      </Body1>
      
      {actionLabel && onAction && (
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: theme.colors.primary }]}
          onPress={onAction}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Body1 style={{ color: theme.colors.surface, fontFamily: theme.typography.fontFamily.medium }}>
            {actionLabel}
          </Body1>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    marginTop: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    marginBottom: 24,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});