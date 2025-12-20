import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCsvData } from "@/hooks/useCsvData";
import { Mail, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";

type TeamRow = {
  name: string;
  role: string;
  research: string;
  email: string;
  photo?: string;
  status?: string;
};

const TeamArchive = () => {
  const { data, isLoading, error } = useCsvData<TeamRow>("/data/team.csv");

  const grouped = data.reduce<Record<string, TeamRow[]>>((acc, member) => {
    const key = member.status?.toLowerCase() === "previous" ? "Alumni" : "Current Members";
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(member);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground mb-2">Team Archive</h1>
          <p className="text-lg text-muted-foreground">
            The full list of current lab members and alumni.
          </p>
        </div>

        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader className="text-center">
                  <Skeleton className="w-20 h-20 rounded-full mx-auto mb-3" />
                  <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </CardHeader>
                <CardContent className="text-center space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && error && (
          <div className="text-center text-destructive py-12">{error}</div>
        )}

        {!isLoading && !error && data.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No team members have been added yet.
          </div>
        )}

        {!isLoading && !error && data.length > 0 &&
          Object.entries(grouped).map(([groupLabel, members]) => (
            <section key={groupLabel} className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">{groupLabel}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => {
                  const photoSrc = member.photo?.trim() ? member.photo : profilePlaceholder;
                  return (
                    <Card key={member.name} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <img
                          src={photoSrc}
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover border border-border mx-auto mb-3"
                        />
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {member.role}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">{member.research}</p>
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center justify-center gap-1 text-xs text-primary hover:text-primary/80"
                        >
                          <Mail size={12} />
                          {member.email}
                        </a>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          ))}

        {!isLoading && !error && data.length > 0 && (
          <div className="mt-10 text-center">
            <Link to="/">
              <Button variant="ghost">Back to home</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeamArchive;
