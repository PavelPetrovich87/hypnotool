import { useMutation } from '@tanstack/react-query';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth';
import api from '../api/client';

// Login mutation function
const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  return response.data;
};

// Login mutation hook
export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};

// Register mutation function
const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', credentials);
  return response.data;
};

// Register mutation hook
export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: registerUser,
  });
}; 