import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-8 md:pt-12 pb-16">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
