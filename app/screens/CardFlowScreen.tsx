'use client';

import { useState } from 'react';
import BirthdayCard from '../components/BirthdayCard';
import Button from '../components/Button';
import FloatingEmojis from '../components/FloatingEmojis';
import PageBackground from '../components/PageBackground';
import StepDots from '../components/StepDots';
import Sparkle from '../components/Sparkle';

interface Props {
  onComplete: () => void;
}

export default function CardFlowScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [noClicked, setNoClicked] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <PageBackground />
      <FloatingEmojis />

      <div className="w-full max-w-xs sm:max-w-sm mx-auto relative z-10 fade-in">
        {/* Step 1 */}
        {step === 0 && (
          <BirthdayCard>
            <Sparkle />
            <p className="font-display text-xl sm:text-2xl font-semibold text-gray-800 mb-6 mt-2">
              Today is all about celebrating you, Tasbiha Noor! 💜
            </p>
            <Button onClick={() => setStep(1)} glow>
              Next
            </Button>
            <StepDots total={3} current={0} />
          </BirthdayCard>
        )}

        {/* Step 2 — Yes/No */}
        {step === 1 && !noClicked && (
          <BirthdayCard>
            <Sparkle />
            <p className="font-display text-xl sm:text-2xl font-semibold text-gray-800 mb-6 mt-2">
              Would you like to open your birthday surprise?
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => setStep(2)} glow>
                Yes, please! 💜
              </Button>
              <Button variant="secondary" onClick={() => setNoClicked(true)}>
                Not now
              </Button>
            </div>
            <StepDots total={3} current={1} />
          </BirthdayCard>
        )}

        {/* Step 2 — No clicked */}
        {step === 1 && noClicked && (
          <BirthdayCard>
            <div className="text-4xl sm:text-5xl mb-4 shake-anim">😢😭😢</div>
            <p className="font-display text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              No worries, Tasbiha! 💜
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Your birthday surprise will be waiting whenever you&apos;re ready.
            </p>
            <Button
              glow
              onClick={() => {
                setNoClicked(false);
                setStep(2);
              }}
            >
              I&apos;m ready! 💕
            </Button>
            <StepDots total={3} current={1} />
          </BirthdayCard>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <BirthdayCard>
            <Sparkle />
            <p className="font-display text-xl sm:text-2xl font-semibold text-gray-800 mb-6 mt-2">
              Your birthday surprise is ready, Tasbiha!
            </p>
            <Button onClick={onComplete} glow>
              Let&apos;s Celebrate! 🎉
            </Button>
            <StepDots total={3} current={2} />
          </BirthdayCard>
        )}
      </div>
    </div>
  );
}
