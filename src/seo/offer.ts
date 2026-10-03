/**
 * The Clarity Blueprint: PlanDepa's main offer.
 * Single source for the offer page, structured data, and location/other page CTAs.
 * Wording of RISK_REVERSAL and DELIVERY_GUARANTEE is approved, don't paraphrase.
 */

export const OFFER_PATH = '/clarity-blueprint';
export const OFFER_NAME = 'The Clarity Blueprint';

export const OFFER_SUMMARY =
  'A paid diagnostic that exposes exactly where your construction business is breaking, in three sizes, and turns straight into implementation.';

export const OFFER_PROMISE =
  'For a relatively small commitment, you get clarity on a problem that could be costing you tens of thousands in time, margin, missed work or owner capacity.';

/** All Blueprint prices are ex. GST. */
export const GST_NOTE = 'All prices exclude GST.';
export const formatPrice = (n: number) => `$${n.toLocaleString('en-AU')}`;
export const formatPriceGst = (n: number) => `${formatPrice(n)} + GST`;

export interface ClarityTier {
  id: 'sprint' | 'day' | 'intensive';
  name: string;
  price: number;
  format: string;
  recommended?: boolean;
  includes: string[];
}

export const TIERS: ClarityTier[] = [
  {
    id: 'sprint',
    name: 'Clarity Sprint',
    price: 990,
    format: '3-hour virtual working session',
    includes: [
      'High-level Business Clarity Map',
      'Top Three Leak Register',
      'First Workflow Decision',
      '30-day priority plan',
      'Review / readout call',
    ],
  },
  {
    id: 'day',
    name: 'Clarity Day',
    price: 1990,
    format: 'One-day in-person review: Brisbane or Newcastle',
    recommended: true,
    includes: [
      'Owner and team conversations',
      'Live workflow mapping',
      'Systems and information-flow review',
      'Owner Bottleneck Map',
      'Priority board',
      'First-workflow implementation outline',
      '30-day plan',
      '90-minute decision session',
      '14-day clarification window',
    ],
  },
  {
    id: 'intensive',
    name: 'Clarity Intensive',
    price: 4990,
    format: 'Up to two in-person days: Australia-wide, travel included',
    includes: [
      'Deeper department or location review',
      'Work / sample data review',
      'Detailed handoff and owner-dependence analysis',
      'SOP and source-of-truth review',
      'Implementation economics',
      '90-day roadmap',
      'Leadership alignment session',
      'Implementation scope',
      '30-day post-review check-in',
    ],
  },
];

export const RISK_REVERSAL =
  'If you choose PlanDepa to implement the agreed first workflow within 30 days of the Blueprint readout, the full Blueprint fee is credited against that approved implementation scope.';

export const DELIVERY_GUARANTEE =
  'If you provide the agreed information, access and decision-maker time, and PlanDepa does not deliver the named Blueprint outputs by the agreed date, we will continue the review at no additional professional fee until those outputs are delivered or refund the Blueprint fee.';

export const FIT = {
  yes: [
    'You run a construction business with 10-50 staff.',
    "You're juggling four or more tools that don't talk to each other.",
    "You're still the bottleneck: decisions, quotes and problems all route through you.",
    "The business makes decent money, but you can't leave for a week without it slipping.",
    'You want your business back, and you are willing to be involved in fixing it.',
  ],
  no: [
    'Businesses with fewer than 10 staff.',
    'Anyone who wants it "fixed" without their own input.',
    'Anyone shopping on price alone.',
  ],
};

export const OFFER_FAQS = [
  {
    q: 'What is the Clarity Blueprint?',
    a: `${OFFER_SUMMARY} You pay for an honest, structured picture of where time, margin and owner capacity are leaking, and a clear decision on the first workflow to fix.`,
  },
  {
    q: 'Which size should I choose?',
    a: 'The Clarity Sprint suits owners who already know roughly where the problem is and want it confirmed and prioritised. The Clarity Day is our recommended option for most construction businesses with 10-50 staff. We spend a day with you and your team in Brisbane or Newcastle. The Clarity Intensive is for multi-department or multi-location businesses anywhere in Australia.',
  },
  {
    q: 'Do I have to implement with PlanDepa afterwards?',
    a: `No. The Blueprint outputs are yours to keep and act on. ${RISK_REVERSAL}`,
  },
  {
    q: 'What do you need from us?',
    a: 'The agreed information, access to the systems and people involved, and decision-maker time. That is also what our delivery guarantee depends on.',
  },
  {
    q: 'What happens if you do not deliver?',
    a: DELIVERY_GUARANTEE,
  },
  {
    q: 'Where does AI come into it?',
    a: 'The Blueprint shows where AI and automation will actually pay off: enquiry follow-up, quoting, variations, handovers, site admin, reporting, and where they will not. The first workflow we implement is chosen on impact, not on hype.',
  },
];
