import { linkResolver } from "../../prismic.config";
import { customLink } from "../../utils/prismic";
import { RichText } from "prismic-reactjs";

export default function Details({ data }) {
  return (
    <details>
      <summary className="font-bold pb-2">
        {RichText.asText(data.title)}
      </summary>
      <RichText
        render={data.text}
        linkResolver={linkResolver}
        serializeHyperlink={customLink}
      />
    </details>
  );
}
