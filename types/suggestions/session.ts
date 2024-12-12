import { Goal } from './base';
import { Induction, Deepening, WorkingPhase, Integration, Emergence } from './phases';

/**
 * Main interface representing a complete self-hypnosis session
 */
export interface Session {
  id: string;
  goal: Goal;
  induction: Induction;
  deepening: Deepening;
  workingPhase: WorkingPhase;
  integration: Integration;
  emergence: Emergence;
  
  // Optional metadata
  duration?: number;           // Session duration in minutes
  effectivenessRating?: number; // Rating from 1-10
  tags?: string[];            // Categorization tags
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
} 