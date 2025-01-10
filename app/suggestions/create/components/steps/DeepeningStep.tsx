import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import { DeepeningMethod } from '@/types/suggestions/base';

const DEEPENING_TECHNIQUES = [
  { label: 'Countdown', value: 'countdown' },
  { label: 'Visualization', value: 'visualization' },
  { label: 'Staircase', value: 'staircase' },
  { label: 'Elevator', value: 'elevator' },
];

const DURATION_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 3} minutes`,
  value: i + 3,
}));

const DeepeningStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const handleTechniqueChange = (value: string) => {
    updateFormData({
      deepening: {
        ...data.deepening,
        method: value as DeepeningMethod,
        duration: data.deepening?.duration || 5,
      },
    });
  };

  const handleDurationChange = (value: number) => {
    updateFormData({
      deepening: {
        ...data.deepening,
        method: data.deepening?.method || 'countdown',
        duration: value,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Deepening Technique</Text>
        <Dropdown
          style={styles.dropdown}
          data={DEEPENING_TECHNIQUES}
          labelField="label"
          valueField="value"
          value={data.deepening?.method}
          onChange={item => handleTechniqueChange(item.value)}
          placeholder="Select technique"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Duration</Text>
        <Dropdown
          style={styles.dropdown}
          data={DURATION_OPTIONS}
          labelField="label"
          valueField="value"
          value={DURATION_OPTIONS.find(opt => opt.value === data.deepening?.duration)}
          onChange={item => handleDurationChange(item.value)}
          placeholder="Select duration"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

export default DeepeningStep; 