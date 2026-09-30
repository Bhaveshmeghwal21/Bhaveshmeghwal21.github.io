export type ProjectImage = {
  src: string
  alt: string
}

export type ProjectVideo = {
  src: string
  poster: string
  alt: string
}

export type Project = {
  title: string
  slug: string
  featured: boolean
  category: string
  timeframe: string
  status: string
  summary: string
  overview: string
  role: string
  outcomes: string[]
  stack: string[]
  images?: ProjectImage[]
  video?: ProjectVideo
  links: {
    live: string | null
    repo: string | null
    video?: string
    report?: string
    note: string
  }
}

/** The subset of a project a card needs; keeps page props small. */
export type ProjectSummary = Pick<
  Project,
  'title' | 'slug' | 'category' | 'timeframe' | 'summary' | 'stack'
>

export type PostSection = {
  heading: string
  paragraphs: string[]
}

export type Post = {
  title: string
  slug: string
  date: string
  readTime: string
  featured: boolean
  excerpt: string
  intro: string
  sections: PostSection[]
}

export type PostSummary = Pick<Post, 'title' | 'slug' | 'date' | 'readTime' | 'excerpt'>
