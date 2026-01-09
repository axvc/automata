interface GenerationCounterProps {
  generation: number;
  className?: string;
}

export function GenerationCounter({
  generation,
  className = '',
}: GenerationCounterProps) {
  return (
    <div className={`text-2xl font-mono font-bold text-text-primary ${className}`}>
      Gen: {generation.toLocaleString()}
    </div>
  );
}
