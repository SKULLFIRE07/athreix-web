"use client";

import { useMemo } from "react";

export default function Embers({ count = 24 }: { count?: number }) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = (i * 53) % 100;
      const delay = (i * 0.73) % 14;
      const dur = 10 + ((i * 1.7) % 10);
      const size = ((i % 3) + 2);
      return { left, delay, dur, size, i };
    });
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(({ left, delay, dur, size, i }) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${left}%`,
            width: size,
            height: size,
            animationDelay: `-${delay}s`,
            animationDuration: `${dur}s`,
          }}
        />
      ))}
    </div>
  );
}
