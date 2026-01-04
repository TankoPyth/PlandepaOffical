import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function FloatingRedOrb({
  size = 300,
  top = '10%',
  left = '5%',
  delay = 0,
  opacity = 0.03
}: {
  size?: number;
  top?: string;
  left?: string;
  delay?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        top,
        left,
        background: `radial-gradient(circle, rgba(220, 38, 38, ${opacity}) 0%, transparent 70%)`,
      }}
      animate={{
        y: [0, 30, 0],
        x: [0, 20, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
}

export function DiagonalRedLines({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 opacity-[0.02]">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full bg-brand-red origin-left"
            style={{
              top: `${i * 8.33}%`,
              transform: 'rotate(-45deg)',
              transformOrigin: 'top left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.5,
              delay: i * 0.05,
              ease: [0.33, 1, 0.68, 1]
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function RedDotGrid({
  className = '',
  spacing = 40,
  dotSize = 2,
  opacity = 0.1
}: {
  className?: string;
  spacing?: number;
  dotSize?: number;
  opacity?: number;
}) {
  const cols = Math.ceil(window.innerWidth / spacing);
  const rows = Math.ceil(window.innerHeight / spacing);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(rows)].map((_, row) => (
        <div key={row} className="flex justify-between" style={{ height: spacing }}>
          {[...Array(cols)].map((_, col) => (
            <motion.div
              key={col}
              className="rounded-full bg-brand-red"
              style={{
                width: dotSize,
                height: dotSize,
                opacity: opacity,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.3,
                delay: (row * cols + col) * 0.002,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function AnimatedRedParticles({ count = 20 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-brand-red"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.3, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function RedGlowEffect({
  className = '',
  intensity = 'low'
}: {
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const opacityValues = {
    low: 0.05,
    medium: 0.1,
    high: 0.15
  };

  return (
    <motion.div
      ref={ref}
      className={`absolute inset-0 rounded-lg pointer-events-none ${className}`}
      style={{
        boxShadow: `inset 0 0 60px rgba(220, 38, 38, ${opacityValues[intensity]})`,
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    />
  );
}

export function VerticalRedAccent({
  height = '100px',
  position = 'left',
  delay = 0,
  className = ''
}: {
  height?: string;
  position?: 'left' | 'right';
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={`absolute ${position}-0 top-0 ${className}`}
      style={{ height }}
    >
      <motion.div
        className="w-[3px] h-full bg-gradient-to-b from-transparent via-brand-red to-transparent"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isInView ? { scaleY: 1, opacity: 0.4 } : {}}
        transition={{
          duration: 0.8,
          delay,
          ease: [0.33, 1, 0.68, 1]
        }}
      />
    </div>
  );
}
