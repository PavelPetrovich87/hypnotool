import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useCreateSuggestion } from '../../../../../../contexts/CreateSuggestionContext';
import { FuturePacingConfiguration, TimeFrame } from '@/types/suggestions/integrations';
import FuturePacingTimeframe from './FuturePacingTimeframe';

const FuturePacingSection: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const config = data.integration?.configuration as { type: 'future_pacing' } & FuturePacingConfiguration;
  const timeframes = config?.timeframes || [];

  const addTimeframe = () => {
    const newTimeframe: TimeFrame = {
      id: Date.now().toString(),
      date: '',
      time: '',
      situation: '',
      duration: 'medium',
      location: '',
      participants: [],
      purpose: '',
      sensoryDetails: {
        visual: { description: '', keywords: [] },
        auditory: { description: '', keywords: [] },
        kinesthetic: { description: '', keywords: [] },
      },
      stateIntegration: {
        current: '',
        desired: '',
      },
    };

    updateFormData({
      integration: {
        ...data.integration,
        method: 'future_pacing',
        configuration: {
          ...data.integration?.configuration,
          type: 'future_pacing',
          duration: data.integration?.configuration?.duration || 5,
          timeframes: [...timeframes, newTimeframe],
        },
      },
    });
  };

  const updateTimeframe = (updated: TimeFrame) => {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'future_pacing',
        configuration: {
          ...data.integration?.configuration,
          type: 'future_pacing',
          duration: data.integration?.configuration?.duration || 5,
          timeframes: timeframes.map(t => t.id === updated.id ? updated : t),
        },
      },
    });
  };

  const deleteTimeframe = (id: string) => {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'future_pacing',
        configuration: {
          ...data.integration?.configuration,
          type: 'future_pacing',
          duration: data.integration?.configuration?.duration || 5,
          timeframes: timeframes.filter(t => t.id !== id),
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Visualize specific future situations where you'll apply your new changes.
      </Text>

      <ScrollView style={styles.timeframeList}>
        {timeframes.map((timeframe) => (
          <FuturePacingTimeframe
            key={timeframe.id}
            timeframe={timeframe}
            onUpdate={updateTimeframe}
            onDelete={() => deleteTimeframe(timeframe.id)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={addTimeframe}
      >
        <Text style={styles.addButtonText}>Add Future Situation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  timeframeList: {
    flex: 1,
  },
  timeframeCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FuturePacingSection; 