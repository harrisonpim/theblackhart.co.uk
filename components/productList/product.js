import { RichText } from "prismic-reactjs";
import formatPrice from "../price";
import Link from "next/link";
import { linkResolver } from "../../prismic.config";

export default function Product({ product }) {
  const image = product.data.body[0].items[0].image;
  const productName = RichText.asText(product.data.name);
  const displayPrice = formatPrice(product.data.price);
  return (
    <Link as={linkResolver(product)} href={linkResolver(product)}>
      <a className="no-underline">
        <img
          className="h-auto w-full lg:h-48 object-cover pb-2"
          src={image.url}
          alt={image.alt}
        />
        <div className="text-center">
          <p>{productName}</p>
          <p className="text-silver">{displayPrice}</p>
        </div>
      </a>
    </Link>
  );
}
