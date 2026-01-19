import { useState, useEffect, RefObject, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(ref: RefObject<HTMLDivElement>): MousePosition {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const latestMousePos = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();

      // Store latest position
      latestMousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };

      // Use RAF to throttle updates - only update once per frame
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          setMousePos(latestMousePos.current);
          rafId.current = null;
        });
      }
    };

    const handleMouseLeave = () => {
      // Cancel pending RAF
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      setMousePos({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);

  return mousePos;
}
