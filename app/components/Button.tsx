import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'gold' | 'sunset' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Adds a soft pulsing glow behind the button to draw the eye to a primary call-to-action. */
  glow?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 hover:from-rose-400 hover:to-pink-500 hover:shadow-xl hover:shadow-rose-500/40 focus-visible:ring-rose-300',
  secondary:
    'bg-linear-to-r from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/30 hover:from-violet-400 hover:to-purple-500 hover:shadow-xl hover:shadow-violet-500/40 focus-visible:ring-violet-300',
  gold:
    'bg-linear-to-r from-amber-300 to-yellow-400 text-amber-900 shadow-lg shadow-amber-400/30 hover:from-amber-200 hover:to-yellow-300 hover:shadow-xl hover:shadow-amber-400/40 focus-visible:ring-amber-300',
  sunset:
    'bg-linear-to-r from-orange-400 to-rose-500 text-white shadow-lg shadow-orange-400/30 hover:from-orange-300 hover:to-rose-400 hover:shadow-xl hover:shadow-orange-400/40 focus-visible:ring-orange-300',
  ghost:
    'bg-white/80 backdrop-blur-sm border border-rose-100 text-rose-700 shadow-sm hover:bg-white hover:shadow-md focus-visible:ring-rose-200',
};

const SIZE_STYLES: Record<Size, string> = {
  sm: 'px-5 py-2 text-xs sm:text-sm',
  md: 'px-7 py-2.5 text-sm sm:text-base',
  lg: 'px-9 py-3 text-sm sm:text-base md:text-lg',
};

const GLOW_STYLES: Record<Variant, string> = {
  primary: 'bg-pink-400/50',
  secondary: 'bg-violet-400/50',
  gold: 'bg-amber-300/60',
  sunset: 'bg-orange-400/50',
  ghost: 'bg-rose-300/40',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  glow = false,
  className = '',
  ...props
}: Props) {
  const button = (
    <button
      disabled={disabled}
      className={[
        'relative inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-wide',
        'transition-all duration-200 ease-out',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
        'active:scale-95',
        disabled
          ? 'opacity-50 cursor-not-allowed shadow-none hover:translate-y-0 hover:scale-100'
          : `hover:-translate-y-0.5 hover:scale-105 ${variant !== 'ghost' ? 'shine-sweep' : ''}`,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        className,
      ].join(' ')}
      {...props}
    />
  );

  if (!glow || disabled) return button;

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className={`absolute -inset-2.5 rounded-full blur-xl animate-pulse ${GLOW_STYLES[variant]}`} />
      {button}
    </span>
  );
}
