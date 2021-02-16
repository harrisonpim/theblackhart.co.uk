import Head from "next/head";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "../../utils/queries";
import DefaultLayout from "../../layouts/default";
import Product from "../../components/product";
import { Client } from "../../utils/prismic-helpers";

const ProductPage = ({ product }) => {
  const title = RichText.asText(product.data.product_name)
  return (
    <DefaultLayout parentHref="/shop" parentText="Shop">
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={RichText.asText(product.data.description)}
        />
      </Head>
      <Product data={product.data} />
    </DefaultLayout>
  );
};

export async function getStaticProps({
  params,
  preview = null,
  previewData = {},
}) {
  const { ref } = previewData;
  const product =
    (await Client().getByUID("product", params.uid, ref ? { ref } : null)) ||
    {};
  return {
    props: {
      preview,
      product,
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
