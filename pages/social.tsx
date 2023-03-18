import { Client } from '../prismic.config'
import Layout from '../components/layout'
import Link from 'next/link'
import { RichText } from 'prismic-reactjs'

const Linktree = ({ data }) => {
  const title = RichText.asText(data.title)
  const description = RichText.asText(data.description)

  return (
    <Layout includeFooter={false} title={title} description={description}>
      <ul className="text-center thornletter">
        {data.body.map((link) => (
          <li className="align-middle py-6" key={link.primary.text[0].text}>
            <Link href={link.primary.url.url}>{link.primary.text[0].text}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await Client().getSingle('linktree', {})
  const data = response.data

  return {
    props: {
      data,
    },
  }
}

export default Linktree
