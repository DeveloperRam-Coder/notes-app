import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

// Components
import { H4, Body1, Caption } from '../components/ui/Typography';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

type NoteDetailRouteProp = RouteProp<RootStackParamList, 'NoteDetail'>;

// Mock note data for UI demonstration
const mockNote = {
  id: '1',
  title: 'Project Ideas',
  content: 'Here are some project ideas I want to explore:\n\n1. Mobile app for note taking with AI integration\n- Use natural language processing to categorize notes\n- Implement voice-to-text for hands-free note creation\n- Add smart suggestions based on note content\n\n2. Smart home dashboard\n- Centralized control for all smart home devices\n- Energy usage monitoring and optimization\n- Customizable automation routines\n\n3. Fitness tracker with social features\n- Connect with friends for workout challenges\n- Share achievements and progress\n- Personalized workout recommendations',
  date: '2023-05-14T14:45:00',
  updatedDate: '2023-05-16T09:30:00',
  isFavorite: true,
  tags: ['work', 'ideas', 'projects'],
  color: '#BBDEFB',
  images: [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    'https://images.unsplash.com/photo-1542435503-956c469947f6',
  ],
};

const NoteDetailScreen = () => {
  const route = useRoute<NoteDetailRouteProp>();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  // In a real app, you would fetch the note based on route.params.id
  const [note, setNote] = useState(mockNote);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // In a real app, you would update the note in the database
  };
  
  // Edit note
  const handleEditNote = () => {
    // In a real app, you would navigate to the edit screen
    // navigation.navigate('EditNote', { id: note.id });
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeIn.duration(300)}>
          <View style={styles.headerContainer}>
            <H4 style={{ color: theme.colors.text }}>{note.title}</H4>
            
            <View style={styles.metaContainer}>
              <Caption style={{ color: theme.colors.textSecondary }}>
                Last updated: {formatDate(note.updatedDate)}
              </Caption>
              
              <TouchableOpacity
                onPress={toggleFavorite}
                style={styles.favoriteButton}
                accessibilityRole="button"
                accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Feather 
                  name={isFavorite ? "star" : "star-o"} 
                  size={20} 
                  color={isFavorite ? theme.colors.secondary : theme.colors.textSecondary} 
                />
              </TouchableOpacity>
            </View>
          </View>
          
          {note.tags && note.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              {note.tags.map((tag, index) => (
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
                    }}
                  >
                    {tag}
                  </Caption>
                </View>
              ))}
            </View>
          )}
          
          {note.images && note.images.length > 0 && (
            <Animated.View 
              entering={FadeInUp.delay(200).duration(400)}
              style={styles.imagesContainer}
            >
              {note.images.map((image, index) => (
                <Image 
                  key={index}
                  source={{ uri: image }}
                  style={styles.image}
                  accessibilityLabel={`Image ${index + 1} in note`}
                />
              ))}
            </Animated.View>
          )}
          
          <Animated.View 
            entering={FadeInUp.delay(300).duration(400)}
            style={styles.contentTextContainer}
          >
            <Body1 style={{ color: theme.colors.text, lineHeight: 24 }}>
              {note.content}
            </Body1>
          </Animated.View>
        </Animated.View>
      </ScrollView>
      
      <View 
        style={[
          styles.fabContainer, 
          { 
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.disabled,
          }
        ]}
      >
        <TouchableOpacity
          style={[styles.editButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleEditNote}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Edit note"
        >
          <Feather name="edit-2" size={20} color={theme.colors.surface} style={{ marginRight: 8 }} />
          <Body1 style={{ color: theme.colors.surface, fontFamily: theme.typography.fontFamily.medium }}>
            Edit Note
          </Body1>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 16,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  favoriteButton: {
    padding: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  contentTextContainer: {
    marginBottom: 24,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopWidth: 0.5,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
});

export default NoteDetailScreen;