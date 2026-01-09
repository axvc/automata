import { memo } from 'react';
import { motion } from 'framer-motion';
import { ColorChannel, getColorHex, getGlowStyle } from '../../utils/colors';

interface CellProps {
  isAlive: boolean;
  color: ColorChannel;
  size: number;
  className?: string;
}

function CellComponent({ isAlive, color, size, className = '' }: CellProps) {
  const colorHex = getColorHex(color);
  const glowStyle = isAlive ? getGlowStyle(color) : '';

  return (
    <motion.div
      className={`cell ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: isAlive ? colorHex : 'transparent',
        boxShadow: isAlive ? glowStyle : 'none',
      }}
      className={isAlive ? 'cell-pulse' : ''}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: isAlive ? 1 : 0,
        opacity: isAlive ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    />
  );
}

export const Cell = memo(CellComponent);
