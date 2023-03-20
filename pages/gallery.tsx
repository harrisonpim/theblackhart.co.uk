import { useEffect, useState } from 'react'

import { Client } from '../prismic.config'
import Image from 'next/image'
import Layout from '../components/layout'

const Gallery = ({ images }) => {
  // when clicked on, the image should open in a modal
  // the modal should have a next and previous button
  const [modal, setModal] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        setCurrentImage((currentImage + 1) % images.length)
      } else if (event.key === 'ArrowLeft') {
        setCurrentImage((currentImage - 1 + images.length) % images.length)
      } else if (event.key === 'Escape') {
        setModal(false)
      }
    }

    if (modal) {
      window.addEventListener('keydown', handleKeyDown)
    } else {
      window.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [modal, currentImage, images])

  return (
    <Layout
      includeFooter={false}
      title="Gallery"
      description="A gallery of custom commissions"
    >
      {modal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-10 cursor-pointer"
          onClick={() => setModal(false)}
        >
          <div className="relative w-3/4 h-3/4 flex justify-center items-center ">
            <Image
              className="absolute top-0 left-0 object-contain h-3/4 rounded-sm overflow-hidden"
              src={images[currentImage].image.url}
              alt={images[currentImage].image.alt}
              fill
            />
          </div>
        </div>
      )}

      <ul className="grid gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image, index) => (
          <li
            key={index}
            className="relative w-full pb-6/5 cursor-pointer"
            onClick={() => {
              setModal(true)
              setCurrentImage(index)
            }}
          >
            <Image
              className="absolute top-0 left-0 object-cover w-full h-full rounded-sm overflow-hidden"
              src={image.image.url}
              alt={image.image.alt}
              fill
            />
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps() {
  const response = await Client().getSingle('gallery', {})
  const { images } = response.data

  return {
    props: {
      images,
    },
  }
}

export default Gallery
