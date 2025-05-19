import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn } from 'react-native-reanimated';

// Components
import { H4, H5, Body1, Body2 } from '../components/ui/Typography';

// Theme
import { useTheme } from '../theme';
import { useColorScheme } from 'react-native';

const SettingsScreen = () => {
  const colorScheme = useColorScheme();
  const { lightTheme, darkTheme } = useTheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: colorScheme === 'dark',
    notifications: true,
    largeText: false,
    highContrast: false,
    autoSave: true,
  });
  
  // Toggle setting
  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  // Render setting item
  const renderSettingItem = (
    icon: keyof typeof Feather.glyphMap,
    title: string,
    description: string,
    value: boolean,
    onToggle: () => void,
  ) => (
    <Animated.View 
      entering={FadeIn.duration(300)}
      style={[styles.settingItem, { borderBottomColor: theme.colors.disabled }]}
    >
      <View style={styles.settingIconContainer}>
        <Feather name={icon} size={22} color={theme.colors.primary} />
      </View>
      
      <View style={styles.settingContent}>
        <Body1 style={{ color: theme.colors.text, fontFamily: theme.typography.fontFamily.medium }}>
          {title}
        </Body1>
        <Body2 style={{ color: theme.colors.textSecondary, marginTop: 2 }}>
          {description}
        </Body2>
      </View>
      
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: theme.colors.disabled, true: theme.colors.primaryLight }}
        thumbColor={value ? theme.colors.primary : theme.colors.surface}
        ios_backgroundColor={theme.colors.disabled}
      />
    </Animated.View>
  );
  
  // Render section header
  const renderSectionHeader = (title: string) => (
    <H5 style={[styles.sectionHeader, { color: theme.colors.primary }]}>
      {title}
    </H5>
  );
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={['right', 'left']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <H4 style={{ color: theme.colors.text }}>Settings</H4>
          <Body1 style={{ color: theme.colors.textSecondary, marginTop: 4 }}>
            Customize your app experience
          </Body1>
        </View>
        
        {renderSectionHeader('Appearance')}
        {renderSettingItem(
          'moon',
          'Dark Mode',
          'Switch between light and dark theme',
          settings.darkMode,
          () => toggleSetting('darkMode'),
        )}
        {renderSettingItem(
          'type',
          'Large Text',
          'Increase text size for better readability',
          settings.largeText,
          () => toggleSetting('largeText'),
        )}
        {renderSettingItem(
          'eye',
          'High Contrast',
          'Enhance visual contrast for accessibility',
          settings.highContrast,
          () => toggleSetting('highContrast'),
        )}
        
        {renderSectionHeader('Notifications')}
        {renderSettingItem(
          'bell',
          'Enable Notifications',
          'Get reminders and updates about your notes',
          settings.notifications,
          () => toggleSetting('notifications'),
        )}
        
        {renderSectionHeader('Data & Storage')}
        {renderSettingItem(
          'save',
          'Auto Save',
          'Automatically save changes to notes',
          settings.autoSave,
          () => toggleSetting('autoSave'),
        )}
        
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.colors.error }]}
          activeOpacity={0.8}
          accessibilityRole="button"
          accessibilityLabel="Clear all data"
        >
          <Feather name="trash-2" size={18} color="white" style={{ marginRight: 8 }} />
          <Body1 style={{ color: 'white', fontFamily: theme.typography.fontFamily.medium }}>
            Clear All Data
          </Body1>
        </TouchableOpacity>
        
        <View style={styles.versionContainer}>
          <Body2 style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
            Notes App v1.0.0
          </Body2>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  headerContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
  },
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 32,
  },
  versionContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default SettingsScreen;