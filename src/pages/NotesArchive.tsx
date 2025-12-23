import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";

const NotesArchive = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-0 md:pt-0">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default NotesArchive;
