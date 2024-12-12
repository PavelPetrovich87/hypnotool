import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCreateSuggestion } from '../../../../contexts/CreateSuggestionContext';
import { StepConfig } from '../../../../types/suggestions/form';

interface Props {
  steps: StepConfig[];
}

const StepIndicator: React.FC<Props> = ({ steps }) => {
  const { formState } = useCreateSuggestion();
  const currentIndex = steps.findIndex(step => step.id === formState.currentStep);

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <View key={step.id} style={styles.stepContainer}>
          <View style={[styles.dot, index <= currentIndex && styles.activeDot]} />
          <Text style={[styles.text, index <= currentIndex && styles.activeText]}>
            {step.title}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  stepContainer: {
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 4,
  },
  activeDot: {
    backgroundColor: '#007AFF',
  },
  text: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  activeText: {
    color: '#007AFF',
  },
});

export default StepIndicator; 