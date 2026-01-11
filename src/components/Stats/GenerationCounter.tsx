import React from 'react';

interface GenerationCounterProps {
  generation: number;
  className?: string;
}

export function GenerationCounter({ generation, className = '' }: GenerationCounterProps) {
  return (
    <div className={`text-text-primary font-mono text-lg font-bold sm:text-2xl ${className}`}>
      <span className="hidden sm:inline">Gen: </span>
      <span className="sm:hidden">#</span>
      {generation.toLocaleString()}
    </div>
  );
}
