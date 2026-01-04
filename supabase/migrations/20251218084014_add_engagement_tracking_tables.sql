/*
  # Add Engagement Tracking Tables

  1. Changes
    - Add `source` and `active` columns to `newsletter_subscribers`
    - Create `blog_post_views` table
    - Create `social_shares` table

  2. Security
    - Enable RLS on new tables
    - Add appropriate policies for public access
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'source'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN source text DEFAULT 'blog';
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'newsletter_subscribers' AND column_name = 'active'
  ) THEN
    ALTER TABLE newsletter_subscribers ADD COLUMN active boolean DEFAULT true;
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS blog_post_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL,
  view_count integer DEFAULT 1,
  last_viewed_at timestamptz DEFAULT now(),
  UNIQUE(post_slug)
);

CREATE TABLE IF NOT EXISTS social_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_slug text NOT NULL,
  platform text NOT NULL,
  shared_at timestamptz DEFAULT now()
);

ALTER TABLE blog_post_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'blog_post_views' AND policyname = 'Anyone can view blog post views'
  ) THEN
    CREATE POLICY "Anyone can view blog post views"
      ON blog_post_views FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'blog_post_views' AND policyname = 'Anyone can increment blog post views'
  ) THEN
    CREATE POLICY "Anyone can increment blog post views"
      ON blog_post_views FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'blog_post_views' AND policyname = 'Anyone can update blog post views'
  ) THEN
    CREATE POLICY "Anyone can update blog post views"
      ON blog_post_views FOR UPDATE
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'social_shares' AND policyname = 'Anyone can view social shares'
  ) THEN
    CREATE POLICY "Anyone can view social shares"
      ON social_shares FOR SELECT
      USING (true);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'social_shares' AND policyname = 'Anyone can record social shares'
  ) THEN
    CREATE POLICY "Anyone can record social shares"
      ON social_shares FOR INSERT
      WITH CHECK (true);
  END IF;
END $$;