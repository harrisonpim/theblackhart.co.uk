import { FC } from 'react'
import Image from 'next/image'

type Props = {
  images: {
    image: {
      url: string
      alt: string
      dimensions: { height: number; width: number }
    }
  }[]
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
