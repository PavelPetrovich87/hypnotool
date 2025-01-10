import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import { EmergencePace, EmergenceFocus, EnergyState } from '@/types/suggestions/base';

const PACE_OPTIONS = [
  { label: 'Gradual emergence (2-3 minutes)', value: 'gradual' },
  { label: 'Balanced emergence (1-2 minutes)', value: 'balanced' },
  { label: 'Quick emergence (30-60 seconds)', value: 'quick' }
];

const FOCUS_OPTIONS = [
  { label: 'Body-centered awareness', value: 'body' },
  { label: 'Count-based progression', value: 'count' },
  { label: 'Environment awareness', value: 'environment' }
];

const ENERGY_OPTIONS = [
  { label: 'Calm and centered', value: 'calm' },
  { label: 'Alert and energized', value: 'alert' },
  { label: 'Balanced awareness', value: 'balanced' }
];

const EmergenceStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const handlePaceChange = (value: string) => {
    updateFormData({
      emergence: {
        ...data.emergence,
        pace: value as EmergencePace,
        focus: data.emergence?.focus || 'body',
        energyState: data.emergence?.energyState || 'balanced',
      },
    });
  };

  const handleFocusChange = (value: string) => {
    updateFormData({
      emergence: {
        ...data.emergence,
        focus: value as EmergenceFocus,
        pace: data.emergence?.pace || 'gradual',
        energyState: data.emergence?.energyState || 'balanced',
      },
    });
  };

  const handleEnergyChange = (value: string) => {
    updateFormData({
      emergence: {
        ...data.emergence,
        energyState: value as EnergyState,
        pace: data.emergence?.pace || 'gradual',
        focus: data.emergence?.focus || 'body',
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Emergence Pace</Text>
        <Dropdown
          style={styles.dropdown}
          data={PACE_OPTIONS}
          labelField="label"
          valueField="value"
          value={data.emergence?.pace}
          onChange={item => handlePaceChange(item.value)}
          placeholder="Select emergence pace"
        />
        <Text style={styles.helperText}>
          Choose how quickly you want to return to full awareness
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Primary Focus</Text>
        <Dropdown
          style={styles.dropdown}
          data={FOCUS_OPTIONS}
          labelField="label"
          valueField="value"
          value={data.emergence?.focus}
          onChange={item => handleFocusChange(item.value)}
          placeholder="Select primary focus"
        />
        <Text style={styles.helperText}>
          Choose your main awareness focus during emergence
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Target Energy State</Text>
        <Dropdown
          style={styles.dropdown}
          data={ENERGY_OPTIONS}
          labelField="label"
          valueField="value"
          value={data.emergence?.energyState}
          onChange={item => handleEnergyChange(item.value)}
          placeholder="Select energy state"
        />
        <Text style={styles.helperText}>
          Choose your desired state after emergence
        </Text>
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
  helperText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default EmergenceStep; 