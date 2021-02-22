import { useShoppingCart, Product } from "use-shopping-cart";
import { RichText } from "prismic-reactjs";

export default function AddToBasket({ product, uid }) {
  const { addItem } = useShoppingCart();
  const productData = {
    name: RichText.asText(product.data.name),
    description: RichText.asText(product.data.description),
    price: product.data.price,
    image: product.data.body[0].items[0].image.url,
    currency: "GBP",
    sku: uid,
  } as Product;
  return (
    <a href="/shop/basket">
      <button onClick={() => addItem(productData)}>Add to basket</button>
    </a>
  );
}
