import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { calculateReadingTime } from "@/lib/readingTime";

interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  image?: string;
  tags?: string[];
  content: string;
  permalink?: string;
}

interface RelatedPostsProps {
  currentPostId: string;
  currentCategory: string;
  currentTags?: string[];
  allPosts: BlogPost[];
  maxPosts?: number;
}

export const RelatedPosts = ({
  currentPostId,
  currentCategory,
  currentTags = [],
  allPosts,
  maxPosts = 3,
}: RelatedPostsProps) => {
  // Find related posts based on category and tags
  const relatedPosts = allPosts
    .filter((post) => post.id !== currentPostId)
    .map((post) => {
      let score = 0;
      
      // Same category gets highest priority
      if (post.category === currentCategory) {
        score += 10;
      }
      
      // Matching tags get points
      if (post.tags && currentTags) {
        const matchingTags = post.tags.filter((tag) =>
          currentTags.includes(tag)
        );
        score += matchingTags.length * 3;
      }
      
      return { post, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime())
    .slice(0, maxPosts)
    .map(({ post }) => post);

  // If no related posts found, show recent posts
  const postsToShow = relatedPosts.length > 0
    ? relatedPosts
    : allPosts
        .filter((post) => post.id !== currentPostId)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, maxPosts);

  if (postsToShow.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-border">
      <h2 className="text-lg font-semibold text-foreground mb-4">
        Related Posts
      </h2>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {postsToShow.map((post) => (
          <Link
            key={post.id}
            to={post.permalink || `/blog/${post.id}`}
            className="group block rounded-md border border-border bg-card/40 px-3 py-2 hover:border-primary/40 hover:bg-accent/30 transition-colors"
          >
            <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};
