import { FC } from 'react'

// For now, we just return a single image.
// Will add full gallery functionality at a later date
// https://github.com/harrisonpim/theblackhart.co.uk/issues/43

type Image = {
  image: {
    url: string
    alt: string
  }
}

type Props = {
  images: Image[]
}

const ImageGallery: FC<Props> = ({ images }) => {
  const image = images[0].image
  return <img className="rounded-sm" src={image.url} alt={image.alt} />
}

export default ImageGallery
