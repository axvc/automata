# Cellular Automata Playground
## Requirements & Design Plan (RDP)

---

## 1. Project Overview

**Name:** Cellular Automata Playground  
**Type:** Interactive React Application  
**Goal:** Visualization of cellular automata (Game of Life) with a modern, refined design

### Key Features
- Visual style inspired by motion.dev / sci-fi dashboards
- Dark theme with RGB glow on cells
- Subtle, smooth animations (Framer Motion / Spring)
- Interactive cursor shine effects
- Shimmer effect for loading states

---

## 2. Functional Requirements

### 2.1 Game Grid

| Requirement | Description |
|-------------|-------------|
| Size | Configurable grid (min 10×10, max 100×100) |
| Cells | Square cells with bloom/glow effect on activation |
| Colors | Three glow channels: cyan (#00D4FF), orange (#FF8A00), pink (#FF4D6D) |
| States | Dead (dark), Alive (glowing), Transitioning (fade) |

### 2.2 Simulation Controls

- **Play/Pause** — start and stop generation
- **Step** — manual single iteration
- **Speed** — speed slider (50ms – 1000ms)
- **Clear** — clear the grid
- **Random** — random fill (with density setting)

### 2.3 Patterns

**Preset Patterns:**

| Category | Patterns |
|----------|----------|
| Still lifes | Block, Beehive, Loaf, Boat |
| Oscillators | Blinker, Toad, Beacon, Pulsar, Pentadecathlon |
| Spaceships | Glider, LWSS, MWSS, HWSS |
| Guns | Gosper Glider Gun |
| Methuselahs | R-pentomino, Diehard, Acorn |

**Pattern Features:**
- Pattern preview on hover
- Drag & drop onto grid
- Rotation (90°, 180°, 270°)
- Flip (horizontal/vertical)

### 2.4 Manual Editing

- Click — toggle single cell
- Drag — draw multiple cells
- Brush size — brush dimensions (1×1, 3×3, 5×5)

### 2.5 Statistics

- Current generation (number)
- Alive cells (count)
- Births / Deaths per step
- Population graph (last 50 generations)

### 2.6 Colony Status

| Status | Condition |
|--------|-----------|
| Empty | 0 alive cells (never had a population) |
| Evolution | Population is changing (births > 0 or deaths > 0) |
| Eternal | Population is stable (births = 0 and deaths = 0, but alive > 0) |
| Dead | Had a population, but all died out (alive = 0 after existing) |

---

## 3. Visual Style

### 3.1 Aesthetic

**Direction:** Sci-fi terminal / Motion.dev aesthetic

**Key Characteristics:**
- Dark background (#0A0A0B or similar)
- High contrast on active elements
- Glow/bloom as the main visual accent
- Dotted/grid texture background
- Monospace font for data display

### 3.2 Typography

```
Primary:    JetBrains Mono / IBM Plex Mono / Fira Code
Display:    Space Grotesk / Manrope (for headings)
```

### 3.3 Color Palette

```css
/* Background */
--bg-primary:    #0A0A0B;
--bg-secondary:  #111113;
--bg-tertiary:   #1A1A1D;

/* Cells - three channels */
--cell-cyan:     #00D4FF;
--cell-orange:   #FF8A00;
--cell-pink:     #FF4D6D;

/* UI Accents */
--accent:        #3B82F6;
--success:       #10B981;
--warning:       #F59E0B;

/* Text */
--text-primary:  #FAFAFA;
--text-muted:    #71717A;
--text-dim:      #3F3F46;

/* Glow */
--glow-cyan:     0 0 20px rgba(0, 212, 255, 0.5);
--glow-orange:   0 0 20px rgba(255, 138, 0, 0.5);
--glow-pink:     0 0 20px rgba(255, 77, 109, 0.5);
```

### 3.4 Cell Effects

**Reference from prompt:**
> "invisible 3x3 grid and the lights just appear... make the lights square and have some bloom/glow to them"

**Implementation:**
- Cells without explicit borders
- On activation — soft appearance (opacity + scale)
- Bloom effect via box-shadow with blur
- Random color selection from three channels (or selection mode)

```css
.cell.alive {
  background: var(--cell-cyan);
  box-shadow: 
    0 0 10px var(--cell-cyan),
    0 0 20px rgba(0, 212, 255, 0.4),
    0 0 40px rgba(0, 212, 255, 0.2);
  animation: pulse 2s ease-in-out infinite;
}
```

---

## 4. Animations and Effects

### 4.1 Shimmer Effect (for loading text)

```css
.shimmer {
  background: linear-gradient(
    90deg,
    var(--text-dim) 0%,
    var(--text-muted) 50%,
    var(--text-dim) 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### 4.2 Cursor Shine Effect

**Principle:** Radial gradient following the cursor

```jsx
// Cursor position tracking
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

// CSS variables on element
style={{
  '--mouse-x': `${mousePos.x}px`,
  '--mouse-y': `${mousePos.y}px`,
}}

// CSS
.interactive-element::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at var(--mouse-x) var(--mouse-y),
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  opacity: 0;
  transition: opacity 0.3s;
}

.interactive-element:hover::before {
  opacity: 1;
}
```

### 4.3 Cell Transitions (Framer Motion)

```jsx
<motion.div
  initial={{ scale: 0, opacity: 0 }}
  animate={{ 
    scale: isAlive ? 1 : 0, 
    opacity: isAlive ? 1 : 0 
  }}
  transition={{ 
    type: "spring", 
    stiffness: 500, 
    damping: 30 
  }}
/>
```

### 4.4 Staggered Grid Animation

```jsx
// On load / grid appearance
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.002, // Appearance wave
        delayChildren: 0.1
      }
    }
  }}
/>
```

---

## 5. Component Structure

```
src/
├── components/
│   ├── Grid/
│   │   ├── Grid.tsx           # Main grid
│   │   ├── Cell.tsx           # Individual cell
│   │   └── GridOverlay.tsx    # Shine effect
│   │
│   ├── Controls/
│   │   ├── PlaybackControls.tsx
│   │   ├── SpeedSlider.tsx
│   │   ├── BrushSelector.tsx
│   │   └── ColorModeSelector.tsx
│   │
│   ├── Patterns/
│   │   ├── PatternLibrary.tsx
│   │   ├── PatternCard.tsx
│   │   └── PatternPreview.tsx
│   │
│   ├── Stats/
│   │   ├── GenerationCounter.tsx
│   │   ├── PopulationGraph.tsx
│   │   └── StatCard.tsx
│   │
│   └── UI/
│       ├── Button.tsx
│       ├── Slider.tsx
│       ├── ShimmerText.tsx
│       └── GlowContainer.tsx
│
├── hooks/
│   ├── useGameOfLife.ts       # Automaton logic
│   ├── useMousePosition.ts    # Cursor tracking
│   └── useInterval.ts         # Generation timer
│
├── utils/
│   ├── patterns.ts            # Preset patterns
│   ├── gridHelpers.ts         # Grid utilities
│   └── colors.ts              # Color functions
│
├── styles/
│   ├── globals.css
│   ├── animations.css
│   └── variables.css
│
└── App.tsx
```

---

## 6. Technology Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animations | Framer Motion |
| State | Zustand (or useState for simplicity) |
| Build | Vite |

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "framer-motion": "^11.0.0",
    "zustand": "^4.5.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}
```

---

## 7. Layout / Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│  CELLULAR AUTOMATA                              Gen: 142  ▶ ⏸   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐   ┌───────────────────────┐│
│  │                                 │   │ PATTERNS              ││
│  │                                 │   │                       ││
│  │                                 │   │ ┌───┐ ┌───┐ ┌───┐    ││
│  │         GAME GRID               │   │ │ ▪ │ │▪▪▪│ │ ▪ │    ││
│  │         (with glow)             │   │ │▪▪▪│ │   │ │▪▪▪│    ││
│  │                                 │   │ │ ▪ │ │▪▪▪│ │ ▪ │    ││
│  │                                 │   │ └───┘ └───┘ └───┘    ││
│  │                                 │   │ Glider Blinker Toad  ││
│  │                                 │   │                       ││
│  │                                 │   ├───────────────────────┤│
│  │                                 │   │ STATS                 ││
│  │                                 │   │                       ││
│  └─────────────────────────────────┘   │ Alive:  1,247        ││
│                                        │ Born:   +84          ││
│  ┌─────────────────────────────────┐   │ Died:   -91          ││
│  │ ⏮ ▶ ⏭  ║  Speed: ████████░░   │   │                       ││
│  │          ║  Size:  50×50        │   │ ┌───────────────────┐││
│  │          ║  Color: ● ● ●        │   │ │▁▂▃▅▆▇▆▅▃▂▁▂▃▅▆▇▆▅│││
│  └─────────────────────────────────┘   │ └───────────────────┘││
│                                        └───────────────────────┘│
└─────────────────────────────────────────────────────────────────┘
```

---

## 8. Acceptance Criteria

### Must Have
- [ ] Working Game of Life with correct logic
- [ ] Dark theme with RGB cell glow
- [ ] Play/Pause/Step/Clear/Random controls
- [ ] At least 10 preset patterns
- [ ] Manual editing (click & drag)
- [ ] Shimmer effect on loading states
- [ ] Shine effect from cursor on interactive elements

### Should Have
- [ ] Configurable grid size
- [ ] Drag & drop patterns
- [ ] Statistics (generation, population)
- [ ] Population graph
- [ ] Three color modes for cells

### Nice to Have
- [ ] Save/load configuration
- [ ] Export to GIF/video
- [ ] Toroidal grid (wrap-around)
- [ ] Custom rules (not just B3/S23)

---

## 9. References

### Visual
1. **motion.dev RGB Spinners** — cell glow style
2. **k_grajeda iOS controls** — UI element quality
3. **iamdavidhill file transfer** — terminal aesthetic
4. **nonzeroexitcode spy dashboard** — sci-fi atmosphere

### Technical
- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [LifeWiki Pattern Catalog](https://conwaylife.com/wiki/)

---

## 10. Development Phases

| Phase | Description | Priority |
|-------|-------------|----------|
| 1 | Basic Game of Life logic (hook) | High |
| 2 | Grid component with basic rendering | High |
| 3 | Cell component with glow effect | High |
| 4 | Playback controls | High |
| 5 | Shimmer & Shine effects | Medium |
| 6 | Pattern library | Medium |
| 7 | Statistics and graph | Medium |
| 8 | Polish & animations | Low |

---

*Document created: 2026-01-09*  
*Version: 1.0*
