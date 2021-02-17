import Caption from "./caption";
import Image from "next/image";

export default function ImageWithCaption({ slice }) {
  return (
    <figure className="mx-auto w-full lg:w-4/5">
      <Image
        className="mx-auto"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
        height={slice.primary.image.dimensions.height}
        width={slice.primary.image.dimensions.width}
      />
      <Caption caption={slice.primary.caption} />
    </figure>
  );
}
