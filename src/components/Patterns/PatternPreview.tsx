import { useMemo } from 'react';
import { type Grid } from '../../utils/gridHelpers';
import { ColorMode, getColorForMode } from '../../utils/colors';
import { Cell } from '../Grid/Cell';

interface PatternPreviewProps {
  pattern: Grid;
  colorMode: ColorMode;
  cellSize?: number;
  className?: string;
}

export function PatternPreview({
  pattern,
  colorMode,
  cellSize = 6,
  className = '',
}: PatternPreviewProps) {
  const rows = pattern.length;
  const cols = pattern[0]?.length || 0;

  const cellColors = useMemo(() => {
    const colors: Array<Array<ReturnType<typeof getColorForMode>>> = [];
    for (let row = 0; row < rows; row++) {
      colors[row] = [];
      for (let col = 0; col < cols; col++) {
        colors[row][col] = getColorForMode(colorMode, row, col);
      }
    }
    return colors;
  }, [rows, cols, colorMode]);

  return (
    <div
      className={`inline-grid gap-0 ${className}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
      }}
    >
      {pattern.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isAlive={cell}
            color={cellColors[rowIndex][colIndex]}
            size={cellSize}
          />
        ))
      )}
    </div>
  );
}
