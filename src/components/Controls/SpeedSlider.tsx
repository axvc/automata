import React from 'react';
import { Slider } from '../UI/Slider';

interface SpeedSliderProps {
  speed: number;
  onChange: (speed: number) => void;
  className?: string;
}

export function SpeedSlider({ speed, onChange, className = '' }: SpeedSliderProps) {
  return (
    <div className={className}>
      <Slider value={speed} onChange={onChange} min={50} max={1000} step={50} label="Speed" />
    </div>
  );
}
