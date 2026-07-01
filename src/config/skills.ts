/**
 * skills.ts
 * ─────────
 * Typed skills data grouped by category.
 * Edit this file to update the Skills section — no component changes needed.
 */

export interface Skill {
  name: string;
  /** Optional URL to the technology's homepage */
  url?: string;
}

export interface SkillGroup {
  category: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', url: 'https://python.org' },
      { name: 'Go', url: 'https://go.dev' },
      { name: 'Java', url: 'https://dev.java' },
      { name: 'TypeScript', url: 'https://typescriptlang.org' },
      { name: 'SQL' },
    ],
  },
  {
    category: 'Frameworks',
    skills: [
      { name: 'React', url: 'https://react.dev' },
      { name: 'Next.js', url: 'https://nextjs.org' },
      { name: 'Astro', url: 'https://astro.build' },
      { name: 'FastAPI', url: 'https://fastapi.tiangolo.com' },
      { name: 'Express.js', url: 'https://expressjs.com' },
    ],
  },
  {
    category: 'Cloud',
    skills: [
      { name: 'Docker', url: 'https://docker.com' },
      { name: 'Kubernetes', url: 'https://kubernetes.io' },
      { name: 'Oracle Cloud', url: 'https://cloud.oracle.com' },
      { name: 'Vercel', url: 'https://vercel.com' },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Git', url: 'https://git-scm.com' },
      { name: 'GitHub Actions', url: 'https://github.com/features/actions' },
      { name: 'Linux', url: 'https://kernel.org' },
      { name: 'Docker Compose', url: 'https://docs.docker.com/compose/' },
    ],
  },
  {
    category: 'AI',
    skills: [
      { name: 'OpenAI API', url: 'https://openai.com/api' },
      { name: 'LangGraph', url: 'https://langchain-ai.github.io/langgraph/' },
      { name: 'PyTorch', url: 'https://pytorch.org' },
      { name: 'scikit-learn', url: 'https://scikit-learn.org' },
      { name: 'OpenCV', url: 'https://opencv.org' },
    ],
  },
  {
    category: 'Tools',
    skills: [
      { name: 'Git', url: 'https://git-scm.com' },
      { name: 'Postman', url: 'https://postman.com' },
      { name: 'VS Code', url: 'https://code.visualstudio.com' },
      { name: 'Figma', url: 'https://figma.com' },
    ],
  },
  {
    category: 'Design',
    skills: [
      { name: 'Figma', url: 'https://figma.com' },
      { name: 'Procreate', url: 'https://procreate.com' },
      { name: 'Adobe Fresco' },
    ],
  },
  {
  category: 'Currently Learning',
    skills: [
      { name: 'Operator SDK' },
      { name: 'Kubernetes Operators' },
      { name: 'LangGraph' },
      { name: 'OpenTelemetry' },
      { name: 'Go' },
    ],
  },
];
