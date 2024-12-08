import { useMutation } from '@tanstack/react-query';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';
import api from '../api/client';

// Login mutation function
const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  const { user, accessToken } = response;
  return {user, accessToken};
};

// Login mutation hook
export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: loginUser,
  });
};

// Register mutation function
const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  const { user, accessToken } = response;
  return {user, accessToken};
};

// Register mutation hook
export const useRegisterMutation = () => {
  return useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: registerUser,
  });
}; 