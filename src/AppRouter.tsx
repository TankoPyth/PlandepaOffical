/**
 * AppRouter.tsx
 *
 * This is the MAIN ROUTING FILE for the entire website.
 * It defines which page shows up at which URL.
 *
 * How to add a new page:
 * 1. Import your page component at the top
 * 2. Add a <Route> below with your desired URL path
 * 3. Example: <Route path="/my-page" element={<MyPage />} />
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

// Layout components (appear on every page)
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { StickyContactButton } from './components/ui/StickyContactButton';

// Analytics
import { trackChatOpened, trackChatClosed } from './utils/analytics';

// Home page loaded immediately (critical path)
import { HomePage } from './pages/HomePage';

// All other pages lazy loaded (code splitting)
const BusinessAuditPage = lazy(() => import('./pages/BusinessAuditPage').then(m => ({ default: m.BusinessAuditPage })));
const LeadGenerationPage = lazy(() => import('./pages/LeadGenerationPage').then(m => ({ default: m.LeadGenerationPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const SoftwarePage = lazy(() => import('./pages/SoftwarePage').then(m => ({ default: m.SoftwarePage })));
const ROICalculatorPage = lazy(() => import('./pages/ROICalculatorPage').then(m => ({ default: m.ROICalculatorPage })));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));

/**
 * Layout Component
 * Wraps every page with Navigation (header) and Footer
 * Also includes ScrollProgress bar for reading progress
 */
function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set up Voiceflow chat event listeners after widget loads
    const checkVoiceflowReady = setInterval(() => {
      if (typeof window !== 'undefined' && window.voiceflow?.chat) {
        clearInterval(checkVoiceflowReady);

        // Listen for chat open/close events by monitoring the widget state
        const observer = new MutationObserver(() => {
          const chatFrame = document.querySelector('[id^="voiceflow-chat"]');
          if (chatFrame) {
            const isOpen = chatFrame.getAttribute('data-state') === 'open' ||
                          (chatFrame as HTMLElement).style.display !== 'none';

            // Store previous state to detect changes
            const prevState = (window as any).__vfChatOpen;
            if (isOpen && !prevState) {
              trackChatOpened();
              (window as any).__vfChatOpen = true;
            } else if (!isOpen && prevState) {
              trackChatClosed();
              (window as any).__vfChatOpen = false;
            }
          }
        });

        // Observe DOM changes to detect widget state changes
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'data-state', 'class']
        });

        return () => observer.disconnect();
      }
    }, 100);

    // Cleanup timeout after 10 seconds if Voiceflow doesn't load
    const timeout = setTimeout(() => clearInterval(checkVoiceflowReady), 10000);

    return () => {
      clearInterval(checkVoiceflowReady);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />  {/* Reading progress bar at top */}
      <Navigation />      {/* Header with logo and menu */}
      <main className="flex-1 pt-[120px]">{children}</main>  {/* Page content goes here - updated for dual-layer nav */}
      <Footer />          {/* Footer with links and copyright */}
      <StickyContactButton />  {/* Floating contact button that appears on scroll */}
    </div>
  );
}

/**
 * AppRouter Component
 * Defines all the routes (URLs) for the website
 *
 * Route format: <Route path="/url-here" element={<PageComponent />} />
 *
 * Special routes:
 * - "/" is the home page
 * - "/blog/:slug" uses :slug as a variable (e.g., /blog/my-post-title)
 */
export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-pulse text-gray-600">Loading...</div>
          </div>
        }>
          <Routes>
            {/* Home page - shows at www.plandepa.com/ */}
            <Route path="/" element={<HomePage />} />

            {/* Service pages */}
            <Route path="/business-audit" element={<BusinessAuditPage />} />
            <Route path="/free-audit" element={<Navigate to="/business-audit" replace />} />
            <Route path="/lead-generation" element={<LeadGenerationPage />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />

            {/* Information pages */}
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/software" element={<SoftwarePage />} />
            <Route path="/services" element={<SoftwarePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/thank-you" element={<ThankYouPage />} />

            {/* Blog pages */}
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />  {/* :slug = post URL name */}

            {/* 404 catch-all route - MUST be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
