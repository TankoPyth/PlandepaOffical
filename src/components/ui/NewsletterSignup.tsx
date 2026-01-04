import { useState, FormEvent } from 'react';
import { Mail, Check, AlertCircle, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NewsletterSignupProps {
  source?: string;
}

export function NewsletterSignup({ source = 'blog-article' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, source, active: true }]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('This email is already subscribed!');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setStatus('error');
      } else {
        setStatus('success');
        setEmail('');
      }
    } catch (err) {
      setErrorMessage('Unable to subscribe. Please try again later.');
      setStatus('error');
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-black rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-brand-red/20 rounded-xl flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-brand-red" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white">
            Stay Ahead: Weekly Construction AI Insights
          </h3>
        </div>

        <p className="text-slate-300 mb-6 text-base md:text-lg">
          Join <span className="font-bold text-white">127 construction executives</span> receiving our weekly AI implementation strategies, case studies, and industry insights.
        </p>

        {status === 'success' ? (
          <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6 flex items-start gap-3">
            <Check className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-400 mb-1">Successfully subscribed!</div>
              <div className="text-sm text-emerald-300">
                Check your inbox next Monday for your first insights newsletter.
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={status === 'loading'}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-brand-red focus:bg-white/15 transition-all disabled:opacity-50"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-4 bg-brand-red hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Free'}
            </button>
          </form>
        )}

        {status === 'error' && errorMessage && (
          <div className="mt-3 bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-300">{errorMessage}</div>
          </div>
        )}

        <div className="mt-4 text-xs text-slate-400">
          No spam. Unsubscribe anytime. By subscribing, you agree to our Privacy Policy.
        </div>
      </div>
    </div>
  );
}
