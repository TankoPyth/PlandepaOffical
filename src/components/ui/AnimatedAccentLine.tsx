import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedAccentLineProps {
  orientation?: 'horizontal' | 'vertical';
  length?: string;
  thickness?: string;
  color?: string;
  delay?: number;
  duration?: number;
  className?: string;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

export function AnimatedAccentLine({
  orientation = 'horizontal',
  length = '100%',
  thickness = '2px',
  color = 'rgb(220, 38, 38)',
  delay = 0,
  duration = 0.8,
  className = '',
  position = 'left'
}: AnimatedAccentLineProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const isHorizontal = orientation === 'horizontal';

  const positionClasses = {
    left: 'left-0',
    right: 'right-0',
    top: 'top-0',
    bottom: 'bottom-0'
  };

  return (
    <div
      ref={ref}
      className={`absolute ${positionClasses[position]} ${className}`}
      style={{
        width: isHorizontal ? length : thickness,
        height: isHorizontal ? thickness : length,
      }}
    >
      <motion.div
        className="absolute"
        style={{
          background: color,
          width: '100%',
          height: '100%',
          transformOrigin: isHorizontal ? 'left center' : 'top center'
        }}
        initial={{
          [isHorizontal ? 'scaleX' : 'scaleY']: 0,
          opacity: 0
        }}
        animate={isInView ? {
          [isHorizontal ? 'scaleX' : 'scaleY']: 1,
          opacity: 1
        } : {}}
        transition={{
          duration,
          delay,
          ease: [0.33, 1, 0.68, 1]
        }}
      />
    </div>
  );
}

interface CornerAccentProps {
  size?: string;
  thickness?: string;
  color?: string;
  delay?: number;
  className?: string;
  corner?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function CornerAccent({
  size = '24px',
  thickness = '2px',
  color = 'rgb(220, 38, 38)',
  delay = 0,
  className = '',
  corner = 'top-left'
}: CornerAccentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cornerPositions = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180'
  };

  return (
    <div
      ref={ref}
      className={`absolute ${cornerPositions[corner]} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M 0 24 L 0 0 L 24 0"
          stroke={color}
          strokeWidth={thickness}
          strokeLinecap="square"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay,
            ease: [0.33, 1, 0.68, 1]
          }}
        />
      </svg>
    </div>
  );
}

interface UnderlineAccentProps {
  text: string;
  className?: string;
  delay?: number;
  lineColor?: string;
  textClassName?: string;
}

export function UnderlineAccent({
  text,
  className = '',
  delay = 0,
  lineColor = 'rgb(220, 38, 38)',
  textClassName = ''
}: UnderlineAccentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className={textClassName}>{text}</span>
      <motion.span
        className="absolute bottom-0 left-0 h-[2px]"
        style={{ backgroundColor: lineColor, width: '100%' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.6 } : {}}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.33, 1, 0.68, 1]
        }}
      />
    </span>
  );
}
