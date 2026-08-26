import type { ReactNode } from 'react';

export function StatusMessage({
  type = 'info',
  children,
}: {
  type?: 'info' | 'success' | 'error';
  children: ReactNode;
}) {
  return <div className={`status-message status-${type}`}>{children}</div>;
}
