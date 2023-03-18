import Image from 'next/image'
import ImageWithCaption from './imageWithCaption'
import { ReactElement } from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic.config'

export default function SliceZone({ sliceZone }): ReactElement {
  return (
    <div className="prose">
      {sliceZone.map((slice) => {
        switch (slice.slice_type) {
          case 'img':
            return <ImageWithCaption slice={slice} />
          case 'text':
            return (
              <RichText
                render={slice.primary.text}
                linkResolver={linkResolver}
              />
            )
          case 'glyph':
            return (
              <figure className="relative mx-auto h-12">
                <Image
                  src={slice.primary.image.url}
                  alt={slice.primary.image.alt}
                  fill
                  className="object-contain"
                />
              </figure>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
