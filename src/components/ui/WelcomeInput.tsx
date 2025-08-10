import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface WelcomeInputProps {
  onSubmit: (message: string) => void;
  placeholder?: string;
}

export default function WelcomeInput({ 
  onSubmit, 
  placeholder = "Ask me anything..." 
}: WelcomeInputProps): React.JSX.Element {
  const [inputText, setInputText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';
  
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isFocused) {
      Animated.spring(scaleAnim, {
        toValue: 1.02,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [isFocused]);

  const handleSubmit = () => {
    if (inputText.trim()) {
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
      ]).start();
      
      onSubmit(inputText.trim());
      setInputText('');
    }
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ scale: scaleAnim }],
      }
    ]}>
      <View style={[
        styles.inputWrapper,
        { 
          backgroundColor: isDarkMode ? '#2C2C2E' : '#FFFFFF',
          borderColor: isFocused ? '#007AFF' : (isDarkMode ? '#38383A' : '#E5E5EA'),
          borderWidth: isFocused ? 2 : 1,
          shadowColor: isFocused ? '#007AFF' : (isDarkMode ? '#000' : '#000'),
          shadowOpacity: isFocused ? 0.2 : 0.1,
          elevation: isFocused ? 8 : 4,
        }
      ]}>
        <View style={styles.inputIcon}>
          <Icon
            name="sparkles"
            size={20}
            color={isDarkMode ? '#8E8E93' : '#999999'}
          />
        </View>
        
        <TextInput
          style={[
            styles.textInput,
            { color: isDarkMode ? '#FFFFFF' : '#000000' }
          ]}
          value={inputText}
          onChangeText={setInputText}
          placeholder={placeholder}
          placeholderTextColor={isDarkMode ? '#8E8E93' : '#999999'}
          multiline
          maxLength={1000}
          onSubmitEditing={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
          returnKeyType="send"
        />
        
        <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
          <TouchableOpacity
            style={[
              styles.sendButton,
              { 
                backgroundColor: inputText.trim() 
                  ? '#007AFF'
                  : (isDarkMode ? '#48484A' : '#E5E5EA')
              }
            ]}
            onPress={handleSubmit}
            disabled={!inputText.trim()}
          >
            <Icon
              name={inputText.trim() ? "send" : "arrow-forward"}
              size={18}
              color={inputText.trim() ? '#FFFFFF' : (isDarkMode ? '#8E8E93' : '#999999')}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    maxWidth: 600,
    alignSelf: 'center',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 16,
    minHeight: 64,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputIcon: {
    marginRight: 12,
    paddingBottom: 2,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
    maxHeight: 120,
    paddingVertical: 0,
    fontWeight: '400',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});
