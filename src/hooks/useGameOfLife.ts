import { useState, useCallback, useMemo } from 'react';
import { createEmptyGrid, copyGrid, type Grid } from '../utils/gridHelpers';

interface GameStats {
  generation: number;
  alive: number;
  births: number;
  deaths: number;
}

interface UseGameOfLifeReturn {
  grid: Grid;
  isPlaying: boolean;
  stats: GameStats;
  nextGen: () => void;
  setIsPlaying: (playing: boolean) => void;
  toggleCell: (row: number, col: number) => void;
  setCell: (row: number, col: number, value: boolean) => void;
  setGrid: (newGrid: Grid) => void;
  clear: () => void;
  randomFill: (density: number) => void;
}

function countAliveNeighbors(grid: Grid, row: number, col: number): number {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  let count = 0;

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const newRow = row + dr;
      const newCol = col + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol]) {
        count++;
      }
    }
  }

  return count;
}

function countAlive(grid: Grid): number {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < (grid[row]?.length || 0); col++) {
      if (grid[row][col]) count++;
    }
  }
  return count;
}

export function useGameOfLife(rows: number, cols: number): UseGameOfLifeReturn {
  const [grid, setGrid] = useState<Grid>(() => createEmptyGrid(rows, cols));
  const [isPlaying, setIsPlaying] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [births, setBirths] = useState(0);
  const [deaths, setDeaths] = useState(0);

  const stats = useMemo<GameStats>(() => {
    const alive = countAlive(grid);
    return {
      generation,
      alive,
      births,
      deaths,
    };
  }, [grid, generation, births, deaths]);

  const nextGen = useCallback(() => {
    setGrid((currentGrid) => {
      const newGrid = createEmptyGrid(rows, cols);
      let newBirths = 0;
      let newDeaths = 0;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const neighbors = countAliveNeighbors(currentGrid, row, col);
          const isAlive = currentGrid[row][col];

          if (isAlive) {
            // Live cell survives if it has 2 or 3 neighbors
            if (neighbors === 2 || neighbors === 3) {
              newGrid[row][col] = true;
            } else {
              newDeaths++;
            }
          } else {
            // Dead cell becomes alive if it has exactly 3 neighbors
            if (neighbors === 3) {
              newGrid[row][col] = true;
              newBirths++;
            }
          }
        }
      }

      setBirths(newBirths);
      setDeaths(newDeaths);
      setGeneration((prev) => prev + 1);

      return newGrid;
    });
  }, [rows, cols]);

  const toggleCell = useCallback(
    (row: number, col: number) => {
      if (isPlaying) return;
      setGrid((currentGrid) => {
        const newGrid = copyGrid(currentGrid);
        newGrid[row][col] = !newGrid[row][col];
        return newGrid;
      });
    },
    [isPlaying]
  );

  const setCell = useCallback(
    (row: number, col: number, value: boolean) => {
      if (isPlaying) return;
      setGrid((currentGrid) => {
        const newGrid = copyGrid(currentGrid);
        newGrid[row][col] = value;
        return newGrid;
      });
    },
    [isPlaying]
  );

  const setGridState = useCallback(
    (newGrid: Grid) => {
      if (isPlaying) return;
      setGrid(newGrid);
    },
    [isPlaying]
  );

  const clear = useCallback(() => {
    if (isPlaying) return;
    setGrid(createEmptyGrid(rows, cols));
    setGeneration(0);
    setBirths(0);
    setDeaths(0);
  }, [isPlaying, rows, cols]);

  const randomFill = useCallback(
    (density: number) => {
      if (isPlaying) return;
      const newGrid = createEmptyGrid(rows, cols);
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newGrid[row][col] = Math.random() < density;
        }
      }
      setGrid(newGrid);
      setGeneration(0);
      setBirths(0);
      setDeaths(0);
    },
    [isPlaying, rows, cols]
  );

  return {
    grid,
    isPlaying,
    stats,
    nextGen,
    setIsPlaying,
    toggleCell,
    setCell,
    setGrid: setGridState,
    clear,
    randomFill,
  };
}
