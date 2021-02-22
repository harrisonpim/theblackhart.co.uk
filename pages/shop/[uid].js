import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import Layout from "../../components/layouts/default";
import Details from "../../components/product/details";
import ImageGallery from "../../components/product/imageGallery";
import { linkResolver, Client, customLink } from "../../prismic.config";
import AddToBasket from "../../components/basket/addToBasket";
import { formatCurrencyString } from "use-shopping-cart";

export default function ProductPage({ product, details, uid }) {
  const title = RichText.asText(product.data.name);
  const description = RichText.asText(product.data.description);
  const images = product.data.body[0].items;
  const displayPrice = formatCurrencyString({
    value: product.data.price,
    currency: "GBP",
  });
  return (
    <Layout title={title} description={description}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ImageGallery images={images} />
        <div>
          <h1 className="leading-none">{title}</h1>
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
          <AddToBasket product={product} uid={uid} />
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
