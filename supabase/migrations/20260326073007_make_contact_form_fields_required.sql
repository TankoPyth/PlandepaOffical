/*
  # Make all contact form fields required

  1. Changes
    - Update existing NULL values with default text
    - Set `company_name` column to NOT NULL with default value
    - Set `phone_number` column to NOT NULL with default value
    - These changes ensure data integrity and match the frontend validation
  
  2. Security
    - No changes to RLS policies
*/

-- Update existing NULL values to prevent constraint violation
UPDATE contact_submissions 
SET company_name = 'Not provided' 
WHERE company_name IS NULL;

UPDATE contact_submissions 
SET phone_number = 'Not provided' 
WHERE phone_number IS NULL;

-- Make company_name required with default
ALTER TABLE contact_submissions 
ALTER COLUMN company_name SET DEFAULT 'Not provided',
ALTER COLUMN company_name SET NOT NULL;

-- Make phone_number required with default
ALTER TABLE contact_submissions 
ALTER COLUMN phone_number SET DEFAULT 'Not provided',
ALTER COLUMN phone_number SET NOT NULL;