import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useSectionsConfig } from "@/hooks/useSectionsConfig";
import { useSiteInfo } from "@/hooks/useSiteInfo";
import { useLocation, useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { name } = useSiteInfo();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const hashId = location.hash.replace("#", "");
      const frame = window.requestAnimationFrame(() => scrollToSection(hashId));
      return () => window.cancelAnimationFrame(frame);
    }
  }, [location.hash, location.pathname]);

  const { sections } = useSectionsConfig();
  const navLinks = [
    { id: "home", label: "Home", href: "/" },
    ...sections.map((section) => ({
      id: section.id,
      label: section.label,
      href: section.href,
    })),
  ];

  const handleNavClick = (id: string, href?: string) => {
    // Dedicated home link
    if (id === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      setIsMobileMenuOpen(false);
      return;
    }

    // Prefer dedicated routes when provided (e.g., standalone About/Notes pages)
    if (href) {
      if (location.pathname === href) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      } else {
        navigate(href);
      }
      setIsMobileMenuOpen(false);
      return;
    }

    // On the landing page, scroll to the in-page section
    if (location.pathname === "/") {
      scrollToSection(id);
      window.history.replaceState(null, "", `#${id}`);
      setIsMobileMenuOpen(false);
      return;
    }

    // Fallback: navigate to the home page with the section hash
    navigate({ pathname: "/", hash: `#${id}` });
    setIsMobileMenuOpen(false);
  };

  const showSolidBg = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBg ? "bg-background/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          <button
            onClick={() => {
              if (location.pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/");
              }
            }}
            className="text-xl font-bold text-foreground hover:text-primary transition-colors"
          >
            {name}
          </button>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => handleNavClick(link.id, link.href)}
                className="text-foreground hover:text-primary"
              >
                {link.label}
              </Button>
            ))}
            <ThemeToggle className="ml-2" />
          </div>

          {/* Mobile Menu Button */}
          <div className="ml-auto flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 bg-background/95 backdrop-blur shadow-md border-t border-border">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => handleNavClick(link.id, link.href)}
                className="w-full text-left justify-start"
              >
                {link.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
