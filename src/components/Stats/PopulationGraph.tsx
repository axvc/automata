import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface PopulationGraphProps {
  data: number[];
  maxDataPoints?: number;
  className?: string;
}

export function PopulationGraph({
  data,
  maxDataPoints = 50,
  className = '',
}: PopulationGraphProps) {
  const displayData = useMemo(() => {
    return data.slice(-maxDataPoints);
  }, [data, maxDataPoints]);

  const maxValue = useMemo(() => {
    if (displayData.length === 0) return 1;
    return Math.max(...displayData, 1);
  }, [displayData]);

  const minValue = useMemo(() => {
    if (displayData.length === 0) return 0;
    return Math.min(...displayData);
  }, [displayData]);

  const range = maxValue - minValue || 1;

  const points = useMemo(() => {
    return displayData.map((value, index) => {
      const x = (index / (displayData.length - 1 || 1)) * 100;
      const y = 100 - ((value - minValue) / range) * 100;
      return { x, y, value };
    });
  }, [displayData, minValue, range]);

  if (displayData.length === 0) {
    return (
      <div
        className={`bg-bg-secondary p-4 rounded-lg border border-bg-tertiary ${className}`}
      >
        <div className="text-xs text-text-muted font-mono mb-2">
          Population Graph
        </div>
        <div className="h-24 flex items-center justify-center text-text-dim text-sm">
          No data
        </div>
      </div>
    );
  }

  const pathData = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ');

  return (
    <div
      className={`bg-bg-secondary p-4 rounded-lg border border-bg-tertiary ${className}`}
    >
      <div className="text-xs text-text-muted font-mono mb-2">
        Population Graph
      </div>
      <div className="h-24 relative">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="populationGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={pathData}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.path
            d={`${pathData} L 100 100 L 0 100 Z`}
            fill="url(#populationGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </svg>
        <div className="absolute top-0 right-0 text-xs text-text-muted font-mono">
          {maxValue.toLocaleString()}
        </div>
        <div className="absolute bottom-0 right-0 text-xs text-text-muted font-mono">
          {minValue.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
