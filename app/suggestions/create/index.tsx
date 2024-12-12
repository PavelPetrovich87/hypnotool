import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { CreateSuggestionProvider } from '../../../contexts/CreateSuggestionContext';
import StepWrapper from './components/StepWrapper';
import StepIndicator from './components/StepIndicator';
import { FORM_STEPS } from '../../../types/suggestions/form';

const CreateSuggestion = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CreateSuggestionProvider>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <StepIndicator steps={FORM_STEPS} />
            <StepWrapper />
          </View>
        </SafeAreaView>
      </CreateSuggestionProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
});

export default CreateSuggestion; 