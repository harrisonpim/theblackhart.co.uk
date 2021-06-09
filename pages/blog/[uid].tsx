import { Client } from '../../prismic.config'
import Layout from '../../components/layout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../../components/sliceZone'
import formatDate from '../../components/date'
import { queryRepeatableDocuments } from '../../lib/queries'

export default function Post({ post }) {
  if (post && post.data) {
    const date = formatDate(post.data.date)
    const title = RichText.asText(post.data.title)

    return (
      <Layout title={title} description={post.data.description}>
        <div className="">
          <div className="mx-auto w-full pt-3">
            <h1 className="thornletter -mb-2">{title}</h1>
            <div className="text-sm text-silver pb-4">{date}</div>
          </div>
          <SliceZone sliceZone={post.data.body1} />
        </div>
      </Layout>
    )
  }

  return null
}

export async function getStaticProps({ params }) {
  const post = await Client().getByUID('blog-post', params.uid, {})
  return {
    props: {
      post,
    },
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === 'blog-post'
  )
  return {
    paths: documents.map((doc) => `/blog/${doc.uid}`),
    fallback: false,
  }
}
