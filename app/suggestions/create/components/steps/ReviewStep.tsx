import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import { useCreateSession } from '../../../../../services/queries/suggestions';
import { FormStep } from '@/types/suggestions/form';

const REVIEW_SECTIONS: { id: FormStep; title: string; }[] = [
  { id: 'goal', title: 'Goal Setting' },
  { id: 'induction', title: 'Induction' },
  { id: 'deepening', title: 'Deepening' },
  { id: 'working', title: 'Working Phase' },
  { id: 'integration', title: 'Integration' },
  { id: 'emergence', title: 'Emergence' },
];

const ReviewStep: React.FC = () => {
  const { formState, setCurrentStep, resetForm } = useCreateSuggestion();
  const { data } = formState;
  const { mutate: createSession, isPending: isLoading, isError, error } = useCreateSession();
  const [validationErrors, setValidationErrors] = React.useState<string[]>([]);

  const handleSubmit = () => {
    console.log('data', data);
    if (!validateForm()) return;
    
    createSession({
      goal: data.goal!,
      induction: data.induction!,
      deepening: data.deepening!,
      workingPhase: data.workingPhase!,
      integration: data.integration!,
      emergence: data.emergence!,
      duration: data.duration,
      tags: data.tags
    }, {
      onSuccess: () => resetForm()
    });
  };

  const validateForm = () => {
    const errors = [];
    if (!data.goal) errors.push('Goal is required');
    if (!data.induction) errors.push('Induction is required');
    if (!data.deepening) errors.push('Deepening is required');
    if (!data.workingPhase) errors.push('Working phase is required');
    if (!data.integration) errors.push('Integration is required');
    if (!data.emergence) errors.push('Emergence is required');
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const renderSectionSummary = (stepId: FormStep) => {
    switch (stepId) {
      case 'goal':
        if (!data.goal?.text) return 'No goal set';
        return data.goal.text;

      case 'induction':
        if (!data.induction) return 'Not configured';
        return `${data.induction.technique}, ${data.induction.duration} minutes`;

      case 'deepening':
        if (!data.deepening) return 'Not configured';
        return `${data.deepening.method}, ${data.deepening.duration} minutes`;

      case 'working':
        if (!data.workingPhase?.techniques?.length) return 'No techniques added';
        return `${data.workingPhase.techniques.length} technique(s): ${
          data.workingPhase.techniques.map(t => t.name).join(', ')
        }`;

      case 'integration':
        if (!data.integration) return 'Not configured';
        return `Method: ${data.integration.method}${
          data.integration.configuration.scenario
            ? `, Scenario: ${data.integration.configuration.scenario}`
            : ''
        }`;

      case 'emergence':
        if (!data.emergence) return 'Not configured';
        return `${data.emergence.pace} pace, ${data.emergence.focus} focus, ${data.emergence.energyState} energy${
          data.emergence.nextActivity 
            ? `, Next: ${data.emergence.nextActivity}`
            : ''
        }`;

      default:
        return 'Not configured';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {REVIEW_SECTIONS.map((section) => (
        <TouchableOpacity
          key={section.id}
          style={styles.section}
          onPress={() => setCurrentStep(section.id)}
        >
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.editText}>Edit</Text>
          </View>
          <Text style={styles.summary}>{renderSectionSummary(section.id)}</Text>
        </TouchableOpacity>
      ))}
      
      {validationErrors.length > 0 && (
        <View style={styles.errorContainer}>
          {validationErrors.map((error) => (
            <Text key={error} style={styles.errorText}>{error}</Text>
          ))}
        </View>
      )}
      
      <TouchableOpacity 
        style={[styles.section, styles.submitButton]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>
          {isLoading ? 'Submitting...' : 'Save Session'}
        </Text>
        {isError && (
          <Text style={styles.errorText}>
            Error: {(error as Error)?.message || 'Failed to save session'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  editText: {
    fontSize: 14,
    color: '#007AFF',
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3B30',
    marginTop: 8,
  },
});

export default ReviewStep; 