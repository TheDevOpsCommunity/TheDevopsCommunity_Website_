export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  published_at: string;
  reading_time: number;
  cover_image: string;
  content: string;
  code_snippets: Array<{
    language: string;
    code: string;
    description?: string;
  }>;
  images: string[];
  tags: string[];
  authors: string[];
}

export interface BlogApiResponse {
  blogs: BlogPost[];
  total: number;
  categories: string[];
}

export interface BlogFilters {
  category?: string;
  search?: string;
}