import { useState } from 'react';
import { Calendar, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WebinarRegistrationFormProps {
  onSuccess?: () => void;
}

export function WebinarRegistrationForm({ onSuccess }: WebinarRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const spotsRemaining = 8;
  const webinarDate = 'March 18, 2026';
  const webinarTime = '2:00 PM AEST';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('webinar_registrations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company,
            phone: formData.phone || null,
            webinar_date: webinarDate,
            registration_source: 'homepage_hero',
            status: 'registered'
          }
        ]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', phone: '' });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error submitting webinar registration:', error);
      setSubmitStatus('error');
      setErrorMessage(error.message || 'Failed to register. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full shadow-lg flex items-center gap-2 animate-pulse">
        <AlertCircle className="w-4 h-4" />
        <span className="text-sm font-bold">Only {spotsRemaining} Spots Left!</span>
      </div>

      <div className="text-center mb-6 mt-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1a1a2e]/5 rounded-full mb-3">
          <Calendar className="w-4 h-4 text-brand-red" />
          <span className="text-sm font-semibold text-[#1a1a2e]">{webinarDate} at {webinarTime}</span>
        </div>
        <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">
          Free Webinar: Automate Your Construction Business
        </h3>
        <p className="text-sm text-gray-600">
          Learn how to cut paperwork by 60% and increase leads by 85%
        </p>
      </div>

      {submitStatus === 'success' ? (
        <div className="py-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h4 className="text-xl font-bold text-[#1a1a2e] mb-2">You're Registered!</h4>
          <p className="text-gray-600">Check your email for webinar details and calendar invite.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[#1a1a2e] mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 text-[#1a1a2e]"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[#1a1a2e] mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 text-[#1a1a2e]"
              placeholder="john@construction.com.au"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-semibold text-[#1a1a2e] mb-1">
              Company Name *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 text-[#1a1a2e]"
              placeholder="Smith Construction"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-[#1a1a2e] mb-1">
              Phone Number <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-300 text-[#1a1a2e]"
              placeholder="+61 4XX XXX XXX"
            />
          </div>

          {submitStatus === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{errorMessage}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-4 bg-brand-red text-white font-bold text-lg rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Users className="w-5 h-5" />
                Reserve Your Spot Now
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500">
            By registering, you agree to receive webinar updates and occasional emails from Plandepa.
          </p>
        </form>
      )}

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-brand-red">60min</div>
            <div className="text-xs text-gray-600">Duration</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-red">Live</div>
            <div className="text-xs text-gray-600">Q&A Session</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-red">Free</div>
            <div className="text-xs text-gray-600">Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
}
