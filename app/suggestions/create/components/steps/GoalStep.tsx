import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';

const GoalStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const handleGoalChange = (text: string) => {
    updateFormData({
      goal: {
        text,
        // @ts-ignore
        tags: data.goal?.tags || [],
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={data.goal?.text || ''}
        onChangeText={handleGoalChange}
        placeholder="What is your goal for this session?"
        multiline
        textAlignVertical="top"
        numberOfLines={4}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    fontSize: 16,
  },
});

export default GoalStep; 