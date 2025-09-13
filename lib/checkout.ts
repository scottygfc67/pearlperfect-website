// Shopify checkout utilities
export interface CheckoutItem {
  variantId: string;
  quantity: number;
}

export interface CheckoutData {
  items: CheckoutItem[];
  discountCode?: string;
}

/**
 * Creates a Shopify checkout URL with items
 */
export function createCheckoutUrl(data: CheckoutData): string {
  const baseUrl = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`;
  
  // Build the checkout URL with line items in the format: variant_id:quantity
  const lineItems = data.items.map(item => 
    `${item.variantId}:${item.quantity}`
  ).join(',');
  
  let checkoutUrl = `${baseUrl}/cart/${lineItems}`;
  
  // Add discount code if provided
  if (data.discountCode) {
    checkoutUrl += `?discount=${encodeURIComponent(data.discountCode)}`;
  }
  
  return checkoutUrl;
}

/**
 * Redirects to Shopify checkout
 */
export function redirectToCheckout(data: CheckoutData): void {
  const checkoutUrl = createCheckoutUrl(data);
  window.location.href = checkoutUrl;
}

/**
 * Opens Shopify checkout in a new tab
 */
export function openCheckoutInNewTab(data: CheckoutData): void {
  const checkoutUrl = createCheckoutUrl(data);
  window.open(checkoutUrl, '_blank');
}
