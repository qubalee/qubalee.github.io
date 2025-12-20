import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCsvData } from "@/hooks/useCsvData";
import { Link } from "react-router-dom";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import { Badge } from "@/components/ui/badge";

type TeachingRow = {
  code: string;
  title: string;
  semester: string;
  level: string;
  description: string;
  status?: string;
};

const Teaching = () => {
  const { data, isLoading, error } = useCsvData<TeachingRow>("/data/teaching.csv");
  const { sections } = useSectionsConfig();
  const teachingSection = sections.find((section) => section.id === "teaching");
  const subtitle = teachingSection?.subtitle;
  const note = teachingSection?.note;
  const currentCourses = data.filter(
    (course) => course.status?.toLowerCase() !== "previous"
  );
  const hasData = currentCourses.length > 0;

  return (
    <section id="teaching" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Teaching</h2>
          {subtitle && (
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
        {note && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-secondary rounded-lg mx-auto">
              <Users className="text-primary" />
              <span className="text-foreground">{note}</span>
            </div>
          </div>
        )}

        {isLoading && !hasData && (
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
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
          <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {currentCourses.map((course, index) => {
              const isPrevious = course.status?.toLowerCase() === "previous";
              return (
                <Card
                  key={`${course.code}-${index}`}
                  className="hover:shadow-md transition-shadow duration-300"
                >
                  <CardHeader className="flex flex-col gap-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">
                          {course.code}: {course.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {course.semester} • {course.level}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={isPrevious ? "outline" : "secondary"}
                        className="text-xs uppercase"
                      >
                        {isPrevious ? "Previous" : "Current"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{course.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && !hasData && (
          <div className="text-center text-muted-foreground py-12">
            {error ?? "Teaching assignments will appear here once configured."}
          </div>
        )}

        {error && hasData && (
          <div className="text-center text-destructive mt-6">{error}</div>
        )}

        <div className="mt-10 text-center">
          <Link to="/courses">
            <Button variant="outline" size="lg" className="px-8 py-3 text-base">View all courses</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Teaching;
