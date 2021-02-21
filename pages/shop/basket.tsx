import Layout from "../../components/layouts/default";
import { FormEventHandler, useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../../utils/api";

export default function Basket() {
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const response = await fetchPostJSON("/api/checkout", cartDetails);
    if (response.statusCode === 500) {
      console.error(response.message);
      return;
    }
    redirectToCheckout({ sessionId: response.sessionId });
  };

  return (
    <Layout title="Basket">
      <form
        onSubmit={handleCheckout}
        className="grid grid-cols-1 lg:grid-cols-2 gap-4"
      >
        <div>
          <p suppressHydrationWarning>Total: {formattedTotalPrice}</p>
        </div>
        <div className="space-y-2">
          <button type="submit" disabled={cartEmpty}>
            Checkout
          </button>
          <button type="button" onClick={clearCart}>
            Clear Basket
          </button>
        </div>
      </form>
    </Layout>
  );
}
