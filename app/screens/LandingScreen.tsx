import Button from '../components/Button';
import FloatingEmojis from '../components/FloatingEmojis';
import PageBackground from '../components/PageBackground';
import Sparkle from '../components/Sparkle';

interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-14 sm:py-20 overflow-hidden">
      <PageBackground />
      <FloatingEmojis />

      <div className="relative z-10 text-center max-w-lg lg:max-w-2xl w-full space-y-5 sm:space-y-6">
        <div
          className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-sm border border-rose-100 text-rose-600 text-xs sm:text-sm font-semibold tracking-wide px-4 py-1.5 rounded-full shadow-sm fade-in-up"
          style={{ animationDelay: '0.05s', opacity: 0, animationFillMode: 'forwards' }}
        >
          💌 A Little Surprise, Just For You
        </div>

        <div
          className="flex justify-center fade-in-up"
          style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <Sparkle />
        </div>

        <h1
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight tracking-tight text-balance fade-in-up"
          style={{ animationDelay: '0.25s', opacity: 0, animationFillMode: 'forwards' }}
        >
          Happy Birthday{' '}
          <span className="text-shimmer text-transparent bg-clip-text bg-linear-to-r from-rose-500 via-fuchsia-500 to-pink-600 italic">
            Dear Tasbiha Noor
          </span>{' '}
          🎂
        </h1>

        <p
          className="text-gray-500 italic text-sm sm:text-base md:text-lg fade-in-up"
          style={{ animationDelay: '0.35s', opacity: 0, animationFillMode: 'forwards' }}
        >
          May your day be filled with love, laughter, and all the happiness you bring to others. 💜
        </p>

        <p
          className="text-pink-500 text-lg sm:text-xl md:text-2xl font-semibold fade-in-up"
          style={{ animationDelay: '0.45s', opacity: 0, animationFillMode: 'forwards' }}
        >
          🎉 Today is all about celebrating you! 🎉
        </p>

        <div
          className="space-y-1.5 fade-in-up"
          style={{ animationDelay: '0.55s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg">
            💜 You deserve a day as wonderful as you are. 💜
          </p>
          <p className="text-gray-400 text-xs sm:text-sm italic">
            May the year ahead bring you joy, love, and countless reasons to smile. ✨
          </p>
        </div>

        <div
          className="pt-3 flex justify-center fade-in-up"
          style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}
        >
          <span className="relative inline-flex items-center justify-center">
            <span
              aria-hidden="true"
              className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full opacity-40 blur-2xl spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, #f43f5e, #f59e0b, #a855f7, #ec4899, #f43f5e)',
              }}
            />
            <Button onClick={onStart} size="lg" className="relative">
              🎊 Celebrate Sweet Biyaa
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
