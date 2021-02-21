import getStripe from "../utils/stripe";
import { fetchPostJSON } from "../utils/api";

export default function CheckoutButton({ products }) {
  async function handleClick() {
    const { sessionId, publishableKey } = await fetchPostJSON("/api/checkout", {
      products,
    });
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({ sessionId });
  }

  return (
    <button role="link" onClick={handleClick}>
      Checkout
    </button>
  );
}
