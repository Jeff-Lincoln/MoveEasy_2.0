import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

interface SettingsOption {
  id: string;
  title: string;
  subtitle?: string;
  type: 'toggle' | 'link' | 'button';
  value?: boolean;
  icon: string;
  onPress?: () => void;
}

const SettingsScreen = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    locationServices: true,
    darkMode: false,
    emailUpdates: true,
    autoBackup: false,
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof settings],
    }));
  };

  const settingsOptions: SettingsOption[] = [
    {
      id: 'profile',
      title: 'My Profile',
      subtitle: 'Manage your personal information',
      type: 'link',
      icon: 'person-outline',
      onPress: () => console.log('Navigate to profile'),
    },
    {
      id: 'notifications',
      title: 'Push Notifications',
      subtitle: 'Get updates about your move',
      type: 'toggle',
      value: settings.notifications,
      icon: 'notifications-outline',
    },
    {
      id: 'locationServices',
      title: 'Location Services',
      subtitle: 'Enable for better moving recommendations',
      type: 'toggle',
      value: settings.locationServices,
      icon: 'location-outline',
    },
    {
      id: 'darkMode',
      title: 'Dark Mode',
      subtitle: 'Switch between light and dark theme',
      type: 'toggle',
      value: settings.darkMode,
      icon: 'moon-outline',
    },
    {
      id: 'emailUpdates',
      title: 'Email Updates',
      subtitle: 'Receive move planning reminders',
      type: 'toggle',
      value: settings.emailUpdates,
      icon: 'mail-outline',
    },
    {
      id: 'autoBackup',
      title: 'Auto Backup',
      subtitle: 'Automatically backup your moving data',
      type: 'toggle',
      value: settings.autoBackup,
      icon: 'cloud-upload-outline',
    },
    {
      id: 'security',
      title: 'Security',
      subtitle: 'Manage your security preferences',
      type: 'link',
      icon: 'shield-outline',
      onPress: () => console.log('Navigate to security'),
    },
    {
      id: 'help',
      title: 'Help & Support',
      subtitle: 'Get assistance with the app',
      type: 'link',
      icon: 'help-circle-outline',
      onPress: () => console.log('Navigate to help'),
    },
  ];

  const renderSettingItem = (option: SettingsOption) => (
    <TouchableOpacity
      key={option.id}
      style={styles.settingItem}
      onPress={option.type === 'link' ? option.onPress : undefined}
      activeOpacity={option.type === 'link' ? 0.7 : 1}
    >
      <View style={styles.settingIconContainer}>
        <Ionicons name={option.icon as any} size={24} color="#007AFF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{option.title}</Text>
        {option.subtitle && (
          <Text style={styles.settingSubtitle}>{option.subtitle}</Text>
        )}
      </View>
      {option.type === 'toggle' && (
        <Switch
          value={option.value}
          onValueChange={() => handleToggle(option.id)}
          trackColor={{ false: '#D1D1D6', true: '#34C759' }}
          ios_backgroundColor="#D1D1D6"
        />
      )}
      {option.type === 'link' && (
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>
      </View>
      <View style={styles.settingsContainer}>
        {settingsOptions.map(renderSettingItem)}
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
      {/* <Text style={styles.version}>Version {Constants.manifest?.version || '1.0.0'}</Text> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  settingsContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  settingIconContainer: {
    width: 30,
    marginRight: 10,
    alignItems: 'center',
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#666666',
  },
  logoutButton: {
    marginVertical: 20,
    marginHorizontal: 16,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  version: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 12,
    marginBottom: 20,
  },
});

export default SettingsScreen;