// lib/shopify/cart.ts
import { sf } from './storefront';

const CART_CREATE = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!], $buyerIp: String) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;

type CartCreateRes = {
  cartCreate: {
    cart: { id: string; checkoutUrl: string } | null;
    userErrors: { field: string[]; message: string }[];
  };
};

export async function startCheckout(variantId: string, quantity = 1, buyerIp?: string) {
  try {
    const data = await sf<CartCreateRes>(
      CART_CREATE,
      { lines: [{ quantity, merchandiseId: variantId }] },
      buyerIp,
    );

    const { cart, userErrors } = data.cartCreate;
    if (userErrors?.length) throw new Error(`Cart errors: ${JSON.stringify(userErrors)}`);
    if (!cart?.checkoutUrl) throw new Error('No checkoutUrl returned');

    return cart.checkoutUrl;
  } catch (error) {
    console.error('Cart API failed, using direct checkout URL:', error);
    
    // Fallback: create direct checkout URL
    // Extract numeric variant ID from GraphQL ID
    const numericId = variantId.split('/').pop();
    if (!numericId) throw new Error('Invalid variant ID');
    
    const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
    return `https://${shopDomain}/cart/${numericId}:${quantity}`;
  }
}
