import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function StatCard({ label, value, className = '' }: StatCardProps) {
  return (
    <div className={`bg-bg-secondary p-3 rounded-lg border border-bg-tertiary ${className}`}>
      <div className="text-xs text-text-muted font-mono mb-1">{label}</div>
      <div className="text-lg text-text-primary font-mono font-semibold">
        {value}
      </div>
    </div>
  );
}
