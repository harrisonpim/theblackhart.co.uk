import { RichText } from "prismic-reactjs";
import { linkResolver } from "../../prismic-configuration";
import { customLink } from "../../utils/prismic-helpers";

export default function Header({ slice }) {
  return (
    <header className="h-screen w-full table">
      <div className="table-cell align-middle text-center">
        <h1 className="w-4/5 block mx-auto my-0 p-0">
          <img
            src={slice.title_image.url}
            alt={slice.title_image.alt}
            className="max-h-full max-w-full"
          />
        </h1>
        <p className="block uppercase font-bold lg:text-xl m-0 leading-none">
          <RichText
            render={slice.description}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
        </p>
      </div>
    </header>
  );
}
