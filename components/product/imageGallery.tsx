// For now, we just return a single image.
// Will add full gallery functionality at a later date
// https://github.com/kenwheeler/slick

export default function ImageGallery({ images }) {
  const image = images[0].image
  return <img className="rounded-sm" src={image.url} alt={image.alt} />
}
