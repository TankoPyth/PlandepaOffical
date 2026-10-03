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
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';
import { LOCATIONS } from './seo/site';
import { OFFER_PATH } from './seo/offer';

// Analytics
import { trackChatOpened, trackChatClosed } from './utils/analytics';

// Home page loaded immediately (critical path)
import { HomePage } from './pages/HomePage';

// All other pages lazy loaded (code splitting)
const BusinessAuditPage = lazy(() => import('./pages/BusinessAuditPage').then(m => ({ default: m.BusinessAuditPage })));
const LeadGenerationPage = lazy(() => import('./pages/LeadGenerationPage').then(m => ({ default: m.LeadGenerationPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const ROICalculatorPage = lazy(() => import('./pages/ROICalculatorPage').then(m => ({ default: m.ROICalculatorPage })));
const PilotProgramPage = lazy(() => import('./pages/PilotProgramPage').then(m => ({ default: m.PilotProgramPage })));
const TrainingPage = lazy(() => import('./pages/TrainingPage').then(m => ({ default: m.TrainingPage })));
const OngoingSupportPage = lazy(() => import('./pages/OngoingSupportPage').then(m => ({ default: m.OngoingSupportPage })));
const BuildxactPartnerPage = lazy(() => import('./pages/BuildxactPartnerPage').then(m => ({ default: m.BuildxactPartnerPage })));
const ClarityBlueprintPage = lazy(() => import('./pages/ClarityBlueprintPage').then(m => ({ default: m.ClarityBlueprintPage })));
const LocationPage = lazy(() => import('./pages/LocationPage').then(m => ({ default: m.LocationPage })));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ThankYouPage = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const AdCampaignLandingPage = lazy(() => import('./pages/AdCampaignLandingPage').then(m => ({ default: m.default })));
const BuildxactAdLandingPage = lazy(() => import('./pages/BuildxactAdLandingPage').then(m => ({ default: m.default })));
const PipelineRecoveryReviewPage = lazy(() => import('./pages/PipelineRecoveryReviewPage').then(m => ({ default: m.PipelineRecoveryReviewPage })));

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
      <SEO />
      <ScrollProgress />  {/* Reading progress bar at top */}
      <Navigation />      {/* Header with logo and menu */}
      <main className="flex-1 pt-20">{children}</main>  {/* Page content goes here */}
      <Footer />          {/* Footer with links and copyright */}
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
      <AppRoutes />
    </BrowserRouter>
  );
}

/**
 * Router-agnostic routes. Rendered inside <BrowserRouter> in the browser and
 * inside <StaticRouter> by src/entry-server.tsx when prerendering.
 */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-600">Loading...</div>
        </div>
      }>
        <Routes>
          {/* Landing pages without Layout (have their own header/footer) */}
          <Route path="/lp/ad-campaign" element={<AdCampaignLandingPage />} />
          <Route path="/lp/buildxact-ad" element={<BuildxactAdLandingPage />} />

          {/* All other routes wrapped in Layout */}
          <Route path="*" element={
            <Layout>
              <Routes>
                {/* Home page - shows at www.plandepa.com/ */}
                <Route path="/" element={<HomePage />} />

            {/* Service pages */}
            <Route path="/business-audit" element={<BusinessAuditPage />} />
            <Route path="/free-audit" element={<Navigate to="/business-audit" replace />} />
            <Route path={OFFER_PATH} element={<ClarityBlueprintPage />} />
            <Route path="/operations-review" element={<Navigate to={OFFER_PATH} replace />} />
            <Route path="/osr" element={<Navigate to={OFFER_PATH} replace />} />
            <Route path="/pilot-program" element={<PilotProgramPage />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/ongoing-support" element={<OngoingSupportPage />} />
            <Route path="/buildxact" element={<BuildxactPartnerPage />} />
            <Route path="/enquiry-automation" element={<LeadGenerationPage />} />
            <Route path="/lead-generation" element={<Navigate to="/enquiry-automation" replace />} />

            {/* Location landing pages */}
            <Route path={LOCATIONS.brisbane.slug} element={<LocationPage location="brisbane" />} />
            <Route path={LOCATIONS.newcastle.slug} element={<LocationPage location="newcastle" />} />
            <Route path="/brisbane" element={<Navigate to={LOCATIONS.brisbane.slug} replace />} />
            <Route path="/newcastle" element={<Navigate to={LOCATIONS.newcastle.slug} replace />} />
            <Route path="/roi-calculator" element={<ROICalculatorPage />} />
            <Route path="/pipeline-recovery-review" element={<PipelineRecoveryReviewPage />} />
            <Route path="/revenue-leak-scorecard" element={<Navigate to="/pipeline-recovery-review" replace />} />

            {/* Information pages */}
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/software" element={<Navigate to={OFFER_PATH} replace />} />
            <Route path="/services" element={<Navigate to={OFFER_PATH} replace />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/contact/thank-you" element={<ThankYouPage />} />

                {/* Blog pages */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />  {/* :slug = post URL name */}

                {/* 404 catch-all route - MUST be last */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Suspense>
    </>
  );
}
