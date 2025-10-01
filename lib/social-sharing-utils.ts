/**
 * Utility functions for social sharing and meta tag management
 */

export interface SocialSharingData {
  title: string;
  description: string;
  image: string;
  url: string;
  siteName: string;
  author?: string;
  publishedTime?: string;
  tags?: string[];
}

/**
 * Generate enhanced sharing messages for different platforms
 */
export function generateShareMessages(data: SocialSharingData) {
  const { title, description, url } = data;
  
  return {
    facebook: `${title} - ${description}`,
    twitter: `🚀 ${title}\n\n${description}\n\n#DevOps #CloudComputing #Infrastructure`,
    whatsapp: `📚 *${title}*\n\n${description}\n\nRead more: ${url}`,
    linkedin: `${title} - ${description}`,
    telegram: `📖 *${title}*\n\n${description}\n\n🔗 ${url}`,
    instagram: `${title} - ${description}\n\n${url}`,
  };
}

/**
 * Generate share URLs for different platforms
 */
export function generateShareUrls(data: SocialSharingData) {
  const { url } = data;
  const messages = generateShareMessages(data);
  
  const encodedUrl = encodeURIComponent(url);
  
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(messages.twitter)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(messages.whatsapp)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodeURIComponent(messages.telegram)}`,
  };
}

/**
 * Generate Open Graph meta tags
 */
export function generateOpenGraphTags(data: SocialSharingData) {
  const { title, description, image, url, siteName, author, publishedTime, tags } = data;
  
  return {
    'og:type': 'article',
    'og:title': `${title} | ${siteName}`,
    'og:description': `${description} | Read more DevOps insights, tutorials, and best practices on ${siteName}.`,
    'og:url': url,
    'og:image': image,
    'og:site_name': siteName,
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': title,
    'og:locale': 'en_US',
    'og:updated_time': new Date().toISOString(),
    'og:image:type': 'image/jpeg',
    'og:image:secure_url': image,
    ...(author && { 'article:author': author }),
    ...(publishedTime && { 'article:published_time': publishedTime }),
    ...(publishedTime && { 'article:modified_time': new Date().toISOString() }),
    ...(publishedTime && { 'article:expiration_time': new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() }),
    ...(tags && { 'article:tag': tags.join(', ') }),
    'article:section': 'DevOps',
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(data: SocialSharingData) {
  const { title, description, image } = data;
  
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': '@devops_community',
    'twitter:creator': '@devops_community',
    'twitter:title': `${title} | DevOps Community Blog`,
    'twitter:description': `${description} | Read more DevOps insights, tutorials, and best practices on DevOps Community Blog.`,
    'twitter:image': image,
    'twitter:image:alt': title,
  };
}

/**
 * Generate structured data (JSON-LD) for SEO
 */
export function generateStructuredData(data: SocialSharingData) {
  const { title, description, image, url, author, publishedTime, tags } = data;
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": `${description} | Read more DevOps insights, tutorials, and best practices on DevOps Community Blog.`,
    "image": image,
    "author": {
      "@type": "Person",
      "name": author || "DevOps Community"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DevOps Community",
      "logo": {
        "@type": "ImageObject",
        "url": `${new URL(url).origin}/logo.svg`
      }
    },
    "datePublished": publishedTime,
    "dateModified": publishedTime,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "keywords": tags?.join(', ') || 'DevOps, Cloud Computing, Infrastructure',
    "articleSection": "DevOps",
  };
}

/**
 * Debug function to log all meta tags (for development)
 */
export function debugMetaTags() {
  if (typeof window === 'undefined') return;
  
  const metaTags = document.querySelectorAll('meta[property], meta[name]');
  const structuredData = document.querySelector('script[type="application/ld+json"]');
  
  console.group('🔍 Social Sharing Meta Tags Debug');
  
  metaTags.forEach(tag => {
    const property = tag.getAttribute('property') || tag.getAttribute('name');
    const content = tag.getAttribute('content');
    console.log(`${property}: ${content}`);
  });
  
  if (structuredData) {
    console.log('Structured Data:', JSON.parse(structuredData.textContent || '{}'));
  }
  
  console.groupEnd();
}
