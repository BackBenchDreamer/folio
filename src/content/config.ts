import { defineCollection, z } from 'astro:content';

// ── Projects ───────────────────────────────────────────────
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured: z.boolean().default(false),
    /** Lower number = higher priority on homepage */
    priority: z.number().default(99),
    category: z.enum(['engineering', 'art', 'hybrid']),
    stack: z.array(z.string()),
    /** Path relative to public/images/projects/ */
    thumbnail: z.string(),
    /** Card display variant */
    variant: z.enum(['media', 'icon']).default('media'),
    /** media | image — determines how the card renders */
    mediaType: z.enum(['video', 'image']).default('image'),
    /** Path to .mp4 or .m3u8 file relative to public/ */
    mediaSrc: z.string().optional(),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    date: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
});

// ── Blog ────────────────────────────────────────────────────
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    /** Auto-computed by remark plugin — do not set manually */
    readingTime: z.number().optional(),
    tableOfContents: z.boolean().default(true),
  }),
});

// ── Experience ─────────────────────────────────────────────
const experience = defineCollection({
  type: 'data',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    startDate: z.string(),
    /** Omit or set to null to indicate current role */
    endDate: z.string().nullable().optional(),
    location: z.string(),
    technologies: z.array(z.string()).default([]),
    achievements: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    /** Controls display order — lower = shown first */
    order: z.number(),
  }),
});

// ── Highlights ─────────────────────────────────────────────
const highlights = defineCollection({
  type: 'data',
  schema: z.object({
    label: z.string(),
    /** Displayed large — e.g. "10M+", "3 yrs", "#1 on HN" */
    value: z.string(),
    description: z.string().optional(),
    order: z.number(),
  }),
});

// ── Art ────────────────────────────────────────────────────
const art = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    medium: z.enum(['charcoal', 'digital', 'sketch', 'study', 'collection']),
    date: z.coerce.date(),
    /** Path relative to public/images/art/ — locally hosted */
    image: z.string(),
    featured: z.boolean().default(false),
    /** Controls display order — lower = shown first */
    order: z.number(),
    description: z.string().optional(),
    /**
     * Optional link to the corresponding Instagram post.
     * Used as a static outbound link only — never as an image source.
     */
    instagramUrl: z.string().url().optional(),
    /**
     * Instagram post shortcode/ID.
     * Reserved for a future automated sync tool.
     * Not used by gallery components at render time.
     */
    instagramId: z.string().optional(),
    /**
     * ISO timestamp written by a future automated sync tool.
     * Indicates when this entry was last synced from Instagram.
     * Not used by gallery components at render time.
     */
    syncedAt: z.coerce.date().optional(),
  }),
});

export const collections = {
  projects,
  blog,
  experience,
  highlights,
  art,
};
