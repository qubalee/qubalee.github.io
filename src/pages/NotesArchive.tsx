import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";

const NotesArchive = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-6 md:pt-10">
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default NotesArchive;
