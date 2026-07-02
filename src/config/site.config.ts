/**
 * site.config.ts
 * ──────────────
 * Single source of truth for all personal metadata, social links,
 * SEO defaults, and feature flags.
 *
 * Every page, layout, and component imports from here.
 * Updating your identity requires editing only this file.
 */

// ── Types ──────────────────────────────────────────────────

export interface SocialLinks {
  github: string;
  linkedin: string;
  x: string;
  /** ArtStation or Instagram for art work */
  artstation?: string;
  instagram?: string;
  email: string;
  /** Path relative to public/ — e.g. "/resume.pdf" */
  resume: string;
}

export interface SeoConfig {
  title: string;
  titleTemplate: string;
  description: string;
  /** Path relative to public/ — e.g. "/images/og/default.png" */
  ogImage: string;
  twitterHandle?: string;
}

export interface AskAIConfig {
  chatgptUrl: string;
  claudeUrl: string;
  prompt: string;
}

export interface FeatureFlags {
  /** Live local time in hero section */
  liveTime: boolean;
  /** Dark / light theme toggle */
  themeToggle: boolean;
  /** Global keyboard shortcut panel (press ?) */
  keyboardShortcuts: boolean;
  /** RSS feed at /rss.xml */
  rss: boolean;
  /** Pagefind-powered site search */
  search: boolean;
  /** Reading mode toggle on blog posts */
  readingMode: boolean;
  /** Ask ChatGPT / Claude buttons */
  askAI: boolean;
  /** Copy post as Markdown button (blog posts only) */
  copyMarkdown: boolean;
}

export interface SiteConfig {
  /** Display name used throughout the UI */
  displayName: string;
  /** Full legal name — used in JSON-LD and formal contexts */
  fullName: string;
  /** One-line role descriptor */
  role: string;
  /** Displayed location */
  location: string;
  /** IANA timezone identifier */
  timezone: string;
  /** One-sentence headline */
  tagline: string;
  /** Two-sentence introduction displayed in the hero */
  intro: string;
  /** Availability status displayed in the hero */
  availability: string;
  /** Whether the person is currently available */
  isAvailable: boolean;
  social: SocialLinks;
  seo: SeoConfig;
  askAI: AskAIConfig;
  features: FeatureFlags;
  /** Canonical base URL — must match astro.config.mjs `site` */
  siteUrl: string;
}

// ── Configuration ──────────────────────────────────────────

export const siteConfig: SiteConfig = {
  // ── Identity ──────────────────────────────────────────────
  displayName: 'Jey V',
  fullName: 'Jeyadheep V',
  role: 'Software Engineer · Builder · Artist',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  tagline: 'Software. Sketchbooks. Side quests.',
  intro:
    'I build things — AI pipelines, deployment platforms, weekend tools.' +
    ' Also sketches. This is where the work lives.',
  availability: 'Currently at IBM ISL. Building on weekends.',
  isAvailable: false,
  siteUrl: 'https://jeyv.in',

  // ── Social links ───────────────────────────────────────────
  // TODO: Replace placeholder URLs with real profile links
  social: {
    github: 'https://github.com/BackBenchDreamer',      
    linkedin: 'https://www.linkedin.com/in/jeyv/',
    x: 'https://x.com/Kit6992',                
    instagram: 'https://instagram.com/jeyadheepv', // Art Account (Only Instagram account right now)
    artstation: 'https://www.artstation.com/jeyv', // EMPTY, Just created it
    email: 'contact@jeyv.in',                       // DOMAIN IS LIVE 
    resume: '/resume.pdf',                          // DONE
  },

  // ── SEO defaults ───────────────────────────────────────────
  seo: {
    title: 'Jey V • Software Engineer, AI Systems & Creative Projects',
    titleTemplate: '%s · Jey V',
    description:
      'The internet home of Jey V. Software projects, AI experiments, technical blogs, sketches, and everything I\'m building on weekends.',
    ogImage: '/images/og/default.png', // DONE
    twitterHandle: '@Kit6992',      // TODO: update
  },

  // ── Ask AI ─────────────────────────────────────────────────
  // The prompt gives ChatGPT / Claude enough context to answer
  // questions about Jey V accurately.
  askAI: {
    prompt:
      'You are answering questions about Jey V, a software engineer who enjoys building things, learning in public, and documenting interesting projects. ' +
      'This website is a personal portfolio rather than a hiring page. It showcases software projects, AI experiments, sketches, blog posts, and ideas built outside of work. ' +
      'When answering, focus on explaining projects, design decisions, and technical trade-offs, and encourage visitors to explore related projects when relevant. ' +
      'If asked about skills, describe demonstrated experience rather than exaggerating expertise. ' +
      'If information is not available on the site, say so instead of guessing. ' +
      'The portfolio lives at https://jeyv.in.',
    chatgptUrl: 'https://chatgpt.com/?q=',
    claudeUrl:  'https://claude.ai/new?q=',
  },

  // ── Feature flags ──────────────────────────────────────────
  // Set any flag to `false` to completely disable the feature.
  // Disabled features ship zero bytes to the client.
  features: {
    liveTime:          true,
    themeToggle:       true,
    keyboardShortcuts: true,
    rss:               true,
    search:            true,
    readingMode:       true,
    askAI:             true,
    copyMarkdown:      true,
  },
};
