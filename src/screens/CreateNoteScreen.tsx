import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput, Chip, Button, HelperText } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';

// Components
import { H5, Body1, Caption } from '../components/ui/Typography';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

// Mock data for tag suggestions
const tagSuggestions = ['work', 'personal', 'ideas', 'shopping', 'travel', 'health', 'finance'];

const CreateNoteScreen = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Validation state
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  
  // Handle tag input
  const handleTagInput = (text: string) => {
    setTagInput(text);
  };
  
  // Add tag
  const addTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim().toLowerCase())) {
      setTags([...tags, tag.trim().toLowerCase()]);
      setTagInput('');
    }
  };
  
  // Remove tag
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };
  
  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Add image
  const addImage = () => {
    // In a real app, you would use image picker
    // For demo, we'll add a placeholder image
    const placeholderImage = 'https://images.unsplash.com/photo-1512314889357-e157c22f938d';
    setImages([...images, placeholderImage]);
  };
  
  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    if (!content.trim()) {
      setContentError('Content is required');
      isValid = false;
    } else {
      setContentError('');
    }
    
    return isValid;
  };
  
  // Save note
  const saveNote = () => {
    if (validateForm()) {
      // In a real app, you would save the note to the database
      // For demo, we'll just navigate back
      navigation.goBack();
    }
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View entering={FadeIn.duration(300)}>
            <View style={styles.formGroup}>
              <TextInput
                label="Title"
                value={title}
                onChangeText={text => {
                  setTitle(text);
                  if (text.trim()) setTitleError('');
                }}
                mode="outlined"
                error={!!titleError}
                style={[styles.input, { backgroundColor: theme.colors.surface }]}
                outlineColor={theme.colors.disabled}
                activeOutlineColor={theme.colors.primary}
                theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder } }}
                accessibilityLabel="Note title"
              />
              {titleError ? (
                <HelperText type="error" visible={!!titleError}>
                  {titleError}
                </HelperText>
              ) : null}
            </View>
            
            <View style={styles.formGroup}>
              <TextInput
                label="Content"
                value={content}
                onChangeText={text => {
                  setContent(text);
                  if (text.trim()) setContentError('');
                }}
                mode="outlined"
                error={!!contentError}
                multiline
                numberOfLines={8}
                style={[styles.input, styles.textArea, { backgroundColor: theme.colors.surface }]}
                outlineColor={theme.colors.disabled}
                activeOutlineColor={theme.colors.primary}
                theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder } }}
                accessibilityLabel="Note content"
              />
              {contentError ? (
                <HelperText type="error" visible={!!contentError}>
                  {contentError}
                </HelperText>
              ) : null}
            </View>
            
            <Animated.View 
              entering={SlideInUp.delay(200).duration(400)}
              style={styles.formGroup}
            >
              <H5 style={[styles.sectionTitle, { color: theme.colors.text }]}>Tags</H5>
              
              <View style={styles.tagsInputContainer}>
                <TextInput
                  label="Add tags"
                  value={tagInput}
                  onChangeText={handleTagInput}
                  onSubmitEditing={() => addTag(tagInput)}
                  mode="outlined"
                  style={[styles.input, { flex: 1, backgroundColor: theme.colors.surface }]}
                  outlineColor={theme.colors.disabled}
                  activeOutlineColor={theme.colors.primary}
                  theme={{ colors: { text: theme.colors.text, placeholder: theme.colors.placeholder } }}
                  right={<TextInput.Icon icon="plus" onPress={() => addTag(tagInput)} />}
                  accessibilityLabel="Add tags"
                />
              </View>
              
              <View style={styles.tagSuggestions}>
                <Caption style={{ color: theme.colors.textSecondary, marginBottom: 8 }}>
                  Suggestions:
                </Caption>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tagSuggestionsContent}
                >
                  {tagSuggestions.map((tag, index) => (
                    <TouchableOpacity 
                      key={index} 
                      onPress={() => addTag(tag)}
                      style={[
                        styles.tagSuggestion,
                        { 
                          backgroundColor: theme.dark ? theme.colors.surface : theme.colors.primaryLight,
                          borderColor: theme.colors.primary,
                        }
                      ]}
                      disabled={tags.includes(tag)}
                      accessibilityLabel={`Add ${tag} tag`}
                    >
                      <Caption 
                        style={{
                          color: tags.includes(tag) 
                            ? theme.colors.disabled 
                            : theme.colors.primary,
                        }}
                      >
                        {tag}
                      </Caption>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {tags.length > 0 && (
                <View style={styles.selectedTags}>
                  {tags.map((tag, index) => (
                    <Chip
                      key={index}
                      onClose={() => removeTag(index)}
                      style={[
                        styles.tagChip,
                        { backgroundColor: theme.dark ? theme.colors.primaryDark : theme.colors.primaryLight }
                      ]}
                      textStyle={{ color: theme.dark ? theme.colors.text : theme.colors.primary }}
                      accessibilityLabel={`${tag} tag, double tap to remove`}
                    >
                      {tag}
                    </Chip>
                  ))}
                </View>
              )}
            </Animated.View>
            
            <Animated.View 
              entering={SlideInUp.delay(300).duration(400)}
              style={styles.formGroup}
            >
              <View style={styles.sectionHeader}>
                <H5 style={[styles.sectionTitle, { color: theme.colors.text }]}>Images</H5>
                <TouchableOpacity 
                  onPress={addImage}
                  style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
                  accessibilityLabel="Add image"
                >
                  <Feather name="plus" size={16} color={theme.colors.surface} />
                  <Body1 style={{ color: theme.colors.surface, marginLeft: 4, fontSize: 12 }}>
                    Add Image
                  </Body1>
                </TouchableOpacity>
              </View>
              
              {images.length > 0 && (
                <View style={styles.imagesContainer}>
                  {images.map((image, index) => (
                    <View key={index} style={styles.imageContainer}>
                      <Image source={{ uri: image }} style={styles.image} />
                      <TouchableOpacity 
                        style={[styles.removeImageButton, { backgroundColor: theme.colors.error }]}
                        onPress={() => removeImage(index)}
                        accessibilityLabel="Remove image"
                      >
                        <Feather name="x" size={16} color={theme.colors.surface} />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </Animated.View>
            
            <Animated.View 
              entering={SlideInUp.delay(400).duration(400)}
              style={styles.formGroup}
            >
              <TouchableOpacity 
                style={styles.favoriteContainer}
                onPress={toggleFavorite}
                accessibilityRole="checkbox"
                accessibilityLabel="Mark as favorite"
                accessibilityState={{ checked: isFavorite }}
              >
                <Feather 
                  name={isFavorite ? "star" : "star-o"} 
                  size={20} 
                  color={isFavorite ? theme.colors.secondary : theme.colors.textSecondary} 
                />
                <Body1 style={{ color: theme.colors.text, marginLeft: 8 }}>
                  Add to favorites
                </Body1>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
        
        <View 
          style={[
            styles.footer, 
            { 
              backgroundColor: theme.colors.background,
              borderTopColor: theme.colors.disabled,
            }
          ]}
        >
          <Button 
            mode="text" 
            onPress={() => navigation.goBack()}
            style={styles.footerButton}
            labelStyle={{ color: theme.colors.textSecondary }}
            accessibilityLabel="Cancel"
          >
            Cancel
          </Button>
          <Button 
            mode="contained" 
            onPress={saveNote}
            style={[styles.footerButton, { backgroundColor: theme.colors.primary }]}
            labelStyle={{ color: theme.colors.surface }}
            accessibilityLabel="Save note"
          >
            Save Note
          </Button>
        </View>
      </KeyboardAvoidingView>
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
  formGroup: {
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tagsInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagSuggestions: {
    marginTop: 12,
  },
  tagSuggestionsContent: {
    paddingRight: 16,
  },
  tagSuggestion: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    borderWidth: 1,
  },
  selectedTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
  },
  tagChip: {
    marginRight: 8,
    marginBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginRight: '4%',
    marginBottom: 12,
    position: 'relative',
  },
  imageContainer: {
    width: '48%',
    aspectRatio: 1,
    marginRight: '4%',
    marginBottom: 12,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 0.5,
  },
  footerButton: {
    minWidth: 120,
  },
});

export default CreateNoteScreen;