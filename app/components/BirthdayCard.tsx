interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function BirthdayCard({ children, className = '' }: Props) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl w-full max-w-xs sm:max-w-sm mx-auto text-center px-6 py-8 sm:px-8 sm:py-10 ${className}`}
    >
      {children}
    </div>
  );
}
