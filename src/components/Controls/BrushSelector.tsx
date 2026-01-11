import React from 'react';
import { Button } from '../UI/Button';

export type BrushSize = 1 | 3 | 5;

interface BrushSelectorProps {
  brushSize: BrushSize;
  onChange: (size: BrushSize) => void;
  className?: string;
}

const BRUSH_SIZES: BrushSize[] = [1, 3, 5];

export function BrushSelector({ brushSize, onChange, className = '' }: BrushSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-text-muted font-mono text-sm">Brush:</span>
      {BRUSH_SIZES.map((size) => (
        <Button
          key={size}
          onClick={() => onChange(size)}
          variant={brushSize === size ? 'primary' : 'ghost'}
          size="sm"
          className="min-w-[40px]"
        >
          {size}×{size}
        </Button>
      ))}
    </div>
  );
}
