import React, { useRef } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

interface ProfileSectionProps {
  fadeAnim?: Animated.Value;
  onProfilePress?: () => void;
}

export default function ProfileSection({ 
  fadeAnim,
  onProfilePress 
}: ProfileSectionProps): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();
  const profileScaleAnim = useRef(new Animated.Value(1)).current;

  const handleProfilePress = () => {
    // Profile button press animation
    Animated.sequence([
      Animated.timing(profileScaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(profileScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onProfilePress) {
        onProfilePress();
      } else {
        // Default behavior - could navigate to profile or show modal
        console.log('Profile tapped');
      }
    });
  };

  return (
    <Animated.View style={[
      styles.profileSection,
      {
        top: insets.top + 10, // Safe area'ya göre ayarla
        opacity: fadeAnim || 1,
        transform: [{ scale: profileScaleAnim }]
      }
    ]}>
      <TouchableOpacity 
        style={[
          styles.profileButton,
          { 
            backgroundColor: isDarkMode ? '#1C1C1E' : '#F8F9FA',
            borderColor: isDarkMode ? '#38383A' : '#E5E5EA',
            shadowColor: isDarkMode ? '#000' : '#000',
          }
        ]}
        onPress={handleProfilePress}
        activeOpacity={0.8}
      >
        <Icon 
          name="person-circle" 
          size={24} 
          color={isDarkMode ? '#FFFFFF' : '#007AFF'} 
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    position: 'absolute',
    // top değeri artık dinamik olarak ayarlanıyor
    right: 20,
    zIndex: 10,
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
});
