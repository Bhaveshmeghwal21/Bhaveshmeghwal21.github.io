import Link from 'next/link'
import { formatDate } from '@/lib/format'
import type { PostSummary } from '@/lib/types'

type PostListProps = {
  posts: PostSummary[]
  headingAs?: 'h2' | 'h3'
}

export default function PostList({ posts, headingAs: Heading = 'h3' }: PostListProps) {
  return (
    <ul className="divide-y divide-line border-t border-line">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-1 rounded-md py-5 sm:grid-cols-[minmax(0,1fr)_8rem] sm:gap-8"
          >
            <div>
              <Heading className="font-medium text-fg transition-colors group-hover:text-accent">
                {post.title}
              </Heading>
              <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            </div>
            <p className="order-first text-sm tabular-nums text-subtle sm:order-none sm:text-right">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden className="sm:hidden">
                {' · '}
              </span>
              <span className="sm:mt-1 sm:block">{post.readTime}</span>
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
