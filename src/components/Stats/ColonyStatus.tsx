import React from 'react';

export type ColonyState = 'empty' | 'evolution' | 'eternal' | 'dead';

interface ColonyStatusProps {
  alive: number;
  births: number;
  deaths: number;
  generation: number;
  className?: string;
}

function getColonyState(alive: number, births: number, deaths: number, generation: number): ColonyState {
  // Empty: никогда не было жизни
  if (alive === 0 && generation === 0) {
    return 'empty';
  }

  // Dead: была жизнь, но все вымерли
  if (alive === 0 && generation > 0) {
    return 'dead';
  }

  // Eternal: стабильное состояние (нет изменений)
  if (births === 0 && deaths === 0 && alive > 0) {
    return 'eternal';
  }

  // Evolution: популяция изменяется
  return 'evolution';
}

const stateConfig: Record<ColonyState, { label: string; color: string; bgColor: string }> = {
  empty: {
    label: 'Empty',
    color: 'text-text-muted',
    bgColor: 'bg-bg-tertiary',
  },
  evolution: {
    label: 'Evolution',
    color: 'text-cell-cyan',
    bgColor: 'bg-cell-cyan/10',
  },
  eternal: {
    label: 'Eternal',
    color: 'text-cell-orange',
    bgColor: 'bg-cell-orange/10',
  },
  dead: {
    label: 'Dead',
    color: 'text-cell-pink',
    bgColor: 'bg-cell-pink/10',
  },
};

export function ColonyStatus({ alive, births, deaths, generation, className = '' }: ColonyStatusProps) {
  const state = getColonyState(alive, births, deaths, generation);
  const config = stateConfig[state];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-text-muted text-sm">Status:</span>
      <span
        className={`rounded px-2 py-0.5 font-mono text-sm font-medium ${config.color} ${config.bgColor}`}
      >
        {config.label}
      </span>
    </div>
  );
}
