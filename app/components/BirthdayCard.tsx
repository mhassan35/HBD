interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BirthdayCard({ children, className = '' }: Props) {
  return (
    <div className="w-full max-w-xs sm:max-w-sm mx-auto rounded-4xl p-0.5 bg-linear-to-br from-rose-300 via-pink-300 to-violet-300 shadow-2xl shadow-rose-300/40">
      <div
        className={`bg-white/95 backdrop-blur-sm rounded-[calc(2rem-2px)] text-center px-6 py-9 sm:px-8 sm:py-11 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
