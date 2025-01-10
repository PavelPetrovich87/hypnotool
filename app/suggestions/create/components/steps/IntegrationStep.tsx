import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import { IntegrationMethod } from '@/types/suggestions/base';
import FuturePacingSection from './integration/FuturePacingSection';
import RehearsalSection from './integration/RehearsalSection';
import { IntegrationConfiguration } from '@/types/suggestions/integrations';

const INTEGRATION_METHODS = [
  { 
    label: 'Visualize Future Situations',
    value: 'future_pacing'
  },
  { 
    label: 'Practice and Rehearse',
    value: 'rehearsal'
  },
  { 
    label: 'Create a Mental Trigger',
    value: 'anchoring'
  },
  { 
    label: 'Connect Through Symbols',
    value: 'symbolic_bridge'
  }
];

const DURATION_OPTIONS = Array.from({ length: 5 }, (_, i) => ({
  label: `${i + 3} minutes`,
  value: i + 3,
}));

const IntegrationStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const handleMethodChange = (value: string) => {
    const method = value as IntegrationMethod;
    let configuration: IntegrationConfiguration;
    
    switch (method) {
      case 'future_pacing':
        configuration = {
          type: 'future_pacing',
          duration: data.integration?.configuration?.duration || 5,
          timeframes: [],
        };
        break;
      case 'rehearsal':
        configuration = {
          type: 'rehearsal',
          duration: data.integration?.configuration?.duration || 5,
        };
        break;
      // Add other cases as needed
      default:
        configuration = {
          type: 'rehearsal',
          duration: data.integration?.configuration?.duration || 5,
        };
    }

    updateFormData({
      integration: {
        ...data.integration,
        method,
        configuration,
      },
    });
  };

  const handleDurationChange = (value: number) => {
    const method = data.integration?.method || 'rehearsal';
    let configuration: IntegrationConfiguration;
    
    switch (method) {
      case 'future_pacing':
        configuration = {
          type: 'future_pacing',
          duration: value,
          timeframes: (data.integration?.configuration as FuturePacingConfiguration)?.timeframes || [],
        };
        break;
      default:
        configuration = {
          type: method,
          duration: value,
        };
    }

    updateFormData({
      integration: {
        ...data.integration,
        method,
        configuration,
      },
    });
  };

  const renderMethodContent = () => {
    switch (data.integration?.method) {
      case 'future_pacing':
        return <FuturePacingSection />;
      case 'rehearsal':
        return <RehearsalSection />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.introText}>
        Let's connect your goal with daily life. Choose how you'd like to do this:
      </Text>

      <View style={styles.field}>
        <Text style={styles.label}>Integration Method</Text>
        <Dropdown
          style={styles.dropdown}
          data={INTEGRATION_METHODS}
          labelField="label"
          valueField="value"
          value={data.integration?.method}
          onChange={item => handleMethodChange(item.value)}
          placeholder="Select integration method"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Duration</Text>
        <Dropdown
          style={styles.dropdown}
          data={DURATION_OPTIONS}
          labelField="label"
          valueField="value"
          value={DURATION_OPTIONS.find(opt => opt.value === data.integration?.configuration?.duration)}
          onChange={item => handleDurationChange(item.value)}
          placeholder="Select duration"
        />
      </View>

      {data.integration?.method && (
        <View style={styles.methodContent}>
          {renderMethodContent()}
        </View>
      )}

      <Text style={styles.helperText}>
        You can add more details after selecting
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
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
  methodContent: {
    flex: 1,
    marginTop: 16,
  },
});

export default IntegrationStep; 