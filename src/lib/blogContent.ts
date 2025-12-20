import { parseMarkdownDocument } from "@/lib/markdownUtils";
import { getAssetUrl } from "@/lib/assetPath";

const baseUrl = (import.meta.env.BASE_URL ?? "/").replace(/\/+$/, "");
const normalizeImage = (img?: string) => {
  if (!img) return "";
  if (/^https?:\/\//i.test(img)) return img;
  const cleaned = img.replace(/^\.?\/*/, "");
  return `${baseUrl}/${cleaned}`;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  tags?: string[];
  authorUrls?: string[];
  authorEmails?: string[];
  authors?: string[];
  permalink?: string;
  featured?: boolean;
  content: string;
  image: string;
  imageAlt?: string;
};

export const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const manifestRes = await fetch(getAssetUrl("data/posts/posts.csv"));
  if (!manifestRes.ok) {
    return [];
  }
  const raw = await manifestRes.text();
  const lines = raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const [header, ...rows] = lines;
  const hasFeaturedColumn = header.toLowerCase().includes("featured");

  type ManifestRow = { filename: string; featured?: string };
  const manifestRows: ManifestRow[] = rows.map((row) => {
    const parts = row.split(",");
    const [filename, featured] = hasFeaturedColumn
      ? [parts[0]?.trim(), parts[1]?.trim()]
      : [row.trim(), undefined];
    return { filename, featured };
  });

  const files = manifestRows
    .map((row) => row.filename)
    .filter((filename): filename is string => Boolean(filename && filename.toLowerCase() !== "filename"));

  const posts = await Promise.all(
    files.map(async (file, index) => {
      const manifestRow = manifestRows[index];
      const res = await fetch(getAssetUrl(`data/posts/${file}`));
      if (!res.ok) {
        return null;
      }
      const raw = await res.text();
      const { frontmatter, content } = parseMarkdownDocument(raw);
      
      // Handle categories array - take first category
      let category = frontmatter.category || "";
      if (frontmatter.categories) {
        const categoriesStr = frontmatter.categories
          .replace(/\[/g, "")
          .replace(/\]/g, "");
        const categoriesArr = categoriesStr.split(",").map((c) => c.trim());
        category = categoriesArr[0] || "";
      }
      
      // Handle image path variations and alt text
      const rawImage = frontmatter.image || frontmatter["image.path"] || "";
      const image = normalizeImage(rawImage);
      const imageAlt =
        frontmatter["image.alt"] ||
        frontmatter.imageAlt ||
        "";
      
      // Normalize permalink (for compatibility with existing site URLs)
      const permalink = frontmatter.permalink
        ? String(frontmatter.permalink).trim()
        : "";
      
      // Generate ID (slug) for routing
      let id = frontmatter.id || "";
      if (!id) {
        if (permalink) {
          const segments = permalink.split("/").filter(Boolean);
          id = segments[segments.length - 1] || file.replace(".md", "");
        } else {
          id = file.replace(".md", "");
        }
      }

      // Parse tags from frontmatter if present
      let tags: string[] | undefined;
      if (frontmatter.tags) {
        const tagsStr = frontmatter.tags
          .replace(/\[/g, "")
          .replace(/\]/g, "");
        tags = tagsStr
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
      }

      // Parse authors from frontmatter (supports author or authors)
      let authors: string[] | undefined;
      if (frontmatter.authors) {
        const authorsStr = String(frontmatter.authors)
          .replace(/\[/g, "")
          .replace(/\]/g, "");
        authors = authorsStr
          .split(",")
          .map((name) => name.trim())
          .filter(Boolean);
      } else if (frontmatter.author) {
        const single = String(frontmatter.author).trim();
        if (single) {
          authors = [single];
        }
      }

      // Optional author URLs (comma-separated, parallel to authors)
      let authorUrls: string[] | undefined;
      const rawAuthorUrls =
        frontmatter.author_urls ?? frontmatter.authorUrls ?? "";
      if (rawAuthorUrls) {
        const urlsStr = String(rawAuthorUrls)
          .replace(/\[/g, "")
          .replace(/\]/g, "");
        authorUrls = urlsStr
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean);
      }

      // Optional author emails (comma-separated, parallel to authors)
      let authorEmails: string[] | undefined;
      const rawAuthorEmails =
        frontmatter.author_emails ?? frontmatter.authorEmails ?? "";
      if (rawAuthorEmails) {
        const emailsStr = String(rawAuthorEmails)
          .replace(/\[/g, "")
          .replace(/\]/g, "");
        authorEmails = emailsStr
          .split(",")
          .map((email) => email.trim())
          .filter(Boolean);
      }

      // Align parallel arrays (urls/emails) to authors length
      if (authors) {
        if (authorUrls) {
          if (authorUrls.length > authors.length) {
            authorUrls = authorUrls.slice(0, authors.length);
          } else if (authorUrls.length < authors.length) {
            authorUrls = [
              ...authorUrls,
              ...Array(authors.length - authorUrls.length).fill(""),
            ];
          }
        }
        if (authorEmails) {
          if (authorEmails.length > authors.length) {
            authorEmails = authorEmails.slice(0, authors.length);
          } else if (authorEmails.length < authors.length) {
            authorEmails = [
              ...authorEmails,
              ...Array(authors.length - authorEmails.length).fill(""),
            ];
          }
        }
      }

      // Featured / pinned flag
      const featuredFlag = (frontmatter.pin ?? frontmatter.featured ?? "")
        .toString()
        .trim()
        .toLowerCase();
      const featuredFromFrontmatter = featuredFlag === "true";
      const featuredFromManifest =
        manifestRow?.featured?.toString().trim().toLowerCase() === "true";
      const featured = featuredFromFrontmatter || featuredFromManifest;
      
      return {
        id,
        title: frontmatter.title || "",
        date: frontmatter.date || "",
        excerpt:
          frontmatter.excerpt ||
          content
            .slice(0, 150)
            .replace(/[#*_]/g, "")
            .replace(/\[/g, "")
            .replace(/\]/g, "")
            .trim() + "...",
        category,
        tags,
        authorUrls,
        authorEmails,
        authors,
        permalink,
        featured,
        image,
        imageAlt,
        content,
      } as BlogPost;
    })
  );
  return posts.filter((post): post is BlogPost => Boolean(post && post.title)).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

export const getAllCategories = (posts: BlogPost[]) => {
  const categories = posts.map((post) => post.category).filter(Boolean);
  return Array.from(new Set(categories));
};
