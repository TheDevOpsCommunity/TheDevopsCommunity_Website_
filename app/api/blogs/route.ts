import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { BlogApiResponse } from '@/types/blog';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Predefined categories
const categories = ['All Categories', 'DevOps', 'Kubernetes', 'AWS', 'Azure', 'Infrastructure', 'Data Science', 'Security', 'Monitoring'];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build the query
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    // Filter by category
    if (category && category !== 'All Categories') {
      query = query.eq('category', category);
    }

    // Execute the query
    const { data: blogs, error } = await query;

    if (error) {
      console.error('Error fetching blogs from Supabase:', error);
      return NextResponse.json(
        { error: 'Failed to fetch blogs' },
        { status: 500 }
      );
    }

    let filteredBlogs = blogs || [];

    // Client-side search filtering (since Supabase text search can be complex)
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm) ||
        blog.summary.toLowerCase().includes(searchTerm) ||
        blog.content.toLowerCase().includes(searchTerm) ||
        (blog.tags && blog.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm)))
      );
    }

    // Transform data to match frontend expectations
    const transformedBlogs = filteredBlogs.map(blog => ({
      _id: blog.id,
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary,
      category: blog.category,
      published_at: blog.published_at,
      reading_time: blog.reading_time,
      cover_image: blog.cover_image,
      content: blog.content,
      code_snippets: blog.code_snippets || [],
      images: blog.images || [],
      tags: blog.tags || [],
      authors: blog.authors || []
    }));

    const response: BlogApiResponse = {
      blogs: transformedBlogs,
      total: transformedBlogs.length,
      categories
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}