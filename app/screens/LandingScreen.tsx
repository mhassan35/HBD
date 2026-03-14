interface Props {
  onStart: () => void;
}

export default function LandingScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-[#fce7f3] flex items-center justify-center px-4">
      <div className="text-center space-y-4 sm:space-y-5 max-w-lg w-full">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Happy Birthday{' '}
          <span className="text-pink-500">[Name]</span> 🎂
        </h1>

        <p className="text-gray-500 italic text-sm sm:text-base">
          Your personalized message goes here 💜
        </p>

        <p className="text-pink-500 text-lg sm:text-xl md:text-2xl font-semibold">
          🎉 It&apos;s Your Birthday! 🎉
        </p>

        <div className="space-y-1.5">
          <p className="text-gray-700 font-semibold text-sm sm:text-base md:text-lg">
            💜 Ready for your surprise! 💜
          </p>
          <p className="text-gray-400 text-xs sm:text-sm italic">
            Something magical is about to unfold ✨
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onStart}
            className="bg-[#db2777] hover:bg-[#be185d] text-white font-semibold text-sm sm:text-base px-8 sm:px-10 py-3 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🎊 Let&apos;s Celebrate
          </button>
        </div>
      </div>
    </div>
  );
}
