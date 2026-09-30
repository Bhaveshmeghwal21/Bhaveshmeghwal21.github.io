import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'
import Layout from '@/components/Layout'
import { getAllPostSlugs, getPostBySlug } from '@/lib/content.mjs'
import { formatDate } from '@/lib/format'
import type { Post } from '@/lib/types'

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
})

export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const post = getPostBySlug(String(params?.slug)) as Post | undefined
  if (!post) return { notFound: true }
  return { props: { post } }
}

export default function PostPage({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title={post.title} description={post.excerpt}>
      <article className="container-page py-14 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-fg"
          >
            <FiArrowLeft aria-hidden />
            All writing
          </Link>

          <header className="mt-8">
            <p className="text-sm text-subtle">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
            </p>
            <h1 className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-fg/80">{post.intro}</p>
          </header>

          <div className="prose-body mt-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

          <div className="mt-16 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-fg"
            >
              <FiArrowLeft aria-hidden />
              Back to all writing
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  )
}
