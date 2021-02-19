import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import DefaultLayout from "../../layouts/default";
import Product from "../../components/product";
import { Client } from "../../utils/prismic-helpers";

const ProductPage = ({ product, details }) => {
  const title = RichText.asText(product.data.product_name);
  return (
    <DefaultLayout>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={RichText.asText(product.data.description)}
        />
      </Head>
      <Product product={product.data} details={details.data} />
    </DefaultLayout>
  );
};

export async function getStaticProps({ params }) {
  const product = (await Client().getByUID("product", params.uid)) || {};
  const details = await Client().getSingle("additional_information");

  return {
    props: {
      product,
      details,
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

export default ProductPage;
