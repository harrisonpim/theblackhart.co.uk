import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import Layout from "../../layouts/default";
import Details from "../../components/product/details";
import ImageGallery from "../../components/product/imageGallery";
import formatPrice from "../../components/price";
import { linkResolver, Client, customLink } from "../../prismic.config";
import CheckoutButton from "../../components/checkoutButton";

export default function ProductPage({ product, details, uid }) {
  const title = RichText.asText(product.data.name);
  const images = product.data.body[0].items;
  const productName = RichText.asText(product.data.name);
  const displayPrice = formatPrice(product.data.price);
  const description = RichText.asText(product.data.description);
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
          <CheckoutButton products={[{ uid, quantity: "1" }]} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const client = Client();
  const product = (await client.getByUID("product", params.uid)) || {};
  const details = await client.getSingle("additional_information");

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
