import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BookOpenText,
  Copy,
  FileDown,
  FileText,
  Linkedin,
  Printer,
  Users,
} from "lucide-react";
import { useCsvData } from "@/hooks/useCsvData";
import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SEOHead } from "@/components/SEOHead";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { useLocation, useNavigate } from "react-router-dom";

type PublicationRow = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  type: string;
  link: string;
  featured?: string;
};

type SortKey = "title" | "authors" | "venue" | "year" | "citations";
type SortDirection = "asc" | "desc";
type CitationMap = Record<string, number | null>;
type PublicationWithMeta = PublicationRow & { doi?: string | null; citations?: number | null };

const extractDoi = (link: string | undefined) => {
  if (!link) return null;
  const match = link.match(/10\.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
  return match ? match[0] : null;
};

const PublicationsArchive = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, error } = useCsvData<PublicationRow>("/data/publications.csv");
  const [sortBy, setSortBy] = useState<SortKey>("year");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [visibleCount, setVisibleCount] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [citations, setCitations] = useState<CitationMap>({});
  const [citationsLoading, setCitationsLoading] = useState(false);
  const { name } = useSiteInfo();

  useEffect(() => {
    let canceled = false;
    const dois = Array.from(
      new Set(
        data
          .map((pub) => extractDoi(pub.link))
          .filter((doi): doi is string => Boolean(doi))
      )
    );

    if (!dois.length) {
      setCitations({});
      return;
    }

    const fetchCounts = async () => {
      setCitationsLoading(true);
      try {
        const results = await Promise.all(
          dois.map(async (doi) => {
            try {
              const url = `https://api.openalex.org/works/https://doi.org/${encodeURIComponent(doi)}`;
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Failed for ${doi}`);
              }
              const json = await response.json();
              return [doi, typeof json?.cited_by_count === "number" ? json.cited_by_count : null] as const;
            } catch (_err) {
              return [doi, null] as const;
            }
          })
        );

        if (canceled) return;
        const next: CitationMap = {};
        results.forEach(([doi, count]) => {
          next[doi] = count;
        });
        setCitations(next);
      } finally {
        if (!canceled) {
          setCitationsLoading(false);
        }
      }
    };

    fetchCounts();

    return () => {
      canceled = true;
    };
  }, [data]);

  // Sync search query from URL on load/route change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    setSearchQuery(q);
  }, [location.search]);

  // Reflect search query in URL for sharing deep links
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchQuery) {
      params.set("q", searchQuery);
    } else {
      params.delete("q");
    }
    navigate({ search: params.toString() ? `?${params.toString()}` : "" }, { replace: true });
  }, [searchQuery, location.search, navigate]);

  const rows: PublicationWithMeta[] = useMemo(
    () =>
      data.map((pub) => {
        const doi = extractDoi(pub.link);
        return {
          ...pub,
          doi,
          citations: doi ? citations[doi] ?? null : null,
        };
      }),
    [data, citations]
  );

  const sorted = useMemo(() => {
    const getValue = (row: PublicationWithMeta) => {
      if (sortBy === "citations") {
        const value = typeof row.citations === "number" ? row.citations : -1;
        return value;
      }
      return row[sortBy] ?? "";
    };

    const compare = (a: PublicationWithMeta, b: PublicationWithMeta) => {
      const rawA = getValue(a);
      const rawB = getValue(b);

      if (sortBy === "year" || sortBy === "citations") {
        const aYear = Number(rawA) || 0;
        const bYear = Number(rawB) || 0;
        return aYear === bYear ? 0 : aYear > bYear ? 1 : -1;
      }

      const aVal = rawA.toString().toLowerCase();
      const bVal = rawB.toString().toLowerCase();
      if (aVal === bVal) return 0;
      return aVal > bVal ? 1 : -1;
    };

    const sortedRows = [...rows].sort(compare);
    return sortDirection === "asc" ? sortedRows : sortedRows.reverse();
  }, [rows, sortBy, sortDirection]);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return sorted;
    const term = searchQuery.toLowerCase();
    return sorted.filter((pub) => {
      const haystack = [pub.title, pub.authors, pub.venue, pub.year, pub.type]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(term);
    });
  }, [searchQuery, sorted]);

  const visible = filtered.slice(0, visibleCount);
  const canonicalUrl =
    typeof window !== "undefined" ? window.location.href : "https://example.com/publications";
  const pageTitle = `${name ? `${name} | ` : ""}Publications`;
  const pageDescription = "Browse peer-reviewed articles, book chapters, and scholarly outputs.";

  const toggleSort = (column: SortKey) => {
    setVisibleCount(15);
    setSortBy(column);
    setSortDirection((prev) => {
      if (column !== sortBy) {
        return column === "year" || column === "citations" ? "desc" : "asc";
      }
      return prev === "asc" ? "desc" : "asc";
    });
  };

  const renderSortIcon = (column: SortKey) => {
    if (sortBy !== column) return <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />;
    return sortDirection === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
    );
  };

  const formatHarvardCitation = (row: PublicationRow) => {
    const authors = row.authors?.trim() || "Unknown author";
    const year = row.year?.trim() || "n.d.";
    const title = row.title?.trim() || "Untitled";
    const venue = row.venue?.trim();
    const type = row.type?.trim();
    const link = row.link?.trim();

    const venuePart = venue
      ? `${venue}${type ? ` (${type})` : ""}`
      : type || "";
    const linkPart = link ? ` Available at: ${link}` : "";

    return `${authors} (${year}). ${title}.${venuePart ? ` ${venuePart}.` : ""}${linkPart}`;
  };

  const handleExportCsv = () => {
    if (!filtered.length) return;

    const headers = ["Harvard Citation", "Title", "Authors", "Venue", "Year", "Citations", "Link"];
    const escape = (value: string) => `"${value.replace(/"/g, '""')}"`;
    const rows = filtered.map((row) =>
      [
        formatHarvardCitation(row),
        row.title ?? "",
        row.authors ?? "",
        row.venue ?? "",
        row.year ?? "",
        typeof row.citations === "number" ? row.citations : "",
        row.link ?? "",
      ]
        .map((cell) => escape(String(cell)))
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    // Prepend UTF-8 BOM to preserve diacritics when opened in spreadsheet apps
    const csvWithBom = "\uFEFF" + csv;
    const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "publications.csv";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        url={canonicalUrl}
        type="website"
      />
      <Navigation />
      <main className="container mx-auto px-4 pt-12 md:pt-16 pb-16">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-2">Publications Archive</h1>
        </div>

        {!isLoading && !error && (
          <div className="max-w-7xl mx-auto mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-xl">
              <Input
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(15);
                }}
                placeholder="Search publications by title, author, venue, or year..."
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Save or print PDF"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Export as CSV"
                onClick={handleExportCsv}
              >
                <FileDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Copy page link"
                onClick={handleCopyLink}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Share on LinkedIn"
                onClick={handleShareLinkedIn}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="grid gap-4">
            {[1, 2, 3, 4].map((i) => (
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

        {!isLoading && error && (
          <div className="text-center text-destructive py-12">{error}</div>
        )}

        {!isLoading && !error && (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block max-w-7xl mx-auto">
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[35%] font-semibold">
                        <button
                          type="button"
                          onClick={() => toggleSort("title")}
                          className="flex items-center gap-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span>Title</span>
                          {renderSortIcon("title")}
                        </button>
                      </TableHead>
                      <TableHead className="w-[25%] font-semibold">
                        <button
                          type="button"
                          onClick={() => toggleSort("authors")}
                          className="flex items-center gap-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span>Authors</span>
                          {renderSortIcon("authors")}
                        </button>
                      </TableHead>
                      <TableHead className="w-[20%] font-semibold">
                        <button
                          type="button"
                          onClick={() => toggleSort("venue")}
                          className="flex items-center gap-2 w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span>Venue</span>
                          {renderSortIcon("venue")}
                        </button>
                      </TableHead>
                      <TableHead className="w-[8%] font-semibold text-center">
                        <button
                          type="button"
                          onClick={() => toggleSort("year")}
                          className="flex items-center gap-2 w-full justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span>Year</span>
                          {renderSortIcon("year")}
                        </button>
                      </TableHead>
                      <TableHead className="w-[15%] font-semibold text-center">
                        <button
                          type="button"
                          onClick={() => toggleSort("citations")}
                          className="flex items-center gap-2 w-full justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        >
                          <span>Total citations</span>
                          {renderSortIcon("citations")}
                        </button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {visible.map((pub, index) => (
                      (() => {
                        const link = pub.link?.trim();
                        const hasLink = Boolean(link && link !== "#");

                        return (
                      <TableRow
                        key={`${pub.title}-${index}`}
                        className={`hover:bg-muted/30 transition-colors ${hasLink ? "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" : ""}`}
                        role={hasLink ? "link" : undefined}
                        tabIndex={hasLink ? 0 : undefined}
                        aria-label={hasLink ? `Open DOI for: ${pub.title}` : undefined}
                        onClick={() => {
                          if (!hasLink) return;
                          window.open(link, "_blank", "noreferrer");
                        }}
                        onKeyDown={(event) => {
                          if (!hasLink) return;
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            window.open(link, "_blank", "noreferrer");
                          }
                        }}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-start gap-2" title={pub.title}>
                            <FileText className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                            <div className="line-clamp-2">{pub.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-start gap-2 text-sm text-muted-foreground" title={pub.authors}>
                            <Users className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                            <div className="line-clamp-2">{pub.authors}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-muted-foreground line-clamp-2" title={pub.venue}>
                            {pub.venue}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="text-sm font-medium">{pub.year}</span>
                        </TableCell>
                        <TableCell className="text-center">
                          {(() => {
                            const value = pub.citations;
                            if (typeof value === "number") {
                              return <span className="text-sm font-medium">{value.toLocaleString()}</span>;
                            }
                            if (citationsLoading) {
                              return <span className="text-xs text-muted-foreground">Loading...</span>;
                            }
                            return <span className="text-xs text-muted-foreground">—</span>;
                          })()}
                        </TableCell>
                      </TableRow>
                        );
                      })()
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-6 text-center text-sm text-muted-foreground">
                Showing {visible.length} of {filtered.length} publication{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {visible.map((pub, index) => (
                (() => {
                  const link = pub.link?.trim();
                  const hasLink = Boolean(link && link !== "#");
                  const citationLabel =
                    typeof pub.citations === "number"
                      ? pub.citations.toLocaleString()
                      : citationsLoading
                        ? "Loading..."
                        : "—";

                  const card = (
                    <Card
                      key={`${pub.title}-${index}`}
                      className={`hover:shadow-lg transition-shadow ${hasLink ? "cursor-pointer" : ""}`}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-lg flex items-start gap-2">
                              <FileText className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                              <span className="flex-1">{pub.title}</span>
                            </CardTitle>
                            <CardDescription className="text-sm text-muted-foreground flex items-start gap-2">
                              <Users className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                              <span className="flex-1">{pub.authors}</span>
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="flex-1">
                            {pub.venue}
                            <span className="mx-1.5 text-2xl leading-none align-middle">·</span>
                            {pub.year}
                          </span>
                          <span className="inline-flex items-center gap-1 whitespace-nowrap">
                            <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                            {citationLabel}
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

            {visible.length < filtered.length && (
              <div className="mt-6 flex items-center justify-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setVisibleCount((prev) => prev + 15)}
                >
                  Load more
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setVisibleCount(filtered.length)}
                >
                  Load all ({filtered.length})
                </Button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default PublicationsArchive;
