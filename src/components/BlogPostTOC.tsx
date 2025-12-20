import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import type { Heading } from "@/lib/headingUtils";

interface BlogPostTOCProps {
  headings: Heading[];
}

export const BlogPostTOC = ({ headings }: BlogPostTOCProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav className="hidden lg:block sticky top-24 w-64 h-fit max-h-[calc(100vh-8rem)] overflow-auto">
      <div className="pr-4">
        <h2 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">
          On This Page
        </h2>
        <ul className="space-y-2 text-sm border-l border-border">
          {headings.map((heading) => (
            <li
              key={heading.id}
              className={cn(
                "transition-colors",
                heading.level === 3 && "ml-4"
              )}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  "block py-1 px-3 border-l-2 -ml-px transition-all hover:text-foreground",
                  activeId === heading.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:border-border"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
