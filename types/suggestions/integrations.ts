interface SensoryDetail {
  description: string;
  keywords: string[];
}

interface TimeFrameState {
  current: string;
  desired: string;
}

export interface TimeFrame {
  id: string;
  date: string;
  time: string;
  situation: string;
  duration: 'short' | 'medium' | 'long';
  location: string;
  participants: string[];
  purpose: string;
  sensoryDetails: {
    visual: SensoryDetail;
    auditory: SensoryDetail;
    kinesthetic: SensoryDetail;
  };
  stateIntegration: TimeFrameState;
  additionalContext?: string;
}

export interface FuturePacingConfiguration {
  type: 'future_pacing';
  timeframes: TimeFrame[];
  duration: number;
}

export interface ScenarioDetail {
  setting: string;
  description: string;
  response: string;
}

export type AnchorType = 
  | 'thumb_middle_finger'
  | 'deep_breath'
  | 'palm_press'
  | 'fist_clench'
  | 'custom';

export interface AnchorDetail {
  type: AnchorType;
  customDescription?: string;
}

interface ProgressiveScenarios {
  practiceLocation: string;
  simple: ScenarioDetail;
  moderate: ScenarioDetail;
  challenging: ScenarioDetail;
}

export interface RehearsalConfiguration {
  type: 'rehearsal';
  duration: number;
  scenarios: ProgressiveScenarios;
  anchor: AnchorDetail;
}

export interface AnchoringConfiguration {
  type: 'anchoring';
  duration: number;
  // We'll add more specific fields later
}

export interface SymbolicBridgeConfiguration {
  type: 'symbolic_bridge';
  duration: number;
  // We'll add more specific fields later
}

export type IntegrationConfiguration = 
  | FuturePacingConfiguration
  | RehearsalConfiguration
  | AnchoringConfiguration
  | SymbolicBridgeConfiguration; 