import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useCreateSuggestion } from '../../../../../../contexts/CreateSuggestionContext';
import { RehearsalConfiguration, ScenarioDetail, AnchorDetail } from '@/types/suggestions/integrations';
import ScenarioInput from './ScenarioInput';
import AnchorSelection from './AnchorSelection';

const RehearsalSection: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const config = data.integration?.configuration as RehearsalConfiguration;

  const defaultScenario: ScenarioDetail = {
    setting: '',
    description: '',
    response: '',
  };

  const defaultAnchor: AnchorDetail = {
    type: 'thumb_middle_finger',
  };

  // Initialize scenarios if they don't exist
  if (!config?.scenarios) {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'rehearsal',
        configuration: {
          ...config,
          type: 'rehearsal',
          duration: config?.duration || 5,
          scenarios: {
            practiceLocation: '',
            simple: defaultScenario,
            moderate: defaultScenario,
            challenging: defaultScenario,
          },
          anchor: defaultAnchor,
        },
      },
    });
  }

  const updateConfig = (updates: Partial<RehearsalConfiguration['scenarios']>) => {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'rehearsal',
        configuration: {
          ...config,
          type: 'rehearsal',
          duration: config?.duration || 5,
          scenarios: {
            ...config?.scenarios,
            ...updates,
          },
        },
      },
    });
  };

  const updateScenario = (level: 'simple' | 'moderate' | 'challenging', scenario: ScenarioDetail) => {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'rehearsal',
        configuration: {
          ...config,
          type: 'rehearsal',
          duration: config?.duration || 5,
          scenarios: {
            ...config?.scenarios,
            [level]: scenario,
          },
        },
      },
    });
  };

  const updateAnchor = (anchor: AnchorDetail) => {
    updateFormData({
      integration: {
        ...data.integration,
        method: 'rehearsal',
        configuration: {
          ...config,
          type: 'rehearsal',
          duration: config?.duration || 5,
          anchor,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Practice your new behavior in progressively challenging situations
      </Text>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Practice Location</Text>
          <TextInput
            style={styles.input}
            value={config?.scenarios?.practiceLocation}
            onChangeText={(value) => updateConfig({ practiceLocation: value })}
            placeholder="Where will you practice these scenarios?"
          />
          <Text style={styles.helperText}>
            Choose a private, comfortable space where you can fully focus
          </Text>
        </View>

        {/* Progressive Scenarios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Practice Scenarios</Text>
          <View style={styles.scenarios}>
            <ScenarioInput
              level="simple"
              value={config?.scenarios?.simple || defaultScenario}
              onChange={(scenario) => updateScenario('simple', scenario)}
            />
            <ScenarioInput
              level="moderate"
              value={config?.scenarios?.moderate || defaultScenario}
              onChange={(scenario) => updateScenario('moderate', scenario)}
            />
            <ScenarioInput
              level="challenging"
              value={config?.scenarios?.challenging || defaultScenario}
              onChange={(scenario) => updateScenario('challenging', scenario)}
            />
          </View>
        </View>

        {/* Anchor Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Integration Anchor</Text>
          <AnchorSelection
            value={config?.anchor || defaultAnchor}
            onChange={updateAnchor}
          />
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    gap: 12,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
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
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  scenarios: {
    gap: 16,
  },
});

export default RehearsalSection; 