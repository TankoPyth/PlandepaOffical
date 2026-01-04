interface SectionIllustrationProps {
  type: 'summary' | 'finance' | 'solution' | 'implementation' | 'market' | 'recommendation';
  className?: string;
}

export function SectionIllustration({ type, className = '' }: SectionIllustrationProps) {
  const illustrations = {
    summary: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
        <path
          d="M70 90 L90 110 L130 70"
          stroke="#C41E3A"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="100" cy="100" r="60" stroke="#C41E3A" strokeWidth="4" fill="none" />
      </svg>
    ),
    finance: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect x="30" y="120" width="30" height="50" fill="#C41E3A" rx="4" />
        <rect x="70" y="90" width="30" height="80" fill="#EF4444" rx="4" />
        <rect x="110" y="60" width="30" height="110" fill="#C41E3A" rx="4" />
        <rect x="150" y="40" width="30" height="130" fill="#EF4444" rx="4" />
        <path
          d="M40 120 L85 90 L125 60 L165 40"
          stroke="#10B981"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="8 4"
        />
      </svg>
    ),
    solution: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="100" cy="100" r="70" fill="#FEE2E2" />
        <path
          d="M100 60 L120 80 L100 100 L80 80 Z"
          fill="#C41E3A"
        />
        <circle cx="100" cy="130" r="15" fill="#EF4444" />
        <rect x="55" y="90" width="20" height="20" fill="#C41E3A" rx="4" />
        <rect x="125" y="90" width="20" height="20" fill="#C41E3A" rx="4" />
      </svg>
    ),
    implementation: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <rect x="40" y="40" width="120" height="80" rx="8" fill="#FEE2E2" />
        <rect x="50" y="50" width="100" height="10" rx="4" fill="#C41E3A" />
        <rect x="50" y="70" width="100" height="10" rx="4" fill="#EF4444" />
        <rect x="50" y="90" width="100" height="10" rx="4" fill="#C41E3A" />
        <circle cx="170" cy="160" r="20" fill="#10B981" />
        <path
          d="M162 160 L167 165 L178 154"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    market: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <circle cx="100" cy="100" r="80" fill="#FEE2E2" />
        <circle cx="100" cy="100" r="60" fill="#FECACA" />
        <circle cx="100" cy="100" r="40" fill="#FCA5A5" />
        <circle cx="100" cy="100" r="20" fill="#C41E3A" />
        <path
          d="M100 20 L110 30 L100 100"
          stroke="#374151"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    recommendation: (
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path
          d="M100 30 L130 90 L190 100 L140 140 L150 200 L100 170 L50 200 L60 140 L10 100 L70 90 Z"
          fill="#C41E3A"
        />
        <circle cx="100" cy="100" r="30" fill="#FEE2E2" />
      </svg>
    ),
  };

  return (
    <div className="flex items-center justify-center">
      {illustrations[type]}
    </div>
  );
}
