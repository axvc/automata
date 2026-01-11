export type Grid = boolean[][];

export function createEmptyGrid(rows: number, cols: number): Grid {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
}

export function copyGrid(grid: Grid): Grid {
  return grid.map((row) => [...row]);
}

export function placePattern(grid: Grid, pattern: Grid, startRow: number, startCol: number): Grid {
  const newGrid = copyGrid(grid);
  const patternRows = pattern.length;
  const patternCols = pattern[0]?.length || 0;

  for (let r = 0; r < patternRows; r++) {
    for (let c = 0; c < patternCols; c++) {
      const gridRow = startRow + r;
      const gridCol = startCol + c;

      if (
        gridRow >= 0 &&
        gridRow < newGrid.length &&
        gridCol >= 0 &&
        gridCol < (newGrid[0]?.length || 0)
      ) {
        newGrid[gridRow][gridCol] = pattern[r][c];
      }
    }
  }

  return newGrid;
}
