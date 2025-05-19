import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { useColorScheme } from 'react-native';

type TypographyVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' 
  | 'body1' | 'body2' | 'caption' | 'button' | 'overline';

interface TextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  variant = 'body1',
  color,
  align = 'left',
  style,
  children,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const getTypographyStyles = (variant: TypographyVariant) => {
    switch (variant) {
      case 'h1':
        return {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: theme.typography.fontSize.h1,
          lineHeight: theme.typography.fontSize.h1 * 1.2,
        };
      case 'h2':
        return {
          fontFamily: theme.typography.fontFamily.bold,
          fontSize: theme.typography.fontSize.h2,
          lineHeight: theme.typography.fontSize.h2 * 1.2,
        };
      case 'h3':
        return {
          fontFamily: theme.typography.fontFamily.semiBold,
          fontSize: theme.typography.fontSize.h3,
          lineHeight: theme.typography.fontSize.h3 * 1.2,
        };
      case 'h4':
        return {
          fontFamily: theme.typography.fontFamily.semiBold,
          fontSize: theme.typography.fontSize.h4,
          lineHeight: theme.typography.fontSize.h4 * 1.2,
        };
      case 'h5':
        return {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.h5,
          lineHeight: theme.typography.fontSize.h5 * 1.2,
        };
      case 'h6':
        return {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.h6,
          lineHeight: theme.typography.fontSize.h6 * 1.2,
        };
      case 'body1':
        return {
          fontFamily: theme.typography.fontFamily.regular,
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.fontSize.md * 1.5,
        };
      case 'body2':
        return {
          fontFamily: theme.typography.fontFamily.regular,
          fontSize: theme.typography.fontSize.sm,
          lineHeight: theme.typography.fontSize.sm * 1.5,
        };
      case 'caption':
        return {
          fontFamily: theme.typography.fontFamily.regular,
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.fontSize.xs * 1.5,
        };
      case 'button':
        return {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.fontSize.md * 1.5,
          textTransform: 'uppercase' as const,
        };
      case 'overline':
        return {
          fontFamily: theme.typography.fontFamily.medium,
          fontSize: theme.typography.fontSize.xs,
          lineHeight: theme.typography.fontSize.xs * 1.5,
          textTransform: 'uppercase' as const,
          letterSpacing: 1,
        };
      default:
        return {
          fontFamily: theme.typography.fontFamily.regular,
          fontSize: theme.typography.fontSize.md,
          lineHeight: theme.typography.fontSize.md * 1.5,
        };
    }
  };

  return (
    <RNText
      style={[
        getTypographyStyles(variant),
        {
          color: color || theme.colors.text,
          textAlign: align,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
};

// Export other typography components for convenience
export const H1: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h1" {...props} />;
export const H2: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h2" {...props} />;
export const H3: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h3" {...props} />;
export const H4: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h4" {...props} />;
export const H5: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h5" {...props} />;
export const H6: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="h6" {...props} />;
export const Body1: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="body1" {...props} />;
export const Body2: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="body2" {...props} />;
export const Caption: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="caption" {...props} />;
export const Button: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="button" {...props} />;
export const Overline: React.FC<Omit<TextProps, 'variant'>> = (props) => <Text variant="overline" {...props} />;