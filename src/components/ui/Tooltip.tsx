import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';

interface TooltipProps {
  term: string;
  definition: string;
  children?: React.ReactNode;
}

export function Tooltip({ term, definition, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isVisible && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const spaceAbove = triggerRect.top;
      const spaceBelow = window.innerHeight - triggerRect.bottom;

      setPosition(spaceBelow < 150 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    }
  }, [isVisible]);

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        className="inline-flex items-baseline gap-1 border-b-2 border-dotted border-brand-red cursor-help text-brand-black font-medium"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children || term}
        <Info className="w-3 h-3 inline text-brand-red" />
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`absolute left-1/2 -translate-x-1/2 z-50 w-64 md:w-80 bg-slate-900 text-white text-sm rounded-lg shadow-xl p-4 ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          <div className="font-bold mb-1 text-brand-red">{term}</div>
          <div className="leading-relaxed">{definition}</div>
          <div
            className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent ${
              position === 'top'
                ? 'top-full border-t-8 border-t-slate-900'
                : 'bottom-full border-b-8 border-b-slate-900'
            }`}
          />
        </div>
      )}
    </span>
  );
}
