import React from 'react';
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

// Components
import { H5, Body2, Caption } from './Typography';

// Theme
import { useTheme } from '../../theme';
import { useColorScheme } from 'react-native';

interface NoteCardProps {
  note: {
    id: string;
    title: string;
    content: string;
    date: string;
    isFavorite: boolean;
    tags?: string[];
    hasImages?: boolean;
  };
  onPress: () => void;
  style?: ViewStyle;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onPress, style }) => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Note: ${note.title}`}
    >
      <Animated.View 
        entering={FadeIn.duration(300)}
        style={[
          styles.card,
          { 
            backgroundColor: style?.backgroundColor || theme.colors.surface,
            shadowColor: theme.dark ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
          },
          style,
        ]}
      >
        <View style={styles.cardHeader}>
          <H5 
            numberOfLines={1} 
            style={[styles.title, { color: theme.dark ? theme.colors.text : theme.colors.text }]}
          >
            {note.title}
          </H5>
          {note.isFavorite && (
            <Feather name="star" size={16} color={theme.colors.secondary} />
          )}
        </View>
        
        <Body2 
          numberOfLines={3} 
          style={[styles.content, { color: theme.dark ? theme.colors.textSecondary : theme.colors.text }]}
        >
          {note.content}
        </Body2>
        
        <View style={styles.cardFooter}>
          <Caption style={{ color: theme.colors.textSecondary }}>
            {formatDate(note.date)}
          </Caption>
          
          <View style={styles.metaContainer}>
            {note.hasImages && (
              <View style={styles.metaItem}>
                <Feather name="image" size={12} color={theme.colors.textSecondary} />
              </View>
            )}
            
            {note.tags && note.tags.length > 0 && (
              <View style={styles.tagContainer}>
                {note.tags.slice(0, 2).map((tag, index) => (
                  <View 
                    key={index}
                    style={[
                      styles.tag,
                      { backgroundColor: theme.dark ? theme.colors.primaryDark : theme.colors.primaryLight }
                    ]}
                  >
                    <Caption 
                      style={{
                        color: theme.dark ? theme.colors.text : theme.colors.primary,
                        fontSize: 10,
                      }}
                    >
                      {tag}
                    </Caption>
                  </View>
                ))}
                {note.tags.length > 2 && (
                  <Caption style={{ color: theme.colors.textSecondary, marginLeft: 4 }}>
                    +{note.tags.length - 2}
                  </Caption>
                )}
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  content: {
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    marginLeft: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  tag: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
});