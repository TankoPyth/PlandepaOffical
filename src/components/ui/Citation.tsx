import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Reference {
  number: number;
  source: string;
  title: string;
  date: string;
  url?: string;
}

interface CitationProps {
  number: number;
}

interface ReferencesProps {
  references: Reference[];
}

export function Citation({ number }: CitationProps) {
  return (
    <sup className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-red rounded-full ml-1 cursor-help">
      {number}
    </sup>
  );
}

export function References({ references }: ReferencesProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-red/10 rounded-lg flex items-center justify-center">
            <span className="text-brand-red font-bold">R</span>
          </div>
          <div>
            <h3 className="font-bold text-brand-black">References & Data Sources</h3>
            <p className="text-sm text-brand-gray">
              {references.length} citations from industry reports and research
            </p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-brand-gray" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-gray" />
        )}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6">
          <div className="space-y-4">
            {references.map((ref) => (
              <div
                key={ref.number}
                className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-brand-red rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {ref.number}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-brand-black mb-1">{ref.title}</div>
                  <div className="text-sm text-brand-gray mb-2">
                    {ref.source} • {ref.date}
                  </div>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-brand-red hover:text-red-700 font-medium"
                    >
                      View Source
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
