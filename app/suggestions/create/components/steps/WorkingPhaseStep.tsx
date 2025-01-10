import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useCreateSuggestion } from '../../../../../contexts/CreateSuggestionContext';
import TextArrayInput from '../TextArrayInput';

const DURATION_OPTIONS = Array.from({ length: 8 }, (_, i) => ({
  label: `${i + 3} minutes`,
  value: i + 3,
}));

const WorkingPhaseStep: React.FC = () => {
  const { formState, updateFormData } = useCreateSuggestion();
  const { data } = formState;

  const techniques = data.workingPhase?.techniques || [];

  useEffect(() => {
    if (techniques.length === 0) {
      addTechnique();
    }
  }, []);

  const addTechnique = () => {
    updateFormData({
      workingPhase: {
        ...data.workingPhase,
        techniques: [
          ...techniques,
          {
            id: Date.now().toString(),
            name: '',
            duration: 5,
            affirmations: [],
            visualizations: [],
          }
        ],
        suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
      },
    });
  };

  const removeTechnique = (id: string) => {
    updateFormData({
      workingPhase: {
        ...data.workingPhase,
        techniques: techniques.filter(t => t.id !== id),
        suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
      },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {techniques.map((technique, index) => (
          <View key={technique.id} style={styles.techniqueCard}>
            <View style={styles.cardHeader}>
              <TextInput
                style={styles.nameInput}
                value={technique.name}
                onChangeText={(text) => {
                  const updatedTechniques = [...techniques];
                  updatedTechniques[index] = {
                    ...technique,
                    name: text,
                  };
                  updateFormData({
                    workingPhase: {
                      ...data.workingPhase,
                      techniques: updatedTechniques,
                      suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
                    },
                  });
                }}
                placeholder="Technique name"
              />
              <TouchableOpacity 
                onPress={() => removeTechnique(technique.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Duration</Text>
              <Dropdown
                style={styles.dropdown}
                data={DURATION_OPTIONS}
                labelField="label"
                valueField="value"
                value={DURATION_OPTIONS.find(opt => opt.value === technique.duration)}
                onChange={item => {
                  const updatedTechniques = [...techniques];
                  updatedTechniques[index] = {
                    ...technique,
                    duration: item.value,
                  };
                  updateFormData({
                    workingPhase: {
                      ...data.workingPhase,
                      techniques: updatedTechniques,
                      suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
                    },
                  });
                }}
                placeholder="Select duration"
              />
            </View>

            <TextArrayInput
              label="Affirmations"
              values={technique.affirmations || []}
              onChange={(newValues) => {
                const updatedTechniques = [...techniques];
                updatedTechniques[index] = {
                  ...technique,
                  affirmations: newValues,
                };
                updateFormData({
                  workingPhase: {
                    ...data.workingPhase,
                    techniques: updatedTechniques,
                    suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
                  },
                });
              }}
              placeholder="Enter affirmation"
            />

            <TextArrayInput
              label="Visualizations"
              values={technique.visualizations || []}
              onChange={(newValues) => {
                const updatedTechniques = [...techniques];
                updatedTechniques[index] = {
                  ...technique,
                  visualizations: newValues,
                };
                updateFormData({
                  workingPhase: {
                    ...data.workingPhase,
                    techniques: updatedTechniques,
                    suggestionsUsed: data.workingPhase?.suggestionsUsed || [],
                  },
                });
              }}
              placeholder="Enter visualization"
            />
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={addTechnique}
      >
        <Text style={styles.addButtonText}>Add Technique</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  techniqueCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 14,
  },
  field: {
    gap: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
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
  nameInput: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    padding: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#FFF',
  },
});

export default WorkingPhaseStep; 