import "../styles/app.css";
import getStripe from "../utils/stripe";
import { CartProvider } from "use-shopping-cart";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider mode="checkout-session" stripe={getStripe()} currency="GBP">
      <Component {...pageProps} />
    </CartProvider>
  );
}
