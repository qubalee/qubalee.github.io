export interface CitationData {
  authors: string[];
  title: string;
  date: string;
  url: string;
  siteName?: string;
}

export const generateAPACitation = (data: CitationData): string => {
  const year = new Date(data.date).getFullYear();
  const dateFormatted = new Date(data.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
  
  const authorList = data.authors.length > 0 
    ? data.authors.map(name => {
        const parts = name.split(" ");
        const lastName = parts[parts.length - 1];
        const initials = parts.slice(0, -1).map(p => p[0]).join(". ");
        return initials ? `${lastName}, ${initials}.` : lastName;
      }).join(", ")
    : (data.siteName || "");

  const authorPart = authorList ? `${authorList} ` : "";

  return `${authorPart}(${year}, ${dateFormatted}). ${data.title}. ${data.siteName || "ALQUBALEE"}. ${data.url}`;
};

export const generateHarvardCitation = (data: CitationData): string => {
  const published = new Date(data.date);
  const year = published.getFullYear();

  const accessed = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const authors =
    data.authors.length > 0
      ? data.authors
          .map((full) => {
            const parts = full.trim().split(" ");
            const last = parts.pop() || "";
            const initials = parts.map((p) => p[0]).join(".");
            return initials ? `${last}, ${initials}` : last;
          })
          .join("; ")
      : data.siteName || "";

  const authorPart = authors ? `${authors} ` : "";
  return `${authorPart}(${year}) ${data.title}. ${data.siteName || "ALQUBALEE Notes"}. Available at: ${data.url} (Accessed: ${accessed}).`;
};

export const generateBibTeX = (data: CitationData): string => {
  const year = new Date(data.date).getFullYear();
  const month = new Date(data.date).toLocaleDateString("en-US", { month: "short" });
  const firstAuthor = data.authors[0] || "";
  const lastName = firstAuthor.split(" ").pop()?.toLowerCase() || "entry";
  const titleKey = data.title.split(" ")[0].toLowerCase();
  const key = `${lastName}${year}${titleKey}`;

  const authors = data.authors.length > 0 
    ? data.authors.join(" and ")
    : (data.siteName || "");

  return `@misc{${key},
  author = {${authors}},
  title = {${data.title}},
  year = {${year}},
  month = {${month}},
  url = {${data.url}},
  note = {${data.siteName || "ALQUBALEE"}}
}`;
};

export const generateRIS = (data: CitationData): string => {
  const year = new Date(data.date).getFullYear();
  const month = String(new Date(data.date).getMonth() + 1).padStart(2, "0");
  const day = String(new Date(data.date).getDate()).padStart(2, "0");

  const authors = data.authors.length > 0
    ? data.authors.map((name) => `AU  - ${name}`).join("\n")
    : "";

  return `TY  - BLOG
${authors}
TI  - ${data.title}
PY  - ${year}
DA  - ${year}/${month}/${day}
UR  - ${data.url}
PB  - ${data.siteName || "ALQUBALEE"}
ER  -`;
};
