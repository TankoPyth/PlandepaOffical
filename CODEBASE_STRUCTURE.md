# Plandepa Codebase Structure

This document provides a complete map of the codebase. Use it to quickly find what you need.

## Visual File Tree

```
plandepa-website/
│
├── 📁 public/                              # Static files (images, icons)
│   ├── plandepa_logo_slim.png             # [USED IN] Navigation, Footer
│   ├── plandepa_nobg.png                  # [BACKUP] Alternative logo
│   └── linkedin_profile_picture_(1).png   # [USED IN] HomePage, BlogCard, BlogPostPage
│
├── 📁 src/                                 # All source code
│   │
│   ├── 📄 main.tsx                         # 🚀 App entry point - starts everything
│   ├── 📄 App.tsx                          # [LEGACY] Old app component (not currently used)
│   ├── 📄 AppRouter.tsx                    # 🗺️ Defines all page routes and URLs
│   ├── 📄 index.css                        # 🎨 Global styles and Tailwind setup
│   ├── 📄 vite-env.d.ts                    # TypeScript definitions for Vite
│   │
│   ├── 📁 pages/                           # 📄 Full website pages (8 pages)
│   │   ├── HomePage.tsx                    # Home page with hero, stats, services, founder
│   │   ├── BlogPage.tsx                    # Blog listing page (shows all posts)
│   │   ├── BlogPostPage.tsx                # Individual blog post view
│   │   ├── CaseStudiesPage.tsx             # Customer success stories
│   │   ├── FreeAuditPage.tsx               # Free audit booking form
│   │   ├── LeadGenerationPage.tsx          # Lead generation service info
│   │   ├── ROICalculatorPage.tsx           # ROI calculation tool
│   │   └── SoftwarePage.tsx                # Software integrations showcase
│   │
│   ├── 📁 components/                      # 🧩 Reusable UI components
│   │   │
│   │   ├── 📄 Navigation.tsx               # ⬆️ Top header (logo, menu, mobile menu)
│   │   ├── 📄 Footer.tsx                   # ⬇️ Bottom footer (logo, links, copyright)
│   │   │
│   │   ├── 📄 BlogCard.tsx                 # Blog post preview card
│   │   ├── 📄 CaseStudyPreview.tsx         # Case study display card
│   │   ├── 📄 CategoryFilter.tsx           # Blog category filter buttons
│   │   ├── 📄 InfiniteSlider.tsx           # Infinite scrolling slider
│   │   ├── 📄 MinimalServiceCard.tsx       # Service showcase card
│   │   ├── 📄 PathCard.tsx                 # Customer journey path card
│   │   ├── 📄 SectionNumber.tsx            # Numbered section indicator
│   │   ├── 📄 SimpleFAQ.tsx                # FAQ accordion component
│   │   ├── 📄 StatCard.tsx                 # Statistics display card
│   │   │
│   │   ├── 📁 blog/                        # Blog-specific components
│   │   │   ├── AustralianAIPolicyPost.tsx  # AI policy blog post content
│   │   │   └── ConstructionAIBusinessCasePost.tsx  # AI business case content
│   │   │
│   │   └── 📁 ui/                          # UI/UX elements (14 components)
│   │       ├── AngleDivider.tsx            # Angled section divider
│   │       ├── AnimatedAccentLine.tsx      # Animated decorative line
│   │       ├── BeforeAfterSlider.tsx       # Before/after comparison slider
│   │       ├── Citation.tsx                # Blog post citations
│   │       ├── CurvedArrow.tsx             # Decorative curved arrow
│   │       ├── NewsletterSignup.tsx        # Email newsletter signup form
│   │       ├── RedAccentDecor.tsx          # Red decorative accent element
│   │       ├── ScrollProgress.tsx          # Reading progress bar
│   │       ├── SectionIllustration.tsx     # Section background illustration
│   │       ├── SocialProofBar.tsx          # Social proof indicators
│   │       ├── SocialShare.tsx             # Social media share buttons
│   │       ├── SubtleWaveBackground.tsx    # Wave background pattern
│   │       ├── TableOfContents.tsx         # Blog post TOC navigation
│   │       ├── Tooltip.tsx                 # Hover tooltip component
│   │       └── UrgencyBadge.tsx            # Urgency indicator badge
│   │
│   ├── 📁 hooks/                           # Custom React hooks
│   │   └── useScrollAnimation.ts           # Scroll-based animation hook
│   │
│   ├── 📁 lib/                             # External service integrations
│   │   └── supabase.ts                     # 🗄️ Database connection setup
│   │
│   └── 📁 utils/                           # Helper functions
│       └── animations.ts                   # Animation configurations (Framer Motion)
│
├── 📁 supabase/                            # Database configuration
│   └── 📁 migrations/                      # Database schema changes
│       ├── 20251124084723_create_plandepa_schema.sql
│       ├── 20251125035008_add_construction_content_tables.sql
│       ├── 20251210101327_update_blog_schema.sql
│       └── 20251218084014_add_engagement_tracking_tables.sql
│
├── 📄 package.json                         # Project dependencies and scripts
├── 📄 tsconfig.json                        # TypeScript configuration
├── 📄 tailwind.config.js                   # 🎨 Tailwind CSS config (colors, fonts)
├── 📄 vite.config.ts                       # Vite build configuration
├── 📄 .env                                 # 🔒 Environment variables (Supabase keys)
└── 📄 README.md                            # This file you're reading!
```

## Component Dependency Map

### HomePage depends on:
- Navigation (via AppRouter Layout)
- Footer (via AppRouter Layout)
- SectionNumber
- PathCard
- MinimalServiceCard
- CaseStudyPreview
- SimpleFAQ
- StatCard
- SubtleWaveBackground
- AngleDivider

### BlogPage depends on:
- Navigation (via AppRouter Layout)
- Footer (via AppRouter Layout)
- BlogCard
- CategoryFilter

### BlogPostPage depends on:
- Navigation (via AppRouter Layout)
- Footer (via AppRouter Layout)
- ScrollProgress
- TableOfContents
- SocialShare
- NewsletterSignup
- SocialProofBar
- Citation (potentially, used in blog content components)

## Database Tables

Located in Supabase, defined by migrations:

### Main Tables:
- **blog_posts** - Blog post content, metadata, and publishing info
- **blog_categories** - Blog post categories
- **case_studies** - Customer success story data
- **newsletter_subscribers** - Email newsletter signups
- **engagement_tracking** - User interaction analytics

## Route Map (URLs)

Defined in `src/AppRouter.tsx`:

| URL | Component | Purpose |
|-----|-----------|---------|
| `/` | HomePage | Main landing page |
| `/blog` | BlogPage | Blog listing |
| `/blog/:slug` | BlogPostPage | Individual blog post |
| `/case-studies` | CaseStudiesPage | Success stories |
| `/free-audit` | FreeAuditPage | Audit booking |
| `/lead-generation` | LeadGenerationPage | Lead gen info |
| `/roi-calculator` | ROICalculatorPage | ROI tool |
| `/software` | SoftwarePage | Software integrations |

## Import Path Guide

When importing components, use these patterns:

```tsx
// Importing a page
import { HomePage } from './pages/HomePage';

// Importing a component
import { Navigation } from './components/Navigation';

// Importing a UI component
import { Tooltip } from './components/ui/Tooltip';

// Importing a blog component
import { AustralianAIPolicyPost } from './components/blog/AustralianAIPolicyPost';

// Importing utilities
import { fadeInUp } from './utils/animations';

// Importing hooks
import { useScrollAnimation } from './hooks/useScrollAnimation';

// Importing Supabase
import { supabase } from './lib/supabase';
```

## Style System

### Tailwind CSS Classes (most commonly used):

**Layout:**
- `max-w-7xl mx-auto` - Centered content container
- `px-6` - Horizontal padding
- `py-20` - Vertical padding

**Colors:**
- `text-brand-red` - Primary red text (#C1574B)
- `bg-brand-black` - Black background (#1A1A1A)
- `text-brand-gray` - Gray text (#6B7280)

**Typography:**
- `text-heading-xl` - Extra large heading
- `text-heading-lg` - Large heading
- `text-body-md` - Medium body text

**Spacing:**
- `gap-4` - 1rem spacing
- `gap-8` - 2rem spacing
- `mb-6` - Margin bottom 1.5rem

## Animation System

Defined in `src/utils/animations.ts`:

- `fadeInUp` - Fade in from bottom
- `staggerContainer` - Stagger child animations
- `staggerItem` - Individual stagger item
- `appleEasing` - Apple-style easing curve

Usage:
```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from './utils/animations';

<motion.div {...fadeInUp}>
  Content here
</motion.div>
```

## Data Flow

1. **Database (Supabase)** → 2. **API Query** → 3. **React Component** → 4. **User Interface**

Example for blog posts:
```
Supabase blog_posts table
  ↓
supabase.from('blog_posts').select()
  ↓
BlogPage component (useState)
  ↓
BlogCard component (props)
  ↓
Displayed on screen
```

## Key Configuration Files

### package.json
- Lists all dependencies
- Defines npm scripts (dev, build, lint)

### tailwind.config.js
- Custom colors (brand-red, brand-black, etc.)
- Custom fonts
- Custom spacing
- Breakpoints

### tsconfig.json
- TypeScript compiler settings
- Path aliases
- Type checking rules

### vite.config.ts
- Build configuration
- Dev server settings
- Plugin configuration

### .env
- Supabase URL
- Supabase Anon Key
- Other environment variables

## Common Modification Patterns

### Adding a New Component

1. Create file: `src/components/NewComponent.tsx`
2. Export component: `export function NewComponent() { ... }`
3. Import where needed: `import { NewComponent } from './components/NewComponent';`
4. Use it: `<NewComponent />`

### Adding a New Page

1. Create file: `src/pages/NewPage.tsx`
2. Export page: `export function NewPage() { ... }`
3. Add route in `AppRouter.tsx`: `<Route path="/new" element={<NewPage />} />`
4. Add navigation link in `Navigation.tsx` or `Footer.tsx`

### Modifying Styles

1. **Global styles:** Edit `src/index.css`
2. **Theme colors:** Edit `tailwind.config.js`
3. **Component styles:** Edit the component's className attributes

### Working with Database

1. **Schema changes:** Create new migration in `supabase/migrations/`
2. **Querying data:** Use `supabase` client from `lib/supabase.ts`
3. **Example:** `const { data } = await supabase.from('table').select()`

## Tips for Navigation

1. **Find component usage:** Search for `<ComponentName` in your editor
2. **Find text content:** Search for the exact text
3. **Find file imports:** Search for `from './path/to/file'`
4. **Find all uses of a hook:** Search for `useHookName(`
5. **Find route definitions:** Look in `AppRouter.tsx`

## Component Hierarchy

```
AppRouter (routes and layout)
  ├── Layout
  │   ├── ScrollProgress (global)
  │   ├── Navigation (global)
  │   ├── {children} (current page)
  │   └── Footer (global)
  │
  └── Routes
      ├── HomePage
      │   ├── StatCard
      │   ├── MinimalServiceCard
      │   ├── PathCard
      │   ├── CaseStudyPreview
      │   └── SimpleFAQ
      │
      ├── BlogPage
      │   ├── CategoryFilter
      │   └── BlogCard (multiple)
      │
      └── BlogPostPage
          ├── TableOfContents
          ├── SocialShare
          └── NewsletterSignup
```

---

**Quick Reference:** If you're lost, start at `AppRouter.tsx` - it's the map of the entire application!
