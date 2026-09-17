'use client';

import { useState, useEffect } from 'react';
import Button from '../components/Button';
import Confetti from '../components/Confetti';
import FloatingEmojis from '../components/FloatingEmojis';
import PageBackground from '../components/PageBackground';

interface Props {
  onMessage: () => void;
  onPlayMusic: () => void;
}

const LIGHT_COLORS = [
  '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2',
  '#ef476f', '#f8961e', '#43aa8b', '#90be6d',
  '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2',
  '#ef476f', '#f8961e', '#43aa8b', '#90be6d',
];

const BUNTING_COLORS = [
  '#06d6a0', '#ffd166', '#43aa8b', '#ffd166', '#06d6a0',
  '#90be6d', '#ffd166', '#06d6a0', '#ffd166', '#43aa8b',
  '#90be6d', '#06d6a0', '#ffd166',
];

const BALLOON_COLORS = [
  '#06d6a0', '#8b5cf6', '#ef476f', '#ffd166',
  '#118ab2', '#43aa8b', '#f97316', '#a78bfa',
];

interface BalloonItem {
  color: string;
  left: string;
  delay: number;
  duration: number;
}

function StringLights() {
  return (
    <div className="relative w-full flex items-center py-2 overflow-x-auto">
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-500 opacity-60" />
      <div className="flex gap-3 sm:gap-5 px-3 sm:px-6 relative z-10 mx-auto flex-wrap justify-center">
        {LIGHT_COLORS.map((color, i) => (
          <div
            key={i}
            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shrink-0 twinkle-anim"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px 3px ${color}`,
              animationDelay: `${(i * 0.18) % 2}s`,
              animationDuration: `${1 + (i % 4) * 0.25}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Bunting() {
  return (
    <div className="relative w-full flex items-start justify-center pt-1 pb-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-400 opacity-40" />
      <div className="flex gap-1.5 sm:gap-2.5 px-2 flex-wrap justify-center">
        {BUNTING_COLORS.map((color, i) => (
          <div
            key={i}
            className="drop-shadow-sm"
            style={{
              width: 0,
              height: 0,
              borderLeft: '13px solid transparent',
              borderRight: '13px solid transparent',
              borderTop: `22px solid ${color}`,
              marginTop: '3px',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function HappyBirthdayText() {
  const text = 'Happy  Birthday';
  return (
    <div className="flex justify-center gap-1 sm:gap-2 flex-wrap px-4 mt-3">
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="font-display text-white font-bold text-lg sm:text-2xl tracking-widest fade-in-up"
          style={{
            animationDelay: `${i * 0.06}s`,
            opacity: 0,
            animationFillMode: 'forwards',
            textShadow: '0 2px 12px rgba(0,0,0,0.35)',
          }}
        >
          {char === ' ' ? '  ' : char}
        </span>
      ))}
    </div>
  );
}

function BirthdayCake() {
  return (
    <div className="flex flex-col items-center drop-shadow-xl">
      {/* Candles */}
      <div className="flex gap-2.5 sm:gap-3 mb-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-2 h-3 sm:h-4 rounded-t-full candle-flame"
              style={{
                background: 'radial-gradient(ellipse at bottom, #fff176, #fbbf24)',
                animationDelay: `${i * 0.1}s`,
              }}
            />
            <div
              className="w-2.5 sm:w-3 h-7 sm:h-9 rounded-sm"
              style={{ background: i % 2 === 0 ? '#f97316' : '#ec4899' }}
            />
          </div>
        ))}
      </div>
      {/* Top tier */}
      <div
        className="w-28 sm:w-36 h-8 sm:h-10 rounded-t-lg"
        style={{ background: 'linear-gradient(to bottom, #fde68a, #f9e4c0)' }}
      />
      {/* Bottom tier */}
      <div
        className="w-36 sm:w-44 h-10 sm:h-12 rounded-b-lg"
        style={{ background: 'linear-gradient(to bottom, #f9e4c0, #d4a76a)' }}
      />
    </div>
  );
}

function Balloon({ color, left, delay, duration }: BalloonItem) {
  return (
    <div
      className="absolute bottom-0 balloon-anim"
      style={{ left, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div
        className="w-10 h-14 sm:w-14 sm:h-18 rounded-[50%] relative sway-anim"
        style={{
          backgroundColor: color,
          boxShadow: `0 0 14px ${color}88`,
          borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
        }}
      >
        {/* Knot */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0"
          style={{
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderTop: `5px solid ${color}`,
          }}
        />
      </div>
      <div className="w-px h-10 sm:h-14 bg-gray-400 mx-auto mt-0" />
    </div>
  );
}

function DarkParticles() {
  const [particles, setParticles] = useState<{ color: string; left: number; top: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 14 }, (_, i) => ({
        color: LIGHT_COLORS[i % LIGHT_COLORS.length],
        left: (i / 14) * 90 + 2,
        top: 30 + (i % 7) * 8,
        size: 4 + (i % 3) * 2,
        delay: (i * 0.3) % 2,
      }))
    );
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full twinkle-anim"
          style={{
            backgroundColor: p.color,
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 6px 2px ${p.color}88`,
            animationDuration: `${1.5 + (i % 4) * 0.4}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function CelebrationScreen({ onMessage, onPlayMusic }: Props) {
  const [step, setStep] = useState(0);
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  const handleFlyBalloons = () => {
    setBalloons(
      Array.from({ length: 8 }, (_, i) => ({
        color: BALLOON_COLORS[i % BALLOON_COLORS.length],
        left: `${4 + i * 11.5}%`,
        delay: i * 0.35,
        duration: 4.5 + (i % 3) * 0.8,
      }))
    );
    setStep(3);
  };

  const isDark = step >= 1;

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 py-14 sm:py-20 fade-in">
      <PageBackground dark={isDark} />
      {isDark ? <DarkParticles /> : <FloatingEmojis />}

      {/* Header */}
      <div className="pb-4 sm:pb-5 text-center relative z-10">
        <h1
          className={`font-display italic text-2xl sm:text-3xl md:text-4xl font-bold transition-colors duration-1000 ${
            isDark ? 'text-pink-400' : 'text-pink-500'
          }`}
        >
          Let&apos;s Celebrate! 🎉
        </h1>
        <p className={`text-xs sm:text-sm mt-1.5 transition-colors duration-1000 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Click the buttons to decorate
        </p>
      </div>

      {/* Action button */}
      <div className="mb-4 sm:mb-6 relative z-10 px-4">
        {step === 0 && (
          <Button variant="gold" size="lg" glow onClick={() => setStep(1)}>
            💡 Turn On the Lights
          </Button>
        )}
        {step === 1 && (
          <Button
            variant="primary"
            size="lg"
            glow
            onClick={() => {
              onPlayMusic();
              setStep(2);
            }}
          >
            🎵 Play Music
          </Button>
        )}
        {step === 2 && (
          <Button variant="secondary" size="lg" glow onClick={handleFlyBalloons}>
            🎈 Fly the Balloons
          </Button>
        )}
        {step === 3 && (
          <Button variant="sunset" size="lg" glow onClick={onMessage} className="text-center max-w-xs">
            💌 Well, I Have a Message for You Madam Jiii
          </Button>
        )}
      </div>

      {/* String lights */}
      {step >= 1 && (
        <div className="w-full fade-in relative z-10">
          <StringLights />
        </div>
      )}

      {/* Bunting + Happy Birthday text */}
      {step >= 2 && (
        <div className="w-full fade-in-up relative z-10 mt-2">
          <Bunting />
          <HappyBirthdayText />
        </div>
      )}

      {/* Balloons */}
      {step >= 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {balloons.map((b, i) => (
            <Balloon key={i} {...b} />
          ))}
        </div>
      )}

      {/* Confetti burst */}
      {step >= 3 && <Confetti />}

      {/* Cake */}
      {step >= 2 && (
        <div className="mt-6 sm:mt-8 fade-in-up relative z-10">
          <BirthdayCake />
        </div>
      )}
    </div>
  );
}
