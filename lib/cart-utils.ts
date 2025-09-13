'use client';

import { addLines } from './shopify-cart';
import { getCartIdClient, setCartIdClient } from './cart-cookie';

export interface CartItem {
  variantId: string;
  quantity: number;
  sellingPlanId?: string;
}

export async function addToCart(item: CartItem): Promise<boolean> {
  try {
    console.log('Adding to cart:', item);
    
    // Get or create cart ID
    let cartId = getCartIdClient();
    if (!cartId) {
      const response = await fetch('/api/cart/create', { method: 'POST' });
      const result = await response.json();
      cartId = result.cartId;
      if (cartId) {
        setCartIdClient(cartId);
      } else {
        throw new Error('Failed to create cart');
      }
    }

    // Add item to cart
    const response = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientCartId: cartId,
        lines: [{
          merchandiseId: item.variantId,
          quantity: item.quantity,
          ...(item.sellingPlanId && { sellingPlanId: item.sellingPlanId })
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Add to cart failed:', errorData);
      throw new Error(errorData.error || 'Failed to add to cart');
    }

    const result = await response.json();
    console.log('Successfully added to cart:', result);
    
    // Update cart ID if it changed
    if (result.cartId && result.cartId !== cartId) {
      setCartIdClient(result.cartId);
    }
    
    // Dispatch cart update event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
    
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
}

export async function buyNow(variantId: string, quantity = 1, sellingPlanId?: string): Promise<void> {
  try {
    console.log('Buy now:', { variantId, quantity, sellingPlanId });
    
    // Extract numeric variant ID from GraphQL ID for direct checkout URL
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
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Error with buy now:', error);
    // Fallback: redirect to product page
    window.location.href = '/products/v34-teeth-whitening-strips';
  }
}

// Get the default variant ID for the V34 product
export function getDefaultVariantId(): string {
  // This should match the actual variant ID from Shopify
  // For now, using the one from the environment or a fallback
  return process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID || 'gid://shopify/ProductVariant/51494960857426';
}
