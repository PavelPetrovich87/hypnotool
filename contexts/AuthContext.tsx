import { createContext, useContext, useEffect, useState } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { AuthState, AuthenticatedUser } from '@/types/auth';

interface AuthContextType extends AuthState {
  signIn: (token: string, user: AuthenticatedUser) => void;
  signOut: () => void;
  accessToken: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  const segments = useSegments();
  const router = useRouter();

  // Check auth state and redirect
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!accessToken && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    } else if (accessToken && inAuthGroup) {
      // Redirect to main app if authenticated
      router.replace('/(tabs)');
    }
  }, [accessToken, segments, loading]);

  const signIn = (newToken: string, newUser: AuthenticatedUser) => {
    setAccessToken(newToken);
    setUser(newUser);
  };

  const signOut = () => {
    setAccessToken(null);
    setUser(null);
    router.replace('/(auth)/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        isAuthenticated: !!accessToken,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
} 