import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
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

          {post.image ? (
            <figure className="mt-12">
              <Image
                src={post.image.src}
                alt={post.image.alt}
                width={post.image.width}
                height={post.image.height}
                priority
                sizes="(min-width: 640px) 28rem, 100vw"
                className="mx-auto w-full max-w-md rounded-lg border border-line"
              />
              <figcaption className="mx-auto mt-4 max-w-md text-center text-sm leading-6 text-muted">
                {post.image.caption}{' '}
                <a
                  href={post.image.credit.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle underline-offset-4 hover:text-fg hover:underline"
                >
                  {post.image.credit.label}
                </a>
              </figcaption>
            </figure>
          ) : null}

          <div className="prose-body mt-10">
            {post.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((block, index) => {
                  if (typeof block === 'string') return <p key={block}>{block}</p>
                  if ('quote' in block) {
                    return (
                      <figure key={`quote-${index}`} className="quote">
                        <blockquote>{block.quote}</blockquote>
                        <figcaption>— {block.cite}</figcaption>
                      </figure>
                    )
                  }
                  const List = block.ordered ? 'ol' : 'ul'
                  return (
                    <List key={`list-${index}`}>
                      {block.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </List>
                  )
                })}
              </section>
            ))}
            {post.note ? <p className="note">{post.note}</p> : null}
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
