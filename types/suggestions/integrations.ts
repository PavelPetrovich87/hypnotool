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

export interface RehearsalConfiguration {
  type: 'rehearsal';
  duration: number;
  // We'll add more specific fields later
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