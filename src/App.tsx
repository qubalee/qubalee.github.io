import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import AboutPage from "./pages/About";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import PublicationsArchive from "./pages/PublicationsArchive";
import CoursesArchive from "./pages/CoursesArchive";
import TeamArchive from "./pages/TeamArchive";
import NotesArchive from "./pages/NotesArchive";
import ResearchArchive from "./pages/ResearchArchive";
import { SiteInfoProvider } from "@/context/siteInfoProvider";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <SiteInfoProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<NotesArchive />} />
            <Route path="/about" element={<AboutPage />} />
            {/* Legacy /blog/:id route for local browsing */}
            <Route path="/blog/:id" element={<BlogPost />} />
            {/* Permalink-compatible route to match existing Jekyll URLs */}
            <Route path="/posts/:year/:month/:id" element={<BlogPost />} />
            <Route path="/publications" element={<PublicationsArchive />} />
            <Route path="/courses" element={<CoursesArchive />} />
            <Route path="/team" element={<TeamArchive />} />
            <Route path="/notes" element={<NotesArchive />} />
            {/* Backwards-compatible alias */}
            <Route path="/updates" element={<NotesArchive />} />
            <Route path="/research-archive" element={<ResearchArchive />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </SiteInfoProvider>
  </ThemeProvider>
);

export default App;
