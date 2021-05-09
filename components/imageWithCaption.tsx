import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from '../lib/types'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic.config'

const ImageWithCaption: FC<ImageProps> = ({ slice }) => {
  const caption = RichText.asText(slice.primary.caption) ? (
    <figcaption className="pt-1 mx-auto w-4/5 text-silver text-xs text-center">
      <RichText render={slice.primary.caption} linkResolver={linkResolver} />
    </figcaption>
  ) : null

  return (
    <figure className="w-full lg:w-4/5 mx-auto text-center pb">
      <div className="inline-block">
        <Image
          src={slice.primary.image.url}
          alt={slice.primary.image.alt}
          height={slice.primary.image.dimensions.height}
          width={slice.primary.image.dimensions.width}
        />
      </div>
      {caption}
    </figure>
  )
}
export default ImageWithCaption
