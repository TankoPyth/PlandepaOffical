import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendWebsiteLead } from '../lib/leads';
import { appleEasing } from '../utils/animations';
import { trackContactFormSubmit } from '../utils/analytics';

const CALENDLY_URL = 'https://calendly.com/admin-plandepa/30min';
const FAIL_MESSAGE = "Sorry, that didn't send. Email admin@plandepa.com or book a call";

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
  const [honeypot, setHoneypot] = useState('');

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

    try {
      if (!formData.full_name.trim() || !formData.email.trim() || !formData.message.trim()) {
        setSubmitStatus('error');
        return;
      }

      // Saved by netlify/functions/lead.ts into the Notion CRM, with an email copy.
      // Blog, newsletter and social share still use Supabase and are unchanged.
      const result = await sendWebsiteLead({
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        company_name: formData.company_name.trim(),
        phone_number: formData.phone_number.trim(),
        message: formData.message.trim(),
        source_page: source,
        website: honeypot,
      });

      if (!result.ok) {
        setSubmitStatus('error');
        return;
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
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
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
          Company Name
        </label>
        <input
          id="company_name"
          name="company_name"
          type="text"
          value={formData.company_name}
          onChange={handleInputChange}
          disabled={isSubmitting}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-brand-black placeholder-gray-400 focus:border-brand-black focus:outline-none transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="ABC Construction"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone_number" className="block text-sm font-semibold text-brand-black">
          Phone Number
        </label>
        <input
          id="phone_number"
          name="phone_number"
          type="tel"
          value={formData.phone_number}
          onChange={handleInputChange}
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
            role="alert"
            className="flex items-start gap-2 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-5 h-5 text-brand-red" />
            </div>
            <p className="text-sm font-medium text-red-800">
              {FAIL_MESSAGE.split('Email admin@plandepa.com or book a call')[0]}
              <a href="mailto:admin@plandepa.com" className="underline">
                Email admin@plandepa.com
              </a>
              {' or '}
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="underline">
                book a call
              </a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={isSubmitting || submitStatus === 'success'}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-black text-white font-semibold text-base rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 apple-ease shadow-lg disabled: disabled:hover:shadow-lg"
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
