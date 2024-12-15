import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
  placeholder?: string;
}

const TextArrayInput: React.FC<Props> = ({ label, values, onChange, placeholder }) => {
  const addNewItem = () => {
    onChange([...values, '']);
  };

  const updateItem = (index: number, text: string) => {
    const newValues = [...values];
    newValues[index] = text;
    onChange(newValues);
  };

  const removeItem = (index: number) => {
    onChange(values.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {values.map((value, index) => (
        <View key={index} style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => updateItem(index, text)}
            placeholder={placeholder}
            multiline
          />
          <TouchableOpacity 
            onPress={() => removeItem(index)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={addNewItem}
      >
        <Text style={styles.addButtonText}>+ Add {label}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
    minHeight: 40,
  },
  removeButton: {
    padding: 8,
  },
  removeButtonText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 8,
  },
  addButtonText: {
    color: '#007AFF',
    fontSize: 14,
  },
});

export default TextArrayInput; 