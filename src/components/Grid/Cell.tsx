import React, { memo } from 'react';
import { ColorChannel, getColorHex } from '../../utils/colors';

interface CellProps {
  isAlive: boolean;
  color: ColorChannel;
  size: number;
  className?: string;
}

// Simplified single-layer glow for better performance
const getOptimizedGlow = (color: ColorChannel): string => {
  const glowColors = {
    cyan: 'rgba(0, 212, 255, 0.6)',
    orange: 'rgba(255, 138, 0, 0.6)',
    pink: 'rgba(255, 77, 109, 0.6)',
  };
  return `0 0 15px ${glowColors[color]}`;
};

function CellComponent({ isAlive, color, size, className = '' }: CellProps) {
  const colorHex = getColorHex(color);
  const glowStyle = isAlive ? getOptimizedGlow(color) : 'none';

  return (
    <div
      className={`cell ${isAlive ? 'cell-alive' : 'cell-dead'} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isAlive ? colorHex : 'transparent',
        boxShadow: glowStyle,
        transform: isAlive ? 'scale(1)' : 'scale(0)',
        opacity: isAlive ? 1 : 0,
        // CSS transitions - much faster than spring animations
        transition: 'transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out',
        // GPU acceleration hint
        willChange: 'transform, opacity',
      }}
    />
  );
}

export const Cell = memo(CellComponent);
