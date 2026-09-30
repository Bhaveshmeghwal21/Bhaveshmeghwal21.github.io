import Link from 'next/link'
import Layout from '@/components/Layout'
import PageHeader from '@/components/PageHeader'

export default function NotFound() {
  return (
    <Layout title="Page not found" noindex>
      <div className="container-page py-20 sm:py-28">
        <PageHeader title="This page does not exist">
          <p>
            It may have moved, or it was one of the older posts I have since taken down. Everything
            current is linked below.
          </p>
        </PageHeader>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn-primary">
            Home
          </Link>
          <Link href="/blog" className="btn-secondary">
            Writing
          </Link>
          <Link href="/projects" className="btn-secondary">
            Projects
          </Link>
        </div>
      </div>
    </Layout>
  )
}
