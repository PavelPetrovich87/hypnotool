import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { ScenarioDetail } from '@/types/suggestions/integrations';

interface Props {
  level: 'simple' | 'moderate' | 'challenging';
  value: ScenarioDetail;
  onChange: (updated: ScenarioDetail) => void;
}

const LEVEL_LABELS = {
  simple: 'Simple Scenario',
  moderate: 'Moderate Challenge',
  challenging: 'Maximum Challenge',
};

const HELPER_TEXTS = {
  simple: 'Start with an everyday situation where success is almost guaranteed',
  moderate: 'Add one challenging element to the previous scenario',
  challenging: 'Imagine the most demanding version of this situation',
};

const ScenarioInput: React.FC<Props> = ({ level, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{LEVEL_LABELS[level]}</Text>
      <Text style={styles.helperText}>{HELPER_TEXTS[level]}</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Setting</Text>
        <TextInput
          style={styles.input}
          value={value.setting}
          onChangeText={(text) => onChange({ ...value, setting: text })}
          placeholder="Where does this scenario take place?"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={value.description}
          onChangeText={(text) => onChange({ ...value, description: text })}
          placeholder="Describe what happens in this scenario..."
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Your Response</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          value={value.response}
          onChangeText={(text) => onChange({ ...value, response: text })}
          placeholder="How will you respond in this situation?"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 16,
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  field: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
  },
  multiline: {
    minHeight: 80,
  },
});

export default ScenarioInput; 