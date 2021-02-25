import "@/styles/app.css";
import getStripe from "@/lib/stripe";
import { CartProvider } from "use-shopping-cart";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider mode="checkout-session" stripe={getStripe()} currency="GBP">
      <Component {...pageProps} />
    </CartProvider>
  );
}
