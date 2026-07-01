# Portfolio Plan — Jey V Personal Portfolio

## Overview

Build a personal portfolio at `/Users/jeyadheepv/grepo/PERSONA/folio` from a completely blank slate.

**Framework:** Astro (App Router equivalent = file-based routing + Content Collections)
**Styling:** TailwindCSS v4 + CSS custom properties for theming
**Fonts:** Geist Sans + Geist Mono, self-hosted
**Theme:** System-aware dark/light with manual toggle
**Content:** 100% file-driven via Astro Content Collections (no hardcoded data in components)
**Identity:** Single `src/config/site.config.ts` owns all personal metadata
**Target:** Lighthouse 100 Performance, WCAG AA, production quality
**Deployment:** Vercel (static output via `@astrojs/vercel/static` adapter)
**Blog format:** MDX (`.mdx` files, supports embedded Astro/React components)

The benchmark aesthetic is Daniel Gaievskyi's portfolio (grid rhythm, restrained palette, premium feel) and Kaiyu Hsu's portfolio (information architecture, usability). This is neither — it is unmistakably Jey V's.

---

## Architecture Diagram

```
folio/
├── src/
│   ├── config/           # site.config.ts — single source of identity
│   ├── content/          # Astro Content Collections
│   │   ├── projects/     # .mdx files — featured:true triggers homepage
│   │   ├── blog/         # .mdx files — blog posts (MDX supported)
│   │   ├── experience/   # .md files — work history
│   │   ├── highlights/   # .md files — credibility stats
│   │   └── art/          # .md files — artwork metadata
│   ├── components/       # Reusable UI components (.astro + .tsx islands)
│   │   ├── layout/       # Header, Footer, BaseLayout, BlogLayout
│   │   ├── sections/     # Hero, Highlights, Experience, Projects, Art, Skills, Contact
│   │   ├── ui/           # ThemeToggle, LiveTime, KeyboardShortcuts, Search, ReadingMode
│   │   └── seo/          # OpenGraph, JSON-LD, TwitterCard meta
│   ├── pages/
│   │   ├── index.astro   # Homepage
│   │   ├── blog/         # Blog index + [slug].astro
│   │   ├── projects/     # Project index (no [slug] pages — cards only)
│   │   ├── art/          # Art gallery page
│   │   └── rss.xml.ts    # RSS feed
│   ├── styles/           # global.css, tokens.css (CSS custom properties)
│   └── utils/            # reading-time, sort helpers, markdown helpers
├── public/
│   ├── fonts/            # Self-hosted Geist Sans + Geist Mono
│   ├── images/           # Art thumbnails, project thumbnails, OG images
│   │   └── projects/     # Demo videos (.m3u8 / .mp4) and fallback images
│   └── resume.pdf        # Drop-replace — no code change needed
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── site.config.ts        # Re-exported alias → src/config/site.config.ts
```

---

## Sub-Tasks

---

### Sub-Task 1 — Project Scaffold & Toolchain

**Status:** [x] done

**Intent**  
Bootstrap the Astro project from scratch: install dependencies, configure Astro, TailwindCSS v4, TypeScript, and update `.gitignore`. This establishes the foundation every other sub-task builds on.

**Expected Outcomes**
- `package.json` with Astro, TailwindCSS, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/rss` dependencies
- `astro.config.mjs` configured with sitemap integration, content collections, and static output
- `tsconfig.json` with strict mode and Astro path aliases (`@/*` → `src/*`)
- `tailwind.config.ts` with content paths covering all `.astro` and `.tsx` files
- `.gitignore` updated to include `.astro/` and `dist/`
- `npm run dev` starts without errors
- `npm run build` produces a static output in `dist/`

**Todo List**
1. Create `package.json` with Astro 4.x, `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/rss`, `@astrojs/mdx`, `@astrojs/vercel`, `sharp` (image optimization), and TypeScript
2. Create `astro.config.mjs` — enable `@astrojs/tailwind`, `@astrojs/sitemap`, `@astrojs/mdx`, and `@astrojs/vercel/static` adapter; set `output: 'static'`; configure Content Collections
3. Create `tsconfig.json` — extend `astro/tsconfigs/strict`, add `@/*` path alias pointing to `src/`
4. Create `tailwind.config.ts` — content paths, extend theme with font families (Geist Sans, Geist Mono) and design tokens
5. Create `src/styles/tokens.css` — all CSS custom properties for colors, spacing, radius, font sizes for both light and dark themes
6. Create `src/styles/global.css` — base resets, font-face declarations for self-hosted Geist fonts, `@tailwind` directives
7. Update `.gitignore` — add `.astro/`, `dist/`, `node_modules/`, `.env*`
8. Create minimal `src/pages/index.astro` placeholder so the dev server can start
9. Download and place Geist Sans and Geist Mono font files in `public/fonts/`

**Relevant Context**
- Workspace is completely empty — full bootstrap required
- `.gitignore` currently targets Next.js — needs replacing
- Fonts must be self-hosted (no Google Fonts, no Bunny Fonts)
- Geist fonts are available via `geist` npm package or direct download from `vercel/geist-font`
- Deployment is Vercel static — use `@astrojs/vercel/static` adapter (not `serverless`)
- MDX requires `@astrojs/mdx` integration added to `astro.config.mjs`

---

### Sub-Task 2 — Site Config & Design Tokens

**Status:** [x] done

**Intent**  
Create the single source of truth for all personal identity and site metadata. Establish the full design token system (colors, typography scale, spacing). Nothing personal should ever be hardcoded in a component.

**Expected Outcomes**
- `src/config/site.config.ts` exports a fully typed `siteConfig` object containing: name, displayName, role, location, timezone, email, social links, availability, SEO metadata, and feature flags for optional features
- `src/styles/tokens.css` defines all CSS custom properties for both `[data-theme="dark"]` and `[data-theme="light"]` — colors, type scale, spacing, focus ring, transition duration
- TailwindCSS theme extended to reference CSS custom properties so utility classes stay in sync with tokens
- Feature flags in `siteConfig.features` control: themeToggle, liveTime, keyboardShortcuts, rss, search, readingMode, askAI, copyMarkdown

**Todo List**
1. Create `src/config/site.config.ts` — define and export typed `SiteConfig` interface and `siteConfig` object
2. Populate `siteConfig` with: displayName "Jey V", fullName "Jeyadheep V", role, location "India", timezone "Asia/Kolkata", placeholder email/socials, availability text, SEO title/description/ogImage
3. Add `features` map to `siteConfig` — each feature is a boolean, defaulting to the agreed set (liveTime: true, themeToggle: true, keyboardShortcuts: true, rss: true, search: true, readingMode: true, askAI: true, copyMarkdown: true)
4. Add `social` map — GitHub, LinkedIn, X, ArtStation, resume PDF path — all as placeholder strings
5. Define complete CSS custom property token set in `src/styles/tokens.css`:
   - Dark theme (primary): `--color-bg`, `--color-surface`, `--color-border`, `--color-text-primary`, `--color-text-secondary`, `--color-text-muted`, `--color-accent`, `--color-accent-hover`
   - Light theme: same properties with warm off-white/ink values
   - Typography: `--font-sans`, `--font-mono`, and a type scale (`--text-xs` through `--text-5xl`)
   - Spacing rhythm, radius, transition
6. Extend `tailwind.config.ts` to map utility classes to CSS custom properties (e.g., `bg-surface` → `var(--color-surface)`)

**Relevant Context**
- `src/config/site.config.ts` is the canonical file — every page, layout, and component imports from here
- Feature flags allow disabling any optional feature without touching component code
- Dark mode is primary design target; light mode must be independently designed, not simply an inversion

---

### Sub-Task 3 — Content Collections Schema

**Status:** [x] done

**Intent**  
Define and register all Astro Content Collections with strict Zod schemas. Create placeholder seed content for every collection so the dev server renders real data immediately.

**Expected Outcomes**
- `src/content/config.ts` defines and exports all five collections with typed Zod schemas: `projects`, `blog`, `experience`, `highlights`, `art`
- Each collection schema enforces all required and optional fields
- Seed content exists for each collection: at least 2–3 entries per collection as representative placeholders
- TypeScript types for all collections are auto-generated and usable in components
- `featured: true` + `priority: number` on projects correctly allows homepage filtering and sorting

**Todo List**
1. Create `src/content/config.ts` — import `defineCollection` and `z` from `astro:content`
2. Define `projects` schema: `title`, `description`, `featured` (boolean), `priority` (number), `category` (enum: engineering | art | hybrid), `stack` (string[]), `thumbnail`, `github` (optional), `demo` (optional), `writeup` (optional boolean), `date`, `draft` (boolean default false)
3. Define `blog` schema: `title`, `description`, `date`, `tags` (string[]), `draft`, `readingTime` (auto-computed via remark plugin, stored as number), `tableOfContents` (boolean default true) — files are `.mdx`
4. Define `experience` schema: `company`, `role`, `startDate`, `endDate` (optional — null = current), `location`, `technologies` (string[]), `achievements` (string[]), `link` (optional), `order` (number for display sort)
5. Define `highlights` schema: `label`, `value`, `description` (optional), `icon` (optional), `order` (number)
6. Define `art` schema:
   - `title` (string)
   - `medium` (enum: charcoal | digital | sketch | study | collection)
   - `date` (date)
   - `image` (string — path relative to `public/images/art/`, e.g. `"2024-charcoal-study.jpg"`) — locally hosted, Astro `<Image>`-optimized at build time
   - `featured` (boolean — controls homepage teaser inclusion)
   - `order` (number — controls display sort)
   - `description` (string, optional)
   - `instagramUrl` (string URL, optional — links the gallery card to the corresponding Instagram post; never used as an image source)
   - `instagramId` (string, optional — the post shortcode/ID; reserved for a future sync tool to match records without touching gallery code)
   - `syncedAt` (date, optional — ISO timestamp written by a future automated sync tool to indicate when this entry was last updated from Instagram)
   - `featured: true` entries appear on homepage art teaser (target 4–6 pieces maximum — enough to intrigue, not overwhelm; full catalogue lives on `/art`)
7. Create seed content files for each collection in `src/content/{collection}/` — use realistic placeholder values matching the schema
8. Verify TypeScript infers all collection types with zero errors via `astro check`

**Relevant Context**
- Homepage shows only `projects` where `featured === true`, sorted ascending by `priority`
- `experience` entries sorted by `order` (or computed from date)
- `art` featured entries appear on homepage gallery teaser (4–6 max); all art appears on `/art`
- Blog `readingTime` should be auto-computed via a remark plugin, not manually entered
- Blog content files are `.mdx` — MDX allows embedding custom Astro/React components inline
- Art images are always locally hosted under `public/images/art/` — Instagram is never a rendering dependency
- `instagramId` and `syncedAt` fields are inert at render time; they exist solely as sync metadata for a future CLI/script that can write `.md` files into `src/content/art/` without requiring any schema or component changes
- A future sync tool will: fetch new posts from Instagram API → download image to `public/images/art/` → write/update a `.md` file in `src/content/art/` with all fields populated → trigger a rebuild. The gallery code never needs to change.

---

### Sub-Task 4 — Base Layouts & Navigation

**Status:** [x] done

**Intent**  
Build the structural shell: base layout with SEO head, persistent header with navigation and controls, footer, and the blog-specific reading layout. These wrap every page.

**Expected Outcomes**
- `src/layouts/BaseLayout.astro` — accepts `title`, `description`, `ogImage`, `canonical` props; renders full `<head>` with SEO meta, OpenGraph, Twitter Cards, JSON-LD Person schema, canonical URL, font preloads; applies theme via `data-theme` attribute on `<html>`
- `src/layouts/BlogLayout.astro` — extends BaseLayout; adds reading mode container, progress indicator, estimated reading time in header, table of contents sidebar
- `src/components/layout/Header.astro` — site name/logo, navigation links, ThemeToggle, Search trigger; sticky on scroll with minimal height; keyboard navigable
- `src/components/layout/Footer.astro` — minimal: copyright, social icons, built-with note
- `src/components/ui/ThemeToggle.astro` — reads system preference on first load, persists choice to localStorage, applies `data-theme` to `<html>` without flash of wrong theme
- Theme script must be inline in `<head>` (before body paint) to prevent FOUC

**Todo List**
1. Create `src/layouts/BaseLayout.astro` — full `<head>`, `<body>` shell; import and use `siteConfig` for defaults; accept page-level prop overrides
2. Add inline theme initialization script in `<head>` — reads `localStorage.get('theme')` or `prefers-color-scheme`, sets `document.documentElement.dataset.theme` synchronously before paint
3. Add font preload `<link>` tags for Geist Sans (woff2) inside `<head>`
4. Add OpenGraph meta tags driven by props with `siteConfig` defaults
5. Add JSON-LD `Person` schema driven entirely by `siteConfig`
6. Create `src/components/layout/Header.astro` — logo (display name from `siteConfig`), nav links array, ThemeToggle slot, Search button slot; mobile: hamburger-free — collapse to icon-only nav on small screens
7. Create `src/components/ui/ThemeToggle.astro` — minimal icon button (sun/moon), client-side script to toggle `data-theme` and persist to localStorage; `prefers-reduced-motion` respected
8. Create `src/components/layout/Footer.astro` — year, name, social icon links from `siteConfig.social`
9. Create `src/layouts/BlogLayout.astro` — wraps BaseLayout; adds prose container, reading progress bar (CSS-only scroll-driven animation), ToC sidebar (desktop only)
10. Verify no FOUC in both dark and light modes across Chrome, Firefox, and Safari

**Relevant Context**
- FOUC prevention is critical — the theme script MUST be synchronous and in `<head>`, not deferred
- Header should be transparent on hero, solid on scroll — pure CSS scroll-driven or minimal JS
- Navigation links: Home, Projects, Blog, Art, Contact — driven by a config array, not hardcoded anchors
- JSON-LD should use `siteConfig.fullName`, `siteConfig.role`, `siteConfig.social`

---

### Sub-Task 5 — Homepage Sections

**Status:** [x] done

**Intent**  
Build every section that appears on the homepage: Hero, Highlights, Experience, Featured Projects, Art teaser, Skills, and Contact. Each section is a standalone `.astro` component that fetches its own data from Content Collections.

**Expected Outcomes**
- `src/pages/index.astro` composes all sections cleanly; no data logic lives in the page file itself
- Hero renders: display name, role, one-liner, two-sentence intro, availability badge, location, live local time (IST), social links, resume download — all from `siteConfig`
- Highlights renders: a row/grid of stat cards from the `highlights` collection, sorted by `order`
- Experience renders: a vertical timeline of roles from the `experience` collection, sorted by `order`
- Featured Projects renders: grid of project cards from `projects` where `featured === true`, sorted by `priority`
- Art Teaser renders: 6–8 featured art pieces from the `art` collection linking to `/art`
- Skills renders: grouped skill list (Languages, Frameworks, Cloud, DevOps, AI, Tools, Design) — sourced from a data file, not a collection
- Contact renders: email, LinkedIn, GitHub from `siteConfig.social` — no form

**Todo List**
1. Create `src/components/sections/Hero.astro` — layout: name large, role small, intro text, availability indicator, location + timezone, LiveTime component slot, social icon links row, resume download button; data entirely from `siteConfig`
2. Create `src/components/ui/LiveTime.astro` — client-side island (`client:load`), renders current time in `siteConfig.timezone` updating every second; respects `siteConfig.features.liveTime` flag
3. Create `src/components/sections/Highlights.astro` — fetches `highlights` collection, renders stat grid; each stat: large value, label, optional description
4. Create `src/components/sections/Experience.astro` — fetches `experience` collection sorted by order; timeline layout: vertical line, role card per entry with company, role, duration, technologies badges, achievements list
5. Create `src/components/sections/FeaturedProjects.astro` — fetches `projects` collection, filters `featured === true`, sorts by `priority`; renders project card grid
6. Create `src/components/ui/ProjectCard.astro` — two display modes driven by a `variant` prop:
   - **`variant="media"`** (gaievskyi-style): full-bleed card with a looping silent `<video>` (`.mp4` / HLS `.m3u8` via a `<video>` + `<source>` fallback) or static image if no video; title and one-liner overlay on hover; stack badges; GitHub/Demo links. Card is purely visual — no write-up link.
   - **`variant="icon"`** (kaiyu-style): app-icon square thumbnail, project name below, minimal metadata. Used for secondary/side-quest projects.
   - `projects` schema gains `mediaType` (enum: video | image), `mediaSrc` (path to `.mp4` or `.m3u8`), and `variant` (enum: media | icon) fields
   - Videos autoplay muted loop on hover (or on load for desktop); `prefers-reduced-motion` stops autoplay and shows poster frame instead
   - No write-up pages exist — the card IS the project surface
7. Create `src/components/sections/ArtTeaser.astro` — fetches `art` collection where `featured === true`, sorted by `order`; masonry-style or uniform grid; each item links to `/art`; section has "View all" link
8. Create `src/config/skills.ts` — export typed `SkillGroup[]` array grouping skills by category
9. Create `src/components/sections/Skills.astro` — renders skill groups from `skills.ts`; not icon spam — text-first with optional small icons
10. Create `src/components/sections/Contact.astro` — clean, minimal; email link + social links; no form
11. Assemble all sections in `src/pages/index.astro` in the correct order; ensure each section has consistent vertical spacing via spacing tokens

**Relevant Context**
- LiveTime must be a client island — the only client JS on the homepage for this component
- Project card still uses Astro's `<Image>` for static poster/thumbnail; video is a native `<video>` element
- Hover states: prefer CSS transitions (`opacity`, `border-color`, `color`) — no JS-driven hover
- Skills config lives in `src/config/skills.ts` (not a Content Collection) since it rarely changes and benefits from TypeScript's direct type checking
- `variant="media"` cards form the primary featured grid; `variant="icon"` cards form a secondary "Side Quests" row — both can appear on the homepage or `/projects`
- HLS `.m3u8` playback in `<video>` works natively in Safari; Chrome/Firefox need the `.mp4` fallback `<source>` — no JS library needed for simple looping demos

---

### Sub-Task 6 — Blog System

**Status:** [x] done

**Intent**
Build the full blog: listing page, individual post page with reading layout, reading time, table of contents, reading mode, and copy-as-Markdown feature. Blog posts are `.mdx` files in `src/content/blog/` — MDX enables embedding custom components (callouts, code demos, interactive snippets) directly in posts.

**Expected Outcomes**
- `/blog` — post listing with titles, dates, tags, estimated reading time; sorted newest first; draft posts excluded in production
- `/blog/[slug]` — full post rendered in BlogLayout with: title, date, reading time, tag list, ToC sidebar (desktop), prose-styled body, copy-as-Markdown button, reading mode toggle
- Reading time auto-computed via remark plugin — no manual field
- Copy-as-Markdown: client island that copies the raw Markdown source of the current post to clipboard — gated by `siteConfig.features.copyMarkdown`
- Reading mode: strips header/footer, expands prose width, increases line height — toggled by button and keyboard shortcut — gated by `siteConfig.features.readingMode`
- RSS feed at `/rss.xml` — all published blog posts — gated by `siteConfig.features.rss`

**Todo List**
1. Add `@astrojs/mdx` integration to `astro.config.mjs` (already added in Sub-Task 1); confirm remark plugin for reading time is applied to MDX pipeline as well
2. Create `src/pages/blog/index.astro` — fetch all blog posts, exclude drafts, sort by date descending; render `PostCard` for each
3. Create `src/components/ui/PostCard.astro` — title, date, tags, reading time, short description; hover: title color change; links to `/blog/[slug]`
4. Create `src/pages/blog/[slug].astro` — `getStaticPaths` from `blog` collection; render `<Content />` inside `BlogLayout`; pass title, description, date, readingTime, tags as layout props
5. Add TableOfContents component to BlogLayout — parses headings from post content, renders sticky sidebar on desktop; collapses gracefully on mobile
6. Add ReadingMode client island — toggles a `data-reading-mode` attribute on `<body>`; CSS applies full-width prose styles, hides header/footer; gated by feature flag
7. Add CopyMarkdown client island — fetches raw `.md` source via a data attribute set at build time containing the raw content; copies to clipboard; shows checkmark confirmation; gated by feature flag
8. Create `src/pages/rss.xml.ts` — generate RSS feed from published blog posts using `@astrojs/rss`; gated by feature flag
9. Add `robots.txt` and confirm sitemap includes `/blog/*` paths

**Relevant Context**
- MDX is confirmed — `@astrojs/mdx` is already in the stack from Sub-Task 1
- CopyMarkdown passes the raw MDX source string via a `data-raw` attribute set at build time (no runtime fetch needed, preserving static generation); strip MDX component syntax before copying so the clipboard contains clean readable Markdown
- Reading mode should be a CSS-only visual shift where possible; the toggle is a single `dataset` attribute flip

---

### Sub-Task 7 — Projects & Art Pages

**Status:** [x] done

**Intent**
Build the `/projects` listing page (cards only — no individual project pages) and the `/art` dedicated gallery page.

**Expected Outcomes**
- `/projects` — full project listing showing all non-draft projects; featured `variant="media"` cards in a primary grid; `variant="icon"` cards in a secondary "Side Quests" grid; filterable by category; no `/projects/[slug]` pages exist
- `/art` — grid of all art pieces; filterable by medium (charcoal, digital, sketch, study, collection); clicking an artwork opens a lightbox with the full image; keyboard accessible; supports lazy loading
- Art images use Astro `<Image>` for optimization; accessible alt text from collection `title`
- Homepage art teaser shows 4–6 `featured: true` art pieces as a preview with a "View all" link to `/art`

**Todo List**
1. Create `src/pages/projects/index.astro` — fetch all non-draft projects; render primary `variant="media"` grid and secondary `variant="icon"` grid with section labels ("Featured Work", "Side Quests"); category filter via minimal client JS
2. Do NOT create `src/pages/projects/[slug].astro` — there are no individual project pages
3. Create `src/pages/art/index.astro` — fetch all art entries sorted by `order`; render gallery grid; medium filter via client island
4. Create `src/components/ui/ArtCard.astro`:
   - Locally optimized thumbnail via Astro `<Image>` (path from `art.data.image`)
   - Title overlay on hover, medium badge
   - If `instagramUrl` is present: render a small Instagram icon link (`rel="noopener noreferrer"`, `target="_blank"`) so users can view the original post — this is a static outbound link, never a data fetch
   - No Instagram embed, no oEmbed, no runtime API call — the card renders entirely from local data
5. Add lightbox behavior — on click, open full image in an overlay; pure CSS `:target` lightbox or minimal JS island; keyboard dismissable (Escape); `aria-modal` and focus trap

**Relevant Context**
- No project detail pages — the card is the complete project surface
- Category filter on `/projects` should work without JS (CSS `:has` + checkbox trick) and enhance with JS if available
- Art lightbox must be keyboard accessible and respect `prefers-reduced-motion`
- `/art` is intentionally separate from the homepage art teaser — teaser shows 4–6 featured pieces; `/art` shows everything
- Art image count for seed content: provide 4–6 real or placeholder images for the homepage teaser; the full catalogue on `/art` can hold as many as needed without any code change
- `instagramId` and `syncedAt` are present in the schema but the gallery never reads them — they are reserved for the sync tool
- Future sync tool contract: reads `src/content/art/*.md`, writes new files or updates existing ones by matching on `instagramId`; downloads images to `public/images/art/`; sets `syncedAt`; triggers `astro build`. Zero gallery code changes required.

---

### Sub-Task 8 — SEO, Performance & Accessibility

**Status:** [x] done

**Intent**  
Ensure the portfolio meets Lighthouse 100 Performance, WCAG AA accessibility, and complete SEO coverage including dynamic OG images, sitemap, robots.txt, JSON-LD, and canonical URLs.

**Expected Outcomes**
- Lighthouse Performance score: 100 (or as close as achievable with real content)
- All images have explicit `width`/`height` (no CLS) and meaningful `alt` text
- All interactive elements keyboard navigable with visible focus states
- `prefers-reduced-motion` reduces or eliminates all transitions
- OpenGraph + Twitter Cards render correctly in social preview tools
- Dynamic OG image generation for blog posts and projects
- `sitemap.xml` generated by `@astrojs/sitemap`
- `robots.txt` in `public/`
- JSON-LD `Person` schema on all pages
- Canonical URLs on all pages
- No `console.error` or accessibility violations in axe audit

**Todo List**
1. Audit all `<Image>` usages — confirm `width`, `height`, `alt`, and `loading="lazy"` (or `eager` for above-fold)
2. Add `robots.txt` to `public/` — allow all, point to sitemap
3. Confirm `@astrojs/sitemap` config includes all page paths
4. Implement dynamic OG image generation — use Astro's `@vercel/og` or `satori` to generate `.png` images at build time for blog posts and projects; fallback to static default OG image
5. Audit heading hierarchy on every page — exactly one `<h1>` per page, logical `h2`→`h3` nesting
6. Add visible `:focus-visible` styles to all interactive elements in `global.css` — must be distinct and high-contrast
7. Add `prefers-reduced-motion` media query block in `global.css` that sets `transition-duration: 0.01ms` and `animation-duration: 0.01ms` globally
8. Audit color contrast for all text/background combinations in both themes — must meet WCAG AA (4.5:1 normal, 3:1 large)
9. Verify `lang` attribute on `<html>` element
10. Run `astro check` — zero TypeScript errors
11. Run `npm run build` — zero warnings about missing alt text or invalid schemas

**Relevant Context**
- Satori-based OG image generation runs at build time — fully static, no edge function needed; Vercel static adapter is compatible
- CLS prevention: all images must have explicit dimensions or use `aspect-ratio` CSS
- Hero section image (if any) should use `loading="eager"` — it is above the fold
- Project demo videos must have `preload="none"` and `playsinline` attributes to avoid performance impact

---

### Sub-Task 9 — Enhanced Features

**Status:** [x] done

**Intent**  
Implement the optional but agreed features: keyboard shortcuts panel, Ask ChatGPT/Claude buttons, and Search. Each is gated by the corresponding `siteConfig.features` flag. None should impact initial page load performance.

**Expected Outcomes**
- Keyboard shortcuts panel: press `?` to open a modal listing all shortcuts; press `t` to toggle theme; press `/` to focus search; press `Escape` to dismiss any overlay; `prefers-reduced-motion` respected; gated by `siteConfig.features.keyboardShortcuts`
- Ask ChatGPT / Ask Claude: two small buttons (or a single dropdown) that open ChatGPT/Claude with a pre-filled prompt describing Jey V — driven by a prompt template in `siteConfig`; opens in new tab; gated by `siteConfig.features.askAI`
- Search: client-side full-text search over all blog posts and projects using Pagefind (Astro-compatible, zero runtime JS until activated); search input in header triggers Pagefind UI; gated by `siteConfig.features.search`

**Todo List**
1. Add Pagefind to the build pipeline — install `astro-pagefind` integration or configure Pagefind as a post-build step; index all pages
2. Create `src/components/ui/Search.astro` — Pagefind search trigger button in header; Pagefind UI loads only when triggered (dynamic import); styled to match portfolio theme
3. Create `src/components/ui/KeyboardShortcuts.astro` — client island; listens for `keydown` on `document`; `?` opens shortcuts modal; `t` toggles theme (delegates to ThemeToggle); `/` focuses search; `Escape` closes modals; `aria-modal` on shortcut panel; gated by feature flag
4. Add `askAI` config to `siteConfig` — `chatgptPrompt` and `claudePrompt` template strings describing Jey V for context
5. Create `src/components/ui/AskAI.astro` — renders two small link-buttons that encode the prompt into the respective ChatGPT/Claude URLs; opens in new tab; `rel="noopener noreferrer"`; gated by feature flag
6. Wire all feature-gated components into BaseLayout — conditionally rendered based on `siteConfig.features.*`
7. Confirm Search, KeyboardShortcuts, and AskAI add zero bytes to initial bundle when feature is disabled

**Relevant Context**
- Pagefind is the best choice for Astro static search — it runs as a post-build indexer and ships its own tiny UI; compatible with Vercel static output
- AskAI prompt should be a concise professional summary of Jey V's background, role, skills, and availability — defined entirely in `siteConfig`
- Keyboard shortcuts must not conflict with browser or OS defaults — `?`, `t`, `/`, `Escape` are all safe
- Vercel deployment: confirm Pagefind post-build script runs before Vercel's output collection step; add it to `package.json` `build` script as `astro build && pagefind --site dist`

---

### Sub-Task 10 — Final Polish & Production Readiness

**Status:** [x] done

**Intent**  
Finalize spacing rhythm, typography refinement, hover states, micro-interactions, and production build quality. Run full audits. Ensure the site feels intentional and complete.

**Expected Outcomes**
- Consistent vertical rhythm across all sections using spacing tokens
- All hover/focus states reviewed — subtle, purposeful, no excessive motion
- `README.md` updated with setup instructions, content authoring guide, and feature flag documentation
- `npm run build` passes with zero errors and zero warnings
- `astro check` passes with zero TypeScript errors
- Production bundle analyzed — no unexpectedly large chunks
- All placeholder content clearly marked so real content can be dropped in trivially

**Todo List**
1. Audit vertical spacing — every section uses spacing tokens from `tokens.css`; no magic pixel values
2. Review all hover/focus states — ensure they are visible, consistent, and respect `prefers-reduced-motion`
3. Confirm all social links and resume path in `siteConfig` are clearly marked as placeholders with inline comments
4. Confirm `public/resume.pdf` placeholder exists so the resume download link does not 404
5. Run `npm run build` — fix any errors or warnings
6. Run `astro check` — fix any TypeScript errors
7. Analyze `dist/` output — confirm no unexpected large JS bundles
8. Update `README.md` — project overview, `npm install` + `npm run dev` instructions, content authoring guide (how to add a project, blog post, artwork), feature flag documentation, how to update personal info
9. Final visual review: open in browser, check dark mode, light mode, mobile, desktop — note any spacing or alignment issues and fix

**Relevant Context**
- README authoring guide is critical — it should explain how to add content without touching component code
- Placeholder content in seed files should include a comment like `# TODO: Replace with real content`
- The goal is: after this sub-task, the site is deployable and maintainable without further developer intervention for normal content updates

---

## Implementation Notes

- Every sub-task should be implemented one at a time; do not begin the next until the current passes `astro check` and `npm run build`
- Content Collections provide full TypeScript inference — lean on this heavily; avoid `as` casts
- Animations: CSS-only wherever possible; Framer Motion is explicitly excluded unless a specific interaction cannot be achieved without it
- All client islands (`client:load`, `client:idle`, `client:visible`) should be justified — document why each one needs client JS
- The `siteConfig.features` flags should short-circuit rendering entirely (not just hide with CSS) so disabled features ship zero bytes
- Image optimization: always use Astro's `<Image>` component from `astro:assets`; never raw `<img>` tags except where unavoidable
