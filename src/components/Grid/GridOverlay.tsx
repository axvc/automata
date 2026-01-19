import React, { RefObject } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

interface GridOverlayProps {
  gridRef: RefObject<HTMLDivElement>;
  className?: string;
}

export function GridOverlay({ gridRef, className = '' }: GridOverlayProps) {
  const mousePos = useMousePosition(gridRef);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(
          circle at ${mousePos.x}px ${mousePos.y}px,
          rgba(255, 255, 255, 0.05) 0%,
          transparent 50%
        )`,
        opacity: mousePos.x === 0 && mousePos.y === 0 ? 0 : 1,
        transition: 'opacity 0.3s ease',
        // GPU acceleration - force composite layer
        willChange: 'opacity',
        transform: 'translateZ(0)',
      }}
    />
  );
}
