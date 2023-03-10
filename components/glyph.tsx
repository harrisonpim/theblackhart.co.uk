import { FC } from 'react'
import Image from 'next/image'
import { ImageProps } from '../lib/types'

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
