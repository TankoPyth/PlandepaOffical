interface CurvedArrowProps {
  direction: 'left' | 'right';
}

export function CurvedArrow({ direction }: CurvedArrowProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-48 h-40 md:w-64 md:h-48 lg:w-80 lg:h-56 hidden lg:block">
        <svg
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full ${direction === 'left' ? 'scale-x-[-1]' : ''} drop-shadow-lg`}
        >
          <defs>
            <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#DC2626" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#DC2626" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <path
            d="M50 60 Q 150 100, 250 180"
            stroke={`url(#gradient-${direction})`}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="12 6"
          />
          <path
            d="M250 180 L235 172 L242 190 Z"
            fill="#DC2626"
            className="opacity-90 drop-shadow"
          />
        </svg>
        <div
          className={`absolute top-[30%] w-3.5 h-3.5 bg-brand-red rounded-full animate-pulse shadow-lg ${
            direction === 'right' ? 'left-[16%]' : 'right-[16%]'
          }`}
        />
      </div>

      <div className="lg:hidden flex items-center justify-center py-6">
        <svg
          width="32"
          height="48"
          viewBox="0 0 32 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          <path
            d="M16 4 L16 40"
            stroke="#DC2626"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="6 3"
          />
          <path
            d="M16 40 L10 32 L22 32 Z"
            fill="#DC2626"
          />
        </svg>
      </div>
    </div>
  );
}
