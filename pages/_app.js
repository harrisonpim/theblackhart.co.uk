import "@/styles/app.css";

import { CartProvider } from "use-shopping-cart";
import getStripe from "@lib/stripe";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider mode="checkout-session" stripe={getStripe()} currency="GBP">
      <Component {...pageProps} />
    </CartProvider>
  );
}
