interface Props {
  total: number;
  current: number;
}

export default function StepDots({ total, current }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 mt-5">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 bg-linear-to-r from-rose-500 to-pink-600'
              : 'w-2 bg-pink-200'
          }`}
        />
      ))}
    </div>
  );
}
