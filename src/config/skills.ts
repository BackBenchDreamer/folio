/**
 * skills.ts
 * ─────────
 * Curated skills grouped by category.
 * Reflects demonstrated work and current direction — not an ATS dump.
 */

export interface Skill {
  name: string;
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
      { name: 'Python',     url: 'https://python.org' },
      { name: 'Go',         url: 'https://go.dev' },
      { name: 'Java',       url: 'https://dev.java' },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'SQL' },
    ],
  },
  {
    category: 'AI & ML',
    skills: [
      { name: 'LLM Applications' },
      { name: 'Document Intelligence' },
      { name: 'PyTorch',     url: 'https://pytorch.org' },
      { name: 'scikit-learn', url: 'https://scikit-learn.org' },
      { name: 'OpenCV',      url: 'https://opencv.org' },
    ],
  },
  {
    category: 'Infrastructure',
    skills: [
      { name: 'Kubernetes',   url: 'https://kubernetes.io' },
      { name: 'Operator SDK', url: 'https://sdk.operatorframework.io' },
      { name: 'Docker',       url: 'https://docker.com' },
      { name: 'Linux',        url: 'https://kernel.org' },
      { name: 'Oracle Cloud', url: 'https://cloud.oracle.com' },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js',   url: 'https://nodejs.org' },
      { name: 'FastAPI',   url: 'https://fastapi.tiangolo.com' },
      { name: 'REST APIs' },
    ],
  },
  {
    category: 'Frontend',
    skills: [
      { name: 'React',   url: 'https://react.dev' },
      { name: 'Astro',   url: 'https://astro.build' },
      { name: 'Three.js', url: 'https://threejs.org' },
    ],
  },
  {
    category: 'Design & Art',
    skills: [
      { name: 'Figma',         url: 'https://figma.com' },
      { name: 'Procreate',     url: 'https://procreate.com' },
      { name: 'Adobe Fresco' },
    ],
  },
  {
    category: 'Currently learning',
    skills: [
      { name: 'Operator patterns in Go' },
      { name: 'OpenTelemetry', url: 'https://opentelemetry.io' },
      { name: 'LangGraph',     url: 'https://langchain-ai.github.io/langgraph/' },
    ],
  },
];
