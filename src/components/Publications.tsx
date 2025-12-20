import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Book, BookOpenText, FileText, Presentation, Users } from "lucide-react";
import { useCsvData } from "@/hooks/useCsvData";
import { Link } from "react-router-dom";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";

type PublicationRow = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  link: string;
  featured?: string;
};

const Publications = () => {
  const { data, isLoading, error } = useCsvData<PublicationRow>("/data/publications.csv");
  const featuredPublications = data.filter(
    (row) => row.featured?.trim().toLowerCase() === "true"
  );
  const displayPublications = featuredPublications.length > 0 ? featuredPublications : data.slice(0, 3);
  const hasData = data.length > 0;
  const { sections } = useSectionsConfig();
  const publicationsSection = sections.find((section) => section.id === "publications");
  const heading = publicationsSection?.label || "Publications";
  const subtitle = publicationsSection?.subtitle;

  return (
    <section id="publications" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            {heading}
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {isLoading && !hasData && (
          <div className="max-w-4xl mx-auto space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && hasData && (
          <div className="max-w-4xl mx-auto space-y-4">
            {displayPublications.map((pub, index) => (
              (() => {
                const link = pub.link?.trim();
                const hasLink = Boolean(link && link !== "#");
                const type = pub.type?.trim();
                const typeNormalized = type?.toLowerCase();
                const isJournal = typeNormalized === "journal";
                const TypeIcon =
                  typeNormalized === "journal"
                    ? BookOpenText
                    : typeNormalized === "conference"
                      ? Presentation
                      : typeNormalized?.includes("book")
                        ? Book
                        : FileText;

                const card = (
                  <Card
                    key={`${pub.title}-${index}`}
                    className={`hover:shadow-md transition-shadow duration-300 ${hasLink ? "cursor-pointer" : ""}`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 flex items-start gap-2">
                            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                            <span className="flex-1">{pub.title}</span>
                          </CardTitle>
                          <CardDescription className="text-sm flex items-start gap-2">
                            <Users className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                            <span className="flex-1">{pub.authors}</span>
                          </CardDescription>
                        </div>
                        <span className="inline-flex items-center justify-center text-foreground">
                          <TypeIcon className="h-4 w-4" aria-hidden="true" />
                          <span className="sr-only">{type ?? "Publication"}</span>
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground flex items-start gap-2">
                        <BookOpenText className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                        <span className="flex-1">
                          {pub.venue} • {pub.year}
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                );

                if (!hasLink) return card;

                return (
                  <a
                    key={`${pub.title}-${index}`}
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Open DOI for: ${pub.title}`}
                    className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {card}
                  </a>
                );
              })()
            ))}
          </div>
        )}

        {!isLoading && !hasData && (
          <div className="text-center text-muted-foreground py-12">
            {error ?? "No publications have been added yet."}
          </div>
        )}

        {hasData && (
          <div className="mt-8 text-center">
            <Link to="/publications">
              <Button
                variant="outline"
                size="lg"
                className="group px-8 py-3 text-base inline-flex items-center gap-2"
              >
                View all publications
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}

        {error && hasData && (
          <div className="text-center text-destructive mt-6">{error}</div>
        )}
      </div>
    </section>
  );
};

export default Publications;
