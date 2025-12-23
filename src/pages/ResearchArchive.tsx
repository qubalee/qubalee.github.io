import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, MessageSquare, Eye, Database } from "lucide-react";
import { useCsvData } from "@/hooks/useCsvData";
import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AnnouncementBar from "@/components/AnnouncementBar";
import { SEOHead } from "@/components/SEOHead";
import { useSiteInfo } from "@/hooks/useSiteInfo";

type ResearchRow = {
  iconKey?: string;
  title: string;
  description: string;
  status?: string;
  link?: string;
};

type AnnouncementRow = {
  id?: string;
  enabled?: string;
  title?: string;
  message?: string;
  ctaLabel?: string;
  ctaLink?: string;
  placement?: string;
};

const iconMap = {
  Globe,
  MessageSquare,
  Eye,
  Database,
};

const ResearchArchive = () => {
  const { data, isLoading, error } = useCsvData<ResearchRow>("/data/research.csv");
  const { data: announcements } = useCsvData<AnnouncementRow>("/data/announcements.csv");
  const { name, tagline } = useSiteInfo();
  const [searchQuery, setSearchQuery] = useState("");

  const researchAreas = useMemo(
    () =>
      data.map((row) => ({
        title: row.title,
        description: row.description,
        status: row.status?.toLowerCase() === "closed" ? "closed" : "current",
        link: row.link?.trim() || undefined,
        Icon:
          (row.iconKey && iconMap[row.iconKey as keyof typeof iconMap]) || Globe,
      })),
    [data]
  );

  const [visibleCount, setVisibleCount] = useState(15);

  const filteredAreas = useMemo(() => {
    if (!searchQuery.trim()) return researchAreas;
    const term = searchQuery.toLowerCase();
    return researchAreas.filter((area) => {
      const haystack = `${area.title} ${area.description} ${area.status}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [researchAreas, searchQuery]);

  const { topAnnouncements, bottomAnnouncements } = useMemo(() => {
    const normalizePlacement = (placement?: string) =>
      (placement || "")
        .split(/[,;|]/)
        .map((p) => p.trim().toLowerCase())
        .filter(Boolean);

    const matchesPlacement = (row: AnnouncementRow, target: "top" | "bottom") => {
      const placements = normalizePlacement(row.placement);
      if (!placements.length && row.id?.trim() === "contact-collaboration") {
        // Legacy default: show at top
        return target === "top";
      }
      const hasPage =
        placements.includes("research") ||
        placements.includes("research-archive") ||
        placements.includes("all") ||
        placements.includes("global");
      if (!hasPage) return false;
      const hasPos =
        placements.includes(target) ||
        placements.includes(`research-${target}`) ||
        placements.includes(`global-${target}`);
      if (hasPos) return true;
      // If page matches but no explicit position, default to top
      return target === "top";
    };

    const mapped = announcements
      .filter((row) => {
        const enabled = row.enabled ? row.enabled.trim().toLowerCase() !== "false" : true;
        return enabled;
      })
      .map((row) => {
        const title = row.title?.trim();
        const message = row.message?.trim();
        const ctaLabel = row.ctaLabel?.trim();
        const ctaLink = row.ctaLink?.trim();
        if (!title || !message || !ctaLabel || !ctaLink) return null;
        return { title, message, ctaLabel, ctaLink, row };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));

    return {
      topAnnouncements: mapped.filter((item) => matchesPlacement(item.row, "top")),
      bottomAnnouncements: mapped.filter((item) => matchesPlacement(item.row, "bottom")),
    };
  }, [announcements]);

  const hasData = filteredAreas.length > 0;
  const visibleAreas = filteredAreas.slice(0, visibleCount);
  const canonicalUrl = typeof window !== "undefined" ? window.location.href : "https://example.com/research-archive";
  const pageTitle = `Research Archive | ${name || "Research"}`;
  const pageDescription = tagline || "Interdisciplinary research areas and collaborations.";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        type="website"
      />
      <Navigation />
      <main className="container mx-auto px-4 pt-8 pb-12">
        <section className="py-0">
          <div className="mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
                Research Archive
              </h1>
            </div>

            {topAnnouncements.length > 0 && (
              <div className="max-w-6xl mx-auto mb-8 grid gap-3">
                {topAnnouncements.map((item, idx) => (
                  <AnnouncementBar
                    key={`${item.title}-${idx}`}
                    title={item.title}
                    message={item.message}
                    ctaLabel={item.ctaLabel}
                    ctaLink={item.ctaLink}
                  />
                ))}
              </div>
            )}

            {!isLoading && (
              <div className="max-w-4xl mx-auto mb-8">
                <Input
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setVisibleCount(15);
                  }}
                  placeholder="Search research areas by title, description, or status..."
                />
              </div>
            )}

            {isLoading && !hasData && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                          <div className="flex items-center gap-4">
                        <Skeleton className="w-12 h-12 rounded-lg" />
                        <Skeleton className="w-1/2 h-6" />
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

            {!isLoading && hasData && (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block max-w-7xl mx-auto">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead className="w-[30%] font-semibold">Research Area</TableHead>
                          <TableHead className="w-[55%] font-semibold">Description</TableHead>
                          <TableHead className="w-[15%] font-semibold text-center">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visibleAreas.map((area, index) => (
                          <TableRow 
                            key={`${area.title}-${index}`}
                            className="hover:bg-muted/30 transition-colors"
                          >

                            <TableCell className="font-medium" title={area.title}>
                              <div className="flex items-center gap-2">
                                <area.Icon className="w-4 h-4 text-primary/80 stroke-[1.5]" aria-hidden="true" />
                                {area.link ? (
                                  <a
                                    href={area.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-primary hover:underline"
                                  >
                                    {area.title}
                                  </a>
                                ) : (
                                  <span>{area.title}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="text-sm text-muted-foreground" title={area.description}>
                                {area.description}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge 
                                variant={area.status === "current" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {area.status === "current" ? "Active" : "Closed"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="mt-6 text-center text-sm text-muted-foreground">
                    {researchAreas.filter(a => a.status === "current").length} active research area(s) • {researchAreas.filter(a => a.status === "closed").length} closed project(s)
                  </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 gap-6 max-w-6xl mx-auto">
                  {visibleAreas.map((area, index) => (
                    <Card
                      key={`${area.title}-${index}`}
                      className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-all duration-300 relative"
                    >
                      <CardHeader className="flex flex-row items-center gap-3">
                        <area.Icon className="hidden md:inline-block w-4 h-4 text-primary/80 stroke-[1.5]" aria-hidden="true" />
                        <CardTitle className="text-xl">
                          {area.link ? (
                            <a
                              href={area.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-primary hover:underline"
                            >
                              {area.title}
                            </a>
                          ) : (
                            area.title
                          )}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-12">
                        <CardDescription className="text-base">
                          {area.description}
                        </CardDescription>
                      </CardContent>
                      <Badge
                        className="absolute bottom-4 right-4 rounded-full bg-muted text-xs text-foreground px-3 py-1 font-semibold"
                        variant={area.status === "closed" ? "outline" : "secondary"}
                      >
                        {area.status === "closed" ? "ARCHIVED" : "CURRENT"}
                      </Badge>
                    </Card>
                  ))}
                </div>

                {visibleAreas.length < researchAreas.length && (
                  <div className="mt-6 text-center">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVisibleCount((prev) => prev + 15)}
                    >
                      Load more research areas
                    </Button>
                  </div>
                )}

                {bottomAnnouncements.length > 0 && (
                  <div className="max-w-6xl mx-auto mt-8 grid gap-3">
                    {bottomAnnouncements.map((item, idx) => (
                      <AnnouncementBar
                        key={`${item.title}-${idx}-bottom`}
                        title={item.title}
                        message={item.message}
                        ctaLabel={item.ctaLabel}
                        ctaLink={item.ctaLink}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {!isLoading && !hasData && (
              <div className="text-center text-muted-foreground py-12">
                {error ?? "We don't have any research entries to show right now."}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ResearchArchive;
