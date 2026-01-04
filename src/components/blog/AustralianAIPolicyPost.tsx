import { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { CheckCircle2, X, Clock } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Citation, References } from '../ui/Citation';
import { NewsletterSignup } from '../ui/NewsletterSignup';
import { UrgencyBadge, ViewCounter } from '../ui/UrgencyBadge';
import { SectionIllustration } from '../ui/SectionIllustration';
import { SimpleFAQ } from '../SimpleFAQ';

ChartJS.register(ArcElement, ChartTooltip, Legend);

interface TimelineEvent {
  date: string;
  title: string;
  desc: string;
  color: string;
}

interface ImpactData {
  title: string;
  emoji: string;
  description: string;
}

const timelineData: TimelineEvent[] = [
  {
    date: "Sep 2024",
    title: "The Strict Era",
    desc: "Consultation begins on 'Mandatory Guardrails'. The expectation is a strict, EU-style AI Act. Business braces for heavy compliance.",
    color: "bg-blue-100 text-blue-800"
  },
  {
    date: "Nov 25, 2025",
    title: "Institute Announced",
    desc: "The Australian AI Safety Institute (AISI) is officially announced with a $30M budget. It is technical, not regulatory.",
    color: "bg-blue-100 text-blue-800"
  },
  {
    date: "Dec 02, 2025",
    title: "The Pivot",
    desc: "The National AI Plan is released. Mandatory Guardrails are officially 'paused'. The focus shifts to economic opportunity and existing laws.",
    color: "bg-green-100 text-green-800"
  },
  {
    date: "Early 2026",
    title: "Operations Begin",
    desc: "AISI begins testing models. Companies must navigate the 'AI6' voluntary standards to avoid negligence claims.",
    color: "bg-slate-100 text-slate-800"
  }
];

const ai6Items = [
  "Governance: Named human responsible",
  "Transparency: AI clearly labeled",
  "Human Oversight: Human in the loop",
  "Testing: Bias testing conducted",
  "Accountability: Data audit trails",
  "Security: Cyber-resilience check"
];

const winnersData: ImpactData[] = [
  {
    title: "Big Tech",
    emoji: "🏢",
    description: "Microsoft & Google get regulatory certainty without strict, Australia-specific compliance costs. They can scale faster."
  },
  {
    title: "Startups",
    emoji: "🚀",
    description: "Founders avoid hiring expensive Chief Compliance Officers just to launch beta products. Innovation barrier is lower."
  }
];

const losersData: ImpactData[] = [
  {
    title: "Safety Advocates",
    emoji: "🛡️",
    description: "Those worried about existential risk or societal harm feel abandoned by the 'light touch' approach."
  },
  {
    title: "Unions",
    emoji: "👷",
    description: "Workers have fewer specific legal protections against AI surveillance or automated firing algorithms."
  }
];

const references = [
  {
    number: 1,
    source: 'Department of Industry, Science and Resources',
    title: 'Australian AI Safety Institute Announcement',
    date: 'November 25, 2025',
    url: 'https://www.industry.gov.au',
  },
  {
    number: 2,
    source: 'Australian Government',
    title: 'National AI Plan 2025',
    date: 'December 2, 2025',
    url: 'https://www.industry.gov.au/publications',
  },
  {
    number: 3,
    source: 'National AI Centre',
    title: 'AI6 Voluntary Standards Framework',
    date: 'December 2025',
    url: 'https://www.naic.gov.au',
  },
  {
    number: 4,
    source: 'Australian Competition & Consumer Commission',
    title: 'AI and Consumer Law Guidance',
    date: 'October 2025',
  },
  {
    number: 5,
    source: 'Tech Council of Australia',
    title: 'Industry Response to AI Policy Shift',
    date: 'December 2025',
  },
];

const faqItems = [
  {
    question: 'Does the pause on mandatory guardrails mean I can deploy AI without any restrictions?',
    answer: 'No. While specific AI-focused regulations are paused, existing laws still apply including Consumer Law, Privacy Act, Discrimination laws, and Workplace regulations. If your AI causes harm, you can still face legal consequences under these frameworks. The AI6 voluntary standards serve as your best defense against negligence claims.',
  },
  {
    question: 'Should my business voluntarily follow the AI6 standards if they\'re not mandatory?',
    answer: 'Strongly recommended. Courts will likely use the AI6 framework as the "reasonable standard of care" benchmark in negligence cases. If you\'re sued and haven\'t followed these voluntary guidelines, it becomes much harder to defend your actions as "reasonable" under existing law. Think of them as best practices that protect you legally.',
  },
  {
    question: 'What happens if the Australian AI Safety Institute finds problems with my AI system?',
    answer: 'The AISI cannot directly fine you or ban your product. However, they can publish their findings, which could damage your reputation and trigger investigations from other regulators (like ACCC for consumer issues or the Privacy Commissioner for data concerns). Their reports carry significant weight in legal proceedings.',
  },
  {
    question: 'Will mandatory AI laws come back in the future?',
    answer: 'Possibly. The current approach is described as a "pause" rather than a permanent policy. If there\'s a high-profile AI incident (major deepfake scandal, algorithmic discrimination lawsuit, or security breach), public pressure could force the government to revive mandatory guardrails legislation. Early adopters of the AI6 standards will be better positioned if regulations return.',
  },
  {
    question: 'How does Australia\'s approach compare to the EU AI Act?',
    answer: 'Australia has deliberately chosen a lighter-touch approach. The EU AI Act includes mandatory requirements, prohibited AI uses, and significant fines (up to €35M or 7% of global revenue). Australia is betting on existing laws plus voluntary standards rather than creating new AI-specific legislation. This reduces compliance burden but increases legal uncertainty.',
  },
  {
    question: 'What does this mean for AI startups in Australia?',
    answer: 'It\'s generally positive for innovation. You won\'t need expensive Chief Compliance Officers or extensive legal reviews just to launch. However, you still need to follow existing laws, and investors will increasingly expect you to demonstrate AI6 compliance. The lighter regulatory burden makes Australia more competitive with the US and UK for AI development.',
  },
  {
    question: 'Can employees sue if AI is used to monitor or fire them?',
    answer: 'Yes, under existing workplace and discrimination laws. While there are no AI-specific protections, automated systems that unfairly disadvantage certain groups or violate workplace rights can still result in legal action under the Fair Work Act and Anti-Discrimination legislation. The lack of new laws doesn\'t mean zero accountability.',
  },
  {
    question: 'What should construction companies specifically know about this policy shift?',
    answer: 'Construction firms deploying AI (for project management, safety monitoring, or automated decision-making) should focus on the "Human Oversight" and "Accountability" elements of AI6. If an AI system makes decisions affecting worker safety or employment, ensure there\'s documented human review. Keep audit trails. This protects you from both workplace and consumer law liability.',
  },
];

export default function AustralianAIPolicyPost() {
  const [activeTimeline, setActiveTimeline] = useState(2);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(6).fill(false));
  const [activeTab, setActiveTab] = useState<'winners' | 'losers'>('winners');
  const [riskLevel, setRiskLevel] = useState(10);

  const handleCheckboxChange = (index: number) => {
    const newChecked = [...checkedItems];
    newChecked[index] = !newChecked[index];
    setCheckedItems(newChecked);
  };

  const checkedCount = checkedItems.filter(Boolean).length;
  const compliancePercent = Math.round((checkedCount / 6) * 100);

  const complianceChartData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [checkedCount, 6 - checkedCount],
      backgroundColor: ['#10B981', '#E5E7EB'],
      borderWidth: 0,
    }]
  };

  const complianceChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  const getRiskColor = () => {
    if (riskLevel > 80) return '#EF4444';
    if (riskLevel > 40) return '#F59E0B';
    return '#10B981';
  };

  const getRiskDescription = () => {
    if (riskLevel > 80) return "High probability. Mandatory Guardrails likely un-paused immediately.";
    if (riskLevel > 40) return "Medium probability. Public pressure mounts.";
    return "Low probability. The 'Pivot' holds firm.";
  };

  const riskChartData = {
    labels: ['Risk', 'Safe'],
    datasets: [{
      data: [riskLevel, 100 - riskLevel],
      backgroundColor: [getRiskColor(), '#374151'],
      borderWidth: 0,
    }]
  };

  const riskChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,
    cutout: '60%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };

  return (
    <div className="space-y-16">
      <section>
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-blue-800 uppercase bg-blue-100 rounded-full">
            Report: December 2025
          </span>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Why the "AI Act" is dead (for now) and why Australia chose "Fortune" over "Fortress."
          </p>
          <div className="flex justify-center">
            <ViewCounter count={34} timeframe="this month" />
          </div>
        </div>
      </section>

      <section id="section-timeline" className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SectionIllustration type="market" className="w-16 h-16" />
            <h2 className="text-3xl font-bold text-slate-900">How It Happened</h2>
          </div>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">
            A visual journey through the rapid policy shift from strict <Tooltip term="Mandatory Guardrails" definition="Proposed strict AI regulations similar to the EU AI Act, which would have required compliance checks, risk assessments, and mandatory safety standards for AI systems deployed in Australia." /> to the <Tooltip term="National AI Plan" definition="Australia's current AI strategy focused on economic opportunity, voluntary standards, and leveraging existing laws rather than creating new AI-specific mandatory regulations." />. Click the dates below to uncover the story.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="flex justify-between items-center bg-slate-50 p-6 border-b border-slate-200 overflow-x-auto">
            {timelineData.map((event, index) => (
              <div key={index} className="flex items-center">
                <button
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 hover:scale-110 ${
                    activeTimeline === index
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white border-slate-300 text-slate-500'
                  }`}
                  onClick={() => setActiveTimeline(index)}
                >
                  {event.date.split(' ')[0]}
                </button>
                {index < timelineData.length - 1 && (
                  <div className="h-1 bg-slate-300 w-16 mx-2"></div>
                )}
              </div>
            ))}
          </div>

          <motion.div
            key={activeTimeline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8 md:p-12 min-h-[300px] flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="flex-1">
              <span className={`px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block ${timelineData[activeTimeline].color}`}>
                {timelineData[activeTimeline].date}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{timelineData[activeTimeline].title}</h3>
              <p className="text-lg text-slate-600 leading-relaxed">{timelineData[activeTimeline].desc}</p>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/3 flex justify-center items-center bg-slate-50 rounded-lg p-8">
              <div className="text-6xl font-bold text-slate-200">0{activeTimeline + 1}</div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-aisi" className="bg-blue-50 py-16 -mx-6 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <SectionIllustration type="implementation" className="w-12 h-12" />
                <h2 className="text-3xl font-bold text-slate-900">Meet the New Sheriff</h2>
              </div>
              <p className="text-lg text-slate-600 mb-6">
                The <Tooltip term="Australian AI Safety Institute (AISI)" definition="Government body established with $30M budget to test AI models, assess risks, and collaborate internationally. Cannot issue fines or ban products, but can publish findings and set voluntary standards." /> is the central character in the new National AI Plan<Citation number={1} />. It is not a policeman; it is a "Safety Inspector" for the digital age.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <p className="text-xs font-bold text-blue-500 uppercase">Budget</p>
                  <p className="text-2xl font-bold text-slate-900">$30 Million<Citation number={1} /></p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                  <p className="text-xs font-bold text-blue-500 uppercase">HQ Location</p>
                  <p className="text-xl font-bold text-slate-900"><Tooltip term="DISR" definition="Department of Industry, Science and Resources - the Australian government department responsible for industry policy, innovation, science, and research." /></p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Powers & Limitations</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <div className="ml-4">
                    <h4 className="text-md font-bold text-slate-900">Test & Evaluate</h4>
                    <p className="text-sm text-slate-600">Assess advanced AI models for risks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-sm">✓</div>
                  <div className="ml-4">
                    <h4 className="text-md font-bold text-slate-900">Global Collaboration</h4>
                    <p className="text-sm text-slate-600">Work with US/UK Institutes.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                    <X className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-bold text-slate-900">Issue Fines</h4>
                    <p className="text-sm text-slate-600">Cannot penalize companies financially.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                    <X className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-md font-bold text-slate-900">Ban Products</h4>
                    <p className="text-sm text-slate-600">Cannot stop a product launch directly.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="my-16">
        <NewsletterSignup source="australian-ai-policy-blog" />
      </section>

      <section id="section-ai6" className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SectionIllustration type="solution" className="w-16 h-16" />
            <h2 className="text-3xl font-bold text-slate-900">The "AI6" Survival Guide</h2>
          </div>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto mb-6">
            Mandatory laws are paused, but <Tooltip term="Negligence" definition="Legal failure to exercise appropriate care. Courts may use AI6 voluntary standards to determine if a company acted reasonably when deploying AI systems, even without specific AI laws." /> is still punishable. Use this interactive checklist to see if your business meets the new voluntary <Tooltip term="AI6 Standards" definition="Six voluntary AI safety principles from the National AI Centre: Governance, Transparency, Human Oversight, Testing, Accountability, and Security. Not legally required but expected by courts as reasonable care." /> from the National AI Centre<Citation number={3} />.
          </p>
          <div className="flex justify-center mb-8">
            <UrgencyBadge type="early-pricing" daysRemaining={45} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Select Completed Actions:</h3>
            <div className="space-y-3">
              {ai6Items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                  onClick={() => handleCheckboxChange(index)}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems[index]}
                    onChange={() => handleCheckboxChange(index)}
                    className="w-5 h-5 text-red-600 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <label className="ml-3 text-slate-700 font-medium cursor-pointer select-none">{item}</label>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Pro Tip:</strong> Even though this is voluntary, if you get sued under <Tooltip term="Consumer Law" definition="Australian Consumer Law provides protection against misleading conduct, unsafe products, and unfair practices. If your AI causes consumer harm, courts may assess whether you followed reasonable care standards like AI6." />, courts will check if you followed these steps<Citation number={4} />.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Compliance Readiness</h3>
            <div className="w-full max-w-md h-64 relative">
              <Doughnut data={complianceChartData} options={complianceChartOptions} />
            </div>
            <p className={`text-center mt-4 font-bold text-xl ${compliancePercent === 100 ? 'text-green-600' : 'text-slate-700'}`}>
              {compliancePercent === 100 ? '100% - Audit Ready!' : `${compliancePercent}% Ready`}
            </p>
            <p className="text-sm text-slate-500 text-center mt-1">Check items on the left to update.</p>
          </div>
        </div>
      </section>

      <section id="section-winners" className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-8">
          <SectionIllustration type="finance" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900 text-center">Who Won the Pivot?</h2>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="flex border-b border-slate-200">
            <button
              className={`flex-1 py-4 text-center text-lg font-medium transition ${
                activeTab === 'winners'
                  ? 'bg-slate-50 border-b-2 border-red-600 text-red-600'
                  : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('winners')}
            >
              ✅ The Winners
            </button>
            <button
              className={`flex-1 py-4 text-center text-lg font-medium transition ${
                activeTab === 'losers'
                  ? 'bg-slate-50 border-b-2 border-red-600 text-red-600'
                  : 'bg-white text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setActiveTab('losers')}
            >
              🔻 The Losers
            </button>
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12 min-h-[250px] flex items-center justify-center bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {(activeTab === 'winners' ? winnersData : losersData).map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border ${
                    activeTab === 'winners'
                      ? 'bg-green-50 border-green-100'
                      : 'bg-red-50 border-red-100'
                  }`}
                >
                  <div className="text-3xl mb-2">{item.emoji}</div>
                  <h4 className={`text-xl font-bold mb-2 ${
                    activeTab === 'winners' ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {item.title}
                  </h4>
                  <p className={activeTab === 'winners' ? 'text-green-800' : 'text-red-800'}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="section-future" className="bg-slate-900 text-white py-16 -mx-6 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <SectionIllustration type="recommendation" className="w-12 h-12" />
                <h2 className="text-3xl font-bold text-white">The Crystal Ball: 2026+</h2>
              </div>
              <p className="text-slate-400 mb-8 text-lg">
                Is the "Guardrails" legislation dead forever? Not necessarily<Citation number={2} />. The current pause is a gamble. Simulate a future scenario to see the risk of strict laws returning.
              </p>
              <h3 className="text-lg font-bold text-blue-400 mb-4">Select a Scenario:</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setRiskLevel(10)}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition flex justify-between items-center group"
                >
                  <span>Status Quo (No major incidents)</span>
                  <span className="text-green-500 opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                </button>
                <button
                  onClick={() => setRiskLevel(50)}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition flex justify-between items-center group"
                >
                  <span>Minor algorithmic bias scandal</span>
                  <span className="text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                </button>
                <button
                  onClick={() => setRiskLevel(90)}
                  className="w-full text-left px-4 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition flex justify-between items-center group"
                >
                  <span>Deepfake election interference</span>
                  <span className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Select →</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <h3 className="text-xl font-bold text-white mb-2">Probability of Mandatory Laws Returning</h3>
              <div className="w-full max-w-md h-64 relative">
                <Doughnut data={riskChartData} options={riskChartOptions} />
              </div>
              <p
                className="text-center mt-2 max-w-sm"
                style={{ color: riskLevel > 80 ? '#FCA5A5' : '#D1D5DB' }}
              >
                {getRiskDescription()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-faq" className="my-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Common Policy Questions</h2>
        <SimpleFAQ items={faqItems} />
      </section>

      <section className="my-16">
        <References references={references} />
      </section>
    </div>
  );
}
