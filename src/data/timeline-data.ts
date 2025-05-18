/**
 * Using `timeline-data.ts` instead of fetching from `timeline-data.json` during runtime or importing it during build time,
 * provides optimal performance, ensures strong type safety and allows for in-bundle static loading.
 */
import type { TimelineItemData } from '@/types'

export const timelineData: TimelineItemData[] = [
  {
    id: '1',
    project_type: ['Web'],
    month_year: 'May 2025',
    project_name: 'This Website (dkvc.org)',
    description:
      'Developed with over 14+ custom Vue components, animating over 90% of UI for a fluid experience',
    tags: ['Vue', 'UI/UX', 'Typescript'],
    additional_tags: ['Agile', 'HTML', 'CSS', 'Git', 'Javascript'],
    link: 'https://dkvc.org',
    major: true,
  },
  {
    id: '2',
    project_type: ['Web'],
    month_year: 'May 2025',
    project_name: 'Ifpshare Downloader',
    description: 'Automatically download images and creates a PDF from a given Ifpshare URL',
    tags: ['Vue', 'UI/UX', 'Typescript', 'Mobile-first', 'Cloudflare Workers'],
    additional_tags: ['HTML', 'CSS', 'Git', 'Javascript'],
    link: 'https://dhatri.dkvc.org',
  },
  {
    id: '3',
    project_type: ['AI', 'Deep Learning', 'Publication Draft'],
    month_year: 'April 2025',
    project_name: 'Comparing PINNs vs PIKANs',
    description:
      'Developed and Optimized Physics-Informed Neural Networks (PINNs) and Kolmogorov-Arnold Networks (PIKANs) for fluid flow problems',
    tags: ['Python', 'Pytorch', 'Neural Networks', 'Model Optimization', 'JAX'],
    additional_tags: ['Agile', 'Git'],
    link: 'https://github.com/gulfgap',
    major: true,
  },
  {
    id: '4',
    project_type: ['AI', 'Reinforcement Learning', 'Natural Language Processing'],
    month_year: 'November 2024',
    project_name: 'Hierarchical Actor-Critic RL for Improved Text Summarization',
    description:
      'Summarizes a large amount of data by decomposing it into high-level objectives and low-level detailed summary',
    tags: ['Python', 'Pytorch', 'Neural Networks', 'Transformers'],
    additional_tags: ['Git'],
    private: true,
    major: true,
  },
  {
    id: '5',
    project_type: ['Optimization', 'Web', 'Data Viz'],
    month_year: 'November 2024',
    project_name: 'Dynamic Vehicle Routing Optimization Platform with Dataset-Driven Solver',
    description:
      'Designed visualizations to analyze and compare Capacitated Vehicle Routing Problem with Time Windows (CVRPTW) solutions derived from genetic algorithms and OR-tools',
    tags: ['Python', 'Javascript', 'Flask', 'D3.js', 'PostgreSQL', 'SQL'],
    additional_tags: ['HTML', 'CSS', 'Git', 'Javascript'],
    link: 'https://github.com/dkvc/AutumSem_OR',
  },
  {
    id: '6',
    project_type: ['Web', 'Optimization', 'AI'],
    month_year: 'October 2024',
    project_name: '3D Space Shooter Webgame Optimization for Thin Clients',
    description:
      'Developed a space shooter simulation with a mini-physics engine for running large physics simulations on thin client systems',
    tags: ['Javascript', 'Node.js', 'Three.js', 'Websockets', 'LLMs'],
    additional_tags: ['CSS', 'Git', 'Javascript'],
    link: 'https://github.com/chatotp/frogbar',
  },
  {
    id: '7',
    project_type: ['AI', 'Reinforcement Learning'],
    month_year: 'October 2024',
    project_name: 'Warfarin Dosage Prediction using Ensemble Sampling',
    description:
      'Improved prediction time of Warfarin Dosage by ensemble of models compared to other sampling methods on large datasets',
    tags: ['Python', 'Pytorch', 'Data Analysis'],
    additional_tags: ['Git'],
    link: 'https://github.com/dkvc/Ensemble_Warfarin',
  },
  {
    id: '8',
    project_type: ['AI', 'Natural Language Processing'],
    month_year: 'May 2024',
    project_name: 'Hate Speech Detection with LSTM and LSTM-PSO',
    description:
      'Improved hate speech detection on a given input by using LSTM (Long Short Term Memory) and LSTM-PSO (Particle Swarm Optimization)',
    tags: ['Python', 'Pytorch', 'Neural Networks', 'Transformers'],
    additional_tags: ['Git'],
    private: true,
  },
  {
    id: '9',
    project_type: ['AI', 'Computer Vision'],
    month_year: 'April 2024',
    project_name: 'Brain MRI Segmentation using U-Net and U-Net Attention',
    description:
      'Enhanced automated brain segmentation by incorporating Attention to U-Net architecture',
    tags: ['Python', 'OpenCV', 'Pytorch', 'Neural Networks'],
    additional_tags: ['Git'],
    private: true,
  },
  {
    id: '10',
    project_type: ['DevOps', 'Tool'],
    month_year: 'April 2024',
    project_name: 'gpkgstatus',
    description:
      'Command-line tool to get current package status from Fedora Updates System with 25K+ downloads',
    tags: ['Python', 'Docker', 'CI/CD', 'Git', 'Unit Testing', 'Web Scraping'],
    additional_tags: ['Linux', 'Git'],
    link: 'https://dkvc.github.io/gpkgstatus',
  },
  {
    id: '11',
    project_type: ['AI', 'Computer Vision'],
    month_year: 'January 2024',
    project_name: 'Video Compression and Reconstruction using DMD',
    description:
      'Enhanced video reconstruction from compression by using Dynamic Mode Decomposition (DMD)',
    tags: ['Python', 'OpenCV', 'Algorithms'],
    additional_tags: ['Git'],
    private: true,
  },
  {
    id: '12',
    project_type: ['Web', 'Blockchain', 'Cryptography'],
    month_year: 'November 2023',
    project_name: 'Real-time Chat System using OTP (One Time Pads)',
    description:
      'Engineered a chat system based on OTP, including API for file transfers and protocol handling for blockchain payments',
    tags: [
      'Python',
      'C#',
      'Javascript',
      'ASP.NET',
      'gRPC',
      'SignalR',
      'PostgreSQL',
      'Docker Compose',
      'MVC',
      'REST API',
    ],
    additional_tags: ['Docker', 'SQL', 'HTML', 'CSS', 'Git', 'Websockets'],
    link: 'https://github.com/chatotp/',
    major: true,
  },
  {
    id: '13',
    project_type: ['Web', 'DevOps', 'Tool'],
    month_year: 'March 2023',
    project_name: 'PapersWithCode RSS (pwcode)',
    description: 'Distributing latest papers from PapersWithCode over RSS/Atom feed to 5K+ users',
    tags: ['Python', 'FastAPI', 'Git', 'RSS'],
    link: 'https://github.com/dkvc/pwcode',
  },
  {
    id: '14',
    project_type: ['Data-Viz', 'Web', 'Tool'],
    month_year: 'November 2022',
    project_name: 'Conversation Flow Analyzer',
    description: 'A web app to analyzes chat app data and provides its data insights',
    tags: ['Python', 'CI/CD', 'Streamlit', 'Data Analysis'],
    additional_tags: ['Git'],
    private: true,
  },
  {
    id: '15',
    project_type: ['Tool'],
    month_year: 'June 2022',
    project_name: 'Building Computer Components from Scratch',
    description:
      'Revised computer components from Elements of Computing Systems in Object-Oriented Java',
    tags: ['Java', 'OOP', 'Unit Testing'],
    additional_tags: ['Git'],
    private: true,
  },
]

export const typeColors: Record<string, string> = {
  default: 'hsl(223, 29%, 25%)', // Fallback/misc color

  ai: 'hsl(122.42, 39.44%, 49.22%)', // Green
  'deep-learning': 'hsl(291.24, 63.72%, 42.16%)', // light purple
  'reinforcement-learning': 'hsl(222, 90%, 54%)', // dark blue
  'natural-language-processing': 'hsl(51 100% 35.6%)', // dark yellow
  'computer-vision': 'hsl(271 100% 34.3%)', // dark purple

  web: 'hsl(322.02, 100%, 51.37%)', // Pink
  optimization: 'hsl(14.39, 100%, 56.67%)', // Deep Orange

  'data-viz': 'hsl(165 100% 35.6%)', // cyan
  devops: 'hsl(4 100% 36.2%)', // red
  tool: 'hsl(183 100% 36%)', // light blue
}
