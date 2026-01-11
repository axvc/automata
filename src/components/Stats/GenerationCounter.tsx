import React from 'react';

interface GenerationCounterProps {
  generation: number;
  className?: string;
}

export function GenerationCounter({ generation, className = '' }: GenerationCounterProps) {
  return (
    <div className={`text-text-primary font-mono text-2xl font-bold ${className}`}>
      Gen: {generation.toLocaleString()}
    </div>
  );
}
