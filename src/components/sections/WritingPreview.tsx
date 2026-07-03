import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import Reveal from '@/components/motion/Reveal'
import { getFeaturedPosts } from '@/lib/content.mjs'

const posts = getFeaturedPosts()

export default function WritingPreview() {
  return (
    <section id="writing" className="section-container">
      <Reveal>
        <div className="eyebrow">Writing</div>
        <h2 className="section-title max-w-4xl text-[clamp(2.25rem,4vw,4.5rem)]">
          Notes from the builds
        </h2>
        <p className="section-copy">
          I write when a project teaches me something worth keeping. These are not
          content-marketing posts. They are field notes.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05}>
            <article className="surface h-full p-6">
              <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                {post.date} · {post.readTime}
              </div>
              <h3 className="mt-4 font-display text-2xl text-zinc-50">{post.title}</h3>
              <p className="mt-4 text-sm leading-7 text-zinc-300">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200"
              >
                Read post
                <FiArrowRight />
              </Link>
            </article>
          </Reveal>
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
