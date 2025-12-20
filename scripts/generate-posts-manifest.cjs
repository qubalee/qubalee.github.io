// Generate public/data/posts/posts.csv from markdown files.
// Uses frontmatter `pin` or `featured` (case-insensitive) to set featured=true.
// Usage: node scripts/generate-posts-manifest.cjs

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const POSTS_DIR = path.join(ROOT, "public", "data", "posts");
const OUTPUT = path.join(POSTS_DIR, "posts.csv");

const parseFrontmatter = (raw) => {
  const match = raw.trim().match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n*/);
  if (!match) return { frontmatter: {}, content: raw.trim() };
  const block = match[1];
  const record = {};
  let lastKey = "";
  block.split(/\r?\n/).forEach((line) => {
    if (!line.trim()) return;
    if (/^\s+/.test(line)) {
      const trimmed = line.trim();
      const [subKey, ...rest] = trimmed.split(":");
      if (!lastKey || !subKey || rest.length === 0) return;
      record[`${lastKey}.${subKey.trim()}`] = rest.join(":").trim().replace(/^"(.*)"$/, "$1");
      return;
    }
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const cleaned = rest.join(":").trim().replace(/^"(.*)"$/, "$1");
    record[key.trim()] = cleaned;
    lastKey = key.trim();
  });
  const content = raw.slice(match[0].length).trim();
  return { frontmatter: record, content };
};

const files = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.toLowerCase().endsWith(".md"));

const rows = files
  .map((filename) => {
    const full = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(full, "utf8");
    const { frontmatter } = parseFrontmatter(raw);

    const featuredFlag = (frontmatter.pin ?? frontmatter.featured ?? "")
      .toString()
      .trim()
      .toLowerCase();
    const featured = featuredFlag === "true" ? "true" : "";

    const dateFromFrontmatter = frontmatter.date?.trim();
    const dateFromFilename = filename.match(/^(\d{4}-\d{2}-\d{2})/)?.[1];
    const sortDate = dateFromFrontmatter || dateFromFilename || "1970-01-01";

    return { filename, featured, sortDate };
  })
  .sort((a, b) => new Date(b.sortDate).getTime() - new Date(a.sortDate).getTime());

const lines = ["filename,featured", ...rows.map((r) => `${r.filename},${r.featured}`)];
fs.writeFileSync(OUTPUT, lines.join("\n") + "\n", "utf8");
console.log(`posts.csv written with ${rows.length} entries to ${path.relative(ROOT, OUTPUT)}`);
