import { useShoppingCart } from "use-shopping-cart";

export default function clearBasket() {
  const { clearCart } = useShoppingCart();
  return <button onClick={clearCart}>Clear basket</button>;
}
