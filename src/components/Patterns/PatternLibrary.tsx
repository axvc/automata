import React from 'react';
import { PATTERNS_BY_CATEGORY, type Pattern } from '../../utils/patterns';
import { PatternCard } from './PatternCard';
import { ColorMode } from '../../utils/colors';

interface PatternLibraryProps {
  colorMode: ColorMode;
  onPatternSelect: (pattern: Pattern) => void;
  className?: string;
}

const CATEGORY_LABELS: Record<keyof typeof PATTERNS_BY_CATEGORY, string> = {
  'still-life': 'Still Lifes',
  oscillator: 'Oscillators',
  spaceship: 'Spaceships',
  gun: 'Guns',
  methuselah: 'Methuselahs',
};

export function PatternLibrary({
  colorMode,
  onPatternSelect,
  className = '',
}: PatternLibraryProps) {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <h2 className="font-display text-text-primary text-xl font-bold">Patterns</h2>
      <div className="flex flex-col gap-6">
        {(Object.keys(PATTERNS_BY_CATEGORY) as Array<keyof typeof PATTERNS_BY_CATEGORY>).map(
          (category) => (
            <div key={category} className="flex flex-col gap-2">
              <h3 className="text-text-muted font-mono text-sm font-semibold uppercase tracking-wide">
                {CATEGORY_LABELS[category]}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {PATTERNS_BY_CATEGORY[category].map((pattern) => (
                  <PatternCard
                    key={pattern.name}
                    pattern={pattern}
                    colorMode={colorMode}
                    onSelect={onPatternSelect}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
