# Plandepa Website - Developer Guide

Welcome! This guide will help you navigate and modify the Plandepa website codebase. Everything is organized to be easy to find and change.

## Quick Start

```bash
npm install          # Install dependencies (first time only)
npm run dev         # Start development server
npm run build       # Build for production
```

## Folder Structure

```
project/
├── public/                          # Images and static files
│   ├── plandepa_logo_slim.png      # Main logo (used in header/footer)
│   ├── plandepa_nobg.png           # Alternative logo
│   └── linkedin_profile_picture_(1).png  # Jarrod's profile photo
│
├── src/                            # All your code lives here
│   ├── pages/                      # Full page components
│   ├── components/                 # Reusable UI pieces
│   ├── hooks/                      # Custom React hooks
│   ├── lib/                        # External integrations
│   └── utils/                      # Helper functions
│
└── supabase/                       # Database migrations
    └── migrations/                 # Database schema changes
```

## Where to Find Things

### Pages (Full Website Pages)
Location: `src/pages/`

- **HomePage.tsx** - Main landing page with hero section, services, and founder info
- **BlogPage.tsx** - Blog listing page showing all blog posts
- **BlogPostPage.tsx** - Individual blog post display
- **CaseStudiesPage.tsx** - Customer success stories
- **FreeAuditPage.tsx** - Free audit booking form
- **LeadGenerationPage.tsx** - Lead generation service info
- **ROICalculatorPage.tsx** - ROI calculation tool
- **SoftwarePage.tsx** - Software integrations showcase

### Components (Reusable Building Blocks)
Location: `src/components/`

#### Main Components
- **Navigation.tsx** - Top header with logo and menu
- **Footer.tsx** - Bottom footer with links and logo
- **BlogCard.tsx** - Individual blog post preview card
- **CaseStudyPreview.tsx** - Case study card component
- **StatCard.tsx** - Statistics display card
- **SimpleFAQ.tsx** - FAQ accordion component

#### UI Components (Visual Elements)
Location: `src/components/ui/`

- **BeforeAfterSlider.tsx** - Before/after comparison slider
- **NewsletterSignup.tsx** - Email newsletter form
- **SocialShare.tsx** - Social media sharing buttons
- **TableOfContents.tsx** - Blog post table of contents
- **ScrollProgress.tsx** - Reading progress indicator
- **Tooltip.tsx** - Hover tooltips

#### Blog Components (Blog-Specific)
Location: `src/components/blog/`

- **AustralianAIPolicyPost.tsx** - AI policy blog post content
- **ConstructionAIBusinessCasePost.tsx** - AI business case post content

### Configuration & Setup
- **AppRouter.tsx** - Defines all page routes (URLs)
- **App.tsx** - Main app component (currently not used, AppRouter is used instead)
- **main.tsx** - Application entry point
- **lib/supabase.ts** - Database connection setup

### Styling
- **index.css** - Global styles and Tailwind CSS setup
- **tailwind.config.js** - Tailwind configuration (colors, fonts, etc.)

## Common Tasks

### 1. Adding a New Page

**Step 1:** Create the page file in `src/pages/`
```tsx
// src/pages/NewPage.tsx
export function NewPage() {
  return (
    <div className="py-20 px-6">
      <h1>My New Page</h1>
    </div>
  );
}
```

**Step 2:** Add route in `src/AppRouter.tsx`
```tsx
import { NewPage } from './pages/NewPage';

// Add inside <Routes>:
<Route path="/new-page" element={<NewPage />} />
```

**Step 3:** Add link in Navigation or Footer
```tsx
<Link to="/new-page">New Page</Link>
```

### 2. Changing the Logo

The logo appears in two places:
- **Navigation:** `src/components/Navigation.tsx` (line 54-58)
- **Footer:** `src/components/Footer.tsx` (line 10-16)

To change:
1. Add your new logo image to the `public/` folder
2. Update the `src` attribute: `src="/your-logo.png"`

### 3. Updating Text on Homepage

Open `src/pages/HomePage.tsx` and look for:
- **Hero headline:** Around line 51
- **Hero description:** Around line 59
- **Stats section:** Search for "StatCard"
- **Services section:** Search for "MinimalServiceCard"
- **FAQ section:** Around line 15-32

### 4. Modifying the Navigation Menu

Open `src/components/Navigation.tsx`:
- **Menu items:** Line 37-40 (navLinks array)
- **Software dropdown items:** Line 5-14 (softwareList array)

To add a new menu item:
```tsx
const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'New Link', href: '/new-page' }, // Add here
];
```

### 5. Adding Blog Posts

Blog posts are stored in the Supabase database. To add a post:
1. Go to your Supabase dashboard
2. Navigate to the `blog_posts` table
3. Add a new row with:
   - title
   - slug (URL-friendly version, e.g., "my-post-title")
   - excerpt (short description)
   - content (full post content)
   - author_name
   - published_at (date)

### 6. Changing Colors

Open `tailwind.config.js` and modify the colors in the `theme.extend.colors` section:

```javascript
colors: {
  'brand-red': '#C1574B',      // Main brand red
  'brand-darkred': '#8B3E36',  // Darker red
  'brand-black': '#1A1A1A',    // Primary text
  'brand-gray': '#6B7280',     // Secondary text
  // Add or modify colors here
}
```

Use them in components: `className="text-brand-red bg-brand-black"`

### 7. Updating Footer Links

Open `src/components/Footer.tsx` and edit the links around line 18-43.

### 8. Modifying Database Schema

Database changes go in `supabase/migrations/`:
1. Create a new migration file (format: `YYYYMMDDHHMMSS_description.sql`)
2. Write your SQL changes
3. The migration runs automatically

## File Naming Conventions

- **Pages:** `HomePage.tsx`, `BlogPage.tsx` (PascalCase + Page suffix)
- **Components:** `Navigation.tsx`, `BlogCard.tsx` (PascalCase)
- **Utils/Hooks:** `animations.ts`, `useScrollAnimation.ts` (camelCase)
- **CSS:** `index.css`, `tailwind.config.js` (kebab-case)

## Understanding the Code Flow

1. **User visits website** → `main.tsx` loads
2. **App starts** → `AppRouter.tsx` determines which page to show
3. **Page renders** → Page component (e.g., `HomePage.tsx`) displays
4. **Page uses components** → Imports from `components/` folder
5. **Data loaded** → Fetches from Supabase database via `lib/supabase.ts`

## Getting Help

### Finding Where Something Is Used

Use your code editor's search function (Ctrl+F or Cmd+F) to search for:
- Component names: Search for `<BlogCard` to find all uses
- Text content: Search for the exact text to find where it's defined
- Image files: Search for the filename to see where it's used

### Common Error: Can't Find Module

If you see: `Cannot find module './ComponentName'`
- Check the file path is correct
- Check the import matches the export (e.g., `export function HomePage` needs `import { HomePage }`)
- Make sure the file exists in the right folder

### Common Error: Page Shows Blank

- Check the browser console (F12) for errors
- Make sure the route is added in `AppRouter.tsx`
- Verify the component is exported correctly

## Key Technologies Used

- **React** - JavaScript framework for building UI
- **TypeScript** - Adds type safety to JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Handles page navigation
- **Supabase** - Database and backend services
- **Vite** - Fast build tool and dev server
- **Framer Motion** - Animations library

## Best Practices

1. **Keep components small** - One component should do one thing
2. **Use meaningful names** - `BlogCard` is better than `Card1`
3. **Don't repeat code** - If you copy-paste, make it a component instead
4. **Test your changes** - Run `npm run dev` and click through the site
5. **Build before deploying** - Run `npm run build` to catch errors

## Project-Specific Notes

- Jarrod's profile photo is used in: HomePage, BlogCard, BlogPostPage
- Main logo (slim version) is used in: Navigation, Footer
- Brand colors (red: #C1574B) should be consistent across all pages
- All pages include Navigation and Footer automatically via AppRouter

## Need More Help?

1. Read the comments in the code files
2. Check the official docs:
   - [React](https://react.dev)
   - [Tailwind CSS](https://tailwindcss.com)
   - [Supabase](https://supabase.com/docs)
3. Look at similar components to see how they work
4. Use your browser's developer tools (F12) to inspect elements

---

**Remember:** The best way to learn is to experiment! Make small changes, save, and see what happens. You can always undo with Ctrl+Z or Git.
