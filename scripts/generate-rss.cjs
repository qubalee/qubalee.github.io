// Generate an RSS feed from markdown posts listed in public/data/posts/posts.csv
// Usage: node scripts/generate-rss.cjs
// Optional env: SITE_URL (e.g., https://example.com), FEED_TITLE, FEED_DESCRIPTION

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const POSTS_MANIFEST = path.join(ROOT, "public", "data", "posts", "posts.csv");
const POSTS_DIR = path.join(ROOT, "public", "data", "posts");
const SITE_INFO = path.join(ROOT, "public", "data", "site-info.csv");
const OUTPUT = path.join(ROOT, "public", "feed.xml");

const SITE_URL = process.env.SITE_URL || "https://example.com";

const readText = (file) => fs.readFileSync(file, "utf8");

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

const parseSiteInfo = () => {
  if (!fs.existsSync(SITE_INFO)) return { name: "Notes", tagline: "" };
  const [headerLine, ...rows] = readText(SITE_INFO)
    .split(/\r?\n/)
    .filter(Boolean);
  const headers = headerLine.split(",");
  const first = rows[0]?.split(",") || [];
  const get = (key) => {
    const idx = headers.indexOf(key);
    return idx >= 0 ? (first[idx] || "").replace(/^"(.*)"$/, "$1") : "";
  };
  return {
    name: get("name") || "Notes",
    tagline: get("tagline") || "",
  };
};

const feedMeta = parseSiteInfo();

const manifestLines = readText(POSTS_MANIFEST)
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);
const [manifestHeader, ...manifestRows] = manifestLines;
const hasFeatured = manifestHeader.toLowerCase().includes("featured");

const files = manifestRows
  .map((row) => {
    const parts = row.split(",");
    return hasFeatured ? parts[0]?.trim() : row.trim();
  })
  .filter((f) => f && f !== "filename");

const items = files
  .map((file) => {
    const fullPath = path.join(POSTS_DIR, file);
    if (!fs.existsSync(fullPath)) return null;
    const raw = readText(fullPath);
    const { frontmatter, content } = parseFrontmatter(raw);
    const id =
      frontmatter.id ||
      frontmatter.permalink?.split("/").filter(Boolean).pop() ||
      file.replace(/\.md$/, "");
    const title = frontmatter.title || id;
    const date = frontmatter.date || "";
    const excerpt =
      frontmatter.excerpt ||
      content
        .slice(0, 180)
        .replace(/[#*_]/g, "")
        .replace(/\[[^\]]*\]\([^)]+\)/g, "")
        .trim();
    const link = frontmatter.permalink
      ? new URL(frontmatter.permalink.replace(/^\/+/, ""), SITE_URL).toString()
      : `${SITE_URL.replace(/\/+$/, "")}/blog/${id}`;
    return { id, title, date, link, description: excerpt };
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const escapeXml = (str) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const rssItems = items
  .map((item) => {
    const pubDate = item.date ? new Date(item.date).toUTCString() : "";
    return [
      "<item>",
      `<title>${escapeXml(item.title)}</title>`,
      `<link>${item.link}</link>`,
      `<guid>${item.link}</guid>`,
      pubDate ? `<pubDate>${pubDate}</pubDate>` : "",
      item.description ? `<description>${escapeXml(item.description)}</description>` : "",
      "</item>",
    ]
      .filter(Boolean)
      .join("");
  })
  .join("");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(process.env.FEED_TITLE || feedMeta.name)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(process.env.FEED_DESCRIPTION || feedMeta.tagline || "")}</description>
    ${rssItems}
  </channel>
</rss>`;

fs.writeFileSync(OUTPUT, rss, "utf8");
console.log(`RSS written to ${path.relative(ROOT, OUTPUT)} with ${items.length} item(s).`);
