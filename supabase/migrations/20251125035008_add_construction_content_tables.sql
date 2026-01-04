/*
  # Add Construction-Focused Content Tables

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text, required) - Contact name
      - `company_name` (text) - Construction company name
      - `trade_specialty` (text) - Type of construction work
      - `email` (text, required) - Contact email
      - `phone` (text) - Contact phone number
      - `interest_type` (text) - What they're interested in (Free Audit, Lead Generation, Both, Other)
      - `message` (text) - Additional message
      - `prefers_call_booking` (boolean) - Whether they prefer to book a call directly
      - `created_at` (timestamptz) - Submission timestamp
      - `status` (text) - Lead status (new, contacted, qualified, closed)
    
    - `case_studies`
      - `id` (uuid, primary key)
      - `company_type` (text) - e.g., "Custom Home Builder", "Commercial Electrician"
      - `location` (text) - City/region
      - `problem` (text) - The challenge they faced
      - `solution` (text) - What was implemented
      - `results` (text) - Specific outcomes and metrics
      - `testimonial` (text) - Quote from client
      - `client_name` (text) - Name of person giving testimonial
      - `client_role` (text) - Their role/title
      - `image_url` (text) - Optional image
      - `display_order` (integer) - Order for display
      - `is_published` (boolean) - Whether to show on site
      - `created_at` (timestamptz)
    
    - `services`
      - `id` (uuid, primary key)
      - `title` (text, required) - Service name
      - `pain_point` (text) - The problem it solves
      - `solution` (text) - How it solves the problem
      - `cta_text` (text) - Call to action button text
      - `icon_name` (text) - Lucide icon name
      - `display_order` (integer) - Order for display
      - `is_active` (boolean) - Whether to show on site
      - `created_at` (timestamptz)
    
    - `faqs`
      - `id` (uuid, primary key)
      - `question` (text, required)
      - `answer` (text, required)
      - `category` (text) - e.g., "General", "Technical", "Pricing"
      - `display_order` (integer) - Order for display
      - `is_published` (boolean) - Whether to show on site
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for published content (case_studies, services, faqs)
    - Public insert access for enquiries
    - Authenticated-only access for admin operations
*/

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  company_name text,
  trade_specialty text,
  email text NOT NULL,
  phone text,
  interest_type text DEFAULT 'Free Audit',
  message text,
  prefers_call_booking boolean DEFAULT false,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit enquiries"
  ON enquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view enquiries"
  ON enquiries FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update enquiries"
  ON enquiries FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create case_studies table
CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_type text NOT NULL,
  location text,
  problem text NOT NULL,
  solution text NOT NULL,
  results text NOT NULL,
  testimonial text,
  client_name text,
  client_role text,
  image_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published case studies"
  ON case_studies FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage case studies"
  ON case_studies FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  pain_point text NOT NULL,
  solution text NOT NULL,
  cta_text text DEFAULT 'Learn More',
  icon_name text DEFAULT 'Wrench',
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  category text DEFAULT 'General',
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published FAQs"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage FAQs"
  ON faqs FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial services data
INSERT INTO services (title, pain_point, solution, cta_text, icon_name, display_order) VALUES
  ('Software Strategy & Selection', 'Drowning in spreadsheets and paper quotes?', 'Independent guidance to choose the right project management, quoting, and CRM software for your business size and trade', 'Find Your Perfect System', 'Settings', 1),
  ('AI Implementation & Team Training', 'Your team refusing to use new tools?', 'Hands-on training and support to get your entire crew confident with AI and automation tools', 'Get Your Team On Board', 'GraduationCap', 2),
  ('Quote-to-Cash Automation', 'Losing track of quotes and getting paid late?', 'Automate your entire sales cycle from initial quote to final invoice and payment', 'Streamline Your Revenue', 'DollarSign', 3),
  ('Lead Generation & Nurture', 'Relying on word-of-mouth and hoping the phone rings?', 'Predictable, qualified lead flow with AI-powered scoring and automated follow-up', 'Fill Your Pipeline', 'Users', 4),
  ('Business Integration Hub', 'Jumping between 5 different apps to run your business?', 'Connect your estimating, scheduling, accounting, and communication tools into one seamless system', 'Unify Your Tools', 'Network', 5),
  ('Ongoing Optimization & Support', 'Set it up once and watch it slowly break down?', 'Continuous monitoring, updates, and improvements to keep your systems running perfectly', 'Partner With Us Long-Term', 'RefreshCw', 6);

-- Insert initial FAQ data
INSERT INTO faqs (question, answer, category, display_order) VALUES
  ('I''m not tech-savvy, will this be too complicated?', 'Not at all! We specialize in making technology simple for construction professionals. We handle all the technical complexity behind the scenes and train you and your team on exactly what you need to know - nothing more. If you can use a smartphone, you can use our systems.', 'General', 1),
  ('What if my team doesn''t use the new systems?', 'This is exactly why we include comprehensive training and ongoing support. We don''t just set up software and disappear - we work alongside your team until they''re confident and comfortable. We also design systems to be intuitive and save them time, which naturally encourages adoption.', 'General', 2),
  ('How much time will this take away from running jobs?', 'The initial setup requires some of your time for strategic decisions (usually 2-4 hours total spread across a few weeks), but we do the heavy lifting. Once implemented, our systems actually give you back 10+ hours per week by automating admin tasks, so you can focus on what you do best - building.', 'General', 3),
  ('Do I need to change all my software?', 'No! We work with what you already have whenever possible. We''re software-agnostic advisors who recommend what''s truly best for YOUR business, not what pays us commissions. Often we can integrate and optimize your existing tools rather than replacing everything.', 'Technical', 4),
  ('What happens after the 90 days?', 'After the initial 90-day implementation, you have options. Many clients continue with our ongoing optimization and support partnership to keep systems running perfectly and scale further. Others prefer to manage independently once set up. There are no long-term contracts - you choose what works best.', 'General', 5),
  ('Is the free audit really free or is there a catch?', 'It''s genuinely 100% free with zero obligation. No credit card required, no pressure sales tactics. We provide real value in the audit itself - a custom roadmap you can implement yourself if you want. We earn your business by proving we understand your challenges and can solve them.', 'General', 6);

-- Insert sample case studies
INSERT INTO case_studies (company_type, location, problem, solution, results, testimonial, client_name, client_role, display_order) VALUES
  ('Custom Home Builder', 'Brisbane, QLD', 'Spending 15+ hours per week on admin work, losing track of quotes, and struggling to follow up with leads effectively', 'Implemented automated quoting system, CRM integration, and AI-powered lead scoring and follow-up sequences', 'Reduced admin time by 70%, increased quote-to-close rate from 22% to 41%, and generated 28 qualified leads in first month', 'The systems Plandepa built have completely transformed how we operate. I''m spending time on sites and with clients again, not drowning in paperwork. Best investment we''ve made.', 'Mark Thompson', 'Owner & Director', 1),
  ('Commercial Electrical Contractor', 'Sydney, NSW', 'Using 6 different software tools that didn''t talk to each other, leading to double data entry and missed opportunities', 'Created unified business hub connecting estimating, project management, accounting, and communication tools with automated workflows', 'Eliminated 12 hours of duplicate data entry per week, reduced quote preparation time by 60%, improved project margin tracking by 35%', 'We finally have one source of truth for our business. The integration work they did was seamless and the time savings are incredible. Plus the lead gen system has kept our pipeline full.', 'Sarah Chen', 'Operations Manager', 2),
  ('Residential Renovation Specialist', 'Melbourne, VIC', 'Relying entirely on referrals and word-of-mouth, with unpredictable revenue and no systematic way to generate new business', 'Launched targeted lead generation campaign with AI qualification, automated nurture sequences, and CRM integration for tracking', 'Generated 156 qualified leads in 6 months, maintained 38% conversion rate, increased annual revenue by $340,000', 'The lead quality is outstanding - these are people ready to renovate, not tire-kickers. The ROI has been incredible and the automated follow-up means nothing falls through the cracks.', 'David Martinez', 'Managing Director', 3);
