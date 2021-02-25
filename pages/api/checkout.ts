import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { queryRepeatableDocuments } from "../../lib/queries";
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
      const products = Object.values(req.body);

      const validatedProducts = products.map(({ sku, quantity }) => {
        return { quantity, ...inventory.find((p) => p.uid === sku) };
      });

      const lineItems = validatedProducts.map((product) => {
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
          quantity: product.quantity,
        };
      });

      const containsSilver = validatedProducts.some(
        (product) => product.data.type == "silver"
      );

      if (containsSilver === true) {
        lineItems.push({
          price_data: {
            unit_amount: 670,
            currency: "gbp",
            product_data: {
              name: "Shipping cost",
              description: "Royal Mail Special Delivery Guaranteed by 1pm",
              images: [],
            },
          },
          quantity: 1,
        });
      }

      const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          payment_method_types: ["card"],
          shipping_address_collection: {
            allowed_countries: ["GB"],
          },
          billing_address_collection: "auto",
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/shop/basket`,
          line_items: lineItems,
        }
      );

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
