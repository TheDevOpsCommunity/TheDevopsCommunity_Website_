import type { Metadata } from "next";
import { headers } from "next/headers";

type Blog = {
  _id: string;
  title: string;
  summary: string;
  image_url?: string | null;
  published_at?: string;
  tags?: string[];
  authors?: string[];
};

async function getBaseUrl(): Promise<string> {
  const hdrs = await headers();
  const host = hdrs.get("x-forwarded-host") || hdrs.get("host") || "localhost:3000";
  const proto = hdrs.get("x-forwarded-proto") || (host.includes("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

async function fetchBlog(id: string): Promise<Blog | null> {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/blogs/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as Blog;
  } catch {
    return null;
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = await getBaseUrl();
  const blog = await fetchBlog(id);

  const title = blog?.title || "DevOps Community Blog";
  const description = blog?.summary || "Insights, tutorials, and best practices from the DevOps Community.";

  // Ensure absolute image URL
  // Prefer blog image; fallback to a reliable 1200x630 share image
  let image = "https://res.cloudinary.com/dxhl3elv2/image/upload/v1759077856/Blog%20Automation/n0cxaxprsa1hlzczroyh.png";
  const raw = blog?.image_url?.trim();
  if (raw) {
    if (raw.startsWith("http://") || raw.startsWith("https://")) {
      image = raw;
    } else if (raw.startsWith("/")) {
      image = `${baseUrl}${raw}`;
    } else {
      image = `${baseUrl}/${raw}`;
    }
  }

  const url = `${baseUrl}/blog/${id}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url,
      siteName: "DevOps Community",
      images: [
        {
          url: image,
          secureUrl: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}


