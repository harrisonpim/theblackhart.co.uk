import { Client, linkResolver } from '../prismic.config'

import Footer from '@components/footer'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '@components/nav'
import { RichText } from 'prismic-reactjs'

export default function Index({ index }) {
  const body = index.data.body.map((slice) => {
    switch (slice.slice_type) {
      case 'header':
        return (
          <header className="flex flex-col h-screen justify-between text-center">
            <Nav className="pt-2 text-xs lg:text-base" />
            <div className="w-4/5 m-auto">
              <h1>
                <Image
                  src={slice.primary.title_image.url}
                  alt={slice.primary.title_image.alt}
                  height={slice.primary.title_image.dimensions.height}
                  width={slice.primary.title_image.dimensions.width}
                  className="max-h-full max-w-full"
                />
              </h1>
              <p className="uppercase font-bold lg:text-xl leading-none">
                <RichText
                  render={slice.primary.description}
                  linkResolver={linkResolver}
                />
              </p>
            </div>
          </header>
        )
      case 'section':
        return (
          <div
            className="h-screen w-full table bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${slice.primary.background_image.url})`,
            }}
          >
            <div className="flex flex-col h-screen justify-between text-center">
              <div className="my-auto text-left leading-tight px-16 lg:px-32">
                <h2 className="max-w-measure uppercase font-bold pb-2">
                  <RichText
                    render={slice.primary.title}
                    linkResolver={linkResolver}
                  />
                </h2>
                <p className="max-w-measure prose">
                  <RichText
                    render={slice.primary.description}
                    linkResolver={linkResolver}
                  />
                </p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  })
  return (
    <div>
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <div className="pb-40 lg:pb-32">{body}</div>
      <div className="lg:w-3/4 xl:w-7/12 px-5 lg:px-0 mx-auto">
        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const index = await Client().getSingle('index')
  return {
    props: {
      index,
    },
  }
}
