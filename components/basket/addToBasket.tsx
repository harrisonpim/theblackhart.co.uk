import { useShoppingCart, Product } from "use-shopping-cart";

export default function AddToBasket({ product, uid }) {
  const { addItem } = useShoppingCart();
  const productData = {
    name: product.data.name,
    description: product.data.name,
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
