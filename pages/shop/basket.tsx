import Layout from "@/components/layouts/default";
import { FormEventHandler, useState, useEffect } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { fetchPostJSON } from "../../lib/api";

export default function Basket() {
  const [cartEmpty, setCartEmpty] = useState(true);
  const {
    formattedTotalPrice,
    cartCount,
    // incrementItem,
    // decrementItem,
    clearCart,
    cartDetails,
    redirectToCheckout,
  } = useShoppingCart();

  useEffect(() => setCartEmpty(!cartCount), [cartCount]);

  const handleCheckout: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { sessionId } = await fetchPostJSON("/api/checkout", cartDetails);
    redirectToCheckout({ sessionId });
  };

  return (
    <Layout title="Basket">
      <form onSubmit={handleCheckout}>
        <div className="space-y-2">
          <div className="border-t border-b divide-y">
            {Object.values(cartDetails).map((product) => (
              <div className="flex py-1 space-y-2">
                <img
                  className="w-20 h-20 object-cover rounded-sm pr-2"
                  src={product.image}
                />
                <div className="text-left ">
                  <div>{product.name}</div>
                  <div className="text-sm">
                    <div>x{product.quantity}</div>
                    <div>{product.formattedValue}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <p suppressHydrationWarning>Total: {formattedTotalPrice}</p>
              <a
                className="no-underline"
                href="/shop"
                onClick={() => clearCart()}
              >
                Clear basket
              </a>
            </div>
            <div className="space-y-3">
              <p className="text-xs">
                Shipping costs are added when you check out. For orders within
                the UK, silver items are shipped by{" "}
                <span className="italic">
                  Royal Mail Special Delivery Guaranteed by 1pm
                </span>
                , at a cost of £6.70. <p></p>For merch items, the cost of
                shipping is included in the price of the item.
              </p>
              <button type="submit" disabled={cartEmpty}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}
