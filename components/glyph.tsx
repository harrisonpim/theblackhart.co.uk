import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from '../lib/types'
import imageLoader from 'lib/images'

const Glyph: FC<ImageProps> = ({ slice }) => {
  return (
    <figure className="relative mx-auto h-24">
      <Image
        loader={imageLoader}
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        layout="fill"
        objectFit="contain"
        placeholder="blur"
      />
    </figure>
  )
}
export default Glyph
