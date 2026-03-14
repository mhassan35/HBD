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
          className={`rounded-full transition-all duration-300 ${
            i === current
              ? 'w-3 h-3 bg-pink-500'
              : 'w-2.5 h-2.5 bg-pink-200'
          }`}
        />
      ))}
    </div>
  );
}
