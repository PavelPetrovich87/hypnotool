import { CreateSessionDto } from './dto';

export type FormStep = 
  | 'goal'
  | 'induction'
  | 'deepening'
  | 'working'
  | 'integration'
  | 'emergence'
  | 'review';

export interface FormState {
  currentStep: FormStep;
  isValid: boolean;
  isDirty: boolean;
  data: Partial<CreateSessionDto>;
}

export interface StepConfig {
  id: FormStep;
  title: string;
  isOptional?: boolean;
}

export const FORM_STEPS: StepConfig[] = [
  { id: 'goal', title: 'Goal Setting' },
  { id: 'induction', title: 'Induction' },
  { id: 'deepening', title: 'Deepening' },
  { id: 'working', title: 'Working Phase' },
  { id: 'integration', title: 'Integration' },
  { id: 'emergence', title: 'Emergence' },
  { id: 'review', title: 'Review' },
]; 