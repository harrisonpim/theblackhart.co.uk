import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import Layout from "../../layouts/default";
import Details from "../../components/product/details";
import ImageGallery from "../../components/product/imageGallery";
import { Client, customLink } from "../../utils/prismic";
import { loadStripe } from "@stripe/stripe-js";
import formatPrice from "../../components/price";
import { linkResolver } from "../../prismic.config";
import { fetchPostJSON } from "../../utils/api";

export default function ProductPage({ product, details, uid }) {
  const title = RichText.asText(product.data.name);
  const images = product.data.body[0].items;
  const productName = RichText.asText(product.data.name);
  const displayPrice = formatPrice(product.data.price);
  const description = RichText.asText(product.data.description);
  async function handleClick() {
    const { sessionId, publishableKey } = await fetchPostJSON("/api/checkout", {
      products: [{ uid, quantity: "1" }],
    });

    console.log(sessionId, publishableKey);
    const stripe = await loadStripe(publishableKey);
    const { error } = await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <Layout title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ImageGallery images={images} />
        <div>
          <h1 className="leading-none">{productName}</h1>
          <h2 className="text-silver pb-4">{displayPrice}</h2>
          <div className="prose">
            <RichText
              render={product.data.description}
              linkResolver={linkResolver}
              serializeHyperlink={customLink}
            />

            {product.data.type === "silver" ? (
              <Details data={details.data} />
            ) : null}
          </div>
          <button
            role="link"
            className="w-full py-3 rounded-sm border border-solid border-white hover:text-black hover:bg-white hover:text-black transition duration-200 ease-in-out"
            onClick={handleClick}
          >
            Checkout
          </button>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const product = (await Client().getByUID("product", params.uid)) || {};
  const details = await Client().getSingle("additional_information");

  return {
    props: {
      product,
      details,
      uid: params.uid,
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "product"
  );
  return {
    paths: documents.map((doc) => `/shop/${doc.uid}`),
    fallback: false,
  };
}
