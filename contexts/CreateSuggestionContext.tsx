import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { FormState, FormStep } from '../types/suggestions/form';
import { CreateSessionDto } from '../types/suggestions/dto';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CreateSuggestionContextType {
  formState: FormState;
  setCurrentStep: (step: FormStep) => void;
  updateFormData: (data: Partial<CreateSessionDto>) => void;
  resetForm: () => void;
  saveProgress: () => Promise<void>;
  isLastStep: boolean;
  canProceed: boolean;
  isSubmitting: boolean;
  submissionError: string | null;
  handleSubmissionError: (error: Error) => void;
}

const STORAGE_KEY = '@suggestion_form_draft';

const initialFormState: FormState = {
  currentStep: 'goal',
  isValid: false,
  isDirty: false,
  data: {},
};

const CreateSuggestionContext = createContext<CreateSuggestionContextType | null>(null);

export const CreateSuggestionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formState, setFormState] = React.useState<FormState>(initialFormState);
  const [submissionError, setSubmissionError] = React.useState<string | null>(null);

  const saveProgress = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    } catch (error) {
      console.error('Error saving form progress:', error);
    }
  }, [formState]);

  const loadProgress = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setFormState(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading form progress:', error);
    }
  }, []);

  React.useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const setCurrentStep = useCallback((step: FormStep) => {
    setFormState(prev => ({ ...prev, currentStep: step }));
  }, []);

  const updateFormData = useCallback((data: Partial<CreateSessionDto>) => {
    setFormState(prev => ({
      ...prev,
      data: { ...prev.data, ...data },
      isDirty: true,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormState(initialFormState);
    AsyncStorage.removeItem(STORAGE_KEY).catch(console.error);
  }, []);

  const isLastStep = useMemo(() => {
    return formState.currentStep === 'review';
  }, [formState.currentStep]);

  const canProceed = useMemo(() => {
    // Add step-specific validation logic here
    return formState.isValid;
  }, [formState.isValid]);

  const handleSubmissionError = useCallback((error: Error) => {
    setSubmissionError(error.message);
  }, []);

  const value = useMemo(() => ({
    formState,
    setCurrentStep,
    updateFormData,
    resetForm,
    saveProgress,
    isLastStep,
    canProceed,
    isSubmitting: false,
    submissionError,
    handleSubmissionError,
  }), [formState, setCurrentStep, updateFormData, resetForm, saveProgress, isLastStep, canProceed, submissionError, handleSubmissionError]);

  return (
    <CreateSuggestionContext.Provider value={value}>
      {children}
    </CreateSuggestionContext.Provider>
  );
};

export const useCreateSuggestion = () => {
  const context = useContext(CreateSuggestionContext);
  if (!context) {
    throw new Error('useCreateSuggestion must be used within CreateSuggestionProvider');
  }
  return context;
}; 