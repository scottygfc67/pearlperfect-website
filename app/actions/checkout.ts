'use server';

import { headers } from 'next/headers';
import { startCheckout } from '@/lib/shopify/cart';
import { redirect } from 'next/navigation';

export async function buyNowAction(variantId: string, quantity = 1) {
  // Best-effort buyer IP forwarding for Shopify to preserve logged-in experience.
  const headersList = await headers();
  const buyerIp =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    undefined;

  const url = await startCheckout(variantId, quantity, buyerIp);
  redirect(url);
}

// Direct checkout action that goes straight to Shopify
export async function directCheckoutAction(variantId: string, quantity = 1) {
  // Extract numeric variant ID from GraphQL ID
  const numericId = variantId.split('/').pop();
  if (!numericId) {
    throw new Error('Invalid variant ID');
  }

  // Get shop domain from environment
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!shopDomain) {
    throw new Error('Shop domain not configured');
  }

  // Create direct Shopify checkout URL
  const checkoutUrl = `https://${shopDomain}/cart/${numericId}:${quantity}`;
  
  // Redirect directly to Shopify checkout
  redirect(checkoutUrl);
}
