import { Goal } from './base';
import { Induction, Deepening, WorkingPhase, Integration, Emergence } from './phases';

/**
 * DTO for creating a new hypnosis session
 */
export interface CreateSessionDto {
  goal: Goal;
  induction: Induction;
  deepening: Deepening;
  workingPhase: WorkingPhase;
  integration: Integration;
  emergence: Emergence;
  
  // Optional metadata
  duration?: number;
  effectivenessRating?: number;
  tags?: string[];
}

/**
 * DTO for updating an existing hypnosis session
 * All fields are optional since we might want to update only specific parts
 */
export interface UpdateSessionDto {
  goal?: Goal;
  induction?: Induction;
  deepening?: Deepening;
  workingPhase?: WorkingPhase;
  integration?: Integration;
  emergence?: Emergence;
  duration?: number;
  effectivenessRating?: number;
  tags?: string[];
} 