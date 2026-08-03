import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Gauge, LayoutList, Sparkles, TimerReset } from 'lucide-react';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';
import { CalendlyPopup } from '../components/ui/CalendlyPopup';
import {
  trackCalendlyOpen,
  trackPipelineReviewCtaClick,
  trackScorecardComplete,
  trackScorecardPageView,
  trackScorecardQuestionAnswered,
  trackScorecardResultView,
  trackScorecardStart,
  type PipelineScorecardResultBand,
} from '../utils/analytics';

export type ScorecardResultBand = PipelineScorecardResultBand;

interface ScorecardAnswerOption {
  label: string;
  score: 0 | 1 | 2 | 3;
}

interface ScorecardQuestion {
  id: string;
  eyebrow: string;
  question: string;
  whyItMatters: string;
  options: ScorecardAnswerOption[];
}

const questions: ScorecardQuestion[] = [
  {
    id: 'lead_capture',
    eyebrow: 'Lead capture',
    question: 'Can you prove what happened to every enquiry from the last 30 days?',
    whyItMatters: 'This checks whether leads are captured or disappearing into inboxes, calls and memory.',
    options: [
      { label: 'Yes, every enquiry is tracked.', score: 0 },
      { label: 'Mostly, but some are manual.', score: 1 },
      { label: 'Not really.', score: 2 },
      { label: 'No, it’s across calls, inboxes, messages and memory.', score: 3 },
    ],
  },
  {
    id: 'speed_to_lead',
    eyebrow: 'Speed to lead',
    question: 'How quickly are new enquiries usually followed up?',
    whyItMatters: 'Slow response turns paid attention into dead pipeline.',
    options: [
      { label: 'Under 1 hour.', score: 0 },
      { label: 'Same day.', score: 1 },
      { label: '1–2 days.', score: 2 },
      { label: 'Depends who sees it / sometimes missed.', score: 3 },
    ],
  },
  {
    id: 'quote_follow_up',
    eyebrow: 'Quote follow-up',
    question: 'Do quotes ever go quiet without a clear next follow-up date?',
    whyItMatters: 'Quote silence is one of the easiest revenue leaks to fix.',
    options: [
      { label: 'Rarely.', score: 0 },
      { label: 'Sometimes.', score: 1 },
      { label: 'Often.', score: 2 },
      { label: 'We don’t properly track this.', score: 3 },
    ],
  },
  {
    id: 'channel_control',
    eyebrow: 'Channel control',
    question: 'Are missed calls, website forms, Facebook messages and emails captured in one place?',
    whyItMatters: 'Scattered channels make follow-up dependent on whoever notices first.',
    options: [
      { label: 'Yes, one clear system.', score: 0 },
      { label: 'Mostly.', score: 1 },
      { label: 'No, split across tools.', score: 2 },
      { label: 'No, whoever sees it handles it.', score: 3 },
    ],
  },
  {
    id: 'approvals_variations',
    eyebrow: 'Approvals and variations',
    question: 'When a client approval, variation or decision is needed, is there a clear owner and deadline?',
    whyItMatters: 'Slow approvals delay jobs, create rework and chew margin.',
    options: [
      { label: 'Yes, always.', score: 0 },
      { label: 'Usually.', score: 1 },
      { label: 'Sometimes unclear.', score: 2 },
      { label: 'No, it sits until someone chases.', score: 3 },
    ],
  },
  {
    id: 'owner_visibility',
    eyebrow: 'Owner visibility',
    question: 'Can you see your active opportunities and quotes without asking someone?',
    whyItMatters: 'If the owner has to ask around, the business has no reliable control layer.',
    options: [
      { label: 'Yes, dashboard/report is clear.', score: 0 },
      { label: 'Mostly.', score: 1 },
      { label: 'Only if someone updates me.', score: 2 },
      { label: 'No, I have to chase/search.', score: 3 },
    ],
  },
  {
    id: 'memory_dependency',
    eyebrow: 'Memory dependency',
    question: 'How much follow-up depends on the owner/admin person remembering to do it?',
    whyItMatters: 'If memory is the system, automation has to start with structure first.',
    options: [
      { label: 'Very little.', score: 0 },
      { label: 'Some.', score: 1 },
      { label: 'A lot.', score: 2 },
      { label: 'Almost everything important.', score: 3 },
    ],
  },
];

const resultCopy: Record<ScorecardResultBand, { label: string; message: string; cta: string }> = {
  controlled: {
    label: 'Controlled',
    message: 'Your pipeline looks mostly controlled. The next step is not a big AI rollout — it’s finding the one bottleneck that would give the highest return if tightened.',
    cta: 'Sanity-check your pipeline',
  },
  leaking: {
    label: 'Leaking',
    message: 'Your pipeline is probably leaking through follow-up, quote silence, missed messages, or unclear ownership. You don’t need more noise — you need visibility and a recovery plan.',
    cta: 'Book a Pipeline Recovery Review',
  },
  bleeding: {
    label: 'Bleeding',
    message: 'You’re likely losing money before it ever becomes visible in your reports. Leads, quotes, approvals, and follow-ups are probably depending on memory, scattered tools, or one person chasing everything.',
    cta: 'Book a Pipeline Recovery Review before spending more on leads',
  },
};

function getScorecardResult(totalScore: number): ScorecardResultBand {
  if (totalScore <= 7) return 'controlled';
  if (totalScore <= 15) return 'leaking';
  return 'bleeding';
}

function scrollToScorecard() {
  document.getElementById('pipeline-scorecard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function PipelineRecoveryReviewPage() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [resultBand, setResultBand] = useState<ScorecardResultBand | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const totalScore = useMemo(
    () => Object.values(answers).reduce((sum, score) => sum + score, 0),
    [answers],
  );

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Pipeline Recovery Review', url: 'https://plandepa.com/pipeline-recovery-review' },
  ]);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Construction Pipeline Recovery Review',
    provider: {
      '@type': 'Organization',
      name: 'Plandepa',
    },
    description: 'A practical review of where enquiries, quotes, approvals, and follow-ups are getting lost across your construction pipeline.',
    areaServed: 'AU',
  };

  useEffect(() => {
    trackScorecardPageView();
  }, []);

  useEffect(() => {
    if (hasStarted) {
      trackScorecardStart();
    }
  }, [hasStarted]);

  const handleStart = () => {
    setHasStarted(true);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResultBand(null);
    scrollToScorecard();
  };

  const handleAnswer = (score: 0 | 1 | 2 | 3) => {
    if (!currentQuestion) return;

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: score,
    };

    setAnswers(nextAnswers);
    trackScorecardQuestionAnswered(currentQuestion.id, score);

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    if (isLastQuestion) {
      const nextTotalScore = Object.values(nextAnswers).reduce((sum, value) => sum + value, 0);
      const nextBand = getScorecardResult(nextTotalScore);
      setResultBand(nextBand);
      setHasStarted(false);
      trackScorecardComplete(nextTotalScore, nextBand);
      trackScorecardResultView(nextTotalScore, nextBand);
      return;
    }

    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const handlePrimaryCta = () => {
    trackPipelineReviewCtaClick('hero');
    scrollToScorecard();
  };

  const handleBookingCta = (source: string) => {
    trackPipelineReviewCtaClick(source, resultBand || undefined);
    trackCalendlyOpen(source, resultBand || undefined);
    setIsCalendlyOpen(true);
  };

  return (
    <>
      <SEO
        title="Pipeline Recovery Review | Construction Lead Follow-Up Scorecard"
        description="Check where your construction revenue pipeline is leaking, then book a practical Pipeline Recovery Review with PlanDepa."
        keywords="construction pipeline review, sales pipeline scorecard, lost leads follow-up, construction business review, revenue leak scorecard"
        canonical="/pipeline-recovery-review"
      />
      <StructuredData data={[breadcrumb, serviceSchema]} />

      <section className="bg-brand-off-white px-6 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full bg-brand-red/10 px-4 py-2 text-sm font-semibold text-brand-red">
                <Sparkles className="mr-2 h-4 w-4" />
                Construction Pipeline Recovery Review
              </div>

              <h1 className="max-w-3xl text-4xl font-black leading-tight text-brand-black md:text-5xl lg:text-6xl">
                Before you spend more on leads, check where your current pipeline is leaking.
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-brand-gray md:text-xl">
                PlanDepa helps construction businesses find where enquiries, quotes, approvals, and follow-ups are getting stuck — then gives you a 30-day recovery plan and shows where automation or AI actually makes sense.
              </p>

              <p className="mt-4 max-w-2xl text-lg font-semibold text-brand-black">
                Most construction businesses aren’t short on leads. They’re short on follow-up.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={handlePrimaryCta}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
                >
                  Check your pipeline
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-brand-red/10 p-3 text-brand-red">
                  <Gauge className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-brand-black">See the blind spots</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  Get a quick read on whether leaks are happening in follow-up, approvals, ownership, or channel capture.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm">
                <div className="mb-4 inline-flex rounded-xl bg-brand-red/10 p-3 text-brand-red">
                  <LayoutList className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-brand-black">No guesswork</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  This scorecard is deterministic and built to help you spot where revenue is being lost without any lead capture gate.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-black/10 bg-white p-5 shadow-sm sm:col-span-2">
                <div className="mb-4 inline-flex rounded-xl bg-brand-red/10 p-3 text-brand-red">
                  <TimerReset className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-brand-black">Practical next step</h2>
                <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                  We’ll show you where enquiries, quotes, approvals, and follow-ups are getting lost — then give you a practical 30-day plan to recover revenue and decide what automation or AI is actually worth implementing first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pipeline-scorecard" className="bg-white px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-3 inline-flex items-center rounded-full bg-brand-red/10 px-4 py-2 text-sm font-semibold text-brand-red">
              7-question scorecard
            </div>
            <h2 className="text-3xl font-black text-brand-black md:text-4xl">Where is your pipeline losing momentum?</h2>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-brand-gray md:text-lg">
              Answer seven quick questions to get a simple read on whether your pipeline is controlled, leaking, or bleeding.
            </p>
          </div>

          <div className="rounded-3xl border border-brand-black/10 bg-brand-off-white p-5 shadow-sm md:p-8">
            {!hasStarted && !resultBand && (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                  <Gauge className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black">Start the scorecard</h3>
                <p className="mx-auto max-w-2xl text-base leading-relaxed text-brand-gray">
                  This is a quick, anonymous readout of your follow-up process. No name, email, company, or phone number is required before you see the result.
                </p>
                <button
                  onClick={handleStart}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800"
                >
                  Check your pipeline
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {hasStarted && currentQuestion && (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">{currentQuestion.eyebrow}</p>
                    <h3 className="mt-2 text-2xl font-black text-brand-black md:text-3xl">{currentQuestion.question}</h3>
                  </div>
                  <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-black shadow-sm">
                    {currentQuestionIndex + 1} / {questions.length}
                  </div>
                </div>

                <p className="text-base leading-relaxed text-brand-gray">{currentQuestion.whyItMatters}</p>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.score)}
                      className="flex items-start gap-3 rounded-2xl border border-brand-black/10 bg-white p-4 text-left transition-all duration-200 hover:border-brand-red hover:shadow-sm"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-brand-black md:text-base">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {resultBand && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-red">Pipeline check</p>
                    <h3 className="text-2xl font-black text-brand-black">{resultCopy[resultBand].label}</h3>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-lg leading-relaxed text-brand-gray">{resultCopy[resultBand].message}</p>
                  <p className="mt-4 text-sm font-semibold text-brand-black">Score: {totalScore} / 21</p>
                </div>

                <div className="rounded-3xl bg-gradient-to-br from-brand-black via-gray-950 to-brand-red p-6 text-white shadow-lg md:p-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-100">Next action</p>
                  <h3 className="mt-3 text-2xl font-black md:text-3xl">Book the Pipeline Recovery Review</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-red-50 md:text-base">
                    You’ve already found where the pipeline is losing momentum. The smartest next step is to book a 30-minute review and turn that score into a practical recovery plan.
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => handleBookingCta('score_result')}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-red px-7 py-3.5 text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] hover:bg-brand-darkred"
                    >
                      {resultCopy[resultBand].cta}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleStart}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
                    >
                      Restart scorecard
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-brand-light-gray px-6 py-12 md:py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-black text-brand-black md:text-4xl">What the review includes</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-brand-black">1. Revenue leak mapping</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                We’ll identify where enquiries, quotes, approvals, and follow-ups are being lost.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-brand-black">2. 30-day recovery plan</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                You’ll get a practical plan for tightening the flow and rebuilding visibility.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-lg font-bold text-brand-black">3. AI/automation fit check</p>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">
                We’ll help decide where automation or AI genuinely makes sense, instead of adding more noise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CalendlyPopup isOpen={isCalendlyOpen} onClose={() => setIsCalendlyOpen(false)} />
    </>
  );
}
