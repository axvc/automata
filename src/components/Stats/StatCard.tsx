import React, { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function StatCard({ label, value, className = '' }: StatCardProps) {
  return (
    <div className={`bg-bg-secondary border-bg-tertiary rounded-lg border p-3 ${className}`}>
      <div className="text-text-muted mb-1 font-mono text-xs">{label}</div>
      <div className="text-text-primary font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}
