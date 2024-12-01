import { useLoginMutation, useRegisterMutation } from '@/services/queries/auth';
import { useAuth } from '@/contexts/AuthContext';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

export const useAuthController = () => {
  const auth = useAuth();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(credentials);
      auth.signIn(response.accessToken, response.user);
      // Navigation handled by AuthContext
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      const response = await registerMutation.mutateAsync(credentials);
      auth.signIn(response.accessToken, response.user);
      // Navigation handled by AuthContext
    } catch (error) {
      throw error;
    }
  };

  return {
    handleLogin,
    handleRegister,
    loginLoading: loginMutation.isPending,
    registerLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  };
}; 