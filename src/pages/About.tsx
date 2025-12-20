import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import About from "@/components/About";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
