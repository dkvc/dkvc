export interface SkillCategory {
  name: string
  skills: string[]
}

export const skillsData: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['Python', 'Typescript', 'JavaScript', 'C#', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      'Pytorch',
      'Vue',
      'JAX',
      'Langchain',
      'FastAPI',
      'Flask',
      'Three.js',
      'Node.js',
      'ASP.NET',
    ],
  },
  {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'SQLite'],
  },
  {
    name: 'Tools & Platforms',
    skills: ['AWS', 'Azure', 'Cloudflare Workers', 'Docker', 'Linux', 'Git', 'Websockets'],
  },
  {
    name: 'Methodologies',
    skills: ['Agile', 'CI/CD', 'DevOps', 'MVC', 'OOP', 'Optimization', 'REST API', 'Unit Testing'],
  },
  {
    name: 'AI Specific',
    skills: ['Model Optimization', 'Neural Networks', 'Reinforcement Learning'],
  },
]

// Helper to get a flat list of all unique skill names (useful for matching)
export const allSkillNames: string[] = [
  ...new Set(skillsData.flatMap((category) => category.skills)),
]
