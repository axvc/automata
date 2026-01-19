import React, { useRef, useState, useCallback, useMemo } from 'react';
import { Cell } from './Cell';
import { GridOverlay } from './GridOverlay';
import { type Grid as GridType } from '../../utils/gridHelpers';
import { ColorMode, getColorForMode } from '../../utils/colors';

interface GridProps {
  grid: GridType;
  onCellToggle: (row: number, col: number) => void;
  onCellSet?: (row: number, col: number, value: boolean) => void;
  colorMode: ColorMode;
  brushSize: number;
  cellSize?: number;
  className?: string;
}

export function GridComponent({
  grid,
  onCellToggle,
  onCellSet,
  colorMode,
  brushSize,
  cellSize = 12,
  className = '',
}: GridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lastCell, setLastCell] = useState<{ row: number; col: number } | null>(null);

  const rows = grid.length;
  const cols = grid[0]?.length || 0;

  const handleCellInteraction = useCallback(
    (row: number, col: number, value?: boolean) => {
      if (brushSize === 1) {
        if (value !== undefined && onCellSet) {
          onCellSet(row, col, value);
        } else {
          onCellToggle(row, col);
        }
      } else {
        // Рисование кистью
        const halfSize = Math.floor(brushSize / 2);
        const targetValue = value !== undefined ? value : !grid[row][col];

        for (let dr = -halfSize; dr <= halfSize; dr++) {
          for (let dc = -halfSize; dc <= halfSize; dc++) {
            const newRow = row + dr;
            const newCol = col + dc;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
              if (onCellSet) {
                onCellSet(newRow, newCol, targetValue);
              } else {
                if (grid[newRow][newCol] !== targetValue) {
                  onCellToggle(newRow, newCol);
                }
              }
            }
          }
        }
      }
    },
    [grid, rows, cols, brushSize, onCellToggle, onCellSet]
  );

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      setIsDragging(true);
      setLastCell({ row, col });
      handleCellInteraction(row, col);
    },
    [handleCellInteraction]
  );

  const handleMouseMove = useCallback(
    (row: number, col: number) => {
      if (isDragging && lastCell) {
        if (lastCell.row !== row || lastCell.col !== col) {
          setLastCell({ row, col });
          handleCellInteraction(row, col, !grid[row][col]);
        }
      }
    },
    [isDragging, lastCell, grid, handleCellInteraction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setLastCell(null);
  }, []);

  // Мемоизация цветов для каждой ячейки (только при изменении режима цвета)
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
      ref={gridRef}
      className={`relative inline-block ${className}`}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="grid gap-0"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseMove(rowIndex, colIndex)}
              className="cursor-pointer"
            >
              <Cell isAlive={cell} color={cellColors[rowIndex][colIndex]} size={cellSize} />
            </div>
          ))
        )}
      </div>
      <GridOverlay gridRef={gridRef} />
    </div>
  );
}

export const Grid = GridComponent;
