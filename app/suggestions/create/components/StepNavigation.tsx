import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useCreateSuggestion } from '../../../../contexts/CreateSuggestionContext';
import { FORM_STEPS } from '../../../../types/suggestions/form';

const StepNavigation: React.FC = () => {
  const { formState, setCurrentStep } = useCreateSuggestion();
  const currentIndex = FORM_STEPS.findIndex(step => step.id === formState.currentStep);
  
  const handleNext = () => {
    if (currentIndex < FORM_STEPS.length - 1) {
      setCurrentStep(FORM_STEPS[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentStep(FORM_STEPS[currentIndex - 1].id);
    }
  };

  return (
    <View style={styles.container}>
      {currentIndex > 0 && (
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      )}
      
      {currentIndex < FORM_STEPS.length - 1 && (
        <TouchableOpacity style={[styles.button, styles.nextButton]} onPress={handleNext}>
          <Text style={[styles.buttonText, styles.nextButtonText]}>Next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#007AFF',
  },
  nextButton: {
    backgroundColor: '#007AFF',
    marginLeft: 'auto',
  },
  nextButtonText: {
    color: '#FFFFFF',
  },
});

export default StepNavigation; 