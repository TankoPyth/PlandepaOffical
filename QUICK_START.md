# Quick Start Guide - For Beginners

This guide helps you make common changes to the website in simple steps.

## Getting Started

### 1. Start the Development Server
```bash
npm run dev
```
This lets you see your changes live in the browser.

### 2. Make Your Changes
Edit the files in the `src/` folder.

### 3. See Your Changes
The browser will automatically refresh to show your changes.

## Common Changes

### Change Text on Home Page

**File:** `src/pages/HomePage.tsx`

**What to change:**

**Main Headline (Line ~81):**
```tsx
Less Paperwork. More Jobs. Better Profit.
```
Change this to whatever you want.

**Description Text (Line ~89):**
```tsx
We help construction companies cut down on the busy work...
```
Change this to your description.

### Change the Logo

**Files to edit:**
- `src/components/Navigation.tsx` (line 84)
- `src/components/Footer.tsx` (line 30)

**Steps:**
1. Put your new logo file in the `public/` folder
2. Change this line:
   ```tsx
   src="/plandepa_logo_slim.png"
   ```
   To:
   ```tsx
   src="/your-logo-name.png"
   ```

### Add a Menu Item

**File:** `src/components/Navigation.tsx`

**Find this section (around line 67):**
```tsx
const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Case Studies', href: '/case-studies' },
];
```

**Add your new menu item:**
```tsx
const navLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Contact', href: '/contact' },  // <- Your new menu item
];
```

### Change Colors

**File:** `tailwind.config.js`

**Find this section:**
```javascript
colors: {
  'brand-red': '#C1574B',      // Main red color
  'brand-black': '#1A1A1A',    // Main black color
  'brand-gray': '#6B7280',     // Gray text color
}
```

**Change the hex codes (#C1574B) to your preferred colors.**

To find hex codes: Use Google's color picker or visit https://htmlcolorcodes.com/

### Update FAQ Questions

**File:** `src/pages/HomePage.tsx`

**Find this section (around line 42):**
```tsx
const faqItems = [
  {
    question: 'Is the audit really free?',
    answer: 'Yeah, 100% free...',
  },
  // Add more questions here
];
```

**To add a new question:**
```tsx
{
  question: 'Your question here?',
  answer: 'Your answer here.',
},
```

### Change Footer Links

**File:** `src/components/Footer.tsx`

**Find the navigation section (around line 37) and edit the links:**
```tsx
<a href="/#services">Services</a>
<Link to="/case-studies">Case Studies</Link>
<a href="mailto:admin@plandepa.com">Contact</a>
```

### Add a New Page

**Step 1:** Create the page file
```tsx
// src/pages/ContactPage.tsx
export function ContactPage() {
  return (
    <div className="py-20 px-6">
      <h1 className="text-4xl font-bold">Contact Us</h1>
      <p>Your contact form goes here.</p>
    </div>
  );
}
```

**Step 2:** Add the route in `src/AppRouter.tsx`
```tsx
// Add at top with other imports
import { ContactPage } from './pages/ContactPage';

// Add in the Routes section
<Route path="/contact" element={<ContactPage />} />
```

**Step 3:** Add a link to your new page
In Navigation or Footer:
```tsx
<Link to="/contact">Contact</Link>
```

## Understanding File Locations

```
Where to find things:

📁 public/
   └── Your images and logo files go here

📁 src/
   ├── 📁 pages/          <- Full website pages
   │   └── HomePage.tsx   <- Main landing page
   │
   ├── 📁 components/     <- Reusable pieces
   │   ├── Navigation.tsx <- Top menu
   │   └── Footer.tsx     <- Bottom footer
   │
   └── 📁 components/ui/  <- Design elements
```

## Tips

### Finding Where Text Appears

1. Press `Ctrl+Shift+F` (Windows/Linux) or `Cmd+Shift+F` (Mac)
2. Type the text you want to find
3. It will show you which file contains that text

### Undoing Changes

Press `Ctrl+Z` (Windows/Linux) or `Cmd+Z` (Mac)

### Saving Files

Most code editors auto-save. If not, press `Ctrl+S` (Windows/Linux) or `Cmd+S` (Mac)

## Common Errors and Fixes

### Error: "Cannot find module"
**Fix:** Check that the file path in your import is correct.

```tsx
// Wrong
import { HomePage } from './HomePage';

// Right
import { HomePage } from './pages/HomePage';
```

### Error: Page shows blank
**Fix:**
1. Open browser console (press F12)
2. Look for red error messages
3. The error will tell you what's wrong

### Error: Changes don't show up
**Fix:**
1. Save your file
2. Refresh the browser (F5)
3. Check if `npm run dev` is still running

## Testing Before Launch

Before you launch your changes:

```bash
npm run build
```

This will check for errors. If it succeeds, your changes are good to go!

## Getting Help

1. **Check the comments** - Most files have helpful comments explaining what each section does
2. **Read the error message** - It usually tells you what's wrong
3. **Look at similar code** - Find a working example and copy its pattern
4. **Use the browser inspector** - Press F12 to see CSS styles and debug

## Keyboard Shortcuts (VS Code)

- `Ctrl+P` or `Cmd+P` - Quick file search
- `Ctrl+F` or `Cmd+F` - Find in current file
- `Ctrl+Shift+F` or `Cmd+Shift+F` - Find in all files
- `Ctrl+/` or `Cmd+/` - Comment/uncomment line
- `Alt+Up/Down` or `Option+Up/Down` - Move line up/down

## Important Files Reference

| File | What It Does |
|------|-------------|
| `src/AppRouter.tsx` | Defines all page URLs |
| `src/pages/HomePage.tsx` | Main landing page |
| `src/components/Navigation.tsx` | Top header menu |
| `src/components/Footer.tsx` | Bottom footer |
| `tailwind.config.js` | Colors and design settings |
| `package.json` | Project dependencies |

## Safe Experimentation

Don't be afraid to experiment! You can always:
- Undo with `Ctrl+Z` or `Cmd+Z`
- Use Git to revert changes: `git checkout filename.tsx`
- Start fresh: Ask someone to help restore from backup

**Remember:** Making mistakes is how you learn. Just save often and test frequently!
