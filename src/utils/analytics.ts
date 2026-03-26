/**
 * Google Analytics Event Tracking Utility
 *
 * This file provides type-safe wrapper functions for Google Analytics 4 events.
 * Replace GA_MEASUREMENT_ID in index.html with your actual Google Analytics ID.
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a custom event in Google Analytics
 * @param eventName - The name of the event to track
 * @param eventParams - Optional parameters to send with the event
 */
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

/**
 * Conversion Events
 * These are the primary conversion goals for the website
 */

export function trackROICalculatorComplete(roiData: {
  annual_savings: number;
  net_benefit: number;
  roi_percent: number;
  payback_months: number;
}) {
  trackEvent('roi_calculator_complete', {
    value: roiData.net_benefit,
    currency: 'AUD',
    annual_savings: roiData.annual_savings,
    roi_percent: roiData.roi_percent,
    payback_months: roiData.payback_months,
  });
}

export function trackContactFormSubmit(source: 'contact' | 'homepage' | 'sticky_button' | 'business_audit' | 'lead_generation') {
  trackEvent('contact_form_submit', {
    form_source: source,
  });
}

/**
 * Navigation & Click Events
 */

export function trackCTAClick(ctaName: string, destination?: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    destination: destination,
  });
}

export function trackExternalLinkClick(linkName: string, url: string) {
  trackEvent('external_link_click', {
    link_name: linkName,
    url: url,
  });
}

export function trackEmailClick(source: string) {
  trackEvent('email_click', {
    source: source,
  });
}

export function trackPhoneClick(source: string) {
  trackEvent('phone_click', {
    source: source,
  });
}

/**
 * Social Media Events
 */

export function trackSocialMediaClick(platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter') {
  trackEvent('social_media_click', {
    platform: platform,
  });
}

export function trackSocialShare(platform: string, contentType: string, contentTitle?: string) {
  trackEvent('social_share', {
    platform: platform,
    content_type: contentType,
    content_title: contentTitle,
  });
}

/**
 * Content Engagement Events
 */

export function trackBlogPostView(postSlug: string, postTitle: string) {
  trackEvent('blog_post_view', {
    post_slug: postSlug,
    post_title: postTitle,
  });
}

export function trackCaseStudyView(companyType: string) {
  trackEvent('case_study_view', {
    company_type: companyType,
  });
}

/**
 * Form Progress Events
 */

export function trackFormStart(formName: string) {
  trackEvent('form_start', {
    form_name: formName,
  });
}

export function trackFormStep(formName: string, step: number, totalSteps: number) {
  trackEvent('form_step', {
    form_name: formName,
    step: step,
    total_steps: totalSteps,
  });
}

export function trackFormError(formName: string, errorType: string) {
  trackEvent('form_error', {
    form_name: formName,
    error_type: errorType,
  });
}

/**
 * Page View Tracking
 * Note: Google Analytics automatically tracks page views,
 * but you can use this for custom page view events
 */

export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-RD1NPQXN7Y', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
}

/**
 * Scroll Depth Tracking
 */

export function trackScrollDepth(percentage: 25 | 50 | 75 | 100) {
  trackEvent('scroll_depth', {
    percentage: percentage,
  });
}

/**
 * Time on Page Tracking
 */

export function trackTimeOnPage(pageName: string, seconds: number) {
  trackEvent('time_on_page', {
    page_name: pageName,
    time_seconds: seconds,
  });
}

/**
 * Chat Widget Events
 */

export function trackChatOpened() {
  trackEvent('chat_opened', {
    widget_type: 'voiceflow',
  });
}

export function trackChatClosed() {
  trackEvent('chat_closed', {
    widget_type: 'voiceflow',
  });
}

export function trackChatMessageSent(messageCount: number) {
  trackEvent('chat_message_sent', {
    widget_type: 'voiceflow',
    message_count: messageCount,
  });
}
