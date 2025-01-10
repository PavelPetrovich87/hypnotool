import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { AnchorDetail, AnchorType } from '@/types/suggestions/integrations';

interface Props {
  value: AnchorDetail;
  onChange: (updated: AnchorDetail) => void;
}

const ANCHOR_OPTIONS = [
  { label: 'Touch thumb and middle finger', value: 'thumb_middle_finger' },
  { label: 'Take a deep breath', value: 'deep_breath' },
  { label: 'Press palm', value: 'palm_press' },
  { label: 'Light fist clench', value: 'fist_clench' },
  { label: 'Custom gesture', value: 'custom' },
];

const AnchorSelection: React.FC<Props> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>Choose Your Anchor</Text>
        <Dropdown
          style={styles.dropdown}
          data={ANCHOR_OPTIONS}
          labelField="label"
          valueField="value"
          value={value.type}
          onChange={item => onChange({ 
            type: item.value as AnchorType,
            customDescription: item.value === 'custom' ? value.customDescription : undefined
          })}
          placeholder="Select an anchor gesture"
        />
        <Text style={styles.helperText}>
          This gesture will help activate your new response
        </Text>
      </View>

      {value.type === 'custom' && (
        <View style={styles.field}>
          <Text style={styles.label}>Describe Your Custom Gesture</Text>
          <TextInput
            style={styles.input}
            value={value.customDescription}
            onChangeText={(text) => onChange({ ...value, customDescription: text })}
            placeholder="Describe your gesture in detail..."
            multiline
            numberOfLines={2}
            textAlignVertical="top"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  field: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    minHeight: 60,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
});

export default AnchorSelection; 