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

export default async function Head({ params }: { params: { id: string } }) {
  const baseUrl = await getBaseUrl();
  const blog = await fetchBlog(params.id);

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

  const url = `${baseUrl}/blog/${params.id}`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="DevOps Community" />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical & misc */}
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
    </>
  );
}


