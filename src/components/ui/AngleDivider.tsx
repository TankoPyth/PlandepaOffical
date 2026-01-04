interface AngleDividerProps {
  direction?: 'down-right' | 'up-right' | 'down-left' | 'up-left';
  fromColor?: string;
  toColor?: string;
  height?: number;
}

export function AngleDivider({
  direction = 'down-right',
  fromColor = '#FFFFFF',
  toColor = '#F5F5F5',
  height = 80,
}: AngleDividerProps) {
  const getPath = () => {
    switch (direction) {
      case 'down-right':
        return `M 0 0 L 0 ${height * 0.3} L 1920 ${height} L 1920 0 Z`;
      case 'up-right':
        return `M 0 ${height} L 0 ${height * 0.7} L 1920 0 L 1920 ${height} Z`;
      case 'down-left':
        return `M 0 ${height} L 0 0 L 1920 0 L 1920 ${height * 0.7} Z`;
      case 'up-left':
        return `M 0 0 L 0 ${height} L 1920 ${height * 0.3} L 1920 0 Z`;
      default:
        return `M 0 0 L 0 ${height * 0.3} L 1920 ${height} L 1920 0 Z`;
    }
  };

  return (
    <div className="relative w-full overflow-hidden" style={{ height: `${height}px`, marginTop: `-${height}px` }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 1920 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`gradient-${direction}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <path
          d={getPath()}
          fill={toColor}
        />
      </svg>
    </div>
  );
}
