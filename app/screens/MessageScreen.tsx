'use client';

import { useState } from 'react';

interface Props {
  onMemories: () => void;
  onBack: () => void;
}

export default function MessageScreen({ onMemories, onBack }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fce7f3] flex flex-col items-center relative px-4 pb-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-white/80 hover:bg-white border border-gray-200 text-gray-600 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-20"
      >
        ← Back
      </button>

      {/* Title */}
      <div className="pt-14 sm:pt-16 pb-4 sm:pb-6 text-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-pink-600">
          ♥ A Message From My Heart
        </h2>
      </div>

      {/* Scroll rod */}
      <div className="flex items-center w-full max-w-sm sm:max-w-lg mx-auto">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 shadow-md flex-shrink-0" />
        <div
          className="flex-1 h-3 sm:h-4"
          style={{ background: 'linear-gradient(to right, #92400e, #78350f, #92400e)' }}
        />
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 shadow-md flex-shrink-0" />
      </div>

      {/* Card / Envelope */}
      <div
        className="relative w-full max-w-sm sm:max-w-lg mx-auto"
        style={{
          perspective: '1000px',
          height: 'clamp(220px, 38vh, 340px)',
        }}
      >
        {/* White letter behind */}
        <div
          className={`absolute inset-0 bg-white rounded-b-xl overflow-y-auto transition-opacity duration-700 ${
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
          className="absolute top-0 left-0 h-full z-10"
          style={{
            width: '50%',
            backgroundColor: '#8b0000',
            backgroundImage: 'linear-gradient(135deg, #9b0000 0%, #7a0000 50%, #8b0000 100%)',
            transformOrigin: 'left center',
            transform: isOpen ? 'rotateY(-108deg)' : 'rotateY(0deg)',
            transition: 'transform 0.85s ease-in-out',
            backfaceVisibility: 'hidden',
            borderBottomLeftRadius: '0.75rem',
          }}
        />

        {/* Right door panel */}
        <div
          className="absolute top-0 right-0 h-full z-10"
          style={{
            width: '50%',
            backgroundColor: '#8b0000',
            backgroundImage: 'linear-gradient(225deg, #9b0000 0%, #7a0000 50%, #8b0000 100%)',
            transformOrigin: 'right center',
            transform: isOpen ? 'rotateY(108deg)' : 'rotateY(0deg)',
            transition: 'transform 0.85s ease-in-out',
            backfaceVisibility: 'hidden',
            borderBottomRightRadius: '0.75rem',
          }}
        />

        {/* Center fold + click-to-open (shown when closed) */}
        {!isOpen && (
          <>
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-[#5a0000] z-20" />
            <div className="absolute inset-0 z-30 flex items-center justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-white/95 hover:bg-white text-gray-700 text-xs sm:text-sm font-medium px-5 py-2 sm:py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                ✨ Click to Open ✨
              </button>
            </div>
          </>
        )}
      </div>

      {/* View Memories button */}
      <div className="mt-7 sm:mt-10">
        <button
          onClick={onMemories}
          className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold text-sm sm:text-base px-7 sm:px-9 py-2.5 sm:py-3 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          📸 View Our Memories
        </button>
      </div>
    </div>
  );
}
