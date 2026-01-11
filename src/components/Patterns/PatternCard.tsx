import React from 'react';
import { Pattern } from '../../utils/patterns';
import { PatternPreview } from './PatternPreview';
import { ColorMode } from '../../utils/colors';

interface PatternCardProps {
  pattern: Pattern;
  colorMode: ColorMode;
  onSelect: (pattern: Pattern) => void;
  className?: string;
}

export function PatternCard({ pattern, colorMode, onSelect, className = '' }: PatternCardProps) {
  return (
    <div
      className={`bg-bg-secondary border-bg-tertiary cursor-pointer rounded-lg border p-3 transition-colors duration-150 hover:border-text-dim hover:bg-bg-tertiary/50 active:bg-bg-tertiary ${className}`}
      onClick={() => onSelect(pattern)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex min-h-[60px] items-center justify-center">
          <PatternPreview pattern={pattern.pattern} colorMode={colorMode} cellSize={6} />
        </div>
        <div className="text-center">
          <div className="text-text-primary font-mono text-sm font-semibold">{pattern.name}</div>
          {pattern.description && (
            <div className="text-text-muted mt-1 text-xs">{pattern.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}
