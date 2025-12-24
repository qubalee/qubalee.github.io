import profilePlaceholder from "@/assets/profile-placeholder.jpg";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useCsvData } from "@/hooks/useCsvData";
import { Link as RouterLink } from "react-router-dom";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Atom,
  ShieldCheck,
  Database,
  Link,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SocialLinkRow = {
  label: string;
  link: string;
  iconKey?: string;
};

const About = () => {
  const { name, role, photo, email } = useSiteInfo();
  const { content, error } = useAboutContent();
  const { sections } = useSectionsConfig();
  const { data: socialLinks } = useCsvData<SocialLinkRow>("/data/social-links.csv");

  const renderedContent = (content ?? "")
    .replace(/\{\{name\}\}/g, name)
    .replace(/\{\{role\}\}/g, role);

  const socialEntries: SocialLinkRow[] = [
    ...(email
      ? [
          {
            label: "Email",
            link: `mailto:${email}`,
            iconKey: "Mail",
          },
        ]
      : []),
    ...socialLinks,
  ];

  const iconMap: Record<string, LucideIcon> = {
    Mail,
    Twitter,
    Github,
    Linkedin,
    Globe,
    Atom,
    ShieldCheck,
    Database,
    Link,
    BookOpen,
  };

  const researchHref = sections.find((section) => section.id === "research")?.href ?? "/research-archive";
  const publicationsHref = sections.find((section) => section.id === "publications")?.href ?? "/publications";

  const getSocialIcon = (iconKey?: string, label?: string): LucideIcon => {
    if (iconKey && iconMap[iconKey]) {
      return iconMap[iconKey];
    }

    switch (label) {
      case "Twitter":
      case "X":
        return Twitter;
      case "LinkedIn":
        return Linkedin;
      case "GitHub":
        return Github;
      case "Website":
        return Globe;
      case "Email":
        return Mail;
      default:
        return Globe;
    }
  };

  return (
    <section id="about" className="pt-6 pb-8 md:pt-12 md:pb-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-start max-w-6xl mx-auto">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              About Me
            </h2>
            {!content && !error && (
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/6" />
              </div>
            )}
            {error && (
              <p className="text-destructive">{error}</p>
            )}
            {content && (
              <>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {renderedContent}
                  </ReactMarkdown>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <RouterLink to={researchHref}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group px-5 inline-flex items-center gap-2"
                    >
                      Explore research areas
                      <ArrowRight className="h-4 w-4 shrink-0 text-current transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </RouterLink>
                  <RouterLink to={publicationsHref}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="group px-5 inline-flex items-center gap-2"
                    >
                      View publications
                      <ArrowRight className="h-4 w-4 shrink-0 text-current transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </RouterLink>
                </div>
              </>
            )}

            {socialEntries.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Get in Touch
                </h3>
                <div className="flex items-center gap-4 md:gap-5 flex-wrap">
                  {socialEntries.map((entry, index) => {
                    const Icon = getSocialIcon(entry.iconKey, entry.label);
                    const href = entry.link;

                    return (
                      <a
                        key={`${entry.label}-social-${index}`}
                        href={href}
                        target={entry.label === "Email" ? "_self" : "_blank"}
                        rel={entry.label === "Email" ? undefined : "noreferrer"}
                        className="group flex flex-col items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        aria-label={entry.label}
                        title={entry.label}
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="font-medium leading-none">{entry.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
            <div className="order-1 md:order-2">
            <img
              src={photo || profilePlaceholder}
              alt="Profile"
              className="rounded-lg shadow-xl md:shadow-2xl ring-1 ring-border/40 w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
