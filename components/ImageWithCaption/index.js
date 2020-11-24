import Caption from "./caption";

export default function ImageWithCaption({ slice }) {
  return (
    <figure className="mx-auto w-full lg:w-4/5 lg:py-3">
      <img
        className="mx-auto pb-1"
        src={slice.primary.image.url}
        alt={slice.primary.image.alt}
      />
      <Caption caption={slice.primary.caption} />
    </figure>
  );
}
