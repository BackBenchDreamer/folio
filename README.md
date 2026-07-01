# folio — Jey V's Personal Portfolio

A personal portfolio built with [Astro](https://astro.build), TailwindCSS, and self-hosted Geist fonts.
File-driven content — no component edits required for normal content updates.

## Setup

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # Static output + Pagefind search index
npm run check    # TypeScript + Astro diagnostics
npm run preview  # Preview the production build locally
```

## Project Structure

```
folio/
├── src/
│   ├── config/
│   │   ├── site.config.ts   ← All personal metadata, social links, feature flags
│   │   └── skills.ts        ← Skills grouped by category
│   ├── content/
│   │   ├── art/             ← Art metadata (.json files)
│   │   ├── blog/            ← Blog posts (.mdx files)
│   │   ├── experience/      ← Work history (.json files)
│   │   ├── highlights/      ← Credibility stats (.json files)
│   │   └── projects/        ← Projects (.mdx files)
│   ├── components/
│   │   ├── layout/          ← Header, Footer
│   │   ├── sections/        ← Hero, Highlights, Experience, FeaturedProjects, ArtTeaser, Skills, Contact
│   │   └── ui/              ← ThemeToggle, LiveTime, ProjectCard, ArtCard, Search, AskAI, KeyboardShortcuts
│   ├── layouts/
│   │   ├── BaseLayout.astro ← Full <head>, SEO, JSON-LD, theme init
│   │   └── BlogLayout.astro ← Reading progress, reading mode, copy-markdown
│   ├── pages/               ← index, blog/, projects/, art/, rss.xml, sitemap.xml, robots.txt, 404
│   └── styles/
│       ├── tokens.css       ← All CSS custom properties (colors, spacing, type scale)
│       └── global.css       ← Resets, font-face, Tailwind directives
└── public/
    ├── fonts/               ← Self-hosted Geist Sans + Geist Mono (woff2)
    ├── images/
    │   ├── art/             ← Artwork images (locally hosted)
    │   ├── og/              ← OpenGraph images
    │   └── projects/        ← Project thumbnails + demo videos
    └── resume.pdf           ← Drop-replace — no code change needed
```

## Updating Personal Information

All personal metadata lives in **one file**: [`src/config/site.config.ts`](src/config/site.config.ts)

Edit this file to update:
- Name, role, location, timezone
- Availability status and text
- Social links (GitHub, LinkedIn, X, Instagram, etc.)
- Email address
- Resume path
- SEO title, description, OpenGraph image
- AI prompt for Ask ChatGPT / Ask Claude
- Feature flags (enable/disable any feature)

## Content Authoring

### Add a Project

1. Create `src/content/projects/my-project.mdx`:

```mdx
---
title: "My Project"
description: "One sentence about what it does."
featured: true      # true = appears on homepage
priority: 5         # lower = higher on homepage (sort order)
category: "engineering"  # engineering | art | hybrid
stack: ["TypeScript", "React"]
thumbnail: "my-project.png"
variant: "media"    # media (full-bleed card) | icon (app-icon card)
mediaType: "image"  # image | video
mediaSrc: "/images/projects/my-project.mp4"  # only if mediaType: video
date: 2025-01-01
draft: false
github: "https://github.com/..."
demo: "https://..."
---

Optional project description body (not displayed in current design).
```

2. Drop the thumbnail image into `public/images/projects/`.
3. For video demos, drop `.mp4` or `.m3u8` into `public/images/projects/`.

The homepage updates automatically — no component changes needed.

### Add a Blog Post

1. Create `src/content/blog/my-post.mdx`:

```mdx
---
title: "Post Title"
description: "One sentence summary."
date: 2025-01-15
tags: ["engineering", "craft"]
draft: false
tableOfContents: true
---

# Post Title

MDX content here. You can use any Astro or React components.
```

Reading time is computed automatically from the word count.

### Add Artwork

1. Drop the image into `public/images/art/my-artwork.jpg`.
2. Create `src/content/art/my-artwork.json`:

```json
{
  "title": "My Artwork",
  "medium": "charcoal",
  "date": "2025-01-01",
  "image": "my-artwork.jpg",
  "featured": false,
  "order": 10,
  "description": "Optional description.",
  "instagramUrl": "https://instagram.com/p/...",
  "instagramId": "post_shortcode",
  "syncedAt": "2025-01-01T00:00:00Z"
}
```

Set `featured: true` to include in the homepage art teaser (up to 6 shown).
`instagramUrl` renders as an outbound link on the gallery card.
`instagramId` and `syncedAt` are reserved for a future automated sync tool.

**Art mediums:** `charcoal` | `digital` | `sketch` | `study` | `collection`

### Update Work Experience

Edit or create `.json` files in `src/content/experience/`:

```json
{
  "company": "Company Name",
  "role": "Software Engineer",
  "startDate": "2024-01",
  "endDate": null,
  "location": "Remote · India",
  "technologies": ["TypeScript", "React", "AWS"],
  "achievements": [
    "Measurable achievement with impact.",
    "Another achievement."
  ],
  "link": "https://company.com",
  "order": 1
}
```

Set `endDate` to `null` for current roles. Lower `order` = shown first.

### Update Highlights

Edit `.json` files in `src/content/highlights/`:

```json
{
  "label": "Open Source",
  "value": "500+",
  "description": "GitHub stars across projects.",
  "order": 2
}
```

### Update Skills

Edit `src/config/skills.ts` — groups of skills with optional links.

## Feature Flags

All features can be individually enabled or disabled in `src/config/site.config.ts`:

```ts
features: {
  liveTime:          true,   // Live local time in hero
  themeToggle:       true,   // Dark/light theme toggle
  keyboardShortcuts: true,   // ? to open shortcuts panel
  rss:               true,   // RSS feed at /rss.xml
  search:            true,   // Pagefind search
  readingMode:       true,   // Reading mode toggle on blog posts
  askAI:             true,   // Ask ChatGPT / Claude buttons in footer
  copyMarkdown:      true,   // Copy post as Markdown (blog only)
}
```

Disabled features ship zero bytes to the client.

## Fonts

Geist Sans and Geist Mono are self-hosted in `public/fonts/`.
Variable fonts (`*-Variable.woff2`) are preloaded for performance.
No external font requests — full privacy.

## Deployment (Vercel)

Connect the repository to Vercel. The build command is:

```
npm run build
```

Output directory: `.vercel/output/static`

The `npm run build` script runs `astro build && npx pagefind --site dist` to build the Pagefind search index after the static output is generated.

## Resume

Drop your updated PDF as `public/resume.pdf`. The download link in the hero automatically uses this path — no code changes needed.

## Instagram Sync

The art gallery is designed to support an automated Instagram sync tool in the future.
The content model (`src/content/art/*.json`) includes:
- `instagramUrl` — outbound link shown on each art card
- `instagramId` — Instagram post shortcode, used by the sync tool to match records
- `syncedAt` — timestamp written by the sync tool

A future sync script can write `.json` files and download images without touching any gallery component code.
