import { RichText } from "prismic-reactjs";
import Layout from "../../components/layouts/default";
import Link from "next/link";
import { linkResolver } from "../../prismic.config";
import { formatCurrencyString } from "use-shopping-cart";
import { queryRepeatableDocuments } from "../../utils/queries";
import { Client } from "../../prismic.config";

const Shop = ({ index, products }) => {
  return (
    <Layout
      description={RichText.asText(index.data.description)}
      title={RichText.asText(index.data.title)}
    >
      <div className="grid grid-cols-2 row-gap-2 border-b border-t py-1 uppercase text-xs">
        <div className="flex gap-3 mx-0 lg:text-left">
          <a href="/shop?category=merch" className="no-underline">
            Merch
          </a>
          <a href="/shop?category=silver" className="no-underline">
            Silver
          </a>
        </div>
        <a className="mx-0 text-right no-underline" href="/shop/basket">
          Basket
        </a>
      </div>
      <div className="grid gap-x-5 gap-y-4 grid-cols-2 lg:grid-cols-4 pt-4">
        {products.map((product) => (
          <Link as={linkResolver(product)} href={linkResolver(product)}>
            <a className="no-underline">
              <img
                className="w-full h-40 object-cover pb-1"
                src={product.data.body[0].items[0].image.url}
                alt={product.data.body[0].items[0].image.alt}
              />
              <div className="text-center w-11/12 mx-auto">
                <p>{RichText.asText(product.data.name)}</p>
                <p className="text-silver">
                  {formatCurrencyString({
                    value: product.data.price,
                    currency: "GBP",
                  })}
                </p>
              </div>
            </a>
          </Link>
        ))}
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
