import { createContext, useContext, useEffect, useState } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { AuthState, AuthenticatedUser } from '@/types/auth';

interface AuthContextType extends AuthState {
  signIn: (token: string, user: AuthenticatedUser) => void;
  signOut: () => void;
  accessToken: string | null;
  loading: boolean;
  lastTab: string | null;
  setLastTab: (tab: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const VALID_TAB_ROUTES = {
  index: '/(tabs)',
  explore: '/(tabs)/explore',
} as const;

type ValidTabRoute = keyof typeof VALID_TAB_ROUTES;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastTab, setLastTab] = useState<string | null>(null);
  
  const segments = useSegments();
  const router = useRouter();

  // Check auth state and redirect
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!accessToken && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (accessToken && inAuthGroup) {
      const route = lastTab && lastTab in VALID_TAB_ROUTES 
        ? VALID_TAB_ROUTES[lastTab as ValidTabRoute]
        : VALID_TAB_ROUTES.index;
      
      router.replace(route);
    }
  }, [accessToken, segments, loading, lastTab]);

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
        lastTab,
        setLastTab,
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