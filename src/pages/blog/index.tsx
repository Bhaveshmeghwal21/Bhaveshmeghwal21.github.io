import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Layout from '@/components/Layout'
import PageHeader from '@/components/PageHeader'
import PostList from '@/components/PostList'
import { posts as allPosts } from '@/content/blog.mjs'
import { toPostSummary } from '@/lib/content.mjs'
import type { PostSummary } from '@/lib/types'

export const getStaticProps: GetStaticProps<{ posts: PostSummary[] }> = async () => ({
  props: {
    posts: [...allPosts].sort((a, b) => b.date.localeCompare(a.date)).map(toPostSummary),
  },
})

export default function BlogPage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout
      title="Writing"
      description="Essays by Bhavesh Meghwal on working with AI, leading people, and what building drones and software teaches about both."
    >
      <div className="container-page py-14 sm:py-20">
        <PageHeader title="Writing">
          <p>
            Essays on working with AI and leading people. I write one when something I am building
            teaches me a lesson worth keeping.
          </p>
        </PageHeader>
        <div className="mt-12">
          <PostList posts={posts} headingAs="h2" />
        </div>
      </div>
    </Layout>
  )
}
