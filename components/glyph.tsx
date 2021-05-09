import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from '../lib/types'

const Glyph: FC<ImageProps> = ({ slice }) => {
  return (
    <figure className="mx-auto w-24">
      <Image
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
      />
    </figure>
  )
}
export default Glyph
