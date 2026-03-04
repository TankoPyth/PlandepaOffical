import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useRef, useState } from 'react';

interface WorkflowCardProps {
  icon: LucideIcon;
  title: string;
  painPoint: string;
  hoursSaved: number;
  isPopular?: boolean;
  onClick: () => void;
}

export function WorkflowCard({ icon: Icon, title, painPoint, hoursSaved, isPopular, onClick }: WorkflowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className="relative cursor-pointer group"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {isPopular && (
        <motion.div
          className="absolute -top-3 -right-3 z-20 bg-brand-red text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg"
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        >
          <motion.span
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            Most Popular
          </motion.span>
        </motion.div>
      )}

      <motion.div
        className="relative bg-white rounded-2xl p-8 h-full border-2 border-brand-light-gray overflow-hidden"
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(0, 0, 0, 0.02) 100%)',
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-0"
          animate={{
            opacity: isHovered ? 0.5 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(600px circle at ${mouseXSpring}px ${mouseYSpring}px, rgba(239, 68, 68, 0.08), transparent 40%)`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
          <motion.div
            className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center mb-6"
            animate={{
              rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-8 h-8 text-brand-red" />
          </motion.div>

          <h3 className="text-2xl font-bold text-brand-black mb-3">{title}</h3>

          <p className="text-brand-gray text-base leading-relaxed mb-6">
            {painPoint}
          </p>

          <motion.div
            className="flex items-center gap-2 text-brand-red font-semibold"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-3xl font-bold">{hoursSaved}</span>
            <span className="text-sm">hours saved/week</span>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center gap-2 text-brand-black font-medium"
            animate={{
              x: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <span>Learn More</span>
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              animate={{
                x: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-red-400 to-brand-red"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
        />
      </motion.div>
    </motion.div>
  );
}
