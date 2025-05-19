import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../theme';
import { useColorScheme, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Screens
import NotesScreen from '../screens/NotesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NoteDetailScreen from '../screens/NoteDetailScreen';
import CreateNoteScreen from '../screens/CreateNoteScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

// Components
import { AnimatedTabBar } from '../components/ui/AnimatedTabBar';

// Types
export type RootStackParamList = {
  Main: undefined;
  NoteDetail: { id: string };
  CreateNote: undefined;
  Onboarding: undefined;
};

export type MainTabParamList = {
  Notes: undefined;
  Favorites: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Main tab navigator
const MainTabNavigator = () => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.colors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          fontFamily: theme.typography.fontFamily.semiBold,
          fontSize: theme.typography.fontSize.lg,
          color: theme.colors.text,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Feather.glyphMap = 'file-text';

          if (route.name === 'Notes') {
            iconName = 'file-text';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          } else if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopColor: theme.colors.background,
          paddingBottom: Platform.OS === 'ios' ? theme.spacing.sm : theme.spacing.xs,
          height: 60,
        },
        tabBarLabelStyle: {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.xs,
          marginBottom: theme.spacing.xs,
        },
      })}
    >
      <Tab.Screen 
        name="Notes" 
        component={NotesScreen} 
        options={{ title: 'My Notes' }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ title: 'Favorites' }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
    </Tab.Navigator>
  );
};

// Check if user has completed onboarding
const AppNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  
  // Simulate checking if it's first launch
  useEffect(() => {
    // In a real app, you would check AsyncStorage
    // For demo purposes, we'll just set it to true
    setIsFirstLaunch(true);
  }, []);

  // Show loading while checking first launch status
  if (isFirstLaunch === null) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={isFirstLaunch ? 'Onboarding' : 'Main'}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Main" component={MainTabNavigator} />
      <Stack.Screen 
        name="NoteDetail" 
        component={NoteDetailScreen} 
        options={{
          headerShown: true,
          title: 'Note Details',
        }}
      />
      <Stack.Screen 
        name="CreateNote" 
        component={CreateNoteScreen} 
        options={{
          headerShown: true,
          title: 'Create Note',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;