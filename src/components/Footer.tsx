import { useSiteInfo } from "@/hooks/useSiteInfo";

const Footer = () => {
  const { name } = useSiteInfo();

  return (
    <footer className="bg-background text-foreground border-t border-border py-6">
  <div className="container mx-auto px-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="space-y-1 text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground">
          Opinions are solely those of the author and shared for knowledge purposes.
        </p>
      </div>
      <div className="text-sm text-muted-foreground space-y-1">
        <p>
          Developed by{" "}
          <a
            href="https://digitalgeosciences.com/"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-foreground hover:text-primary no-underline"
          >
            Digital Geosciences
          </a>
        </p>
        <p className="text-xs text-muted-foreground">GeoNote v0.1.0</p>
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
