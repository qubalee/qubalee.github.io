import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import heroBg from "@/assets/hero-bg.jpg";
import { useCallback, useEffect, useState } from "react";

const Hero = () => {
  const [countdown, setCountdown] = useState(5);
  const [autoTriggered, setAutoTriggered] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleScroll = useCallback(
    (id: string) => {
      if (!autoTriggered) {
        setAutoTriggered(true);
      }
      setCountdown(0);
      scrollToSection(id);
    },
    [autoTriggered, scrollToSection]
  );

  useEffect(() => {
    if (autoTriggered) {
      setCountdown(0);
      return undefined;
    }

    const interval = setInterval(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const timer = setTimeout(() => {
      setAutoTriggered(true);
      setCountdown(0);
      scrollToSection("about");
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [autoTriggered, scrollToSection]);

  const { name, role, tagline } = useSiteInfo();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Research background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-slate/90" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in">
          {name}
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
          {role}
        </p>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-3xl mx-auto">
          {tagline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => handleScroll("research")}
            className="text-lg"
          >
            View Research
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => handleScroll("about")}
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors animate-bounce"
          >
            <ArrowDown size={32} />
          </button>
        </div>
        {!autoTriggered && (
          <div className="flex justify-center mt-6 pointer-events-none">
            <span className="inline-flex items-center rounded-full bg-white/20 px-5 py-2 text-sm font-medium tracking-wide text-white shadow-lg backdrop-blur animate-pulse">
              Guiding you to About in {countdown}s
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
