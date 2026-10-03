import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { OFFER_PATH } from '../seo/offer';

const DISMISS_KEY = 'pd_blueprint_prompt_dismissed';

interface StickyWorkflowBarProps {
  /** Kept so existing callers still type-check; the prompt now always links to the Clarity Blueprint. */
  onBookCall?: () => void;
  show?: boolean;
}

/**
 * One quiet prompt for the main offer. Appears once, after the visitor has read
 * a good way down the page, sits bottom-left so it never covers the chat bubble,
 * and stays dismissed for the rest of the session.
 */
export function StickyWorkflowBar(_props: StickyWorkflowBarProps = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {
      // storage unavailable: fall through and show normally
    }
    if (dismissed) return;

    const handleScroll = () => {
      const scrolled = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      setIsVisible(scrolled > 0.45);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      // ignore
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-4 bg-brand-black text-white rounded-lg pl-5 pr-3 py-3 max-w-md"
      role="complementary"
      aria-label="Clarity Blueprint"
    >
      <div className="flex-1">
        <p className="text-sm font-semibold leading-tight">Not sure what is breaking?</p>
        <p className="text-xs text-gray-300 mt-0.5">The Clarity Blueprint, from $990 + GST</p>
      </div>
      <Link
        to={OFFER_PATH}
        className="px-4 py-2 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
      >
        See how
      </Link>
      <button
        onClick={handleDismiss}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
