import Stripe from "stripe";
import type { ProductId } from "./interface";

export function getDomainUrl(request: Request) {
  const host =
    request.headers.get("X-Forward-Host") ?? request.headers.get("host");

  if (!host) {
    throw new Error("Could not find the url");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

export const getStripeSession = async (
  items: string,
  domainUrl: string
): Promise<string> => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-08-16",
    typescript: true,
  });

  const dataObj = JSON.parse(items);

  const lineItems = dataObj.map((product: ProductId) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          description: product.description,
        },
        unit_amount: product.price * 1000, // Convert price to cents
      },
      quantity: product.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return session.url as string;
};
