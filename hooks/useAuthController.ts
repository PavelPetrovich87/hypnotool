import { useRouter } from 'expo-router';
import { useLoginMutation, useRegisterMutation } from '@/services/queries/auth';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

export const useAuthController = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();
  const registerMutation = useRegisterMutation();

  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await loginMutation.mutateAsync(credentials);
      // TODO: Store token and user data
      // TODO: Update global auth state
      router.replace('/(tabs)');
    } catch (error) {
      // For now, we'll just rethrow the error
      throw error;
    }
  };

  const handleRegister = async (credentials: RegisterCredentials) => {
    try {
      const response = await registerMutation.mutateAsync(credentials);
      // TODO: Store token and user data
      // TODO: Update global auth state
      router.replace('/(tabs)');
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