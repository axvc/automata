import { type Grid } from './gridHelpers';

export interface Pattern {
  name: string;
  description?: string;
  pattern: Grid;
}

// Helper function to create pattern from string representation
function patternFromString(rows: string[]): Grid {
  return rows.map((row) => row.split('').map((char) => char === 'O' || char === '1'));
}

// Still Lifes
const BLOCK: Pattern = {
  name: 'Block',
  description: '2×2 stable square',
  pattern: patternFromString(['OO', 'OO']),
};

const BEEHIVE: Pattern = {
  name: 'Beehive',
  description: 'Hexagonal stable pattern',
  pattern: patternFromString([' OO ', 'O  O', ' OO ']),
};

const LOAF: Pattern = {
  name: 'Loaf',
  description: 'Stable pattern',
  pattern: patternFromString([' OO ', 'O OO', ' OO ']),
};

const BOAT: Pattern = {
  name: 'Boat',
  description: 'Small stable pattern',
  pattern: patternFromString(['OO ', 'O O', ' O ']),
};

// Oscillators
const BLINKER: Pattern = {
  name: 'Blinker',
  description: 'Period 2 oscillator',
  pattern: patternFromString(['OOO']),
};

const TOAD: Pattern = {
  name: 'Toad',
  description: 'Period 2 oscillator',
  pattern: patternFromString([' OOO', 'OOO ']),
};

const BEACON: Pattern = {
  name: 'Beacon',
  description: 'Period 2 oscillator',
  pattern: patternFromString(['OO  ', 'OO  ', '  OO', '  OO']),
};

const PULSAR: Pattern = {
  name: 'Pulsar',
  description: 'Period 3 oscillator',
  pattern: patternFromString([
    '  OOO   OOO  ',
    '             ',
    'O    O O    O',
    'O    O O    O',
    'O    O O    O',
    '  OOO   OOO  ',
    '             ',
    '  OOO   OOO  ',
    'O    O O    O',
    'O    O O    O',
    'O    O O    O',
    '             ',
    '  OOO   OOO  ',
  ]),
};

const PENTADECATHLON: Pattern = {
  name: 'Pentadecathlon',
  description: 'Period 15 oscillator',
  pattern: patternFromString([
    '  OO  ',
    'O  O O',
    'O  O O',
    'O  O O',
    '  OO  ',
    '  OO  ',
    'O  O O',
    'O  O O',
    'O  O O',
    '  OO  ',
  ]),
};

// Spaceships
const GLIDER: Pattern = {
  name: 'Glider',
  description: 'Period 4 spaceship',
  pattern: patternFromString([' O ', '  O', 'OOO']),
};

const LWSS: Pattern = {
  name: 'LWSS',
  description: 'Lightweight spaceship',
  pattern: patternFromString([' OOOO', 'O   O', '    O', 'O  O ']),
};

const MWSS: Pattern = {
  name: 'MWSS',
  description: 'Middleweight spaceship',
  pattern: patternFromString(['  OOOO ', ' O    O', 'O      O', 'O      O', ' OOOO  ']),
};

const HWSS: Pattern = {
  name: 'HWSS',
  description: 'Heavyweight spaceship',
  pattern: patternFromString([
    '   OOOO  ',
    '  O    O ',
    ' O      O',
    'O        O',
    'O        O',
    ' O      O ',
    '  OOOO   ',
  ]),
};

// Guns
const GOSPER_GLIDER_GUN: Pattern = {
  name: 'Gosper Glider Gun',
  description: 'Produces gliders',
  pattern: patternFromString([
    '                        O           ',
    '                      O O           ',
    '            OO      OO            OO',
    '           O   O    OO            OO',
    'OO        O     O   OO              ',
    'OO        O   O OO    O O           ',
    '          O     O       O            ',
    '           O   O                    ',
    '            OO                      ',
  ]),
};

// Methuselahs
const R_PENTOMINO: Pattern = {
  name: 'R-pentomino',
  description: 'Takes 1103 generations',
  pattern: patternFromString([' OO', 'OO ', ' O ']),
};

const DIEHARD: Pattern = {
  name: 'Diehard',
  description: 'Takes 130 generations',
  pattern: patternFromString(['      O ', 'OO      ', ' O   OOO']),
};

const ACORN: Pattern = {
  name: 'Acorn',
  description: 'Takes 5206 generations',
  pattern: patternFromString([' O      ', '   O    ', 'OO  OOO ']),
};

// Export patterns by category
export const PATTERNS_BY_CATEGORY = {
  'still-life': [BLOCK, BEEHIVE, LOAF, BOAT],
  oscillator: [BLINKER, TOAD, BEACON, PULSAR, PENTADECATHLON],
  spaceship: [GLIDER, LWSS, MWSS, HWSS],
  gun: [GOSPER_GLIDER_GUN],
  methuselah: [R_PENTOMINO, DIEHARD, ACORN],
};

// Export all patterns as a flat array
export const ALL_PATTERNS: Pattern[] = [
  ...PATTERNS_BY_CATEGORY['still-life'],
  ...PATTERNS_BY_CATEGORY.oscillator,
  ...PATTERNS_BY_CATEGORY.spaceship,
  ...PATTERNS_BY_CATEGORY.gun,
  ...PATTERNS_BY_CATEGORY.methuselah,
];
