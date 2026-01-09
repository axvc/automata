# Cellular Automata Playground
## Requirements & Design Plan (RDP)

---

## 1. Обзор проекта

**Название:** Cellular Automata Playground  
**Тип:** Интерактивное React-приложение  
**Цель:** Визуализация работы клеточных автоматов (Game of Life) с современным, утончённым дизайном

### Ключевые особенности
- Визуальный стиль в духе motion.dev / sci-fi dashboards
- Тёмная тема с RGB-свечением на ячейках
- Subtle, smooth анимации (Framer Motion / Spring)
- Интерактивные shine-эффекты от курсора
- Shimmer-эффект для состояний загрузки

---

## 2. Функциональные требования

### 2.1 Игровое поле (Grid)

| Требование | Описание |
|------------|----------|
| Размер | Настраиваемая сетка (min 10×10, max 100×100) |
| Ячейки | Квадратные, с bloom/glow эффектом при активации |
| Цвета | Три канала свечения: cyan (#00D4FF), orange (#FF8A00), pink (#FF4D6D) |
| Состояния | Dead (тёмный), Alive (свечение), Transitioning (fade) |

### 2.2 Управление симуляцией

- **Play/Pause** — запуск и остановка генерации
- **Step** — одна итерация вручную
- **Speed** — слайдер скорости (50ms – 1000ms)
- **Clear** — очистка поля
- **Random** — случайное заполнение (с настройкой плотности)

### 2.3 Паттерны

**Предустановленные паттерны:**

| Категория | Паттерны |
|-----------|----------|
| Still lifes | Block, Beehive, Loaf, Boat |
| Oscillators | Blinker, Toad, Beacon, Pulsar, Pentadecathlon |
| Spaceships | Glider, LWSS, MWSS, HWSS |
| Guns | Gosper Glider Gun |
| Methuselahs | R-pentomino, Diehard, Acorn |

**Функции паттернов:**
- Превью паттерна при наведении
- Drag & drop на поле
- Поворот (90°, 180°, 270°)
- Отражение (horizontal/vertical)

### 2.4 Ручное редактирование

- Click — toggle одной ячейки
- Drag — рисование нескольких ячеек
- Brush size — размер кисти (1×1, 3×3, 5×5)

### 2.5 Статистика

- Текущая генерация (номер)
- Живых клеток (count)
- Births / Deaths за шаг
- Population graph (последние 50 поколений)

---

## 3. Визуальный стиль

### 3.1 Эстетика

**Направление:** Sci-fi terminal / Motion.dev aesthetic

**Ключевые характеристики:**
- Тёмный фон (#0A0A0B или близкий)
- Высокий контраст на активных элементах
- Свечение (glow/bloom) как основной визуальный акцент
- Точечная/сеточная текстура фона
- Моноширинный шрифт для данных

### 3.2 Типографика

```
Основной:    JetBrains Mono / IBM Plex Mono / Fira Code
Дисплейный:  Space Grotesk / Manrope (для заголовков)
```

### 3.3 Цветовая палитра

```css
/* Background */
--bg-primary:    #0A0A0B;
--bg-secondary:  #111113;
--bg-tertiary:   #1A1A1D;

/* Cells - три канала */
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

### 3.4 Эффекты ячеек

**Референс из промпта:**
> "invisible 3x3 grid and the lights just appear... make the lights square and have some bloom/glow to them"

**Реализация:**
- Ячейки без явных границ
- При активации — мягкое появление (opacity + scale)
- Bloom-эффект через box-shadow с blur
- Случайный выбор цвета из трёх каналов (или режим выбора)

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

## 4. Анимации и эффекты

### 4.1 Shimmer-эффект (для текста в загрузке)

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

### 4.2 Cursor Shine-эффект

**Принцип:** Радиальный градиент, следующий за курсором

```jsx
// Отслеживание позиции курсора
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

// CSS переменные на элементе
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
// При загрузке / появлении поля
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.002, // Волна появления
        delayChildren: 0.1
      }
    }
  }}
/>
```

---

## 5. Компонентная структура

```
src/
├── components/
│   ├── Grid/
│   │   ├── Grid.tsx           # Основное поле
│   │   ├── Cell.tsx           # Отдельная ячейка
│   │   └── GridOverlay.tsx    # Shine-эффект
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
│   ├── useGameOfLife.ts       # Логика автомата
│   ├── useMousePosition.ts    # Трекинг курсора
│   └── useInterval.ts         # Таймер поколений
│
├── utils/
│   ├── patterns.ts            # Предустановленные паттерны
│   ├── gridHelpers.ts         # Утилиты для работы с сеткой
│   └── colors.ts              # Цветовые функции
│
├── styles/
│   ├── globals.css
│   ├── animations.css
│   └── variables.css
│
└── App.tsx
```

---

## 6. Технологический стек

| Категория | Технология |
|-----------|------------|
| Framework | React 18 + TypeScript |
| Styling | Tailwind CSS + CSS Variables |
| Animations | Framer Motion |
| State | Zustand (или useState для простоты) |
| Build | Vite |

### Зависимости

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
- [ ] Рабочий Game of Life с корректной логикой
- [ ] Тёмная тема с RGB-свечением ячеек
- [ ] Play/Pause/Step/Clear/Random controls
- [ ] Минимум 10 предустановленных паттернов
- [ ] Ручное редактирование (click & drag)
- [ ] Shimmer-эффект на загрузочных состояниях
- [ ] Shine-эффект от курсора на интерактивных элементах

### Should Have
- [ ] Настраиваемый размер сетки
- [ ] Drag & drop паттернов
- [ ] Статистика (поколение, популяция)
- [ ] График популяции
- [ ] Три цветовых режима для ячеек

### Nice to Have
- [ ] Сохранение/загрузка конфигурации
- [ ] Экспорт в GIF/видео
- [ ] Toroidal grid (wrap-around)
- [ ] Кастомные правила (не только B3/S23)

---

## 9. Референсы

### Визуальные
1. **motion.dev RGB Spinners** — стиль ячеек с glow
2. **k_grajeda iOS controls** — качество UI-элементов
3. **iamdavidhill file transfer** — терминальная эстетика
4. **nonzeroexitcode spy dashboard** — sci-fi атмосфера

### Технические
- [Conway's Game of Life - Wikipedia](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [LifeWiki Pattern Catalog](https://conwaylife.com/wiki/)

---

## 10. Этапы разработки

| Этап | Описание | Приоритет |
|------|----------|-----------|
| 1 | Базовая логика Game of Life (hook) | High |
| 2 | Grid-компонент с базовым рендерингом | High |
| 3 | Cell-компонент с glow-эффектом | High |
| 4 | Playback controls | High |
| 5 | Shimmer & Shine эффекты | Medium |
| 6 | Pattern library | Medium |
| 7 | Статистика и график | Medium |
| 8 | Polish & animations | Low |

---

*Документ создан: 2026-01-09*  
*Версия: 1.0*
