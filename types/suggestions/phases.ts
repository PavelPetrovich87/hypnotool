import { InductionTechnique, DeepeningMethod, EmergenceTechnique, Technique, IntegrationMethod } from './base';
import { IntegrationConfiguration } from './integrations';

/**
 * Represents the induction phase of a hypnosis session
 */
export interface Induction {
  technique: InductionTechnique;
  duration: number;
}

/**
 * Represents the deepening phase of a hypnosis session
 */
export interface Deepening {
  method: DeepeningMethod;
  visualizationDetails?: string;
  duration: number;
}

/**
 * Represents the working phase where the main therapeutic work happens
 */
export interface WorkingPhase {
  techniques: Technique[];
  suggestionsUsed: string[];
}

/**
 * Represents the integration phase where changes are reinforced
 */
export interface Integration {
  method: IntegrationMethod;
  configuration: IntegrationConfiguration;
}

/**
 * Represents the emergence phase for ending the session
 */
export interface Emergence {
  technique: EmergenceTechnique;
} 