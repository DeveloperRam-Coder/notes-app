import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from './Typography';
import { useTheme } from '../../theme';
import { useColorScheme } from 'react-native';

const { width } = Dimensions.get('window');

export const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.tabBar,
      { 
        backgroundColor: theme.colors.background,
        paddingBottom: insets.bottom || theme.spacing.sm,
        borderTopColor: theme.colors.disabled,
      }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Animated styles for the tab indicator
        const animatedDotStyle = useAnimatedStyle(() => {
          return {
            width: withTiming(isFocused ? 20 : 0, { duration: 300 }),
            height: 4,
            borderRadius: 2,
            backgroundColor: theme.colors.primary,
            marginTop: theme.spacing.xs,
          };
        });

        // Animated styles for the icon color
        const animatedIconStyle = useAnimatedStyle(() => {
          const color = interpolateColor(
            withTiming(isFocused ? 1 : 0, { duration: 200 }),
            [0, 1],
            [theme.colors.textSecondary, theme.colors.primary]
          );

          return {
            color,
          };
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={`${label} tab`}
            testID={`${label}-tab`}
            onPress={onPress}
            style={styles.tabItem}
            activeOpacity={0.7}
          >
            <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
              {options.tabBarIcon && options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? theme.colors.primary : theme.colors.textSecondary,
                size: 24,
              })}
            </Animated.View>
            
            <Text 
              variant="caption"
              style={{
                color: isFocused ? theme.colors.primary : theme.colors.textSecondary,
                marginTop: theme.spacing.xs / 2,
              }}
            >
              {label as string}
            </Text>
            
            <Animated.View style={animatedDotStyle} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});