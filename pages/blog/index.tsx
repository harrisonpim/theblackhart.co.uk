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
      <ul aria-label="posts">
        {sortedPosts.map((post) => (
          <li className="pb-6" key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <a className="no-underline">
                <h2>{RichText.asText(post.data.title)}</h2>
              </a>
            </Link>
            <div className="text-silver">{formatDate(post.data.date)}</div>
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
