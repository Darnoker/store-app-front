import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { authApi } from '../api/authApi';
import { ApiError, clearStoredToken, getStoredToken, setStoredToken } from '../api/http';
import type { LoginRequest, RegisterRequest, UserProfile } from '../types/api';

interface AuthContextValue {
  user: UserProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<UserProfile>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    if (!getStoredToken()) {
      setUser(null);
      return;
    }

    try {
      const profile = await authApi.me();
      setUser(profile);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        clearStoredToken();
        setUser(null);
        return;
      }
      throw error;
    }
  };

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      try {
        if (getStoredToken()) {
          const profile = await authApi.me();
          if (active) setUser(profile);
        }
      } catch {
        clearStoredToken();
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    };

    void bootstrap();

    return () => {
      active = false;
    };
  }, []);

  const login = async (payload: LoginRequest) => {
    const token = await authApi.login(payload);
    setStoredToken(token.accessToken);

    try {
      const profile = await authApi.me();
      setUser(profile);
    } catch (error) {
      clearStoredToken();
      throw error;
    }
  };

  const register = (payload: RegisterRequest) => authApi.register(payload);

  const logout = () => {
    clearStoredToken();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAuthenticated: Boolean(user),
      isAdmin: user?.roles.some((role) => role.toUpperCase().replace(/^ROLE_/, '') === 'ADMIN') ?? false,
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
