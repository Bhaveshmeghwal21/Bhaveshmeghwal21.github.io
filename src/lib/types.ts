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

/** A list inside a post section; ordered renders as a numbered list. */
export type PostListBlock = {
  list: string[]
  ordered?: boolean
}

/** A passage quoted from another author, shown in italics with attribution. */
export type PostQuoteBlock = {
  quote: string
  /** Who said it, shown under the quote. */
  cite: string
}

export type PostBlock = string | PostListBlock | PostQuoteBlock

export type PostSection = {
  heading: string
  /** Plain strings render as paragraphs; list and quote blocks render in order. */
  paragraphs: PostBlock[]
}

export type PostImage = {
  src: string
  alt: string
  width: number
  height: number
  caption: string
  credit: { label: string; href: string }
}

export type Post = {
  title: string
  slug: string
  date: string
  readTime: string
  featured: boolean
  excerpt: string
  intro: string
  /** Optional illustration shown between the intro and the first section. */
  image?: PostImage
  sections: PostSection[]
  /** Optional source or credit line shown after the last section. */
  note?: string
}

export type PostSummary = Pick<Post, 'title' | 'slug' | 'date' | 'readTime' | 'excerpt'>
