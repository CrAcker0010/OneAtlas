import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'explorer' | 'builder' | 'studio' | 'scale';
  creditsUsed: number;
  creditsTotal: number;
  isNewUser?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  loginWithOAuth: (provider: 'github' | 'google') => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEY = 'oneatlas_auth';

// Simulated user database (in production this would be a real API)
const MOCK_USERS: Record<string, User & { password: string }> = {
  'demo@oneatlas.app': {
    id: 'usr_demo',
    name: 'Demo User',
    email: 'demo@oneatlas.app',
    password: 'demo123',
    plan: 'builder',
    creditsUsed: 145,
    creditsTotal: 200,
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Check if session is still valid (within 30 days)
        if (parsed.user && parsed.expiresAt && Date.now() < parsed.expiresAt) {
          setUser(parsed.user);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const persistSession = (u: User) => {
    const expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: u, expiresAt }));
  };

  const login = useCallback(async (email: string, password: string) => {
    await new Promise(r => setTimeout(r, 900)); // simulate API call
    const found = MOCK_USERS[email.toLowerCase()];
    if (!found || found.password !== password) {
      return { success: false, error: 'Invalid email or password. Try demo@oneatlas.app / demo123' };
    }
    const { password: _, ...userData } = found;
    setUser(userData);
    persistSession(userData);
    return { success: true };
  }, []);

  const loginWithOAuth = useCallback(async (provider: 'github' | 'google') => {
    await new Promise(r => setTimeout(r, 1200));
    // Simulate OAuth — creates a user session
    const oauthUser: User = {
      id: `usr_oauth_${Date.now()}`,
      name: provider === 'google' ? 'Google User' : 'GitHub User',
      email: `${provider}.user@example.com`,
      plan: 'explorer',
      creditsUsed: 0,
      creditsTotal: 30,
      isNewUser: true,
    };
    setUser(oauthUser);
    persistSession(oauthUser);
    return { success: true };
  }, []);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await new Promise(r => setTimeout(r, 1200));
    if (MOCK_USERS[email.toLowerCase()]) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email,
      plan: 'explorer',
      creditsUsed: 0,
      creditsTotal: 30,
      isNewUser: true,
    };
    MOCK_USERS[email.toLowerCase()] = { ...newUser, password };
    setUser(newUser);
    persistSession(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, loginWithOAuth, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

// Higher-order component for protected routes
export function withAuth<P extends object>(Component: React.ComponentType<P>) {
  return function ProtectedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.replace(`/auth/signin?redirect=${encodeURIComponent(router.asPath)}`);
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
      return <AuthLoadingScreen />;
    }

    if (!isAuthenticated) {
      return <AuthLoadingScreen />;
    }

    return <Component {...props} />;
  };
}

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-dark-400 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-pink opacity-20 blur-lg" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-pink flex items-center justify-center">
            <svg className="w-8 h-8 text-white animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        </div>
        <p className="text-slate-400 text-sm animate-pulse">Loading your workspace...</p>
      </div>
    </div>
  );
}
