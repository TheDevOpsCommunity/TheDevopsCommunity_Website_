import { BlogPost, BlogApiResponse, BlogFilters } from "@/types/blog";

// For development, we'll use mock data
// In production, these would make actual API calls
export async function getAllBlogs(filters?: BlogFilters): Promise<BlogApiResponse> {
  try {
    // Build query parameters
    const params = new URLSearchParams();
    if (filters?.page) params.append('page', filters.page.toString());
    if (filters?.limit) params.append('limit', filters.limit.toString());
    if (filters?.sort) params.append('sort', filters.sort);
    if (filters?.category && filters.category !== 'All Categories') {
      params.append('category', filters.category);
    }
    if (filters?.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = queryString ? `/api/blogs?${queryString}` : '/api/blogs';
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch blogs');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw new Error('Failed to load blogs. Please try again later.');
  }
}

export async function getBlogById(id: string): Promise<BlogPost> {
  try {
    // In production, this would be:
    // const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
    // return await response.json();
    
    // For now, use mock API route
    const response = await fetch(`/api/blogs/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog post not found');
      }
      throw new Error('Failed to fetch blog post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching blog:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to load blog post. Please try again later.');
  }
}

export async function getBlogsByCategory(category: string, filters?: Omit<BlogFilters, 'category'>): Promise<BlogApiResponse> {
  try {
    return await getAllBlogs({ ...filters, category });
  } catch (error) {
    console.error('Error fetching blogs by category:', error);
    throw new Error('Failed to load blogs. Please try again later.');
  }
}

export async function searchBlogs(query: string, filters?: Omit<BlogFilters, 'search'>): Promise<BlogApiResponse> {
  try {
    return await getAllBlogs({ ...filters, search: query });
  } catch (error) {
    console.error('Error searching blogs:', error);
    throw new Error('Failed to search blogs. Please try again later.');
  }
}

// Utility function to format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Utility function to get relative time
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateString);
  }
}

// Utility function to estimate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}