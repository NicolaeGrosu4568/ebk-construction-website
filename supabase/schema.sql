-- ============================================
-- EBK Construction LTD — Database Schema
-- ============================================

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  archived BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  short_description TEXT,
  full_description TEXT,
  cover_image_url TEXT,
  images JSONB DEFAULT '[]',
  published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_role TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES
-- ============================================

-- contact_submissions: doar server (service role) poate citi/scrie
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON contact_submissions
  USING (false);

-- projects: oricine poate citi cele publicate
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published projects" ON projects
  FOR SELECT USING (published = true);

-- testimonials: oricine poate citi cele publicate
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published testimonials" ON testimonials
  FOR SELECT USING (published = true);

-- blog_posts: oricine poate citi cele publicate
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- ============================================
-- STORAGE BUCKET
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Oricine poate vedea imaginile
CREATE POLICY "Public read portfolio images" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');

-- Doar service role poate uploada
CREATE POLICY "Service role upload" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');
