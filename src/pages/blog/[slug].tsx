import Head from 'next/head'
import Link from 'next/link'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { FiArrowLeft } from 'react-icons/fi'
import SiteFooter from '@/components/layout/SiteFooter'
import SiteNav from '@/components/layout/SiteNav'
import Reveal from '@/components/motion/Reveal'
import { getAllPostSlugs, getPostBySlug } from '@/lib/content.mjs'

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getAllPostSlugs().map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ post: any }> = async ({ params }) => {
  const slug = String(params?.slug)
  const post = getPostBySlug(slug)

  if (!post) {
    return { notFound: true }
  }

  return {
    props: {
      post,
    },
  }
}

export default function BlogPostPage({
  post,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{post.title} | Bhavesh Meghwal</title>
        <meta name="description" content={post.excerpt} />
      </Head>

      <SiteNav />
      <main>
        <section className="section-container pt-12 md:pt-20">
          <Reveal>
            <Link href="/blog" className="eyebrow">
              <FiArrowLeft />
              Back to blog
            </Link>
            <div className="mt-6 text-xs uppercase tracking-[0.14em] text-zinc-500">
              {post.date} · {post.readTime}
            </div>
            <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,5vw,5.5rem)] leading-[0.98] text-zinc-50">
              {post.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">{post.intro}</p>
          </Reveal>

          <Reveal className="surface mt-12 p-6 md:p-10" delay={0.08}>
            <article className="reading-content">
              {post.sections.map((section: any) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph: string) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </article>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
