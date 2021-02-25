import Image from "next/image";

export default function Glyph({ slice }) {
  return (
    <figure className="mx-auto w-24">
      <Image
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
      />
    </figure>
  );
}
