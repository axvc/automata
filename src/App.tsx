import React, { useState, useCallback, useEffect } from 'react';
import { useGameOfLife } from './hooks/useGameOfLife';
import { useInterval } from './hooks/useInterval';
import { Grid } from './components/Grid/Grid';
import { PlaybackControls } from './components/Controls/PlaybackControls';
import { SpeedSlider } from './components/Controls/SpeedSlider';
import { BrushSelector, type BrushSize } from './components/Controls/BrushSelector';
import { ColorModeSelector } from './components/Controls/ColorModeSelector';
import { PatternLibrary } from './components/Patterns/PatternLibrary';
import { GenerationCounter } from './components/Stats/GenerationCounter';
import { StatCard } from './components/Stats/StatCard';
import { PopulationGraph } from './components/Stats/PopulationGraph';
import { type Pattern } from './utils/patterns';
import { placePattern } from './utils/gridHelpers';
import { type ColorMode } from './utils/colors';

const DEFAULT_ROWS = 30;
const DEFAULT_COLS = 30;
const DEFAULT_SPEED = 200;
const DEFAULT_BRUSH_SIZE: BrushSize = 1;
const DEFAULT_COLOR_MODE: ColorMode = 'random';

function App() {
  const [speed, setSpeed] = useState(DEFAULT_SPEED);
  const [brushSize, setBrushSize] = useState<BrushSize>(DEFAULT_BRUSH_SIZE);
  const [colorMode, setColorMode] = useState<ColorMode>(DEFAULT_COLOR_MODE);
  const [populationHistory, setPopulationHistory] = useState<number[]>([]);

  const game = useGameOfLife(DEFAULT_ROWS, DEFAULT_COLS);

  // Автоматическая симуляция
  useInterval(
    () => {
      game.nextGen();
    },
    game.isPlaying ? speed : null
  );

  // Обновление истории популяции
  useEffect(() => {
    setPopulationHistory((prev) => {
      // Добавляем новое значение только если оно изменилось
      if (prev.length === 0 || prev[prev.length - 1] !== game.stats.alive) {
        const newHistory = [...prev, game.stats.alive];
        return newHistory.slice(-50); // Храним последние 50 значений
      }
      return prev;
    });
  }, [game.stats.alive]);

  const handlePatternSelect = useCallback(
    (pattern: Pattern) => {
      if (game.isPlaying) return;

      // Размещаем паттерн в центре сетки
      const centerRow = Math.floor(DEFAULT_ROWS / 2) - Math.floor(pattern.pattern.length / 2);
      const centerCol = Math.floor(DEFAULT_COLS / 2) - Math.floor((pattern.pattern[0]?.length || 0) / 2);

      const newGrid = placePattern(game.grid, pattern.pattern, centerRow, centerCol);
      game.setGrid(newGrid);
    },
    [game]
  );

  const handleRandom = useCallback(() => {
    game.randomFill(0.3);
  }, [game]);

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-bg-tertiary bg-bg-secondary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-display font-bold">Cellular Automata</h1>
            <div className="flex items-center gap-4">
              <GenerationCounter generation={game.stats.generation} />
              <PlaybackControls
                isPlaying={game.isPlaying}
                onPlayPause={() => game.setIsPlaying(!game.isPlaying)}
                onStep={game.nextGen}
                onClear={game.clear}
                onRandom={handleRandom}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left: Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-center items-start">
              <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary">
                <Grid
                  grid={game.grid}
                  onCellToggle={game.toggleCell}
                  onCellSet={game.setCell}
                  colorMode={colorMode}
                  brushSize={brushSize}
                  cellSize={12}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="mt-6 bg-bg-secondary p-4 rounded-lg border border-bg-tertiary">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <PlaybackControls
                    isPlaying={game.isPlaying}
                    onPlayPause={() => game.setIsPlaying(!game.isPlaying)}
                    onStep={game.nextGen}
                    onClear={game.clear}
                    onRandom={handleRandom}
                  />
                </div>
                <div className="flex items-center gap-6 flex-wrap">
                  <SpeedSlider speed={speed} onChange={setSpeed} className="flex-1 min-w-[200px]" />
                  <BrushSelector brushSize={brushSize} onChange={setBrushSize} />
                  <ColorModeSelector colorMode={colorMode} onChange={setColorMode} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Patterns & Stats */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Patterns */}
            <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary max-h-[400px] overflow-y-auto">
              <PatternLibrary
                colorMode={colorMode}
                onPatternSelect={handlePatternSelect}
              />
            </div>

            {/* Stats */}
            <div className="bg-bg-secondary p-4 rounded-lg border border-bg-tertiary">
              <h2 className="text-xl font-display font-bold mb-4">Stats</h2>
              <div className="flex flex-col gap-3">
                <StatCard
                  label="Alive"
                  value={game.stats.alive.toLocaleString()}
                />
                <StatCard
                  label="Born"
                  value={`+${game.stats.births.toLocaleString()}`}
                />
                <StatCard
                  label="Died"
                  value={`-${game.stats.deaths.toLocaleString()}`}
                />
                <PopulationGraph data={populationHistory} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
