import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { appleEasing } from '../utils/animations';
import { trackContactFormSubmit } from '../utils/analytics';

const CONTACT_WEBHOOK_URL = import.meta.env.VITE_CONTACT_WEBHOOK_URL || '';

interface ContactFormProps {
  source?: 'contact' | 'homepage' | 'sticky_button' | 'business_audit' | 'lead_generation' | 'buildxact_ad';
  onSuccess?: () => void;
}

interface FormData {
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  message: string;
}

export function ContactForm({ source = 'contact', onSuccess }: ContactFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    company_name: '',
    phone_number: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Validate all fields are filled
      if (!formData.full_name.trim() || !formData.email.trim() ||
          !formData.company_name.trim() || !formData.phone_number.trim() ||
          !formData.message.trim()) {
        throw new Error('Please fill out all fields');
      }

      const submissionData = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        company_name: formData.company_name.trim(),
        phone_number: formData.phone_number.trim(),
        message: formData.message.trim(),
        source_page: source,
        status: 'new',
        submitted_at: new Date().toISOString(),
      };

      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert([submissionData]);

      if (supabaseError) {
        throw new Error(`Database error: ${supabaseError.message}`);
      }

      if (CONTACT_WEBHOOK_URL) {
        try {
          await fetch(CONTACT_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData),
          });
        } catch (webhookError) {
          console.error('Webhook error:', webhookError);
        }
      }

      setSubmitStatus('success');

      trackContactFormSubmit(source);

      if (onSuccess) {
        onSuccess();
      } else {
        setTimeout(() => {
          navigate('/contact/thank-you');
        }, 1500);
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="full_name" className="block text-sm font-semibold text-brand-black">
          Full Name <span className="text-brand-red">*</span>
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={formData.full_name}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="John Smith"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-brand-black">
          Email Address <span className="text-brand-red">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="john@company.com"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="company_name" className="block text-sm font-semibold text-brand-black">
          Company Name <span className="text-brand-red">*</span>
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="ABC Construction"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone_number" className="block text-sm font-semibold text-brand-black">
          Phone Number <span className="text-brand-red">*</span>
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="+61 400 000 000"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-semibold text-brand-black">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
          rows={5}
          minLength={10}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Tell us about your business and what you're looking for..."
        />
        <p className="text-xs text-brand-gray">Minimum 10 characters</p>
      </div>

      <AnimatePresence mode="wait">
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: appleEasing }}
            className="flex items-center gap-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-sm font-medium text-emerald-800">
              Thanks for reaching out! We'll get back to you within 24 hours.
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: appleEasing }}
            className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-brand-red" />
            </div>
            <p className="text-sm font-medium text-red-800">
              {errorMessage || 'Something went wrong. Please try again or email us directly.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting || submitStatus === 'success'}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold text-base rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 apple-ease shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-lg"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Sending...
          </>
        ) : submitStatus === 'success' ? (
          <>
            <Check className="w-5 h-5" />
            Sent!
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      <p className="text-xs text-center text-brand-gray">
        We'll never share your information with third parties.
      </p>
    </form>
  );
}
