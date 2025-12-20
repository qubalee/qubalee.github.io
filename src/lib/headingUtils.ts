export interface Heading {
  level: number;
  text: string;
  id: string;
}

const slugifyHeading = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const extractHeadings = (markdown: string): Heading[] => {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown))) {
    const text = match[2].replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"); // Remove markdown links
    headings.push({
      level: match[1].length,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
};

export const addHeadingIds = (markdown: string): string => {
  return markdown.replace(/^(#{2,3})\s+(.+)$/gm, (match, hashes, text) => {
    const cleanText = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const id = slugifyHeading(cleanText);
    return `${hashes} ${text} {#${id}}`;
  });
};
