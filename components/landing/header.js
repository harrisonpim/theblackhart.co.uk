import { RichText } from "prismic-reactjs";
import { linkResolver, customLink } from "../../prismic.config";
import Nav from "../nav";
import Image from "next/image";

export default function Header({ slice }) {
  return (
    <header className="h-screen w-full table">
      <div className="table-row">
        <Nav className="pt-2 text-xs lg:text-base" />
      </div>
      <div className="table-row align-middle text-center">
        <h1 className="w-4/5 mx-auto">
          <Image
            src={slice.title_image.url}
            alt={slice.title_image.alt}
            height={slice.title_image.dimensions.height}
            width={slice.title_image.dimensions.width}
            className="max-h-full max-w-full"
          />
        </h1>
        <p className="uppercase font-bold lg:text-xl leading-none">
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
