'use client';

import { useState } from 'react';
import BirthdayCard from '../components/BirthdayCard';
import FloatingEmojis from '../components/FloatingEmojis';
import StepDots from '../components/StepDots';
import Sparkle from '../components/Sparkle';

interface Props {
  onComplete: () => void;
}

export default function CardFlowScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [noClicked, setNoClicked] = useState(false);

  return (
    <div className="min-h-screen bg-[#fce7f3] flex items-center justify-center px-4 relative">
      <FloatingEmojis />

      <div className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10 fade-in">
        {/* Step 1 */}
        {step === 0 && (
          <BirthdayCard>
            <Sparkle />
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-6 mt-2">
              It&apos;s Your Special Day Yeyey!
            </p>
            <button
              onClick={() => setStep(1)}
              className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold px-8 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
            >
              Next
            </button>
            <StepDots total={3} current={0} />
          </BirthdayCard>
        )}

        {/* Step 2 — Yes/No */}
        {step === 1 && !noClicked && (
          <BirthdayCard>
            <Sparkle />
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-6 mt-2">
              Do you wanna see what I made??
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setStep(2)}
                className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
              >
                Yes! 🔥
              </button>
              <button
                onClick={() => setNoClicked(true)}
                className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-semibold px-6 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
              >
                No
              </button>
            </div>
            <StepDots total={3} current={1} />
          </BirthdayCard>
        )}

        {/* Step 2 — No clicked */}
        {step === 1 && noClicked && (
          <BirthdayCard>
            <div className="text-4xl sm:text-5xl mb-4">😢😭😢</div>
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              You said no... 💔
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure? This took so much love! 🥺
            </p>
            <button
              onClick={() => { setNoClicked(false); setStep(2); }}
              className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold px-7 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
            >
              Just kidding, Yes! 💕
            </button>
            <StepDots total={3} current={1} />
          </BirthdayCard>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <BirthdayCard>
            <Sparkle />
            <p className="text-lg sm:text-xl font-bold text-gray-800 mb-6 mt-2">
              Have a look at it, Madam Jiii
            </p>
            <button
              onClick={onComplete}
              className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold px-8 py-2.5 rounded-full shadow-md hover:scale-105 transition-all duration-200"
            >
              Let&apos;s Go! 🚀
            </button>
            <StepDots total={3} current={2} />
          </BirthdayCard>
        )}
      </div>
    </div>
  );
}
