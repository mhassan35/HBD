'use client';

import { useEffect, useRef } from 'react';

interface Props {
  isPlaying: boolean;
  onToggle: (playing: boolean) => void;
}

const NOTES = {
  G4: 392, A4: 440, B4: 494, C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99,
};

const MELODY: [number, number][] = [
  [NOTES.G4, 0.3], [NOTES.G4, 0.3], [NOTES.A4, 0.6], [NOTES.G4, 0.6], [NOTES.C5, 0.6], [NOTES.B4, 1.2],
  [NOTES.G4, 0.3], [NOTES.G4, 0.3], [NOTES.A4, 0.6], [NOTES.G4, 0.6], [NOTES.D5, 0.6], [NOTES.C5, 1.2],
  [NOTES.G4, 0.3], [NOTES.G4, 0.3], [NOTES.G5, 0.6], [NOTES.E5, 0.6], [NOTES.C5, 0.6], [NOTES.B4, 0.6], [NOTES.A4, 1.2],
  [NOTES.F5, 0.3], [NOTES.F5, 0.3], [NOTES.E5, 0.6], [NOTES.C5, 0.6], [NOTES.D5, 0.6], [NOTES.C5, 1.5],
];

export default function PlayMusicButton({ isPlaying, onToggle }: Props) {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      audioCtxRef.current?.close();
      audioCtxRef.current = null;
      return;
    }

    const ctx = new AudioContext();
    audioCtxRef.current = ctx;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.5, ctx.currentTime);
    masterGain.connect(ctx.destination);

    const play = () => {
      let time = ctx.currentTime + 0.05;
      MELODY.forEach(([freq, dur]) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.connect(noteGain);
        noteGain.connect(masterGain);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);
        noteGain.gain.setValueAtTime(0, time);
        noteGain.gain.linearRampToValueAtTime(0.35, time + 0.03);
        noteGain.gain.setValueAtTime(0.35, time + dur * 0.8);
        noteGain.gain.linearRampToValueAtTime(0, time + dur);
        osc.start(time);
        osc.stop(time + dur + 0.05);
        time += dur;
      });
      const total = MELODY.reduce((s, [, d]) => s + d, 0);
      timeoutRef.current = setTimeout(play, (total + 0.8) * 1000);
    };

    play();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      ctx.close();
      audioCtxRef.current = null;
    };
  }, [isPlaying]);

  return (
    <button
      onClick={() => onToggle(!isPlaying)}
      aria-pressed={isPlaying}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-1.5 bg-white/85 backdrop-blur-md border border-pink-200/80 text-pink-600 text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md hover:shadow-lg hover:bg-white active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
    >
      <span aria-hidden="true">{isPlaying ? '⏸️' : '🎵'}</span>
      <span>{isPlaying ? 'Pause' : 'Play Music'}</span>
    </button>
  );
}
