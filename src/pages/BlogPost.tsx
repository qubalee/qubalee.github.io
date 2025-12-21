import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Tag,
  Clock,
  Printer,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import { calculateReadingTime } from "@/lib/readingTime";
import { SEOHead } from "@/components/SEOHead";
import { RelatedPosts } from "@/components/RelatedPosts";
import { BlogPostTOC } from "@/components/BlogPostTOC";
import { CitationBlock } from "@/components/CitationBlock";
import { extractHeadings } from "@/lib/headingUtils";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { posts, isLoading } = useBlogPosts();
  const { configMap } = useSectionsConfig();
  const blogConfig = configMap.get("blog");
  const blogHref = blogConfig?.href?.trim() || "/notes";
  const post = id ? posts.find((entry) => entry.id === id) : undefined;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate(blogHref)}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const readingTime = calculateReadingTime(post.content);
  const headings = extractHeadings(post.content);

  const suggestions = posts.filter((entry) => entry.id !== post.id).slice(0, 3);

  const enhanceContent = (markdown: string) => {
    // Add IDs to headings for TOC
    let enhanced = markdown.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
      const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `${hashes} <span id="${id}">${text}</span>`;
    });
    
    // Handle prompt-info blocks
    enhanced = enhanced.replace(
      /^>(.+)\r?\n\{:\s*\.prompt-info\s*\}\s*$/gm,
      (_match, quote: string) =>
        `<div class="prompt-info"><p>${quote.trim()}</p></div>`
    );
    
    return enhanced;
  };

  const enhanced = enhanceContent(post.content);

  // SEO data
  const currentUrl = window.location.href;
  const baseUrl = window.location.origin;
  const assetBase = import.meta.env.BASE_URL || "/";
  const seoImage = post.image
    ? post.image.startsWith("http")
      ? post.image
      : new URL(post.image.replace(/^\/+/, ""), baseUrl + assetBase).toString()
    : new URL("abdullah.jpg", baseUrl + assetBase).toString();

  // Citation data
  const citationData = {
    authors: post.authors && post.authors.length > 0 ? post.authors : [],
    title: post.title,
    date: post.date,
    url: currentUrl,
    siteName: "ALQUBALEE Notes",
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title={`${post.title} | ALQUBALEE`}
        description={post.excerpt || post.title}
        image={seoImage}
        url={currentUrl}
        type="article"
        publishedTime={post.date}
        author={post.authors?.[0]}
        tags={post.tags}
        structuredData="blogPost"
        structuredDataProps={{
          title: post.title,
          image: seoImage,
          publishedTime: post.date,
          modifiedTime: post.date,
          author: post.authors?.[0] || "",
          description: post.excerpt || post.title,
          url: currentUrl,
          tags: post.tags,
          baseUrl,
        }}
      />
      <Navigation />
      <main className="flex-1 pt-2 md:pt-4">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-8 max-w-7xl mx-auto">
            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-4xl">
            {/* Post Header */}
            <header className="mb-2 pb-2 border-b border-border">
 {/* Meta row with icons */}
<div className="flex flex-wrap items-center gap-3 mb-3">
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Calendar size={14} />
    <time dateTime={post.date}>
      {new Date(post.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}
    </time>
  </div>
  <div className="flex items-center gap-2 text-sm text-muted-foreground">
    <Clock size={14} />
    <span>{readingTime} min read</span>
  </div>
  <div className="ml-auto flex items-center gap-1">
    <Button variant="ghost" size="icon" aria-label="Print or save as PDF" onClick={() => window.print()}>
      <Printer size={16} />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      aria-label="Share on LinkedIn"
      onClick={() => {
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
      }}
    >
      <Linkedin size={16} />
    </Button>
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy link"
      onClick={() => {
        const url = window.location.href;
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(url).catch(() => {});
        }
      }}
    >
      <LinkIcon size={16} />
    </Button>
  </div>
</div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {post.title}
              </h1>
              {post.authors && post.authors.length > 0 && (
                <div className="mt-3 mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center h-6">By</span>
                  {post.authors.map((author, index) => {
                    const url = post.authorUrls?.[index];
                    const email = post.authorEmails?.[index];
                    const href = url || "";
                    const hasMultiple = post.authors.length > 1;
                    const indexLabel = hasMultiple ? index + 1 : undefined;

                    return (
                      <div
                        key={author}
                        className="flex flex-col items-start leading-tight gap-0.5"
                      >
                        <Badge variant="outline" className="text-xs">
                          <span className="flex items-center gap-1">
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="hover:underline"
                              >
                                {author}
                              </a>
                            ) : (
                              author
                            )}
                            {indexLabel && (
                              <sup className="text-[10px]">{indexLabel}</sup>
                            )}
                          </span>
                        </Badge>
                        {email && (
                          <span
                            className="text-[10px] text-muted-foreground cursor-pointer inline-flex items-center gap-1 group"
                            onClick={() => {
                              if (navigator.clipboard?.writeText) {
                                navigator.clipboard.writeText(email).catch(() => {});
                              }
                            }}
                          >
                            <span>
                              {hasMultiple && indexLabel ? `${indexLabel}. ` : ""}
                              {email}
                            </span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[9px] underline">
                              Copy
                            </span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </header>

            {/* Post Image */}
            {post.image && (
              <div className="mb-8">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {post.imageAlt && (
                  <p className="mt-2 text-sm text-muted-foreground text-center">
                    {post.imageAlt}
                  </p>
                )}
              </div>
            )}

            {/* Post Content */}
            <div className="prose prose-wide prose-slate dark:prose-invert prose-headings:text-foreground prose-headings:font-semibold prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground prose-pre:border prose-pre:border-border prose-a:text-primary hover:prose-a:text-primary/80 prose-a:no-underline hover:prose-a:underline prose-li:text-foreground prose-ul:my-4 prose-ol:my-4 prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-img:rounded-lg prose-img:shadow-md">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {enhanced}
              </ReactMarkdown>
            </div>

            {/* Citation Block */}
            <CitationBlock citationData={citationData} />

            {/* Related Posts */}
            <RelatedPosts
              currentPostId={post.id}
              currentCategory={post.category}
              currentTags={post.tags}
              allPosts={posts}
            />
          </div>

          {/* Table of Contents Sidebar */}
          {headings.length > 0 && <BlogPostTOC headings={headings} />}
        </div>

      </article>
    </main>
    <Footer />
  </div>
);
};

export default BlogPost;
