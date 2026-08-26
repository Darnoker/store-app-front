import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { FullPageLoader } from '../components/FullPageLoader';

export function RequireAdmin({ children }: { children: ReactNode }) {
  const { isAdmin, loading } = useAuth();

  if (loading) return <FullPageLoader label="Sprawdzanie uprawnień…" />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <>{children}</>;
}
