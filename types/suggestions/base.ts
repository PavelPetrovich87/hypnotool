/**
 * Base types for the self-hypnosis session system
 */

/**
 * Available induction techniques for starting a hypnosis session
 */
export type InductionTechnique = 'progressive_relaxation' | 'eye_fixation' | 'breathing_focus';

/**
 * Available methods for deepening the hypnotic state
 */
export type DeepeningMethod = 'countdown' | 'visualization' | 'staircase' | 'elevator';

/**
 * Available techniques for emerging from hypnosis
 */
export type EmergenceTechnique = 'counting_up' | 'gradual_awareness' | 'stretching';

/**
 * Represents the goal of a hypnosis session
 */
export interface Goal {
  id: string;
  text: string;
}

/**
 * Represents a specific technique used during the working phase
 */
export interface Technique {
  id: string;
  name: string;
  affirmations?: string[];
  visualizations?: string[];
  duration: number;
}

export type IntegrationMethod = 'future_pacing' | 'rehearsal' | 'anchoring' | 'symbolic_bridge';
