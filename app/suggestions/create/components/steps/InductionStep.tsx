import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import { InductionTechnique } from '@/types/suggestions/base';

const INDUCTION_TECHNIQUES = [
  { label: 'Progressive Relaxation', value: 'progressive_relaxation' },
  { label: 'Eye Fixation', value: 'eye_fixation' },
  { label: 'Breathing Focus', value: 'breathing_focus' },
];

const DURATION_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 3} minutes`,
  value: i + 3,
}));

const InductionStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const handleTechniqueChange = (value: string) => {
    updateFormData({
      induction: {
        ...data.induction,
        technique: value as InductionTechnique,
        duration: data.induction?.duration || 5,
      },
    });
  };

  const handleDurationChange = (value: number) => {
    updateFormData({
      induction: {
        ...data.induction,
        duration: value,
        technique: data.induction?.technique || 'progressive_relaxation',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Induction Technique</Text>
        <Dropdown
          style={styles.dropdown}
          data={INDUCTION_TECHNIQUES}
          labelField="label"
          valueField="value"
          value={data.induction?.technique}
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
          value={DURATION_OPTIONS.find(opt => opt.value === data.induction?.duration)}
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

export default InductionStep; 