// Fetch publications from OpenAlex for the author IDs listed in public/data/site-info.csv
// and write public/data/publications.csv in the format used by the UI.
//
// Usage:
//   node scripts/update-publications-from-openalex.cjs
//
// Configuration:
//   - site-info.csv should contain a column named "openalex_id" or "openalex_ids"
//     (multiple IDs can be comma/semicolon/pipe separated).
//   - Set OPENALEX_MAILTO for polite API usage; otherwise a default placeholder is used.
//
// Output columns:
//   title,authors,venue,year,type,link,featured
//
// Notes:
//   - Deduplicates works by OpenAlex work id, DOI, or title+year fallback.
//   - "featured" is left blank; adjust the rule below if you want to mark items.

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const siteInfoPath = path.join(ROOT, "public", "data", "site-info.csv");
const outputPath = path.join(ROOT, "public", "data", "publications.csv");
const blacklistPath = path.join(ROOT, "public", "data", "publications-blacklist.csv");
const BASE_URL = "https://api.openalex.org";
const MAILTO = process.env.OPENALEX_MAILTO || "research@example.com";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${url}`);
  }
  return res.json();
};

const fetchAllWorksForAuthor = async (openAlexId) => {
  const results = [];
  let cursor = "*";

  while (cursor) {
    const url = `${BASE_URL}/works?filter=author.id:${openAlexId}&per-page=200&cursor=${encodeURIComponent(
      cursor,
    )}&mailto=${encodeURIComponent(MAILTO)}`;
    const page = await fetchJson(url);
    results.push(...(page.results || []));
    const nextCursor =
      (page.meta && (page.meta.next_cursor || page.meta.next)) || null;
    cursor = nextCursor && nextCursor !== cursor ? nextCursor : null;
    if (cursor) await delay(200);
  }

  return results;
};

const escapeCsv = (value) => {
  const str = value == null ? "" : String(value);
  if (str === "") return "";
  const cleaned = str.replace(/\r?\n/g, " ");
  if (/[",]/.test(cleaned)) {
    return `"${cleaned.replace(/"/g, '""')}"`;
  }
  return cleaned;
};

const normalizeDoi = (doi) => {
  if (!doi) return "";
  return String(doi)
    .trim()
    .replace(/^https?:\/\/(www\.)?doi\.org\//i, "")
    .replace(/^doi:/i, "")
    .toLowerCase();
};

const normalizeTitle = (title) => {
  if (!title) return "";
  return String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
};

const makeWorkKey = (work) => {
  if (!work) return "";
  const id = work.id || "";
  if (id) return id;
  const doi = normalizeDoi(work.doi);
  if (doi) return `doi:${doi}`;
  const title = normalizeTitle(work.title);
  const year = work.publication_year || "";
  if (title && year) return `title:${title}|${year}`;
  if (title) return `title:${title}`;
  return "";
};

const normalizeWorkId = (id) => {
  if (!id) return "";
  const trimmed = String(id).trim();
  const match = trimmed.match(/W\d+$/i);
  return match ? match[0] : trimmed;
};

const parseCsvLines = (raw) => raw.split(/\r?\n/).filter((l) => l.trim().length > 0);

const parseCsv = (raw) => {
  const lines = parseCsvLines(raw);
  if (lines.length === 0) return { headers: [], rows: [] };
  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i += 1) {
      const ch = line[i];
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (ch === "," && !inQuotes) {
        result.push(current);
        current = "";
        continue;
      }
      current += ch;
    }
    result.push(current);
    return result;
  };

  const headers = parseLine(lines[0]).map((h) => h.trim());
  const rows = lines.slice(1).map((line) => {
    const values = parseLine(line);
    const record = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] ?? "";
    });
    return record;
  });
  return { headers, rows };
};

const getBlacklistWorkIds = () => {
  if (!fs.existsSync(blacklistPath)) return new Set();
  const raw = fs.readFileSync(blacklistPath, "utf8");
  const { headers, rows } = parseCsv(raw);
  if (!headers.length) return new Set();
  const headerMap = headers.map((h) => h.toLowerCase());
  const workIdIdx =
    headerMap.indexOf("work_id") >= 0
      ? headerMap.indexOf("work_id")
      : headerMap.indexOf("id");
  const ids = new Set();
  if (workIdIdx < 0) return ids;
  for (const row of rows) {
    const id = normalizeWorkId(row[headers[workIdIdx]]);
    if (id) ids.add(id);
  }
  return ids;
};

const getOpenAlexIdsFromSiteInfo = () => {
  if (!fs.existsSync(siteInfoPath)) {
    throw new Error(`Missing site-info.csv at ${siteInfoPath}`);
  }
  const raw = fs.readFileSync(siteInfoPath, "utf8");
  const { headers, rows } = parseCsv(raw);
  const headerMap = headers.map((h) => h.toLowerCase());
  const idIndex =
    headerMap.indexOf("openalex_id") >= 0
      ? headerMap.indexOf("openalex_id")
      : headerMap.indexOf("openalex_ids");
  if (idIndex < 0) {
    throw new Error("site-info.csv must include an openalex_id or openalex_ids column");
  }
  const ids = new Set();
  for (const row of rows) {
    const rawIds = row[headers[idIndex]] || "";
    rawIds
      .split(/[,;|]/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((id) => ids.add(id));
  }
  return Array.from(ids);
};

const formatWorkRow = (work) => {
  const title = work.title || "";
  const authorships = Array.isArray(work.authorships) ? work.authorships : [];
  const authors = authorships
    .map((a) => (a.author && a.author.display_name) || "")
    .filter(Boolean)
    .join("; ");
  const venue =
    work.primary_location?.source?.display_name ||
    work.host_venue?.display_name ||
    "";
  const year = work.publication_year || "";
  const type = work.type || work.type_crossref || "";
  const doi = normalizeDoi(work.doi);
  const link = doi ? `https://doi.org/${doi}` : work.primary_location?.landing_page_url || "";

  // Featured flag: leave blank; adjust rule here if desired.
  const featured = "";

  return {
    title,
    authors,
    venue,
    year,
    type,
    link,
    featured,
  };
};

const main = async () => {
  const authorIds = getOpenAlexIdsFromSiteInfo();
  if (!authorIds.length) {
    console.error("No OpenAlex IDs found in site-info.csv");
    process.exit(1);
  }

  const blacklistIds = getBlacklistWorkIds();

  const seenKeys = new Set();
  const works = [];

  for (const id of authorIds) {
    console.log(`Fetching works for ${id}...`);
    try {
      const authorWorks = await fetchAllWorksForAuthor(id);
      for (const work of authorWorks) {
        const workIdNormalized = normalizeWorkId(work.id);
        if (blacklistIds.has(workIdNormalized)) continue;
        const key = makeWorkKey(work) || `fallback:${id}:${work.title || ""}`;
        if (seenKeys.has(key)) continue;
        seenKeys.add(key);
        works.push(work);
      }
    } catch (err) {
      console.warn(`Failed to fetch works for ${id}:`, err && err.message ? err.message : err);
    }
  }

  // Sort by year desc, then title
  works.sort((a, b) => {
    const yearA = Number(a.publication_year || 0);
    const yearB = Number(b.publication_year || 0);
    if (yearA !== yearB) return yearB - yearA;
    return (a.title || "").localeCompare(b.title || "");
  });

  const header = ["title", "authors", "venue", "year", "type", "link", "featured"];
  const lines = [header.join(",")];
  for (const work of works) {
    const row = formatWorkRow(work);
    lines.push(header.map((h) => escapeCsv(row[h])).join(","));
  }

  fs.writeFileSync(outputPath, lines.join("\n"), "utf8");
  console.log(`Wrote ${works.length} rows to ${path.relative(ROOT, outputPath)}`);
};

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
