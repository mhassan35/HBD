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

function BirthdayCake({ isCut }: { isCut: boolean }) {
  return (
    <div className="relative flex h-48 w-64 flex-col items-center justify-end">
      <div
        className={`absolute top-0 left-1/2 z-10 flex -translate-x-1/2 gap-3 transition-opacity duration-300 ${
          isCut ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <span
              className="candle-flame mb-0.5 h-4 w-2 rounded-full bg-linear-to-t from-orange-400 to-yellow-100 shadow-[0_0_12px_4px_rgba(251,191,36,0.65)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
            <span className="h-7 w-2 rounded-sm bg-linear-to-r from-pink-300 to-rose-500" />
          </div>
        ))}
      </div>
      <div className="relative flex h-32 w-56 items-end justify-center">
        <div className={`cake-half cake-half-left ${isCut ? 'cake-slice-left' : ''}`}>
          <div className="cake-top-half cake-top-left">
            <span className="cake-icing" />
          </div>
          <div className="cake-base-half cake-base-left">
            <span className="cake-sprinkle cake-sprinkle-one" />
            <span className="cake-sprinkle cake-sprinkle-two" />
          </div>
        </div>
        <div className={`cake-half cake-half-right ${isCut ? 'cake-slice-right' : ''}`}>
          <div className="cake-top-half cake-top-right">
            <span className="cake-icing" />
          </div>
          <div className="cake-base-half cake-base-right">
            <span className="cake-sprinkle cake-sprinkle-one" />
            <span className="cake-sprinkle cake-sprinkle-two" />
          </div>
        </div>
        {!isCut && <span className="cake-cut-line" aria-hidden="true" />}
        {isCut && <span className="cake-knife" aria-hidden="true" />}
      </div>
      <div className="h-3 w-60 rounded-[50%] border border-amber-100/70 bg-linear-to-b from-white to-amber-100 shadow-[0_8px_24px_rgba(244,114,182,0.28)]" />
      <span className="mt-2 text-xs font-medium tracking-wide text-amber-100/80">
        {isCut ? 'A sweet wish, just for you' : 'Make a wish, Dear Sweet Heart!'}
      </span>
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
  const [cakeCut, setCakeCut] = useState(false);

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
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-x-hidden px-4 py-8 sm:py-10 fade-in">
      <PageBackground dark={isDark} />
      {isDark ? <DarkParticles /> : <FloatingEmojis />}

      <main className="relative z-10 flex w-full max-w-5xl flex-col items-center">
        <header className="text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200/20 bg-white/5 px-4 py-1.5 text-xs font-medium tracking-[0.18em] text-pink-100/80 uppercase backdrop-blur-sm">
            <span aria-hidden="true">✦</span> A day made for you <span aria-hidden="true">✦</span>
          </span>
          <h1 className="font-display text-3xl font-bold italic text-transparent bg-clip-text bg-linear-to-r from-rose-300 via-pink-400 to-amber-200 sm:text-4xl md:text-5xl">
            Happy Birthday, Sweet Biyaa!
          </h1>
          <p className="mt-2 text-sm text-pink-100/70 sm:text-base">
            May your day sparkle with all the happiness you deserve.
          </p>
        </header>

        <div className="my-5 min-h-12 relative z-10 px-4 sm:my-6">
          {step === 0 && (
            <Button variant="gold" size="lg" glow onClick={() => setStep(1)}>
              💡 Light Up the Celebration
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
          {step === 2 && !cakeCut && (
            <Button variant="secondary" size="lg" glow onClick={() => setCakeCut(true)}>
              🔪 Cut the Birthday Cake
            </Button>
          )}
          {step === 2 && cakeCut && (
            <Button variant="gold" size="lg" glow onClick={handleFlyBalloons}>
              🎈 Send Your Birthday Wishes
            </Button>
          )}
          {step === 3 && (
            <Button variant="sunset" size="lg" glow onClick={onMessage} className="text-center max-w-xs">
              💌 Open Your Birthday Wish
            </Button>
          )}
        </div>

        {step >= 1 && (
          <div className="mb-5 w-full fade-in relative z-10 sm:mb-6">
            <StringLights />
          </div>
        )}

        {step >= 1 && (
          <section aria-label="Birthday blessings" className="grid w-full grid-cols-1 gap-3 fade-in-up sm:grid-cols-3 sm:gap-4">
            {[
              { icon: '🌷', title: 'A Year of Joy', text: 'May laughter find you often and fill your days with beautiful memories.' },
              { icon: '✨', title: 'Dreams Come True', text: 'May every hope in your heart bring you closer to something wonderful.' },
              { icon: '💜', title: 'Love All Around', text: 'May you always feel cherished, supported, and appreciated for who you are.' },
            ].map((blessing, i) => (
              <article
                key={blessing.title}
                className="fade-in-up rounded-2xl border border-white/20 bg-[#2b1238]/90 px-4 py-4 text-center shadow-[0_12px_40px_rgba(5,0,20,0.3)] backdrop-blur-md sm:px-5 sm:py-5"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-200/15 text-xl" aria-hidden="true">
                  {blessing.icon}
                </span>
                <h2 className="font-display text-lg font-semibold text-amber-200">{blessing.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-white/85 sm:text-sm">{blessing.text}</p>
              </article>
            ))}
          </section>
        )}

        {step >= 2 && (
          <>
            <div className="mt-5 w-full fade-in-up sm:mt-6">
              <Bunting />
              <HappyBirthdayText />
            </div>
            <div className="mt-5 fade-in-up sm:mt-6">
              <BirthdayCake isCut={cakeCut} />
            </div>
          </>
        )}
      </main>

      {cakeCut && <Confetti />}

      {step >= 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {balloons.map((b, i) => (
            <Balloon key={i} {...b} />
          ))}
        </div>
      )}
    </div>
  );
}
