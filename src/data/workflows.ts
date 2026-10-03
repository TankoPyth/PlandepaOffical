import { Inbox, RotateCcw, FileText, Camera, Truck, ArrowLeftRight } from 'lucide-react';

export const workflows = [
  {
    icon: Inbox,
    title: 'Inbound Black Hole',
    painPoint: 'Enquiries disappear into email chaos, nothing gets tracked properly',
    hoursSaved: 8,
    isPopular: true,
    fullDescription: 'You get enquiries from multiple channels - email, phone, Facebook, walk-ins. Some get answered fast, others sit for days. Nobody knows who\'s following up what, and hot leads go cold because they fell through the cracks.',
    whatWeInstall: [
      'Single inbox that captures every enquiry from every channel',
      'Automatic assignment to the right person',
      'Follow-up reminders that actually work',
      'Response time tracking',
      'Lead scoring to prioritize hot prospects',
    ],
    whatImproves: [
      { metric: 'Response Time', improvement: '< 1 hour' },
      { metric: 'Lost Leads', improvement: '-95%' },
      { metric: 'Admin Time', improvement: '-8 hrs/week' },
    ],
    beforeAfter: {
      before: 'Enquiries scattered across email, phone logs, Facebook. Some answered in minutes, others never seen. No idea who\'s doing what.',
      after: 'Every enquiry lands in one system, gets assigned instantly, follow-ups automated. Nothing slips through.',
    },
  },
  {
    icon: RotateCcw,
    title: 'Follow-Up Nightmare',
    painPoint: 'Hours wasted chasing the same updates from site, clients, suppliers',
    hoursSaved: 12,
    isPopular: true,
    fullDescription: 'You spend hours every day asking for updates. "Where are we at with that variation?" "Did the client approve?" "When are materials arriving?" Same questions to the same people, every single day.',
    whatWeInstall: [
      'Automated status update requests',
      'Smart reminders that escalate if ignored',
      'Pre-filled update forms for fast responses',
      'Dashboard showing everything overdue',
      'Client portal for self-service updates',
    ],
    whatImproves: [
      { metric: 'Follow-up Time', improvement: '-70%' },
      { metric: 'Response Rate', improvement: '+85%' },
      { metric: 'Admin Hours', improvement: '-12/week' },
    ],
    beforeAfter: {
      before: 'Constant calls and texts asking for updates. Chasing the same people daily. Updates arrive late or incomplete.',
      after: 'Updates come to you automatically. System handles reminders and escalations. Dashboard shows everything at a glance.',
    },
  },
  {
    icon: FileText,
    title: 'Variation Delays',
    painPoint: 'Approvals stuck, margin getting chewed while you wait',
    hoursSaved: 10,
    fullDescription: 'Variations sit waiting for approval for days or weeks. You\'re doing the work anyway, hoping it gets approved later. By the time it\'s official, you\'ve lost track of actual costs and your margin is toast.',
    whatWeInstall: [
      'Quick variation creation from mobile or desktop',
      'Automatic client notification with approval link',
      'Reminder sequences for unapproved variations',
      'Cost tracking that links to actual invoices',
      'Approval history and audit trail',
    ],
    whatImproves: [
      { metric: 'Approval Time', improvement: '-60%' },
      { metric: 'Margin Recovery', improvement: '+15%' },
      { metric: 'Admin Time', improvement: '-10 hrs/week' },
    ],
    beforeAfter: {
      before: 'Variations written on paper, sent via email, approval takes weeks. No tracking of costs. Margin disappears.',
      after: 'Variations created and sent in 2 minutes. Client approves via link. Costs tracked automatically against approval.',
    },
  },
  {
    icon: Camera,
    title: 'Site-to-Office Gap',
    painPoint: 'Photos everywhere, office reconstructing what happened on site',
    hoursSaved: 15,
    fullDescription: 'Your team takes hundreds of photos but they live in personal phones or random WhatsApp threads. Office staff spend hours asking "which job was that?", "when was this taken?", "what am I looking at?"',
    whatWeInstall: [
      'Site diary app that links photos to jobs automatically',
      'Voice-to-text notes while on site',
      'Automatic GPS and timestamp on every photo',
      'Instant sync to office dashboard',
      'Organized photo library by job and date',
    ],
    whatImproves: [
      { metric: 'Photo Sorting Time', improvement: '-90%' },
      { metric: 'Site Communication', improvement: '+80%' },
      { metric: 'Admin Hours', improvement: '-15/week' },
    ],
    beforeAfter: {
      before: 'Photos scattered across phones. Office calls site asking for context. Hours wasted sorting and organizing.',
      after: 'Photos captured on site, automatically tagged and organized. Office sees everything in real-time with context.',
    },
  },
  {
    icon: Truck,
    title: 'Supplier Chaos',
    painPoint: 'Materials late or wrong, nobody knows what\'s outstanding',
    hoursSaved: 8,
    fullDescription: 'You order materials via email and phone calls. Half the time you\'re not sure if it was ordered, when it\'s arriving, or if it\'s the right spec. Jobs get delayed because materials don\'t show up.',
    whatWeInstall: [
      'Centralized ordering system with supplier integration',
      'Automatic delivery tracking and notifications',
      'Outstanding order dashboard',
      'Spec matching to prevent wrong orders',
      'Delivery confirmation workflow',
    ],
    whatImproves: [
      { metric: 'Delayed Deliveries', improvement: '-75%' },
      { metric: 'Wrong Orders', improvement: '-85%' },
      { metric: 'Ordering Time', improvement: '-8 hrs/week' },
    ],
    beforeAfter: {
      before: 'Orders scattered across email and phone. No visibility on what\'s outstanding. Delays and wrong materials common.',
      after: 'All orders in one system. Real-time tracking. Alerts when deliveries are late. Wrong orders caught before they ship.',
    },
  },
  {
    icon: ArrowLeftRight,
    title: 'Messy Handovers',
    painPoint: 'Job details lost between quote and delivery',
    hoursSaved: 6,
    fullDescription: 'Sales wins the job, but half the details never make it to the site team. Scope creep starts on day one because nobody really knows what was promised. Clients get frustrated and your team is flying blind.',
    whatWeInstall: [
      'Structured handover checklist',
      'Automatic transfer of quote details to job system',
      'Client expectation documentation',
      'Site access to full job history',
      'Change tracking from day one',
    ],
    whatImproves: [
      { metric: 'Handover Errors', improvement: '-80%' },
      { metric: 'Scope Clarity', improvement: '+90%' },
      { metric: 'Admin Time', improvement: '-6 hrs/week' },
    ],
    beforeAfter: {
      before: 'Sales hands over a quote and a prayer. Site team guesses at scope. Client expectations don\'t match reality.',
      after: 'Complete job details flow from quote to site automatically. Everyone works from the same playbook.',
    },
  },
];

export const faqItems = [
  {
    question: 'What if the pilot doesn\'t hit the metrics?',
    answer: 'Simple: you don\'t pay. We only get paid when we deliver measurable results. If we don\'t hit the agreed numbers in 28 days, we eat the cost. That\'s our risk, not yours.',
  },
  {
    question: 'How much team time does a pilot need?',
    answer: 'Minimal. About 2-3 hours total across the whole month. We do the heavy lifting. Your team just needs to give us 30 minutes at the start to understand the workflow, then quick check-ins as we build.',
  },
  {
    question: 'Can we pilot multiple workflows at once?',
    answer: 'We don\'t recommend it. Better to prove value on one bottleneck first, then expand. Trying to fix everything at once usually means nothing gets done properly.',
  },
  {
    question: 'What happens after the pilot?',
    answer: 'You\'ll have clear data on what improved. Then you decide: stop here, extend to more workflows, or scale across your whole operation. No lock-in, no surprises. We only continue if you want us to.',
  },
];
