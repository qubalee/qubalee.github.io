export type MarkdownDocument = {
  frontmatter: Record<string, string>;
  content: string;
};

const parseFrontmatter = (block: string): Record<string, string> => {
  const record: Record<string, string> = {};
  let lastKey = "";
  block.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    if (/^\s+/.test(line)) {
      const trimmed = line.trim();
      const [subKey, ...rest] = trimmed.split(":");
      if (!lastKey || !subKey || rest.length === 0) return;
      record[`${lastKey}.${subKey.trim()}`] = rest
        .join(":")
        .trim()
        .replace(/^"(.*)"$/, "$1");
      return;
    }
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const cleaned = rest.join(":").trim().replace(/^"(.*)"$/, "$1");
    record[key.trim()] = cleaned;
    lastKey = key.trim();
  });
  return record;
};

export const parseMarkdownDocument = (raw: string): MarkdownDocument => {
  const match = raw.trim().match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n*/);
  if (!match) {
    return { frontmatter: {}, content: raw.trim() };
  }
  const frontmatter = parseFrontmatter(match[1]);
  const content = raw.slice(match[0].length).trim();
  return { frontmatter, content };
};
