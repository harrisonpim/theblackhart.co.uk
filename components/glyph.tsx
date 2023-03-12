import { FC } from 'react'
import Image from 'next/image'
import { RichTextBlock } from 'prismic-reactjs'

export type ImageProps = {
  slice: {
    primary: {
      caption?: RichTextBlock[]
      image: {
        url: string
        alt: string
        dimensions: { height: number; width: number }
      }
    }
  }
}

const Glyph: FC<ImageProps> = ({ slice }) => {
  return (
    <figure className="relative mx-auto h-12">
      <Image
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        layout="fill"
        objectFit="contain"
      />
    </figure>
  )
}
export default Glyph
