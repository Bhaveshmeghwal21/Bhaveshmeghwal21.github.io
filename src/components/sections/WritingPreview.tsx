import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from '@/components/motion/Reveal'
import TraceRow from '@/components/motion/TraceRow'
import KineticHeading from '@/components/motion/KineticHeading'
import { getFeaturedPosts } from '@/lib/content.mjs'

const posts = getFeaturedPosts()

export default function WritingPreview() {
  return (
    <section id="writing" className="section-container">
      <Reveal>
        <div className="eyebrow">04 / Writing</div>
        <KineticHeading as="h2" className="section-title max-w-4xl text-[clamp(2.25rem,4vw,4.5rem)]">
          Notes from the work
        </KineticHeading>
        <p className="section-copy">
          I write after a project leaves a lesson behind.
        </p>
      </Reveal>

      <div className="mt-10 border-t border-white/10">
        {posts.map((post, index) => (
          <TraceRow key={post.slug} index={index}>
            <article className="grid gap-3 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:items-start">
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                {post.date}
                <br />
                {post.readTime}
              </div>
              <div>
                <h3 className="font-display text-2xl text-zinc-50">{post.title}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300">{post.excerpt}</p>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor
                className="inline-flex items-center gap-2 text-sm text-accent-300 hover:text-ember-300"
              >
                Read
                <FiArrowRight />
              </Link>
            </article>
          </TraceRow>
        ))}
      </div>

      <Reveal className="mt-8">
        <Link href="/blog" className="button-secondary">
          Visit the blog
          <FiArrowRight />
        </Link>
      </Reveal>
    </section>
  )
}
