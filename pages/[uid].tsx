import { Client } from '../prismic.config'
import Layout from '../components/layout'
import { RichText } from 'prismic-reactjs'
import SliceZone from '../components/sliceZone'
import { queryRepeatableDocuments } from '../prismic'

const Page = ({ page }) => {
  if (page && page.data) {
    const title = RichText.asText(page.data.title)

    return (
      <Layout title={title}>
        <div>
          <h1>{title}</h1>
          <SliceZone sliceZone={page.data.body} />
        </div>
      </Layout>
    )
  }
  return null
}

export async function getStaticProps({ params }) {
  const page = await Client().getByUID('page', params.uid, {})
  return {
    props: {
      page,
    },
  }
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments((doc) => doc.type === 'page')
  return {
    paths: documents.map((doc) => `/${doc.uid}`),
    fallback: false,
  }
}

export default Page
