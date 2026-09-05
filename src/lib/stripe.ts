import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (stripeClient) return stripeClient;

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Stripe server configuration is missing. Set STRIPE_SECRET_KEY.');
  }

  stripeClient = new Stripe(secretKey, {
    apiVersion: '2023-10-16',
    typescript: true,
  });

  return stripeClient;
}

export default getStripe;
