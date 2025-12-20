import { useEffect, useState } from "react";
import { BlogPost, fetchBlogPosts } from "@/lib/blogContent";

export const useBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBlogPosts();
        if (!canceled) {
          setPosts(data);
        }
      } catch (err) {
        if (!canceled) {
          setError(err instanceof Error ? err.message : "Failed to load blog posts");
        }
      } finally {
        if (!canceled) setIsLoading(false);
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, []);

  return { posts, isLoading, error };
};
