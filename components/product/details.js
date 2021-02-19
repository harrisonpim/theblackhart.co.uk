import { linkResolver } from "../../prismic-configuration";
import { customLink } from "../../utils/prismic-helpers";
import { RichText } from "prismic-reactjs";

export default function Details({ data }) {
  return (
    <details>
      <summary className="font-bold">{RichText.asText(data.title)}</summary>
      <div className="pt-2">
        <RichText
          render={data.text}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </div>
    </details>
  );
}
