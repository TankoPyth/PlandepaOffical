import { useState } from 'react';
import { Linkedin, Twitter, Mail, Link2, Check } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SocialShareProps {
  postSlug?: string;
  title: string;
  url: string;
  description: string;
}

export function SocialShare({ postSlug, title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const recordShare = async (platform: string) => {
    if (!postSlug) return;

    try {
      await supabase.from('social_shares').insert([
        {
          post_slug: postSlug,
          platform,
        },
      ]);
    } catch (error) {
      console.error('Error recording share:', error);
    }
  };

  const shareOnLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    recordShare('linkedin');
  };

  const shareOnTwitter = () => {
    const tweetText = `${title}\n\n${description}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    recordShare('twitter');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${description}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    recordShare('email');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      recordShare('copy-link');
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
      <h4 className="text-lg font-bold text-brand-black mb-4">Share Your Results</h4>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={shareOnLinkedIn}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0077B5] hover:bg-[#006399] text-white rounded-lg font-medium transition-colors"
        >
          <Linkedin className="w-4 h-4" />
          <span className="text-sm">LinkedIn</span>
        </button>

        <button
          onClick={shareOnTwitter}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white rounded-lg font-medium transition-colors"
        >
          <Twitter className="w-4 h-4" />
          <span className="text-sm">Twitter</span>
        </button>

        <button
          onClick={shareViaEmail}
          className="flex items-center gap-2 px-4 py-2.5 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors"
        >
          <Mail className="w-4 h-4" />
          <span className="text-sm">Email</span>
        </button>

        <button
          onClick={copyLink}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-white border-2 border-slate-300 text-brand-black hover:border-brand-red'
          }`}
        >
          {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
          <span className="text-sm">{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
      </div>
    </div>
  );
}
