import Caption from "./caption";
import Image from "next/image";

export default function ImageWithCaption({ slice }) {
  return (
    <figure className="w-full lg:w-4/5 mx-auto text-center">
      <div className="inline-block">
        <Image
          src={slice.primary.image.url}
          alt={slice.primary.image.alt}
          height={slice.primary.image.dimensions.height}
          width={slice.primary.image.dimensions.width}
        />
      </div>
      <Caption caption={slice.primary.caption} />
    </figure>
  );
}
