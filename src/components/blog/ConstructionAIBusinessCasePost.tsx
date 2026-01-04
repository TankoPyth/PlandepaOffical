import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { TrendingDown, Users, Package, Clock, DollarSign, CheckCircle2 } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { Citation, References } from '../ui/Citation';
import { NewsletterSignup } from '../ui/NewsletterSignup';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { UrgencyBadge, ViewCounter } from '../ui/UrgencyBadge';
import { SectionIllustration } from '../ui/SectionIllustration';
import { SimpleFAQ } from '../SimpleFAQ';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

interface AgentData {
  title: string;
  role: string;
  problem: string;
  solution: string;
  stat: string;
  icon: React.ReactNode;
}

const agents: AgentData[] = [
  {
    title: "The Admin Killer",
    role: "RFI & Submittal Agent",
    problem: "Engineers spending 40% of time on email administration.",
    solution: "Automated reading of spec books and drafting of responses.",
    stat: "90% Reduction in Admin Time",
    icon: <Clock className="w-6 h-6" />
  },
  {
    title: "The Risk Mitigator",
    role: "Pre-Con Estimator",
    problem: "Inaccurate bids due to fatigue and missed scope items.",
    solution: "Generative AI for quantity takeoffs and historical benchmarking.",
    stat: "Elimination of unprofitable bids",
    icon: <TrendingDown className="w-6 h-6" />
  },
  {
    title: "The Scheduler",
    role: "Supply Chain Watchdog",
    problem: "Schedule delays caused by unforeseen material shortages.",
    solution: "Global price monitoring and autonomous supplier tracking.",
    stat: "Predictive Delay Analysis",
    icon: <Package className="w-6 h-6" />
  }
];

const references = [
  {
    number: 1,
    source: 'Construction Industry Institute',
    title: 'RFI Response Time Analysis 2025',
    date: 'January 2025',
    url: 'https://construction.org',
  },
  {
    number: 2,
    source: 'Australian Construction Association',
    title: 'Administrative Cost Benchmarking Report',
    date: 'December 2024',
    url: 'https://constructionaustralia.com',
  },
  {
    number: 3,
    source: 'Gartner Research',
    title: 'AI Adoption in Construction Sector 2025',
    date: 'November 2024',
  },
  {
    number: 4,
    source: 'McKinsey & Company',
    title: 'Construction Efficiency & AI Integration Study',
    date: 'October 2024',
  },
  {
    number: 5,
    source: 'Australian AI Safety Institute',
    title: 'Industry AI Implementation Guidelines',
    date: 'September 2024',
    url: 'https://aisi.gov.au',
  },
];

const faqItems = [
  {
    question: 'How secure is our project data with AI implementation?',
    answer: 'All data is stored on your own servers or in a private Vector Database. Unlike public AI tools like ChatGPT, your information never leaves your controlled environment. We follow Australian AI Safety Institute guidelines and implement enterprise-grade encryption. Your intellectual property and confidential project details remain completely private.',
  },
  {
    question: 'Will AI replace our staff?',
    answer: 'No. AI Agents handle repetitive administrative tasks, freeing your team to focus on high-value work like client relationships, strategic planning, and complex problem-solving. Our clients typically see team members transition from administrative burdens to more fulfilling, revenue-generating activities. This technology augments your workforce, making them more productive and satisfied.',
  },
  {
    question: 'How long does implementation take?',
    answer: 'Initial deployment typically takes 4-8 weeks depending on your data infrastructure. The first Agent (usually RFI processing) can be operational within 2-3 weeks. We use a phased approach, starting with high-impact, low-risk workflows to demonstrate value quickly before expanding to other areas.',
  },
  {
    question: 'What if we already use project management software?',
    answer: 'Our AI Agents integrate with existing systems like Procore, Buildertrend, and Microsoft Project. We don\'t replace your current tools — we enhance them by automating data entry, extraction, and analysis. The AI works alongside your established workflows, not against them.',
  },
  {
    question: 'Is this only for large construction companies?',
    answer: 'No. While large firms see significant absolute savings, mid-sized operations (10-100 employees) often see the highest ROI percentage because they face the same administrative burden without dedicated back-office teams. If you\'re managing 5+ projects annually and spending 10+ hours weekly on quoting or RFI administration, you\'ll benefit.',
  },
  {
    question: 'What\'s the total cost of ownership?',
    answer: 'Implementation costs vary based on scope, but ongoing annual costs typically range from $12,000-$36,000 depending on the number of Agents deployed. Most clients achieve full ROI within 6-12 months. We offer transparent pricing with no hidden fees for support or updates.',
  },
  {
    question: 'How accurate is the AI? What about errors?',
    answer: 'Our Agents achieve 95%+ accuracy on structured tasks like document extraction and data analysis. For critical decisions (like final bid submissions), the system provides recommendations that humans review and approve. We implement multiple validation layers and continuous learning to improve accuracy over time. You maintain full control.',
  },
  {
    question: 'What happens to our ROI as AI becomes more common?',
    answer: 'Early adopters gain 12-18 months of competitive advantage. As AI becomes standard, it transitions from a differentiator to a requirement — like digital takeoffs or BIM. Companies without it will struggle to compete on speed and margins. The question isn\'t whether to adopt, but when. Starting now means you\'ll be teaching competitors in 2027 instead of catching up.',
  },
];

export default function ConstructionAIBusinessCasePost() {
  const [revenue, setRevenue] = useState(50);
  const [activeAgent, setActiveAgent] = useState(0);

  const currentCosts = (revenue * 0.90);
  const savings = (currentCosts * 0.12);
  const newCosts = currentCosts - savings;

  const chartData = {
    labels: ['Current Costs', 'Costs with AI'],
    datasets: [
      {
        label: 'Project Costs ($ Millions)',
        data: [currentCosts, newCosts],
        backgroundColor: ['#9CA3AF', '#DC2626'],
        borderRadius: 8,
        barThickness: 60,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return '$' + context.parsed.y.toFixed(1) + 'M';
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value + 'M';
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="space-y-16">
      <section>
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-red-800 uppercase bg-red-100 rounded-full">
            Strategic Research Report: December 2025
          </span>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
            Cost Reduction & Margin Recovery Analysis for Construction Industry
          </p>
          <div className="flex justify-center">
            <ViewCounter count={2} timeframe="this week" />
          </div>
        </div>
      </section>

      <section id="section-1">
        <div className="flex items-center gap-4 mb-6">
          <SectionIllustration type="summary" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900">1. Executive Summary</h2>
        </div>

        <div className="mb-6">
          <UrgencyBadge type="competitor-adoption" percentageAdopted={61} />
        </div>

        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          The construction industry currently operates on razor-thin margins (typically 2-5% net profit). This report analyzes the financial impact of integrating <Tooltip term="AI Agents" definition="Autonomous software systems that can perform complex tasks independently, unlike simple chatbots. They can read documents, make decisions, and take actions based on your company's data and rules." /> into core workflows.
        </p>
        <p className="text-lg text-slate-600 leading-relaxed">
          Unlike traditional software, AI Agents function as autonomous workers, capable of reducing administrative overhead, identifying pre-construction risks, and optimizing supply chain logistics. Our analysis suggests that for a mid-sized firm, AI adoption can recover approximately <strong className="text-red-600">10-15% of project costs</strong> previously lost to inefficiency<Citation number={4} />.
        </p>
      </section>

      <section id="section-2">
        <div className="flex items-center gap-4 mb-6">
          <SectionIllustration type="finance" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900">2. Financial Analysis: The Cost of Inefficiency</h2>
        </div>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          Current operational models suffer from significant "data leakage." Administrative delays, particularly regarding <Tooltip term="RFI" definition="Request for Information - formal queries from contractors to architects/engineers seeking clarification on project specifications, drawings, or requirements. Each RFI delays work and incurs administrative costs." />, and unmitigated safety risks erode potential profit margins.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">2.1 Operational Friction Points (2025 Data)</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-700 font-medium">Avg. Time to Resolve RFI</span>
                  <span className="text-xl font-bold text-red-600">9.7 Days<Citation number={1} /></span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-700 font-medium">Admin Cost per RFI</span>
                  <span className="text-xl font-bold text-red-600">$3,000<Citation number={2} /></span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-700 font-medium">Safety Incident Cost Impact</span>
                  <span className="text-xl font-bold text-red-600">High Variance</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">2.2 Interactive Savings Projection</h3>
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-md">
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Annual Revenue Scenario
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>$10M</span>
                    <span className="font-bold text-red-600 text-base">${revenue}M</span>
                    <span>$200M</span>
                  </div>
                </div>

                <div className="h-64 mb-4">
                  <Bar data={chartData} options={chartOptions} />
                </div>

                <div className="text-center border-t border-slate-200 pt-4">
                  <span className="text-sm text-slate-600 block mb-1">Projected Margin Recovery</span>
                  <div className="text-3xl font-bold text-green-600">
                    ${savings.toFixed(1)}M
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-500 mt-6 italic">
            Figure 1: Projected impact of AI adoption on annual operating costs based on a 12% efficiency gain.
          </p>
        </div>
      </section>

      <section className="my-16">
        <NewsletterSignup source="ai-business-case-blog" />
      </section>

      <section id="section-3">
        <div className="flex items-center gap-4 mb-6">
          <SectionIllustration type="solution" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900">3. Solution Overview: The AI Workforce</h2>
        </div>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          To address the inefficiencies outlined in Section 2, we propose the deployment of specialized AI Agents. These are not general-purpose chatbots but role-specific digital workers.
        </p>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center">Manual vs AI-Powered Workflow</h3>
          <BeforeAfterSlider />
          <p className="text-sm text-slate-500 mt-4 italic text-center">
            Interactive comparison: Drag the slider to see the difference between traditional and AI-powered processes
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 bg-slate-50 border-b border-slate-200">
            {agents.map((agent, index) => (
              <button
                key={index}
                onClick={() => setActiveAgent(index)}
                className={`p-6 text-center transition-all duration-300 border-b-4 ${
                  activeAgent === index
                    ? 'bg-white border-red-600 text-red-600'
                    : 'bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-center mb-2">{agent.icon}</div>
                <div className="font-bold text-base">{agent.title.replace('The ', '')}</div>
                <div className="text-xs text-slate-500 mt-1">{agent.role}</div>
              </button>
            ))}
          </div>

          <motion.div
            key={activeAgent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 md:p-12"
          >
            <div className="flex justify-between items-start mb-6 flex-wrap gap-4">
              <div>
                <div className="text-xs font-bold uppercase text-red-600 mb-1">
                  {agents[activeAgent].role}
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {agents[activeAgent].title}
                </h3>
              </div>
              <div className="bg-red-50 text-red-800 text-sm font-bold px-4 py-2 rounded-lg border border-red-200">
                Impact: {agents[activeAgent].stat}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    !
                  </div>
                  <span className="font-bold text-red-900">Current Issue</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {agents[activeAgent].problem}
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600 mr-3" />
                  <span className="font-bold text-green-900">AI Solution</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {agents[activeAgent].solution}
                </p>
              </div>
            </div>
          </motion.div>

          <p className="text-sm text-slate-500 px-8 pb-6 italic">
            Figure 2: Functional roles and expected ROI of proposed AI Agents.
          </p>
        </div>
      </section>

      <section id="section-4">
        <div className="flex items-center gap-4 mb-6">
          <SectionIllustration type="implementation" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900">4. Implementation Strategy</h2>
        </div>
        <p className="text-lg text-slate-600 mb-4 leading-relaxed">
          Successful AI implementation requires a structured data strategy. Most construction data resides in unstructured formats ("<Tooltip term="Data Swamp" definition="A storage repository holding vast amounts of raw, unorganized data in various formats. Unlike a data lake (which is organized), a data swamp makes information difficult to retrieve and analyze effectively." />"). Direct usage of <Tooltip term="LLM" definition="Large Language Model - AI systems like GPT-4 or Claude that can understand and generate human-like text. They power AI Agents by processing documents, answering questions, and making recommendations." /> on raw data poses significant hallucination risks.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">4.1 The Agency Approach</h3>
        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
          We recommend a managed implementation service rather than an off-the-shelf software purchase. This ensures compliance with the <Tooltip term="Australian AI Safety Institute" definition="Government body responsible for establishing AI safety standards, ethical guidelines, and compliance frameworks for AI deployment in Australian industries." /> standards<Citation number={5} />.
        </p>

        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-slate-200">
          <table className="min-w-full">
            <thead className="bg-slate-50 border-b-2 border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Feature
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Standard "ChatGPT" Usage
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-red-700 uppercase tracking-wider bg-red-50">
                  Agency Implementation
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-900">Data Source</td>
                <td className="px-6 py-4 text-slate-600">Public Internet</td>
                <td className="px-6 py-4 font-bold text-red-900 bg-red-50">
                  Your Server / <Tooltip term="Vector DB" definition="Vector Database - specialized storage system that organizes your documents and data so AI can quickly find relevant information. Think of it as a super-efficient filing system optimized for AI search and retrieval." />
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-900">File Compatibility</td>
                <td className="px-6 py-4 text-slate-600">Text Only</td>
                <td className="px-6 py-4 font-bold text-red-900 bg-red-50">
                  PDFs, CAD, Excel, Emails
                </td>
              </tr>
              <tr className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 font-bold text-slate-900">Compliance</td>
                <td className="px-6 py-4 text-slate-600">None</td>
                <td className="px-6 py-4 font-bold text-red-900 bg-red-50">
                  Safety Institute Aligned
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="section-5" className="bg-slate-50 -mx-6 px-6 py-12 rounded-2xl">
        <div className="flex items-center gap-4 mb-8">
          <SectionIllustration type="market" className="w-16 h-16" />
          <h2 className="text-3xl font-bold text-slate-900">5. Market Context (2026 Outlook)</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md text-center">
            <div className="text-5xl font-bold text-red-600 mb-3">61%<Citation number={3} /></div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Competitors adopting AI for cost reduction
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md text-center">
            <div className="text-5xl font-bold text-red-600 mb-3">15%<Citation number={3} /></div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Avg. Cost Reduction for early adopters
            </div>
          </div>
          <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-md text-center">
            <div className="text-5xl font-bold text-red-600 mb-3">90%<Citation number={4} /></div>
            <div className="text-sm text-slate-600 leading-relaxed">
              Reduction in Admin processing time
            </div>
          </div>
        </div>
      </section>

      <section id="section-6" className="bg-slate-900 text-white -mx-6 px-6 py-16 rounded-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <SectionIllustration type="recommendation" className="w-16 h-16" />
            <h2 className="text-3xl font-bold text-white">6. Recommendation</h2>
          </div>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Based on the financial analysis and market trends, immediate action is recommended to audit current data infrastructure. Deferring AI adoption risks a competitive disadvantage in bidding precision and operational efficiency.
          </p>

          <div className="mb-8 space-y-4">
            <UrgencyBadge type="limited-spots" spotsRemaining={3} />
            <UrgencyBadge type="early-pricing" daysRemaining={30} />
          </div>

          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 text-center">
            <div className="flex justify-center mb-4">
              <DollarSign className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Data Audit</h3>
            <p className="text-slate-400 mb-6">
              Contact our specialist team for a preliminary assessment of your AI readiness.
            </p>
            <div className="inline-block bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded-lg text-white font-bold uppercase tracking-wider cursor-pointer">
              Contact: audit@plandepa.ai
            </div>
          </div>
        </div>
      </section>

      <section id="section-6-5" className="my-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">6.5 Common Concerns Addressed</h2>
        <SimpleFAQ items={faqItems} />
      </section>

      <section className="my-16">
        <References references={references} />
      </section>
    </div>
  );
}
