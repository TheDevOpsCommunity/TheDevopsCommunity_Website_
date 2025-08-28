export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  published_at: string;
  reading_time: number;
  content: string;
  tags: string[];
  authors: string[];
}

export interface BlogApiResponse {
  blogs: BlogPost[];
  total: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  categories: string[];
}

export interface BlogFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest' | 'title' | 'category';
}