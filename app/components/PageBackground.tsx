interface Props {
  dark?: boolean;
}

export default function PageBackground({ dark = false }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 -z-10 overflow-hidden transition-colors duration-1000 ${
        dark ? 'bg-[#150022]' : 'bg-linear-to-br from-rose-50 via-pink-50 to-violet-100'
      }`}
    >
      <div
        className={`absolute -top-24 -left-24 w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl blob-drift ${
          dark ? 'bg-fuchsia-900/30' : 'bg-rose-300/60'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-20 w-80 h-80 sm:w-104 sm:h-104 rounded-full blur-3xl blob-drift ${
          dark ? 'bg-indigo-900/30' : 'bg-violet-300/50'
        }`}
        style={{ animationDelay: '2s' }}
      />
      <div
        className={`absolute -bottom-16 left-1/4 w-64 h-64 sm:w-80 sm:h-80 rounded-full blur-3xl blob-drift ${
          dark ? 'bg-purple-900/20' : 'bg-amber-200/50'
        }`}
        style={{ animationDelay: '4s' }}
      />
      <div
        className={`absolute bottom-1/4 -right-16 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl blob-drift ${
          dark ? 'bg-pink-900/20' : 'bg-fuchsia-200/45'
        }`}
        style={{ animationDelay: '6s' }}
      />
    </div>
  );
}
