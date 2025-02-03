import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useCreateSuggestion } from '../../../../contexts/CreateSuggestionContext';
import { FORM_STEPS } from '../../../../types/suggestions/form';
import GoalStep from './steps/GoalStep';
import InductionStep from './steps/InductionStep';
import DeepeningStep from './steps/DeepeningStep';
import WorkingPhaseStep from './steps/WorkingPhaseStep';
import IntegrationStep from './steps/IntegrationStep';
import StepNavigation from './StepNavigation';
import EmergenceStep from './steps/EmergenceStep';
import ReviewStep from './steps/ReviewStep';

const StepWrapper: React.FC = () => {
  const { formState, setCurrentStep } = useCreateSuggestion();
  const currentIndex = FORM_STEPS.findIndex(step => step.id === formState.currentStep);

  const swipeGesture = Gesture.Pan()
    .onEnd((event) => {
      if (Math.abs(event.velocityX) < 500) return;
      
      if (event.velocityX > 0 && currentIndex > 0) {
        // Swipe right - go to previous step
        setCurrentStep(FORM_STEPS[currentIndex - 1].id);
      } else if (event.velocityX < 0 && currentIndex < FORM_STEPS.length - 1) {
        // Swipe left - go to next step
        setCurrentStep(FORM_STEPS[currentIndex + 1].id);
      }
    });

  const renderStep = () => {
    switch (formState.currentStep) {
      case 'goal':
        return <GoalStep />;
      case 'induction':
        return <InductionStep />;
      case 'deepening':
        return <DeepeningStep />;
      case 'working':
        return <WorkingPhaseStep />;
      case 'integration':
        return <IntegrationStep />;
      case 'emergence':
        return <EmergenceStep />;
      case 'review':
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <GestureDetector gesture={swipeGesture}>
      <View style={styles.container}>
        <View style={styles.content}>
          {renderStep()}
        </View>
        <StepNavigation />
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
  },
});

export default StepWrapper; 