export interface SearchablePost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags?: string[];
  date: string;
  image?: string;
  permalink?: string;
  imageAlt?: string;
  featured?: boolean;
  authors?: string[];
  authorUrls?: string[];
  authorEmails?: string[];
}

export const searchPosts = <T extends SearchablePost>(query: string, posts: T[]): T[] => {
  if (!query.trim()) return posts;

  const lowerQuery = query.toLowerCase();
  const terms = lowerQuery.split(/\s+/).filter(Boolean);

  return posts.filter((post) => {
    const searchableText = [
      post.title,
      post.excerpt,
      post.content,
      post.category,
      ...(post.tags || []),
    ]
      .join(" ")
      .toLowerCase();

    return terms.every((term) => searchableText.includes(term));
  });
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const terms = query.split(/\s+/).filter(Boolean);
  let highlighted = text;

  terms.forEach((term) => {
    const regex = new RegExp(`(${term})`, "gi");
    highlighted = highlighted.replace(regex, "<mark>$1</mark>");
  });

  return highlighted;
};
