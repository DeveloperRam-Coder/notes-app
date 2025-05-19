import { DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { DefaultTheme as PaperLightTheme, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

// Color palette
const palette = {
  // Primary colors
  primary: {
    main: '#4F6BFF', // Blue
    light: '#7B8FFF',
    dark: '#3A56E8',
    contrast: '#FFFFFF',
  },
  // Secondary colors
  secondary: {
    main: '#FF9F45', // Orange
    light: '#FFB673',
    dark: '#E88A30',
    contrast: '#FFFFFF',
  },
  // Accent colors
  accent: {
    main: '#FF4F8B', // Pink
    light: '#FF7AA7',
    dark: '#E83A76',
    contrast: '#FFFFFF',
  },
  // Error colors
  error: {
    main: '#FF4F4F', // Red
    light: '#FF7A7A',
    dark: '#E83A3A',
    contrast: '#FFFFFF',
  },
  // Neutral colors
  neutral: {
    100: '#FFFFFF',
    200: '#F5F5F5',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    1000: '#121212',
  },
};

// Spacing units
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Typography
const typography = {
  fontFamily: {
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    h1: 32,
    h2: 28,
    h3: 24,
    h4: 20,
    h5: 18,
    h6: 16,
  },
};

// Light theme
export const lightTheme = {
  ...NavigationLightTheme,
  ...PaperLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    ...PaperLightTheme.colors,
    primary: palette.primary.main,
    primaryLight: palette.primary.light,
    primaryDark: palette.primary.dark,
    secondary: palette.secondary.main,
    secondaryLight: palette.secondary.light,
    secondaryDark: palette.secondary.dark,
    accent: palette.accent.main,
    error: palette.error.main,
    background: palette.neutral[100],
    surface: palette.neutral[100],
    text: palette.neutral[900],
    textSecondary: palette.neutral[600],
    disabled: palette.neutral[400],
    placeholder: palette.neutral[500],
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: palette.accent.main,
  },
  spacing,
  typography,
  dark: false,
};

// Dark theme
export const darkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: palette.primary.main,
    primaryLight: palette.primary.light,
    primaryDark: palette.primary.dark,
    secondary: palette.secondary.main,
    secondaryLight: palette.secondary.light,
    secondaryDark: palette.secondary.dark,
    accent: palette.accent.main,
    error: palette.error.main,
    background: palette.neutral[1000],
    surface: palette.neutral[900],
    text: palette.neutral[100],
    textSecondary: palette.neutral[400],
    disabled: palette.neutral[700],
    placeholder: palette.neutral[600],
    backdrop: 'rgba(0, 0, 0, 0.7)',
    notification: palette.accent.main,
  },
  spacing,
  typography,
  dark: true,
};

// Export theme type
export type Theme = typeof lightTheme;

// Custom hook to use theme
export const useTheme = () => {
  return { lightTheme, darkTheme };
};