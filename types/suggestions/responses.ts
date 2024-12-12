import { Session } from './session';

/**
 * Response type for single session operations
 */
export interface SessionResponse {
  data: Session;
  message: string;
  success: boolean;
}

/**
 * Response type for multiple sessions operations
 */
export interface SessionsResponse {
  data: Session[];
  message: string;
  success: boolean;
  total?: number;
}

/**
 * Error response type for session operations
 */
export interface SessionErrorResponse {
  message: string;
  success: false;
  error: {
    code: string;
    details?: string;
  };
} 