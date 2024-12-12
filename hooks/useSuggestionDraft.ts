import { useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FormState } from '../types/suggestions/form';
import { useCreateSuggestion } from '../contexts/CreateSuggestionContext';

export const useSuggestionDraft = () => {
  const { formState, updateFormData } = useCreateSuggestion();

  const saveDraft = useCallback(async () => {
    try {
      await AsyncStorage.setItem('@suggestion_draft', JSON.stringify(formState.data));
    } catch (error) {
      console.error('Error saving draft:', error);
    }
  }, [formState.data]);

  const loadDraft = useCallback(async () => {
    try {
      const draft = await AsyncStorage.getItem('@suggestion_draft');
      if (draft) {
        updateFormData(JSON.parse(draft));
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
  }, [updateFormData]);

  useEffect(() => {
    if (formState.isDirty) {
      saveDraft();
    }
  }, [formState.isDirty, saveDraft]);

  return { loadDraft };
}; 