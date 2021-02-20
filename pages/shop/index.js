import { RichText } from "prismic-reactjs";
import Layout from "../../layouts/default";
import ProductList from "../../components/productList";
import { queryRepeatableDocuments } from "../../utils/queries";
import { Client } from "../../prismic.config";

const Shop = ({ index, products }) => {
  return (
    <Layout
      description={RichText.asText(index.data.description)}
      title={RichText.asText(index.data.title)}
    >
      <div className="pt-4">
        <ProductList products={products} />
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const index = await Client().getSingle("shop");
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
