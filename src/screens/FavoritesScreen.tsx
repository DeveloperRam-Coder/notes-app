import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';

// Components
import { H5 } from '../components/ui/Typography';
import { EmptyState } from '../components/ui/EmptyState';
import { NoteCard } from '../components/ui/NoteCard';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

// Mock data for UI demonstration - filtered for favorites only
const mockFavorites = [
  {
    id: '1',
    title: 'Shopping List',
    content: 'Milk, Eggs, Bread, Cheese, Apples',
    date: '2023-05-15T10:30:00',
    isFavorite: true,
    tags: ['shopping', 'groceries'],
    color: '#FFE0B2',
    hasImages: false,
  },
  {
    id: '3',
    title: 'Meeting Notes',
    content: 'Discussed Q2 goals, Assigned tasks to team members, Set deadline for next milestone',
    date: '2023-05-13T09:15:00',
    isFavorite: true,
    tags: ['work', 'meeting'],
    color: '#C8E6C9',
    hasImages: false,
  },
];

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const FavoritesScreen = () => {
  const navigation = useNavigation<FavoritesScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  const [favorites, setFavorites] = useState(mockFavorites);
  
  // Navigate to note detail
  const handleNotePress = (id: string) => {
    navigation.navigate('NoteDetail', { id });
  };
  
  // Navigate to all notes
  const handleViewAllNotes = () => {
    navigation.navigate('Notes');
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <EmptyState
      icon="star"
      title="No Favorites Yet"
      description="Mark notes as favorites to see them here for quick access"
      actionLabel="View All Notes"
      onAction={handleViewAllNotes}
    />
  );
  
  // Render note item
  const renderNoteItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).springify()}
      style={styles.noteItemContainer}
    >
      <NoteCard
        note={item}
        onPress={() => handleNotePress(item.id)}
        style={{ backgroundColor: item.color }}
      />
    </Animated.View>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <FlatList
        data={favorites}
        renderItem={renderNoteItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
        numColumns={1}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        ListHeaderComponent={favorites.length > 0 ? (
          <Animated.View entering={FadeInDown.delay(200)}>
            <H5 
              style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
            >
              {favorites.length} {favorites.length === 1 ? 'Favorite' : 'Favorites'}
            </H5>
          </Animated.View>
        ) : null}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  noteItemContainer: {
    marginBottom: 16,
  },
});

export default FavoritesScreen;