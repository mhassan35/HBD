export default function Sparkle() {
  return (
    <div className="relative inline-flex items-start justify-center w-14 h-10 mb-1">
      <span
        className="absolute bottom-0 left-2 text-yellow-400 text-4xl leading-none sparkle-anim"
        style={{ textShadow: '0 0 12px #fbbf24' }}
      >
        ✦
      </span>
      <span
        className="absolute top-0 right-1 text-yellow-300 text-xl leading-none sparkle-anim"
        style={{ animationDelay: '0.4s', textShadow: '0 0 8px #fbbf24' }}
      >
        ✦
      </span>
    </div>
  );
}
