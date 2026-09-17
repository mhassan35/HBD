'use client';

import { useState, useEffect } from 'react';

interface Piece {
  color: string;
  left: number;
  delay: number;
  duration: number;
  width: number;
  height: number;
}

const COLORS = ['#f43f5e', '#fb923c', '#facc15', '#34d399', '#38bdf8', '#a78bfa', '#f472b6'];

interface Props {
  count?: number;
}

export default function Confetti({ count = 40 }: Props) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        color: COLORS[i % COLORS.length],
        left: (i / count) * 100 + Math.random() * (100 / count),
        delay: Math.random() * 0.6,
        duration: 2.6 + Math.random() * 1.6,
        width: 6 + Math.random() * 5,
        height: 10 + Math.random() * 6,
      }))
    );
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-20">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-20px] confetti-fall rounded-sm"
          style={{
            left: `${p.left}%`,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
