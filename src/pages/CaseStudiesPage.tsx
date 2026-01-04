import { useState } from 'react';
import { AngleDivider } from '../components/ui/AngleDivider';
import { SEO } from '../components/SEO';
import { StructuredData, breadcrumbSchema } from '../components/StructuredData';

interface CaseStudy {
  id: string;
  companyType: string;
  location: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: string;
  clientName: string;
  clientRole: string;
}

const caseStudiesData: CaseStudy[] = [
  {
    id: '1',
    companyType: 'Custom Home Builder',
    location: 'Brisbane, QLD',
    problem:
      'Doing more than 15 hours of paperwork every week, losing quotes in emails, couldn\'t keep track of job timelines, and always playing phone tag with subbies.',
    solution:
      'Set up a system that creates quotes automatically, put everything in one place so they could see all their jobs at once, and made client updates happen on their own. Connected it all to their accounting software.',
    results: [
      'Paperwork dropped from 15 hours to 4.5 hours a week',
      'Went from winning 2 out of 10 quotes to winning 4 out of 10',
      'Got 28 solid leads in the first month',
      'Customers way happier - 35% improvement in satisfaction',
    ],
    testimonial:
      'Best money we\'ve ever spent. Less time doing paperwork, more time actually building. Our clients love how organized we are now.',
    clientName: 'Mark Thompson',
    clientRole: 'Owner',
  },
  {
    id: '2',
    companyType: 'Commercial Electrical',
    location: 'Sydney, NSW',
    problem:
      'Leads all over the place - feast or famine. Spending thousands on Google ads with nothing to show for it. No clue what marketing was working. Sales team drowning in time-wasters.',
    solution:
      'Built a system that finds leads from different places, works out who\'s serious, asks them qualifying questions automatically, and tracks everything properly. Moved their ad money to what was actually working.',
    results: [
      '156 good leads over 6 months',
      'Now closing 4 out of 10 instead of 1-2 out of 10',
      'Paying 62% less for each lead',
      'Can actually plan ahead - $2.4M worth of work in the pipeline',
    ],
    testimonial:
      'Finally we can actually plan our growth. No more feast or famine. The leads are quality - these people are ready to go.',
    clientName: 'Sarah Chen',
    clientRole: 'Director of Business Development',
  },
  {
    id: '3',
    companyType: 'Renovation Specialist',
    location: 'Melbourne, VIC',
    problem:
      'Invoicing taking days to sort out, clients never knew what was included or how much things cost, change orders causing arguments, couldn\'t juggle multiple jobs at once.',
    solution:
      'Made quotes, invoices, and payments happen automatically. Gave clients a dashboard where they can see everything happening in real-time. Change orders update prices instantly. Payments come in automatically.',
    results: [
      'Invoicing went from 3 days down to 30 minutes',
      'Getting paid 45% faster',
      '80% fewer arguments with clients',
      'Can handle 3 times as many jobs at once',
    ],
    testimonial:
      'Total game changer. Clients see everything as it happens, no surprises. We get paid faster and can do way more work without hiring more office staff.',
    clientName: 'David Martinez',
    clientRole: 'Founder & Lead Renovator',
  },
];

export function CaseStudiesPage() {
  const [selectedId, setSelectedId] = useState(caseStudiesData[0].id);
  const selectedCase = caseStudiesData.find((c) => c.id === selectedId)!;

  const caseStudiesBreadcrumb = breadcrumbSchema([
    { name: 'Home', url: 'https://plandepa.com/' },
    { name: 'Case Studies', url: 'https://plandepa.com/case-studies' },
  ]);

  return (
    <>
      <SEO
        title="Case Studies - Construction Automation Success Stories | Brisbane Sydney"
        description="Real results from Brisbane & Sydney construction companies using Plandepa's AI automation. See how builders reduced paperwork 60%, increased leads 85%, and improved efficiency."
        keywords="construction case studies Australia, construction automation results Brisbane, construction efficiency improvement Sydney, builder automation success stories, Buildxact case studies, construction ROI examples"
      />
      <StructuredData data={[caseStudiesBreadcrumb]} />
      <section className="bg-brand-off-white py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-display-md font-bold text-brand-black mb-4">
            Case Studies
          </h1>
          <p className="text-body-xl text-brand-gray max-w-3xl">
            Real results from construction companies just like yours
          </p>
        </div>
      </section>

      <AngleDivider direction="down-right" fromColor="#FAFAFA" toColor="#FFFFFF" height={100} />

      <section className="bg-white py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-3">
                {caseStudiesData.map((caseStudy) => (
                  <button
                    key={caseStudy.id}
                    onClick={() => setSelectedId(caseStudy.id)}
                    className={`w-full text-left px-6 py-4 rounded-full transition-all duration-300 apple-ease ${
                      selectedId === caseStudy.id
                        ? 'bg-brand-black text-white scale-105'
                        : 'bg-brand-light-gray text-brand-gray hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    <span className="font-semibold">{caseStudy.companyType}</span>
                  </button>
                ))}
              </div>
            </aside>

            <div className="flex-1">
              <div className="aspect-video bg-brand-light-gray rounded-2xl mb-12 flex items-center justify-center">
                <span className="text-heading-md text-brand-gray">
                  {selectedCase.companyType}
                </span>
              </div>

              <div className="mb-8">
                <h2 className="text-heading-xl font-bold text-brand-black mb-2">
                  {selectedCase.companyType}
                </h2>
                <p className="text-body-lg text-brand-gray">{selectedCase.location}</p>
              </div>

              <div className="space-y-16">
                <div>
                  <h3 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                    Challenge
                  </h3>
                  <p className="mt-6 text-body-lg text-brand-gray leading-relaxed">
                    {selectedCase.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                    Solution
                  </h3>
                  <p className="mt-6 text-body-lg text-brand-gray leading-relaxed">
                    {selectedCase.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-heading-lg font-bold text-brand-black mb-2 border-b-4 border-brand-black inline-block pb-2">
                    Impact
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {selectedCase.results.map((result, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-body-lg text-brand-gray leading-relaxed"
                      >
                        <span className="text-brand-black text-2xl">•</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-light-gray rounded-2xl p-12">
                  <p className="text-heading-sm text-brand-black italic mb-6 leading-relaxed">
                    "{selectedCase.testimonial}"
                  </p>
                  <p className="text-body-lg text-brand-gray">
                    <span className="font-semibold text-brand-black">
                      {selectedCase.clientName}
                    </span>
                    , {selectedCase.clientRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AngleDivider direction="up-right" fromColor="#FFFFFF" toColor="#F5F5F5" height={100} />

      <section className="bg-brand-light-gray py-12 md:py-16 px-6" style={{ position: 'relative', zIndex: 10 }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-display-sm font-bold text-brand-black mb-8">
            Ready for similar results?
          </h2>
          <p className="text-body-xl text-brand-gray mb-12 max-w-2xl mx-auto">
            Start with a free check-up to see what we can do for your business.
          </p>
          <a
            href="/free-audit"
            className="inline-flex items-center gap-3 px-12 py-5 bg-brand-black text-white font-semibold text-body-lg rounded-full hover:bg-gray-800 transition-all duration-300 apple-ease shadow-xl hover:scale-105 active:scale-95"
          >
            Book your free audit
          </a>
        </div>
      </section>
    </>
  );
}
