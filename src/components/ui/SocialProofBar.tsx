import { Star, Facebook, Linkedin } from 'lucide-react';

interface SocialProofBarProps {
  googleReviewsUrl?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  reviewRating?: number;
  reviewCount?: number;
}

export function SocialProofBar({
  googleReviewsUrl = 'https://www.google.com/maps',
  facebookUrl = 'https://www.facebook.com',
  linkedinUrl = 'https://www.linkedin.com',
  reviewRating = 5,
  reviewCount = 12,
}: SocialProofBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 py-4 border-y border-slate-200">
      <a
        href={googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
      >
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < reviewRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-brand-gray">
          <span className="font-bold text-brand-black">{reviewRating}.0</span> ({reviewCount} reviews)
        </span>
      </a>

      <div className="flex items-center gap-4">
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white transition-all duration-200 text-brand-gray"
          aria-label="Visit our Facebook page"
        >
          <Facebook className="w-5 h-5" />
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-red hover:text-white transition-all duration-200 text-brand-gray"
          aria-label="Visit our LinkedIn page"
        >
          <Linkedin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
