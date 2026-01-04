/*
  # Update Contact Submissions Table Schema

  1. Changes
    - Rename `name` column to `full_name`
    - Rename `company` column to `company_name`
    - Add `phone_number` column (nullable text)
    - Add `source_page` column (text, default 'contact')
    - Add `status` column (text, default 'new')
    - Add `created_at` column (timestamptz, default now())

  2. Security
    - Policies remain the same (public can insert, authenticated can read/update)

  3. Important Notes
    - Using DO blocks to safely add columns if they don't exist
    - Preserving existing data during column renames
*/

-- Rename 'name' to 'full_name' if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'name'
  ) THEN
    ALTER TABLE contact_submissions RENAME COLUMN name TO full_name;
  END IF;
END $$;

-- Rename 'company' to 'company_name' if needed
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'company'
  ) THEN
    ALTER TABLE contact_submissions RENAME COLUMN company TO company_name;
  END IF;
END $$;

-- Add phone_number column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'phone_number'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN phone_number text;
  END IF;
END $$;

-- Add source_page column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'source_page'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN source_page text DEFAULT 'contact';
  END IF;
END $$;

-- Add status column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'status'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN status text DEFAULT 'new';
  END IF;
END $$;

-- Add created_at column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'contact_submissions' AND column_name = 'created_at'
  ) THEN
    ALTER TABLE contact_submissions ADD COLUMN created_at timestamptz DEFAULT now();
  END IF;
END $$;

-- Add indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source_page ON contact_submissions(source_page);
