import React, { useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';

// Components
import { H3, H5, Body1 } from '../components/ui/Typography';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

// Onboarding slides data
const slides = [
  {
    id: '1',
    title: 'Welcome to Notes App',
    description: 'A simple and beautiful way to capture your thoughts, ideas, and memories.',
    icon: 'book-open',
  },
  {
    id: '2',
    title: 'Organize Your Notes',
    description: 'Create categories, add tags, and pin important notes for quick access.',
    icon: 'layers',
  },
  {
    id: '3',
    title: 'Add Rich Content',
    description: 'Include images, checklists, and formatted text to make your notes more expressive.',
    icon: 'image',
  },
  {
    id: '4',
    title: 'Ready to Start?',
    description: 'Your notes are stored securely on your device and available offline anytime.',
    icon: 'check-circle',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Handle skip
  const handleSkip = () => {
    navigation.replace('Main');
  };
  
  // Handle next
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('Main');
    }
  };
  
  // Render slide item
  const renderSlideItem = ({ item, index }: { item: typeof slides[0]; index: number }) => (
    <Animated.View 
      entering={SlideInRight.delay(index * 100).springify()}
      style={[styles.slide, { width }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: theme.colors.primaryLight }]}>
        <Feather name={item.icon as keyof typeof Feather.glyphMap} size={60} color={theme.colors.primary} />
      </View>
      
      <H3 style={[styles.title, { color: theme.colors.text }]}>
        {item.title}
      </H3>
      
      <Body1 style={[styles.description, { color: theme.colors.textSecondary }]}>
        {item.description}
      </Body1>
    </Animated.View>
  );
  
  // Render pagination dots
  const renderPaginationDots = () => {
    return slides.map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          {
            backgroundColor: index === currentIndex ? theme.colors.primary : theme.colors.disabled,
            width: index === currentIndex ? 20 : 8,
          },
        ]}
      />
    ));
  };
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip} accessibilityLabel="Skip onboarding">
          <Body1 style={{ color: theme.colors.primary }}>
            Skip
          </Body1>
        </TouchableOpacity>
      </View>
      
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlideItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />
      
      <Animated.View 
        entering={FadeIn.delay(500)}
        style={styles.footer}
      >
        <View style={styles.paginationContainer}>
          {renderPaginationDots()}
        </View>
        
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: theme.colors.primary }]}
          onPress={handleNext}
          activeOpacity={0.8}
          accessibilityLabel={currentIndex === slides.length - 1 ? "Get started" : "Next slide"}
        >
          <Body1 style={{ color: theme.colors.surface, fontFamily: theme.typography.fontFamily.medium }}>
            {currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          </Body1>
          <Feather 
            name={currentIndex === slides.length - 1 ? 'check' : 'arrow-right'} 
            size={20} 
            color={theme.colors.surface} 
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  skipContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    maxWidth: '80%',
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingScreen;