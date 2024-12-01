// User roles
export type UserRole = 'user' | 'paid_user';

// Base user interface with common properties
export interface BaseUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// User data returned from the API
export interface AuthenticatedUser extends BaseUser {
  createdAt: string;
  updatedAt: string;
}

// Login request payload
export interface LoginCredentials {
  email: string;
  password: string;
}

// Registration request payload
export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

// Token response from the API
export interface AuthTokens {
  accessToken: string;
}

// Login/Register success response
export interface AuthResponse {
  accessToken: string;
  user: AuthenticatedUser;
}

// API error response
export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

// Auth state for context
export interface AuthState {
  isAuthenticated: boolean;
  user: AuthenticatedUser | null;
  accessToken: string | null;
  loading: boolean;
} 