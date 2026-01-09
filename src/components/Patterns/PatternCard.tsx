import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pattern } from '../../utils/patterns';
import { PatternPreview } from './PatternPreview';
import { ColorMode } from '../../utils/colors';
import { Button } from '../UI/Button';

interface PatternCardProps {
  pattern: Pattern;
  colorMode: ColorMode;
  onSelect: (pattern: Pattern) => void;
  className?: string;
}

export function PatternCard({
  pattern,
  colorMode,
  onSelect,
  className = '',
}: PatternCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`bg-bg-secondary p-3 rounded-lg border border-bg-tertiary cursor-pointer interactive-element ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(pattern)}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-center min-h-[60px]">
          {isHovered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <PatternPreview
                pattern={pattern.pattern}
                colorMode={colorMode}
                cellSize={8}
              />
            </motion.div>
          ) : (
            <PatternPreview
              pattern={pattern.pattern}
              colorMode={colorMode}
              cellSize={6}
            />
          )}
        </div>
        <div className="text-center">
          <div className="text-sm font-mono font-semibold text-text-primary">
            {pattern.name}
          </div>
          {pattern.description && (
            <div className="text-xs text-text-muted mt-1">
              {pattern.description}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
