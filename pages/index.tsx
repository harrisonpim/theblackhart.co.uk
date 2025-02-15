import { Client, linkResolver } from '../prismic.config'

import Footer from '../components/footer'
import Head from 'next/head'
import Image from 'next/image'
import Nav from '../components/nav'
import { RichText } from 'prismic-reactjs'

export default function Index({ index }) {
  return (
    <div>
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'JewelryStore',
            name: 'The Black Hart',
            url: 'https://theblackhart.co.uk',
            sameAs: [
              'https://www.instagram.com/tbh_jewellery/',
              'https://www.tiktok.com/@tbh_jewellery',
              'https://www.youtube.com/channel/UCfUqXisYyNzQcRDPxP_SizQ',
            ],
            logo: 'https://images.prismic.io/theblackhart/2a87552d-c62d-436c-b449-68ce32869d2e_tbh-inverted.jpg',
            image: [
              'https://images.prismic.io/theblackhart/d503a6cb-67d2-436d-8ab0-a93fd7e23c61_IMG_7694.JPG',
            ],
            areaServed: {
              '@type': 'Country',
              name: 'United Kingdom',
            },
          })}
        </script>
      </Head>

      <div className="pb-40 lg:pb-32">
        {index.data.body.map((slice) => {
          switch (slice.slice_type) {
            case 'header':
              return (
                <header
                  key={slice.primary.title_image.alt}
                  className="flex flex-col h-screen justify-between text-center"
                >
                  <Nav className="pt-2 text-sm lg:text-base" />
                  <div className="w-4/5 m-auto">
                    <div className="relative h-24 lg:h-48">
                      <Image
                        src={slice.primary.title_image.url}
                        alt={slice.primary.title_image.alt}
                        fill
                        className="object-contain"
                        quality={100}
                        priority
                      />
                    </div>
                    <p className="uppercase font-bold lg:text-xl leading-none block">
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
                  key={RichText.asText(slice.primary.title)}
                  className="h-screen w-full table bg-no-repeat bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${slice.primary.background_image.url})`,
                  }}
                >
                  <div className="flex flex-col h-screen justify-between text-center backdrop-blur-[5px]">
                    <div className="my-auto text-left leading-tight px-16 lg:px-32  ">
                      <h2 className="max-w-measure uppercase font-bold pb-2 drop-shadow-2xl">
                        <RichText
                          render={slice.primary.title}
                          linkResolver={linkResolver}
                        />
                      </h2>
                      <p className="max-w-measure prose drop-shadow-2xl">
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
        })}
      </div>
      <div className="lg:w-3/4 xl:w-7/12 px-5 lg:px-0 mx-auto">
        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const index = await Client().getSingle('index', {})
  return {
    props: {
      index,
    },
  }
}
