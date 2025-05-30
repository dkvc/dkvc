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
    iconType: 'material',
    iconContent: 'mail',
  },
  {
    id: '2',
    name: 'GitHub',
    link: 'https://github.com/dkvc',
    iconType: 'svg',
    iconContent: '/icons/github.svg',
  },
  {
    id: '3',
    name: 'GitLab',
    link: 'https://gitlab.com/dkvc',
    iconType: 'svg',
    iconContent: '/icons/gitlab.svg',
  },
  {
    id: '4',
    name: 'LinkedIn',
    link: 'https://linkedin.com/in/dkvc',
    iconType: 'svg',
    iconContent: '/icons/linkedin.svg',
  },
  {
    id: '5',
    name: 'Mastodon',
    link: 'https://infosec.exchange/@dkvc',
    iconType: 'svg',
    iconContent: '/icons/mastodon.svg',
  },
]
