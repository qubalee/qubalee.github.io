import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Brain, Database, Eye, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCsvData } from "@/hooks/useCsvData";
import { useMemo } from "react";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import { Badge } from "@/components/ui/badge";

type ResearchRow = {
  iconKey: string;
  title: string;
  description: string;
  status?: string;
};

const iconMap = {
  Brain,
  MessageSquare,
  Eye,
  Database,
  Globe,
};

const Research = () => {
  const { data, isLoading, error } = useCsvData<ResearchRow>("/data/research.csv");
  const { sections } = useSectionsConfig();
  const researchSection = sections.find((section) => section.id === "research");
  const subtitle = researchSection?.subtitle;

  const researchAreas = useMemo(
    () =>
      data.map((row) => ({
        title: row.title,
        description: row.description,
        status: row.status?.toLowerCase() === "closed" ? "closed" : "current",
        Icon:
          iconMap[(row.iconKey as keyof typeof iconMap) ?? "Brain"] ?? Brain,
      })),
    [data]
  );

  const currentAreas = researchAreas.filter((area) => area.status === "current");
  const archiveAreas = researchAreas.filter((area) => area.status === "closed");
  const hasData = currentAreas.length > 0;
  const hasArchive = archiveAreas.length > 0;

  return (
    <section id="research" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
            Research Areas
          </h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Loading skeletons */}
        {isLoading && !hasData && (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="rounded-xl border shadow-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Actual data */}
        {!isLoading && hasData && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {currentAreas.map((area, index) => (
                <Card
                  key={`${area.title}-${index}`}
                  className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 relative"
                >
                  <CardHeader className="!flex-row !space-y-0 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
              <area.Icon className="w-6 h-6 text-primary/80 stroke-[1.5]" />
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {area.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-12">
                    <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                      {area.description}
                    </CardDescription>
                  </CardContent>
                  <Badge
                    className="absolute bottom-4 right-4 rounded-full bg-muted text-xs text-foreground px-3 py-0.5 font-semibold"
                    variant={area.status === "closed" ? "outline" : "secondary"}
                  >
                    {area.status === "closed" ? "ARCHIVED" : "CURRENT"}
                  </Badge>
                </Card>
              ))}
            </div>

            {hasArchive && (
              <div className="mt-10 text-center">
                <Link to="/research-archive">
                  <Button
                    variant="outline"
                    size="lg"
                    className="group px-8 py-3 text-base inline-flex items-center gap-2"
                  >
                    View all research areas
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}

        {/* No data */}
        {!isLoading && !hasData && (
          <div className="text-center text-muted-foreground py-8 space-y-4">
            <p>
              {error ??
                "No current research areas have been configured yet. Browse the archive below to see past work."}
            </p>
            {hasArchive && (
              <div className="mt-4 text-center">
                <Link to="/research-archive">
                  <Button variant="outline" size="lg">
                    View archived research
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Error message */}
        {error && hasData && (
          <div className="text-center text-destructive mt-6">{error}</div>
        )}
      </div>
    </section>
  );
};

export default Research;
