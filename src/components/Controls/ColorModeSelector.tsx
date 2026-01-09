import { Button } from '../UI/Button';
import { ColorMode } from '../../utils/colors';

interface ColorModeSelectorProps {
  colorMode: ColorMode;
  onChange: (mode: ColorMode) => void;
  className?: string;
}

const COLOR_MODES: { mode: ColorMode; label: string }[] = [
  { mode: 'random', label: 'Random' },
  { mode: 'cyan', label: 'Cyan' },
  { mode: 'orange', label: 'Orange' },
  { mode: 'pink', label: 'Pink' },
];

export function ColorModeSelector({
  colorMode,
  onChange,
  className = '',
}: ColorModeSelectorProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-sm text-text-muted font-mono">Color:</span>
      {COLOR_MODES.map(({ mode, label }) => (
        <Button
          key={mode}
          onClick={() => onChange(mode)}
          variant={colorMode === mode ? 'primary' : 'ghost'}
          size="sm"
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
