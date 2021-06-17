import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from '../lib/types'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../prismic.config'

const ImageWithCaption: FC<ImageProps> = ({ slice }) => {
  return (
    <figure className="w-full lg:w-4/5 h-auto mx-auto text-center pb-1">
      <Image
        className="rounded-sm"
        layout="responsive"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
        placeholder="blur"
        blurDataURL={`${slice.primary.image.url}&w=30`}
      />
      {RichText.asText(slice.primary.caption) ? (
        <figcaption className="pt-2 mx-auto w-4/5 text-silver text-center">
          <RichText
            render={slice.primary.caption}
            linkResolver={linkResolver}
          />
        </figcaption>
      ) : null}
    </figure>
  )
}
export default ImageWithCaption
