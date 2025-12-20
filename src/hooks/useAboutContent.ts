import { useEffect, useState } from "react";
import { parseMarkdownDocument } from "@/lib/markdownUtils";
import { getAssetUrl } from "@/lib/assetPath";

export const useAboutContent = () => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let canceled = false;

    const load = async () => {
      try {
        const response = await fetch(getAssetUrl("data/about.md"));
        if (!response.ok) {
          throw new Error("Unable to load about content");
        }
        const raw = await response.text();
        if (canceled) return;
        const parsed = parseMarkdownDocument(raw);
        setContent(parsed.content);
      } catch (err) {
        if (canceled) return;
        setError(err instanceof Error ? err.message : "Failed to load content");
      }
    };

    load();
    return () => {
      canceled = true;
    };
  }, []);

  return { content, error };
};
