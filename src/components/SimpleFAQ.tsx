import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface SimpleFAQProps {
  items: FAQItem[];
}

export function SimpleFAQ({ items }: SimpleFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      {items.map((item, index) => (
        <div key={index} className="border-b border-gray-200 last:border-0">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full py-5 md:py-8 flex items-center justify-between text-left group hover:text-brand-red transition-colors"
          >
            <span className="text-base md:text-heading-sm font-semibold text-brand-black group-hover:text-brand-red transition-colors pr-4 md:pr-8">
              {item.question}
            </span>
            {openIndex === index ? (
              <Minus className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-brand-red" />
            ) : (
              <Plus className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 text-brand-gray" />
            )}
          </button>
          {openIndex === index && (
            <div className="pb-5 md:pb-8 text-sm md:text-body-lg text-brand-gray leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
