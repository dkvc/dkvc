/**
 * Using `education-data.ts` instead of fetching from `education-data.json` during runtime or importing it during build time,
 * provides optimal performance, ensures strong type safety and allows for in-bundle static loading.
 */
import type { EducationItemData } from '@/types'

export const educationData: EducationItemData[] = [
  {
    id: '1',
    degree: 'Bachelor of Technology in Computer Science and Engineering (Artificial Intelligence)',
    institution: 'Amrita Vishwa Vidyapeetham',
    date: 'September 2021 - June 2025 (Expected)',
    location: 'Tamil Nadu, India',
    points: [
      'Major Work on Neural Networks, Model Optimization and Reinforcement Learning',
      'Lead Developer of Winning Team in an inter-college machine learning competition focused on improving data efficiency of power grid systems',
      'CGPA: 7.6 / 10',
    ],
  },
  {
    id: '2',
    degree: 'High School',
    institution: 'Narayana Junior College',
    date: 'April 2019 - July 2021',
    location: 'Andhra Pradesh, India',
    points: ['Marks: 97.8%'],
  },
]
