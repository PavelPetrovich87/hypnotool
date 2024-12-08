import { Image, StyleSheet, Platform, Animated } from 'react-native';
import { useEffect, useRef } from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#6366F1', dark: '#4338CA' }}
      headerImage={
        <Image
          source={require('@/assets/images/hypnotool-logo.jpg')}
          style={styles.logo}
        />
      }>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hypnotool</ThemedText>
          <ThemedText type="subtitle" style={styles.tagline}>
            Design your change, guide your growth
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.messageContainer}>
          <ThemedText type="defaultSemiBold" style={styles.messageHeading}>
            Your Personal Journey
          </ThemedText>
          <ThemedText style={styles.messageText}>
            Your journey to self-improvement is unique, and your self-hypnosis practice should be too. 
            Whether you're aiming for better sleep, increased confidence, new habits, or personal growth, 
            Hypnotool helps you design sessions that match your style, pace, and specific goals.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.benefitsContainer}>
          <ThemedText type="subtitle">Key Benefits</ThemedText>
          <ThemedView style={styles.benefitCard}>
            <ThemedText type="defaultSemiBold">Better Sleep Quality</ThemedText>
            <ThemedText>Train your mind to release daily tension and establish natural sleep patterns.</ThemedText>
          </ThemedView>
          <ThemedView style={styles.benefitCard}>
            <ThemedText type="defaultSemiBold">Increased Confidence</ThemedText>
            <ThemedText>Build lasting self-assurance through guided mental practice.</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.safetyContainer}>
          <ThemedText type="subtitle">Safety First</ThemedText>
          <ThemedText style={styles.safetyText}>
            • Self-hypnosis is safe when practiced as guided{'\n'}
            • Stay in a comfortable, quiet environment{'\n'}
            • Never practice while driving or operating machinery{'\n'}
            • Consult healthcare provider if under treatment
          </ThemedText>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    height: 120,
    width: 120,
    bottom: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
  titleContainer: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  tagline: {
    textAlign: 'center',
    opacity: 0.8,
  },
  messageContainer: {
    backgroundColor: Platform.select({ ios: 'rgba(255,255,255,0.1)', android: 'transparent' }),
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  messageHeading: {
    marginBottom: 8,
  },
  messageText: {
    lineHeight: 22,
  },
  benefitsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  benefitCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({ ios: 'rgba(255,255,255,0.05)', android: 'transparent' }),
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.2)',
  },
  safetyContainer: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Platform.select({ ios: 'rgba(251, 191, 36, 0.1)', android: 'transparent' }),
    marginBottom: 24,
  },
  safetyText: {
    marginTop: 8,
    lineHeight: 22,
  },
});
