import ImageGallery from "./imageGallery";
import CheckoutButton from "./checkout";
import { formatPrice } from "../price";
import { linkResolver } from "../../prismic-configuration";
import { customLink } from "../../utils/prismic-helpers";
import { RichText } from "prismic-reactjs";
import Details from "./details";

export default function Product({ product, details }) {
  const images = product.body[0].items;
  const productName = RichText.asText(product.name);
  const displayPrice = formatPrice(product.price);
  const needsDetail = product.type === "silver";
  console.log(details);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ImageGallery images={images} />
      <div>
        <h1 className="display-inline leading-none">{productName}</h1>
        <h2 className="text-lg text-silver pb-4">{displayPrice}</h2>
        <div className="prose font-xs">
          <RichText
            render={product.description}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
          {needsDetail ? <Details data={details} /> : null}
        </div>
        <div className="py-4">
          <CheckoutButton price={product.price} shipping={product.shipping} />
        </div>
      </div>
    </div>
  );
}
