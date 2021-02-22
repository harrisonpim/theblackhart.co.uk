import { RichText } from "prismic-reactjs";
import { linkResolver, customLink } from "../prismic.config";

export default function Caption({ caption }) {
  if (RichText.asText(caption) !== "") {
    return (
      <figcaption className="pt-1 mx-auto w-4/5 text-silver text-xs text-center">
        <RichText
          render={caption}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </figcaption>
    );
  }

  return null;
}
