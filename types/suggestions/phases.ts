import { InductionTechnique, DeepeningMethod, EmergenceTechnique, Technique } from './base';

/**
 * Represents the induction phase of a hypnosis session
 */
export interface Induction {
  technique: InductionTechnique;
}

/**
 * Represents the deepening phase of a hypnosis session
 */
export interface Deepening {
  method: DeepeningMethod;
  visualizationDetails?: string;
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
  mentalRehearsals?: string[];
  postHypnoticSuggestions: string[];
}

/**
 * Represents the emergence phase for ending the session
 */
export interface Emergence {
  technique: EmergenceTechnique;
} 