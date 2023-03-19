import 'slick-carousel/slick/slick.css'

import React, { useRef } from 'react'

import Image from 'next/image'
import Slider from 'react-slick'

interface Props {
  images: {
    image: {
      url: string
      alt: string
      dimensions: {
        width: number
        height: number
      }
    }
  }[]
}

const ImageGallery: React.FC<Props> = ({ images }) => {
  const sliderRef = useRef(null)
  if (images.length > 1) {
    return (
      <>
        <Slider
          ref={sliderRef}
          infinite={true}
          slidesToShow={1}
          slidesToScroll={1}
          swipeToSlide={true}
          arrows={false}
          dots={false}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full pb-6/5 ">
              <Image
                src={image.image.url}
                alt={image.image.alt}
                fill
                className="absolute top-0 left-0 object-contain w-full h-full rounded-sm overflow-hidden"
              />
            </div>
          ))}
        </Slider>

        <div className="flex gap-2 pt-1">
          {images.map((image, index) => (
            <Image
              onClick={() => sliderRef.current.slickGoTo(index)}
              key={index}
              src={image.image.url}
              alt={image.image.alt}
              className="w-12 h-12 cursor-pointer object-cover rounded-sm"
              width={image.image.dimensions.width}
              height={image.image.dimensions.height}
            />
          ))}
        </div>
      </>
    )
  } else {
    return (
      <div className="w-full">
        <Image
          src={images[0].image.url}
          alt={images[0].image.alt}
          width={images[0].image.dimensions.width}
          height={images[0].image.dimensions.height}
          className="w-full h-full object-contain"
        />
      </div>
    )
  }
}

export default ImageGallery
