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
          Notes from the work
        </h2>
        <p className="section-copy">
          I write after a project leaves a lesson behind.
        </p>
      </Reveal>

      <div className="mt-10 border-t border-white/10">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 0.05} className="border-b border-white/10 py-6">
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
                className="inline-flex items-center gap-2 text-sm text-sky-300 hover:text-sky-200"
              >
                Read
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
