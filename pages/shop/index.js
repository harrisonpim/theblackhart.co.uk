import Head from "next/head";
import { RichText } from "prismic-reactjs";
import DefaultLayout from "../../layouts/default";
import ProductList from "../../components/productList";
import { queryRepeatableDocuments } from "../../utils/queries";
import { Client } from "../../utils/prismic-helpers";

const Shop = ({ index, products }) => {
  return (
    <DefaultLayout parentHref="/" parentText="Home">
      <Head>
        <title>{RichText.asText(index.data.title)}</title>
        <meta
          name="description"
          content={RichText.asText(index.data.description)}
        />
      </Head>
      <div>{RichText.asText(index.data.description)}</div>
      <div className="pt-4">
        <ProductList products={products} />
      </div>
    </DefaultLayout>
  );
};

export async function getStaticProps() {
  const client = Client();
  const index = await client.getSingle("shop");
  const products = await queryRepeatableDocuments(
    (doc) => doc.type === "product"
  );

  return {
    props: {
      index,
      products: products,
    },
  };
}

export default Shop;
