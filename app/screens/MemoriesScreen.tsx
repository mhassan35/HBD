interface Props {
  onBack: () => void;
}

const PHOTOS = [
  '/photos/photo1.jpg',
  '/photos/photo2.jpg',
  '/photos/photo3.jpg',
  '/photos/photo4.jpg',
  '/photos/photo5.jpg',
  '/photos/photo6.jpg',
];

export default function MemoriesScreen({ onBack }: Props) {
  return (
    <div className="min-h-screen bg-[#fce7f3] relative px-4 pb-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-white/80 hover:bg-white border border-gray-200 text-gray-600 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-sm hover:shadow-md transition-all duration-200 z-10"
      >
        ← Back
      </button>

      {/* Title */}
      <div className="pt-14 sm:pt-16 pb-6 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          📷 📷 Our Beautiful Memories 📷
        </h2>
      </div>

      {/* Photo grid */}
      <div className="max-w-3xl mx-auto grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
        {PHOTOS.map((src, i) => (
          <div
            key={i}
            className="aspect-square overflow-hidden rounded-lg bg-pink-200 relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Memory ${i + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = 'none';
              }}
            />
            {/* Placeholder shown when no image */}
            <div className="absolute inset-0 flex items-center justify-center text-pink-400 text-xs sm:text-sm text-center p-2 pointer-events-none">
              <span>Add photo {i + 1} to<br />/public/photos/</span>
            </div>
          </div>
        ))}
      </div>

      {/* Closing message */}
      <div className="text-center mt-8 sm:mt-10 space-y-1">
        <p className="text-pink-600 font-bold text-base sm:text-lg md:text-xl">
          ♥ Forever Yours — [Your Name] ♥
        </p>
        <p className="text-gray-400 text-xs sm:text-sm italic">
          Your personalized closing message
        </p>
      </div>
    </div>
  );
}
