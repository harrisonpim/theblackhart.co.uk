import { Client, linkResolver } from '../../prismic.config'

import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import formatDate from '../../components/date'
import { queryRepeatableDocuments } from '../../lib/queries'

export default function Blog({ index, posts }) {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <Layout
      title={RichText.asText(index.data.title)}
      description={RichText.asText(index.data.description)}
    >
      <ul aria-label="posts" className="grid gap-8 grid-cols-1">
        {sortedPosts.map((post) => (
          <li key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline">
                <p className="text-silver">{formatDate(post.data.date)}</p>
                <h2>{RichText.asText(post.data.title)}</h2>
                <p className="pt-1">{RichText.render(post.data.description)}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const index = await Client().getSingle('blog-home', {})
  const posts = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )

  return {
    props: { index, posts },
  }
}
