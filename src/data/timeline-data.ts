/**
 * Using `timeline-data.ts` instead of fetching from `timeline-data.json` during runtime or importing it during build time,
 * provides optimal performance, ensures strong type safety and allows for in-bundle static loading.
 */
import type { TimelineItemData } from '@/types'

export const timelineData: TimelineItemData[] = [
  {
    id: '1',
    project_type: ['AI', 'Web'],
    month_year: 'Jan 2023',
    project_name: 'Intelligent Search Platform',
    description:
      'Developed a semantic search engine using vector databases and transformer models, integrated into a web interface.',
    tags: ['Python', 'FastAPI', 'React', 'Pinecone', 'NLP'],
  },
  {
    id: '2',
    project_type: ['Game Dev'],
    month_year: 'Apr 2023',
    project_name: 'Pixel Adventure RPG',
    description:
      'Created a 2D top-down RPG prototype focusing on procedural world generation and core combat mechanics.',
    tags: ['C#', 'Unity', 'Aseprite', 'Procedural Generation'],
  },
  {
    id: '3',
    project_type: ['Web'],
    month_year: 'Jul 2023',
    project_name: 'E-commerce Site Refactor',
    description:
      'Migrated a legacy e-commerce platform to a modern stack, improving performance and user experience.',
    tags: ['TypeScript', 'Next.js', 'PostgreSQL', 'Stripe', 'AWS'],
  },
  {
    id: '4',
    project_type: ['AI'],
    month_year: 'Oct 2023',
    project_name: 'Image Recognition API',
    description:
      'Built and deployed a REST API for classifying uploaded images using a custom-trained CNN model.',
    tags: ['Python', 'TensorFlow', 'Flask', 'Docker', 'GCP'],
  },
  {
    id: '5',
    project_type: ['Game Dev', 'AI'],
    month_year: 'Jan 2024',
    project_name: 'NPC Dialogue System',
    description:
      'Implemented an AI-powered dynamic dialogue system for game NPCs, allowing for more natural interactions.',
    tags: ['Unity', 'C#', 'LLM', 'Dialogue Trees'],
  },
  {
    id: '6',
    project_type: ['Web', 'Data Viz'],
    month_year: 'Apr 2024',
    project_name: 'Interactive Dashboard',
    description:
      'Designed and developed a real-time data visualization dashboard for tracking key business metrics.',
    tags: ['React', 'D3.js', 'Node.js', 'WebSocket'],
  },
]

export const typeColors: Record<string, string> = {
  default: 'hsl(213.82, 30.05%, 64.12%)', // Fallback/misc color
  ai: 'hsl(122.42, 39.44%, 49.22%)', // Green
  'game-dev': 'hsl(206.57, 89.74%, 54.12%)', // Blue
  web: 'hsl(322.02, 100%, 51.37%)', // Pink
  'data-viz': 'hsl(291.24, 63.72%, 42.16%)', // Purple
  mobile: 'hsl(14.39, 100%, 56.67%)', // Deep Orange
}
