import { useState, useRef, useEffect, useCallback } from 'react';
import { FileText, Mail, Search, Sparkles, BarChart3, CheckCircle2 } from 'lucide-react';

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = (x / rect.width) * 100;
      setSliderPosition(Math.max(0, Math.min(100, percentage)));
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  }, [isDragging, handleMove]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isDragging && e.touches[0]) handleMove(e.touches[0].clientX);
  }, [isDragging, handleMove]);

  const handleEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: true });
      document.addEventListener('touchend', handleEnd);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

  const handleMouseDown = useCallback(() => setIsDragging(true), []);
  const handleTouchStart = useCallback(() => setIsDragging(true), []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-slate-100 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Manual Process</div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <FileText className="w-8 h-8" />
              <span className="text-xs">Paper Documents</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <Mail className="w-8 h-8" />
              <span className="text-xs">Email Chains</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-600">
              <Search className="w-8 h-8" />
              <span className="text-xs">Manual Search</span>
            </div>
          </div>
          <div className="mt-6 text-red-600 font-bold text-lg">9.7 Days per RFI</div>
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-blue-100 flex items-center justify-center p-8"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="text-center">
          <div className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">AI-Powered Workflow</div>
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 text-slate-700">
              <Sparkles className="w-8 h-8 text-emerald-600" />
              <span className="text-xs">Auto-Processing</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-700">
              <BarChart3 className="w-8 h-8 text-emerald-600" />
              <span className="text-xs">Real-time Data</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              <span className="text-xs">Instant Responses</span>
            </div>
          </div>
          <div className="mt-6 text-emerald-600 font-bold text-lg">~1 Day per RFI</div>
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-brand-red">
          <div className="flex gap-0.5">
            <div className="w-1 h-4 bg-brand-red rounded-full"></div>
            <div className="w-1 h-4 bg-brand-red rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-full">
        Before
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-semibold text-slate-700 bg-white/90 px-3 py-1 rounded-full">
        After
      </div>
    </div>
  );
}
