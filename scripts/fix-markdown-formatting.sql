-- Fix existing markdown formatting issues in blog_posts table
-- Run this in your Supabase SQL editor

-- 1. Fix bullet point formatting (* to -)
UPDATE blog_posts 
SET content = REPLACE(content, '*   ', '- ')
WHERE content LIKE '%*   %';

UPDATE blog_posts 
SET content = REPLACE(content, '* ', '- ')
WHERE content LIKE '%* %' AND content NOT LIKE '%- %';

-- 2. Fix numbered list spacing (1.  to 1. )
UPDATE blog_posts 
SET content = REGEXP_REPLACE(content, '(\d+)\.  ', '\1. ', 'g')
WHERE content ~ '\d+\.  ';

-- 3. Fix heading spacing (add double newlines)
UPDATE blog_posts 
SET content = REGEXP_REPLACE(content, '(\n)(#{1,6} )', '\1\1\2', 'g')
WHERE content ~ '\n#{1,6} ';

-- 4. Fix paragraph breaks after headings
UPDATE blog_posts 
SET content = REGEXP_REPLACE(content, '(#{1,6} [^\n]+)(\n)([^#\n])', '\1\2\2\3', 'g')
WHERE content ~ '#{1,6} [^\n]+\n[^#\n]';

-- 5. Clean up excessive newlines (more than 2 consecutive)
UPDATE blog_posts 
SET content = REGEXP_REPLACE(content, '\n{3,}', '\n\n', 'g')
WHERE content ~ '\n{3,}';

-- Verify the changes
SELECT 
  slug,
  LENGTH(content) as content_length,
  (content ~ '\n\n') as has_double_breaks,
  (content ~ '\*   ') as has_bad_bullets,
  (content ~ '\d+\.  ') as has_bad_numbers
FROM blog_posts 
WHERE slug = 'practical-gitops-with-argocd-and-kubernetes';

-- Example output should show:
-- has_double_breaks: true
-- has_bad_bullets: false  
-- has_bad_numbers: false