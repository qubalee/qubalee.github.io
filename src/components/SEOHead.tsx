import { useEffect } from "react";
import {
  generateStructuredData,
  type SEOData,
  type PersonStructuredData,
  type BlogPostStructuredData,
} from "@/lib/seoUtils";

interface SEOHeadProps extends SEOData {
  structuredData?: "person" | "blogPost";
  structuredDataProps?: PersonStructuredData | BlogPostStructuredData;
}

export const SEOHead = ({
  title,
  description,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
  tags,
  structuredData,
  structuredDataProps,
}: SEOHeadProps) => {
  useEffect(() => {
    // Set document title
    document.title = title;

    // Helper to set or update meta tags
    const setMeta = (property: string, content: string, isProperty = true) => {
      const attr = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attr}="${property}"]`);
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMeta("description", description, false);
    if (tags && tags.length > 0) {
      setMeta("keywords", tags.join(", "), false);
    }

    // Open Graph tags
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", url);
    setMeta("og:type", type);
    if (image) {
      setMeta("og:image", image);
    }

    // Twitter Card tags
    setMeta("twitter:card", "summary_large_image", false);
    setMeta("twitter:title", title, false);
    setMeta("twitter:description", description, false);
    if (image) {
      setMeta("twitter:image", image, false);
    }

    // Article-specific tags
    if (type === "article") {
      if (publishedTime) {
        setMeta("article:published_time", publishedTime);
      }
      if (modifiedTime) {
        setMeta("article:modified_time", modifiedTime);
      }
      if (author) {
        setMeta("article:author", author);
      }
      if (tags) {
        tags.forEach((tag) => {
          setMeta("article:tag", tag);
        });
      }
    }

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    // Structured Data (JSON-LD)
    if (structuredData && structuredDataProps) {
      const data = generateStructuredData(structuredData, structuredDataProps);
      if (data) {
        let script = document.querySelector('script[type="application/ld+json"]');
        if (!script) {
          script = document.createElement("script");
          script.setAttribute("type", "application/ld+json");
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(data);
      }
    }
  }, [title, description, image, url, type, publishedTime, modifiedTime, author, tags, structuredData, structuredDataProps]);

  return null;
};
