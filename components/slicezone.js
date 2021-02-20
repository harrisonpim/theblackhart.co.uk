import { RichText } from "prismic-reactjs";
import ImageWithCaption from "./imageWithCaption";
import Glyph from "./glyph";
import { customLink } from "../utils/prismic";
import { linkResolver } from "../prismic.config";

export default function SliceZone({ sliceZone }) {
  return (
    <div className="prose">

      {sliceZone.map((slice) => {
        switch (slice.slice_type) {
          case "img":
            return <ImageWithCaption slice={slice} />;
          case "text":
            return (
              <RichText
                render={slice.primary.text}
                linkResolver={linkResolver}
                serializeHyperlink={customLink}
              />
            );
          case "glyph":
            return <Glyph slice={slice} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
