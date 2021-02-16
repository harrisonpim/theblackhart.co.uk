import { RichText } from "prismic-reactjs";
import ImageWithCaption from "./imageWithCaption";
import Glyph from "./glyph";
import { customLink } from "../utils/prismic-helpers";
import { linkResolver } from "../prismic-configuration";

export default function SliceZone({ sliceZone }) {
  return sliceZone.map((slice) => {
    console.log(slice.slice_type);
    switch (slice.slice_type) {
      case "image_with_caption":
        return <ImageWithCaption slice={slice} />;
      case "img":
        return <ImageWithCaption slice={slice} />;
      case "text":
        return (
          <div className="prose">
            <RichText
              render={slice.primary.text}
              linkResolver={linkResolver}
              serializeHyperlink={customLink}
            />
          </div>
        );
      case "glyph":
        return <Glyph slice={slice} />;
      default:
        return null;
    }
  });
}
