/**
 * Using `contact-data.ts` instead of fetching from `contact-data.json` during runtime or importing it during build time,
 * provides optimal performance, ensures strong type safety and allows for in-bundle static loading.
 */
import type { ContactItemData } from '@/types'

export const contacts: ContactItemData[] = [
  {
    id: '1',
    name: 'Email',
    link: 'mailto:dhanush@dkvc.org',
    iconClass: 'fas fa-envelope',
  },
  {
    id: '2',
    name: 'GitHub',
    link: 'https://github.com/dkvc',
    iconClass: 'fab fa-github',
  },
  {
    id: '3',
    name: 'GitLab',
    link: 'https://gitlab.com/dkvc',
    iconClass: 'fab fa-gitlab',
  },
  {
    id: '4',
    name: 'LinkedIn',
    link: 'https://linkedin.com/in/dkvc',
    iconClass: 'fab fa-linkedin',
  },
  {
    id: '5',
    name: 'Mastodon',
    link: 'https://infosec.exchange/@dkvc',
    iconClass: 'fab fa-mastodon',
  },
]
