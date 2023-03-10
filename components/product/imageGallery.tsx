import { FC } from 'react'
import Image from 'next/image'
import { ImageType } from 'lib/types'

// For now, we just return a single image.
// Will add full gallery functionality at a later date
// https://github.com/harrisonpim/theblackhart.co.uk/issues/43

type Props = {
  images: { image: ImageType }[]
}

const ImageGallery: FC<Props> = ({ images }) => {
  const image = images[0].image
  return (
    <Image
      className="rounded-sm"
      objectFit="contain"
      src={image.url}
      alt={image.alt}
      height={image.dimensions.height}
      width={image.dimensions.width}
    />
  )
}

export default ImageGallery
