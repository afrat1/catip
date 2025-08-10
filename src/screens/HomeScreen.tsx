import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ProfileSection from '../components/common/ProfileSection';

const { width, height } = Dimensions.get('window');

export default function HomeScreen(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous rotation for the sparkles
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const handleGetStarted = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Navigate to Explore page after animation
      navigation.navigate('Explore' as never);
    });
  };



  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#000000' : '#FFFFFF' }]}>
      {/* Profile Section */}
      <ProfileSection fadeAnim={fadeAnim} />

      {/* Background gradient circles */}
      <View style={styles.backgroundElements}>
        <Animated.View 
          style={[
            styles.gradientCircle1,
            { 
              backgroundColor: isDarkMode ? 'rgba(0, 122, 255, 0.1)' : 'rgba(0, 122, 255, 0.05)',
              transform: [{ rotate: rotation }]
            }
          ]} 
        />
        <Animated.View 
          style={[
            styles.gradientCircle2,
            { 
              backgroundColor: isDarkMode ? 'rgba(88, 86, 214, 0.1)' : 'rgba(88, 86, 214, 0.05)',
              transform: [{ rotate: rotation }]
            }
          ]} 
        />
      </View>

      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [
              { translateY: slideAnim },
              { scale: scaleAnim }
            ]
          }
        ]}
      >
        <View style={styles.header}>
          <Animated.View style={[styles.logoContainer, { transform: [{ rotate: rotation }] }]}>
            <Icon
              name="sparkles"
              size={32}
              color="#007AFF"
              style={styles.logoIcon}
            />
          </Animated.View>
          
          <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#000000' }]}>
            Welcome to{' '}
            <Text style={[styles.brandText, { color: '#007AFF' }]}>
              Catip
            </Text>
          </Text>
          
          <Text style={[styles.subtitle, { color: isDarkMode ? '#8E8E93' : '#666666' }]}>
            Your intelligent AI assistant is ready to help with anything you need
          </Text>
        </View>
        
        <View style={styles.getStartedSection}>
          <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
            <TouchableOpacity 
              style={[
                styles.getStartedButton,
                { 
                  backgroundColor: '#007AFF',
                  shadowColor: '#007AFF',
                }
              ]}
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Icon name="rocket" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.getStartedButtonText}>
                Get Started
              </Text>
              <Icon name="arrow-forward" size={20} color="#FFFFFF" style={styles.arrowIcon} />
            </TouchableOpacity>
          </Animated.View>
          
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Icon name="bulb" size={16} color={isDarkMode ? '#8E8E93' : '#999999'} />
              <Text style={[styles.featureText, { color: isDarkMode ? '#8E8E93' : '#999999' }]}>
                Creative answers
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="flash" size={16} color={isDarkMode ? '#8E8E93' : '#999999'} />
              <Text style={[styles.featureText, { color: isDarkMode ? '#8E8E93' : '#999999' }]}>
                Lightning fast
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="shield-checkmark" size={16} color={isDarkMode ? '#8E8E93' : '#999999'} />
              <Text style={[styles.featureText, { color: isDarkMode ? '#8E8E93' : '#999999' }]}>
                Secure & private
              </Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
  },
  gradientCircle1: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    top: -width * 0.5,
    right: -width * 0.5,
    opacity: 0.6,
  },
  gradientCircle2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    bottom: -width * 0.4,
    left: -width * 0.4,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoIcon: {
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  brandText: {
    fontWeight: '900',
    textShadowColor: 'rgba(0, 122, 255, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
    fontWeight: '400',
  },
  getStartedSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 32,
    minWidth: 200,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonIcon: {
    marginRight: 12,
  },
  getStartedButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    marginLeft: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 300,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
});
