import { Clock, AlertCircle, TrendingUp, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

interface UrgencyBadgeProps {
  type: 'limited-spots' | 'early-pricing' | 'competitor-adoption';
  spotsRemaining?: number;
  daysRemaining?: number;
  percentageAdopted?: number;
}

export function UrgencyBadge({
  type,
  spotsRemaining = 3,
  daysRemaining = 30,
  percentageAdopted = 61,
}: UrgencyBadgeProps) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1000);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (type === 'limited-spots') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-4 py-2 bg-red-50 border-2 border-brand-red rounded-full transition-all ${
          pulse ? 'scale-105 shadow-lg' : 'scale-100'
        }`}
      >
        <AlertCircle className="w-5 h-5 text-brand-red" />
        <span className="text-sm font-bold text-brand-red">
          Only {spotsRemaining} implementation slots available this quarter
        </span>
      </div>
    );
  }

  if (type === 'early-pricing') {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + daysRemaining);
    const formattedDate = expiryDate.toLocaleDateString('en-AU', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border-2 border-emerald-500 rounded-full">
        <Clock className="w-5 h-5 text-emerald-600" />
        <span className="text-sm font-bold text-emerald-700">
          Early adopter pricing available until {formattedDate}
        </span>
      </div>
    );
  }

  if (type === 'competitor-adoption') {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-xl p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-4xl font-bold text-orange-600">{percentageAdopted}%</span>
              <span className="text-sm text-orange-700 font-semibold">of competitors</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              are already adopting AI for cost reduction. <span className="font-bold">Don't fall
              behind</span> — secure your competitive advantage today.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

interface ViewCounterProps {
  count: number;
  timeframe?: string;
}

export function ViewCounter({ count, timeframe = 'this week' }: ViewCounterProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
      <Users className="w-4 h-4" />
      <span>
        Recently viewed by <span className="font-bold text-brand-black">{count}</span> construction
        firms {timeframe}
      </span>
    </div>
  );
}
