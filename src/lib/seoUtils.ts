export interface SEOData {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
}

export interface PersonStructuredData {
  name: string;
  jobTitle?: string;
  affiliation?: string;
  socialLinks?: string[];
  url?: string;
  image?: string;
}

export interface BlogPostStructuredData {
  title: string;
  image?: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  description: string;
  url: string;
  tags?: string[];
  baseUrl: string;
  publisherLogo?: string;
}

export function generateStructuredData(
  type: "person",
  data: PersonStructuredData
): Record<string, unknown> | null;
export function generateStructuredData(
  type: "blogPost",
  data: BlogPostStructuredData
): Record<string, unknown> | null;
export function generateStructuredData(
  type: "person" | "blogPost",
  data: PersonStructuredData | BlogPostStructuredData
) {
  if (type === "person") {
    const person = data as PersonStructuredData;
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.name,
      jobTitle: person.jobTitle,
      affiliation: person.affiliation
        ? {
            "@type": "Organization",
            name: person.affiliation,
          }
        : undefined,
      sameAs: person.socialLinks || [],
      url: person.url,
      image: person.image,
    };
  }

  if (type === "blogPost") {
    const blogPost = data as BlogPostStructuredData;
    return {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blogPost.title,
      image: blogPost.image,
      datePublished: blogPost.publishedTime,
      dateModified: blogPost.modifiedTime || blogPost.publishedTime,
      author: {
        "@type": "Person",
        name: blogPost.author,
      },
      publisher: {
        "@type": "Organization",
        name: "ALQUBALEE Notes",
        logo: {
          "@type": "ImageObject",
          url:
            blogPost.publisherLogo ||
            new URL(
              "abdullah.jpg",
              `${blogPost.baseUrl}${import.meta.env.BASE_URL || "/"}`
            ).toString(),
        },
      },
      description: blogPost.description,
      url: blogPost.url,
      keywords: blogPost.tags?.join(", "),
    };
  }

  return null;
};
