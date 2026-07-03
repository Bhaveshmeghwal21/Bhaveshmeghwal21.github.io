import Head from 'next/head'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteNav from '@/components/layout/SiteNav'
import Reveal from '@/components/motion/Reveal'
import { posts } from '@/content/blog.mjs'

export default function BlogPage() {
  return (
    <>
      <Head>
        <title>Blog | Bhavesh Meghwal</title>
        <meta
          name="description"
          content="Writing on robotics, AI products, and operator-facing system design by Bhavesh Meghwal."
        />
      </Head>

      <SiteNav />
      <main>
        <section className="section-container pt-12 md:pt-20">
          <Reveal>
            <div className="eyebrow">Blog</div>
            <h1 className="section-title max-w-4xl text-[clamp(2.5rem,5vw,5.5rem)]">
              Writing I wanted to keep
            </h1>
            <p className="section-copy max-w-3xl">
              I write after a build leaves a mark. Some posts come from flight
              systems. Some come from product work. All of them come from real
              projects.
            </p>
          </Reveal>

          <div className="mt-10 border-t border-white/10">
            {posts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.04} className="border-b border-white/10 py-6">
                <article className="grid gap-3 lg:grid-cols-[12rem_minmax(0,1fr)_auto] lg:items-start">
                  <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">
                    {post.date}
                    <br />
                    {post.readTime}
                  </div>
                  <div>
                    <h2 className="font-display text-3xl text-zinc-50">{post.title}</h2>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-zinc-300">
                      {post.excerpt}
                    </p>
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
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
