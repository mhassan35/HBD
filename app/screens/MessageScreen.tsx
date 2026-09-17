'use client';

import { useState } from 'react';
import BackButton from '../components/BackButton';
import FloatingEmojis from '../components/FloatingEmojis';
import PageBackground from '../components/PageBackground';

interface Props {
  onBack: () => void;
}

export default function MessageScreen({ onBack }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-14 sm:py-20 fade-in">
      <PageBackground />
      <FloatingEmojis />

      <BackButton onClick={onBack} className="fixed top-4 left-4 sm:top-6 sm:left-6 z-20" />

      <div className="relative z-10 w-full max-w-sm sm:max-w-lg mx-auto text-center">
        {/* Title */}
        <h2 className="font-display italic text-xl sm:text-2xl md:text-3xl font-semibold text-pink-600 mb-4 sm:mb-6">
          ♥ A Message From My Heart
        </h2>

        {/* Scroll rod */}
        <div className="flex items-center w-full">
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-linear-to-br from-amber-200 to-amber-400 shadow-md shrink-0" />
          <div
            className="flex-1 h-2.5 sm:h-3 rounded-full mx-1"
            style={{ background: 'linear-gradient(to right, #fcd34d, #f59e0b, #fcd34d)' }}
          />
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-linear-to-br from-amber-200 to-amber-400 shadow-md shrink-0" />
        </div>

        {/* Card / Envelope */}
        <div
          className="relative w-full mt-1"
          style={{
            perspective: '1000px',
            height: 'clamp(220px, 38vh, 340px)',
          }}
        >
          {/* White letter behind */}
          <div
            className={`absolute inset-0 bg-linear-to-b from-white to-rose-50/60 rounded-b-xl shadow-2xl shadow-rose-300/30 overflow-y-auto transition-opacity duration-700 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="p-5 sm:p-7 text-left text-gray-700 text-sm sm:text-base leading-relaxed font-serif">
              <p className="mb-3">[Recipient Name],</p>
              <p className="mb-3">Your personalized birthday message goes here.</p>
              <p className="mb-3">
                You can write multiple paragraphs to express your feelings,
                share memories, and make this special day even more memorable.
              </p>
              <p className="mb-3">
                This template supports multiple lines and formatting,
                so feel free to customize it completely to fit your style.
              </p>
              <p className="mb-3">Happy Birthday! 🎉</p>
              <p>— [Your Name]</p>
            </div>
          </div>

          {/* Left door panel */}
          <div
            className="absolute top-0 left-0 h-full z-10 shadow-xl"
            style={{
              width: '50%',
              backgroundImage: 'linear-gradient(135deg, #be1248 0%, #8f0d38 55%, #6f0a2c 100%)',
              transformOrigin: 'left center',
              transform: isOpen ? 'rotateY(-108deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s ease-in-out',
              backfaceVisibility: 'hidden',
              borderBottomLeftRadius: '0.75rem',
            }}
          />

          {/* Right door panel */}
          <div
            className="absolute top-0 right-0 h-full z-10 shadow-xl"
            style={{
              width: '50%',
              backgroundImage: 'linear-gradient(225deg, #be1248 0%, #8f0d38 55%, #6f0a2c 100%)',
              transformOrigin: 'right center',
              transform: isOpen ? 'rotateY(108deg)' : 'rotateY(0deg)',
              transition: 'transform 0.85s ease-in-out',
              backfaceVisibility: 'hidden',
              borderBottomRightRadius: '0.75rem',
            }}
          />

          {/* Center fold + wax-seal open button (shown when closed) */}
          {!isOpen && (
            <>
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#4a0720]/70 z-20" />
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2">
                <span className="relative inline-block">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-2 rounded-full opacity-70 blur-md spin-slow"
                    style={{
                      background: 'conic-gradient(from 0deg, #fbbf24, #f43f5e, #fbbf24)',
                    }}
                  />
                  <button
                    onClick={() => setIsOpen(true)}
                    aria-label="Open the letter"
                    className="relative seal-pulse w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-linear-to-br from-amber-300 to-yellow-500 border-2 border-amber-100/80 flex items-center justify-center text-xl sm:text-2xl shadow-lg hover:scale-110 active:scale-95 transition-transform duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-200"
                  >
                    ♥
                  </button>
                </span>
                <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide drop-shadow">
                  Tap to open ✨
                </span>
              </div>
            </>
          )}
        </div>

        {/* Closing flourish, replaces the old memories CTA once the letter is open */}
        {isOpen && (
          <div className="mt-8 text-center fade-in-up space-y-1">
            <p className="font-display italic text-pink-600 font-semibold text-lg sm:text-xl md:text-2xl">
              ♥ Forever Yours ♥
            </p>
            <p className="text-gray-400 text-xs sm:text-sm italic">— [Your Name]</p>
          </div>
        )}
      </div>
    </div>
  );
}
