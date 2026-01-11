export type ColorMode = 'random' | 'cyan' | 'orange' | 'pink';

export type ColorChannel = 'cyan' | 'orange' | 'pink';

const COLOR_HEX: Record<ColorChannel, string> = {
  cyan: '#00D4FF',
  orange: '#FF8A00',
  pink: '#FF4D6D',
};

const GLOW_STYLES: Record<ColorChannel, string> = {
  cyan: '0 0 10px rgba(0, 212, 255, 0.8), 0 0 20px rgba(0, 212, 255, 0.4), 0 0 40px rgba(0, 212, 255, 0.2)',
  orange: '0 0 10px rgba(255, 138, 0, 0.8), 0 0 20px rgba(255, 138, 0, 0.4), 0 0 40px rgba(255, 138, 0, 0.2)',
  pink: '0 0 10px rgba(255, 77, 109, 0.8), 0 0 20px rgba(255, 77, 109, 0.4), 0 0 40px rgba(255, 77, 109, 0.2)',
};

// Deterministic random function based on position
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function getColorForMode(
  mode: ColorMode,
  row: number,
  col: number
): ColorChannel {
  if (mode === 'random') {
    // Use deterministic randomness based on position
    const seed = row * 1000 + col;
    const random = seededRandom(seed);
    const channels: ColorChannel[] = ['cyan', 'orange', 'pink'];
    return channels[Math.floor(random * channels.length)];
  }
  return mode;
}

export function getColorHex(color: ColorChannel): string {
  return COLOR_HEX[color];
}

export function getGlowStyle(color: ColorChannel): string {
  return GLOW_STYLES[color];
}
