import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { SensoryDetail } from '@/types/suggestions/integrations';

interface Props {
  type: 'visual' | 'auditory' | 'kinesthetic';
  value: SensoryDetail;
  onChange: (updated: SensoryDetail) => void;
}

const PLACEHOLDERS = {
  visual: "What will you see in this situation? Consider the environment, people, objects, colors, lighting...",
  auditory: "What sounds will you hear? Consider voices, background noises, music, ambient sounds...",
  kinesthetic: "What physical sensations will you experience? Consider posture, temperature, comfort, movement...",
};

const SensorySection: React.FC<Props> = ({ type, value, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
      <TextInput
        style={styles.input}
        value={value.description}
        onChangeText={(text) => onChange({ ...value, description: text })}
        placeholder={PLACEHOLDERS[type]}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      <TextInput
        style={styles.keywordsInput}
        value={value.keywords.join(', ')}
        onChangeText={(text) => onChange({ ...value, keywords: text.split(',').map(k => k.trim()) })}
        placeholder="Add keywords (separate with commas)"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    minHeight: 80,
  },
  keywordsInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
  },
});

export default SensorySection; 