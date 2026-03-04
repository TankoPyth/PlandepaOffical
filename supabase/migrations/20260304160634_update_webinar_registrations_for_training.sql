/*
  # Update Webinar Registrations for AI Training Education

  1. Changes to webinar_registrations table
    - Rename `name` to `full_name` for consistency
    - Rename `company` to `company_name` for consistency
    - Add `webinar_type` column to distinguish between offerings
    - Add `message` column for additional context
    - Update status values and default
    - Rename `webinar_date` to `preferred_date` for clarity

  2. Security
    - Update RLS policies for public insert access
*/

-- Add new columns if they do not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN full_name text;
    -- Copy data from name if it exists
    UPDATE webinar_registrations SET full_name = name WHERE name IS NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'company_name'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN company_name text;
    -- Copy data from company if it exists
    UPDATE webinar_registrations SET company_name = company WHERE company IS NOT NULL;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'webinar_type'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN webinar_type text DEFAULT 'free_webinar';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'message'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN message text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'webinar_registrations' AND column_name = 'preferred_date'
  ) THEN
    ALTER TABLE webinar_registrations ADD COLUMN preferred_date text;
    -- Copy data from webinar_date if it exists
    UPDATE webinar_registrations SET preferred_date = webinar_date WHERE webinar_date IS NOT NULL;
  END IF;
END $$;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Service role can manage all registrations" ON webinar_registrations;
DROP POLICY IF EXISTS "Anyone can create registrations" ON webinar_registrations;
DROP POLICY IF EXISTS "Public users can insert registrations" ON webinar_registrations;

-- Create new policies
CREATE POLICY "Anyone can create registrations"
  ON webinar_registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Service role can manage all registrations"
  ON webinar_registrations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Add indexes for new columns if they do not exist
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_type ON webinar_registrations(webinar_type);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email_new ON webinar_registrations(email);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_created_new ON webinar_registrations(created_at DESC);
