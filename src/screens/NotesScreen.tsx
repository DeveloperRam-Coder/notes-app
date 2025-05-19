import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar, FAB, ActivityIndicator } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

// Components
import { H4, H5, Body1, Caption } from '../components/ui/Typography';
import { EmptyState } from '../components/ui/EmptyState';
import { NoteCard } from '../components/ui/NoteCard';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

// Mock data for UI demonstration
const mockNotes = [
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
    id: '2',
    title: 'Project Ideas',
    content: 'Mobile app for note taking with AI integration, Smart home dashboard, Fitness tracker with social features',
    date: '2023-05-14T14:45:00',
    isFavorite: false,
    tags: ['work', 'ideas'],
    color: '#BBDEFB',
    hasImages: true,
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

type NotesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const NotesScreen = () => {
  const navigation = useNavigation<NotesScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState(mockNotes);
  
  // Handle search
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, you would filter notes based on the query
  };
  
  // Navigate to note detail
  const handleNotePress = (id: string) => {
    navigation.navigate('NoteDetail', { id });
  };
  
  // Create new note
  const handleCreateNote = () => {
    navigation.navigate('CreateNote');
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <EmptyState
      icon="file-text"
      title="No Notes Yet"
      description="Create your first note by tapping the + button below"
      actionLabel="Create Note"
      onAction={handleCreateNote}
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
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search notes"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[styles.searchBar, { backgroundColor: theme.colors.surface }]}
          iconColor={theme.colors.primary}
          inputStyle={{ color: theme.colors.text }}
          placeholderTextColor={theme.colors.placeholder}
        />
      </View>
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : (
        <FlatList
          data={notes}
          renderItem={renderNoteItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          numColumns={1}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          ListHeaderComponent={notes.length > 0 ? (
            <Animated.View entering={FadeIn.delay(200)}>
              <H5 
                style={[styles.sectionTitle, { color: theme.colors.textSecondary }]}
              >
                {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
              </H5>
            </Animated.View>
          ) : null}
        />
      )}
      
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        color={theme.colors.surface}
        onPress={handleCreateNote}
        accessibilityLabel="Create new note"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    elevation: 0,
    borderRadius: 12,
    height: 48,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  noteItemContainer: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 16,
    bottom: 16,
  },
});

export default NotesScreen;