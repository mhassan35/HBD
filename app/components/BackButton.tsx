interface Props {
  onClick: () => void;
  className?: string;
}

export default function BackButton({ onClick, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Go back"
      className={`inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-sm border border-rose-100 text-rose-700 text-xs sm:text-sm font-medium px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm hover:bg-white hover:shadow-md active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-rose-200 ${className}`}
    >
      <span aria-hidden="true">←</span> Back
    </button>
  );
}
