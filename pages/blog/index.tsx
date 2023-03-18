import { Client, linkResolver } from '../../prismic.config'

import Layout from '../../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'
import formatDate from '../../components/date'
import { queryRepeatableDocuments } from '../../prismic'

export default function Blog({ index, posts }) {
  const sortedPosts = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  )

  return (
    <Layout
      title={RichText.asText(index.data.title)}
      description={RichText.asText(index.data.description)}
    >
      <ul aria-label="posts" className="grid gap-8 grid-cols-1 pt-4">
        {sortedPosts.map((post) => (
          <li key={RichText.asText(post.data.title)}>
            <Link as={linkResolver(post)} href={linkResolver(post)}>
              <h2 className="font-operina-romano">
                {RichText.asText(post.data.title)}
              </h2>
              <p className="text-silver text-sm">
                {formatDate(post.data.date)}
              </p>
              <p>{RichText.render(post.data.description1)}</p>
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
