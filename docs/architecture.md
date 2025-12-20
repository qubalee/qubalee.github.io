# Architecture

## Stack
- Vite + React + TypeScript.
- React Router for routing; TanStack Query for cached data fetching.
- Tailwind CSS + shadcn/ui components; lucide-react icons.
- Theme via `next-themes`.
- Markdown rendering via `react-markdown` with `remark-gfm` + `rehype-raw`.

## Data flow
- CSV loader: `useCsvData` fetches `public/data/*.csv` and returns typed rows. Used by Research, Publications, Teaching, Team, Social links, announcements.
- Site info: `SiteInfoProvider` loads `public/data/site-info.csv` (includes email/office) and exposes `useSiteInfo`.
- Sections config: `useSectionsConfig` merges `sectionsManifest` with `public/data/sections-config.csv` to control enable/disable, order, labels, subtitles, notes, and optional archive `href`. Sections without `enabled=true` are omitted from nav and home.
- Blog pipeline: `fetchBlogPosts` reads an auto-generated `public/data/posts/posts.csv` (from `scripts/generate-posts-manifest.cjs`), loads each Markdown file, parses frontmatter/content (`markdownUtils`), normalizes authors/tags/permalink/image, and sorts by date. `useBlogPosts` wraps this for components.

## Routing and layout
- `App.tsx` wraps providers (Theme, SiteInfo, React Query, Tooltip, Toasters), includes `ScrollToTop`, and registers routes for home, blog detail, notes alias, archives, and 404.
- Navigation: header uses `useSectionsConfig` links; on `/` it smooth-scrolls; on other pages it navigates to `/#section-id` or a provided archive `href`. Theme toggle lives here.
- Footer: static footer using site info.

## Blog rendering
- `Blog` lists featured posts on home and full archive on `/notes`; supports search, tag/category filters, sort, pagination, and reading time (`readingTime`).
- `BlogPost` renders a single post with enhanced headings for TOC (`headingUtils`), SEO meta (`SEOHead`), reading time, citation block, related posts, and optional image/alt.
- Frontmatter supports: `title`, `date`, `permalink`, `author`/`authors`, `author_urls`, `author_emails`, `categories`/`category`, `tags`, `image.path`, `image.alt`, `excerpt`, `featured`/`pin`.

## Styling and theming
- Global styles in `src/index.css`; Tailwind config in `tailwind.config.ts`.
- Component library under `src/components/ui`; custom sections under `src/components`.
- Theme preference stored by `next-themes`; respects system default with a toggle.

## Extensibility tips
- Add a new section: create a component, register it in `src/data/sectionsManifest.ts`, and enable/configure it in `public/data/sections-config.csv`.
- Add new icons for Social: map the `iconKey` in `About`.
- Extend blog metadata: adjust parsing in `src/lib/blogContent.ts` and frontmatter shape accordingly.
- Ensure section components set an `id` matching the manifest so navigation scrolls correctly.
