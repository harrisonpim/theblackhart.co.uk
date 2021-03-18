import { useState } from "react";
import { RichText } from "prismic-reactjs";
import { queryRepeatableDocuments } from "@/lib/queries";
import Layout from "@/components/layouts/default";
import Details from "@/components/product/details";
import ImageGallery from "@/components/product/imageGallery";
import { linkResolver, Client } from "../../prismic.config";
import AddToBasket from "@/components/basket/addToBasket";
import { formatCurrencyString } from "use-shopping-cart";

export default function ProductPage({ product, details, sizes, uid }) {
  const title = RichText.asText(product.data.name);
  const description = RichText.asText(product.data.description);
  const images = product.data.body[0].items;
  const displayPrice = formatCurrencyString({
    value: product.data.price,
    currency: "GBP",
  });
  const isRing = product.data.type === "ring";
  const [size, setSize] = useState(isRing ? sizes[0] : null);
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
            />

            {isRing ? (
              <div>
                <div className="inline-block pr-2">Size:</div>
                <select
                  className="w-20 mb-3 text-black"
                  name="sizes"
                  id="sizes"
                  title="sizes"
                  aria-label="sizes"
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option key={sizes[0]} value={sizes[0]} selected>
                    {sizes[0]}
                  </option>
                  {sizes.slice(1).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}
            {["silver", "ring"].includes(product.data.type) ? (
              <Details data={details.data} />
            ) : null}
          </div>
          <div></div>
          <AddToBasket product={product} size={size} uid={uid} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const client = Client();
  const product = await client.getByUID("product", params.uid);
  const details = await client.getSingle("additional_information");
  const sizes = [
    "G",
    "G½",
    "H",
    "H½",
    "I",
    "I½",
    "J",
    "J½",
    "K",
    "K½",
    "L",
    "L½",
    "M",
    "M½",
    "N",
    "N½",
    "O",
    "O½",
    "P",
    "P½",
    "Q",
    "Q½",
    "R",
    "R½",
    "S",
    "S½",
    "T",
    "T½",
    "U",
    "U½",
  ];

  return {
    props: {
      product,
      details,
      sizes,
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
