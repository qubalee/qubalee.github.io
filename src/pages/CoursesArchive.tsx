import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCsvData } from "@/hooks/useCsvData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

type TeachingRow = {
  code: string;
  title: string;
  semester: string;
  level: string;
  description: string;
  status?: string;
};

const CoursesArchive = () => {
  const { data, isLoading, error } = useCsvData<TeachingRow>("/data/teaching.csv");
  const grouped = data.reduce<Record<string, TeachingRow[]>>((acc, course) => {
    const key = course.status?.toLowerCase() === "previous" ? "Previous Courses" : "Current Courses";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(course);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-muted/30">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Course Archive</h1>
          <p className="text-lg text-muted-foreground">
            Full list of current and previous offerings.
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
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

        {!isLoading && error && (
          <div className="text-center text-destructive py-12">{error}</div>
        )}

        {!isLoading &&
          !error &&
          Object.entries(grouped).map(([groupLabel, rows]) => (
            <section key={groupLabel} className="mb-10">
              <h2 className="text-2xl font-semibold text-foreground mb-6">{groupLabel}</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {rows.map((course) => {
                  const isPrevious = course.status?.toLowerCase() === "previous";
                  return (
                    <Card
                      key={course.code}
                      className="hover:shadow-lg transition-shadow relative"
                    >
                      <CardHeader>
                        <div className="flex flex-col gap-2">
                          <CardTitle className="text-lg">
                            {course.code}: {course.title}
                          </CardTitle>
                          <CardDescription className="text-sm text-muted-foreground">
                            {course.semester} • {course.level}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{course.description}</p>
                      </CardContent>
                      <Badge
                        variant={isPrevious ? "outline" : "secondary"}
                        className="absolute top-4 right-4 text-xs uppercase px-3 py-1 font-semibold"
                      >
                        {isPrevious ? "Previous" : "Current"}
                      </Badge>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}

        <div className="mt-10 text-center">
          <Link to="/#teaching">
            <Button variant="ghost" size="lg">
              Back home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CoursesArchive;
