import { RichText } from "prismic-reactjs";
import { linkResolver, customLink } from "../../prismic.config";

export default function Section({ slice }) {
  return (
    <div
      className="h-screen w-full table bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${slice.background_image.url})` }}
    >
      <div className="table-cell align-middle text-left leading-tight bg-center bg-no-repeat px-16 lg:px-32">
        <h2 className="max-w-measure uppercase font-bold pb-2">
          <RichText
            render={slice.title}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        </h2>
        <p className="max-w-measure prose">
          <RichText
            render={slice.description}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        </p>
      </div>
    </div>
  );
}
