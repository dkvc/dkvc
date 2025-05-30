export interface TimelineItemData {
  additional_tags?: string[]
  major?: boolean
  private?: boolean
  id: string // A unique ID used for v-for keys
  project_type: string[]
  month_year: string
  project_name: string
  description: string
  tags: string[]
  link?: string
}

export interface EducationItemData {
  id: string
  degree?: string
  institution: string
  date: string
  location: string
  points: string[]
}

export interface ContactItemData {
  id: string
  name: string
  link: string
  display_type?: 'link' | 'text'
  iconType?: string
  iconContent?: string
}
