import { useEffect, useMemo, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle = ({ className }: ThemeToggleProps) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = useMemo(() => {
    if (theme === "system") {
      return resolvedTheme;
    }
    return theme;
  }, [theme, resolvedTheme]);

  if (!mounted) {
    return null;
  }

  const nextTheme = activeTheme === "dark" ? "light" : "dark";

  return (
<Button
  variant="ghost"
  size="icon"
  onClick={() => setTheme(nextTheme)}
  aria-label="Toggle theme"
  style={{ WebkitTapHighlightColor: "transparent" }}
  className={`text-slate-900 dark:text-slate-100 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent focus:ring-0 focus:outline-none ${className ?? ""}`}
>
  {activeTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
</Button>
);
};

export default ThemeToggle;
