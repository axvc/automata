import React from 'react';
import { Play, Pause, StepForward, Square, Shuffle } from 'lucide-react';
import { Button } from '../UI/Button';

interface PlaybackControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onStep: () => void;
  onClear: () => void;
  onRandom: () => void;
  className?: string;
}

export function PlaybackControls({
  isPlaying,
  onPlayPause,
  onStep,
  onClear,
  onRandom,
  className = '',
}: PlaybackControlsProps) {
  return (
    <div className={`flex items-center gap-1 sm:gap-2 ${className}`}>
      <Button onClick={onPlayPause} variant="primary" size="md" className="flex items-center gap-2">
        {isPlaying ? (
          <>
            <Pause size={18} />
            <span className="hidden sm:inline">Pause</span>
          </>
        ) : (
          <>
            <Play size={18} />
            <span className="hidden sm:inline">Play</span>
          </>
        )}
      </Button>

      <Button
        onClick={onStep}
        variant="secondary"
        size="md"
        className="flex items-center gap-2"
        disabled={isPlaying}
      >
        <StepForward size={18} />
        <span className="hidden md:inline">Step</span>
      </Button>

      <Button
        onClick={onClear}
        variant="secondary"
        size="md"
        className="flex items-center gap-2"
        disabled={isPlaying}
      >
        <Square size={18} />
        <span className="hidden md:inline">Clear</span>
      </Button>

      <Button
        onClick={onRandom}
        variant="ghost"
        size="md"
        className="flex items-center gap-2"
        disabled={isPlaying}
      >
        <Shuffle size={18} />
        <span className="hidden md:inline">Random</span>
      </Button>
    </div>
  );
}
