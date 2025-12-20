import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import { getAllCategories } from "@/lib/blogContent";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import { calculateReadingTime } from "@/lib/readingTime";
import { BlogSearch } from "@/components/BlogSearch";
import { searchPosts } from "@/lib/searchUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { ArrowRight } from "lucide-react";
import { useCsvData } from "@/hooks/useCsvData";
import AnnouncementBar from "@/components/AnnouncementBar";

type AnnouncementRow = {
  id?: string;
  enabled?: string;
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaLink?: string;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"newest" | "oldest">("newest");
  const [searchQuery, setSearchQuery] = useState("");

  const { posts, isLoading, error } = useBlogPosts();
  const location = useLocation();
  const isArchive =
    location.pathname === "/notes" || location.pathname === "/updates";
  const categories = getAllCategories(posts);
  const { sections } = useSectionsConfig();
  const blogSection = sections.find((section) => section.id === "blog");
  const blogLabel = blogSection?.label ?? "Notes";
  const blogSubtitle = blogSection?.subtitle;
  const blogHref = blogSection?.href ?? "/notes";
  const basePosts = posts;
  const { data: announcements } = useCsvData<AnnouncementRow>("/data/announcements.csv");
  const heroAnnouncement = announcements.find((row) => {
    const enabled = row.enabled ? row.enabled.trim().toLowerCase() !== "false" : true;
    return enabled && row.title && row.message;
  });

  const allTags = useMemo(
    () =>
      Array.from(
        new Set(
          posts.flatMap((post) => post.tags ?? [])
        )
      ).sort((a, b) => a.localeCompare(b)),
    [posts]
  );

  const categoryFilteredPosts = selectedCategory
    ? basePosts.filter((post) => post.category === selectedCategory)
    : basePosts;

  const tagFilteredPosts = selectedTag
    ? categoryFilteredPosts.filter((post) => post.tags?.includes(selectedTag))
    : categoryFilteredPosts;

  const searchedPosts = searchQuery
    ? searchPosts(searchQuery, tagFilteredPosts)
    : tagFilteredPosts;

  const [visibleArchiveCount, setVisibleArchiveCount] = useState(15);
  const homeVisibleCount = 8;

  const sortedPosts = useMemo(
    () =>
      [...searchedPosts].sort((a, b) => {
        const timeA = new Date(a.date).getTime();
        const timeB = new Date(b.date).getTime();
        return sortOption === "newest" ? timeB - timeA : timeA - timeB;
      }),
    [searchedPosts, sortOption]
  );

  const displayedPosts = isArchive
    ? sortedPosts.slice(0, visibleArchiveCount)
    : sortedPosts.slice(0, homeVisibleCount);

  const { tagline, name } = useSiteInfo();
  const headingText = isArchive ? blogLabel : "Latest Notes";
  const subtitleText = !isArchive && tagline ? tagline : blogSubtitle;

  return (
    <section
      id="blog"
      className={
        isArchive ? "pt-10 pb-14 bg-background" : "py-10 md:py-14 bg-background"
      }
    >
      <div className="container mx-auto px-4">
        {isArchive ? (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              {headingText}
            </h2>
            {subtitleText && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {subtitleText}
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/10 via-background to-background shadow-sm">
              <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -right-16 bottom-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative px-6 pt-6 pb-10 md:px-10 md:pt-10 md:pb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold tracking-wide">
                    2026
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    v2.0.0
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                    {headingText} from {name || "the lab"}
                  </h2>
                  {subtitleText && (
                    <p className="text-base md:text-lg text-muted-foreground">
                      {subtitleText}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to={blogHref}>
                    <Button size="lg" className="px-6">
                      Browse all notes
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button size="lg" variant="outline" className="px-6">
                      About
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            {heroAnnouncement && heroAnnouncement.ctaLink && heroAnnouncement.ctaLabel && (
              <AnnouncementBar
                title={heroAnnouncement.title}
                message={heroAnnouncement.message}
                ctaLabel={heroAnnouncement.ctaLabel}
                ctaLink={heroAnnouncement.ctaLink}
                className="border-border/70"
              />
            )}
          </div>
        )}

        {/* Search + filters (archive pages only) */}
        {isArchive && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-center md:gap-4 max-w-5xl mx-auto">
            <div className="w-full md:w-[420px]">
              <BlogSearch
                onSearchChange={setSearchQuery}
                placeholder="Search posts by title, content, or tags..."
                resultCount={searchedPosts.length}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {categories.length > 0 && (
                <Select
                  value={selectedCategory ?? "all"}
                  onValueChange={(value) =>
                    setSelectedCategory(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="w-40 h-9 text-sm">
                    <SelectValue placeholder="Filter by class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All classes</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {allTags.length > 0 && (
                <Select
                  value={selectedTag ?? "all"}
                  onValueChange={(value) =>
                    setSelectedTag(value === "all" ? null : value)
                  }
                >
                  <SelectTrigger className="w-40 h-9 text-sm">
                    <SelectValue placeholder="Filter by tag" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All tags</SelectItem>
                    {allTags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <Select
                value={sortOption}
                onValueChange={(value: "newest" | "oldest") =>
                  setSortOption(value)
                }
              >
                <SelectTrigger className="w-40 h-9 text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest first</SelectItem>
                  <SelectItem value="oldest">Oldest first</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
              >
                <Skeleton className="w-20 h-20 rounded-md flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="text-center text-destructive py-12">{error}</div>
        )}

        {/* Blog Posts List */}
        {!isLoading && !error && displayedPosts.length > 0 && (
          <>
            <div
              className={
                isArchive
                  ? "max-w-4xl mx-auto space-y-3"
                  : "grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }
            >
                {displayedPosts.map((post) => {
                  const readingTime = calculateReadingTime(post.content);
                  const primaryAuthor = post.authors?.[0];

                if (isArchive) {
                  // Existing stacked list layout for archive
                  return (
                    <Link
                      key={post.id}
                      to={post.permalink || `/blog/${post.id}`}
                      className="flex gap-4 p-4 rounded-xl border border-border/70 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      {/* Small Thumbnail */}
                      {post.image && (
                        <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3
                          className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-2"
                          title={post.title}
                        >
                          {post.title}
                        </h3>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                            {primaryAuthor && (
                              <Badge variant="secondary" className="text-xs">
                                {primaryAuthor}
                              </Badge>
                            )}
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <time dateTime={post.date}>
                              {new Date(post.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{readingTime} min read</span>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </Link>
                  );
                }

                // Grid card layout for homepage / non-archive (vertical cards)
                return (
                  <Link
                    key={post.id}
                    to={post.permalink || `/blog/${post.id}`}
                    className="flex flex-col min-h-[420px] h-full rounded-2xl border border-border/70 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow-[0_16px_38px_-22px_rgba(15,23,42,0.55)] hover:shadow-[0_22px_52px_-26px_rgba(15,23,42,0.6)] hover:border-primary/20 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {post.image && (
                      <div className="w-full px-4 pt-4 mb-2">
                        <div className="rounded-xl overflow-hidden bg-gradient-to-br from-slate-100 via-white to-slate-50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950 border border-border/60 dark:border-border/40 aspect-[4/3]">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 flex flex-col min-w-0 px-5 pb-5">
                      <h3
                        className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-3 line-clamp-2 leading-snug"
                        title={post.title}
                      >
                        {post.title}
                      </h3>
                      <div className="mb-4 flex flex-wrap items-center gap-2.5 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} className="opacity-70" />
                          <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </time>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={14} className="opacity-70" />
                          <span>{readingTime} min read</span>
                        </div>
                      </div>
                      <p className="mt-auto text-sm text-muted-foreground leading-relaxed line-clamp-4">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            {/* View All Link (only on main page) */}
            {!isArchive && (
              <div className="mt-8 text-center">
                <Link to={blogHref}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="group px-8 py-3 text-base inline-flex items-center gap-2"
                  >
                    View all notes
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && displayedPosts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No posts found in this category.
          </div>
        )}

        {/* Load more (archive only) */}
        {isArchive && displayedPosts.length < sortedPosts.length && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibleArchiveCount((prev) => prev + 15)}
            >
              Load more notes
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
