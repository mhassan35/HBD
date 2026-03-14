'use client';

import { useState, useEffect } from 'react';

interface EmojiItem {
  char: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

interface Props {
  emojis?: string[];
  count?: number;
}

const DEFAULT_EMOJIS = ['💕', '💖', '🌸', '✨', '💗', '🎀', '💝', '🌷'];

export default function FloatingEmojis({ emojis = DEFAULT_EMOJIS, count = 14 }: Props) {
  const [items, setItems] = useState<EmojiItem[]>([]);

  useEffect(() => {
    setItems(
      Array.from({ length: count }, (_, i) => ({
        char: emojis[i % emojis.length],
        left: (i / count) * 95 + Math.random() * (95 / count),
        delay: (i / count) * 10,
        duration: 9 + (i % 5) * 1.5,
        size: 12 + (i % 4) * 4,
      }))
    );
  }, [emojis, count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item, i) => (
        <span
          key={i}
          className="float-emoji"
          style={{
            left: `${item.left}%`,
            top: '-40px',
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
