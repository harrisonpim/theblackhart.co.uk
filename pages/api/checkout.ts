import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { queryRepeatableDocuments } from "../../utils/queries";
import { RichText } from "prismic-reactjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const inventory = await queryRepeatableDocuments(
        (doc) => doc.type === "product"
      );

      const lineItems = req.body.products.map(({ uid, quantity }) => {
        const product = inventory.find((p) => p.uid === uid);
        return {
          price_data: {
            unit_amount: product.data.price,
            currency: "gbp",
            product_data: {
              name: RichText.asText(product.data.name),
              description: RichText.asText(product.data.description),
              images: [product.data.body[0].items[0].image.url],
            },
          },
          quantity: quantity,
        };
      });

      const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["GB", "IE", "US", "CA", "FR", "DE"],
          },
          billing_address_collection: "auto",
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/shop/basket`,
          line_items: lineItems,
        }
      );

      res.status(200).json({
        sessionId: session.id,
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
