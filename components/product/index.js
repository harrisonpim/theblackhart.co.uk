import ImageGallery from "./imageGallery";
import CheckoutButton from "./checkout";
import { formatPrice } from "../price";
import { linkResolver } from "../../prismic-configuration";
import { customLink } from "../../utils/prismic-helpers";
import { RichText } from "prismic-reactjs";

export default function Product({ data }) {
  const images = data.body[0].items;
  const productName = RichText.asText(data.product_name);
  const displayPrice = formatPrice(data.price);
  const disclaimer =
    data.price > 1000 ? (
      <p>
        <b>
          Please note that these pieces are made to order and may take up to two
          weeks to be dispatched.
        </b>
      </p>
    ) : null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ImageGallery images={images} />

      <div>
        <h1 className="display-inline leading-none">{productName}</h1>
        <h2 className="text-sm text-silver pb-4">{displayPrice}</h2>
        <div className="prose font-xs">
          <p>Shipping cost: {formatPrice(data.shipping)}</p>
          <RichText
            render={data.description}
            linkResolver={linkResolver}
            serializeHyperlink={customLink}
          />
          {disclaimer}
        </div>
        <div className="py-4">
          <CheckoutButton price={data.price} shipping={data.shipping} />
        </div>
      </div>
    </div>
  );
}
