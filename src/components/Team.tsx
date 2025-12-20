import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCsvData } from "@/hooks/useCsvData";
import { Link } from "react-router-dom";
import profilePlaceholder from "@/assets/profile-placeholder.jpg";
import { useSiteInfo } from "@/hooks/useSiteInfo";

type TeamRow = {
  name: string;
  role: string;
  research: string;
  email: string;
  photo?: string;
  status?: string;
};

const Team = () => {
  const { data, isLoading, error } = useCsvData<TeamRow>("/data/team.csv");
  const { name: leadName, photo: leadPhoto } = useSiteInfo();
  const currentMembers = data.filter((member) => member.status?.toLowerCase() !== "previous");
  const hasData = currentMembers.length > 0;

  return (
    <section id="team" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Research Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the current researchers driving our lab forward.
          </p>
        </div>

        {isLoading && !hasData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
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

        {!isLoading && hasData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {currentMembers.map((member, index) => {
              let photoSrc = member.photo?.trim() ? member.photo : profilePlaceholder;
              if (member.name === leadName) {
                photoSrc = leadPhoto || photoSrc;
              }
              return (
                <Card key={`${member.name}-${index}`} className="hover:shadow-md transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <img
                      src={photoSrc}
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border border-border shadow-sm mx-auto mb-3"
                    />
                    <CardTitle className="text-center text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-center text-sm">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">{member.research}</p>
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                    >
                      <Mail size={12} />
                      {member.email}
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {!isLoading && !hasData && (
          <div className="text-center text-muted-foreground py-12">
            {error ?? "Team members will appear here once configured."}
          </div>
        )}

        {error && hasData && (
          <div className="text-center text-destructive mt-6">{error}</div>
        )}

        <div className="mt-12 text-center">
          <Link to="/team">
            <Button variant="outline" size="lg" className="px-8 py-3 text-base">View all team members</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Team;
