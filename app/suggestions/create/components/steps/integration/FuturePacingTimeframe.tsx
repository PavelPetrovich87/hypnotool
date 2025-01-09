import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { TimeFrame } from '@/types/suggestions/integrations';
import { Dropdown } from 'react-native-element-dropdown';
import SensorySection from './SensorySection';

interface Props {
  timeframe: TimeFrame;
  onUpdate: (updated: TimeFrame) => void;
  onDelete: () => void;
}

const DURATION_OPTIONS = [
  { label: 'Short', value: 'short' },
  { label: 'Medium', value: 'medium' },
  { label: 'Long', value: 'long' },
];

const FuturePacingTimeframe: React.FC<Props> = ({ timeframe, onUpdate, onDelete }) => {
  const updateField = <K extends keyof TimeFrame>(field: K, value: TimeFrame[K]) => {
    onUpdate({
      ...timeframe,
      [field]: value,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Future Situation</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Remove</Text>
        </TouchableOpacity>
      </View>

      {/* Time & Context Panel */}
      <View style={styles.section}>
        <View style={styles.field}>
          <Text style={styles.label}>Date & Time</Text>
          <View style={styles.dateTimeContainer}>
            <TextInput
              style={styles.dateTimeInput}
              value={timeframe.date}
              onChangeText={(value) => updateField('date', value)}
              placeholder="Date (e.g., 2024-03-20)"
            />
            <TextInput
              style={styles.dateTimeInput}
              value={timeframe.time}
              onChangeText={(value) => updateField('time', value)}
              placeholder="Time (e.g., 14:30)"
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Situation</Text>
          <TextInput
            style={styles.input}
            value={timeframe.situation}
            onChangeText={(value) => updateField('situation', value)}
            placeholder="Name this situation"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Duration</Text>
          <Dropdown
            style={styles.dropdown}
            data={DURATION_OPTIONS}
            labelField="label"
            valueField="value"
            value={timeframe.duration}
            onChange={item => updateField('duration', item.value as 'short' | 'medium' | 'long')}
            placeholder="Select duration"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            value={timeframe.location}
            onChangeText={(value) => updateField('location', value)}
            placeholder="Where will this happen?"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>People Present</Text>
          <TextInput
            style={styles.input}
            value={timeframe.participants.join(', ')}
            onChangeText={(value) => updateField('participants', value.split(',').map(p => p.trim()))}
            placeholder="Who will be there? (separate with commas)"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Purpose</Text>
          <TextInput
            style={styles.input}
            value={timeframe.purpose}
            onChangeText={(value) => updateField('purpose', value)}
            placeholder="What's the purpose of this situation?"
          />
        </View>
      </View>

      {/* Sensory Details Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sensory Details</Text>
        <SensorySection
          type="visual"
          value={timeframe.sensoryDetails.visual}
          onChange={(updated) => {
            updateField('sensoryDetails', {
              ...timeframe.sensoryDetails,
              visual: updated,
            });
          }}
        />
        <SensorySection
          type="auditory"
          value={timeframe.sensoryDetails.auditory}
          onChange={(updated) => {
            updateField('sensoryDetails', {
              ...timeframe.sensoryDetails,
              auditory: updated,
            });
          }}
        />
        <SensorySection
          type="kinesthetic"
          value={timeframe.sensoryDetails.kinesthetic}
          onChange={(updated) => {
            updateField('sensoryDetails', {
              ...timeframe.sensoryDetails,
              kinesthetic: updated,
            });
          }}
        />
      </View>

      {/* Placeholder for State Integration Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Response Integration</Text>
        {/* We'll add state integration here */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    gap: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
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
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
  },
  dateTimeContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dateTimeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
  },
});

export default FuturePacingTimeframe; 