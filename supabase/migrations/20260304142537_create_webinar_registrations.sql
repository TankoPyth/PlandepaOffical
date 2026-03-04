/*
  # Create Webinar Registrations Table

  1. New Tables
    - `webinar_registrations`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of registrant
      - `email` (text, required) - Email address
      - `company` (text, required) - Company name
      - `phone` (text, optional) - Phone number
      - `webinar_date` (text, required) - Date of webinar
      - `registration_source` (text) - Where they registered from
      - `status` (text) - Registration status (registered, attended, cancelled, no_show)
      - `created_at` (timestamptz) - Registration timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `webinar_registrations` table
    - Add policy for authenticated users (admin) to manage registrations
    - Add policy for public to insert registrations (for the form)

  3. Indexes
    - Index on email for quick lookups
    - Index on webinar_date for filtering by event
    - Index on created_at for chronological sorting
*/

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create webinar_registrations table
CREATE TABLE IF NOT EXISTS webinar_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text NOT NULL,
  phone text,
  webinar_date text NOT NULL,
  registration_source text DEFAULT 'homepage_hero',
  status text DEFAULT 'registered',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE webinar_registrations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to insert registrations (for the form submission)
CREATE POLICY "Anyone can register for webinar"
  ON webinar_registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow authenticated users to read all registrations
CREATE POLICY "Authenticated users can read all registrations"
  ON webinar_registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Allow authenticated users to update registrations
CREATE POLICY "Authenticated users can update registrations"
  ON webinar_registrations
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy: Allow authenticated users to delete registrations
CREATE POLICY "Authenticated users can delete registrations"
  ON webinar_registrations
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_email ON webinar_registrations(email);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_webinar_date ON webinar_registrations(webinar_date);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_created_at ON webinar_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_webinar_registrations_status ON webinar_registrations(status);

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_webinar_registrations_updated_at ON webinar_registrations;
CREATE TRIGGER update_webinar_registrations_updated_at
  BEFORE UPDATE ON webinar_registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
