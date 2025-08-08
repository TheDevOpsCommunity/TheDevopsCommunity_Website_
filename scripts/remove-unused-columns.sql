-- SQL script to remove unused columns from blog_posts table
-- Run this in your Supabase SQL editor

-- First, let's see what columns currently exist
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'blog_posts';

-- Drop the unused columns
ALTER TABLE blog_posts 
DROP COLUMN IF EXISTS cover_image;

ALTER TABLE blog_posts 
DROP COLUMN IF EXISTS code_snippets;

ALTER TABLE blog_posts 
DROP COLUMN IF EXISTS images;

-- Verify the remaining columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- Expected remaining columns:
-- id (uuid)
-- title (text)
-- slug (text)
-- summary (text)
-- category (text)
-- content (text)
-- published_at (timestamptz)
-- updated_at (timestamptz)
-- reading_time (integer)
-- tags (text[])
-- authors (text[])