/**
 * 页面外壳容器 PageShell
 */

import React from 'react';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

export const PageShell: React.FC<PageShellProps> = ({ children, className = '' }) => {
  return (
    <main className={`min-h-[calc(100vh-4.5rem)] flex flex-col ${className}`}>
      {children}
    </main>
  );
};
